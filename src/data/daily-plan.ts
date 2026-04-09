import type { WeekPlan } from './types.ts';

export const weekPlans: readonly WeekPlan[] = [
  {
    id: 'week-1',
    title: 'Week 1 \u2014 Build Immersion Tolerance',
    icon: '\u{1F3CB}',
    weekGoals: [
      'Stop panicking when you don\'t understand everything',
      'Make basic Russian automatic',
      'Get comfortable speaking imperfectly',
    ],
    days: [
      {
        id: 'day-1',
        day: 1,
        title: 'Reset & Baseline',
        goal: 'Removing fear \u2014 not accuracy',
        tasks: [
          { id: 'd1-listen', label: 'Listen to natural-speed Russian (vlogs, casual speech)', duration: '15 min', detail: 'No pausing, no translating. Just let it wash over you.' },
          { id: 'd1-speak', label: 'Introduce yourself out loud: name, where you\'re from, why Russian, why CLS', duration: '10 min', detail: 'Record yourself if you can. You\'ll be amazed how much better you sound by Day 14.' },
          { id: 'd1-grammar', label: 'Review present tense verb conjugation (1st vs 2nd conjugation)', duration: '20 min', detail: 'Focus on the pattern, not memorizing tables. \u0434\u0435\u043B\u0430\u0442\u044C \u2192 \u0434\u0435\u043B\u0430\u044E, \u0434\u0435\u043B\u0430\u0435\u0448\u044C... \u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u2192 \u0433\u043E\u0432\u043E\u0440\u044E, \u0433\u043E\u0432\u043E\u0440\u0438\u0448\u044C...' },
          { id: 'd1-task', label: 'Write 10 phrases you say every day (wake up, tired, hungry, busy)', duration: '10 min', detail: 'In Russian. Even if rough. These are YOUR high-frequency phrases.' },
        ],
      },
      {
        id: 'day-2',
        day: 2,
        title: 'Cases You Can\'t Avoid',
        goal: 'Function over form',
        tasks: [
          { id: 'd2-listen', label: 'Listen to natural-speed Russian \u2014 different speaker than yesterday', duration: '20 min' },
          { id: 'd2-speak', label: 'Describe your daily routine out loud (messy is fine)', duration: '15 min', detail: '\u042F \u0432\u0441\u0442\u0430\u044E, \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u0430\u044E, \u0438\u0434\u0443 \u043D\u0430 \u0437\u0430\u043D\u044F\u0442\u0438\u044F... Don\'t stop to correct yourself.' },
          { id: 'd2-grammar', label: 'Accusative case: inanimate vs animate, common verbs (\u043B\u044E\u0431\u043B\u044E, \u0437\u043D\u0430\u044E, \u0432\u0438\u0436\u0443)', duration: '20 min', detail: 'The accusative is the case you\'ll use most. Focus on direct objects: \u042F \u043B\u044E\u0431\u043B\u044E \u043A\u043E\u0444\u0435. \u042F \u0432\u0438\u0436\u0443 \u0434\u043E\u043C.' },
          { id: 'd2-task', label: 'Say what you ate yesterday / will eat tomorrow', duration: '10 min' },
        ],
      },
      {
        id: 'day-3',
        day: 3,
        title: 'Movement & Direction',
        goal: 'Mobility language = survival',
        tasks: [
          { id: 'd3-listen', label: 'Listen to audio involving directions, travel, or daily errands', duration: '20 min' },
          { id: 'd3-speak', label: 'Explain how you get from home \u2192 store \u2192 class', duration: '15 min' },
          { id: 'd3-grammar', label: '\u0438\u0434\u0442\u0438 / \u0445\u043E\u0434\u0438\u0442\u044C / \u043F\u043E\u0439\u0442\u0438 (basic usage only)', duration: '20 min', detail: '\u0438\u0434\u0442\u0438 = going one direction now. \u0445\u043E\u0434\u0438\u0442\u044C = going regularly/round trips. \u043F\u043E\u0439\u0442\u0438 = will go/decided to go.' },
          { id: 'd3-task', label: 'Practice asking for directions out loud (3 different versions)', duration: '10 min', detail: '\u041A\u0430\u043A \u0434\u043E\u0439\u0442\u0438 \u0434\u043E...? \u0413\u0434\u0435 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F...? \u041A\u0430\u043A \u043F\u043E\u043F\u0430\u0441\u0442\u044C \u0432...?' },
        ],
      },
      {
        id: 'day-4',
        day: 4,
        title: 'Talking About People',
        goal: 'Reduce social friction fast',
        tasks: [
          { id: 'd4-listen', label: 'Listen to conversational Russian with multiple speakers', duration: '20 min' },
          { id: 'd4-speak', label: 'Talk about your family and friends out loud', duration: '15 min', detail: '\u0423 \u043C\u0435\u043D\u044F \u0435\u0441\u0442\u044C... \u041C\u043E\u0439 \u0434\u0440\u0443\u0433/\u043F\u043E\u0434\u0440\u0443\u0433\u0430... \u041E\u043D/\u043E\u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442/\u0443\u0447\u0438\u0442\u0441\u044F...' },
          { id: 'd4-grammar', label: 'Past tense + gender endings: who did what yesterday?', duration: '20 min', detail: '\u043E\u043D \u0434\u0435\u043B\u0430\u043B / \u043E\u043D\u0430 \u0434\u0435\u043B\u0430\u043B\u0430 / \u043E\u043D\u0438 \u0434\u0435\u043B\u0430\u043B\u0438. The -\u043B/-\u043B\u0430/-\u043B\u0438 pattern covers all past tense.' },
          { id: 'd4-task', label: 'Describe your host family hypothetically', duration: '10 min' },
        ],
      },
      {
        id: 'day-5',
        day: 5,
        title: 'Managing Confusion (Critical Day)',
        goal: 'You can now survive immersion',
        tasks: [
          { id: 'd5-listen', label: 'Listen to something slightly too hard for you', duration: '20 min', detail: 'This is intentional. Train your brain to stay calm when it can\'t catch everything.' },
          { id: 'd5-speak', label: 'Practice survival phrases until they\'re automatic', duration: '15 min', detail: '\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435... \u042F \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u044E... \u0427\u0442\u043E \u0437\u043D\u0430\u0447\u0438\u0442...? Say each one 10 times, fast.' },
          { id: 'd5-grammar', label: '\u043C\u043E\u0436\u043D\u043E / \u043D\u0443\u0436\u043D\u043E / \u043D\u0435\u043B\u044C\u0437\u044F patterns', duration: '15 min', detail: 'These three words unlock enormous communication power. Practice: \u041C\u043E\u0436\u043D\u043E \u0432\u043E\u0434\u0443? \u041C\u043D\u0435 \u043D\u0443\u0436\u043D\u043E... \u0417\u0434\u0435\u0441\u044C \u043D\u0435\u043B\u044C\u0437\u044F.' },
          { id: 'd5-task', label: 'Simulate: misunderstanding \u2192 clarification \u2192 confirmation', duration: '15 min', detail: 'Role-play a scenario where you don\'t understand, ask for help, then confirm understanding. This is THE immersion skill.' },
        ],
      },
      {
        id: 'day-6',
        day: 6,
        title: 'Free Production Day',
        goal: 'Fluency > correctness',
        tasks: [
          { id: 'd6-listen', label: 'Longer content, no notes, just follow the flow', duration: '30 min' },
          { id: 'd6-speak', label: '5-minute monologue: who you are, what you study, your goals', duration: '20 min', detail: 'Set a timer. Keep talking for the full 5 minutes even if you repeat yourself or make mistakes.' },
          { id: 'd6-grammar', label: 'Review your weakest area from this week (optional)', duration: '15 min' },
          { id: 'd6-task', label: 'Journal 5\u20136 sentences in Russian', duration: '10 min', detail: 'Write about your day, your feelings about CLS, anything. Messy is fine.' },
        ],
      },
      {
        id: 'day-7',
        day: 7,
        title: 'Active Rest',
        goal: 'Avoid burnout before immersion begins',
        tasks: [
          { id: 'd7-listen', label: 'Passive listening while walking or doing chores', duration: '20 min' },
          { id: 'd7-speak', label: 'Casual recap of your day in Russian', duration: '10 min' },
          { id: 'd7-reflect', label: 'Reflect: what feels easier? What still stresses you?', duration: '10 min', detail: 'Write down 3 things that improved this week and 2 things to focus on next week.' },
        ],
      },
    ],
  },
  {
    id: 'week-2',
    title: 'Week 2 \u2014 Shift into "Russian Mode"',
    icon: '\u{1F680}',
    weekGoals: [
      'Think in Russian more often',
      'Reduce English reflexes',
      'Build confidence speaking with fatigue',
    ],
    days: [
      {
        id: 'day-8',
        day: 8,
        title: 'Russian-Only Blocks Begin',
        goal: 'English stops being your default',
        tasks: [
          { id: 'd8-listen', label: 'Same style as Week 1, faster speech if possible', duration: '20 min' },
          { id: 'd8-speak', label: 'Russian-only block: set a timer, no English allowed', duration: '20 min', detail: 'Start with 20 minutes. Talk to yourself, narrate what you see, think out loud in Russian.' },
          { id: 'd8-grammar', label: 'Prepositional case: locations and talking about things', duration: '20 min', detail: '\u0432 \u0448\u043A\u043E\u043B\u0435, \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0435, \u043E \u0441\u0435\u043C\u044C\u0435. The case you use for "at/in/about" + a place or topic.' },
          { id: 'd8-task', label: 'Verbally describe the room you\'re in \u2014 in Russian', duration: '10 min' },
        ],
      },
      {
        id: 'day-9',
        day: 9,
        title: 'Narrate Your Life',
        goal: 'Russian becomes internal',
        tasks: [
          { id: 'd9-listen', label: 'Natural-speed Russian, new content', duration: '20 min' },
          { id: 'd9-speak', label: 'Narrate aloud: what you\'re doing, what you\'re about to do', duration: '20 min', detail: '\u042F \u0441\u0435\u0439\u0447\u0430\u0441 \u0433\u043E\u0442\u043E\u0432\u043B\u044E... \u041F\u043E\u0442\u043E\u043C \u044F \u043F\u043E\u0439\u0434\u0443... This trains your brain to think in Russian, not translate from English.' },
          { id: 'd9-grammar', label: 'Dative case: age, feelings, giving', duration: '20 min', detail: '\u041C\u043D\u0435 22 \u0433\u043E\u0434\u0430. \u041C\u043D\u0435 \u0445\u043E\u043B\u043E\u0434\u043D\u043E. \u042F \u0434\u0430\u043B \u0435\u043C\u0443 \u043A\u043D\u0438\u0433\u0443. Dative = "to/for someone."' },
          { id: 'd9-task', label: 'Explain how you feel today \u2014 physically and mentally \u2014 in Russian', duration: '10 min' },
        ],
      },
      {
        id: 'day-10',
        day: 10,
        title: 'Conversation Simulation',
        goal: 'Social readiness',
        tasks: [
          { id: 'd10-listen', label: 'Conversational Russian with natural back-and-forth', duration: '20 min' },
          { id: 'd10-speak', label: 'Simulated dialogue: asking questions, responding naturally', duration: '25 min', detail: 'Imagine someone asks you: \u041E\u0442\u043A\u0443\u0434\u0430 \u0432\u044B? \u0427\u0435\u043C \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442\u0435\u0441\u044C? \u041F\u043E\u0447\u0435\u043C\u0443 \u0440\u0443\u0441\u0441\u043A\u0438\u0439? Answer each one out loud, naturally.' },
          { id: 'd10-grammar', label: 'Question words + word order', duration: '15 min', detail: '\u041A\u0442\u043E? \u0427\u0442\u043E? \u0413\u0434\u0435? \u041A\u043E\u0433\u0434\u0430? \u041F\u043E\u0447\u0435\u043C\u0443? \u041A\u0430\u043A? Russian word order is flexible \u2014 the question word does the work.' },
          { id: 'd10-task', label: 'Practice small talk topics: weather, plans, likes', duration: '10 min' },
        ],
      },
      {
        id: 'day-11',
        day: 11,
        title: 'Fatigue Training',
        goal: 'Function under stress (CLS reality)',
        tasks: [
          { id: 'd11-listen', label: 'Listen when tired, not when fresh', duration: '30 min', detail: 'Do this in the evening when your brain is already tired. This simulates CLS afternoons.' },
          { id: 'd11-speak', label: 'Talk even if you don\'t want to', duration: '15 min', detail: 'CLS doesn\'t stop when you\'re tired. Practice speaking through fatigue. It gets easier.' },
          { id: 'd11-grammar', label: 'Review tough verbs (optional)', duration: '15 min' },
          { id: 'd11-task', label: 'Write a short message you might send a classmate', duration: '10 min', detail: '\u041F\u0440\u0438\u0432\u0435\u0442! \u0425\u043E\u0447\u0435\u0448\u044C \u043F\u043E\u0439\u0442\u0438 \u0432 \u043A\u0430\u0444\u0435 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0439? Practice casual written Russian.' },
        ],
      },
      {
        id: 'day-12',
        day: 12,
        title: 'Host Family Prep',
        goal: 'Smooth homestay adjustment',
        tasks: [
          { id: 'd12-listen', label: 'Natural-speed Russian, household/daily life topics', duration: '20 min' },
          { id: 'd12-speak', label: 'Explain your schedule, habits, and preferences', duration: '25 min', detail: '\u042F \u043E\u0431\u044B\u0447\u043D\u043E \u0432\u0441\u0442\u0430\u044E \u0432... \u042F \u043D\u0435 \u0435\u043C... \u041C\u043D\u0435 \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F... These are the conversations you\'ll have on Day 1 with your host family.' },
          { id: 'd12-grammar', label: 'Reflexive verbs basics: \u0443\u043C\u044B\u0432\u0430\u0442\u044C\u0441\u044F, \u043E\u0434\u0435\u0432\u0430\u0442\u044C\u0441\u044F, \u043E\u0442\u0434\u044B\u0445\u0430\u0442\u044C', duration: '15 min', detail: 'Reflexive verbs are everywhere in daily Russian. The -\u0441\u044F ending means "oneself."' },
          { id: 'd12-task', label: 'Practice polite requests in Russian', duration: '10 min', detail: '\u041C\u043E\u0436\u043D\u043E...? \u041C\u043E\u0436\u043D\u043E \u044F...? \u0412\u044B \u043D\u0435 \u043F\u043E\u0434\u0441\u043A\u0430\u0436\u0435\u0442\u0435...?' },
        ],
      },
      {
        id: 'day-13',
        day: 13,
        title: 'Full Immersion Day (Lite)',
        goal: 'Prove to yourself you can do this',
        tasks: [
          { id: 'd13-phone', label: 'Set phone to Russian language', duration: 'All day', detail: 'Settings \u2192 Language \u2192 \u0420\u0443\u0441\u0441\u043A\u0438\u0439. You\'ll learn so many words just from your phone menus.' },
          { id: 'd13-notes', label: 'Write all notes and lists in Russian today', duration: 'All day' },
          { id: 'd13-listen', label: 'As much Russian audio as possible throughout the day', duration: 'Ongoing' },
          { id: 'd13-speak', label: 'Short but frequent speaking \u2014 narrate, think aloud, recap', duration: 'Ongoing' },
        ],
      },
      {
        id: 'day-14',
        day: 14,
        title: 'Taper & Reset',
        goal: 'Arrive energized, not exhausted',
        tasks: [
          { id: 'd14-listen', label: 'Comfortable level content \u2014 enjoy it', duration: '20 min' },
          { id: 'd14-speak', label: 'Recap your 2-week journey out loud', duration: '10 min', detail: 'What changed? What feels different? You\'ve done more than you think.' },
          { id: 'd14-reflect', label: 'Reflect: what you\'re ready for + what you\'ll keep practicing during CLS', duration: '10 min', detail: 'You don\'t need to be fluent. You need to keep speaking when unsure, stay engaged when tired, and accept imperfection calmly.' },
        ],
      },
    ],
  },
];

export function getAllDailyTaskIds(): readonly string[] {
  return weekPlans.flatMap((w) => w.days.flatMap((d) => d.tasks.map((t) => t.id)));
}
