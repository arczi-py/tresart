import type {
  Subpage,
  SubpageAction,
  SubpageCheckGroup,
  SubpageCheckItem,
  SubpageSection,
  SubpageTile,
  SubpageWorkItem,
} from '~/data/subpages'
import type {SanitySubpagePayload} from '~/composables/useSanitySubpage'

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {}
}

function asArray(value: unknown): UnknownRecord[] {
  return Array.isArray(value) ? value.filter(isRecord) : []
}

function readString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function readBoolean(value: unknown, fallback: boolean | undefined) {
  return typeof value === 'boolean' ? value : fallback
}

function readImageUrl(value: unknown, fallback: string) {
  const image = asRecord(value)
  const asset = asRecord(image.asset)

  return readString(image.url, readString(asset.url, fallback))
}

function bySlot(items: UnknownRecord[], slot: string, index: number) {
  return items.find((item) => readString(item.slot, '') === slot) ?? items[index] ?? {}
}

function cloneSections(sections: SubpageSection[]): SubpageSection[] {
  return sections.map((section) => {
    if (section.type === 'tiles') return {...section, tiles: section.tiles.map((tile) => ({...tile}))}
    if (section.type === 'works') return {...section, items: section.items.map((item) => ({...item}))}
    if (section.type === 'timeline') return {...section, stages: section.stages.map((stage) => ({...stage}))}
    if (section.type === 'checks') return {...section, groups: section.groups.map((group) => ({...group, items: group.items.map((item) => ({...item}))}))}

    return {...section, checklist: section.checklist.map((item) => ({...item}))}
  })
}

export function cloneSubpage(page: Subpage): Subpage {
  return {
    ...page,
    actions: page.actions.map((action) => ({...action})),
    sections: cloneSections(page.sections),
    cta: page.cta ? {...page.cta} : undefined,
  }
}

function mapActions(source: unknown, fallback: SubpageAction[]) {
  const actions = asArray(source)

  return fallback.map((action, index) => {
    const item = bySlot(actions, `action-${index + 1}`, index)
    const variant = readString(item.variant, action.variant ?? 'primary')

    return {
      label: readString(item.label, action.label),
      to: readString(item.to, action.to),
      variant: variant === 'outline' ? 'outline' : 'primary',
    } as SubpageAction
  })
}

function mapTiles(source: unknown, fallback: SubpageTile[]) {
  const tiles = asArray(source)

  return fallback.map((tile, index) => {
    const item = bySlot(tiles, `tile-${index + 1}`, index)

    return {
      ...tile,
      number: readString(item.number, tile.number ?? '' ) || undefined,
      label: readString(item.label, tile.label ?? '') || undefined,
      metric: readString(item.metric, tile.metric ?? '') || undefined,
      title: readString(item.title, tile.title),
      body: readString(item.body, tile.body),
    }
  })
}

function mapWorks(source: unknown, fallback: SubpageWorkItem[]) {
  const works = asArray(source)

  return fallback.map((item, index) => {
    const sourceItem = bySlot(works, `work-${index + 1}`, index)

    return {
      ...item,
      image: readImageUrl(sourceItem.image, readString(sourceItem.imageUrl, item.image)),
      alt: readString(sourceItem.alt, item.alt),
      category: readString(sourceItem.category, item.category),
      title: readString(sourceItem.title, item.title),
      body: readString(sourceItem.body, item.body),
    }
  })
}

function mapStages(source: unknown, fallback: Array<{number: string, title: string, body: string}>) {
  const stages = asArray(source)

  return fallback.map((stage, index) => {
    const item = bySlot(stages, `stage-${index + 1}`, index)

    return {
      number: readString(item.number, stage.number),
      title: readString(item.title, stage.title),
      body: readString(item.body, stage.body),
    }
  })
}

function mapCheckItems(source: unknown, fallback: SubpageCheckItem[]) {
  const items = asArray(source)

  return fallback.map((check, index) => {
    const item = bySlot(items, `item-${index + 1}`, index)

    return {
      number: readString(item.number, check.number),
      text: readString(item.text, check.text),
    }
  })
}

function mapGroups(source: unknown, fallback: SubpageCheckGroup[]) {
  const groups = asArray(source)

  return fallback.map((group, index) => {
    const item = bySlot(groups, `group-${index + 1}`, index)

    return {
      label: readString(item.label, group.label),
      items: mapCheckItems(item.items, group.items),
    }
  })
}

function mapSection(section: SubpageSection, source: UnknownRecord): SubpageSection {
  const shared = {
    eyebrow: readString(source.eyebrow, section.eyebrow),
    heading: readString(source.heading, section.heading),
    body: readString(source.body, section.body),
  }

  if (section.type === 'tiles') {
    return {
      ...section,
      ...shared,
      alt: readBoolean(source.alt, section.alt),
      tiles: mapTiles(source.tiles, section.tiles),
    }
  }

  if (section.type === 'works') return {...section, ...shared, items: mapWorks(source.works, section.items)}
  if (section.type === 'timeline') return {...section, ...shared, stages: mapStages(source.stages, section.stages)}

  if (section.type === 'checks') {
    return {
      ...section,
      ...shared,
      alt: readBoolean(source.alt, section.alt),
      groups: mapGroups(source.groups, section.groups),
    }
  }

  return {
    ...section,
    ...shared,
    checklistEyebrow: readString(source.checklistEyebrow, section.checklistEyebrow),
    checklist: mapCheckItems(source.checklist, section.checklist),
  }
}

export function mapSanitySubpage(payload: SanitySubpagePayload | null, fallback: Subpage): Subpage {
  if (!payload) return fallback

  const source = payload as UnknownRecord
  const sections = asArray(source.sections)

  return {
    ...fallback,
    seoTitle: readString(source.seoTitle, fallback.seoTitle),
    description: readString(source.description, fallback.description),
    eyebrow: readString(source.heroEyebrow, fallback.eyebrow),
    heading: readString(source.heroHeading, fallback.heading),
    intro: readString(source.heroIntro, fallback.intro),
    image: readImageUrl(source.heroImage, readString(source.heroImageUrl, fallback.image)),
    imageAlt: readString(source.heroImageAlt, fallback.imageAlt),
    visualPrimary: readString(source.visualPrimary, fallback.visualPrimary),
    visualSecondary: readString(source.visualSecondary, fallback.visualSecondary),
    actions: mapActions(source.actions, fallback.actions),
    sections: fallback.sections.map((section, index) => mapSection(section, bySlot(sections, `section-${index + 1}`, index))),
    cta: fallback.cta
      ? {
          heading: readString(source.ctaHeading, fallback.cta.heading),
          body: readString(source.ctaBody, fallback.cta.body),
        }
      : undefined,
  }
}
