import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'headingLine1', title: 'Nagłówek - linia 1', type: 'string'}),
    defineField({name: 'headingLine2', title: 'Nagłówek - linia 2', type: 'string'}),
    defineField({name: 'headingLine3', title: 'Nagłówek - linia 3', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
    defineField({name: 'primaryCta', title: 'CTA główne', type: 'string'}),
    defineField({name: 'secondaryCta', title: 'CTA drugie', type: 'string'}),
  ],
})
