export default defineAppConfig({
  site: {
    url: 'https://tresart.pl',
    locale: 'pl_PL',
  },
  brand: {
    name: 'TRES ART',
    logo: '/images/logo-tresart-poziom.png',
  },
  seo: {
    title: 'TRES ART — wielkoformatowy druk 3D i obiekty z renderów',
    description: 'Wielkoformatowy druk 3D dla grafików, projektantów i artystów 3D. Z pliku, renderu lub modelu tworzymy fizyczne obiekty, meble i instalacje.',
    image: '/images/logo-tresart-poziom.png',
  },
  contact: {
    email: 'kontakt@tresart.pl',
    emailHref: 'mailto:kontakt@tresart.pl',
    phone: '+48 796 809 318',
    phoneHref: 'tel:+48796809318',
  },
  address: {
    city: 'Warszawa',
    country: 'PL',
  },
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
})
