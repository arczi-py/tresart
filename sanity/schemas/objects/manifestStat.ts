import {defineField, defineType} from 'sanity'

export const manifestStat = defineType({
  name: 'manifestStat',
  title: 'Manifest - statystyka',
  type: 'object',
  fields: [
    defineField({
      name: 'slot',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Statystyka 1', value: 'manifest_stat1_l'},
          {title: 'Statystyka 2', value: 'manifest_stat2_l'},
          {title: 'Statystyka 3', value: 'manifest_stat3_l'},
        ],
      },
      description: 'Wybierz, którą domyślną statystykę ma zastąpić ten wpis.',
    }),
    defineField({name: 'label', title: 'Etykieta', type: 'string'}),
    defineField({name: 'value', title: 'Wartość', type: 'string'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
