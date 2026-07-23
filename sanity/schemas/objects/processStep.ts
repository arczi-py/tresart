import {defineField, defineType} from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Proces - krok',
  type: 'object',
  fields: [
    defineField({
      name: 'slot',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Krok 1', value: '01'},
          {title: 'Krok 2', value: '02'},
          {title: 'Krok 3', value: '03'},
          {title: 'Krok 4', value: '04'},
        ],
      },
      description: 'Wybierz, który domyślny krok ma zastąpić ten wpis.',
    }),
    defineField({name: 'number', title: 'Numer', type: 'string'}),
    defineField({
      name: 'icon',
      title: 'Ikona',
      type: 'string',
      options: {list: ['cluster', 'layers', 'sphere', 'orbit']},
    }),
    defineField({name: 'title', title: 'Tytuł', type: 'string'}),
    defineField({name: 'tag', title: 'Tag', type: 'string'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slot'},
  },
})
