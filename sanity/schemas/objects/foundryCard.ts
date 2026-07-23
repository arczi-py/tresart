import {defineField, defineType} from 'sanity'

export const foundryCard = defineType({
  name: 'foundryCard',
  title: 'Możliwości - karta',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Skala', value: 'scale'},
          {title: 'Materiały', value: 'materials'},
          {title: 'Faktura', value: 'texture'},
          {title: 'Wykończenie', value: 'finish'},
        ],
      },
      description: 'Wybierz, którą domyślną kartę ma zastąpić ten wpis.',
    }),
    defineField({name: 'number', title: 'Numer', type: 'string'}),
    defineField({name: 'label', title: 'Etykieta', type: 'string'}),
    defineField({name: 'metric', title: 'Metryka', type: 'string'}),
    defineField({name: 'unit', title: 'Jednostka', type: 'string'}),
    defineField({name: 'title', title: 'Tytuł', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
    defineField({
      name: 'swatches',
      title: 'Kolory próbek',
      type: 'array',
      of: [{type: 'string'}],
      description: 'HEX, np. #A88A64',
    }),
    defineField({name: 'tag', title: 'Tag', type: 'string'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'type'},
  },
})
