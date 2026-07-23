import {defineField, defineType} from 'sanity'

export const subpageStage = defineType({
  name: 'subpageStage',
  title: 'Krok procesu',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'number', title: 'Numer', type: 'string'}),
    defineField({name: 'title', title: 'Tytuł', type: 'string'}),
    defineField({name: 'body', title: 'Opis', type: 'text', rows: 4}),
  ],
  preview: {select: {title: 'title', subtitle: 'number'}},
})
