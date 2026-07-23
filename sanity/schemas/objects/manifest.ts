import {defineField, defineType} from 'sanity'

export const manifest = defineType({
  name: 'manifest',
  title: 'Manifest',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statystyki',
      type: 'array',
      of: [{type: 'manifestStat'}],
      description: 'Możesz dodać tylko jedną statystykę i wybrać jej pozycję. Brakujące statystyki frontend uzupełni domyślną treścią.',
    }),
    defineField({
      name: 'cards',
      title: 'Karty',
      type: 'array',
      of: [{type: 'manifestCard'}],
      description: 'Możesz dodać tylko jedną kartę i wybrać jej pozycję. Brakujące karty frontend uzupełni domyślną treścią.',
    }),
  ],
})
