import {subpages, type SubpageSection} from '../nuxt/app/data/subpages'

type SubpageSlug = keyof typeof subpages

const keyFor = (prefix: string, index: number) => `${prefix}-${index + 1}`

function mapSection(section: SubpageSection, index: number) {
  const slot = keyFor('section', index)
  const base = {
    _key: slot,
    slot,
    type: section.type,
    eyebrow: section.eyebrow,
    heading: section.heading,
    body: section.body,
    alt: 'alt' in section ? section.alt : false,
  }

  if (section.type === 'tiles') {
    return {
      ...base,
      columns: section.columns ?? 'three',
      tiles: section.tiles.map((tile, tileIndex) => ({
        _key: keyFor(`${slot}-tile`, tileIndex),
        slot: keyFor('tile', tileIndex),
        ...tile,
      })),
    }
  }

  if (section.type === 'works') {
    return {
      ...base,
      works: section.items.map((item, itemIndex) => {
        const {image, ...content} = item

        return {
          _key: keyFor(`${slot}-work`, itemIndex),
          slot: keyFor('work', itemIndex),
          ...content,
          imageUrl: image,
        }
      }),
    }
  }

  if (section.type === 'timeline') {
    return {
      ...base,
      stages: section.stages.map((stage, stageIndex) => ({
        _key: keyFor(`${slot}-stage`, stageIndex),
        slot: keyFor('stage', stageIndex),
        ...stage,
      })),
    }
  }

  if (section.type === 'checks') {
    return {
      ...base,
      groups: section.groups.map((group, groupIndex) => ({
        _key: keyFor(`${slot}-group`, groupIndex),
        slot: keyFor('group', groupIndex),
        label: group.label,
        items: group.items.map((item, itemIndex) => ({
          _key: keyFor(`${slot}-group-${groupIndex + 1}-item`, itemIndex),
          slot: keyFor('item', itemIndex),
          ...item,
        })),
      })),
    }
  }

  return {
    ...base,
    checklistEyebrow: section.checklistEyebrow,
    checklist: section.checklist.map((item, itemIndex) => ({
      _key: keyFor(`${slot}-item`, itemIndex),
      slot: keyFor('item', itemIndex),
      ...item,
    })),
  }
}

export function createSubpageInitialValue(slug: string) {
  const page = subpages[slug as SubpageSlug]

  if (!page) return {}

  return {
    _type: 'subpageContent',
    slug: page.slug,
    language: 'pl',
    seoTitle: page.seoTitle,
    description: page.description,
    heroEyebrow: page.eyebrow,
    heroHeading: page.heading,
    heroIntro: page.intro,
    heroImageUrl: page.image,
    heroImageAlt: page.imageAlt,
    visualPrimary: page.visualPrimary,
    visualSecondary: page.visualSecondary,
    actions: page.actions.map((action, index) => ({
      _key: keyFor('action', index),
      slot: keyFor('action', index),
      ...action,
    })),
    sections: page.sections.map(mapSection),
    ctaHeading: page.cta?.heading,
    ctaBody: page.cta?.body,
  }
}
