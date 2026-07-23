import {defineField, defineType} from 'sanity'

export const landingProcessSection = defineType({
  name: 'landingProcessSection',
  title: 'Proces',
  type: 'document',
  fields: [
    defineField({name: 'section', title: 'Nagłówek sekcji', type: 'sectionIntro'}),
    defineField({name: 'badge', title: 'Badge', type: 'string'}),
    defineField({
      name: 'steps',
      title: 'Kroki',
      type: 'array',
      of: [{type: 'processStep'}],
      description: 'Możesz dodać tylko jeden krok i wybrać jego pozycję. Brakujące kroki frontend uzupełni domyślną treścią.',
    }),
  ],
  preview: {prepare: () => ({title: 'Proces'})},
})
