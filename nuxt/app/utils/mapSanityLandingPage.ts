import type {
  AudienceItem,
  ChecklistItem,
  CollabBenefit,
  FileType,
  FoundryCard,
  LandingLanguage,
  LandingPageData,
  LandingSettings,
  LandingTranslationDictionary,
  LandingTranslations,
  LocalizedString,
  ManifestCard,
  ManifestStat,
  ProcessStep,
  WorkItem,
} from '~/types/landing'
import type { SanityLandingPayload } from '~/composables/useSanityLandingPage'

type UnknownRecord = Record<string, unknown>

const languages: LandingLanguage[] = ['pl', 'en', 'de']

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {}
}

function asArray(value: unknown): UnknownRecord[] {
  return Array.isArray(value) ? value.filter(isRecord) : []
}

function readString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function readNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function readStringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) return fallback

  const strings = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  return strings.length ? strings : fallback
}

function readLocalized(value: unknown, fallback: string, lang: LandingLanguage = 'pl') {
  if (typeof value === 'string' && value.trim()) return value
  if (!isRecord(value)) return fallback

  const current = value[lang]
  const polish = value.pl

  return readString(current, readString(polish, fallback))
}

function cloneTranslations(translations: LandingTranslations): LandingTranslations {
  return {
    pl: cloneDictionary(translations.pl),
    en: cloneDictionary(translations.en),
    de: cloneDictionary(translations.de),
  }
}

function cloneDictionary(dictionary: LandingTranslationDictionary): LandingTranslationDictionary {
  return Object.fromEntries(
    Object.entries(dictionary).map(([key, value]) => [key, Array.isArray(value) ? [...value] : value]),
  )
}

function applyLocalizedText(
  translations: LandingTranslations,
  key: string | undefined,
  value: unknown,
  fallback: string,
) {
  if (!key) return

  if (typeof value === 'string' && value.trim()) {
    translations.pl[key] = value
    return
  }

  if (!isRecord(value)) return

  languages.forEach((lang) => {
    const nextValue = readString(value[lang], readString(translations[lang][key], fallback))
    translations[lang][key] = nextValue
  })
}

function matchingValues(value: UnknownRecord) {
  return [
    readString(value.slot),
    readString(value.number),
    readString(value.type),
    readString(value.layoutClass),
    readString(value.className),
    readString(value.extension),
    readString(value.labelKey),
    readString(value.titleKey),
    readString(value.textKey),
  ].filter(Boolean)
}

function sourceForFallback<T extends { [key: string]: unknown }>(
  sourceItems: UnknownRecord[],
  fallback: T,
  index: number,
) {
  const fallbackMatches = matchingValues(fallback)
  const matchedSource = sourceItems.find((source) => {
    const sourceMatches = matchingValues(source)
    return sourceMatches.some((sourceValue) => fallbackMatches.includes(sourceValue))
  })

  return matchedSource ?? sourceItems[index] ?? {}
}

function readSanityImageUrl(value: unknown, fallback = '') {
  const image = asRecord(value)
  const asset = asRecord(image.asset)

  return readString(image.url, readString(asset.url, fallback))
}

function getPath(source: unknown, path: string[]) {
  return path.reduce<unknown>((current, segment) => asRecord(current)[segment], source)
}

function getLandingSections(payload: SanityLandingPayload) {
  return asRecord((payload as SanityLandingPayload & { landingSections?: unknown }).landingSections)
}

function hasLandingSections(payload: SanityLandingPayload) {
  const sections = getLandingSections(payload)
  return Object.values(sections).some((value) => Array.isArray(value) && value.length > 0)
}

function sectionDocument(sections: UnknownRecord, sectionKey: string, lang: LandingLanguage) {
  return asArray(sections[sectionKey]).find((document) => readString(document.language) === lang) ?? {}
}

function applySectionText(
  translations: LandingTranslations,
  translationKey: string,
  sections: UnknownRecord,
  sectionKey: string,
  path: string[],
  fallback: string,
) {
  languages.forEach((lang) => {
    const document = sectionDocument(sections, sectionKey, lang)
    const value = readString(getPath(document, path), readString(translations[lang][translationKey], fallback))
    translations[lang][translationKey] = value
  })
}

function applyArrayText<T extends { [key: string]: unknown }>(
  translations: LandingTranslations,
  sections: UnknownRecord,
  sectionKey: string,
  arrayPath: string[],
  fallbacks: T[],
  fields: Array<{ keyProp: keyof T; sourcePath: string[]; fallbackProp: keyof T }>,
) {
  languages.forEach((lang) => {
    const document = sectionDocument(sections, sectionKey, lang)
    const sourceItems = asArray(getPath(document, arrayPath))

    fallbacks.forEach((fallback, index) => {
      const source = sourceForFallback(sourceItems, fallback, index)

      fields.forEach(({ keyProp, sourcePath, fallbackProp }) => {
        const translationKey = fallback[keyProp]
        if (typeof translationKey !== 'string') return

        const fallbackValue = fallback[fallbackProp]
        const value = readString(
          getPath(source, sourcePath),
          readString(translations[lang][translationKey], typeof fallbackValue === 'string' ? fallbackValue : ''),
        )

        translations[lang][translationKey] = value
      })
    })
  })
}

function mapByIndex<T extends UnknownRecord, R>(
  sources: unknown,
  fallbacks: R[],
  mapper: (fallback: R, source: T, index: number) => R,
) {
  const sourceItems = asArray(sources) as T[]
  return fallbacks.map((fallback, index) => mapper(fallback, sourceForFallback(sourceItems, fallback as Record<string, unknown>, index) as T, index))
}

function mapSettings(fallback: LandingSettings, payload: SanityLandingPayload): LandingSettings {
  const siteSettings = asRecord(payload.siteSettings)
  const page = asRecord(payload.landingPage)
  const seo = asRecord(page.seo)
  const contact = asRecord(page.contact)
  const address = asRecord(siteSettings.address)
  const socialSources = asArray(siteSettings.socialLinks)

  return {
    site: { ...fallback.site },
    brand: {
      name: readString(siteSettings.brandName, fallback.brand.name),
      logo: readSanityImageUrl(siteSettings.logo, fallback.brand.logo),
    },
    seo: {
      title: readString(readLocalized(seo.title, fallback.seo.title), fallback.seo.title),
      description: readString(readLocalized(seo.description, fallback.seo.description), fallback.seo.description),
      image: readSanityImageUrl(seo.image, fallback.seo.image),
    },
    contact: {
      email: readString(siteSettings.email, readString(contact.email, fallback.contact.email)),
      emailHref: readString(siteSettings.emailHref, readString(contact.emailHref, fallback.contact.emailHref)),
      phone: readString(siteSettings.phone, readString(contact.phone, fallback.contact.phone)),
      phoneHref: readString(siteSettings.phoneHref, readString(contact.phoneHref, fallback.contact.phoneHref)),
    },
    address: {
      city: readString(address.city, fallback.address.city),
      country: readString(address.country, fallback.address.country),
    },
    socialLinks: fallback.socialLinks.map((fallbackLink) => {
      const source = socialSources.find((item) => readString(item.label).toLowerCase() === fallbackLink.label.toLowerCase())
      return {
        label: fallbackLink.label,
        href: readString(source?.href, fallbackLink.href),
      }
    }),
  }
}

function mapAudienceItems(source: unknown, fallback: AudienceItem[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.titleKey, sanityItem.title, item.title)
    applyLocalizedText(translations, item.descriptionKey, sanityItem.description, item.description)

    return {
      ...item,
      number: readString(sanityItem.number, item.number),
      title: readLocalized(sanityItem.title, item.title),
      description: readLocalized(sanityItem.description, item.description),
    }
  })
}

function mapManifestStats(source: unknown, fallback: ManifestStat[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.labelKey, sanityItem.label, item.label)
    applyLocalizedText(translations, item.valueKey, sanityItem.value, item.value)

    return {
      ...item,
      label: readLocalized(sanityItem.label, item.label),
      value: readString(sanityItem.value, item.value),
    }
  })
}

function mapManifestCards(source: unknown, fallback: ManifestCard[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.labelKey, sanityItem.label, item.label)
    applyLocalizedText(translations, item.descriptionKey, sanityItem.description, item.description ?? '')

    return {
      ...item,
      label: readLocalized(sanityItem.label, item.label),
      description: item.descriptionKey ? readLocalized(sanityItem.description, item.description ?? '') : item.description,
    }
  })
}

function mapFoundryCards(source: unknown, fallback: FoundryCard[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.labelKey, sanityItem.label, item.label)
    applyLocalizedText(translations, item.unitKey, sanityItem.unit, item.unit ?? '')
    applyLocalizedText(translations, item.titleKey, sanityItem.title, item.title)
    applyLocalizedText(translations, item.descriptionKey, sanityItem.description, item.description)
    applyLocalizedText(translations, item.tagKey, sanityItem.tag, item.tag ?? '')

    return {
      ...item,
      number: readString(sanityItem.number, item.number),
      label: readLocalized(sanityItem.label, item.label),
      metric: readString(sanityItem.metric, item.metric),
      unit: item.unitKey ? readLocalized(sanityItem.unit, item.unit ?? '') : item.unit,
      title: readLocalized(sanityItem.title, item.title),
      description: readLocalized(sanityItem.description, item.description),
      swatches: readStringArray(sanityItem.swatches, item.swatches),
      tag: item.tagKey ? readLocalized(sanityItem.tag, item.tag ?? '') : item.tag,
    }
  })
}

function mapWorkItems(source: unknown, fallback: WorkItem[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.categoryKey, sanityItem.category, item.category)
    applyLocalizedText(translations, item.titleKey, sanityItem.title, item.title)
    applyLocalizedText(translations, item.authorKey, sanityItem.author, item.author)

    return {
      ...item,
      number: readString(sanityItem.number, item.number),
      className: readString(sanityItem.layoutClass, item.className),
      seed: readNumber(sanityItem.seed, item.seed),
      image: readSanityImageUrl(sanityItem.image, readString(sanityItem.imageUrl, item.image)),
      imageAlt: readLocalized(sanityItem.imageAlt, item.imageAlt),
      category: readLocalized(sanityItem.category, item.category),
      title: readLocalized(sanityItem.title, item.title),
      author: readLocalized(sanityItem.author, item.author),
    }
  })
}

function mapFileTypes(source: unknown, fallback: FileType[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.labelKey, sanityItem.label, item.label)
    applyLocalizedText(translations, item.descriptionKey, sanityItem.description, item.description)

    return {
      ...item,
      label: readLocalized(sanityItem.label, item.label),
      extension: readString(sanityItem.extension, item.extension),
      description: readLocalized(sanityItem.description, item.description),
    }
  })
}

function mapChecklist(source: unknown, fallback: ChecklistItem[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.labelKey, sanityItem.label, item.label)
    applyLocalizedText(translations, item.descriptionKey, sanityItem.description, item.description)

    return {
      ...item,
      label: readLocalized(sanityItem.label, item.label),
      description: readLocalized(sanityItem.description, item.description),
    }
  })
}

function mapProcessSteps(source: unknown, fallback: ProcessStep[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.titleKey, sanityItem.title, item.title)
    applyLocalizedText(translations, item.tagKey, sanityItem.tag, item.tag)

    return {
      ...item,
      number: readString(sanityItem.number, item.number),
      icon: readString(sanityItem.icon, item.icon),
      title: readLocalized(sanityItem.title, item.title),
      tag: readLocalized(sanityItem.tag, item.tag),
    }
  })
}

function mapCollabBenefits(source: unknown, fallback: CollabBenefit[], translations: LandingTranslations) {
  return mapByIndex(source, fallback, (item, sanityItem) => {
    applyLocalizedText(translations, item.textKey, sanityItem.text, item.text)

    return {
      ...item,
      text: readLocalized(sanityItem.text, item.text),
    }
  })
}

function mapSectionCopyFromSections(sections: UnknownRecord, translations: LandingTranslations) {
  applySectionText(translations, 'hero_eyebrow', sections, 'hero', ['hero', 'eyebrow'], 'Digital Foundry — Warszawa')
  applySectionText(translations, 'hero_h1a', sections, 'hero', ['hero', 'headingLine1'], 'Twój render')
  applySectionText(translations, 'hero_h1b', sections, 'hero', ['hero', 'headingLine2'], 'schodzi')
  applySectionText(translations, 'hero_h1c', sections, 'hero', ['hero', 'headingLine3'], 'z ekranu.')
  applySectionText(translations, 'hero_sub', sections, 'hero', ['hero', 'description'], '')
  applySectionText(translations, 'hero_cta1', sections, 'hero', ['hero', 'primaryCta'], 'Wyceń projekt')
  applySectionText(translations, 'hero_cta2', sections, 'hero', ['hero', 'secondaryCta'], 'Zobacz realizacje')

  languages.forEach((lang) => {
    const document = sectionDocument(sections, 'manifest', lang)
    const legacyBefore = readString(document.introBeforeBrand)
    const legacyAfter = readString(document.introAfterBrand)
    const legacyText = [legacyBefore, legacyBefore || legacyAfter ? 'tresart' : '', legacyAfter].filter(Boolean).join(' ')
    const fallback = readString(
      translations[lang].manifest_copy,
      'Tradycyjna produkcja narzuca ograniczenia. tresart usuwa je, zamieniając projekty grafików, architektów i artystów w monumentalne meble oraz formy przestrzenne.',
    )

    translations[lang].manifest_copy = readString(document.introText, readString(legacyText, fallback))
  })

  applySectionText(translations, 'manifest_a', sections, 'manifest', ['introBeforeBrand'], '')
  applySectionText(translations, 'manifest_b', sections, 'manifest', ['introAfterBrand'], '')
  applySectionText(translations, 'aud_eyebrow', sections, 'audience', ['section', 'eyebrow'], '')
  applySectionText(translations, 'aud_h2', sections, 'audience', ['section', 'heading'], '')
  applySectionText(translations, 'aud_p', sections, 'audience', ['section', 'description'], '')
  applySectionText(translations, 'cap_eyebrow', sections, 'foundry', ['section', 'eyebrow'], '')
  applySectionText(translations, 'cap_h2', sections, 'foundry', ['section', 'heading'], '')
  applySectionText(translations, 'cap_p', sections, 'foundry', ['section', 'description'], '')
  applySectionText(translations, 'work_eyebrow', sections, 'work', ['section', 'eyebrow'], '')
  applySectionText(translations, 'work_h2', sections, 'work', ['section', 'heading'], '')
  applySectionText(translations, 'work_p', sections, 'work', ['section', 'description'], '')
  applySectionText(translations, 'work_cta_p', sections, 'work', ['ctaText'], '')
  applySectionText(translations, 'work_cta_btn', sections, 'work', ['ctaLabel'], '')
  applySectionText(translations, 'file_eyebrow', sections, 'files', ['files', 'eyebrow'], '')
  applySectionText(translations, 'file_h2', sections, 'files', ['files', 'heading'], '')
  applySectionText(translations, 'file_p', sections, 'files', ['files', 'description'], '')
  applySectionText(translations, 'file_cta', sections, 'files', ['files', 'ctaLabel'], '')
  applySectionText(translations, 'proc_h2', sections, 'process', ['section', 'heading'], '')
  applySectionText(translations, 'proc_badge', sections, 'process', ['badge'], '')
  applySectionText(translations, 'col_eyebrow', sections, 'collaboration', ['collaboration', 'eyebrow'], '')
  applySectionText(translations, 'col_h2', sections, 'collaboration', ['collaboration', 'heading'], '')
  applySectionText(translations, 'col_p', sections, 'collaboration', ['collaboration', 'description'], '')
  applySectionText(translations, 'con_eyebrow', sections, 'contact', ['contact', 'eyebrow'], '')
  applySectionText(translations, 'con_h2', sections, 'contact', ['contact', 'heading'], '')
  applySectionText(translations, 'con_p', sections, 'contact', ['contact', 'description'], '')
}

function mapAudienceItemsFromSections(sections: UnknownRecord, fallback: AudienceItem[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'audience', ['items'], fallback, [
    { keyProp: 'titleKey', sourcePath: ['title'], fallbackProp: 'title' },
    { keyProp: 'descriptionKey', sourcePath: ['description'], fallbackProp: 'description' },
  ])

  return mapByIndex(sectionDocument(sections, 'audience', 'pl').items, fallback, (item, sanityItem) => ({
    ...item,
    number: readString(sanityItem.number, item.number),
    title: readString(sanityItem.title, item.title),
    description: readString(sanityItem.description, item.description),
  }))
}

function mapManifestStatsFromSections(sections: UnknownRecord, fallback: ManifestStat[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'manifest', ['manifest', 'stats'], fallback, [
    { keyProp: 'labelKey', sourcePath: ['label'], fallbackProp: 'label' },
    { keyProp: 'valueKey', sourcePath: ['value'], fallbackProp: 'value' },
  ])

  return mapByIndex(sectionDocument(sections, 'manifest', 'pl').manifest && asRecord(sectionDocument(sections, 'manifest', 'pl').manifest).stats, fallback, (item, sanityItem) => ({
    ...item,
    label: readString(sanityItem.label, item.label),
    value: readString(sanityItem.value, item.value),
  }))
}

function mapManifestCardsFromSections(sections: UnknownRecord, fallback: ManifestCard[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'manifest', ['manifest', 'cards'], fallback, [
    { keyProp: 'labelKey', sourcePath: ['label'], fallbackProp: 'label' },
    { keyProp: 'descriptionKey', sourcePath: ['description'], fallbackProp: 'description' },
  ])

  return mapByIndex(sectionDocument(sections, 'manifest', 'pl').manifest && asRecord(sectionDocument(sections, 'manifest', 'pl').manifest).cards, fallback, (item, sanityItem) => ({
    ...item,
    label: readString(sanityItem.label, item.label),
    description: item.descriptionKey ? readString(sanityItem.description, item.description ?? '') : item.description,
  }))
}

function mapFoundryCardsFromSections(sections: UnknownRecord, fallback: FoundryCard[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'foundry', ['items'], fallback, [
    { keyProp: 'labelKey', sourcePath: ['label'], fallbackProp: 'label' },
    { keyProp: 'unitKey', sourcePath: ['unit'], fallbackProp: 'unit' },
    { keyProp: 'titleKey', sourcePath: ['title'], fallbackProp: 'title' },
    { keyProp: 'descriptionKey', sourcePath: ['description'], fallbackProp: 'description' },
    { keyProp: 'tagKey', sourcePath: ['tag'], fallbackProp: 'tag' },
  ])

  return mapByIndex(sectionDocument(sections, 'foundry', 'pl').items, fallback, (item, sanityItem) => ({
    ...item,
    number: readString(sanityItem.number, item.number),
    label: readString(sanityItem.label, item.label),
    metric: readString(sanityItem.metric, item.metric),
    unit: item.unitKey ? readString(sanityItem.unit, item.unit ?? '') : item.unit,
    title: readString(sanityItem.title, item.title),
    description: readString(sanityItem.description, item.description),
    swatches: readStringArray(sanityItem.swatches, item.swatches),
    tag: item.tagKey ? readString(sanityItem.tag, item.tag ?? '') : item.tag,
  }))
}

function mapWorkItemsFromSections(sections: UnknownRecord, fallback: WorkItem[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'work', ['items'], fallback, [
    { keyProp: 'categoryKey', sourcePath: ['category'], fallbackProp: 'category' },
    { keyProp: 'titleKey', sourcePath: ['title'], fallbackProp: 'title' },
    { keyProp: 'authorKey', sourcePath: ['author'], fallbackProp: 'author' },
  ])

  return mapByIndex(sectionDocument(sections, 'work', 'pl').items, fallback, (item, sanityItem) => ({
    ...item,
    number: readString(sanityItem.number, item.number),
    className: readString(sanityItem.layoutClass, item.className),
    seed: readNumber(sanityItem.seed, item.seed),
    image: readSanityImageUrl(sanityItem.image, readString(sanityItem.imageUrl, item.image)),
    imageAlt: readString(sanityItem.imageAlt, item.imageAlt),
    category: readString(sanityItem.category, item.category),
    title: readString(sanityItem.title, item.title),
    author: readString(sanityItem.author, item.author),
  }))
}

function mapFileTypesFromSections(sections: UnknownRecord, fallback: FileType[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'files', ['files', 'types'], fallback, [
    { keyProp: 'labelKey', sourcePath: ['label'], fallbackProp: 'label' },
    { keyProp: 'descriptionKey', sourcePath: ['description'], fallbackProp: 'description' },
  ])

  return mapByIndex(getPath(sectionDocument(sections, 'files', 'pl'), ['files', 'types']), fallback, (item, sanityItem) => ({
    ...item,
    label: readString(sanityItem.label, item.label),
    extension: readString(sanityItem.extension, item.extension),
    description: readString(sanityItem.description, item.description),
  }))
}

function mapChecklistFromSections(sections: UnknownRecord, fallback: ChecklistItem[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'files', ['files', 'checklist'], fallback, [
    { keyProp: 'labelKey', sourcePath: ['label'], fallbackProp: 'label' },
    { keyProp: 'descriptionKey', sourcePath: ['description'], fallbackProp: 'description' },
  ])

  return mapByIndex(getPath(sectionDocument(sections, 'files', 'pl'), ['files', 'checklist']), fallback, (item, sanityItem) => ({
    ...item,
    label: readString(sanityItem.label, item.label),
    description: readString(sanityItem.description, item.description),
  }))
}

function mapProcessStepsFromSections(sections: UnknownRecord, fallback: ProcessStep[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'process', ['steps'], fallback, [
    { keyProp: 'titleKey', sourcePath: ['title'], fallbackProp: 'title' },
    { keyProp: 'tagKey', sourcePath: ['tag'], fallbackProp: 'tag' },
  ])

  return mapByIndex(sectionDocument(sections, 'process', 'pl').steps, fallback, (item, sanityItem) => ({
    ...item,
    number: readString(sanityItem.number, item.number),
    icon: readString(sanityItem.icon, item.icon),
    title: readString(sanityItem.title, item.title),
    tag: readString(sanityItem.tag, item.tag),
  }))
}

function mapCollabBenefitsFromSections(sections: UnknownRecord, fallback: CollabBenefit[], translations: LandingTranslations) {
  applyArrayText(translations, sections, 'collaboration', ['collaboration', 'benefits'], fallback, [
    { keyProp: 'textKey', sourcePath: ['text'], fallbackProp: 'text' },
  ])

  return mapByIndex(getPath(sectionDocument(sections, 'collaboration', 'pl'), ['collaboration', 'benefits']), fallback, (item, sanityItem) => ({
    ...item,
    text: readString(sanityItem.text, item.text),
  }))
}

function mapSectionCopy(page: UnknownRecord, translations: LandingTranslations) {
  const hero = asRecord(page.hero)
  const audience = asRecord(page.audienceSection)
  const foundry = asRecord(page.foundrySection)
  const work = asRecord(page.workSection)
  const files = asRecord(page.files)
  const process = asRecord(page.processSection)
  const collaboration = asRecord(page.collaboration)
  const contact = asRecord(page.contact)

  applyLocalizedText(translations, 'hero_eyebrow', hero.eyebrow, 'Digital Foundry — Warszawa')
  applyLocalizedText(translations, 'hero_h1a', hero.headingLine1, 'Twój render')
  applyLocalizedText(translations, 'hero_h1b', hero.headingLine2, 'schodzi')
  applyLocalizedText(translations, 'hero_h1c', hero.headingLine3, 'z ekranu.')
  applyLocalizedText(translations, 'hero_sub', hero.description, '')
  applyLocalizedText(translations, 'hero_cta1', hero.primaryCta, 'Wyceń projekt')
  applyLocalizedText(translations, 'hero_cta2', hero.secondaryCta, 'Zobacz realizacje')
  applyLocalizedText(translations, 'manifest_copy', asRecord(page.manifest).introText, 'Tradycyjna produkcja narzuca ograniczenia. tresart usuwa je, zamieniając projekty grafików, architektów i artystów w monumentalne meble oraz formy przestrzenne.')

  applyLocalizedText(translations, 'aud_eyebrow', audience.eyebrow, '')
  applyLocalizedText(translations, 'aud_h2', audience.heading, '')
  applyLocalizedText(translations, 'aud_p', audience.description, '')
  applyLocalizedText(translations, 'cap_eyebrow', foundry.eyebrow, '')
  applyLocalizedText(translations, 'cap_h2', foundry.heading, '')
  applyLocalizedText(translations, 'cap_p', foundry.description, '')
  applyLocalizedText(translations, 'work_eyebrow', work.eyebrow, '')
  applyLocalizedText(translations, 'work_h2', work.heading, '')
  applyLocalizedText(translations, 'work_p', work.description, '')
  applyLocalizedText(translations, 'work_cta_p', work.ctaText, '')
  applyLocalizedText(translations, 'work_cta_btn', work.ctaLabel, '')
  applyLocalizedText(translations, 'file_eyebrow', files.eyebrow, '')
  applyLocalizedText(translations, 'file_h2', files.heading, '')
  applyLocalizedText(translations, 'file_p', files.description, '')
  applyLocalizedText(translations, 'file_cta', files.ctaLabel, '')
  applyLocalizedText(translations, 'proc_h2', process.heading, '')
  applyLocalizedText(translations, 'proc_badge', process.badge, '')
  applyLocalizedText(translations, 'col_eyebrow', collaboration.eyebrow, '')
  applyLocalizedText(translations, 'col_h2', collaboration.heading, '')
  applyLocalizedText(translations, 'col_p', collaboration.description, '')
  applyLocalizedText(translations, 'con_eyebrow', contact.eyebrow, '')
  applyLocalizedText(translations, 'con_h2', contact.heading, '')
  applyLocalizedText(translations, 'con_p', contact.description, '')
}

export function mapSanityLandingPage(payload: SanityLandingPayload | null, fallback: LandingPageData): LandingPageData | null {
  if (!payload) {
    return null
  }

  const sections = getLandingSections(payload)
  if (hasLandingSections(payload)) {
    const translations = cloneTranslations(fallback.translations)
    mapSectionCopyFromSections(sections, translations)
    const seo = asRecord(sectionDocument(sections, 'seo', 'pl').seo)
    const settings = mapSettings(fallback.settings, payload)

    return {
      ...fallback,
      source: 'sanity',
      settings: {
        ...settings,
        seo: {
          title: readString(seo.title, settings.seo.title),
          description: readString(seo.description, settings.seo.description),
          image: readSanityImageUrl(seo.image, settings.seo.image),
        },
      },
      translations,
      audienceItems: mapAudienceItemsFromSections(sections, fallback.audienceItems, translations),
      collabBenefits: mapCollabBenefitsFromSections(sections, fallback.collabBenefits, translations),
      fileChecklist: mapChecklistFromSections(sections, fallback.fileChecklist, translations),
      fileTypes: mapFileTypesFromSections(sections, fallback.fileTypes, translations),
      foundryCards: mapFoundryCardsFromSections(sections, fallback.foundryCards, translations),
      manifestCards: mapManifestCardsFromSections(sections, fallback.manifestCards, translations),
      manifestStats: mapManifestStatsFromSections(sections, fallback.manifestStats, translations),
      processSteps: mapProcessStepsFromSections(sections, fallback.processSteps, translations),
      workItems: mapWorkItemsFromSections(sections, fallback.workItems, translations),
    }
  }

  if (!isRecord(payload.landingPage)) {
    return null
  }

  const page = asRecord(payload.landingPage)
  const manifest = asRecord(page.manifest)
  const files = asRecord(page.files)
  const collaboration = asRecord(page.collaboration)
  const translations = cloneTranslations(fallback.translations)

  mapSectionCopy(page, translations)

  return {
    ...fallback,
    source: 'sanity',
    settings: mapSettings(fallback.settings, payload),
    translations,
    audienceItems: mapAudienceItems(page.audience, fallback.audienceItems, translations),
    collabBenefits: mapCollabBenefits(collaboration.benefits, fallback.collabBenefits, translations),
    fileChecklist: mapChecklist(files.checklist, fallback.fileChecklist, translations),
    fileTypes: mapFileTypes(files.types, fallback.fileTypes, translations),
    foundryCards: mapFoundryCards(page.foundry, fallback.foundryCards, translations),
    manifestCards: mapManifestCards(manifest.cards, fallback.manifestCards, translations),
    manifestStats: mapManifestStats(manifest.stats, fallback.manifestStats, translations),
    processSteps: mapProcessSteps(page.process, fallback.processSteps, translations),
    workItems: mapWorkItems(page.work, fallback.workItems, translations),
  }
}
