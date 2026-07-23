<template>
  <main class="subpage-main materialy-redirect" aria-live="polite">
    <p>Ta podstrona została ukryta. Przekierowujemy na stronę główną.</p>
    <NuxtLink to="/">Wróć na stronę główną</NuxtLink>
  </main>
</template>

<script setup lang="ts">
await initializeLandingPage()

const landingPage = useLandingPage()
const siteUrl = landingPage.settings.site.url

useSeoMeta({
  title: 'Materiały - archiwum TRES ART',
  robots: 'noindex,nofollow',
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
  ],
})

await navigateTo('/', { redirectCode: 301 })
</script>
