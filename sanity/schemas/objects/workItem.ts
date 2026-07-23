import {defineField, defineType} from 'sanity'

export const workItem = defineType({
  name: 'workItem',
  title: 'Realizacja',
  type: 'object',
  fields: [
    defineField({name: 'number', title: 'Numer', type: 'string'}),
    defineField({
      name: 'layoutClass',
      title: 'Pozycja w layoucie',
      type: 'string',
      options: {
        list: [
          {title: 'Realizacja 1 - duża lewa', value: 'g-a'},
          {title: 'Realizacja 2 - duża prawa', value: 'g-b'},
          {title: 'Realizacja 3', value: 'g-c'},
          {title: 'Realizacja 4', value: 'g-d'},
          {title: 'Realizacja 5', value: 'g-e'},
        ],
      },
      description: 'Wybierz, którą domyślną realizację ma zastąpić ten wpis.',
    }),
    defineField({name: 'seed', title: 'Seed tła', type: 'number', validation: (Rule) => Rule.min(1).max(99).warning()}),
    defineField({name: 'image', title: 'Obraz', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'imageUrl',
      title: 'Awaryjny URL obrazu',
      type: 'url',
      description: 'Opcjonalnie. Używane tylko jeśli nie ma Sanity image.',
    }),
    defineField({name: 'imageAlt', title: 'Alt obrazu', type: 'string'}),
    defineField({name: 'category', title: 'Kategoria', type: 'string'}),
    defineField({name: 'title', title: 'Tytuł', type: 'string'}),
    defineField({name: 'author', title: 'Autor', type: 'string'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
