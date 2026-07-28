export type PrivacyPolicySection = {
  slot: string
  title: string
  paragraphs: string[]
  items: string[]
}

export type PrivacyPolicy = {
  seoTitle: string
  seoDescription: string
  title: string
  intro: string
  updatedAt: string
  controller: {
    name: string
    address: string
    email: string
    phone: string
    registrationInfo: string
  }
  sections: PrivacyPolicySection[]
}

export const privacyPolicyFallback: PrivacyPolicy = {
  seoTitle: 'Polityka prywatności i plików cookies | TRES ART',
  seoDescription: 'Informacje o przetwarzaniu danych osobowych oraz wykorzystywaniu plików cookies w serwisie TRES ART.',
  title: 'Polityka prywatności i plików cookies',
  intro: 'Ten dokument opisuje zasady przetwarzania danych osobowych oraz korzystania z plików cookies w serwisie TRES ART.',
  updatedAt: '2026-07-28',
  controller: {
    name: 'TRES ART',
    address: 'Warszawa, Polska',
    email: 'kontakt@tresart.pl',
    phone: '+48 796 809 318',
    registrationInfo: '',
  },
  sections: [
    {
      slot: 'controller',
      title: '1. Administrator danych',
      paragraphs: [
        'Administratorem danych osobowych jest podmiot wskazany powyżej. W sprawach dotyczących danych osobowych można skontaktować się przez e-mail lub telefon.',
      ],
      items: [],
    },
    {
      slot: 'data',
      title: '2. Zakres danych',
      paragraphs: [
        'W zależności od sposobu kontaktu możemy przetwarzać dane podane dobrowolnie przez użytkownika, w szczególności imię i nazwisko, adres e-mail, numer telefonu, treść wiadomości oraz dane dotyczące projektu przesłane w korespondencji.',
      ],
      items: [],
    },
    {
      slot: 'purposes',
      title: '3. Cele i podstawy przetwarzania',
      paragraphs: [
        'Dane przetwarzamy wyłącznie w zakresie potrzebnym do obsługi zapytania, przygotowania oferty, realizacji współpracy, prowadzenia korespondencji oraz wykonania obowiązków wynikających z przepisów prawa.',
      ],
      items: [
        'podjęcie działań przed zawarciem umowy lub wykonanie umowy,',
        'uzasadniony interes administratora polegający na prowadzeniu korespondencji i obronie przed roszczeniami,',
        'wypełnienie obowiązku prawnego, gdy jest to wymagane.',
      ],
    },
    {
      slot: 'recipients',
      title: '4. Odbiorcy danych',
      paragraphs: [
        'Dostęp do danych mogą mieć wyłącznie podmioty wspierające działanie serwisu i obsługę firmy, w zakresie niezbędnym do świadczenia usług.',
      ],
      items: [
        'Vercel Inc. - hosting i infrastruktura strony,',
        'Sanity.io - system zarządzania treścią,',
        'dostawcy poczty elektronicznej, usług księgowych, prawnych lub IT, jeśli są wykorzystywani przez administratora.',
      ],
    },
    {
      slot: 'retention',
      title: '5. Okres przechowywania',
      paragraphs: [
        'Dane przechowujemy przez czas potrzebny do udzielenia odpowiedzi i prowadzenia współpracy, a następnie przez okres wymagany przepisami lub niezbędny do zabezpieczenia ewentualnych roszczeń.',
      ],
      items: [],
    },
    {
      slot: 'rights',
      title: '6. Prawa użytkownika',
      paragraphs: [
        'Osobie, której dane dotyczą, przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu oraz złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
      ],
      items: [],
    },
    {
      slot: 'cookies',
      title: '7. Pliki cookies',
      paragraphs: [
        'Obecnie serwis nie korzysta z analitycznych ani marketingowych plików cookies. Nie ładuje narzędzi reklamowych, takich jak Meta Pixel, ani zewnętrznej analityki, takiej jak Google Analytics.',
        'Jeżeli w przyszłości zostaną wdrożone narzędzia analityczne, marketingowe lub osadzone materiały zewnętrzne, serwis zostanie uzupełniony o mechanizm zarządzania zgodą przed ich uruchomieniem.',
      ],
      items: [],
    },
    {
      slot: 'external-links',
      title: '8. Linki zewnętrzne',
      paragraphs: [
        'Serwis może zawierać linki do zewnętrznych serwisów, w tym profili społecznościowych. Po przejściu na taką stronę obowiązują zasady prywatności jej operatora.',
      ],
      items: [],
    },
    {
      slot: 'changes',
      title: '9. Zmiany polityki',
      paragraphs: [
        'Polityka może być aktualizowana, gdy zmieni się sposób działania serwisu, wykorzystywane narzędzia lub obowiązujące przepisy. Aktualna wersja jest zawsze dostępna na tej stronie.',
      ],
      items: [],
    },
  ],
}
