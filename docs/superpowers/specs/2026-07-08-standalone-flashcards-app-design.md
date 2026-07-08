# Standalone Russian Flashcards App — Ship 1 Design

**Date:** 2026-07-08
**Status:** Approved (brainstorming) → ready for implementation plan

## Context

Flashcards currently live as one tab (among home, prep, mindset, daily-plan,
phrases, resources) inside the `cls_app` PWA (vanilla TS + Vite +
`vite-plugin-pwa`). The flashcard subsystem is largely self-contained:
`pages/flashcards.ts`, `data/decks.ts` + `aspect-pairs.ts` + `types.ts`,
`srs.ts` (SM-2), `storage.ts` (localStorage), `tts.ts`, `components/flashcard.ts`,
plus `public/data/russian-1000.json` and `public/audio/`.

The goal is a **brand-new standalone flashcard app** with its own URL.

## Decisions (from brainstorming)

- **CLS app is untouched.** The new app is an independent **fork/copy**; the two
  codebases evolve separately. No changes to `cls_app`.
- **New separate repo** `cls_flashcards` with its own git history, own Vercel
  project, own production URL.
- **Same tech stack** as CLS: vanilla TS + Vite + `vite-plugin-pwa`. One new
  dependency: `ts-fsrs`.
- Scope is **copy + specific improvements now**, decomposed into ships.
  **Ship 1** (this spec) = extraction + new visual identity + SRS/progress
  foundations. Study modes, new content, sync, dark mode are **later ships**.

## Ship 1 Scope

### 1. Repo, hosting, identity
- New repo at `/Users/coreybailey/Documents - Local/GitHub/cls_flashcards`
  (sibling to `cls_app`), fresh git history.
- Own Vercel project → own production URL. Publish flow mirrors CLS:
  commit + push + `vercel --prod` (no git auto-deploy; SSO 302 on curl is normal).
- `cls_app` receives no edits as part of this work.

### 2. Tech stack
Vanilla TS + Vite + `vite-plugin-pwa`. Adds only `ts-fsrs`.

### 3. Ported near-unchanged from cls_app
- **Data pipeline**: `russian-1000-frequency.tsv` → `scripts/build-vocab.ts` →
  `public/data/russian-1000.json`. Copied verbatim.
- **Audio**: `public/audio/` + `tts.ts` (SpeechSynthesis fallback).
- **Deck derivation**: `data/decks.ts` (frequency decks of 50, filler-word
  filtering, aspect-pair merging) + `data/aspect-pairs.ts` + `data/types.ts`.
- **Router** pattern from `router.ts`.

### 4. Rewritten (the improvements)
- **`scheduler.ts`** — thin wrapper over `ts-fsrs`, replacing SM-2 `srs.ts`.
  - Standard 4-button rating: Again / Hard / Good / Easy.
  - Configurable **daily new-card limit** (default 20) so the frequency list is
    paced rather than dumped all at once.
  - Exposes due date / interval / state cleanly for the progress UI.
- **`storage.ts`** — versioned, migration-safe localStorage schema:
  ```ts
  { schemaVersion: 1, cards: { [wordId]: FsrsCardState }, settings: {...}, meta: {...} }
  ```
  - A `migrate(old) → current` seam so later ships evolve data instead of
    breaking it.
  - Card id = a **stable key derived from the word** (not array index), so deck
    re-derivation never corrupts progress.
- **Progress derivation** — pure functions computing:
  - per deck: learned / total, and cards **due now**;
  - globally: "**X due today**".

### 5. Screens (visual direction: clean & minimal)
Card is the hero; everything else recedes. Restrained palette, one accent color,
crisp typography. **Light-first** (dark mode deferred).

- **Home / dashboard** — primary CTA "X cards due today" (→ Review all due),
  then the deck list with per-deck progress + due badges.
- **Study session** — one card, tap/click to flip, 4 grading buttons, session
  progress bar, audio button; end-of-session summary.
- Deck selection lives on Home; selecting a deck starts a session scoped to it.

Nav is simpler than CLS's 7 tabs: **Home + Study** only.

### 6. PWA & identity
New `manifest`, new app name, **new icons** distinct from CLS, new favicon.
Installable and offline-capable (vocab JSON + audio precached).

### 7. Testing
Vitest for the logic that carries risk:
- deck derivation (frequency split, filler filtering, aspect-pair merge),
- progress math (learned/due counts),
- storage migration (v0/legacy → v1),
- FSRS wrapper (grading advances state; due filtering correct; daily new-card
  limit respected).

UI is wired on top of the tested logic.

## Explicitly out of scope (later ships)
- New study modes (typing/recall, quiz, audio-first).
- Streaks / stats dashboard.
- New decks / content beyond the current frequency + aspect-pair set.
- Cross-device sync.
- Dark mode.

## Open risks / notes
- `ts-fsrs` default parameters are used as-is for Ship 1; per-user parameter
  optimization is a future concern, not a launch blocker.
- Stable card-id derivation must be collision-free across the vocab set; the
  build step should assert uniqueness.
