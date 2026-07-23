import {defineField, defineType} from 'sanity'

export const landingWorkSection = defineType({
  name: 'landingWorkSection',
  title: 'Realizacje',
  type: 'document',
  fields: [
    defineField({name: 'section', title: 'Nagłówek sekcji', type: 'sectionIntro'}),
    defineField({name: 'ctaText', title: 'Tekst CTA pod galerią', type: 'text'}),
    defineField({name: 'ctaLabel', title: 'Etykieta CTA', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Realizacje',
      type: 'array',
      of: [{type: 'workItem'}],
      description: 'Możesz dodać tylko jedną realizację i wybrać jej pozycję. Brakujące realizacje frontend uzupełni domyślną treścią.',
    }),
  ],
  preview: {prepare: () => ({title: 'Realizacje'})},
})
