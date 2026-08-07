import {defineField, defineType} from 'sanity'

export const landingFaqSection = defineType({
  name: 'landingFaqSection',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'section', title: 'Nagłówek sekcji', type: 'sectionIntro'}),
    defineField({
      name: 'items',
      title: 'Pytania i odpowiedzi',
      type: 'array',
      of: [{type: 'faqItem'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {prepare: () => ({title: 'FAQ'})},
})
