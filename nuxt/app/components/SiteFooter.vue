<template>
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <NuxtLink to="/" class="logo brand-logo" :aria-label="landingPage.settings.brand.name"><img :src="logoUrl" :alt="landingPage.settings.brand.name" class="brand-logo-img" width="128" height="96" loading="lazy" decoding="async"></NuxtLink>
          <p data-i="foot_p">Digital Foundry materializująca prace artystów, projektantów i architektów w meblach i obiektach.</p>
        </div>
        <div class="foot-col">
          <p class="foot-heading">Studio</p>
          <NuxtLink
            v-for="item in subpageNavItems"
            :key="item.to"
            :to="item.to"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
        <div class="foot-col">
          <p class="foot-heading" data-i="foot_c2">Kontakt</p>
          <a :href="landingPage.settings.contact.phoneHref">{{ landingPage.settings.contact.phone }}</a>
          <a :href="landingPage.settings.contact.emailHref">{{ landingPage.settings.contact.email }}</a>
          <NuxtLink to="/kontakt">Studio</NuxtLink>
        </div>
        <div class="foot-col">
          <p class="foot-heading" data-i="foot_c3">Social</p>
          <div class="footer-social-grid">
            <a :href="socialLinks.instagram.href" class="social-icon" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.4"/><path d="M16.8 7.2h.01"/></svg></a>
            <a :href="socialLinks.facebook.href" class="social-icon" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 8H14a2.4 2.4 0 0 0-2.4 2.4V13H8.8v3.6h2.8V21h3.7v-4.4h2.8L18.7 13h-3.4v-1.8c0-.6.4-1 1-1h2.2V8h-3z"/></svg></a>
            <a :href="socialLinks.youtube.href" class="social-icon" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.8" y="7" width="16.4" height="10" rx="3"/><path d="m10.5 10 4.2 2-4.2 2z" fill="currentColor" stroke="none"/></svg></a>
            <a :href="socialLinks.linkedin.href" class="social-icon" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 10h3.2v9H5.5zM7.1 6.2v.1M11.2 10h3.1v1.4c.5-.9 1.4-1.6 2.8-1.6 2.2 0 3.4 1.5 3.4 4.2v5h-3.2v-4.5c0-1.2-.5-1.8-1.5-1.8s-1.5.7-1.5 1.8V19h-3.1z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© 2026 TRES ART — <span data-i="foot_rights">Wszelkie prawa zastrzeżone.</span></span>
        <div class="foot-legal-links">
          <NuxtLink to="/polityka-prywatnosci" class="foot-legal">Polityka prywatności</NuxtLink>
          <button type="button" class="foot-legal foot-legal-button" @click="openCookieConsentSettings">Ustawienia cookies</button>
        </div>
        <span class="foot-made" data-i="foot_made">Tworzone w Milan & Warszawa</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { subpageNavItems } from '~/data/subpages'

const landingPage = useLandingPage()
const logoUrl = computed(() => optimizeSanityImage(landingPage.settings.brand.logo, 256))
const socialLinks = {
  instagram: landingPage.settings.socialLinks.find((link) => link.label === 'Instagram')!,
  facebook: landingPage.settings.socialLinks.find((link) => link.label === 'Facebook')!,
  youtube: landingPage.settings.socialLinks.find((link) => link.label === 'YouTube')!,
  linkedin: landingPage.settings.socialLinks.find((link) => link.label === 'LinkedIn')!,
}
</script>
