import type {StructureResolver} from 'sanity/structure'

const singleton = (S: Parameters<StructureResolver>[0], title: string, schemaType: string, documentId: string) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title))

const privacyPolicySingleton = (S: Parameters<StructureResolver>[0]) =>
  S.listItem()
    .title('Polityka prywatności')
    .id('privacyPolicy')
    .child(
      S.document()
        .schemaType('privacyPolicy')
        .documentId('privacyPolicy')
        .title('Polityka prywatności')
        .initialValueTemplate('privacyPolicy'),
    )

const landingSections = [
  ['SEO', 'landingSeoSection', 'seo'],
  ['Hero', 'landingHeroSection', 'hero'],
  ['Dla kogo', 'landingAudienceSection', 'audience'],
  ['Możliwości', 'landingFoundrySection', 'foundry'],
  ['Manifest', 'landingManifestSection', 'manifest'],
  ['Realizacje', 'landingWorkSection', 'work'],
  ['Pliki', 'landingFilesSection', 'files'],
  ['Proces', 'landingProcessSection', 'process'],
  ['Współpraca', 'landingCollaborationSection', 'collaboration'],
  ['FAQ', 'landingFaqSection', 'faq'],
  ['Kontakt', 'landingContactSection', 'contact'],
] as const

const subpageSingleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  slug: 'mozliwosci' | 'realizacje' | 'proces' | 'dla-tworcow' | 'kontakt',
) => {
  const documentId = `subpage-${slug}-pl`

  return S.listItem()
    .title(title)
    .id(documentId)
    .child(
      S.document()
        .schemaType('subpageContent')
        .documentId(documentId)
        .title(title)
        .initialValueTemplate('subpageContentBySlug', {slug}),
    )
}

const subpages = [
  ['Możliwości', 'mozliwosci'],
  ['Realizacje', 'realizacje'],
  ['Proces', 'proces'],
  ['Dla twórców', 'dla-tworcow'],
  ['Kontakt', 'kontakt'],
] as const

const languageGroup = (
  S: Parameters<StructureResolver>[0],
  title: string,
  language: 'pl' | 'en' | 'de',
) =>
  S.listItem()
    .title(title)
    .id(`landing-${language}`)
    .child(
      S.list()
        .title(title)
        .items(
          landingSections.map(([sectionTitle, schemaType, sectionId]) =>
            singleton(S, sectionTitle, schemaType, `landing-${sectionId}-${language}`),
          ),
        ),
    )

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('TRES ART')
    .items([
      singleton(S, 'Ustawienia strony', 'siteSettings', 'siteSettings'),
      privacyPolicySingleton(S),
      S.divider(),
      languageGroup(S, 'Landing page PL', 'pl'),
      languageGroup(S, 'Landing page EN', 'en'),
      languageGroup(S, 'Landing page DE', 'de'),
      S.divider(),
      S.listItem()
        .title('Podstrony PL')
        .id('subpages-pl')
        .child(
          S.list()
            .title('Podstrony PL')
            .items(subpages.map(([title, slug]) => subpageSingleton(S, title, slug))),
        ),
    ])
