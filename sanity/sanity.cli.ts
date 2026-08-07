import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'tresart',
  deployment: {
    appId: 'axujsb5czf6jdgmn2jrxepyd',
  },
})
