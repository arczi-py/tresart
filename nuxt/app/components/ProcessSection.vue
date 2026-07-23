<template>
  <section class="process-section" id="process">
    <div class="wrap">
      <div class="process-top reveal">
        <h2 data-i="proc_h2">Od pliku do obiektu w jednym procesie.</h2>
        <div class="process-badge" data-i="proc_badge">Powered by tresart craft</div>
      </div>
      <div class="process-grid reveal">
        <article v-for="step in landingPage.processSteps" :key="step.number" class="step">
          <svg class="process-icon" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <template v-if="step.icon === 'cluster'">
              <circle cx="42" cy="42" r="24"/><circle cx="78" cy="42" r="24"/><circle cx="42" cy="78" r="24"/><circle cx="78" cy="78" r="24"/>
              <circle cx="60" cy="60" r="18"/>
            </template>
            <template v-else-if="step.icon === 'layers'">
              <ellipse cx="60" cy="30" rx="38" ry="13"/><ellipse cx="60" cy="44" rx="38" ry="13"/><ellipse cx="60" cy="58" rx="38" ry="13"/><ellipse cx="60" cy="72" rx="38" ry="13"/><ellipse cx="60" cy="86" rx="38" ry="13"/>
            </template>
            <template v-else-if="step.icon === 'sphere'">
              <circle cx="60" cy="60" r="42"/><ellipse cx="60" cy="60" rx="18" ry="42"/><path d="M18 60h84M24 42c22 6 50 6 72 0M24 78c22-6 50-6 72 0"/>
            </template>
            <template v-else>
              <g transform="translate(60 60)"><ellipse rx="47" ry="12"/><ellipse rx="47" ry="12" transform="rotate(60)"/><ellipse rx="47" ry="12" transform="rotate(120)"/><circle r="5"/></g>
            </template>
          </svg>
          <div class="nstep">{{ step.number }}</div>
          <h3 :data-i="step.titleKey">{{ step.title }}</h3>
          <span class="file-tag" :data-i="step.tagKey">{{ step.tag }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
