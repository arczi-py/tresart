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
} from '~/data/landingContent'
import { landingTranslations } from '~/data/landingTranslations'
import type {
  AudienceItem,
  ChecklistItem,
  CollabBenefit,
  FileType,
  FoundryCard,
  LandingPageData,
  LandingSettings,
  LandingTranslations,
  ManifestCard,
  ManifestStat,
  ProcessStep,
  WorkItem,
} from '~/types/landing'

function cloneSettings(settings: LandingSettings): LandingSettings {
  return {
    site: { ...settings.site },
    brand: { ...settings.brand },
    seo: { ...settings.seo },
    contact: { ...settings.contact },
    address: { ...settings.address },
    socialLinks: settings.socialLinks.map((link) => ({ ...link })),
  }
}

function cloneTranslations(): LandingTranslations {
  return {
    pl: { ...landingTranslations.pl, marquee: [...landingTranslations.pl.marquee] },
    en: { ...landingTranslations.en, marquee: [...landingTranslations.en.marquee] },
    de: { ...landingTranslations.de, marquee: [...landingTranslations.de.marquee] },
  }
}

function createLandingPageFallback(settings: LandingSettings): LandingPageData {
  return {
    source: 'local',
    settings: cloneSettings(settings),
    translations: cloneTranslations(),
    audienceItems: audienceItems.map((item) => ({ ...item })) as AudienceItem[],
    collabBenefits: collabBenefits.map((item) => ({ ...item })) as CollabBenefit[],
    fileChecklist: fileChecklist.map((item) => ({ ...item })) as ChecklistItem[],
    fileTypes: fileTypes.map((item) => ({ ...item })) as FileType[],
    foundryCards: foundryCards.map((item) => ({ ...item, swatches: item.swatches ? [...item.swatches] : undefined })) as FoundryCard[],
    manifestCards: manifestCards.map((item) => ({ ...item })) as ManifestCard[],
    manifestStats: manifestStats.map((item) => ({ ...item })) as ManifestStat[],
    processSteps: processSteps.map((item) => ({ ...item })) as ProcessStep[],
    workItems: workItems.map((item) => ({ ...item })) as WorkItem[],
  }
}

function useLandingPageState() {
  const settings = useAppConfig() as LandingSettings

  return useState<LandingPageData>('landing-page', () => createLandingPageFallback(settings))
}

function isFreshSanityRequest() {
  const route = useRoute()

  return route.query.preview === 'sanity' || route.query.fresh === 'sanity' || route.query.fresh === '1'
}

async function loadLandingPage(forceFresh: boolean) {
  const settings = useAppConfig() as LandingSettings
  const landingPage = useLandingPageState()
  const fallback = forceFresh ? createLandingPageFallback(settings) : landingPage.value
  const payload = await fetchSanityLandingPage({
    cacheBust: forceFresh,
    useCdn: forceFresh ? false : undefined,
  })
  const mappedLandingPage = mapSanityLandingPage(payload, fallback)

  if (mappedLandingPage) {
    Object.assign(landingPage.value, mappedLandingPage)
  }

  return landingPage.value
}

export function useLandingPage() {
  return useLandingPageState().value
}

export async function initializeLandingPage(options: { force?: boolean } = {}) {
  const landingPage = useLandingPageState()
  const forceFresh = options.force ?? (import.meta.dev || isFreshSanityRequest())

  if (landingPage.value.source === 'sanity' && !forceFresh) {
    return landingPage.value
  }

  return loadLandingPage(forceFresh)
}

export async function refreshLandingPage() {
  return loadLandingPage(true)
}
