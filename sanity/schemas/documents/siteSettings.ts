import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia strony',
  type: 'document',
  fields: [
    defineField({name: 'brandName', title: 'Nazwa marki', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'phoneHref', title: 'Telefon href', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'email', title: 'E-mail', type: 'email', validation: (Rule) => Rule.required()}),
    defineField({name: 'emailHref', title: 'E-mail href', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'address', title: 'Adres', type: 'address', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{type: 'socialLink'}],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Ustawienia strony'}),
  },
})
