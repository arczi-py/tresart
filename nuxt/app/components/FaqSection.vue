<template>
  <section class="faq-section wrap" id="faq" aria-labelledby="faq-heading">
    <div class="faq-head reveal">
      <div>
        <div class="eyebrow" data-i="faq_eyebrow">FAQ</div>
        <h2 id="faq-heading" class="display" data-i="faq_h2">Najczęstsze pytania przed wyceną.</h2>
      </div>
      <p data-i="faq_p">Krótko o plikach, skali, autorstwie i pierwszym kontakcie. Te odpowiedzi można edytować w Sanity Studio.</p>
    </div>

    <div class="faq-list reveal">
      <details v-for="item in landingPage.faqItems" :key="item.questionKey" class="faq-item">
        <summary>
          <span :data-i="item.questionKey">{{ item.question }}</span>
          <span class="faq-icon" aria-hidden="true"></span>
        </summary>
        <p :data-i="item.answerKey">{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
