import {defineField, defineType} from 'sanity'

export const subpageCheckItem = defineType({
  name: 'subpageCheckItem',
  title: 'Punkt listy',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'number', title: 'Numer', type: 'string'}),
    defineField({name: 'text', title: 'Treść', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'text', subtitle: 'number'}},
})
