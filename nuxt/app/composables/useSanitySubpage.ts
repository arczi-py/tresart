import {subpageSanityQuery} from '~/data/subpageSanityQuery'

type SanityQueryResponse<T> = {
  result?: T
}

type FetchSanitySubpageOptions = {
  cacheBust?: boolean
  useCdn?: boolean
}

export type SanitySubpagePayload = Record<string, unknown>

export async function fetchSanitySubpage(
  slug: string,
  options: FetchSanitySubpageOptions = {},
) {
  const sanity = useSanityConfig()

  if (!sanity.enabled) return null

  const useCdn = options.useCdn ?? sanity.useCdn
  const apiHost = useCdn ? 'apicdn' : 'api'
  const endpoint = `https://${sanity.projectId}.${apiHost}.sanity.io/v${sanity.apiVersion}/data/query/${sanity.dataset}`

  try {
    const response = await $fetch<SanityQueryResponse<SanitySubpagePayload>>(endpoint, {
      query: {
        query: subpageSanityQuery,
        '$id': `subpage-${slug}-pl`,
      },
      cache: options.cacheBust ? 'no-store' : 'default',
    })

    return response.result ?? null
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Sanity subpage fetch failed. Falling back to local content. ${message}`)
    return null
  }
}
