import {defineField, defineType} from 'sanity'

export const fileSection = defineType({
  name: 'fileSection',
  title: 'Sekcja plików',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Nagłówek', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
    defineField({name: 'ctaLabel', title: 'CTA', type: 'string'}),
    defineField({
      name: 'types',
      title: 'Typy plików',
      type: 'array',
      of: [{type: 'fileType'}],
      description: 'Możesz dodać tylko jeden typ pliku i wybrać jego pozycję. Brakujące typy frontend uzupełni domyślną treścią.',
    }),
    defineField({
      name: 'checklist',
      title: 'Checklist',
      type: 'array',
      of: [{type: 'checklistItem'}],
      description: 'Możesz dodać tylko jeden element checklisty i wybrać jego pozycję. Brakujące elementy frontend uzupełni domyślną treścią.',
    }),
  ],
})
