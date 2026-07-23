import { landingSanityQuery } from '~/data/landingSanityQuery'
import type { LocalizedString } from '~/types/landing'

type SanityPublicConfig = {
  projectId?: string
  dataset?: string
  apiVersion?: string
  useCdn?: boolean
}

type SanityQueryResponse<T> = {
  result?: T
}

type FetchSanityLandingPageOptions = {
  cacheBust?: boolean
  useCdn?: boolean
}

export type SanityImage = {
  url?: string
  asset?: {
    url?: string
  }
}

export type SanityLandingPayload = {
  siteSettings?: {
    brandName?: string
    logo?: SanityImage
    phone?: string
    phoneHref?: string
    email?: string
    emailHref?: string
    address?: {
      city?: string
      country?: string
    }
    socialLinks?: Array<{
      label?: string
      href?: string
      icon?: string
    }>
  }
  landingPage?: {
    seo?: {
      title?: LocalizedString
      description?: LocalizedString
      image?: SanityImage
    }
    [key: string]: unknown
  }
}

export function useSanityConfig() {
  const config = useRuntimeConfig()
  const sanity = config.public.sanity as SanityPublicConfig

  return {
    projectId: sanity.projectId || '',
    dataset: sanity.dataset || 'production',
    apiVersion: sanity.apiVersion || '2026-07-15',
    useCdn: sanity.useCdn !== false,
    enabled: Boolean(sanity.projectId && sanity.dataset),
  }
}

export async function fetchSanityLandingPage(options: FetchSanityLandingPageOptions = {}) {
  const sanity = useSanityConfig()

  if (!sanity.enabled) {
    return null
  }

  const useCdn = options.useCdn ?? sanity.useCdn
  const apiHost = useCdn ? 'apicdn' : 'api'
  const endpoint = `https://${sanity.projectId}.${apiHost}.sanity.io/v${sanity.apiVersion}/data/query/${sanity.dataset}`

  try {
    const response = await $fetch<SanityQueryResponse<SanityLandingPayload>>(endpoint, {
      query: { query: landingSanityQuery },
      cache: options.cacheBust ? 'no-store' : 'default',
    })

    return response.result ?? null
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Sanity landing page fetch failed. Falling back to local content. ${message}`)
    return null
  }
}
