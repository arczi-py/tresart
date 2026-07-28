import {privacyPolicyFallback} from '../nuxt/app/data/privacyPolicy'

export function createPrivacyPolicyInitialValue() {
  return {
    _type: 'privacyPolicy',
    seoTitle: privacyPolicyFallback.seoTitle,
    seoDescription: privacyPolicyFallback.seoDescription,
    title: privacyPolicyFallback.title,
    intro: privacyPolicyFallback.intro,
    updatedAt: privacyPolicyFallback.updatedAt,
    controller: {...privacyPolicyFallback.controller},
    sections: privacyPolicyFallback.sections.map((section) => ({
      _key: section.slot,
      slot: section.slot,
      title: section.title,
      paragraphs: [...section.paragraphs],
      items: [...section.items],
    })),
  }
}
