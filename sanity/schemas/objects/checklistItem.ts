import {defineField, defineType} from 'sanity'

export const checklistItem = defineType({
  name: 'checklistItem',
  title: 'Checklist item',
  type: 'object',
  fields: [
    defineField({
      name: 'slot',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Checklist 1', value: 'file_c1_l'},
          {title: 'Checklist 2', value: 'file_c2_l'},
          {title: 'Checklist 3', value: 'file_c3_l'},
        ],
      },
      description: 'Wybierz, który domyślny element checklisty ma zastąpić ten wpis.',
    }),
    defineField({name: 'label', title: 'Etykieta', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'description'},
  },
})
