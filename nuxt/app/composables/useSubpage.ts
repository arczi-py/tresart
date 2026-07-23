import {subpages, type Subpage} from '~/data/subpages'
import {cloneSubpage, mapSanitySubpage} from '~/utils/mapSanitySubpage'

function isFreshSanityRequest() {
  const route = useRoute()

  return route.query.preview === 'sanity' || route.query.fresh === 'sanity' || route.query.fresh === '1'
}

function useSubpageState(slug: string) {
  const fallback = subpages[slug]

  if (!fallback) return null

  return useState<Subpage>(`subpage-${slug}`, () => cloneSubpage(fallback))
}

async function loadSubpage(slug: string, forceFresh: boolean) {
  const state = useSubpageState(slug)
  const fallback = subpages[slug]

  if (!state || !fallback) return null

  const payload = await fetchSanitySubpage(slug, {
    cacheBust: forceFresh,
    useCdn: forceFresh ? false : undefined,
  })
  const mapped = mapSanitySubpage(payload, cloneSubpage(fallback))

  Object.assign(state.value, mapped)

  return state.value
}

export async function initializeSubpage(slug: string, options: {force?: boolean} = {}) {
  const forceFresh = options.force ?? (import.meta.dev || isFreshSanityRequest())

  return loadSubpage(slug, forceFresh)
}

export async function refreshSubpage(slug: string) {
  return loadSubpage(slug, true)
}
