import {defineField, defineType} from 'sanity'

export const landingCollaborationSection = defineType({
  name: 'landingCollaborationSection',
  title: 'Współpraca',
  type: 'document',
  fields: [
    defineField({name: 'collaboration', title: 'Współpraca', type: 'collaborationSection'}),
  ],
  preview: {prepare: () => ({title: 'Współpraca'})},
})
