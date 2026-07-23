import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Kontakt - sekcja',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Nagłówek', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
    defineField({name: 'email', title: 'E-mail', type: 'email'}),
    defineField({name: 'emailHref', title: 'E-mail href', type: 'string'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string'}),
    defineField({name: 'phoneHref', title: 'Telefon href', type: 'string'}),
  ],
})
