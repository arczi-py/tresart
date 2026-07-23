import {defineField, defineType} from 'sanity'

export const landingContactSection = defineType({
  name: 'landingContactSection',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({name: 'contact', title: 'Kontakt', type: 'contactSection'}),
  ],
  preview: {prepare: () => ({title: 'Kontakt'})},
})
