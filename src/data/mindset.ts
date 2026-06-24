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
    week: 1,
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
    week: 1,
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
    week: 2,
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
    week: 3,
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
        answer: 'You\'re arriving with about a year of college Russian \u2014 CLS adds roughly another academic year on top, in eight weeks. Realistically: you\'ll speak more confidently (not perfectly), understand the gist of real conversations, navigate daily life in Russian, and have the momentum to keep growing. Some students test up an entire ACTFL level. The range is wide \u2014 what matters is YOUR growth, not the heritage speaker next to you.',
        takeaway: 'One more academic year of Russian in 8 weeks. Your growth is the metric, not some absolute standard.',
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
  {
    id: 'week4-plateau',
    title: 'Week 4: Plateau & Consolidation',
    icon: '\u{1F9D7}',
    intro: 'Around the midpoint, progress often feels invisible. You\'re not stuck — your brain is making what you already know automatic. This is the most important week to trust the process.',
    week: 4,
    cards: [
      {
        id: 'w4-plateau',
        question: 'Why does it feel like I stopped improving?',
        answer: 'Weeks 1–3 added a flood of new input. Week 4 is when your brain organizes it. The gains go underground — you\'re not adding new things, you\'re making the old things faster and more automatic. It feels flat because the work is invisible. It is still happening.',
        takeaway: 'Plateaus are where skills become automatic. Flat on the surface, busy underneath.',
      },
      {
        id: 'w4-midpoint',
        question: 'I\'m halfway through and not fluent — am I behind?',
        answer: 'No. Halfway through the program is not the same as halfway to fluent, and you were never going to be fluent in 8 weeks anyway. With about a year of college Russian coming in, you\'re right where a Week-4 student should be. Measure against your Week-1 self, not against fluency.',
        takeaway: 'Halfway through ≠ halfway to fluent. Growth is not linear.',
      },
      {
        id: 'w4-grammar',
        question: 'Should I cram more grammar now?',
        answer: 'No. You don\'t need new rules — you need the first-year grammar you already have (the six cases, present and past tense, basic aspect) to become automatic. Depth beats breadth this week. Pick the one thing you keep getting wrong and just notice it in real speech, instead of opening a new chapter.',
        takeaway: 'Consolidate what you have. Depth over new rules.',
        actionItem: 'Pick one case you keep getting wrong and just listen for it all week — don\'t study it, hear it',
      },
      {
        id: 'w4-routine',
        question: 'How do I keep momentum when the novelty is gone?',
        answer: 'The excitement of Weeks 1–2 is gone, and motivation dips for almost everyone around now. This is where routine carries you: protected sleep, daily exercise, small consistent reps. You don\'t need to feel inspired — you need to keep showing up. The motivation comes back in Week 5.',
        takeaway: 'Discipline replaces novelty around Week 4. Lean on routine, not inspiration.',
      },
      {
        id: 'w4-host',
        question: 'My host-family conversations feel repetitive.',
        answer: 'Repetition is the curriculum, not a sign of being stuck. The same dinner-table topics are exactly how vocabulary becomes automatic. Instead of new topics, go one layer deeper on a familiar one: ask why, ask for a story, share a small opinion. Same topic, more depth.',
        takeaway: 'Repetition is the curriculum. Go deeper on familiar topics, not wider.',
        actionItem: 'Ask one follow-up question on a topic you\'ve already covered with your host family',
      },
    ],
  },
  {
    id: 'week5-secondwind',
    title: 'Week 5: Second Wind',
    icon: '\u{1F32C}',
    intro: 'Week 4’s invisible work starts paying off. Comprehension jumps, speaking loosens, and confidence returns. This is the week to push your edges on purpose.',
    week: 5,
    cards: [
      {
        id: 'w5-breakthrough',
        question: 'Things suddenly feel easier — is that real?',
        answer: 'Yes. The plateau of Week 4 typically pays off in Week 5. You\'ll catch more of what people say, respond faster, and feel less braced before every conversation. This is real consolidation, not a fluke. Trust it and use it — don\'t wait for it to disappear.',
        takeaway: 'Week 5 often delivers the payoff for Week 4’s invisible work.',
      },
      {
        id: 'w5-risk',
        question: 'How do I keep growing now that it’s easier?',
        answer: 'Raise the difficulty on purpose. Take longer turns, pick harder topics, give opinions instead of just facts. Comfort is a sign you can handle more. The students who plateau again are the ones who coast; the ones who keep stretching keep climbing.',
        takeaway: 'When it feels easy, make it harder on purpose.',
        actionItem: 'Take one speaking risk today you’d have avoided in Week 1 — a longer answer, a real opinion',
      },
      {
        id: 'w5-complexity',
        question: 'Can I start using more complex sentences?',
        answer: 'Yes — this is the week to connect your speech. Link clauses with потому что (because), поэтому (so), and который (which/who). You don\'t need perfect grammar — you need to stop speaking in isolated phrases and start joining your ideas together.',
        takeaway: 'Connect your sentences. That’s the jump from first-year to functional.',
      },
      {
        id: 'w5-errors',
        question: 'I still make tons of mistakes — is that bad?',
        answer: 'No. At this stage, fluency means making errors at speed, not making no errors. Keep accuracy as a slow background project, but never let the fear of a wrong case ending slow you down. Errors at speed beat silence with perfect grammar, every single time.',
        takeaway: 'Errors-at-speed beat silence-with-perfect-grammar.',
      },
      {
        id: 'w5-feedback',
        question: 'Should I ask for more correction now?',
        answer: 'Yes — you can finally absorb it. In Week 1 corrections just added stress; now you have enough automaticity to act on them. Ask your teacher or host family to flag one mistake you make over and over. One targeted fix beats a page of red ink.',
        takeaway: 'You can absorb correction now. Ask for one recurring fix, not everything.',
        actionItem: 'Ask someone to point out one mistake you make repeatedly — then hunt for it',
      },
    ],
  },
  {
    id: 'week6-independence',
    title: 'Week 6: Independence',
    icon: '\u{1F9ED}',
    intro: 'Week 6 is where Russian stops being a class and becomes a life. You handle things alone, relationships deepen, and you start living in the language instead of performing it.',
    week: 6,
    cards: [
      {
        id: 'w6-solo',
        question: 'Can I really handle things on my own now?',
        answer: 'Yes — and you should. Run errands, order food, take a taxi, ask for help, all in Russian and all solo. Doing real tasks alone builds confidence faster than any classroom drill, because the stakes are real and you find out you can actually do it.',
        takeaway: 'Independence builds confidence faster than class does.',
        actionItem: 'Do one task alone in Russian you’d normally avoid — the market, a taxi, a café order',
      },
      {
        id: 'w6-unplanned',
        question: 'What if something unexpected happens?',
        answer: 'You\'re more ready than you feel. You have your survival phrases, enough Russian to improvise, and the clarification skills you drilled in Week 1. When something goes sideways — wrong bus, confused order, a question you didn\'t expect — that\'s not a failure, it\'s the real test, and passing it is a bigger win than any quiz.',
        takeaway: 'Handling an unplanned moment in Russian is a bigger win than any test score.',
      },
      {
        id: 'w6-relationships',
        question: 'How do my relationships change this week?',
        answer: 'Your host family and classmates start becoming actual friends. Conversations get personal — jokes, opinions, small frustrations, real stories. You stop performing “Russian student answers question” and start being a person who happens to be speaking Russian. That shift is the heart of immersion.',
        takeaway: 'You stop performing Russian and start living in it.',
      },
      {
        id: 'w6-excursion',
        question: 'How do I get the most out of excursions and outings?',
        answer: 'Treat every outing as input, not a break from learning. Narrate what you see, ask locals and guides questions, read the signs. The one thing that wastes an excursion is clustering with the other English speakers and switching off. Stay in Russian even when it’s optional.',
        takeaway: 'Every outing is a rep. Don’t cluster with the English speakers.',
        actionItem: 'Ask a guide or a stranger one question in Russian on your next outing',
      },
      {
        id: 'w6-identity',
        question: 'I feel like a slightly different person in Russian.',
        answer: 'That\'s normal — and it\'s a good sign. Most people have a slightly different personality in their second language: maybe blunter, funnier, quieter, or more direct. That second-language self isn\'t fake; it\'s part of becoming fluent. Let it exist instead of fighting to be your exact English self.',
        takeaway: 'Your Russian-self is allowed to be a little different from your English-self.',
      },
    ],
  },
  {
    id: 'week7-finalpush',
    title: 'Week 7: Final Push & Assessments',
    icon: '\u{1F3C1}',
    intro: 'The final OPI or presentation is coming. The goal this week is to perform what you already have — not to cram new grammar or burn out before the finish line.',
    week: 7,
    cards: [
      {
        id: 'w7-assessment',
        question: 'How do I prep for the final OPI or presentation?',
        answer: 'Review your own recurring patterns, not new material. Rehearse out loud — record yourself answering common questions and listen back. The OPI rewards keeping the conversation going, using your clarification phrases, and showing what you can do, not flawless grammar. Practice talking, not studying.',
        takeaway: 'Rehearse out loud. The OPI rewards communication, not perfection.',
        actionItem: 'Do a timed mock interview: Откуда вы? Чем занимаетесь? Что вам понравилось?',
      },
      {
        id: 'w7-nerves',
        question: 'I’m anxious about being tested.',
        answer: 'The OPI is a conversation, not a trap. The examiner wants you to succeed and will follow your lead. Treat it like a host-family chat: ask for repetition if you need it (Повторите, пожалуйста), think out loud, and keep going when you stumble. Silence hurts more than a wrong ending.',
        takeaway: 'The OPI measures communication, not flawless grammar — keep talking.',
      },
      {
        id: 'w7-peak',
        question: 'Should I cram hard this week?',
        answer: 'No. Cramming the week before the finish risks burnout right when you need to perform. Steady reps plus sleep beat marathon study sessions. You\'ve done the work for seven weeks — trust it. Arrive at the assessment rested and warm, not fried.',
        takeaway: 'Don’t sprint the week before the finish line. Pace it, sleep, trust the work.',
      },
      {
        id: 'w7-immersion',
        question: 'Do I keep immersing or switch to test-prep mode?',
        answer: 'Stay immersed. Living in Russian — host-family dinners, errands, conversations — is the best assessment prep there is. Retreating into English flashcards and grammar tables actually makes you slower and more anxious on test day. Your daily immersion is the prep.',
        takeaway: 'Immersion is your assessment prep — don’t abandon it for the textbook.',
      },
      {
        id: 'w7-evidence',
        question: 'How do I see how far I’ve actually come?',
        answer: 'Re-record the self-introduction you made on Day 1 of your prep — same prompt, today. Then play the two back to back. The gap between them is your proof. Most students are shocked by how much faster, looser, and more confident they sound. That gap is what CLS bought you.',
        takeaway: 'The Day-1 vs Week-7 recording gap is your hard evidence of growth.',
        actionItem: 'Re-record your self-introduction and compare it to your very first one',
      },
    ],
  },
  {
    id: 'week8-closure',
    title: 'Week 8: Closure & Re-entry',
    icon: '\u{1F9F3}',
    intro: 'The last week is about goodbyes, honest reflection, and protecting what you built. The gains are real — but without a plan, they fade fast once you’re home.',
    week: 8,
    cards: [
      {
        id: 'w8-goodbye',
        question: 'How do I say goodbye to my host family well?',
        answer: 'Say it in Russian, however imperfect. Thank them for something specific — a meal, a conversation, their patience — not just a generic Спасибо. This relationship carried your immersion, and a heartfelt, broken Russian goodbye means far more to them than a polished English one. Effort over elegance, one last time.',
        takeaway: 'A heartfelt, imperfect Russian goodbye beats a polished English one.',
        actionItem: 'Thank your host family in Russian for one specific thing they did for you',
      },
      {
        id: 'w8-reflect',
        question: 'How do I measure what I actually gained?',
        answer: 'Not by fluency — you’re not fluent, and that was never the goal. Measure the durable things: you speak when you’re unsure, you recover from confusion instead of freezing, and you can live a whole day in Russian. Those don’t disappear. You’re leaving with momentum and resilience, not a finished language.',
        takeaway: 'You’re leaving with momentum and resilience, not a finished language.',
      },
      {
        id: 'w8-cliff',
        question: 'What happens to my Russian when I get home?',
        answer: 'Be honest: without a plan, it fades fast. This is the re-entry cliff — you go from all-day immersion to zero Russian overnight, and the gains erode within weeks. The good news: the cliff is avoidable. The skills are protectable, just not automatically. You have to decide to keep them.',
        takeaway: 'The post-CLS cliff is real — momentum needs a plan to survive it.',
      },
      {
        id: 'w8-maintain',
        question: 'How do I keep Russian alive at home?',
        answer: 'Schedule weekly reps before the habit dies. Concrete options: a weekly tutor or language partner (iTalki), a podcast on your commute, one Russian show, and texting a CLS friend in Russian. One recurring commitment you actually keep beats five ambitious ones you don’t.',
        takeaway: 'Book recurring reps now — one kept commitment beats five abandoned ones.',
        actionItem: 'Book one recurring Russian commitment (tutor, partner, group) before you fly home',
      },
      {
        id: 'w8-next',
        question: 'What’s the realistic picture after CLS?',
        answer: 'You came in with about a year of college Russian; you’re leaving closer to two years’ worth, with real immersion experience textbooks can’t give. You’re not fluent — but you’re launched. From here, the students who keep showing up keep closing the gap. CLS didn’t finish the job; it gave you the momentum to finish it yourself.',
        takeaway: 'CLS launched you — staying in the language is now the whole game.',
      },
    ],
  },
];

export function getAllRevealCardIds(): readonly string[] {
  return mindsetSections.flatMap((s) => s.cards.map((c) => c.id));
}

/** Sorted, distinct program-week numbers that have mindset sections. */
export function getMindsetWeeks(): readonly number[] {
  const weeks = new Set<number>();
  for (const s of mindsetSections) {
    if (s.week !== undefined) weeks.add(s.week);
  }
  return [...weeks].sort((a, b) => a - b);
}

/** Sections tagged to a given program week. */
export function getSectionsForWeek(week: number): readonly MindsetSection[] {
  return mindsetSections.filter((s) => s.week === week);
}

/** Untagged sections that apply across the whole program (General). */
export function getGeneralSections(): readonly MindsetSection[] {
  return mindsetSections.filter((s) => s.week === undefined);
}
