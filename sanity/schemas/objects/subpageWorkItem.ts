import {defineField, defineType} from 'sanity'

export const subpageWorkItem = defineType({
  name: 'subpageWorkItem',
  title: 'Realizacja',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'size', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'image', title: 'Zdjęcie', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'imageUrl',
      title: 'Awaryjny URL zdjęcia',
      type: 'url',
      description: 'Pozostaw jako wartość przejściową. Docelowo prześlij zdjęcie powyżej do Sanity.',
    }),
    defineField({name: 'alt', title: 'Opis alternatywny zdjęcia', type: 'string'}),
    defineField({name: 'category', title: 'Kategoria', type: 'string'}),
    defineField({name: 'title', title: 'Tytuł realizacji', type: 'string'}),
    defineField({name: 'body', title: 'Opis realizacji', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
})
