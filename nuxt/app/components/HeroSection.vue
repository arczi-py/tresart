<template>
  <header class="hero" id="top">
    <ClientOnly>
      <LazyHeroRibbon />
    </ClientOnly>
    <div class="hero-grain" aria-hidden="true"></div>
    <div class="hero-inner wrap">
      <div class="eyebrow" data-i="hero_eyebrow">Digital Foundry — Warszawa</div>
      <h1 class="display"><span data-i="hero_h1a">Twój render</span> <em class="shape" data-i="hero_h1b">schodzi</em> <span data-i="hero_h1c">z ekranu.</span></h1>
      <p class="sub" data-i="hero_sub">Wielkoformatowy druk 3D dla grafików, projektantów i artystów 3D. Z Twojego pliku robimy fizyczny obiekt — wierny co do detalu, gotowy do portfolio, galerii i klienta.</p>
      <div class="hero-actions">
        <NuxtLink to="/kontakt" class="btn btn-cta" data-i="hero_cta1">Wyceń projekt</NuxtLink>
        <NuxtLink to="/realizacje" class="btn btn-outline" data-i="hero_cta2">Zobacz realizacje</NuxtLink>
      </div>
    </div>
    <div class="scroll-cue"><span data-i="scroll">Przewiń</span><span class="bar"></span></div>
  </header>
</template>
