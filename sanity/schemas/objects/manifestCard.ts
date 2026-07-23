import {defineField, defineType} from 'sanity'

export const manifestCard = defineType({
  name: 'manifestCard',
  title: 'Manifest - karta',
  type: 'object',
  fields: [
    defineField({
      name: 'slot',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Karta 1 - duża', value: 'manifest_card1_t'},
          {title: 'Karta 2', value: 'manifest_card3_t'},
          {title: 'Karta 3', value: 'manifest_card4_t'},
        ],
      },
      description: 'Wybierz, którą domyślną kartę ma zastąpić ten wpis.',
    }),
    defineField({name: 'label', title: 'Etykieta', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'description'},
  },
})
