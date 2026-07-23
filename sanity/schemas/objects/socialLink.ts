import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Nazwa',
      type: 'string',
      options: {
        list: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'icon',
      title: 'Ikona',
      type: 'string',
      description: 'Opcjonalne pole techniczne. Frontend obecnie mapuje ikonę po labelu.',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})
