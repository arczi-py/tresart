import {defineField, defineType} from 'sanity'

export const subpageCheckGroup = defineType({
  name: 'subpageCheckGroup',
  title: 'Grupa punktów',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'label', title: 'Etykieta', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Punkty',
      type: 'array',
      of: [{type: 'subpageCheckItem'}],
      description: 'Edytuj treść punktów. Ich liczba i kolejność są stałe dla tego układu.',
      options: {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy']},
    }),
  ],
  preview: {select: {title: 'label'}},
})
