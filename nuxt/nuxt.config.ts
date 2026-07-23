// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const sanityUseCdn = process.env.NUXT_PUBLIC_SANITY_USE_CDN

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/landingpagev3wide.css'],
  runtimeConfig: {
    public: {
      sanity: {
        projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '',
        dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2026-07-15',
        useCdn: sanityUseCdn ? sanityUseCdn !== 'false' : process.env.NODE_ENV === 'production',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'three'],
    },
  },
})
