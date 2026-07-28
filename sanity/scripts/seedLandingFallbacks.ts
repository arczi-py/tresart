import {getCliClient} from 'sanity/cli'
import {
  audienceItems,
  collabBenefits,
  fileChecklist,
  fileTypes,
  foundryCards,
  manifestCards,
  manifestStats,
  processSteps,
  workItems,
} from '../../nuxt/app/data/landingContent'
import {landingTranslations} from '../../nuxt/app/data/landingTranslations'

type Language = keyof typeof landingTranslations
type RecordValue = Record<string, unknown>

const client = getCliClient({apiVersion: '2026-07-15'})
const languages: Language[] = ['pl', 'en', 'de']
const dryRun = process.argv.includes('--dry-run')

const siteDefaults = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  brandName: 'TRES ART',
  phone: '+48 796 809 318',
  phoneHref: 'tel:+48796809318',
  email: 'kontakt@tresart.pl',
  emailHref: 'mailto:kontakt@tresart.pl',
  address: {_type: 'address', city: 'Warszawa', country: 'PL'},
}

function keyFor(prefix: string, index: number) {
  return `${prefix}-${index + 1}`
}

function text(language: Language, key: string, fallback = '') {
  const value = landingTranslations[language][key]
  return typeof value === 'string' && value.trim() ? value : fallback
}

function textArray(language: Language, key: string) {
  const value = landingTranslations[language][key]
  return Array.isArray(value) ? [...value] : []
}

function asRecord(value: unknown): RecordValue {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as RecordValue : {}
}

function mergeFallback(defaultValue: unknown, existingValue: unknown): unknown {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(existingValue) && existingValue.length ? existingValue : defaultValue
  }

  if (typeof defaultValue === 'string') {
    return typeof existingValue === 'string' && existingValue.trim() ? existingValue : defaultValue
  }

  if (typeof defaultValue !== 'object' || defaultValue === null) {
    return existingValue ?? defaultValue
  }

  const defaults = asRecord(defaultValue)
  const existing = asRecord(existingValue)
  const systemFields = new Set(['_rev', '_createdAt', '_updatedAt'])
  const keys = new Set([
    ...Object.keys(defaults),
    ...Object.keys(existing).filter((key) => !systemFields.has(key)),
  ])

  return Object.fromEntries(
    [...keys].map((key) => [key, mergeFallback(defaults[key], existing[key])]),
  )
}

function landingDocuments(language: Language): RecordValue[] {
  return [
    {
      _id: `landing-seo-${language}`,
      _type: 'landingSeoSection',
      seo: {
        _type: 'landingSeo',
        title: language === 'pl'
          ? 'TRES ART — wielkoformatowy druk 3D i obiekty z renderów'
          : `${text(language, 'nav_foundry')} | TRES ART`,
        description: text(language, 'hero_sub'),
      },
    },
    {
      _id: `landing-hero-${language}`,
      _type: 'landingHeroSection',
      hero: {
        _type: 'hero',
        eyebrow: text(language, 'hero_eyebrow'),
        headingLine1: text(language, 'hero_h1a'),
        headingLine2: text(language, 'hero_h1b'),
        headingLine3: text(language, 'hero_h1c'),
        description: text(language, 'hero_sub'),
        primaryCta: text(language, 'hero_cta1'),
        secondaryCta: text(language, 'hero_cta2'),
      },
    },
    {
      _id: `landing-audience-${language}`,
      _type: 'landingAudienceSection',
      section: {
        _type: 'sectionIntro',
        eyebrow: text(language, 'aud_eyebrow'),
        heading: text(language, 'aud_h2'),
        description: text(language, 'aud_p'),
      },
      items: audienceItems.map((item, index) => ({
        _key: keyFor('audience', index),
        _type: 'audienceItem',
        slot: item.number,
        number: item.number,
        title: text(language, item.titleKey, item.title),
        description: text(language, item.descriptionKey, item.description),
      })),
    },
    {
      _id: `landing-foundry-${language}`,
      _type: 'landingFoundrySection',
      section: {
        _type: 'sectionIntro',
        eyebrow: text(language, 'cap_eyebrow'),
        heading: text(language, 'cap_h2'),
        description: text(language, 'cap_p'),
      },
      items: foundryCards.map((item, index) => ({
        _key: keyFor('foundry', index),
        _type: 'foundryCard',
        type: item.type,
        number: item.number,
        label: text(language, item.labelKey, item.label),
        metric: item.metric,
        unit: item.unitKey ? text(language, item.unitKey, item.unit ?? '') : undefined,
        title: text(language, item.titleKey, item.title),
        description: text(language, item.descriptionKey, item.description),
        swatches: item.swatches ? [...item.swatches] : undefined,
        tag: item.tagKey ? text(language, item.tagKey, item.tag ?? '') : undefined,
      })),
    },
    {
      _id: `landing-manifest-${language}`,
      _type: 'landingManifestSection',
      introText: text(language, 'manifest_copy'),
      marquee: textArray(language, 'marquee'),
      manifest: {
        _type: 'manifest',
        stats: manifestStats.map((item, index) => ({
          _key: keyFor('manifest-stat', index),
          _type: 'manifestStat',
          slot: item.labelKey,
          label: text(language, item.labelKey, item.label),
          value: text(language, item.valueKey, item.value),
        })),
        cards: manifestCards.map((item, index) => ({
          _key: keyFor('manifest-card', index),
          _type: 'manifestCard',
          slot: item.labelKey,
          label: text(language, item.labelKey, item.label),
          description: item.descriptionKey ? text(language, item.descriptionKey, item.description ?? '') : undefined,
        })),
      },
    },
    {
      _id: `landing-work-${language}`,
      _type: 'landingWorkSection',
      section: {
        _type: 'sectionIntro',
        eyebrow: text(language, 'work_eyebrow'),
        heading: text(language, 'work_h2'),
        description: text(language, 'work_p'),
      },
      ctaText: text(language, 'work_cta_p'),
      ctaLabel: text(language, 'work_cta_btn'),
      items: workItems.map((item, index) => ({
        _key: keyFor('work', index),
        _type: 'workItem',
        number: item.number,
        layoutClass: item.className,
        seed: item.seed,
        imageUrl: item.image,
        imageAlt: item.imageAlt,
        category: text(language, item.categoryKey, item.category),
        title: text(language, item.titleKey, item.title),
        author: text(language, item.authorKey, item.author),
      })),
    },
    {
      _id: `landing-files-${language}`,
      _type: 'landingFilesSection',
      files: {
        _type: 'fileSection',
        eyebrow: text(language, 'file_eyebrow'),
        heading: text(language, 'file_h2'),
        description: text(language, 'file_p'),
        ctaLabel: text(language, 'file_cta'),
        types: fileTypes.map((item, index) => ({
          _key: keyFor('file-type', index),
          _type: 'fileType',
          slot: item.labelKey,
          label: text(language, item.labelKey, item.label),
          extension: item.extension,
          description: text(language, item.descriptionKey, item.description),
        })),
        checklist: fileChecklist.map((item, index) => ({
          _key: keyFor('file-check', index),
          _type: 'checklistItem',
          slot: item.labelKey,
          label: text(language, item.labelKey, item.label),
          description: text(language, item.descriptionKey, item.description),
        })),
      },
    },
    {
      _id: `landing-process-${language}`,
      _type: 'landingProcessSection',
      section: {
        _type: 'sectionIntro',
        eyebrow: text(language, 'proc_eyebrow'),
        heading: text(language, 'proc_h2'),
        description: text(language, 'proc_p'),
      },
      badge: text(language, 'proc_badge'),
      steps: processSteps.map((item, index) => ({
        _key: keyFor('process', index),
        _type: 'processStep',
        slot: item.number,
        number: item.number,
        icon: item.icon,
        title: text(language, item.titleKey, item.title),
        tag: text(language, item.tagKey, item.tag),
      })),
    },
    {
      _id: `landing-collaboration-${language}`,
      _type: 'landingCollaborationSection',
      collaboration: {
        _type: 'collaborationSection',
        eyebrow: text(language, 'col_eyebrow'),
        heading: text(language, 'col_h2'),
        description: text(language, 'col_p'),
        benefits: collabBenefits.map((item, index) => ({
          _key: keyFor('benefit', index),
          _type: 'collabBenefit',
          slot: item.textKey,
          text: text(language, item.textKey, item.text),
        })),
      },
    },
    {
      _id: `landing-contact-${language}`,
      _type: 'landingContactSection',
      contact: {
        _type: 'contactSection',
        eyebrow: text(language, 'con_eyebrow'),
        heading: text(language, 'con_h2'),
        description: text(language, 'con_p'),
        email: siteDefaults.email,
        emailHref: siteDefaults.emailHref,
        phone: siteDefaults.phone,
        phoneHref: siteDefaults.phoneHref,
      },
    },
  ]
}

async function seedDocument(defaultDocument: RecordValue) {
  const existing = await client.fetch<RecordValue | null>('*[_id == $id][0]', {id: defaultDocument._id})
  const document = mergeFallback(defaultDocument, existing) as RecordValue

  if (dryRun) {
    console.log(`${existing ? 'Fill missing fields' : 'Create'} ${defaultDocument._id}`)
    return
  }

  await client.createOrReplace(document)
  console.log(`${existing ? 'Filled missing fields' : 'Created'} ${defaultDocument._id}`)
}

async function main() {
  const documents = [siteDefaults, ...languages.flatMap(landingDocuments)]

  for (const document of documents) {
    await seedDocument(document)
  }
}

await main()
