import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {deskStructure} from './structure'
import {createSubpageInitialValue} from './subpageInitialValues'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'tresart',
  title: 'TRES ART CMS',
  projectId,
  dataset,
  plugins: [structureTool({structure: deskStructure})],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((template) =>
        ![
          'siteSettings',
          'landingPage',
          'landingSeoSection',
          'landingHeroSection',
          'landingAudienceSection',
          'landingFoundrySection',
          'landingManifestSection',
          'landingWorkSection',
          'landingFilesSection',
          'landingProcessSection',
          'landingCollaborationSection',
          'landingContactSection',
          'subpageContent',
        ].includes(template.schemaType),
      ),
      {
        id: 'subpageContentBySlug',
        title: 'Podstrona',
        schemaType: 'subpageContent',
        parameters: [{name: 'slug', title: 'Slug', type: 'string'}],
        value: ({slug}) => createSubpageInitialValue(slug),
      },
    ],
  },
})
