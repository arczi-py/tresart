import {defineField, defineType} from 'sanity'

export const landingFoundrySection = defineType({
  name: 'landingFoundrySection',
  title: 'Możliwości',
  type: 'document',
  fields: [
    defineField({name: 'section', title: 'Nagłówek sekcji', type: 'sectionIntro'}),
    defineField({
      name: 'items',
      title: 'Karty',
      type: 'array',
      of: [{type: 'foundryCard'}],
      description: 'Możesz dodać tylko jedną kartę i wybrać jej pozycję. Brakujące karty frontend uzupełni domyślną treścią.',
    }),
  ],
  preview: {prepare: () => ({title: 'Możliwości'})},
})
