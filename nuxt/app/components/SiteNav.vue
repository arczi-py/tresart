<template>
  <nav id="nav" aria-label="Główna nawigacja">
    <NuxtLink to="/" class="logo brand-logo" :aria-label="landingPage.settings.brand.name"><img :src="logoUrl" :alt="landingPage.settings.brand.name" class="brand-logo-img" width="164" height="84" decoding="async"></NuxtLink>
    <div class="nav-right">
      <div class="nav-links" id="navLinks">
        <NuxtLink
          v-for="item in subpageNavItems"
          :key="item.to"
          :to="item.to"
          :class="{ active: route.path === item.to }"
        >
          {{ item.label }}
        </NuxtLink>
        <div class="nav-menu-controls">
          <div class="lang" id="lang">
            <button data-lang="pl" class="active">PL</button>
            <button data-lang="en">EN</button>
            <button data-lang="de">DE</button>
          </div>
          <button class="theme-toggle" id="themeToggle" aria-label="Zmień motyw" title="Jasny / ciemny">
            <svg class="t-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            <svg class="t-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2 12h2.4M19.6 12H22M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/></svg>
          </button>
        </div>
      </div>
      <NuxtLink to="/kontakt" class="btn btn-cta" :class="{ active: route.path === '/kontakt' }">Kontakt</NuxtLink>
      <button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { subpageNavItems } from '~/data/subpages'

const route = useRoute()
const landingPage = useLandingPage()
const logoUrl = computed(() => optimizeSanityImage(landingPage.settings.brand.logo, 328))
</script>
