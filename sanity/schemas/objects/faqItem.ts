import {defineField, defineType} from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Pytanie FAQ',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'question', title: 'Pytanie', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'answer', title: 'Odpowiedź', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'question', subtitle: 'answer'},
  },
})
