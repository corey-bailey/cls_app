import type { Section } from './types.ts';

export const prepSections: readonly Section[] = [
  {
    id: 'logistics',
    title: 'Logistics & Setup',
    icon: '\u{1F4CB}',
    description: 'Get your digital life ready before you land in Bishkek.',
    items: [
      {
        id: 'log-1',
        label: 'Download offline maps for Bishkek',
        detail: '2GIS is the best offline map for Bishkek — far better than Google Maps for local transit and buildings. Maps.me is a good backup.',
        link: 'https://2gis.kg/',
      },
      {
        id: 'log-2',
        label: 'Install Yandex Taxi app',
        detail: 'Rides cost $1-8 across the city. Way safer and more reliable than flagging down cars. Set it up with a card before you go.',
      },
      {
        id: 'log-3',
        label: 'Add Russian keyboard to your phone',
        detail: 'Go to Settings > Keyboard > Add Keyboard > Russian. You\'ll need this constantly for texting your host family and classmates.',
      },
      {
        id: 'log-4',
        label: 'Make sure your phone is unlocked for local SIM',
        detail: 'Get a Megacom or O! SIM card when you arrive — about $5/month for 30GB. Your US carrier\'s international plan will be 10x more expensive.',
      },
      {
        id: 'log-5',
        label: 'Call your bank about foreign transactions',
        detail: 'ATM fees in Kyrgyzstan can be $5+ per withdrawal plus 3% currency conversion. Use Demir Kyrgyz Bank, Kyrgyzkommertsbank, or Optima Bank ATMs for the best rates.',
      },
      {
        id: 'log-6',
        label: 'Photocopy passport, visa, and insurance docs',
        detail: 'Keep digital copies in your email and physical copies separate from originals. You\'ll need passport info more often than you think.',
      },
      {
        id: 'log-7',
        label: 'Download an offline Russian dictionary',
        detail: 'Yandex Translate works offline if you download the Russian language pack. Don\'t rely on internet access for looking up words.',
      },
    ],
  },
  {
    id: 'language',
    title: 'Language Foundations',
    icon: '\u{1F4DA}',
    description: 'Build daily habits now. 15-30 minutes a day makes the first week dramatically easier.',
    items: [
      {
        id: 'lang-1',
        label: 'Start a 15 min/day Russian listening habit',
        detail: 'Listen to Russian at natural speed without pausing or translating. Your brain needs to stop panicking when it doesn\'t catch every word. Focus on who is doing what to whom.',
        link: 'https://www.youtube.com/@RussianWithMax',
      },
      {
        id: 'lang-2',
        label: 'Practice reading Cyrillic for 10 minutes daily',
        detail: 'Even if you know Cyrillic, speed matters. Read signs, menus, short articles. The faster you decode letters, the less mental energy you burn in immersion.',
      },
      {
        id: 'lang-3',
        label: 'Review the top 20 high-frequency verbs',
        detail: 'Make these instant, not "I have to think": \u0434\u0435\u043B\u0430\u0442\u044C, \u0438\u0434\u0442\u0438/\u0445\u043E\u0434\u0438\u0442\u044C, \u043F\u043E\u0439\u0442\u0438, \u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C/\u0441\u043A\u0430\u0437\u0430\u0442\u044C, \u0431\u0440\u0430\u0442\u044C/\u0432\u0437\u044F\u0442\u044C, \u043C\u043E\u0447\u044C, \u0445\u043E\u0442\u0435\u0442\u044C, \u0437\u043D\u0430\u0442\u044C, \u043F\u043E\u043D\u0438\u043C\u0430\u0442\u044C, \u0432\u0438\u0434\u0435\u0442\u044C. Conjugate them out loud.',
      },
      {
        id: 'lang-4',
        label: 'Practice accusative, prepositional, and dative cases',
        detail: 'These three cases cover 80% of daily conversation. Don\'t memorize tables — practice in real sentences. "I\'m going TO the store" (accusative). "I\'m AT the store" (prepositional). "Give it TO me" (dative).',
      },
      {
        id: 'lang-5',
        label: 'Try "shadowing" with short audio clips',
        detail: 'Play a short Russian clip, then immediately repeat what you heard, mimicking the rhythm and intonation. Even 5 minutes of this daily trains your mouth muscles for Russian sounds.',
      },
      {
        id: 'lang-6',
        label: 'Learn \u043C\u043E\u0436\u043D\u043E / \u043D\u0443\u0436\u043D\u043E / \u043D\u0435\u043B\u044C\u0437\u044F patterns',
        detail: 'These three words unlock enormous communication power. "\u041C\u043E\u0436\u043D\u043E \u0432\u043E\u0434\u0443?" (Can I have water?) "\u041C\u043D\u0435 \u043D\u0443\u0436\u043D\u043E..." (I need...) "\u0417\u0434\u0435\u0441\u044C \u043D\u0435\u043B\u044C\u0437\u044F" (You can\'t here).',
      },
      {
        id: 'lang-7',
        label: 'Practice perfective vs. imperfective in real situations',
        detail: 'Don\'t memorize rules — practice pairs: \u0434\u0435\u043B\u0430\u0442\u044C/\u0441\u0434\u0435\u043B\u0430\u0442\u044C, \u0447\u0438\u0442\u0430\u0442\u044C/\u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C, \u043F\u0438\u0441\u0430\u0442\u044C/\u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C. Use imperfective for ongoing actions, perfective for completed ones.',
      },
    ],
  },
  {
    id: 'homestay',
    title: 'Homestay Prep',
    icon: '\u{1F3E0}',
    description: 'Your host family is part of the curriculum. Even basic, imperfect stories are gold.',
    items: [
      {
        id: 'home-1',
        label: 'Bring a small gift for your host family',
        detail: 'Something from your state or city — local candy, a photo book, a university t-shirt. It\'s a wonderful icebreaker and shows respect.',
      },
      {
        id: 'home-2',
        label: 'Practice talking about your daily routine in Russian',
        detail: '\u042F \u0432\u0441\u0442\u0430\u044E \u0432 7 \u0447\u0430\u0441\u043E\u0432. \u042F \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u0430\u044E. \u042F \u0438\u0434\u0443 \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F. Practice these out loud until they\'re automatic.',
      },
      {
        id: 'home-3',
        label: 'Practice talking about your family',
        detail: 'Host families always ask about your family. Prepare: \u0423 \u043C\u0435\u043D\u044F \u0435\u0441\u0442\u044C... (\u043C\u0430\u043C\u0430, \u043F\u0430\u043F\u0430, \u0431\u0440\u0430\u0442, \u0441\u0435\u0441\u0442\u0440\u0430). Even simple sentences build connection.',
      },
      {
        id: 'home-4',
        label: 'Practice explaining why you study Russian',
        detail: 'You\'ll be asked this 50 times. Have a short answer ready: "\u042F \u0438\u0437\u0443\u0447\u0430\u044E \u0440\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A, \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E..." Even imperfect grammar is fine.',
      },
      {
        id: 'home-5',
        label: 'Learn dietary restriction phrases',
        detail: 'If you have allergies or restrictions, memorize these cold. See the Phrases tab for the exact Russian.',
      },
      {
        id: 'home-6',
        label: 'Learn basic house vocabulary',
        detail: '\u0433\u0434\u0435 \u0442\u0443\u0430\u043B\u0435\u0442? (where\'s the bathroom?), \u043A\u0443\u0445\u043D\u044F (kitchen), \u043A\u043E\u043C\u043D\u0430\u0442\u0430 (room), \u0434\u0443\u0448 (shower), \u043A\u043B\u044E\u0447 (key). You\'ll need these on day one.',
      },
      {
        id: 'home-7',
        label: 'Prepare for long pauses and child-like conversations',
        detail: 'This is normal and expected. Your host family is patient. Repeating basic life facts over and over IS the learning process.',
      },
    ],
  },
  {
    id: 'packing',
    title: 'Pack Smart',
    icon: '\u{1F9F3}',
    description: 'Bring what helps learning. Leave what doesn\'t.',
    items: [
      {
        id: 'pack-1',
        label: 'Small notebook for daily phrases',
        detail: 'Write down 3-5 new words or phrases every day. The physical act of writing helps retention far more than typing.',
      },
      {
        id: 'pack-2',
        label: 'Offline dictionary app (downloaded before departure)',
        detail: 'Download the Russian language pack in Yandex Translate or Google Translate. Internet can be spotty.',
      },
      {
        id: 'pack-3',
        label: 'Pen + paper (writing matters for Russian)',
        detail: 'Handwriting Cyrillic builds muscle memory. Bring several pens and a small stack of paper or a journal.',
      },
      {
        id: 'pack-4',
        label: 'Adapter plug (Type C/F for Kyrgyzstan)',
        detail: 'Kyrgyzstan uses European-style round two-pin plugs (Type C/F), 220V. Bring at least one adapter.',
      },
      {
        id: 'pack-5',
        label: 'Sunscreen + layers',
        detail: 'Bishkek summers: hot days (90\u00B0F+), cool evenings. The sun is strong at altitude. Bring light layers and good sunscreen.',
      },
      {
        id: 'pack-6',
        label: 'Sturdy walking shoes',
        detail: 'Bishkek sidewalks are uneven. You\'ll walk a lot. Comfortable, sturdy shoes are essential.',
      },
      {
        id: 'pack-7',
        label: 'Water bottle with filter',
        detail: 'Tap water in Bishkek is not safe to drink. A filter bottle saves money vs. buying bottled water daily (~$0.75 for 5L).',
      },
    ],
  },
];

export function getAllCheckItemIds(): readonly string[] {
  return prepSections.flatMap((s) => s.items.map((i) => i.id));
}
