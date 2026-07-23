import {defineField, defineType} from 'sanity'

export const landingAudienceSection = defineType({
  name: 'landingAudienceSection',
  title: 'Dla kogo',
  type: 'document',
  fields: [
    defineField({name: 'section', title: 'Nagłówek sekcji', type: 'sectionIntro'}),
    defineField({
      name: 'items',
      title: 'Karty',
      type: 'array',
      of: [{type: 'audienceItem'}],
      description: 'Możesz dodać tylko jedną kartę i wybrać jej pozycję. Brakujące karty frontend uzupełni domyślną treścią.',
    }),
  ],
  preview: {prepare: () => ({title: 'Dla kogo'})},
})
