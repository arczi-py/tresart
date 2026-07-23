import { onBeforeUnmount, onMounted, watch } from 'vue'
import type { LandingPageData } from '~/types/landing'

type TranslationDictionary = Record<string, string | string[]>

function renderMarquee(track: HTMLElement, items: string[]) {
  const spans = [...items, ...items].map((item) => {
    const span = document.createElement('span')
    span.textContent = item
    return span
  })

  track.replaceChildren(...spans)
}

export function useLandingLanguage() {
  const landingPage = useState<LandingPageData>('landing-page')
  const cleanup: Array<() => void> = []

  onMounted(() => {
    const languageButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('#lang button'))
    let currentLang = 'pl'

    const setLang = (lang: string) => {
      const translations = landingPage.value.translations as Record<string, TranslationDictionary>
      const dict = translations[lang] ?? translations.pl
      currentLang = lang
      document.documentElement.lang = lang

      document.querySelectorAll<HTMLElement>('[data-i]').forEach((element) => {
        const key = element.dataset.i
        const value = key ? dict[key] : undefined

        if (typeof value === 'string') {
          element.textContent = value
        }
      })

      const marqueeTrack = document.getElementById('marqueeTrack')
      const marqueeItems = dict.marquee

      if (marqueeTrack && Array.isArray(marqueeItems)) {
        renderMarquee(marqueeTrack, marqueeItems)
      }

      languageButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.lang === lang)
      })
    }

    languageButtons.forEach((button) => {
      const onClick = () => setLang(button.dataset.lang ?? 'pl')
      button.addEventListener('click', onClick)
      cleanup.push(() => button.removeEventListener('click', onClick))
    })

    const stopWatchingLandingPage = watch(
      () => landingPage.value.translations,
      () => setLang(currentLang),
      { deep: true },
    )

    cleanup.push(stopWatchingLandingPage)

    setLang('pl')
  })

  onBeforeUnmount(() => {
    cleanup.splice(0).forEach((dispose) => dispose())
  })
}
