import {defineField, defineType} from 'sanity'

export const landingHeroSection = defineType({
  name: 'landingHeroSection',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'hero'}),
  ],
  preview: {prepare: () => ({title: 'Hero'})},
})
