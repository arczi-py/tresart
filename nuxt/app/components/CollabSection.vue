<template>
  <section class="sec-pad wrap" id="collab">
    <div class="collab reveal">
      <div class="collab-text">
        <div class="eyebrow" data-i="col_eyebrow">Współpraca</div>
        <h2 class="display" data-i="col_h2">Zostań przy swojej wizji. Resztę bierzemy my.</h2>
        <p data-i="col_p">Jesteśmy zapleczem produkcyjnym dla twórców. Ty projektujesz, my rozwiązujemy fizykę, materiał i skalę — a Twoje nazwisko zostaje na obiekcie.</p>
        <div class="collab-list">
          <div v-for="benefit in landingPage.collabBenefits" :key="benefit.textKey"><span class="ci">→</span><span :data-i="benefit.textKey">{{ benefit.text }}</span></div>
        </div>
      </div>
      <div class="collab-visual"><canvas id="collabCanvas"></canvas></div>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
