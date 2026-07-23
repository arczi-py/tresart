import {defineField, defineType} from 'sanity'

export const sectionIntro = defineType({
  name: 'sectionIntro',
  title: 'Nagłówek sekcji',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Nagłówek',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
    }),
  ],
})
