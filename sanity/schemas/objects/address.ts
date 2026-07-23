import {defineField, defineType} from 'sanity'

export const address = defineType({
  name: 'address',
  title: 'Adres',
  type: 'object',
  fields: [
    defineField({
      name: 'city',
      title: 'Miasto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Kod kraju',
      type: 'string',
      description: 'Np. PL',
      validation: (Rule) => Rule.required().max(2),
    }),
  ],
})
