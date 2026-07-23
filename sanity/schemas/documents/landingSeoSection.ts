import {defineField, defineType} from 'sanity'

export const landingSeoSection = defineType({
  name: 'landingSeoSection',
  title: 'SEO',
  type: 'document',
  fields: [
    defineField({name: 'seo', title: 'SEO', type: 'landingSeo'}),
  ],
  preview: {prepare: () => ({title: 'SEO'})},
})
