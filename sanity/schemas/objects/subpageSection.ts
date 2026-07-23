import {defineField, defineType} from 'sanity'

const sectionType = ({parent}: {parent?: {type?: string}}) => parent?.type

export const subpageSection = defineType({
  name: 'subpageSection',
  title: 'Sekcja podstrony',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'type', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'columns', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'alt', type: 'boolean', hidden: true, readOnly: true}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Nagłówek', type: 'string'}),
    defineField({name: 'body', title: 'Opis', type: 'text', rows: 4}),
    defineField({
      name: 'tiles',
      title: 'Karty',
      type: 'array',
      of: [{type: 'subpageTile'}],
      description: 'Edytuj treść kart. Ich liczba i kolejność są stałe dla tego układu.',
      options: {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy']},
      hidden: (context) => sectionType(context) !== 'tiles',
    }),
    defineField({
      name: 'works',
      title: 'Realizacje',
      type: 'array',
      of: [{type: 'subpageWorkItem'}],
      description: 'Edytuj zdjęcie i opis każdej realizacji. Układ galerii pozostaje stały.',
      options: {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy']},
      hidden: (context) => sectionType(context) !== 'works',
    }),
    defineField({
      name: 'stages',
      title: 'Kroki procesu',
      type: 'array',
      of: [{type: 'subpageStage'}],
      description: 'Edytuj treść kroków. Ich liczba i kolejność są stałe dla tego układu.',
      options: {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy']},
      hidden: (context) => sectionType(context) !== 'timeline',
    }),
    defineField({
      name: 'groups',
      title: 'Grupy punktów',
      type: 'array',
      of: [{type: 'subpageCheckGroup'}],
      description: 'Edytuj treść grup. Ich liczba i kolejność są stałe dla tego układu.',
      options: {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy']},
      hidden: (context) => sectionType(context) !== 'checks',
    }),
    defineField({
      name: 'checklistEyebrow',
      title: 'Eyebrow listy',
      type: 'string',
      hidden: (context) => sectionType(context) !== 'contact',
    }),
    defineField({
      name: 'checklist',
      title: 'Punkty listy',
      type: 'array',
      of: [{type: 'subpageCheckItem'}],
      description: 'Edytuj treść punktów. Ich liczba i kolejność są stałe dla tego układu.',
      options: {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy']},
      hidden: (context) => sectionType(context) !== 'contact',
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'eyebrow'},
  },
})
