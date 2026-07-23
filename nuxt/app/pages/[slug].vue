<template>
  <div class="site-shell">
    <a href="#main" class="skip-link">Przejdź do treści</a>
    <SiteNav />
    <main id="main" class="subpage-main">
      <header class="subpage-hero">
        <div class="subpage-hero-copy">
          <div class="eyebrow">{{ page.eyebrow }}</div>
          <h1 class="display">{{ page.heading }}</h1>
          <p>{{ page.intro }}</p>
          <div class="subpage-actions">
            <template v-for="action in heroActions" :key="action.to">
              <a
                v-if="isExternalAction(action.to)"
                :href="action.to"
                :class="['btn', action.variant === 'outline' ? 'btn-outline' : 'btn-cta']"
              >
                {{ action.label }}
              </a>
              <NuxtLink
                v-else
                :to="action.to"
                :class="['btn', action.variant === 'outline' ? 'btn-outline' : 'btn-cta']"
              >
                {{ action.label }}
              </NuxtLink>
            </template>
          </div>
        </div>
        <figure class="subpage-visual">
          <img :src="page.image" :alt="page.imageAlt" decoding="async">
          <figcaption class="subpage-visual-label">
            <span>{{ page.visualPrimary }}</span>
            <span>{{ page.visualSecondary }}</span>
          </figcaption>
        </figure>
      </header>

      <section
        v-for="section in page.sections"
        :key="`${page.slug}-${section.eyebrow}`"
        :class="['subpage-section', { alt: section.alt }]"
      >
        <template v-if="section.type === 'contact'">
          <div class="subpage-contact-panel">
            <div>
              <div class="eyebrow">{{ section.eyebrow }}</div>
              <h2 class="display">{{ section.heading }}</h2>
              <p class="subpage-muted">{{ section.body }}</p>
              <a class="subpage-contact-row" :href="landingPage.settings.contact.emailHref">
                <span>
                  <span class="k">E-mail</span>
                  <span class="v">{{ landingPage.settings.contact.email }}</span>
                </span>
                <span class="arr">↗</span>
              </a>
              <a class="subpage-contact-row" :href="landingPage.settings.contact.phoneHref">
                <span>
                  <span class="k">Telefon</span>
                  <span class="v">{{ landingPage.settings.contact.phone }}</span>
                </span>
                <span class="arr">↗</span>
              </a>
            </div>
            <div>
              <div class="eyebrow">{{ section.checklistEyebrow }}</div>
              <div class="subpage-check-list contact-check">
                <div v-for="item in section.checklist" :key="item.number">
                  <span>{{ item.number }}</span>
                  <p>{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="subpage-section-head">
            <div>
              <div class="eyebrow">{{ section.eyebrow }}</div>
              <h2 class="display">{{ section.heading }}</h2>
            </div>
            <p>{{ section.body }}</p>
          </div>

          <div
            v-if="section.type === 'tiles'"
            :class="['subpage-grid', section.columns ?? 'three']"
          >
            <article v-for="tile in section.tiles" :key="`${section.eyebrow}-${tile.title}`" class="subpage-tile">
              <div v-if="tile.number" class="num">{{ tile.number }}</div>
              <span v-if="tile.label" class="label">{{ tile.label }}</span>
              <div>
                <div v-if="tile.metric" class="metric">{{ tile.metric }}</div>
                <h3>{{ tile.title }}</h3>
                <p>{{ tile.body }}</p>
              </div>
            </article>
          </div>

          <div v-else-if="section.type === 'works'" class="subpage-image-grid">
            <article
              v-for="item in section.items"
              :key="item.title"
              :class="['subpage-work-card', item.size]"
            >
              <img :src="item.image" :alt="item.alt" loading="lazy" decoding="async">
              <div class="subpage-work-meta">
                <div class="cat">{{ item.category }}</div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.body }}</p>
              </div>
            </article>
          </div>

          <div v-else-if="section.type === 'timeline'" class="subpage-timeline">
            <article v-for="stage in section.stages" :key="stage.number" class="subpage-stage">
              <div class="n">{{ stage.number }}</div>
              <h3>{{ stage.title }}</h3>
              <p>{{ stage.body }}</p>
            </article>
          </div>

          <div v-else-if="section.type === 'checks'" class="subpage-grid two">
            <article v-for="group in section.groups" :key="group.label" class="subpage-tile">
              <span class="label">{{ group.label }}</span>
              <div class="subpage-check-list">
                <div v-for="item in group.items" :key="item.number">
                  <span>{{ item.number }}</span>
                  <p>{{ item.text }}</p>
                </div>
              </div>
            </article>
          </div>
        </template>
      </section>

      <section v-if="page.cta" class="subpage-cta">
        <div>
          <h2 class="display">{{ page.cta.heading }}</h2>
          <p>{{ page.cta.body }}</p>
        </div>
        <div class="subpage-cta-contact-box" aria-label="Kontakt TRES ART">
          <a :href="landingPage.settings.contact.emailHref" class="subpage-cta-contact-row">
            <span>
              <span class="k">E-mail</span>
              <span class="v">{{ landingPage.settings.contact.email }}</span>
            </span>
            <span class="arr">↗</span>
          </a>
          <a :href="landingPage.settings.contact.phoneHref" class="subpage-cta-contact-row">
            <span>
              <span class="k">Telefon</span>
              <span class="v">{{ landingPage.settings.contact.phone }}</span>
            </span>
            <span class="arr">↗</span>
          </a>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
await initializeLandingPage()

const route = useRoute()
const landingPage = useLandingPage()
const slug = String(route.params.slug ?? '')
const page = await initializeSubpage(slug)

if (!page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const siteUrl = landingPage.settings.site.url
const canonicalUrl = `${siteUrl}/${page.slug}`
const resolveSiteUrl = (url: string) => url.startsWith('http') ? url : `${siteUrl}${url}`
const seoImageUrl = resolveSiteUrl(landingPage.settings.seo.image)
const heroActions = page.actions.length
  ? page.actions
  : [
      { label: landingPage.settings.contact.email, to: landingPage.settings.contact.emailHref },
      { label: landingPage.settings.contact.phone, to: landingPage.settings.contact.phoneHref, variant: 'outline' as const },
    ]

const isExternalAction = (to: string) => to.startsWith('mailto:') || to.startsWith('tel:') || to.startsWith('http')

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${canonicalUrl}#webpage`,
  name: page.seoTitle,
  description: page.description,
  url: canonicalUrl,
  inLanguage: 'pl-PL',
  isPartOf: { '@id': `${siteUrl}/#website` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'TRES ART',
      item: `${siteUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: page.navLabel,
      item: canonicalUrl,
    },
  ],
}

useSeoMeta({
  title: page.seoTitle,
  description: page.description,
  robots: 'index,follow',
  ogTitle: page.seoTitle,
  ogDescription: page.description,
  ogSiteName: landingPage.settings.brand.name,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: seoImageUrl,
  ogImageAlt: page.seoTitle,
  ogLocale: landingPage.settings.site.locale,
  twitterCard: 'summary_large_image',
  twitterTitle: page.seoTitle,
  twitterDescription: page.description,
  twitterImage: seoImageUrl,
  twitterImageAlt: page.seoTitle,
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
      children: JSON.stringify(webPageJsonLd),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbJsonLd),
    },
  ],
})

if (import.meta.client && route.query.preview === 'sanity') {
  const previewRefresh = window.setInterval(() => {
    void refreshSubpage(slug)
    void refreshLandingPage()
  }, 10_000)

  onBeforeUnmount(() => window.clearInterval(previewRefresh))
}

useLandingInteractions()
</script>
