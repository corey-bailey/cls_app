import type { MindsetSection } from './types.ts';

export const mindsetSections: readonly MindsetSection[] = [
  {
    id: 'what-cls-is',
    title: 'What CLS Actually Is',
    icon: '\u{1F30D}',
    intro: 'CLS is not a class you attend \u2014 it\'s an environment you live in. Shifting this mindset before you arrive changes everything.',
    cards: [
      {
        id: 'mind-1',
        question: 'What if I don\'t understand anything?',
        answer: 'You will feel confused daily at first. You\'ll miss things you think you should understand. This is not failure \u2014 this is exactly how immersion works. Your brain is processing more language input than it ever has before. The confusion IS the learning.',
        takeaway: 'If you understand 60\u201370%, you\'re doing fine. That\'s the sweet spot for acquisition.',
      },
      {
        id: 'mind-2',
        question: 'Is it normal to feel exhausted?',
        answer: 'Yes. You\'ll be "on" linguistically almost all day \u2014 in class, with your host family, on the marshrutka, at dinner. Your brain is working 2-3x harder than it does in English. Cognitive fatigue is real and expected. By Week 4, it gets noticeably easier.',
        takeaway: 'Getting tired faster than usual means your brain is working hard. That\'s success.',
      },
      {
        id: 'mind-3',
        question: 'What does success actually look like after 8 weeks?',
        answer: 'You speak more even when unsure. You understand the gist of real conversations. You can function socially without panic. Russian takes effort, but not fear. You won\'t be fluent \u2014 no one is after 8 weeks. But you\'ll have momentum that compounds.',
        takeaway: 'Fluency is not the goal. Momentum is.',
      },
    ],
  },
  {
    id: 'week1-rules',
    title: 'The 5 Week-1 Rules',
    icon: '\u{1F6DF}',
    intro: 'Week 1 is about staying open \u2014 not sounding smart. If you leave Week 1 still talking, still listening, and still showing up, you are succeeding.',
    cards: [
      {
        id: 'rule-1',
        question: 'Rule 1: What if I say something wrong?',
        answer: 'Speak even when you\'re wrong. Do not wait until you\'re sure. Errors are expected, respected, and corrected constructively. Silence slows progress more than mistakes do. Your classmates are making the same mistakes \u2014 the ones who speak anyway improve fastest.',
        takeaway: 'Talking badly is better than understanding perfectly in silence.',
      },
      {
        id: 'rule-2',
        question: 'Rule 2: Do I need to understand every word?',
        answer: 'No. Understand the gist, not the whole sentence. Your brain will lie to you and say "I understood nothing." In reality, you probably caught the topic, the emotion, and the action. That\'s enough. CLS teachers do not expect word-by-word comprehension.',
        takeaway: 'Grab meaning chunks: who, what, emotion. That\'s comprehension.',
      },
      {
        id: 'rule-3',
        question: 'Rule 3: Should I mentally translate everything?',
        answer: 'No \u2014 translation causes mental fatigue, delayed responses, and panic. Instead: let words pass, grab meaning chunks, and respond to what you think was said. Speed matters more than precision right now. Your brain needs to build a direct Russian-to-meaning pathway, not Russian-to-English-to-meaning.',
        takeaway: 'Speed matters more than precision. Stop translating, start reacting.',
      },
      {
        id: 'rule-4',
        question: 'Rule 4: What\'s my most important tool?',
        answer: 'Your survival phrases. Say them early and often: "\u041C\u043E\u0436\u043D\u043E \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u0435\u0435?" "\u042F \u043F\u043E\u043A\u0430 \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u044E" "\u0427\u0442\u043E \u0437\u043D\u0430\u0447\u0438\u0442 ___?" "\u041C\u043E\u0436\u043D\u043E \u043F\u043E-\u0434\u0440\u0443\u0433\u043E\u043C\u0443?" Managing confusion in Russian is a real fluency skill \u2014 possibly THE most important one.',
        takeaway: 'Managing confusion in Russian = real fluency skill. Practice these until automatic.',
        actionItem: 'Drill your survival phrases 10x each until they come out without thinking',
      },
      {
        id: 'rule-5',
        question: 'Rule 5: What if others seem better than me?',
        answer: 'There will be heritage speakers, advanced learners, and very confident extroverts. Ignore them. CLS is not competitive \u2014 it\'s cumulative. Compare yourself to yesterday-you. The student who started at a lower level and keeps engaging grows more than the advanced student who coasts.',
        takeaway: 'CLS is not competitive \u2014 it\'s cumulative. Compare to yesterday-you only.',
      },
    ],
  },
  {
    id: 'week1-survival',
    title: 'Week 1 Day-by-Day',
    icon: '\u{1F4C5}',
    intro: 'Here\'s what each day of CLS Week 1 actually feels like \u2014 and what "winning" looks like for each one.',
    cards: [
      {
        id: 'w1d1',
        question: 'Day 1: Arrival & Orientation',
        answer: 'It feels like overstimulation, jet lag, and "Why is everyone speaking so fast?" Your only jobs today: smile, show effort, and speak Russian at least once per interaction. Even a broken sentence counts. You survived getting here \u2014 that\'s already an achievement.',
        takeaway: 'Win condition: You speak Russian even if your sentence is broken.',
      },
      {
        id: 'w1d2',
        question: 'Day 2: First Full Class Day',
        answer: 'Rapid input, fear of being cold-called, mental exhaustion by lunchtime. Survival strategy: answer even if unsure, repeat classmates\' answers if needed, ask for clarification in Russian. The teachers know you\'re overwhelmed \u2014 they\'ve seen hundreds of students feel exactly this.',
        takeaway: 'Win condition: You participate without self-editing.',
      },
      {
        id: 'w1d3',
        question: 'Day 3: The "Am I Bad at This?" Day',
        answer: 'This is the most dangerous psychological day. Your brain is overloaded, automaticity hasn\'t kicked in yet, and you notice everything you don\'t know. What to do: reduce English (not Russian), take a short walk alone, sleep early. This is temporary.',
        takeaway: 'Win condition: You do not mentally quit.',
      },
      {
        id: 'w1d4',
        question: 'Day 4: Comprehension Starts Flickering',
        answer: 'Short phrases become clear. You catch jokes or tone. Your replies get faster. Trap to avoid: overanalyzing grammar mid-conversation. Just let the language happen. Something shifted \u2014 trust it.',
        takeaway: 'Win condition: You respond naturally at least once without translating.',
      },
      {
        id: 'w1d5',
        question: 'Day 5: Fatigue + Progress',
        answer: 'You\'re tired but more confident. Russian feels "less foreign." What to do: ask deeper questions, attempt longer answers, let mistakes happen publicly. You\'re starting to build momentum.',
        takeaway: 'Win condition: You talk longer than 2 sentences at a time.',
      },
      {
        id: 'w1d6',
        question: 'Day 6: Social Immersion Locks In',
        answer: 'This is where immersion actually clicks. Focus on host family conversations, informal talk, and daily life vocabulary. Do NOT retreat into silence or hide behind your phone. Every casual interaction is a rep.',
        takeaway: 'Win condition: You initiate a conversation in Russian.',
      },
      {
        id: 'w1d7',
        question: 'Day 7: Recovery Day',
        answer: 'Normal symptoms: headache, irritability, emotional fatigue. Fixes: light exercise, passive listening, minimal studying. Rest without guilt \u2014 your brain consolidates language during sleep. You earned this.',
        takeaway: 'Win condition: You rest without guilt.',
      },
    ],
  },
  {
    id: 'week2-growth',
    title: 'Week 2: Reorganizing',
    icon: '\u{1F9E9}',
    intro: 'Week 2 is when "the language starts fighting back." You understand more but feel less confident. This is your brain re-calibrating \u2014 not stagnating.',
    cards: [
      {
        id: 'w2-speak',
        question: 'How will my speaking change?',
        answer: 'You\'ll notice faster response time and shorter pauses. Still lots of mistakes, but more fluid. Typical Week 2 speech: "I say the wrong case\u2026 but I say it immediately." You finish sentences instead of abandoning them. Key: keep talking past mistakes. Do not restart sentences to "fix" grammar.',
        takeaway: 'Progress marker: you finish sentences instead of abandoning them.',
      },
      {
        id: 'w2-listen',
        question: 'How will my listening change?',
        answer: 'You stop translating every word. You catch chunks: "\u044F \u0434\u0443\u043C\u0430\u044E \u0447\u0442\u043E", "\u043A\u0430\u0436\u0435\u0442\u0441\u044F", "\u0432 \u043E\u0431\u0449\u0435\u043C". You understand tone and intent reliably. Stop asking "what does X mean?" unless it blocks meaning. Start reacting emotionally \u2014 laugh, nod, respond.',
        takeaway: 'Progress marker: you respond appropriately even without full comprehension.',
      },
      {
        id: 'w2-emotion',
        question: 'Why do I feel worse even though I\'m improving?',
        answer: 'Week 2 is often frustrating, mentally tiring, and confidence-checking. You may think: "I should be better by now." That thought is a false comparison to fluency, not to your actual progress. Your internal monitor has activated \u2014 you notice mistakes more because your brain now knows the rules. This is growth.',
        takeaway: 'You feel worse because you know more. That\'s the paradox of Week 2.',
      },
      {
        id: 'w2-success',
        question: 'What does Week 2 success look like?',
        answer: 'You speak daily without rehearsing. You ask follow-up questions in Russian. You understand the general flow of conversations. You feel tired but capable. If you\'re checking these boxes, you\'re exactly on track.',
        takeaway: 'Tired but capable = exactly on track.',
        actionItem: 'Weekly check: Am I speaking more freely? Do I recover faster when confused? Am I still showing up socially?',
      },
    ],
  },
  {
    id: 'week3-growth',
    title: 'Week 3: Integration',
    icon: '\u{1F4AA}',
    intro: 'Week 3 is where CLS starts to feel worth it. Skills consolidate. Confidence catches up to ability.',
    cards: [
      {
        id: 'w3-speak',
        question: 'What speaking breakthroughs happen?',
        answer: 'Longer sentences emerge naturally. Self-correction mid-sentence. Automatic fillers appear: "\u043D\u0443", "\u043A\u043E\u0440\u043E\u0447\u0435", "\u043D\u0430\u0432\u0435\u0440\u043D\u043E\u0435". Typical Week 3 moment: you say something correctly without knowing why. You\'re thinking in concepts, not English sentences.',
        takeaway: 'You say something correctly without knowing why. That\'s language ownership starting.',
      },
      {
        id: 'w3-listen',
        question: 'How does listening shift?',
        answer: 'You can follow group conversations. You lose track once in a while but re-enter naturally. Background noise bothers you less. You stop bracing yourself before listening. Don\'t withdraw when you "miss a bit" \u2014 stay engaged socially even when audio clarity drops.',
        takeaway: 'Progress marker: you stop bracing yourself before listening.',
      },
      {
        id: 'w3-grammar',
        question: 'What happens to my grammar awareness?',
        answer: 'Grammar knowledge becomes less conscious and more probabilistic \u2014 "this sounds right" replaces "this follows the rule." Don\'t try to overhaul grammar rules now. Instead, notice patterns and reuse them. Your instinct is becoming your teacher.',
        takeaway: '"This sounds right" replacing "this follows the rule" = real progress.',
      },
      {
        id: 'w3-host',
        question: 'How does the host family dynamic change?',
        answer: 'Conversations get more natural. Topics broaden \u2014 opinions, stories, routines, not just logistics. You repeat fewer survival scripts. You might initiate non-logistical conversation: asking their opinion, sharing a mini-story from class. This is the relationship deepening.',
        takeaway: 'Progress marker: you initiate non-logistical conversation with your host family.',
        actionItem: 'Ask your host family an opinion question this week, not just a logistics question',
      },
      {
        id: 'w3-emotion',
        question: 'What does the emotional state feel like?',
        answer: 'Quiet confidence. Less fear. Acceptance of imperfection. Russian still feels hard \u2014 but no longer threatening. This is language ownership starting. You\'re not fluent, but you\'re functional and growing. Week 2 tested your resilience. Week 3 rewards your persistence.',
        takeaway: 'Week 2 tests your resilience. Week 3 rewards your persistence.',
      },
    ],
  },
  {
    id: 'pitfalls',
    title: 'Common Pitfalls',
    icon: '\u{26A0}',
    intro: 'These mistakes derail CLS students more than any grammar error. Knowing them in advance is half the battle.',
    cards: [
      {
        id: 'pit-1',
        question: 'Pitfall: Clamming up to "fix grammar"',
        answer: 'When you start noticing your mistakes more (especially Week 2), the temptation is to go quiet and analyze. This is backwards. In immersion, you learn grammar by speaking, not by studying before speaking. Every sentence you don\'t say is a rep you lose.',
        takeaway: 'Talk more, analyze less. Reps > rules.',
      },
      {
        id: 'pit-2',
        question: 'Pitfall: Comparing yourself to heritage speakers',
        answer: 'Some CLS students have Russian-speaking relatives. Some studied abroad before. Some started Russian years before you. Their starting point is not your starting point. Your only metric is your own Week 1 self. Track "I couldn\'t do this last week" moments \u2014 those are your real wins.',
        takeaway: 'Your only competition is yesterday-you.',
      },
      {
        id: 'pit-3',
        question: 'Pitfall: Defaulting to English with classmates',
        answer: 'This is the #1 preventable mistake. After class, during meals, on outings \u2014 English creeps in because it\'s easy. Set a personal rule: Russian for 10 more minutes than yesterday. You don\'t have to be perfect. You just have to resist the pull of comfort.',
        takeaway: 'Russian for 10 more minutes than yesterday. That\'s the only rule you need.',
        actionItem: 'Each day, push your Russian-only time 10 minutes longer than the day before',
      },
      {
        id: 'pit-4',
        question: 'Pitfall: Mental burnout from perfectionism',
        answer: 'Some students go so hard in Weeks 1-2 that they crash badly in Week 3. Sleep matters more than extra study hours. A walk alone is not giving up. Self-care is part of the program, not a break from it.',
        takeaway: 'Sleep > extra study hours. Self-care is part of the program.',
      },
    ],
  },
  {
    id: 'crash',
    title: 'The Crash (Weeks 2\u20133)',
    icon: '\u{1F30A}',
    intro: 'Almost everyone hits a wall. Knowing it\'s coming \u2014 and that it\'s normal \u2014 makes all the difference.',
    cards: [
      {
        id: 'mind-6',
        question: 'When will I hit the wall?',
        answer: 'Most CLS students report it around Week 2-3. The novelty wears off. The honeymoon energy fades. And the reality of 8 weeks of Russian-only living settles in. The crash is so common it\'s basically a feature of immersion, not a bug.',
        takeaway: 'If you haven\'t hit it yet, it\'s coming. If you\'re in it, you\'re right on schedule.',
      },
      {
        id: 'mind-7',
        question: 'What does the crash feel like?',
        answer: 'Headaches. Irritability. Feeling "stupid" when you can\'t say something you know in English. Wanting to withdraw socially. Craving English conversations, familiar food, your normal routine. Some people feel it physically (fatigue, tension). Others feel it emotionally (frustration, homesickness).',
        takeaway: 'Every single symptom on this list is normal. You\'re not broken. Your brain is reorganizing.',
      },
      {
        id: 'mind-8',
        question: 'Does it mean I\'m failing?',
        answer: 'Absolutely not. The crash means your brain has accumulated so much new input that it needs time to reorganize. It\'s like muscle soreness after a workout \u2014 it\'s a sign of growth, not damage. Students who push through the crash consistently report a breakthrough on the other side.',
        takeaway: 'The crash is your brain reorganizing. The breakthrough is right behind it.',
      },
      {
        id: 'mind-9',
        question: 'What actually helps during the crash?',
        answer: 'Short walks alone to recharge. Physical exercise (even 20 minutes helps enormously). Writing a few lines daily, even messy Russian. Sleeping more \u2014 your brain does its best language consolidation during sleep. Talking to other CLS students about how they\'re feeling. And remembering: this is temporary.',
        takeaway: 'Sleep > perfection. A walk alone is not giving up. Self-care is part of the program.',
        actionItem: 'When the crash comes: walk, exercise, sleep, write, talk to peers',
      },
      {
        id: 'mind-overwhelm',
        question: 'What should I tell myself when overwhelmed?',
        answer: '"This feeling means my brain is learning. I am not behind. I am exactly where I should be." Then: drink water, and speak again anyway. The discomfort is temporary. The growth is permanent.',
        takeaway: 'This feeling means my brain is learning. I am exactly where I should be.',
      },
    ],
  },
  {
    id: 'english-rules',
    title: 'Your English Rules',
    icon: '\u{1F4DD}',
    intro: 'CLS has a language pledge, but your internal rules matter more. Decide now, before you\'re tired.',
    cards: [
      {
        id: 'mind-10',
        question: 'Should I go 100% Russian?',
        answer: 'A realistic pledge is better than an impossible one you break and feel guilty about. A good framework: Russian with your host family, teachers, and language partners \u2014 always. Russian with other students during meals and outings \u2014 as much as possible. English allowed for safety, health, and admin emergencies.',
        takeaway: 'The goal isn\'t zero English. It\'s a deliberate, pre-decided framework you can stick to.',
        actionItem: 'Write your personal English rules before you arrive',
      },
      {
        id: 'mind-11',
        question: 'What if I\'m too tired for Russian?',
        answer: 'That\'s exactly when your pre-decided rules matter most. When you\'re exhausted at dinner, your brain will default to English unless you\'ve already committed to Russian. It\'s like going to the gym \u2014 the decision was made before the alarm went off. You don\'t negotiate with yourself in the moment.',
        takeaway: 'When you\'re tired, you\'ll default to English unless you\'ve already decided otherwise.',
      },
      {
        id: 'mind-12',
        question: 'When is English okay?',
        answer: 'Safety \u2014 always. Medical situations \u2014 always. Administrative emergencies \u2014 of course. Processing a really tough day with a friend \u2014 yes, briefly. The point isn\'t punishment. The point is that every minute in Russian is a rep, and reps compound.',
        takeaway: 'English for safety and health: always. English for convenience: resist.',
      },
    ],
  },
  {
    id: 'define-success',
    title: 'Define Your Success',
    icon: '\u{1F3AF}',
    intro: 'Before you go, decide what "winning" looks like. This protects you from discouragement.',
    cards: [
      {
        id: 'mind-13',
        question: 'What will I be able to do after 8 weeks?',
        answer: 'CLS covers the equivalent of one academic year of Russian. Realistically: you\'ll speak more confidently (not perfectly), understand the gist of real conversations, navigate daily life in Russian, and have the momentum to keep growing. Some students test up an entire ACTFL level. The range is wide \u2014 what matters is YOUR growth.',
        takeaway: 'One academic year of Russian in 8 weeks. Your growth is the metric, not some absolute standard.',
      },
      {
        id: 'mind-14',
        question: 'What\'s the #1 thing alumni say?',
        answer: 'Over and over, from every CLS cohort: "The students who benefit most are not the best prepared. They are the ones who keep talking even when it feels uncomfortable." It\'s not about arriving with perfect grammar. It\'s about staying engaged when your brain is screaming for English.',
        takeaway: 'Keep talking even when it feels uncomfortable. That\'s the whole game.',
      },
      {
        id: 'mind-15',
        question: 'How do I avoid comparing myself to others?',
        answer: 'CLS cohorts have a wide range of levels. Some students have heritage speakers in their family. Some studied in Russia before. Some started Russian 6 months ago. Your only competition is yesterday-you. Track your own "I couldn\'t do this last week" moments. Those are your real wins.',
        takeaway: 'Your only competition is yesterday-you. Track "I couldn\'t do this last week" moments.',
        actionItem: 'Start a running list of "things I can do now that I couldn\'t before"',
      },
      {
        id: 'mind-host-tips',
        question: 'How do I connect with my host family?',
        answer: 'Expect repetition, simple questions, and long pauses \u2014 this is not awkward, it\'s pedagogical. Say what you can, not what you want. Ask them to repeat stories. Reuse the same phrases daily. Compliment their cooking (\u041E\u0447\u0435\u043D\u044C \u0432\u043A\u0443\u0441\u043D\u043E!). Host families value effort over elegance.',
        takeaway: 'Host families value effort over elegance. Say what you can, not what you want.',
      },
    ],
  },
];

export function getAllRevealCardIds(): readonly string[] {
  return mindsetSections.flatMap((s) => s.cards.map((c) => c.id));
}
