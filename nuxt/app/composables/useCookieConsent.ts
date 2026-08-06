type CookieConsentPreferences = {
  analytics: boolean
  marketing: boolean
}

type CookieConsentState = CookieConsentPreferences & {
  decided: boolean
}

const cookieConsentStorageKey = 'tresart.cookie-consent.v1'
const cookieConsentChangedEvent = 'tresart:cookie-consent-settings'

const defaultCookieConsent: CookieConsentState = {
  decided: false,
  analytics: false,
  marketing: false,
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const readStoredCookieConsent = (): CookieConsentState => {
  if (!import.meta.client) {
    return { ...defaultCookieConsent }
  }

  try {
    const stored = window.localStorage.getItem(cookieConsentStorageKey)
    if (!stored) {
      return { ...defaultCookieConsent }
    }

    const parsed = JSON.parse(stored) as Partial<CookieConsentState>

    return {
      decided: parsed.decided === true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    }
  } catch {
    return { ...defaultCookieConsent }
  }
}

const getConsentModeValues = (preferences: CookieConsentPreferences) => ({
  analytics_storage: preferences.analytics ? 'granted' : 'denied',
  ad_storage: preferences.marketing ? 'granted' : 'denied',
  ad_user_data: preferences.marketing ? 'granted' : 'denied',
  ad_personalization: preferences.marketing ? 'granted' : 'denied',
})

const ensureConsentMode = () => {
  if (!import.meta.client) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtagFallback(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
}

const updateConsentMode = (preferences: CookieConsentPreferences, mode: 'default' | 'update') => {
  if (!import.meta.client) {
    return
  }

  ensureConsentMode()
  window.gtag?.('consent', mode, getConsentModeValues(preferences))
}

const loadGoogleTagManager = (gtmId: string) => {
  if (!import.meta.client || !gtmId || document.querySelector(`[data-gtm-id="${gtmId}"]`)) {
    return
  }

  ensureConsentMode()
  window.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
  script.dataset.gtmId = gtmId
  document.head.appendChild(script)
}

export const useCookieConsent = () => {
  const appConfig = useAppConfig()
  const gtmId = computed(() => appConfig.analytics?.gtmId || '')
  const consent = useState<CookieConsentState>('cookie-consent', () => ({ ...defaultCookieConsent }))
  const isSettingsOpen = useState('cookie-consent-settings-open', () => false)

  const shouldLoadGtm = computed(() => consent.value.analytics || consent.value.marketing)

  const persistConsent = () => {
    if (!import.meta.client) {
      return
    }

    window.localStorage.setItem(cookieConsentStorageKey, JSON.stringify(consent.value))
  }

  const syncTracking = (mode: 'default' | 'update') => {
    const preferences = {
      analytics: consent.value.analytics,
      marketing: consent.value.marketing,
    }

    updateConsentMode(preferences, mode)

    if (shouldLoadGtm.value) {
      loadGoogleTagManager(gtmId.value)
    }
  }

  const savePreferences = (preferences: CookieConsentPreferences) => {
    consent.value = {
      decided: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    }

    persistConsent()
    syncTracking('update')
    isSettingsOpen.value = false
  }

  const acceptAll = () => savePreferences({ analytics: true, marketing: true })
  const rejectAll = () => savePreferences({ analytics: false, marketing: false })
  const openSettings = () => {
    isSettingsOpen.value = true
  }
  const closeSettings = () => {
    isSettingsOpen.value = false
  }

  const initializeConsent = () => {
    if (!import.meta.client) {
      return
    }

    consent.value = readStoredCookieConsent()
    syncTracking('default')

    window.addEventListener(cookieConsentChangedEvent, openSettings)
  }

  const cleanupConsent = () => {
    if (!import.meta.client) {
      return
    }

    window.removeEventListener(cookieConsentChangedEvent, openSettings)
  }

  return {
    consent,
    isSettingsOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
    initializeConsent,
    cleanupConsent,
  }
}

export const openCookieConsentSettings = () => {
  if (!import.meta.client) {
    return
  }

  window.dispatchEvent(new Event(cookieConsentChangedEvent))
}
