import {defineField, defineType} from 'sanity'

export const landingManifestSection = defineType({
  name: 'landingManifestSection',
  title: 'Manifest',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      title: 'Główny tekst manifestu',
      type: 'text',
      rows: 4,
      description: 'Pełny tekst nagłówka manifestu. Wpisz całość, także słowo „tresart”, jeśli ma się pojawić.',
    }),
    defineField({name: 'introBeforeBrand', title: 'Tekst przed „tresart” - legacy', type: 'text', hidden: true}),
    defineField({name: 'introAfterBrand', title: 'Tekst po „tresart” - legacy', type: 'text', hidden: true}),
    defineField({name: 'manifest', title: 'Statystyki i karty', type: 'manifest'}),
  ],
  preview: {prepare: () => ({title: 'Manifest'})},
})
