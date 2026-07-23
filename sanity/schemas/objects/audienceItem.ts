import {defineField, defineType} from 'sanity'

export const audienceItem = defineType({
  name: 'audienceItem',
  title: 'Dla kogo - element',
  type: 'object',
  fields: [
    defineField({
      name: 'slot',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Karta 1', value: '01'},
          {title: 'Karta 2', value: '02'},
          {title: 'Karta 3', value: '03'},
        ],
      },
      description: 'Wybierz, którą domyślną kartę ma zastąpić ten wpis.',
    }),
    defineField({name: 'number', title: 'Numer', type: 'string'}),
    defineField({name: 'title', title: 'Tytuł', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'number'},
  },
})
