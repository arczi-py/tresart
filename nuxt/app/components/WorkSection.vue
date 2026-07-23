<template>
  <section class="sec-pad wrap" id="work">
    <div class="sec-head reveal">
      <div>
        <div class="eyebrow" style="margin-bottom:22px;" data-i="work_eyebrow">Realizacje</div>
        <h2 class="display" data-i="work_h2">Z pliku w przestrzeń.</h2>
      </div>
      <p data-i="work_p">Wybór prac zrealizowanych z twórcami zewnętrznymi. Każdy obiekt pozostaje dziełem swojego autora — my dostarczamy materię i precyzję.</p>
    </div>
    <div class="gallery reveal" id="gallery">
      <div v-for="item in landingPage.workItems" :key="item.number" :class="['gitem', item.className]" :data-seed="item.seed">
        <div class="ph">
          <img :src="item.image" :alt="item.imageAlt" loading="lazy" decoding="async">
        </div>
        <div class="corner">{{ item.number }}</div>
        <div class="meta">
          <div class="cat" :data-i="item.categoryKey">{{ item.category }}</div>
          <div class="gt" :data-i="item.titleKey">{{ item.title }}</div>
          <div class="by" :data-i="item.authorKey">{{ item.author }}</div>
        </div>
      </div>
    </div>
    <div class="gallery-cta reveal">
      <p data-i="work_cta_p">Realizacje to placeholdery</p>
      <NuxtLink to="/kontakt" class="btn btn-outline" data-i="work_cta_btn">Pokaż swój projekt</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
