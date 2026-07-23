<template>
  <section class="sec-pad wrap" id="audience">
    <div class="sec-head reveal">
      <div>
        <div class="eyebrow" style="margin-bottom:22px;" data-i="aud_eyebrow">Z kim pracujemy</div>
        <h2 class="display" data-i="aud_h2">Twój projekt. Nasza materia.</h2>
      </div>
      <p data-i="aud_p">Jesteśmy wykonawcą, nie konkurencją. Realizujemy wizje twórców zewnętrznych — od pojedynczego mebla po przestrzenną instalację.</p>
    </div>
    <div class="audience reveal">
      <div v-for="item in landingPage.audienceItems" :key="item.number" class="aud">
        <div class="ai">{{ item.number }}</div>
        <h3 :data-i="item.titleKey">{{ item.title }}</h3>
        <p :data-i="item.descriptionKey">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
