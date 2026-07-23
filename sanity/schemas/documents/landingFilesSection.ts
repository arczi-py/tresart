import {defineField, defineType} from 'sanity'

export const landingFilesSection = defineType({
  name: 'landingFilesSection',
  title: 'Pliki',
  type: 'document',
  fields: [
    defineField({name: 'files', title: 'Sekcja plików', type: 'fileSection'}),
  ],
  preview: {prepare: () => ({title: 'Pliki'})},
})
