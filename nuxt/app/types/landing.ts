export type LandingLanguage = 'pl' | 'en' | 'de'

export type LandingTranslationDictionary = Record<string, string | string[]>

export type LandingTranslations = Record<LandingLanguage, LandingTranslationDictionary>

export type LandingSettings = {
  site: {
    url: string
    locale: string
  }
  brand: {
    name: string
    logo: string
  }
  seo: {
    title: string
    description: string
    image: string
  }
  contact: {
    email: string
    emailHref: string
    phone: string
    phoneHref: string
  }
  address: {
    city: string
    country: string
  }
  socialLinks: Array<{
    label: string
    href: string
  }>
}

export type AudienceItem = {
  number: string
  titleKey: string
  title: string
  descriptionKey: string
  description: string
}

export type ManifestStat = {
  labelKey: string
  label: string
  valueKey: string
  value: string
}

export type ManifestCard = {
  className: string
  labelKey: string
  label: string
  descriptionKey?: string
  description?: string
}

export type FoundryCard = {
  type: string
  className: string
  number: string
  labelKey: string
  label: string
  metric?: string
  unitKey?: string
  unit?: string
  titleKey: string
  title: string
  descriptionKey: string
  description: string
  swatches?: string[]
  tagKey?: string
  tag?: string
}

export type CollabBenefit = {
  textKey: string
  text: string
}

export type WorkItem = {
  number: string
  className: string
  seed: number
  image: string
  imageAlt: string
  categoryKey: string
  category: string
  titleKey: string
  title: string
  authorKey: string
  author: string
}

export type ProcessStep = {
  number: string
  icon: string
  titleKey: string
  title: string
  tagKey: string
  tag: string
}

export type FileType = {
  labelKey: string
  label: string
  extension: string
  descriptionKey: string
  description: string
}

export type ChecklistItem = {
  labelKey: string
  label: string
  descriptionKey: string
  description: string
}

export type LandingPageData = {
  source: 'local' | 'sanity'
  settings: LandingSettings
  translations: LandingTranslations
  audienceItems: AudienceItem[]
  collabBenefits: CollabBenefit[]
  fileChecklist: ChecklistItem[]
  fileTypes: FileType[]
  foundryCards: FoundryCard[]
  manifestCards: ManifestCard[]
  manifestStats: ManifestStat[]
  processSteps: ProcessStep[]
  workItems: WorkItem[]
}

export type LocalizedString = string | Partial<Record<LandingLanguage, string>>
