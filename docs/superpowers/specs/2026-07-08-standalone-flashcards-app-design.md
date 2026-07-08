# Generic Flashcards App — Ship 1 Design

**Date:** 2026-07-08
**Status:** Approved (brainstorming) → ready for implementation plan

## Context

Flashcards currently live as one tab (among home, prep, mindset, daily-plan,
phrases, resources) inside the `cls_app` PWA (vanilla TS + Vite +
`vite-plugin-pwa`). The flashcard subsystem is largely self-contained, but the
data model is Russian-specific (`VocabWord`: cyrillic, transliteration, POS,
aspect pairs) and the scheduler is a hand-rolled SM-2.

The goal is a **brand-new standalone, generic flashcards app** with its own URL.
The core engine knows nothing about Russian; Russian becomes the first of
potentially many content packs, and users can import their own decks.

## Decisions (from brainstorming)

- **CLS app is untouched.** The new app is an independent fork; the two codebases
  evolve separately.
- **New separate repo** `flashcards-app` (generic name), sibling to `cls_app`,
  fresh git history, own Vercel project + production URL.
- **Same tech stack**: vanilla TS + Vite + `vite-plugin-pwa`. New dependencies:
  `ts-fsrs` (scheduling), `idb-keyval` (IndexedDB storage).
- **Content-agnostic engine.** Russian is a bundled content pack; the core has no
  Russian-specific logic.
- **User import in Ship 1** — runtime upload of CSV and native-JSON decks.
- Visual direction: **clean & minimal**, light-first.
- Scope decomposed into ships. **Ship 1** (this spec) = generic engine +
  extraction of Russian into a pack + new visual identity + FSRS/progress
  foundations + import. Study modes, editor, sync, dark mode are later ships.

## Ship 1 Scope

### 1. Repo, hosting, identity
- New repo at `/Users/coreybailey/Documents - Local/GitHub/flashcards-app`
  (sibling to `cls_app`), fresh git history.
- Own Vercel project → own production URL. Publish flow mirrors CLS:
  commit + push + `vercel --prod` (no git auto-deploy; SSO 302 on curl is normal).
- `cls_app` receives no edits as part of this work.
- New app name, icons, and favicon — a neutral, generic identity (not "CLS").

### 2. Tech stack
Vanilla TS + Vite + `vite-plugin-pwa`. Adds `ts-fsrs` and `idb-keyval`.

### 3. Generic data model (content-agnostic core)
```ts
interface Card {
  id: string;        // namespaced: `${packId}:${localId}`
  front: string;
  back: string;
  hint?: string;
  tags?: readonly string[];
  audio?: string;    // url to a bundled audio file; absent → fall back to TTS
}
interface Deck { id: string; label: string; cardIds: readonly string[] }
interface Pack {
  id: string;
  name: string;
  language: string;  // BCP-47 for TTS, e.g. 'ru-RU'
  source: 'builtin' | 'imported';
  decks: readonly Deck[];
  cards: Record<string, Card>;
}
```
Card ids are namespaced by pack (`packId:localId`) so packs never collide and
progress state is never corrupted by re-deriving a pack.

### 4. Content sources
- **Built-in Russian pack** — `scripts/build-russian-pack.ts` consumes
  `russian-1000-frequency.tsv` and emits a generic `Pack` JSON. ALL
  Russian-specific logic lives in this build script, not the core:
  - filler-word POS filtering,
  - aspect-pair merging,
  - frequency deck-splitting (decks of 50),
  - field mapping: cyrillic → `front`, English gloss → `back`,
    transliteration/POS → `hint`, existing audio file → `audio`.
  Ships with its pre-generated audio in `public/audio/`.
- **Imported packs** — runtime file upload via an `import/` module:
  - **CSV**: header-driven. Required columns `front,back`; optional
    `hint,tags,deck` (tags pipe- or comma-separated within the cell). Anki /
    Quizlet CSV exports import with minimal massaging.
  - **native JSON**: the app's own `Pack` shape, validated on load.
  - Format auto-detected by extension/content; import UI shows a preview, lets
    the user name the deck and set its language, and surfaces per-row errors
    explicitly (no silent drops).

### 5. Storage — IndexedDB via `idb-keyval`
Rationale: imported content can exceed localStorage's ~5MB, and imported deck
content (not just review state) must persist. Versioned, migration-safe schema:
```ts
{
  schemaVersion: 1,
  packs: Record<string, Pack>,          // imported packs only (built-ins load from static JSON)
  cardStates: Record<string, FsrsState>,// FSRS state keyed by namespaced card id
  settings: { dailyNewCards: number, ... },
}
```
A `migrate(old) → current` seam keeps future ships able to evolve data.

### 6. Scheduler — `ts-fsrs` wrapper
`scheduler.ts` wraps `ts-fsrs`, replacing SM-2:
- 4-button rating: Again / Hard / Good / Easy.
- Configurable **daily new-card limit** (default 20).
- Operates purely on namespaced card ids; exposes due date / interval / state.

### 7. Progress derivation
Pure functions computing per deck (learned/total, cards due now) and globally
("X due today"), across both built-in and imported packs.

### 8. TTS — language-aware
`tts.ts` takes a BCP-47 language. Russian pack cards use their bundled audio
files; imported cards (no `audio`) fall back to browser SpeechSynthesis in the
pack's declared language.

### 9. Screens (clean & minimal, light-first)
Card is the hero; restrained palette, one accent color, crisp typography.
- **Home / dashboard** — "X due today" primary CTA (→ review all due); list of
  packs → decks with per-deck progress + due badges; an **Import** entry point.
- **Import** — pick file (format auto-detected), preview rows, name the deck, set
  language, confirm; errors surfaced inline.
- **Study session** — one card, tap/click to flip, 4 grading buttons, session
  progress bar, audio button; end-of-session summary.

Nav is simple: Home + Study (+ Import as a Home action).

### 10. PWA
New manifest, generic app name, new icons + favicon. Installable and
offline-capable (built-in pack JSON + audio precached; imported packs live in
IndexedDB).

### 11. Testing (Vitest)
- CSV import parsing + validation (missing columns, bad rows, tag splitting).
- native-JSON pack validation (rejects malformed packs).
- Russian pack build mapping (filler filter, aspect-pair merge, deck split,
  field mapping; assert card-id uniqueness).
- progress math (learned/due counts across packs).
- storage migration (legacy/v0 → v1).
- FSRS wrapper (grading advances state; due filtering; daily new-card limit).

## Explicitly out of scope (later ships)
- In-app deck creation/editing (CRUD editor).
- New study modes (typing/recall, quiz, audio-first).
- Streaks / stats dashboard.
- Cross-device sync.
- Dark mode.
- Per-user FSRS parameter optimization.

## Open risks / notes
- `ts-fsrs` default parameters used as-is for Ship 1; optimization is future work.
- Stable, collision-free card-id derivation asserted at build time (Russian) and
  at import time (namespacing + local-id uniqueness within a pack).
- IndexedDB is async; the app boot sequence must await store hydration before
  first render, with a lightweight loading state.
- CSV parsing must handle quoted fields/commas/newlines correctly — use a small
  proven CSV parser rather than a naive split (search-before-building).
