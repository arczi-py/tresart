<template>
  <section class="sec-pad wrap" id="foundry">
    <div class="sec-head reveal">
      <div>
        <div class="eyebrow" style="margin-bottom:22px;" data-i="cap_eyebrow">Digital Foundry</div>
        <h2 class="display" data-i="cap_h2">Stworzone dla rzeczy niemożliwych.</h2>
      </div>
      <p data-i="cap_p">Trzy filary definiują naszą pracę: skala, którą udźwigniemy, materia, z której formujemy, i uczciwość powierzchni, którą zostawiamy.</p>
    </div>
    <div class="bento reveal">
      <div v-for="card in landingPage.foundryCards" :key="card.number" :class="['box', card.className]">
        <div v-if="card.type === 'scale'" class="layerlines" id="layerlines"></div>
        <template v-if="card.type === 'finish'">
          <div>
            <span class="num">{{ card.number }} / <span :data-i="card.labelKey">{{ card.label }}</span></span>
            <h3 style="margin-top:24px;" :data-i="card.titleKey">{{ card.title }}</h3>
            <p :data-i="card.descriptionKey">{{ card.description }}</p>
          </div>
          <div class="tag" :data-i="card.tagKey">{{ card.tag }}</div>
        </template>
        <template v-else-if="card.type === 'scale'">
          <span class="num">{{ card.number }} / <span :data-i="card.labelKey">{{ card.label }}</span></span>
          <div style="margin-top:auto;">
            <div class="metric"><span class="big">{{ card.metric }}</span><span class="unit" :data-i="card.unitKey">{{ card.unit }}</span></div>
            <h3 :data-i="card.titleKey">{{ card.title }}</h3>
            <p :data-i="card.descriptionKey">{{ card.description }}</p>
          </div>
        </template>
        <template v-else>
          <span class="num">{{ card.number }} / <span :data-i="card.labelKey">{{ card.label }}</span></span>
          <h3 style="margin-top:24px;" :data-i="card.titleKey">{{ card.title }}</h3>
          <p :data-i="card.descriptionKey">{{ card.description }}</p>
          <div v-if="card.type === 'materials'" class="swatches" aria-hidden="true">
            <div v-for="swatch in card.swatches" :key="swatch" :style="{ background: swatch }"></div>
          </div>
          <div v-if="card.type === 'texture'" class="texture-vis" aria-hidden="true"></div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
