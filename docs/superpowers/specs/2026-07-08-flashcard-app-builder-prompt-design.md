# Design: "Build-Your-Own Flashcard App" Kickoff Prompt

**Date:** 2026-07-08
**Status:** Approved (design)

## Goal

Produce a single, self-contained prompt that a **non-technical person** can paste
into **Claude Code (or a similar agentic coding tool)**. The agent then interviews
them in plain English and builds a working spaced-repetition flashcard web app
end-to-end, finishing with a live URL they can install on their phone.

The prompt is a **blank-slate builder**, not a clone of the CLS Russian app. The
person's subject, content, and branding are theirs; the architecture is prescribed
so a non-technical user never has to make a technical decision.

## Audience & Delivery

- **Runner of the prompt:** non-technical, zero coding.
- **Environment:** Claude Code / an agent that can create files, run commands, and deploy.
- **Deliverable:** one Markdown file containing the prompt text, ready to copy-paste.

## Scope

**In:**
- Core spaced-repetition (SM-2) flashcards.
- Bulk content import (pasted list, CSV/TSV, Anki `.apkg`).
- Offline, installable PWA.
- Deploy to a free host (Vercel) → live URL.

**Out (deliberately, per owner):**
- Text-to-speech audio.
- Extra content tabs (phrases / daily plan / mindset / resources).

Both are mentioned in a closing "you can ask the agent to add these later" line so the
door stays open without bloating the core build.

## Prompt Structure (five parts)

### 1. Role & rules of engagement (agent behavior)
- You are building a spaced-repetition flashcard app for a non-technical person.
- Ask exactly **one plain-English question at a time**. Wait for the answer.
- Never show code, jargon, or errors unless asked. Translate everything to plain language.
- After each build step, **verify it runs in the browser** before moving on.
- On failure, root-cause and fix; do not hand the user raw errors.
- Make all technical decisions yourself using the fixed spec below.

### 2. The interview (only decisions the person owns)
Asked one at a time:
1. Subject of the flashcards (e.g., Russian words, anatomy terms, guitar chords).
2. What's on the front of a card (the prompt) and what's the answer on the back.
3. Where content comes from → offer bulk import: paste a list / spreadsheet (CSV) /
   Anki `.apkg` file, **or** "help me make cards from scratch."
4. App name and any color/vibe preference.

### 3. Fixed technical spec (agent does NOT ask about these)
- **Stack:** vanilla TypeScript + Vite. Lightweight, few dependencies.
- **SRS:** SM-2 algorithm. Progress persisted in the browser via `localStorage`.
  No login, no database, no accounts.
- **Import:** parser handling pasted text, CSV/TSV, and Anki `.apkg`.
- **PWA:** `vite-plugin-pwa`, offline-capable, installable to a phone home screen.

### 4. Build order (milestones, verify each)
Scaffold → data model + import → SRS engine → flashcard UI (flip + grade) →
PWA/offline → polish. Agent shows the running app in the browser at each milestone.

### 5. Deploy walkthrough
Plain-language, assumes never-deployed-before: create a free Vercel account, run the
deploy, open the live URL, install to phone home screen.

## Success Criteria

- A non-technical person can paste the prompt and, by only answering plain questions,
  end up with a live, installable flashcard app loaded with their own content.
- No step requires them to read code, understand the stack, or debug.
