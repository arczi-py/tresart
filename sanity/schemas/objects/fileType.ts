import {defineField, defineType} from 'sanity'

export const fileType = defineType({
  name: 'fileType',
  title: 'Typ pliku',
  type: 'object',
  fields: [
    defineField({
      name: 'slot',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Typ pliku 1', value: 'file_1_l'},
          {title: 'Typ pliku 2', value: 'file_2_l'},
          {title: 'Typ pliku 3', value: 'file_3_l'},
          {title: 'Typ pliku 4', value: 'file_4_l'},
        ],
      },
      description: 'Wybierz, który domyślny typ pliku ma zastąpić ten wpis.',
    }),
    defineField({name: 'label', title: 'Etykieta', type: 'string'}),
    defineField({name: 'extension', title: 'Rozszerzenie', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'extension'},
  },
})
