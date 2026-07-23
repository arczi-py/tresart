export type SubpageAction = {
  label: string
  to: string
  variant?: 'primary' | 'outline'
}

export type SubpageTile = {
  label?: string
  number?: string
  metric?: string
  title: string
  body: string
}

export type SubpageWorkItem = {
  size: 'large' | 'medium' | 'small'
  image: string
  alt: string
  category: string
  title: string
  body: string
}

export type SubpageCheckItem = {
  number: string
  text: string
}

export type SubpageCheckGroup = {
  label: string
  items: SubpageCheckItem[]
}

export type SubpageSection =
  | {
    type: 'tiles'
    eyebrow: string
    heading: string
    body: string
    columns?: 'two' | 'three' | 'four'
    alt?: boolean
    tiles: SubpageTile[]
  }
  | {
    type: 'works'
    eyebrow: string
    heading: string
    body: string
    items: SubpageWorkItem[]
  }
  | {
    type: 'timeline'
    eyebrow: string
    heading: string
    body: string
    stages: Array<{ number: string, title: string, body: string }>
  }
  | {
    type: 'checks'
    eyebrow: string
    heading: string
    body: string
    alt?: boolean
    groups: SubpageCheckGroup[]
  }
  | {
    type: 'contact'
    eyebrow: string
    heading: string
    body: string
    checklistEyebrow: string
    checklist: SubpageCheckItem[]
  }

export type Subpage = {
  slug: string
  navLabel: string
  seoTitle: string
  description: string
  eyebrow: string
  heading: string
  intro: string
  image: string
  imageAlt: string
  visualPrimary: string
  visualSecondary: string
  actions: SubpageAction[]
  sections: SubpageSection[]
  cta?: {
    heading: string
    body: string
  }
}

export const subpageNavItems = [
  { label: 'Możliwości', to: '/mozliwosci' },
  { label: 'Realizacje', to: '/realizacje' },
  { label: 'Proces', to: '/proces' },
  { label: 'Dla twórców', to: '/dla-tworcow' },
]

export const subpages: Record<string, Subpage> = {
  mozliwosci: {
    slug: 'mozliwosci',
    navLabel: 'Możliwości',
    seoTitle: 'Możliwości - TRES ART',
    description: 'Możliwości TRES ART: wielkoformatowy druk 3D, wierność renderu, krótkie serie i ręczne wykończenie obiektów.',
    eyebrow: 'Możliwości produkcyjne',
    heading: 'Robimy to, czego inni nie wydrukują.',
    intro: 'Łączymy wielkoformatowy druk 3D, techniczną analizę geometrii i ręczne wykończenie. Z Twojego pliku powstaje obiekt gotowy do zdjęć, ekspozycji albo klienta.',
    image: 'https://picsum.photos/seed/tresart-production-arm/1200/940',
    imageAlt: 'Stanowisko produkcyjne dla dużych obiektów i prototypów',
    visualPrimary: 'Large format',
    visualSecondary: '2.5M',
    actions: [
      { label: 'Wyceń projekt', to: '/kontakt' },
      { label: 'Zobacz realizacje', to: '/realizacje', variant: 'outline' },
    ],
    sections: [
      {
        type: 'tiles',
        eyebrow: 'Zakres',
        heading: 'Od skali do detalu.',
        body: 'Najważniejsze jest to, żeby obiekt fizyczny trzymał intencję projektu: proporcję, masę, rytm linii i powierzchnię, która wygląda świadomie.',
        columns: 'four',
        tiles: [
          { number: '01', title: 'Druk wielkoformatowy', body: 'Jedna ciągła przestrzeń robocza dla mebli, rzeźb i elementów ekspozycyjnych.' },
          { number: '02', title: 'Wierność renderu', body: 'Trzymamy krawędzie, proporcje i charakter powierzchni, zamiast przerabiać projekt pod wygodę produkcji.' },
          { number: '03', title: 'Krótkie serie', body: 'Bez form, bez kosztownego setupu. Od pojedynczego obiektu po mały nakład.' },
          { number: '04', title: 'Hand finish', body: 'Szlif, zabezpieczenie, kolor i kontrola jakości po druku. Gotowe do realnego użycia.' },
        ],
      },
      {
        type: 'tiles',
        eyebrow: 'Co bierzemy na siebie',
        heading: 'Produkcja bez zgadywania.',
        body: 'Nie oczekujemy, że plik będzie od razu idealnie produkcyjny. Sprawdzamy go technicznie i mówimy konkretnie, co trzeba poprawić przed drukiem.',
        alt: true,
        tiles: [
          { label: 'Analiza pliku', title: 'Geometria', body: 'Grubości, orientacja, zamknięcie siatki, ryzyka przy skali i punkty wymagające korekty.' },
          { label: 'Dobór procesu', title: 'Materiał i skala', body: 'Wybieramy materiał, parametry druku i sposób wykończenia pod docelowe użycie obiektu.' },
          { label: 'Realizacja', title: 'Druk i wykończenie', body: 'Produkujemy, wykańczamy i przygotowujemy obiekt do odbioru, sesji albo ekspozycji.' },
        ],
      },
    ],
    cta: {
      heading: 'Masz model? Sprawdźmy, co da się zrobić.',
      body: 'Wyślij plik, render albo szkic skali. Wrócimy z oceną wykonalności i następnym krokiem.',
    },
  },
  realizacje: {
    slug: 'realizacje',
    navLabel: 'Realizacje',
    seoTitle: 'Realizacje - TRES ART',
    description: 'Realizacje TRES ART: meble, rzeźby, instalacje i obiekty produkowane z plików 3D zewnętrznych twórców.',
    eyebrow: 'Realizacje',
    heading: 'Z pliku w obiekt.',
    intro: 'Ta strona jest bazą pod portfolio. Na razie zawiera kierunkowe placeholdery wizualne i strukturę opisów, którą można później podmienić na prawdziwe zdjęcia projektów.',
    image: 'https://picsum.photos/seed/tresart-gallery-object/1200/940',
    imageAlt: 'Obiekt rzeźbiarski w przestrzeni ekspozycyjnej',
    visualPrimary: 'Work archive',
    visualSecondary: '01 / 06',
    actions: [
      { label: 'Pokaż swój projekt', to: '/kontakt' },
      { label: 'Zobacz proces', to: '/proces', variant: 'outline' },
    ],
    sections: [
      {
        type: 'works',
        eyebrow: 'Portfolio',
        heading: 'Meble, rzeźby, instalacje.',
        body: 'Każdy wpis powinien finalnie pokazywać autora projektu, kategorię, materiał, skalę i zakres naszego udziału: produkcja, doradztwo techniczne, wykończenie.',
        items: [
          { size: 'large', image: 'https://picsum.photos/seed/tresart-monolith-chair/1200/900', alt: 'Nowoczesny fotel w minimalistycznym wnętrzu', category: 'Meble', title: 'Fotel Monolith', body: 'Projekt zewnętrznego studia, wielkoformatowy druk i finish.' },
          { size: 'medium', image: 'https://picsum.photos/seed/tresart-vessel-object/1000/900', alt: 'Organiczny obiekt dekoracyjny', category: 'Obiekt', title: 'Vessel', body: 'Forma przestrzenna z pliku 3D, kontrola skali i powierzchni.' },
          { size: 'small', image: 'https://picsum.photos/seed/tresart-sediment-table/900/800', alt: 'Designerski stół w jasnym wnętrzu', category: 'Meble', title: 'Sediment', body: 'Stół autorski, prototyp i przygotowanie do krótkiej serii.' },
          { size: 'small', image: 'https://picsum.photos/seed/tresart-flux-wall/900/800', alt: 'Geometryczna struktura architektoniczna', category: 'Instalacja', title: 'Flux Wall', body: 'Element ekspozycyjny, segmentacja i montaż przestrzenny.' },
          { size: 'small', image: 'https://picsum.photos/seed/tresart-contour-prototype/900/800', alt: 'Salon z autorskim obiektem meblowym', category: 'Prototyp', title: 'Contour', body: 'Model mebla do oceny ergonomii i wykończenia.' },
        ],
      },
      {
        type: 'tiles',
        eyebrow: 'Opis realizacji',
        heading: 'Co warto pokazać przy projekcie.',
        body: 'Gdy pojawią się prawdziwe zdjęcia, każda realizacja powinna mówić konkretnie, co było wyzwaniem i jaką decyzję produkcyjną podjęliśmy.',
        columns: 'four',
        alt: true,
        tiles: [
          { label: 'Autor', title: 'Kto projektował', body: 'Nazwa twórcy, studia albo informacja o poufności, jeśli projekt nie może być podpisany.' },
          { label: 'Skala', title: 'Wymiary', body: 'Docelowy rozmiar, liczba elementów i informacja, czy obiekt drukowano w całości.' },
          { label: 'Materiał', title: 'Powierzchnia', body: 'Rodzaj materiału, poziom wygładzenia, kolor i decyzje dotyczące widocznej linii druku.' },
          { label: 'Zakres', title: 'Nasza rola', body: 'Analiza pliku, produkcja, wykończenie, doradztwo techniczne albo przygotowanie serii.' },
        ],
      },
    ],
    cta: {
      heading: 'Dołóż swój projekt do archiwum.',
      body: 'Prześlij plik lub render. Ocenimy wykonalność i zaproponujemy najkrótszą drogę do fizycznego obiektu.',
    },
  },
  proces: {
    slug: 'proces',
    navLabel: 'Proces',
    seoTitle: 'Proces - TRES ART',
    description: 'Proces współpracy z TRES ART: od pliku 3D, przez analizę geometrii i dobór materiału, po druk oraz ręczne wykończenie.',
    eyebrow: 'Proces',
    heading: 'Od pliku do obiektu bez mgły.',
    intro: 'Każdy projekt przechodzi przez ten sam podstawowy rytm: sprawdzenie pliku, decyzje materiałowe, produkcję i wykończenie. Dzięki temu zanim ruszy druk, wiadomo, co robimy i dlaczego.',
    image: 'https://picsum.photos/seed/tresart-production-flow/1200/940',
    imageAlt: 'Detal stanowiska produkcyjnego i narzędzi technicznych',
    visualPrimary: 'Production flow',
    visualSecondary: '04 steps',
    actions: [
      { label: 'Zacznij od pliku', to: '/kontakt' },
    ],
    sections: [
      {
        type: 'timeline',
        eyebrow: 'Jak pracujemy',
        heading: 'Cztery kroki.',
        body: 'Proces jest prosty, ale nie automatyczny. Każdy etap wymaga decyzji projektowej, żeby finalny obiekt pozostał wierny autorowi.',
        stages: [
          { number: '01', title: 'Projekt i plik', body: 'Wysyłasz model, render albo szkic skali. Sprawdzamy format, geometrię, ryzyka i pierwsze założenia produkcyjne.' },
          { number: '02', title: 'Skala i materiał', body: 'Dobieramy wymiar, materiał, orientację druku i poziom wykończenia. Jeśli plik wymaga korekty, mówimy konkretnie gdzie.' },
          { number: '03', title: 'Druk na żądanie', body: 'Produkujemy obiekt w ustalonym zakresie. Kontrolujemy detal, rytm warstw i stabilność formy w skali.' },
          { number: '04', title: 'Finish i odbiór', body: 'Szlifujemy, zabezpieczamy, wykańczamy kolorystycznie i przygotowujemy obiekt do sesji, ekspozycji lub klienta.' },
        ],
      },
      {
        type: 'checks',
        eyebrow: 'Po drodze',
        heading: 'Co dostajesz.',
        body: 'Nie wysyłasz pliku w próżnię. Na każdym etapie otrzymujesz konkretną informację, która pozwala podjąć decyzję lub zatwierdzić dalszą produkcję.',
        alt: true,
        groups: [
          {
            label: 'Przed drukiem',
            items: [
              { number: '01', text: 'Ocena wykonalności i ryzyk geometrii.' },
              { number: '02', text: 'Rekomendacja materiału, skali i finishu.' },
              { number: '03', text: 'Zakres korekt, jeśli model wymaga przygotowania.' },
            ],
          },
          {
            label: 'Po produkcji',
            items: [
              { number: '04', text: 'Gotowy obiekt, nie półprodukt techniczny.' },
              { number: '05', text: 'Kontrola powierzchni, krawędzi i detalu.' },
              { number: '06', text: 'Możliwość przygotowania kolejnej sztuki lub krótkiej serii.' },
            ],
          },
        ],
      },
    ],
    cta: {
      heading: 'Najlepszy start to plik.',
      body: 'Nie musi być perfekcyjny. Wystarczy model, render albo brief, żeby sprawdzić kierunek.',
    },
  },
  'dla-tworcow': {
    slug: 'dla-tworcow',
    navLabel: 'Dla twórców',
    seoTitle: 'Dla twórców - TRES ART',
    description: 'Współpraca z TRES ART dla grafików, designerów, artystów 3D i studiów projektowych. Produkcja bez przejmowania autorstwa.',
    eyebrow: 'Dla twórców',
    heading: 'Twój projekt zostaje Twój.',
    intro: 'Jesteśmy zapleczem produkcyjnym, nie konkurencją. Ty projektujesz i podpisujesz obiekt. My bierzemy na siebie fizykę, materiał, skalę i wykończenie.',
    image: 'https://picsum.photos/seed/tresart-digital-form/1200/940',
    imageAlt: 'Abstrakcyjna forma cyfrowa przypominająca model 3D',
    visualPrimary: 'Creator first',
    visualSecondary: 'Authorship stays',
    actions: [
      { label: 'Zacznij współpracę', to: '/kontakt' },
      { label: 'Zobacz przykłady', to: '/realizacje', variant: 'outline' },
    ],
    sections: [
      {
        type: 'tiles',
        eyebrow: 'Model współpracy',
        heading: 'Ty projektujesz. My drukujemy.',
        body: 'Najlepiej działamy jako brakujący dział produkcji dla grafików, artystów 3D, projektantów produktu, mebli i studiów projektowych.',
        tiles: [
          { label: 'Graficy i 3D artyści', title: 'Render w realu', body: 'Model, który żył tylko w viewportcie, dostaje skalę, ciężar i powierzchnię. Bez odbierania autorstwa.' },
          { label: 'Designerzy', title: 'Prototyp lub seria', body: 'Od pojedynczego egzemplarza po krótki nakład. Bez form, bez kosztownego setupu produkcji.' },
          { label: 'Studia', title: 'Obiekty i instalacje', body: 'Elementy ekspozycji, przestrzenne formy i duże obiekty, których standardowy druk nie udźwignie.' },
        ],
      },
      {
        type: 'tiles',
        eyebrow: 'Zasady',
        heading: 'Produkcja bez przejmowania sceny.',
        body: 'Współpraca musi być czytelna: Twoje pliki są traktowane poufnie, Twoja marka zostaje przy obiekcie, a nasze decyzje produkcyjne wspierają projekt.',
        columns: 'four',
        alt: true,
        tiles: [
          { label: '01', title: 'Poufność', body: 'Pliki i brief zostają u nas. Nie pokazujemy projektu bez zgody autora.' },
          { label: '02', title: 'Autorstwo', body: 'Obiekt pozostaje projektem twórcy. My jesteśmy wykonawcą i partnerem technicznym.' },
          { label: '03', title: 'Technika', body: 'Mówimy wprost, co trzeba zmienić, żeby render dało się wydrukować w skali.' },
          { label: '04', title: 'Finish', body: 'Dobieramy powierzchnię i kolor tak, żeby finalny obiekt bronił się poza ekranem.' },
        ],
      },
    ],
    cta: {
      heading: 'Masz pomysł, ale nie masz produkcji?',
      body: 'Wyślij plik, render albo opis. Ocenimy, jak najrozsądniej przejść od koncepcji do obiektu.',
    },
  },
  kontakt: {
    slug: 'kontakt',
    navLabel: 'Kontakt',
    seoTitle: 'Kontakt - TRES ART',
    description: 'Kontakt z TRES ART. Wyślij plik 3D, render lub brief i otrzymaj ocenę wykonalności wielkoformatowego druku 3D.',
    eyebrow: 'Kontakt',
    heading: 'Masz plik? Pogadajmy.',
    intro: 'Napisz lub zadzwoń. Najlepszy start to model 3D, render albo krótki opis skali i przeznaczenia obiektu. Odpowiemy z oceną wykonalności i następnymi krokami.',
    image: 'https://picsum.photos/seed/tresart-contact-studio/1200/940',
    imageAlt: 'Biuro projektowe z dużym stołem roboczym',
    visualPrimary: 'Milan / Warsaw',
    visualSecondary: '9:00-18:00 CET',
    actions: [],
    sections: [
      {
        type: 'contact',
        eyebrow: 'Bez kolejki',
        heading: 'Każde zapytanie ogląda człowiek.',
        body: 'Na tym etapie nie dodajemy formularza. Kontakt zostaje prosty: mail, telefon i lista informacji, które przyspieszają wycenę.',
        checklistEyebrow: 'Co wysłać',
        checklist: [
          { number: '01', text: 'Plik STL, OBJ, STEP albo render kierunkowy.' },
          { number: '02', text: 'Docelowy rozmiar lub przybliżony zakres skali.' },
          { number: '03', text: 'Preferowany finish: surowa linia, mat, wygładzenie albo kolor.' },
          { number: '04', text: 'Termin, kontekst użycia i liczba sztuk.' },
        ],
      },
      {
        type: 'tiles',
        eyebrow: 'Studio',
        heading: 'Milan i Warszawa.',
        body: 'Produkcję i konsultacje prowadzimy między pracownią a kontaktem z twórcami. Dokładne dane adresowe można uzupełnić, gdy będą gotowe do publikacji.',
        columns: 'three',
        alt: true,
        tiles: [
          { label: 'Pracownia', title: 'Milan', body: 'Produkcja, finish i prace warsztatowe.' },
          { label: 'Kontakt', title: 'Warszawa', body: 'Rozmowy projektowe, konsultacje i obsługa zapytań.' },
          { label: 'Godziny', title: 'Pon-Pt', body: '9:00-18:00 CET. Pilne terminy najlepiej opisać od razu w wiadomości.' },
        ],
      },
    ],
  },
}
