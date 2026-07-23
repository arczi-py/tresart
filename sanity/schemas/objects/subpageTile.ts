import {defineField, defineType} from 'sanity'

export const subpageTile = defineType({
  name: 'subpageTile',
  title: 'Karta',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'number', title: 'Numer', type: 'string'}),
    defineField({name: 'label', title: 'Mała etykieta', type: 'string'}),
    defineField({name: 'metric', title: 'Wyróżniona wartość', type: 'string'}),
    defineField({name: 'title', title: 'Tytuł', type: 'string'}),
    defineField({name: 'body', title: 'Opis', type: 'text', rows: 4}),
  ],
  preview: {select: {title: 'title', subtitle: 'label'}},
})
