<template>
  <section class="contact-section" id="contact">
    <div class="contact-frame wrap">
      <div class="contact reveal">
        <div class="contact-grid">
          <div class="contact-left">
            <div class="eyebrow" data-i="con_eyebrow">Kontakt</div>
            <h2 class="display" data-i="con_h2">Porozmawiajmy o Twoim projekcie.</h2>
            <p data-i="con_p">Napisz lub zadzwoń. Każde zgłoszenie ogląda człowiek, nie kolejka — odpowiadamy z oceną wykonalności i kolejnymi krokami.</p>
            <div class="contact-methods">
              <a :href="landingPage.settings.contact.phoneHref" class="cmethod" :aria-label="`Zadzwoń: ${landingPage.settings.contact.phone}`"><div><div class="cl" data-i="con_phone_l">Telefon</div><div class="cv">{{ landingPage.settings.contact.phone }}</div></div><span class="arr">↗</span></a>
              <a :href="landingPage.settings.contact.emailHref" class="cmethod" :aria-label="`Napisz e-mail: ${landingPage.settings.contact.email}`"><div><div class="cl" data-i="con_mail_l">E-mail</div><div class="cv">{{ landingPage.settings.contact.email }}</div></div><span class="arr">↗</span></a>
            </div>
            <div class="socials">
              <a v-for="link in landingPage.settings.socialLinks" :key="link.label" :href="link.href" target="_blank" rel="noopener" :aria-label="link.label">{{ link.label }}</a>
            </div>
          </div>
          <div class="contact-right">
            <h3 data-i="con_studio">Studio</h3>
            <div class="addr">
              <span data-i="con_addr1">Pracownia i produkcja</span>
              <strong>Warszawa · Polska</strong>
            </div>
            <div class="hours">
              <div data-i="con_hours_l">Godziny kontaktu</div>
              <div data-i="con_hours_v">Pon — Pt · 9:00–18:00 CET</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const landingPage = useLandingPage()
</script>
