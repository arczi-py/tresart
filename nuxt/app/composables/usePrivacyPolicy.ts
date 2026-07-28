import {privacyPolicyFallback, type PrivacyPolicy, type PrivacyPolicySection} from '~/data/privacyPolicy'

type UnknownRecord = Record<string, unknown>

type SanityQueryResponse = {
  result?: UnknownRecord
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function readStrings(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback

  const strings = value.filter((item): item is string => typeof item === 'string' && item.trim())
  return strings.length ? strings : fallback
}

function clonePrivacyPolicy(policy: PrivacyPolicy): PrivacyPolicy {
  return {
    ...policy,
    controller: {...policy.controller},
    sections: policy.sections.map((section) => ({
      ...section,
      paragraphs: [...section.paragraphs],
      items: [...section.items],
    })),
  }
}

function mapSections(value: unknown, fallback: PrivacyPolicySection[]) {
  const sections = Array.isArray(value) ? value.filter(isRecord) : []

  return fallback.map((section) => {
    const source = sections.find((item) => item.slot === section.slot) ?? {}

    return {
      slot: section.slot,
      title: readString(source.title, section.title),
      paragraphs: readStrings(source.paragraphs, section.paragraphs),
      items: readStrings(source.items, section.items),
    }
  })
}

function mapPrivacyPolicy(payload: UnknownRecord | null): PrivacyPolicy {
  const fallback = clonePrivacyPolicy(privacyPolicyFallback)
  if (!payload) return fallback

  const controller = isRecord(payload.controller) ? payload.controller : {}

  return {
    seoTitle: readString(payload.seoTitle, fallback.seoTitle),
    seoDescription: readString(payload.seoDescription, fallback.seoDescription),
    title: readString(payload.title, fallback.title),
    intro: readString(payload.intro, fallback.intro),
    updatedAt: readString(payload.updatedAt, fallback.updatedAt),
    controller: {
      name: readString(controller.name, fallback.controller.name),
      address: readString(controller.address, fallback.controller.address),
      email: readString(controller.email, fallback.controller.email),
      phone: readString(controller.phone, fallback.controller.phone),
      registrationInfo: readString(controller.registrationInfo, fallback.controller.registrationInfo),
    },
    sections: mapSections(payload.sections, fallback.sections),
  }
}

async function fetchPrivacyPolicy(forceFresh: boolean) {
  const sanity = useSanityConfig()
  if (!sanity.enabled) return null

  const apiHost = forceFresh || !sanity.useCdn ? 'api' : 'apicdn'
  const endpoint = `https://${sanity.projectId}.${apiHost}.sanity.io/v${sanity.apiVersion}/data/query/${sanity.dataset}`
  const query = `*[_id == "privacyPolicy"][0]{seoTitle,seoDescription,title,intro,updatedAt,controller,sections[]{slot,title,paragraphs,items}}`

  try {
    const response = await $fetch<SanityQueryResponse>(endpoint, {
      query: {query},
      cache: forceFresh ? 'no-store' : 'default',
    })

    return response.result ?? null
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Sanity privacy policy fetch failed. Falling back to local content. ${message}`)
    return null
  }
}

function isFreshRequest() {
  const route = useRoute()
  return route.query.preview === 'sanity' || route.query.fresh === 'sanity' || route.query.fresh === '1'
}

export async function initializePrivacyPolicy(options: {force?: boolean} = {}) {
  const forceFresh = options.force ?? (import.meta.dev || isFreshRequest())
  const policy = useState<PrivacyPolicy>('privacy-policy', () => clonePrivacyPolicy(privacyPolicyFallback))
  const payload = await fetchPrivacyPolicy(forceFresh)

  Object.assign(policy.value, mapPrivacyPolicy(payload))

  return policy.value
}

export async function refreshPrivacyPolicy() {
  return initializePrivacyPolicy({force: true})
}
