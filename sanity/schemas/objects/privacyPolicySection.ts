import {defineField, defineType} from 'sanity'

export const privacyPolicySection = defineType({
  name: 'privacyPolicySection',
  title: 'Sekcja polityki',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'title', title: 'Nagłówek sekcji', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'paragraphs',
      title: 'Akapity',
      type: 'array',
      of: [{type: 'text', rows: 4}],
      description: 'Każdy element jest osobnym akapitem widocznym na stronie.',
    }),
    defineField({
      name: 'items',
      title: 'Punkty listy',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Opcjonalna lista punktowana pod akapitami.',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
