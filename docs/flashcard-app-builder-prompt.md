# Flashcard App Builder — Prompt to Give Someone Else

Copy **everything inside the box below** and paste it as your first message into
Claude Code (or another AI coding agent that can create files and run commands).
Then just answer its questions in plain English.

---

```
You are going to build me a flashcard study app, and then put it online so I can
use it on my phone. I am NOT a programmer. I don't want to see code, error
messages, or technical terms — your job is to handle all of that and talk to me
like a normal person.

HOW TO WORK WITH ME:
- Ask me only ONE question at a time, in plain English, then wait for my answer.
- Never show me code or jargon. If you must mention a tool, explain it in one
  simple sentence.
- After you build each part, actually run the app in a browser and confirm it
  works before moving on. Tell me, in plain words, what now works.
- If something breaks, quietly fix the real cause yourself. Don't paste errors
  at me or ask me to debug.
- You make ALL the technical choices. Only ask me about things listed under
  "ASK ME" below.

WHAT WE'RE BUILDING:
A "spaced repetition" flashcard app — like Anki or Quizlet. It shows me a card,
I try to recall the answer, I flip it, and I rate how well I knew it. The app
uses that rating to decide when to show me each card again, so I review hard
cards more often and easy ones less. My progress is saved in my browser
automatically — no account, no login, no password.

ASK ME (one question at a time, wait for each answer):
1. What subject are the flashcards for? (for example: Russian vocabulary,
   anatomy terms, guitar chords, state capitals)
2. What should be on the FRONT of a card (the question/prompt), and what's the
   ANSWER on the back?
3. How do I want to get my cards in? Offer me these choices:
     a) I'll paste a plain list (you tell me the format to use)
     b) I have a spreadsheet / CSV file
     c) I have an Anki ".apkg" file to import
     d) Help me make the cards from scratch
   Then handle whichever I pick — build an import feature that reads pasted text,
   CSV/TSV, AND Anki .apkg files, and load my starting cards in.
4. What should the app be called, and do I have any color or style preference?

TECHNICAL DECISIONS — MAKE THESE YOURSELF, DON'T ASK ME:
- Build it as a lightweight website using TypeScript and Vite. Keep dependencies
  minimal.
- Use the SM-2 spaced-repetition algorithm. Save my progress and schedule in the
  browser's localStorage. No backend, no database, no accounts.
- Include the bulk-import feature described above (pasted text, CSV/TSV, .apkg).
- Make it a PWA (installable web app) using vite-plugin-pwa, so it works offline
  and I can add it to my phone's home screen like a real app.
- Keep the design clean, mobile-friendly, and easy to tap on a phone.

BUILD IN THIS ORDER, and check each works before the next:
1. Set up the empty project and get a blank page showing in the browser.
2. Build the card data model and the import feature; load my cards in.
3. Build the SM-2 spaced-repetition engine and progress saving.
4. Build the flashcard screen: show a card, flip it, rate how well I knew it,
   and advance to the next card that's due.
5. Make it work offline and be installable on a phone (PWA).
6. Polish the look based on my name/color preferences.

WHEN IT'S WORKING, PUT IT ONLINE:
Walk me step by step, as if I've never done this, through deploying it free to
Vercel so I get a web link:
- Help me create a free Vercel account if I don't have one.
- Deploy the app and give me the live link.
- Show me how to open that link on my phone and install it to my home screen.

Start now by confirming you understand, then ask me question 1.

(Optional, only if I ask later: you can also add spoken pronunciation of cards
using text-to-speech, or extra tabs like phrase lists, a daily study plan, or
resource links. Don't build these unless I request them.)
```

---

## Notes for you (the person handing this over)

- **What they need first:** Claude Code installed (or another agent that can create
  files and run terminal commands). A plain chat window like ChatGPT won't be able to
  build and deploy on its own.
- **Content ready to go** helps a lot — a pasted list, a CSV, or an `.apkg` export.
- **The deploy step needs a free Vercel account** (an email is enough). The agent walks
  them through it.
- If they want the extras your app has (text-to-speech, phrases/daily-plan/mindset/
  resources tabs), they just ask the agent for them after the core app works — the
  last line of the prompt tells the agent that's allowed.
