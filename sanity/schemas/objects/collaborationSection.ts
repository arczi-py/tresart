import {defineField, defineType} from 'sanity'

export const collaborationSection = defineType({
  name: 'collaborationSection',
  title: 'Współpraca',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Nagłówek', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
    defineField({
      name: 'benefits',
      title: 'Benefity',
      type: 'array',
      of: [{type: 'collabBenefit'}],
      description: 'Możesz dodać tylko jeden benefit i wybrać jego pozycję. Brakujące benefity frontend uzupełni domyślną treścią.',
    }),
  ],
})
