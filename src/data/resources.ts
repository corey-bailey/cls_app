import type { ResourceCategory } from './types.ts';

export const resourceCategories: readonly ResourceCategory[] = [
  {
    id: 'listening',
    title: 'Listening Practice',
    icon: '\u{1F3A7}',
    links: [
      {
        title: 'Russian With Max (YouTube)',
        url: 'https://www.youtube.com/@RussianWithMax',
        description: 'Natural-speed Russian with subtitles. Perfect for training your ear without English crutches.',
      },
      {
        title: 'Slow Russian Podcast',
        url: 'https://realrussianclub.com/slowrussianpodcast/',
        description: 'Clearly spoken Russian at a manageable pace. Great for building listening stamina.',
      },
      {
        title: 'Russian Podcast (Intermediate)',
        url: 'https://www.russianpodcast.eu/',
        description: 'Conversational Russian on everyday topics. Good for hearing natural speech patterns.',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Practice Tools',
    icon: '\u{1F6E0}',
    links: [
      {
        title: 'Anki (Spaced Repetition)',
        url: 'https://apps.ankiweb.net/',
        description: 'Free flashcard app with spaced repetition. Search for "Russian frequency" decks for the most useful vocabulary.',
      },
      {
        title: 'Yandex Translate (Offline)',
        url: 'https://translate.yandex.com/app',
        description: 'Download the Russian pack for offline use. Better than Google Translate for Russian context and examples.',
      },
      {
        title: 'Forvo (Pronunciation)',
        url: 'https://forvo.com/languages/ru/',
        description: 'Hear real native speakers pronounce any Russian word. Great when TTS doesn\'t sound right.',
      },
    ],
  },
  {
    id: 'bishkek',
    title: 'Life in Bishkek',
    icon: '\u{1F3D4}',
    links: [
      {
        title: 'SRAS Guide to Living in Bishkek',
        url: 'https://srasstudents.org/sras-guide-living-bishkek/',
        description: 'Comprehensive guide: transport, money, food, safety, SIM cards, and cultural norms.',
      },
      {
        title: 'CLS Bishkek Program Page',
        url: 'https://clscholarship.org/languages/russian',
        description: 'Official CLS information about the Bishkek program, host institution (AUCA), and expectations.',
      },
      {
        title: '2GIS Bishkek (Offline Map)',
        url: 'https://2gis.kg/',
        description: 'The best offline map for Bishkek. Better than Google Maps for local buildings, transit routes, and businesses.',
      },
      {
        title: 'Yandex Taxi',
        url: 'https://taxi.yandex.com/',
        description: 'Ride-hailing app for Bishkek. $1-8 per ride. Much safer than flagging random cars.',
      },
    ],
  },
  {
    id: 'culture',
    title: 'Culture & Context',
    icon: '\u{1F30F}',
    links: [
      {
        title: 'Kyrgyzstan Travel Vlogs (YouTube)',
        url: 'https://www.youtube.com/results?search_query=bishkek+kyrgyzstan+daily+life',
        description: 'Watch what daily life in Bishkek looks like. Reduces culture shock by making the unfamiliar familiar.',
      },
      {
        title: 'AC Kyrgyzstan (American Councils)',
        url: 'https://kyrgyzstan.americancouncils.org/cls',
        description: 'American Councils\' Kyrgyzstan page with program details and local context.',
      },
    ],
  },
];
