import {defineField, defineType} from 'sanity'

export const collabBenefit = defineType({
  name: 'collabBenefit',
  title: 'Benefit współpracy',
  type: 'object',
  fields: [
    defineField({
      name: 'slot',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Benefit 1', value: 'col_l1'},
          {title: 'Benefit 2', value: 'col_l2'},
          {title: 'Benefit 3', value: 'col_l3'},
          {title: 'Benefit 4', value: 'col_l4'},
        ],
      },
      description: 'Wybierz, który domyślny benefit ma zastąpić ten wpis.',
    }),
    defineField({name: 'text', title: 'Tekst', type: 'string'}),
  ],
  preview: {
    select: {title: 'text'},
  },
})
