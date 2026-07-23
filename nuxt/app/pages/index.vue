<template>
  <div class="site-shell">
    <a href="#main" class="skip-link">Przejdź do treści</a>
    <SiteNav />
    <main id="main">
      <HeroSection />
      <ManifestSection />
      <MarqueeStrip />
      <AudienceSection />
      <FoundrySection />
      <WorkSection />
      <FileSection />
      <ProcessSection />
      <CollabSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
await initializeLandingPage()

const route = useRoute()
const landingPage = useLandingPage()
const siteUrl = landingPage.settings.site.url
const canonicalUrl = `${siteUrl}/`
const resolveSiteUrl = (url: string) => url.startsWith('http') ? url : `${siteUrl}${url}`
const logoUrl = resolveSiteUrl(landingPage.settings.brand.logo)
const seoImageUrl = resolveSiteUrl(landingPage.settings.seo.image)
const isPreview = route.query.preview === 'sanity'
const socialProfiles = landingPage.settings.socialLinks
  .map((link) => link.href)
  .filter((href) => {
    try {
      const url = new URL(href)
      return url.pathname.replaceAll('/', '').length > 0
    } catch {
      return false
    }
  })

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: landingPage.settings.brand.name,
  url: siteUrl,
  logo: logoUrl,
  image: seoImageUrl,
  email: landingPage.settings.contact.email,
  telephone: landingPage.settings.contact.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: landingPage.settings.address.city,
    addressCountry: landingPage.settings.address.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: landingPage.settings.contact.email,
    telephone: landingPage.settings.contact.phone,
    availableLanguage: ['pl', 'en', 'de'],
  },
  ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: landingPage.settings.brand.name,
  url: siteUrl,
  inLanguage: 'pl-PL',
  publisher: { '@id': `${siteUrl}/#localbusiness` },
}

useSeoMeta({
  title: landingPage.settings.seo.title,
  description: landingPage.settings.seo.description,
  robots: isPreview ? 'noindex,nofollow' : 'index,follow',
  ogTitle: landingPage.settings.seo.title,
  ogDescription: landingPage.settings.seo.description,
  ogSiteName: landingPage.settings.brand.name,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: seoImageUrl,
  ogImageAlt: landingPage.settings.seo.title,
  ogLocale: landingPage.settings.site.locale,
  twitterCard: 'summary_large_image',
  twitterTitle: landingPage.settings.seo.title,
  twitterDescription: landingPage.settings.seo.description,
  twitterImage: seoImageUrl,
  twitterImageAlt: landingPage.settings.seo.title,
})

useHead({
  htmlAttrs: { lang: 'pl' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#161616' },
    { name: 'format-detection', content: 'telephone=no' },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl },
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'sitemap', type: 'application/xml', href: `${siteUrl}/sitemap.xml` },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(localBusinessJsonLd),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(websiteJsonLd),
    },
  ],
})

if (import.meta.client) {
  if (route.query.preview === 'sanity') {
    const previewRefresh = window.setInterval(() => {
      void refreshLandingPage()
    }, 10_000)

    onBeforeUnmount(() => window.clearInterval(previewRefresh))
  }
}

useLandingInteractions()
</script>
