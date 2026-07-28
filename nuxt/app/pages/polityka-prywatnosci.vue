<template>
  <div class="site-shell">
    <a href="#main" class="skip-link">Przejdź do treści</a>
    <SiteNav />
    <main id="main" class="legal-main">
      <header class="legal-hero">
        <div class="eyebrow">Informacje prawne</div>
        <h1 class="display">{{ policy.title }}</h1>
        <p>{{ policy.intro }}</p>
        <p class="legal-updated">Ostatnia aktualizacja: {{ policy.updatedAt }}</p>
      </header>

      <section class="legal-controller" aria-labelledby="controller-heading">
        <div>
          <div class="eyebrow">Administrator</div>
          <h2 id="controller-heading" class="display">Dane kontaktowe</h2>
        </div>
        <dl>
          <div>
            <dt>Nazwa</dt>
            <dd>{{ policy.controller.name }}</dd>
          </div>
          <div>
            <dt>Adres</dt>
            <dd>{{ policy.controller.address }}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd><a :href="`mailto:${policy.controller.email}`">{{ policy.controller.email }}</a></dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd><a :href="`tel:${phoneHref}`">{{ policy.controller.phone }}</a></dd>
          </div>
          <div v-if="policy.controller.registrationInfo">
            <dt>Dane rejestrowe</dt>
            <dd>{{ policy.controller.registrationInfo }}</dd>
          </div>
        </dl>
      </section>

      <section class="legal-sections" aria-label="Treść polityki prywatności">
        <article v-for="section in policy.sections" :key="section.slot" class="legal-section">
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.items.length">
            <li v-for="item in section.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
await initializeLandingPage()

const route = useRoute()
const landingPage = useLandingPage()
const policy = await initializePrivacyPolicy()
const isPreview = route.query.preview === 'sanity'
const siteUrl = landingPage.settings.site.url
const canonicalUrl = `${siteUrl}/polityka-prywatnosci`
const seoImageUrl = landingPage.settings.seo.image.startsWith('http')
  ? landingPage.settings.seo.image
  : `${siteUrl}${landingPage.settings.seo.image}`
const phoneHref = policy.controller.phone.replace(/[^+\d]/g, '')

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${canonicalUrl}#webpage`,
  name: policy.seoTitle,
  description: policy.seoDescription,
  url: canonicalUrl,
  inLanguage: 'pl-PL',
  isPartOf: {'@id': `${siteUrl}/#website`},
}

useSeoMeta({
  title: policy.seoTitle,
  description: policy.seoDescription,
  robots: isPreview ? 'noindex,nofollow' : 'index,follow',
  ogTitle: policy.seoTitle,
  ogDescription: policy.seoDescription,
  ogSiteName: landingPage.settings.brand.name,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: seoImageUrl,
  ogImageAlt: policy.seoTitle,
  ogLocale: landingPage.settings.site.locale,
  twitterCard: 'summary_large_image',
  twitterTitle: policy.seoTitle,
  twitterDescription: policy.seoDescription,
  twitterImage: seoImageUrl,
  twitterImageAlt: policy.seoTitle,
})

useHead({
  htmlAttrs: {lang: 'pl'},
  meta: [
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'theme-color', content: '#161616'},
    {name: 'format-detection', content: 'telephone=no'},
  ],
  link: [
    {rel: 'canonical', href: canonicalUrl},
    {rel: 'sitemap', type: 'application/xml', href: `${siteUrl}/sitemap.xml`},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap'},
  ],
  script: [{type: 'application/ld+json', children: JSON.stringify(webPageJsonLd)}],
})

if (import.meta.client && isPreview) {
  const previewRefresh = window.setInterval(() => {
    void refreshPrivacyPolicy()
    void refreshLandingPage()
  }, 10_000)

  onBeforeUnmount(() => window.clearInterval(previewRefresh))
}

useLandingInteractions()
</script>
