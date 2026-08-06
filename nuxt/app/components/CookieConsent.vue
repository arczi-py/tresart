<template>
  <ClientOnly>
    <Teleport to="body">
      <section
        v-if="showBanner"
        class="cookie-banner"
        aria-labelledby="cookie-banner-title"
      >
        <div class="cookie-banner__copy">
          <p id="cookie-banner-title" class="cookie-banner__title">Prywatność i cookies</p>
          <p>
            Używamy niezbędnych plików cookies do działania strony. Analityka i narzędzia marketingowe
            uruchomią się dopiero po Twojej zgodzie.
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="cookie-btn cookie-btn--ghost" @click="rejectAll">Odrzuć</button>
          <button type="button" class="cookie-btn cookie-btn--secondary" @click="openSettings">Ustawienia</button>
          <button type="button" class="cookie-btn cookie-btn--primary" @click="acceptAll">Akceptuj wszystko</button>
        </div>
      </section>

      <div
        v-if="isSettingsOpen"
        class="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
      >
        <button type="button" class="cookie-modal__backdrop" aria-label="Zamknij ustawienia cookies" @click="closeSettings" />
        <form class="cookie-modal__panel" @submit.prevent="saveCurrentPreferences">
          <div class="cookie-modal__header">
            <div>
              <p class="cookie-modal__eyebrow">Centrum zgód</p>
              <h2 id="cookie-modal-title">Ustawienia cookies</h2>
            </div>
            <button type="button" class="cookie-modal__close" aria-label="Zamknij ustawienia cookies" @click="closeSettings">
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="cookie-options">
            <article class="cookie-option cookie-option--locked">
              <div>
                <h3>Niezbędne</h3>
                <p>Wymagane do bezpieczeństwa, zapamiętania wyboru zgód i podstawowego działania serwisu.</p>
              </div>
              <span class="cookie-option__status">Zawsze aktywne</span>
            </article>

            <label class="cookie-option">
              <span>
                <strong>Analityka</strong>
                <small>Pomaga mierzyć ruch i jakość strony przez Google Tag Manager oraz GA4.</small>
              </span>
              <input v-model="draft.analytics" type="checkbox">
              <span class="cookie-switch" aria-hidden="true"></span>
            </label>

            <label class="cookie-option">
              <span>
                <strong>Marketing</strong>
                <small>Rezerwacja na przyszłe tagi reklamowe, np. Meta Pixel po zakończonej weryfikacji.</small>
              </span>
              <input v-model="draft.marketing" type="checkbox">
              <span class="cookie-switch" aria-hidden="true"></span>
            </label>
          </div>

          <div class="cookie-modal__actions">
            <button type="button" class="cookie-btn cookie-btn--ghost" @click="rejectAll">Odrzuć</button>
            <button type="submit" class="cookie-btn cookie-btn--secondary">Zapisz wybór</button>
            <button type="button" class="cookie-btn cookie-btn--primary" @click="acceptAll">Akceptuj wszystko</button>
          </div>
        </form>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const {
  consent,
  isSettingsOpen,
  acceptAll,
  rejectAll,
  savePreferences,
  openSettings,
  closeSettings,
  initializeConsent,
  cleanupConsent,
} = useCookieConsent()

const draft = reactive({
  analytics: false,
  marketing: false,
})

const showBanner = computed(() => !consent.value.decided && !isSettingsOpen.value)

watch(isSettingsOpen, (isOpen) => {
  if (!isOpen) {
    return
  }

  draft.analytics = consent.value.analytics
  draft.marketing = consent.value.marketing
})

const saveCurrentPreferences = () => {
  savePreferences({
    analytics: draft.analytics,
    marketing: draft.marketing,
  })
}

onMounted(initializeConsent)
onBeforeUnmount(cleanupConsent)
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  right: clamp(18px, 3vw, 42px);
  bottom: clamp(18px, 3vw, 42px);
  left: clamp(18px, 3vw, 42px);
  z-index: 140;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: end;
  max-width: 1080px;
  margin: 0 auto;
  padding: 22px;
  color: var(--sand);
  background: color-mix(in srgb, var(--bg) 88%, var(--sand) 12%);
  border: 1px solid color-mix(in srgb, var(--line) 78%, var(--sand) 22%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 24px 70px rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(18px) saturate(1.02);
}

.cookie-banner__copy {
  max-width: 64ch;
}

.cookie-banner__title,
.cookie-modal__eyebrow,
.cookie-option h3,
.cookie-option strong,
.cookie-option__status,
.cookie-btn {
  font-family: 'Archivo', sans-serif;
}

.cookie-banner__title {
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--copper);
  text-transform: uppercase;
}

.cookie-banner p:not(.cookie-banner__title),
.cookie-option p,
.cookie-option small {
  color: var(--sand-dim);
  font-size: 14px;
  line-height: 1.65;
}

.cookie-banner__actions,
.cookie-modal__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.cookie-btn {
  min-height: 44px;
  padding: 12px 17px;
  border: 1px solid var(--line);
  color: var(--sand);
  background: transparent;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cookie-btn:hover,
.cookie-btn:focus-visible {
  border-color: var(--copper);
  color: var(--sand);
  transform: translateY(-1px);
}

.cookie-btn:active {
  transform: scale(0.98);
}

.cookie-btn:focus-visible {
  outline: 1px solid var(--copper);
  outline-offset: 4px;
}

.cookie-btn--primary {
  border-color: var(--copper);
  color: var(--bg);
  background: var(--copper);
}

[data-theme="light"] .cookie-btn--primary {
  color: #fbf8f3;
}

.cookie-btn--primary:hover,
.cookie-btn--primary:focus-visible {
  background: var(--copper-bright);
  border-color: var(--copper-bright);
}

.cookie-btn--secondary:hover,
.cookie-btn--secondary:focus-visible,
.cookie-btn--ghost:hover,
.cookie-btn--ghost:focus-visible {
  background: color-mix(in srgb, var(--bg) 82%, var(--sand) 18%);
}

.cookie-modal {
  position: fixed;
  inset: 0;
  z-index: 150;
  display: grid;
  place-items: center;
  padding: 20px;
}

.cookie-modal__backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(14, 14, 14, 0.68);
  cursor: pointer;
}

.cookie-modal__panel {
  position: relative;
  width: min(680px, 100%);
  max-height: min(760px, calc(100dvh - 40px));
  overflow: auto;
  padding: clamp(24px, 4vw, 38px);
  color: var(--sand);
  background: var(--bg);
  border: 1px solid var(--line);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 30px 90px rgba(0, 0, 0, 0.38);
}

.cookie-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
}

.cookie-modal__eyebrow {
  margin-bottom: 10px;
  color: var(--copper);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.cookie-modal h2 {
  font-family: 'Archivo', sans-serif;
  font-size: clamp(28px, 5vw, 46px);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.cookie-modal__close {
  position: relative;
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  color: var(--sand-dim);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cookie-modal__close span::before,
.cookie-modal__close span::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 1px;
  background: currentColor;
}

.cookie-modal__close span::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.cookie-modal__close span::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.cookie-modal__close:hover,
.cookie-modal__close:focus-visible {
  border-color: var(--copper);
  color: var(--sand);
  transform: translateY(-1px);
}

.cookie-modal__close:focus-visible {
  outline: 1px solid var(--copper);
  outline-offset: 4px;
}

.cookie-options {
  display: grid;
  gap: 12px;
  margin: 24px 0;
}

.cookie-option {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 92%, var(--sand) 8%);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cookie-option:hover,
.cookie-option:focus-within {
  border-color: color-mix(in srgb, var(--copper) 68%, var(--line) 32%);
  background: color-mix(in srgb, var(--bg) 88%, var(--sand) 12%);
}

.cookie-option--locked {
  grid-template-columns: minmax(0, 1fr) auto;
  cursor: default;
}

.cookie-option h3,
.cookie-option strong {
  display: block;
  margin-bottom: 6px;
  color: var(--sand);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.cookie-option__status {
  color: var(--copper);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.cookie-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.cookie-switch {
  position: relative;
  width: 52px;
  height: 30px;
  border: 1px solid var(--line);
  background: var(--bg);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cookie-switch::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 18px;
  height: 18px;
  background: var(--sand-dim);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cookie-option input:focus-visible + .cookie-switch {
  outline: 1px solid var(--copper);
  outline-offset: 4px;
}

.cookie-option input:checked + .cookie-switch {
  border-color: var(--copper);
  background: color-mix(in srgb, var(--copper) 42%, var(--bg) 58%);
}

.cookie-option input:checked + .cookie-switch::after {
  transform: translateX(22px);
  background: var(--sand);
}

@media (max-width: 820px) {
  .cookie-banner {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .cookie-banner__actions,
  .cookie-modal__actions {
    justify-content: stretch;
  }

  .cookie-btn {
    flex: 1 1 100%;
  }
}

@media (max-width: 560px) {
  .cookie-modal {
    align-items: end;
    padding: 12px;
  }

  .cookie-modal__panel {
    max-height: calc(100dvh - 24px);
    padding: 22px;
  }

  .cookie-option,
  .cookie-option--locked {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .cookie-option__status {
    white-space: normal;
  }
}
</style>
