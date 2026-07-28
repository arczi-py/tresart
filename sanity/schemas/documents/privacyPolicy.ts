import {defineField, defineType} from 'sanity'

export const privacyPolicy = defineType({
  name: 'privacyPolicy',
  title: 'Polityka prywatności',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'publication', title: 'Publikacja'},
    {name: 'controller', title: 'Administrator danych'},
    {name: 'content', title: 'Treść polityki'},
  ],
  fields: [
    defineField({name: 'seoTitle', title: 'Tytuł SEO', type: 'string', group: 'seo', validation: (Rule) => Rule.required()}),
    defineField({name: 'seoDescription', title: 'Opis SEO', type: 'text', rows: 3, group: 'seo', validation: (Rule) => Rule.required()}),
    defineField({name: 'title', title: 'Nagłówek strony', type: 'string', group: 'publication', validation: (Rule) => Rule.required()}),
    defineField({name: 'intro', title: 'Wprowadzenie', type: 'text', rows: 3, group: 'publication', validation: (Rule) => Rule.required()}),
    defineField({name: 'updatedAt', title: 'Data ostatniej aktualizacji', type: 'date', group: 'publication', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'controller',
      title: 'Dane administratora',
      type: 'object',
      group: 'controller',
      fields: [
        defineField({name: 'name', title: 'Pełna nazwa administratora', type: 'string', validation: (Rule) => Rule.required(), description: 'Wpisz pełną nazwę prawną firmy, nie tylko markę.'}),
        defineField({name: 'address', title: 'Adres siedziby', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
        defineField({name: 'email', title: 'E-mail do spraw prywatności', type: 'email', validation: (Rule) => Rule.required()}),
        defineField({name: 'phone', title: 'Telefon', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'registrationInfo', title: 'Dane rejestrowe', type: 'string', description: 'Opcjonalnie: NIP, KRS lub CEIDG.'}),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sekcje polityki',
      type: 'array',
      of: [{type: 'privacyPolicySection'}],
      group: 'content',
      description: 'Edytuj nagłówki, akapity i punkty każdej sekcji. Kolejność sekcji jest stała, aby zachować czytelną strukturę dokumentu.',
      options: {sortable: false, disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate', 'copy']},
    }),
  ],
  preview: {
    prepare: () => ({title: 'Polityka prywatności i plików cookies'}),
  },
})
