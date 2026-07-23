<template>
  <section class="file-section" id="files">
    <div class="file-intake reveal">
      <div class="file-intro">
        <div>
          <div class="eyebrow" data-i="file_eyebrow">Co możesz wysłać?</div>
          <h2 data-i="file_h2">Plik wystarczy na start.</h2>
          <p data-i="file_p">Nie potrzebujesz kompletnej dokumentacji produkcyjnej. Wyślij model, render albo szkic skali — sprawdzimy geometrię i powiemy, co trzeba dopracować przed drukiem.</p>
        </div>
        <NuxtLink to="/kontakt" class="btn btn-outline" data-i="file_cta">Wyślij projekt</NuxtLink>
      </div>
      <div class="file-types">
        <article v-for="fileType in landingPage.fileTypes" :key="fileType.extension" class="file-card">
          <span :data-i="fileType.labelKey">{{ fileType.label }}</span>
          <div>
            <strong>{{ fileType.extension }}</strong>
            <p :data-i="fileType.descriptionKey">{{ fileType.description }}</p>
          </div>
        </article>
        <div class="file-checklist">
          <div v-for="item in landingPage.fileChecklist" :key="item.label">
            <b :data-i="item.labelKey">{{ item.label }}</b><span :data-i="item.descriptionKey">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
