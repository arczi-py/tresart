<template>
  <section class="manifest" aria-labelledby="manifest-title">
    <div class="manifest-grid wrap">
      <div class="manifest-text">
        <h2 class="manifest-copy" id="manifest-title" data-i="manifest_copy">Tradycyjna produkcja narzuca ograniczenia. tresart usuwa je, zamieniając projekty grafików, architektów i artystów w monumentalne meble oraz formy przestrzenne.</h2>
        <div class="manifest-stats" aria-label="Parametry produkcji tresart">
          <div v-for="stat in landingPage.manifestStats" :key="stat.label" class="manifest-stat">
            <span class="label" :data-i="stat.labelKey">{{ stat.label }}</span>
            <span class="value" :data-i="stat.valueKey">{{ stat.value }}</span>
          </div>
        </div>
      </div>
      <div class="manifest-stack" aria-label="Manifest produkcyjny tresart">
        <article v-for="card in landingPage.manifestCards" :key="card.label" :class="['manifest-card', card.className]">
          <div class="pill" :data-i="card.labelKey">{{ card.label }}</div>
          <p v-if="'description' in card" :data-i="card.descriptionKey">{{ card.description }}</p>
          <span v-if="!('description' in card)" class="plus" aria-hidden="true"></span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
