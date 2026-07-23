import {defineField, defineType} from 'sanity'

export const subpageAction = defineType({
  name: 'subpageAction',
  title: 'Przycisk',
  type: 'object',
  fields: [
    defineField({name: 'slot', type: 'string', hidden: true, readOnly: true}),
    defineField({name: 'label', title: 'Etykieta', type: 'string'}),
    defineField({
      name: 'to',
      title: 'Adres',
      type: 'string',
      description: 'Wpisz ścieżkę, np. /kontakt, lub adres zewnętrzny, mailto: albo tel:.',
    }),
    defineField({
      name: 'variant',
      title: 'Styl',
      type: 'string',
      options: {
        list: [
          {title: 'Główny', value: 'primary'},
          {title: 'Obrys', value: 'outline'},
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'to'}},
})
