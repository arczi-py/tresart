import {defineField, defineType} from 'sanity'

export const landingSeo = defineType({
  name: 'landingSeo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Obraz social/OG',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
