export const audienceItems = [
  {
    number: '01',
    titleKey: 'aud1_h',
    title: 'Graficy i artyści 3D',
    descriptionKey: 'aud1_p',
    description: 'Masz model, który dotąd istniał tylko na ekranie. Nadajemy mu ciężar, skalę i powierzchnię, którą można dotknąć.',
  },
  {
    number: '02',
    titleKey: 'aud2_h',
    title: 'Projektanci mebli',
    descriptionKey: 'aud2_p',
    description: 'Realizujemy meble autorskie i małe serie — bez form wtryskowych, bez kompromisów w geometrii.',
  },
  {
    number: '03',
    titleKey: 'aud3_h',
    title: 'Architekci i studia',
    descriptionKey: 'aud3_p',
    description: 'Obiekty przestrzenne, elementy wnętrz i instalacje w skali, której nie udźwignie standardowy druk.',
  },
] as const

export const manifestStats = [
  {
    labelKey: 'manifest_stat1_l',
    label: 'Skala druku',
    valueKey: 'manifest_stat1_v',
    value: '2.5M',
  },
  {
    labelKey: 'manifest_stat2_l',
    label: 'Barier produkcji',
    valueKey: 'manifest_stat2_v',
    value: '0',
  },
  {
    labelKey: 'manifest_stat3_l',
    label: 'Wierność pliku',
    valueKey: 'manifest_stat3_v',
    value: '1:1',
  },
] as const

export const manifestCards = [
  {
    className: 'primary on-demand',
    labelKey: 'manifest_card1_t',
    label: 'Na żądanie',
    descriptionKey: 'manifest_card1_p',
    description: 'Ty projektujesz bez limitów, my drukujemy z pedantyczną precyzją.',
  },
  {
    className: 'compact traceable',
    labelKey: 'manifest_card3_t',
    label: 'Detal',
  },
  {
    className: 'compact distributed',
    labelKey: 'manifest_card4_t',
    label: 'Skala',
  },
] as const

export const foundryCards = [
  {
    type: 'scale',
    className: 'box-scale',
    number: '01',
    labelKey: 'b1_num',
    label: 'Skala',
    metric: '2.5',
    unitKey: 'b1_unit',
    unit: 'METRA',
    titleKey: 'b1_h',
    title: 'Wielkoformatowy druk robotyczny',
    descriptionKey: 'b1_p',
    description: 'Jedna ciągła przestrzeń robocza sięgająca dwóch i pół metra. Siedziska, monolityczne stoły i rzeźby drukowane jednym gestem — bez łączeń, bez kompromisów.',
  },
  {
    type: 'materials',
    className: 'box-materials',
    number: '02',
    labelKey: 'b2_num',
    label: 'Materiały',
    titleKey: 'b2_h',
    title: 'Uczciwa materia',
    descriptionKey: 'b2_p',
    description: 'Matowe biokompozyty, polimery z recyklingu i strukturalne ziemiste tony — dobrane dla trwałości i dotyku.',
    swatches: ['#2A2620', '#3E3528', '#A88A64', '#6F6657', '#D8CFC0'],
  },
  {
    type: 'texture',
    className: 'box-texture',
    number: '03',
    labelKey: 'b3_num',
    label: 'Faktura',
    titleKey: 'b3_h',
    title: 'Linia',
    descriptionKey: 'b3_p',
    description: 'Linie warstw to nie wada do ukrycia. Traktujemy je jako podpis metody — widoczny zapis tego, jak powstał obiekt.',
  },
  {
    type: 'finish',
    className: 'box-finish',
    number: '04',
    labelKey: 'b4_num',
    label: 'Wykończenie',
    titleKey: 'b4_h',
    title: 'Ręka rzemieślnika',
    descriptionKey: 'b4_p',
    description: 'Każdy obiekt po zejściu z ramienia robota trafia w ręce człowieka — zabezpieczony i wykończony do standardu galeryjnego.',
    tagKey: 'b4_tag',
    tag: 'Atelier Tresart',
  },
] as const

export const collabBenefits = [
  {
    textKey: 'col_l1',
    text: 'Pełna poufność plików — nigdy nieudostępniane dalej',
  },
  {
    textKey: 'col_l2',
    text: 'Twoje autorstwo i marka pozostają nienaruszone',
  },
  {
    textKey: 'col_l3',
    text: 'Pojedyncze egzemplarze i małe serie',
  },
  {
    textKey: 'col_l4',
    text: 'Doradztwo materiałowe i konstrukcyjne na każdym etapie',
  },
] as const

export const workItems = [
  {
    number: '01',
    className: 'g-a',
    seed: 1,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Fotel Monolith jako przykład wielkoformatowego obiektu drukowanego 3D',
    categoryKey: 'g1_cat',
    category: 'Meble',
    titleKey: 'g1_t',
    title: 'Fotel „Monolith”',
    authorKey: 'g1_by',
    author: 'proj. studio zewnętrzne',
  },
  {
    number: '02',
    className: 'g-b',
    seed: 2,
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1100&q=80',
    imageAlt: 'Rzeźba Strata jako przykład pracy 3D przeniesionej do fizycznej formy',
    categoryKey: 'g2_cat',
    category: 'Praca 3D',
    titleKey: 'g2_t',
    title: 'Rzeźba „Strata”',
    authorKey: 'g2_by',
    author: 'proj. artysta 3D',
  },
  {
    number: '03',
    className: 'g-c',
    seed: 3,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Stół Sediment jako przykład autorskiego mebla z druku 3D',
    categoryKey: 'g3_cat',
    category: 'Meble',
    titleKey: 'g3_t',
    title: 'Stół „Sediment”',
    authorKey: 'g3_by',
    author: 'proj. projektant mebli',
  },
  {
    number: '04',
    className: 'g-d',
    seed: 4,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Ściana Flux jako przykład przestrzennej instalacji z druku 3D',
    categoryKey: 'g4_cat',
    category: 'Instalacja',
    titleKey: 'g4_t',
    title: 'Ściana „Flux”',
    authorKey: 'g4_by',
    author: 'proj. studio architektury',
  },
  {
    number: '05',
    className: 'g-e',
    seed: 5,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Obiekt Vessel jako przykład designerskiego obiektu z pliku 3D',
    categoryKey: 'g5_cat',
    category: 'Praca 3D',
    titleKey: 'g5_t',
    title: 'Obiekt „Vessel”',
    authorKey: 'g5_by',
    author: 'proj. designer',
  },
] as const

export const processSteps = [
  {
    number: '01',
    icon: 'cluster',
    titleKey: 'p1_h',
    title: 'Projekt i plik',
    tagKey: 'p1_tag',
    tag: 'STL / OBJ / STEP',
  },
  {
    number: '02',
    icon: 'layers',
    titleKey: 'p2_h',
    title: 'Skala i materiał',
    tagKey: 'p2_tag',
    tag: 'Konsultacja techniczna',
  },
  {
    number: '03',
    icon: 'sphere',
    titleKey: 'p3_h',
    title: 'Druk na żądanie',
    tagKey: 'p3_tag',
    tag: 'Robotyczna produkcja',
  },
  {
    number: '04',
    icon: 'orbit',
    titleKey: 'p4_h',
    title: 'Wykończenie i odbiór',
    tagKey: 'p4_tag',
    tag: 'Ręczna kontrola',
  },
] as const

export const fileTypes = [
  {
    labelKey: 'file_1_l',
    label: 'Modele siatkowe',
    extension: 'STL',
    descriptionKey: 'file_1_p',
    description: 'Do szybkiej oceny bryły, skali i potencjalnych problemów z drukiem.',
  },
  {
    labelKey: 'file_2_l',
    label: 'Model z materiałem',
    extension: 'OBJ',
    descriptionKey: 'file_2_p',
    description: 'Pomaga utrzymać proporcje, orientację i charakter powierzchni z viewportu.',
  },
  {
    labelKey: 'file_3_l',
    label: 'Geometria CAD',
    extension: 'STEP',
    descriptionKey: 'file_3_p',
    description: 'Najlepsza baza dla elementów technicznych, łączeń i powtarzalnych serii.',
  },
  {
    labelKey: 'file_4_l',
    label: 'Render / brief',
    extension: 'PNG',
    descriptionKey: 'file_4_p',
    description: 'Wystarczy jako kierunek, jeśli model wymaga jeszcze przygotowania do produkcji.',
  },
] as const

export const fileChecklist = [
  {
    labelKey: 'file_c1_l',
    label: 'Wymiary',
    descriptionKey: 'file_c1_p',
    description: 'Docelowy rozmiar albo zakres skali.',
  },
  {
    labelKey: 'file_c2_l',
    label: 'Powierzchnia',
    descriptionKey: 'file_c2_p',
    description: 'Referencje koloru, faktury i poziomu wygładzenia.',
  },
  {
    labelKey: 'file_c3_l',
    label: 'Termin',
    descriptionKey: 'file_c3_p',
    description: 'Deadline, kontekst użycia i orientacyjna liczba sztuk.',
  },
] as const

export const faqItems = [
  {
    questionKey: 'faq_1_q',
    question: 'Czy wystarczy sam render, jeśli nie mam gotowego modelu do druku?',
    answerKey: 'faq_1_a',
    answer: 'Tak. Render lub szkic wystarczy do pierwszej rozmowy i oceny kierunku. Jeśli model wymaga przygotowania produkcyjnego, wskażemy, co trzeba dopracować przed wyceną i drukiem.',
  },
  {
    questionKey: 'faq_2_q',
    question: 'Jak duże obiekty możecie drukować?',
    answerKey: 'faq_2_a',
    answer: 'Pracujemy z wielkoformatowym drukiem 3D do około 2,5 metra w jednej przestrzeni roboczej. Przy większych formach dobieramy podział, łączenia i wykończenie tak, aby zachować charakter projektu.',
  },
  {
    questionKey: 'faq_3_q',
    question: 'Czy projekt i autorstwo zostają po stronie twórcy?',
    answerKey: 'faq_3_a',
    answer: 'Tak. TRES ART działa jako zaplecze produkcyjne. Autorstwo, marka i prawa do projektu pozostają po stronie twórcy, projektanta lub studia.',
  },
  {
    questionKey: 'faq_4_q',
    question: 'Jakie pliki najlepiej wysłać do wyceny?',
    answerKey: 'faq_4_a',
    answer: 'Najlepiej sprawdzają się pliki STL, OBJ lub STEP, ale do startu może wystarczyć render, brief i docelowy wymiar. Pomagają też referencje koloru, faktury oraz planowanego zastosowania obiektu.',
  },
] as const
