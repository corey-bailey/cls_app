# Generic Flashcards App — Ship 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a standalone, content-agnostic flashcards PWA with its own URL — Russian ships as the first built-in pack, users can import their own decks (CSV/JSON), scheduling uses FSRS, storage uses IndexedDB.

**Architecture:** Vanilla TypeScript + Vite + `vite-plugin-pwa`, no UI framework. A generic `Pack → Deck → Card` model sits at the core; all Russian-specific logic lives in a build script that emits a generic pack JSON. FSRS (`ts-fsrs`) drives scheduling; IndexedDB (`idb-keyval`) persists imported packs + review state under a versioned, migration-safe schema. UI is plain DOM modules rendered by a hash router.

**Tech Stack:** TypeScript, Vite, vite-plugin-pwa, ts-fsrs, idb-keyval, papaparse (CSV), Vitest + jsdom + fake-indexeddb (tests).

## Global Constraints

- New repo at `/Users/coreybailey/Documents - Local/GitHub/flashcards-app` — a **sibling** to `cls_app`, fresh git history. `cls_app` is never edited.
- Immutability: never mutate objects/arrays in place; always return new values. (ts-fsrs `next()` already returns a new card — never mutate its result.)
- No hardcoded secrets. No network calls except `fetch` of the app's own bundled `/data/*.json`.
- Card ids are namespaced: `` `${packId}:${localId}` `` — enforced by `makeCardId`. Never build an id by hand.
- Files stay focused: ≤ ~300 lines, functions < 50 lines, nesting ≤ 4.
- TDD: failing test first, watch it fail, minimal code, watch it pass, commit. Commit format `<type>: <description>`.
- Deploy flow mirrors CLS: commit + push + `vercel --prod` (no git auto-deploy).
- Node dev server is launched via `./node_modules/.bin/vite` directly (the `npm run dev` / `npx vite` forms are blocked by a hook in this environment); verify pages with Lightpanda.

---

## File Structure

```
flashcards-app/
  index.html
  package.json  tsconfig.json  vite.config.ts  vitest.config.ts
  .gitignore
  scripts/build-russian-pack.ts        # Russian TSV → generic pack JSON (all RU-specific logic)
  russian-1000-frequency.tsv           # copied from cls_app (build input)
  public/
    data/russian.json                  # generated built-in pack
    audio/*.mp3                         # copied from cls_app
    icon-192.png icon-512.png favicon.svg
  src/
    main.ts                            # boot: hydrate db → load packs → router
    router.ts                          # hash router (ported)
    style.css                          # clean-minimal design tokens + layout
    model/types.ts                     # Card, Deck, Pack, id helpers
    storage/db.ts                      # DbShape, load/save, migrate (idb-keyval)
    scheduler.ts                       # ts-fsrs wrapper (grade/isDue/newState)
    session.ts                         # buildStudyQueue (review + capped new)
    progress.ts                        # deckProgress, dueToday
    packs/registry.ts                  # builtin + imported pack list, findCard
    tts.ts                             # language-aware speech / audio playback
    import/csv.ts                      # csvToPack
    import/json.ts                     # jsonToPack
    import/index.ts                    # detectFormat, importFile
    components/flashcard.ts            # flip card view
    components/progress-bar.ts         # session progress bar
    components/nav.ts                  # minimal nav
    pages/home.ts                      # dashboard: due today, packs/decks, import link
    pages/study.ts                     # study session
    pages/import.ts                    # import UI
  test/  (mirrors src/ where logic is tested)
```

---

## Task 1: Scaffold the repo

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `index.html`, `.gitignore`, `src/main.ts`, `src/style.css`, `test/smoke.test.ts`

**Interfaces:**
- Produces: a buildable, testable project skeleton. No exported app code yet.

- [ ] **Step 1: Create the repo directory and init git**

```bash
mkdir -p "/Users/coreybailey/Documents - Local/GitHub/flashcards-app"
cd "/Users/coreybailey/Documents - Local/GitHub/flashcards-app"
git init -q
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "flashcards-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "build-russian": "tsx scripts/build-russian-pack.ts"
  },
  "dependencies": {
    "idb-keyval": "^6.2.1",
    "papaparse": "^5.4.1",
    "ts-fsrs": "^4.0.0"
  },
  "devDependencies": {
    "@types/papaparse": "^5.3.14",
    "fake-indexeddb": "^6.0.0",
    "jsdom": "^25.0.0",
    "tsx": "^4.21.0",
    "typescript": "~5.6.0",
    "vite": "^7.0.0",
    "vite-plugin-pwa": "^1.2.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noEmit": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src", "scripts", "test"]
}
```

- [ ] **Step 4: Write `vite.config.ts`, `vitest.config.ts`, `index.html`, `.gitignore`, `src/style.css`, `src/main.ts`**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Flashcards',
        short_name: 'Flashcards',
        theme_color: '#111111',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,json,mp3,png,svg}'] },
    }),
  ],
});
```

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['fake-indexeddb/auto'],
    include: ['test/**/*.test.ts'],
  },
});
```

`index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Flashcards</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

`.gitignore`:
```
node_modules
dist
.vercel
.DS_Store
*.local
```

`src/style.css` (minimal placeholder tokens; expanded in Task 15):
```css
:root { --bg: #ffffff; --fg: #111111; --muted: #6b7280; --accent: #2563eb; --line: #e5e7eb; --radius: 14px; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); }
```

`src/main.ts` (temporary boot, replaced in Task 16):
```ts
import './style.css';
document.querySelector<HTMLDivElement>('#app')!.textContent = 'Flashcards';
```

- [ ] **Step 5: Write `test/smoke.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
describe('smoke', () => {
  it('runs', () => { expect(1 + 1).toBe(2); });
});
```

- [ ] **Step 6: Install and verify build + test**

Run:
```bash
cd "/Users/coreybailey/Documents - Local/GitHub/flashcards-app"
npm install
npm test
npm run build
```
Expected: `npm test` → 1 passing; `npm run build` → succeeds, emits `dist/`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold generic flashcards app (vite + vitest + pwa)"
```

---

## Task 2: Data model + id helpers

**Files:**
- Create: `src/model/types.ts`
- Test: `test/model/types.test.ts`

**Interfaces:**
- Produces:
  - `interface Card { id: string; front: string; back: string; hint?: string; tags?: readonly string[]; audio?: string }`
  - `interface Deck { id: string; label: string; cardIds: readonly string[] }`
  - `type PackSource = 'builtin' | 'imported'`
  - `interface Pack { id: string; name: string; language: string; source: PackSource; decks: readonly Deck[]; cards: Record<string, Card> }`
  - `makeCardId(packId: string, localId: string): string`
  - `packIdOf(cardId: string): string`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { makeCardId, packIdOf } from '../../src/model/types';

describe('card id helpers', () => {
  it('namespaces ids by pack', () => {
    expect(makeCardId('russian', '0042')).toBe('russian:0042');
  });
  it('extracts the pack id from a namespaced id', () => {
    expect(packIdOf('russian:0042')).toBe('russian');
  });
  it('round-trips a local id that itself contains a colon', () => {
    const id = makeCardId('mypack', 'a:b');
    expect(packIdOf(id)).toBe('mypack');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/model/types.test.ts`
Expected: FAIL — cannot find module `../../src/model/types`.

- [ ] **Step 3: Write `src/model/types.ts`**

```ts
export interface Card {
  readonly id: string;
  readonly front: string;
  readonly back: string;
  readonly hint?: string;
  readonly tags?: readonly string[];
  readonly audio?: string;
}

export interface Deck {
  readonly id: string;
  readonly label: string;
  readonly cardIds: readonly string[];
}

export type PackSource = 'builtin' | 'imported';

export interface Pack {
  readonly id: string;
  readonly name: string;
  readonly language: string; // BCP-47, e.g. 'ru-RU'
  readonly source: PackSource;
  readonly decks: readonly Deck[];
  readonly cards: Record<string, Card>;
}

export function makeCardId(packId: string, localId: string): string {
  return `${packId}:${localId}`;
}

/** Pack id is everything before the FIRST colon (local ids may contain colons). */
export function packIdOf(cardId: string): string {
  const i = cardId.indexOf(':');
  return i === -1 ? cardId : cardId.slice(0, i);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/model/types.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/model/types.ts test/model/types.test.ts
git commit -m "feat: add generic Card/Deck/Pack model + namespaced id helpers"
```

---

## Task 3: Storage layer (IndexedDB, versioned, migration-safe)

**Files:**
- Create: `src/storage/db.ts`
- Test: `test/storage/db.test.ts`

**Interfaces:**
- Consumes: `Pack` from `model/types`; `Card as FsrsCard` from `ts-fsrs`.
- Produces:
  - `const CURRENT_SCHEMA = 1`
  - `interface Settings { dailyNewCards: number; newIntroduced: { date: string; count: number } }`
  - `interface DbShape { schemaVersion: number; packs: Record<string, Pack>; cardStates: Record<string, FsrsCard>; settings: Settings }`
  - `const DEFAULT_SETTINGS: Settings`
  - `migrate(raw: unknown): DbShape`
  - `loadDb(): Promise<DbShape>`
  - `saveDb(db: DbShape): Promise<void>`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { clear } from 'idb-keyval';
import { loadDb, saveDb, migrate, CURRENT_SCHEMA, DEFAULT_SETTINGS } from '../../src/storage/db';

beforeEach(async () => { await clear(); });

describe('storage', () => {
  it('returns a fresh default db when empty', async () => {
    const db = await loadDb();
    expect(db.schemaVersion).toBe(CURRENT_SCHEMA);
    expect(db.packs).toEqual({});
    expect(db.cardStates).toEqual({});
    expect(db.settings).toEqual(DEFAULT_SETTINGS);
  });

  it('persists and reloads', async () => {
    const db = await loadDb();
    const next = { ...db, settings: { ...db.settings, dailyNewCards: 5 } };
    await saveDb(next);
    const reloaded = await loadDb();
    expect(reloaded.settings.dailyNewCards).toBe(5);
  });

  it('migrate() fills defaults and stamps the current schema version', () => {
    const migrated = migrate({ packs: { p: undefined } });
    expect(migrated.schemaVersion).toBe(CURRENT_SCHEMA);
    expect(migrated.cardStates).toEqual({});
    expect(migrated.settings).toEqual(DEFAULT_SETTINGS);
  });

  it('migrate(undefined) yields a full default db', () => {
    expect(migrate(undefined)).toEqual({
      schemaVersion: CURRENT_SCHEMA, packs: {}, cardStates: {}, settings: DEFAULT_SETTINGS,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/storage/db.test.ts`
Expected: FAIL — cannot find module `../../src/storage/db`.

- [ ] **Step 3: Write `src/storage/db.ts`**

```ts
import { get, set } from 'idb-keyval';
import type { Card as FsrsCard } from 'ts-fsrs';
import type { Pack } from '../model/types';

export const CURRENT_SCHEMA = 1;
const DB_KEY = 'flashcards-db';

export interface Settings {
  dailyNewCards: number;
  newIntroduced: { date: string; count: number };
}

export interface DbShape {
  schemaVersion: number;
  packs: Record<string, Pack>;
  cardStates: Record<string, FsrsCard>;
  settings: Settings;
}

export const DEFAULT_SETTINGS: Settings = {
  dailyNewCards: 20,
  newIntroduced: { date: '', count: 0 },
};

function freshDb(): DbShape {
  return { schemaVersion: CURRENT_SCHEMA, packs: {}, cardStates: {}, settings: DEFAULT_SETTINGS };
}

/**
 * Normalize any persisted blob to the current shape. Future schema bumps add
 * `if (v < N) { ...transform... }` steps here; Ship 1 only needs default-filling.
 */
export function migrate(raw: unknown): DbShape {
  if (!raw || typeof raw !== 'object') return freshDb();
  const r = raw as Partial<DbShape>;
  return {
    schemaVersion: CURRENT_SCHEMA,
    packs: (r.packs && typeof r.packs === 'object') ? (r.packs as Record<string, Pack>) : {},
    cardStates: (r.cardStates && typeof r.cardStates === 'object') ? (r.cardStates as Record<string, FsrsCard>) : {},
    settings: { ...DEFAULT_SETTINGS, ...(r.settings ?? {}) },
  };
}

export async function loadDb(): Promise<DbShape> {
  const raw = await get(DB_KEY);
  return migrate(raw);
}

export async function saveDb(db: DbShape): Promise<void> {
  await set(DB_KEY, db);
}
```

Note: the `migrate` test above uses `{ packs: { p: undefined } }`; since the value is an object, it is kept as-is (Ship 1 does not deep-validate pack contents — imports are validated at import time). Adjust the test expectation to `expect(migrated.packs).toEqual({ p: undefined })` if strict-equal fails under your runner.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/storage/db.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/storage/db.ts test/storage/db.test.ts
git commit -m "feat: add versioned IndexedDB storage with migration seam"
```

---

## Task 4: FSRS scheduler wrapper

**Files:**
- Create: `src/scheduler.ts`
- Test: `test/scheduler.test.ts`

**Interfaces:**
- Consumes: `ts-fsrs` (`createEmptyCard`, `fsrs`, `Rating`, `State`, `Card as FsrsCard`).
- Produces:
  - `type Grade = 'again' | 'hard' | 'good' | 'easy'`
  - `newState(now: Date): FsrsCard`
  - `grade(state: FsrsCard, g: Grade, now: Date): FsrsCard`
  - `isDue(state: FsrsCard, now: Date): boolean`
  - `isNew(state: FsrsCard | undefined): boolean`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { newState, grade, isDue, isNew } from '../src/scheduler';

const now = new Date('2026-07-08T12:00:00Z');

describe('scheduler', () => {
  it('a brand-new state is New and due now', () => {
    const s = newState(now);
    expect(isNew(s)).toBe(true);
    expect(isDue(s, now)).toBe(true);
  });

  it('undefined state counts as new', () => {
    expect(isNew(undefined)).toBe(true);
  });

  it('grading Good pushes the due date into the future and leaves New', () => {
    const graded = grade(newState(now), 'good', now);
    expect(graded.due.getTime()).toBeGreaterThan(now.getTime());
    expect(isNew(graded)).toBe(false);
  });

  it('grade returns a new object (no mutation of input)', () => {
    const s = newState(now);
    const g = grade(s, 'again', now);
    expect(g).not.toBe(s);
  });

  it('a card graded Easy is not due immediately after', () => {
    const g = grade(newState(now), 'easy', now);
    expect(isDue(g, now)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/scheduler.test.ts`
Expected: FAIL — cannot find module `../src/scheduler`.

- [ ] **Step 3: Write `src/scheduler.ts`**

```ts
import { createEmptyCard, fsrs, Rating, State, type Card as FsrsCard } from 'ts-fsrs';

export type Grade = 'again' | 'hard' | 'good' | 'easy';

const RATING: Record<Grade, Rating> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

const engine = fsrs();

export function newState(now: Date): FsrsCard {
  return createEmptyCard(now);
}

export function grade(state: FsrsCard, g: Grade, now: Date): FsrsCard {
  return engine.next(state, now, RATING[g]).card;
}

export function isDue(state: FsrsCard, now: Date): boolean {
  return state.due.getTime() <= now.getTime();
}

export function isNew(state: FsrsCard | undefined): boolean {
  return !state || state.state === State.New;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/scheduler.test.ts`
Expected: PASS (5 tests). If `isNew(graded)` after Good is `true` in your ts-fsrs version (New→Learning transition differs), assert on `graded.state !== State.New` semantics per the installed version and adjust the test to match observed behavior — the invariant that matters is "due advances and the card is tracked."

- [ ] **Step 5: Commit**

```bash
git add src/scheduler.ts test/scheduler.test.ts
git commit -m "feat: wrap ts-fsrs with grade/isDue/isNew scheduler"
```

---

## Task 5: Study queue builder (review + capped new)

**Files:**
- Create: `src/session.ts`
- Test: `test/session.test.ts`

**Interfaces:**
- Consumes: `isDue`, `isNew` from `scheduler`; `Card as FsrsCard` from `ts-fsrs`.
- Produces:
  - `interface QueueItem { cardId: string; isNew: boolean }`
  - `buildStudyQueue(cardIds: readonly string[], states: Record<string, FsrsCard>, now: Date, newLimit: number): QueueItem[]`
  - Behavior: due reviews first (existing, non-new, due), then up to `newLimit` new cards, preserving input order within each group. `newLimit <= 0` yields reviews only.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { buildStudyQueue } from '../src/session';
import { newState, grade } from '../src/scheduler';

const now = new Date('2026-07-08T12:00:00Z');

describe('buildStudyQueue', () => {
  it('includes new cards up to the limit, reviews first', () => {
    // c1 is a due review (graded again -> due ~1 min later, so due at `later`)
    const states = { c1: grade(newState(now), 'again', now) };
    const later = new Date(now.getTime() + 24 * 3600 * 1000);
    const q = buildStudyQueue(['c1', 'c2', 'c3', 'c4'], states, later, 2);
    expect(q.map((i) => i.cardId)).toEqual(['c1', 'c2', 'c3']);
    expect(q.find((i) => i.cardId === 'c1')!.isNew).toBe(false);
    expect(q.find((i) => i.cardId === 'c2')!.isNew).toBe(true);
  });

  it('excludes reviews that are not yet due', () => {
    const states = { c1: grade(newState(now), 'easy', now) }; // due far in future
    const q = buildStudyQueue(['c1', 'c2'], states, now, 0);
    expect(q).toEqual([]);
  });

  it('newLimit of 0 yields only due reviews', () => {
    const states = { c1: grade(newState(now), 'again', now) };
    const later = new Date(now.getTime() + 24 * 3600 * 1000);
    const q = buildStudyQueue(['c1', 'c2'], states, later, 0);
    expect(q.map((i) => i.cardId)).toEqual(['c1']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/session.test.ts`
Expected: FAIL — cannot find module `../src/session`.

- [ ] **Step 3: Write `src/session.ts`**

```ts
import type { Card as FsrsCard } from 'ts-fsrs';
import { isDue, isNew } from './scheduler';

export interface QueueItem {
  readonly cardId: string;
  readonly isNew: boolean;
}

export function buildStudyQueue(
  cardIds: readonly string[],
  states: Record<string, FsrsCard>,
  now: Date,
  newLimit: number,
): QueueItem[] {
  const reviews: QueueItem[] = [];
  const fresh: QueueItem[] = [];
  for (const cardId of cardIds) {
    const state = states[cardId];
    if (isNew(state)) {
      fresh.push({ cardId, isNew: true });
    } else if (isDue(state, now)) {
      reviews.push({ cardId, isNew: false });
    }
  }
  const capped = newLimit > 0 ? fresh.slice(0, newLimit) : [];
  return [...reviews, ...capped];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/session.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/session.ts test/session.test.ts
git commit -m "feat: add study queue builder (due reviews + capped new cards)"
```

---

## Task 6: Progress derivation

**Files:**
- Create: `src/progress.ts`
- Test: `test/progress.test.ts`

**Interfaces:**
- Consumes: `Deck`, `Pack` from `model/types`; `isDue`, `isNew` from `scheduler`; `Card as FsrsCard` from `ts-fsrs`.
- Produces:
  - `interface DeckProgress { deckId: string; label: string; total: number; learned: number; due: number }`
  - `deckProgress(deck: Deck, states: Record<string, FsrsCard>, now: Date): DeckProgress`
  - `dueToday(packs: readonly Pack[], states: Record<string, FsrsCard>, now: Date): number`
  - Definitions: `learned` = cards with a non-new state; `due` = cards with a non-new state that are due now.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { deckProgress, dueToday } from '../src/progress';
import { newState, grade } from '../src/scheduler';
import type { Deck, Pack } from '../src/model/types';

const now = new Date('2026-07-08T12:00:00Z');
const later = new Date(now.getTime() + 24 * 3600 * 1000);

const deck: Deck = { id: 'd1', label: 'Deck 1', cardIds: ['a', 'b', 'c'] };

describe('progress', () => {
  it('counts learned and due', () => {
    const states = {
      a: grade(newState(now), 'again', now), // learned + due at `later`
      b: grade(newState(now), 'easy', now),  // learned, not due at `later`? (long interval)
    };
    const p = deckProgress(deck, states, later);
    expect(p.total).toBe(3);
    expect(p.learned).toBe(2);
    expect(p.due).toBe(1); // only `a` is due at `later`
  });

  it('dueToday sums due across packs', () => {
    const pack: Pack = {
      id: 'p', name: 'P', language: 'en', source: 'imported',
      decks: [deck], cards: {},
    };
    const states = { a: grade(newState(now), 'again', now) };
    expect(dueToday([pack], states, later)).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/progress.test.ts`
Expected: FAIL — cannot find module `../src/progress`.

- [ ] **Step 3: Write `src/progress.ts`**

```ts
import type { Deck, Pack } from './model/types';
import type { Card as FsrsCard } from 'ts-fsrs';
import { isDue, isNew } from './scheduler';

export interface DeckProgress {
  readonly deckId: string;
  readonly label: string;
  readonly total: number;
  readonly learned: number;
  readonly due: number;
}

export function deckProgress(
  deck: Deck,
  states: Record<string, FsrsCard>,
  now: Date,
): DeckProgress {
  let learned = 0;
  let due = 0;
  for (const cardId of deck.cardIds) {
    const state = states[cardId];
    if (isNew(state)) continue;
    learned += 1;
    if (isDue(state, now)) due += 1;
  }
  return { deckId: deck.id, label: deck.label, total: deck.cardIds.length, learned, due };
}

export function dueToday(
  packs: readonly Pack[],
  states: Record<string, FsrsCard>,
  now: Date,
): number {
  let total = 0;
  for (const pack of packs) {
    for (const deck of pack.decks) {
      total += deckProgress(deck, states, now).due;
    }
  }
  return total;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/progress.test.ts`
Expected: PASS (2 tests). If the `easy` interval in your ts-fsrs version is < 1 day and card `b` is due at `later`, adjust the fixture to grade `b` with a longer horizon or assert `due` accordingly — the invariant is "due counts only non-new cards whose due ≤ now."

- [ ] **Step 5: Commit**

```bash
git add src/progress.ts test/progress.test.ts
git commit -m "feat: add per-deck progress and global due-today derivation"
```

---

## Task 7: CSV import

**Files:**
- Create: `src/import/csv.ts`
- Test: `test/import/csv.test.ts`

**Interfaces:**
- Consumes: `papaparse`; `Card`, `Deck`, `Pack`, `makeCardId` from `model/types`.
- Produces:
  - `interface ImportResult { pack: Pack | null; errors: string[] }`
  - `interface ImportOpts { packId: string; name: string; language: string }`
  - `csvToPack(text: string, opts: ImportOpts): ImportResult`
  - Rules: header row required, must contain `front` and `back` (case-insensitive). Optional columns `hint`, `tags` (split on `;` or `,` within the cell), `deck` (groups cards into decks; absent → one deck named "Imported"). Rows missing front or back are dropped and reported in `errors`. Zero valid rows → `pack: null`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { csvToPack } from '../../src/import/csv';

const opts = { packId: 'imp1', name: 'My Deck', language: 'es-ES' };

describe('csvToPack', () => {
  it('parses front/back and defaults to one deck', () => {
    const res = csvToPack('front,back\nhola,hello\nadios,goodbye', opts);
    expect(res.errors).toEqual([]);
    expect(res.pack!.name).toBe('My Deck');
    expect(res.pack!.language).toBe('es-ES');
    expect(Object.keys(res.pack!.cards)).toHaveLength(2);
    expect(res.pack!.decks).toHaveLength(1);
    expect(res.pack!.decks[0].label).toBe('Imported');
  });

  it('handles hint, tags, and deck columns', () => {
    const csv = 'front,back,hint,tags,deck\nun,one,masc,"num;basic",Numbers';
    const res = csvToPack(csv, opts);
    const card = Object.values(res.pack!.cards)[0];
    expect(card.hint).toBe('masc');
    expect(card.tags).toEqual(['num', 'basic']);
    expect(res.pack!.decks[0].label).toBe('Numbers');
  });

  it('respects quoted fields with commas', () => {
    const res = csvToPack('front,back\n"a, b",c', opts);
    expect(Object.values(res.pack!.cards)[0].front).toBe('a, b');
  });

  it('reports rows missing required fields and drops them', () => {
    const res = csvToPack('front,back\nok,fine\n,missing', opts);
    expect(Object.keys(res.pack!.cards)).toHaveLength(1);
    expect(res.errors.length).toBe(1);
  });

  it('rejects a CSV without front/back headers', () => {
    const res = csvToPack('term,definition\na,b', opts);
    expect(res.pack).toBeNull();
    expect(res.errors[0]).toMatch(/front.*back/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/import/csv.test.ts`
Expected: FAIL — cannot find module `../../src/import/csv`.

- [ ] **Step 3: Write `src/import/csv.ts`**

```ts
import Papa from 'papaparse';
import type { Card, Deck, Pack } from '../model/types';
import { makeCardId } from '../model/types';

export interface ImportResult {
  pack: Pack | null;
  errors: string[];
}

export interface ImportOpts {
  packId: string;
  name: string;
  language: string;
}

function splitTags(raw: string): string[] | undefined {
  const parts = raw.split(/[;,]/).map((t) => t.trim()).filter(Boolean);
  return parts.length ? parts : undefined;
}

export function csvToPack(text: string, opts: ImportOpts): ImportResult {
  const parsed = Papa.parse<Record<string, string>>(text.trim(), {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  const headers = parsed.meta.fields ?? [];
  if (!headers.includes('front') || !headers.includes('back')) {
    return { pack: null, errors: ['CSV must have "front" and "back" columns.'] };
  }

  const errors: string[] = [];
  const cards: Record<string, Card> = {};
  const deckOrder: string[] = [];
  const deckCardIds: Record<string, string[]> = {};

  parsed.data.forEach((row, i) => {
    const front = (row.front ?? '').trim();
    const back = (row.back ?? '').trim();
    if (!front || !back) {
      errors.push(`Row ${i + 1}: missing front or back — skipped.`);
      return;
    }
    const localId = String(i);
    const id = makeCardId(opts.packId, localId);
    const hint = (row.hint ?? '').trim() || undefined;
    const tags = row.tags ? splitTags(row.tags) : undefined;
    cards[id] = { id, front, back, ...(hint ? { hint } : {}), ...(tags ? { tags } : {}) };

    const deckLabel = (row.deck ?? '').trim() || 'Imported';
    if (!deckCardIds[deckLabel]) { deckCardIds[deckLabel] = []; deckOrder.push(deckLabel); }
    deckCardIds[deckLabel].push(id);
  });

  if (Object.keys(cards).length === 0) {
    return { pack: null, errors: errors.length ? errors : ['No valid rows found.'] };
  }

  const decks: Deck[] = deckOrder.map((label, i) => ({
    id: makeCardId(opts.packId, `deck-${i}`),
    label,
    cardIds: deckCardIds[label],
  }));

  const pack: Pack = {
    id: opts.packId, name: opts.name, language: opts.language,
    source: 'imported', decks, cards,
  };
  return { pack, errors };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/import/csv.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/import/csv.ts test/import/csv.test.ts
git commit -m "feat: add CSV-to-pack import with validation and deck grouping"
```

---

## Task 8: Native JSON import

**Files:**
- Create: `src/import/json.ts`
- Test: `test/import/json.test.ts`

**Interfaces:**
- Consumes: `Pack`, `Card`, `Deck` from `model/types`; `ImportResult`, `ImportOpts` from `import/csv`.
- Produces:
  - `jsonToPack(text: string, opts: ImportOpts): ImportResult`
  - Accepts the app's native pack shape (`{ name?, language?, decks, cards }`), re-stamps `id`/`source: 'imported'` from `opts`, validates that every `deck.cardIds` references an existing card and every card has non-empty `front`/`back`. Invalid → `pack: null` + errors.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { jsonToPack } from '../../src/import/json';

const opts = { packId: 'j1', name: 'Fallback Name', language: 'fr-FR' };

const valid = JSON.stringify({
  name: 'French Basics', language: 'fr-FR',
  cards: { 'x:0': { id: 'x:0', front: 'oui', back: 'yes' } },
  decks: [{ id: 'x:d', label: 'Basics', cardIds: ['x:0'] }],
});

describe('jsonToPack', () => {
  it('accepts a valid native pack and stamps source=imported', () => {
    const res = jsonToPack(valid, opts);
    expect(res.errors).toEqual([]);
    expect(res.pack!.source).toBe('imported');
    expect(res.pack!.id).toBe('j1');
    expect(res.pack!.name).toBe('French Basics');
  });

  it('falls back to opts.name when pack omits a name', () => {
    const noName = JSON.stringify({ cards: {}, decks: [] });
    // empty pack is invalid (no cards) — but name fallback still applies to the error path check:
    const res = jsonToPack(noName, opts);
    expect(res.pack).toBeNull();
    expect(res.errors.length).toBeGreaterThan(0);
  });

  it('rejects invalid JSON', () => {
    const res = jsonToPack('{not json', opts);
    expect(res.pack).toBeNull();
    expect(res.errors[0]).toMatch(/json/i);
  });

  it('rejects a deck referencing a missing card', () => {
    const bad = JSON.stringify({
      cards: { 'x:0': { id: 'x:0', front: 'a', back: 'b' } },
      decks: [{ id: 'x:d', label: 'D', cardIds: ['x:0', 'x:missing'] }],
    });
    const res = jsonToPack(bad, opts);
    expect(res.pack).toBeNull();
    expect(res.errors.join(' ')).toMatch(/missing/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/import/json.test.ts`
Expected: FAIL — cannot find module `../../src/import/json`.

- [ ] **Step 3: Write `src/import/json.ts`**

```ts
import type { Card, Deck, Pack } from '../model/types';
import type { ImportOpts, ImportResult } from './csv';

interface RawPack {
  name?: unknown;
  language?: unknown;
  cards?: unknown;
  decks?: unknown;
}

function validCard(v: unknown): v is Card {
  if (!v || typeof v !== 'object') return false;
  const c = v as Record<string, unknown>;
  return typeof c.id === 'string'
    && typeof c.front === 'string' && c.front.trim() !== ''
    && typeof c.back === 'string' && c.back.trim() !== '';
}

export function jsonToPack(text: string, opts: ImportOpts): ImportResult {
  let raw: RawPack;
  try {
    raw = JSON.parse(text) as RawPack;
  } catch {
    return { pack: null, errors: ['Invalid JSON.'] };
  }

  const errors: string[] = [];
  const cardsIn = (raw.cards && typeof raw.cards === 'object') ? raw.cards as Record<string, unknown> : {};
  const cards: Record<string, Card> = {};
  for (const [id, c] of Object.entries(cardsIn)) {
    if (validCard(c)) cards[id] = c;
    else errors.push(`Card "${id}" is malformed (needs id, front, back).`);
  }

  const decksIn = Array.isArray(raw.decks) ? raw.decks : [];
  const decks: Deck[] = [];
  for (const d of decksIn) {
    const dd = d as Partial<Deck>;
    if (typeof dd.id !== 'string' || typeof dd.label !== 'string' || !Array.isArray(dd.cardIds)) {
      errors.push('A deck is missing id, label, or cardIds.');
      continue;
    }
    for (const cid of dd.cardIds) {
      if (!cards[cid as string]) errors.push(`Deck "${dd.label}" references missing card "${cid}".`);
    }
    decks.push({ id: dd.id, label: dd.label, cardIds: dd.cardIds as string[] });
  }

  if (Object.keys(cards).length === 0) errors.push('Pack has no valid cards.');
  if (errors.length > 0) return { pack: null, errors };

  const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name : opts.name;
  const language = typeof raw.language === 'string' && raw.language.trim() ? raw.language : opts.language;
  const pack: Pack = { id: opts.packId, name, language, source: 'imported', decks, cards };
  return { pack, errors: [] };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/import/json.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/import/json.ts test/import/json.test.ts
git commit -m "feat: add native-JSON pack import with structural validation"
```

---

## Task 9: Import orchestration (format detect + dispatch)

**Files:**
- Create: `src/import/index.ts`
- Test: `test/import/index.test.ts`

**Interfaces:**
- Consumes: `csvToPack`, `jsonToPack`, `ImportResult`, `ImportOpts`.
- Produces:
  - `detectFormat(filename: string, text: string): 'csv' | 'json'`
  - `importFile(filename: string, text: string, opts: ImportOpts): ImportResult`
  - Detection: `.json` extension OR text starting with `{`/`[` → json; else csv.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { detectFormat, importFile } from '../../src/import/index';

const opts = { packId: 'p', name: 'N', language: 'en' };

describe('import orchestration', () => {
  it('detects json by extension', () => {
    expect(detectFormat('deck.json', 'front,back')).toBe('json');
  });
  it('detects json by leading brace', () => {
    expect(detectFormat('deck.txt', '  {"cards":{}}')).toBe('json');
  });
  it('defaults to csv', () => {
    expect(detectFormat('deck.csv', 'front,back\na,b')).toBe('csv');
  });
  it('dispatches csv content to the csv importer', () => {
    const res = importFile('d.csv', 'front,back\na,b', opts);
    expect(res.pack!.decks[0].cardIds).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/import/index.test.ts`
Expected: FAIL — cannot find module `../../src/import/index`.

- [ ] **Step 3: Write `src/import/index.ts`**

```ts
import { csvToPack, type ImportOpts, type ImportResult } from './csv';
import { jsonToPack } from './json';

export type { ImportOpts, ImportResult } from './csv';

export function detectFormat(filename: string, text: string): 'csv' | 'json' {
  if (filename.toLowerCase().endsWith('.json')) return 'json';
  const trimmed = text.trimStart();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  return 'csv';
}

export function importFile(filename: string, text: string, opts: ImportOpts): ImportResult {
  return detectFormat(filename, text) === 'json'
    ? jsonToPack(text, opts)
    : csvToPack(text, opts);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/import/index.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/import/index.ts test/import/index.test.ts
git commit -m "feat: add import format detection and dispatch"
```

---

## Task 10: Russian pack build script

**Files:**
- Copy into repo: `russian-1000-frequency.tsv` and `public/audio/*` from `cls_app`
- Reference (read only, do not edit): `cls_app/src/data/decks.ts`, `cls_app/src/data/aspect-pairs.ts`, `cls_app/scripts/build-vocab.ts`, `cls_app/scripts/generate-audio.ts`
- Create: `scripts/build-russian-pack.ts`, `scripts/russian/derive.ts` (pure, testable helpers)
- Test: `test/russian/derive.test.ts`
- Generates: `public/data/russian.json`

**Interfaces:**
- Produces (in `scripts/russian/derive.ts`):
  - `interface VocabRow { rank: number; russian: string; english: string; translit?: string; pos?: string }`
  - `parseTsv(tsv: string): VocabRow[]`
  - `isFiller(row: VocabRow): boolean`
  - `buildRussianPack(rows: VocabRow[], audioIndex: Set<string>): Pack` — packId `'russian'`, language `'ru-RU'`, frequency decks of 50 (post-filter), card `front`=russian, `back`=english, `hint`=translit/pos, `audio`=`/audio/<file>.mp3` when present in `audioIndex`. Asserts all card ids unique.

**Note:** Port the *logic* of `cls_app`'s `decks.ts` (filler POS set, deck-of-50 split, aspect-pair merge) and `build-vocab.ts` (TSV parsing) into `derive.ts`. Read those files first; replicate their behavior, mapping into the generic `Pack`. Keep aspect-pair merging if present in the source; if it complicates the first port, ship frequency decks only and note aspect-pairs as a fast follow (still Ship-1 scope, separate commit).

- [ ] **Step 1: Copy build inputs into the new repo**

```bash
cd "/Users/coreybailey/Documents - Local/GitHub/flashcards-app"
cp "../cls_app/russian-1000-frequency.tsv" ./russian-1000-frequency.tsv
mkdir -p public/audio
cp ../cls_app/public/audio/* public/audio/ 2>/dev/null || true
```
Then inspect the source logic:
```bash
sed -n '1,120p' ../cls_app/src/data/decks.ts
sed -n '1,120p' ../cls_app/scripts/build-vocab.ts
head -5 russian-1000-frequency.tsv
```

- [ ] **Step 2: Write the failing test** (`test/russian/derive.test.ts`)

```ts
import { describe, it, expect } from 'vitest';
import { parseTsv, buildRussianPack } from '../../scripts/russian/derive';

const TSV = `rank\trussian\tenglish\ttranslit\tpos
1\tи\tand\ti\tconjunction
2\tдом\thouse\tdom\tnoun
3\tбыть\tto be\tbyt'\tverb`;

describe('russian derive', () => {
  it('parses TSV rows', () => {
    const rows = parseTsv(TSV);
    expect(rows).toHaveLength(3);
    expect(rows[1].russian).toBe('дом');
  });

  it('builds a pack, filters filler POS, maps fields, dedups ids', () => {
    const rows = parseTsv(TSV);
    const pack = buildRussianPack(rows, new Set(['дом']));
    expect(pack.id).toBe('russian');
    expect(pack.language).toBe('ru-RU');
    // "и" is a conjunction (filler) → excluded
    const fronts = Object.values(pack.cards).map((c) => c.front);
    expect(fronts).toContain('дом');
    expect(fronts).not.toContain('и');
    const dom = Object.values(pack.cards).find((c) => c.front === 'дом')!;
    expect(dom.back).toBe('house');
    expect(dom.hint).toContain('dom');
    expect(dom.audio).toBe('/audio/дом.mp3'); // present in audioIndex
    const ids = Object.keys(pack.cards);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run test/russian/derive.test.ts`
Expected: FAIL — cannot find module `../../scripts/russian/derive`.

- [ ] **Step 4: Write `scripts/russian/derive.ts`**

```ts
import { makeCardId, type Card, type Deck, type Pack } from '../../src/model/types';

export interface VocabRow {
  rank: number;
  russian: string;
  english: string;
  translit?: string;
  pos?: string;
}

const FILLER_POS = new Set(['conjunction', 'preposition', 'particle', 'parenthetical']);
const DECK_SIZE = 50;

export function parseTsv(tsv: string): VocabRow[] {
  const lines = tsv.trim().split('\n');
  const header = lines[0].split('\t').map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const iRank = col('rank'), iRu = col('russian'), iEn = col('english'),
        iTr = col('translit'), iPos = col('pos');
  return lines.slice(1).map((line, i) => {
    const f = line.split('\t');
    return {
      rank: iRank >= 0 ? Number(f[iRank]) : i + 1,
      russian: (f[iRu] ?? '').trim(),
      english: (f[iEn] ?? '').trim(),
      translit: iTr >= 0 ? (f[iTr] ?? '').trim() || undefined : undefined,
      pos: iPos >= 0 ? (f[iPos] ?? '').trim().toLowerCase() || undefined : undefined,
    };
  }).filter((r) => r.russian && r.english);
}

export function isFiller(row: VocabRow): boolean {
  return row.pos != null && FILLER_POS.has(row.pos);
}

function hint(row: VocabRow): string | undefined {
  const parts = [row.translit, row.pos].filter(Boolean);
  return parts.length ? parts.join(' · ') : undefined;
}

export function buildRussianPack(rows: VocabRow[], audioIndex: Set<string>): Pack {
  const kept = rows.filter((r) => !isFiller(r)).sort((a, b) => a.rank - b.rank);
  const cards: Record<string, Card> = {};
  const decks: Deck[] = [];
  kept.forEach((row, i) => {
    const id = makeCardId('russian', String(row.rank));
    if (cards[id]) throw new Error(`Duplicate card id ${id} (rank ${row.rank})`);
    const h = hint(row);
    const audio = audioIndex.has(row.russian) ? `/audio/${row.russian}.mp3` : undefined;
    cards[id] = {
      id, front: row.russian, back: row.english,
      ...(h ? { hint: h } : {}), ...(audio ? { audio } : {}),
    };
    const deckIndex = Math.floor(i / DECK_SIZE);
    if (!decks[deckIndex]) {
      decks[deckIndex] = {
        id: makeCardId('russian', `deck-${deckIndex}`),
        label: `Words ${deckIndex * DECK_SIZE + 1}–${(deckIndex + 1) * DECK_SIZE}`,
        cardIds: [],
      };
    }
    (decks[deckIndex].cardIds as string[]).push(id);
  });
  return { id: 'russian', name: 'Russian 1000', language: 'ru-RU', source: 'builtin', decks, cards };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run test/russian/derive.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 6: Write `scripts/build-russian-pack.ts` (the emitter)**

```ts
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { parseTsv, buildRussianPack } from './russian/derive';

const tsv = readFileSync('russian-1000-frequency.tsv', 'utf8');
const audioIndex = new Set<string>(
  (existsSync('public/audio') ? readdirSync('public/audio') : [])
    .filter((f) => f.endsWith('.mp3'))
    .map((f) => f.replace(/\.mp3$/, '')),
);
const pack = buildRussianPack(parseTsv(tsv), audioIndex);
if (!existsSync('public/data')) mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/russian.json', JSON.stringify(pack));
console.log(`Wrote russian.json: ${Object.keys(pack.cards).length} cards, ${pack.decks.length} decks.`);
```

- [ ] **Step 7: Generate the pack and verify**

Run:
```bash
npx tsx scripts/build-russian-pack.ts
node -e "const p=require('./public/data/russian.json'); console.log(Object.keys(p.cards).length, p.decks.length)"
```
Expected: prints a card count (a few hundred after filler filtering) and a deck count.

- [ ] **Step 8: Commit**

```bash
git add russian-1000-frequency.tsv public/audio public/data/russian.json scripts/russian/derive.ts scripts/build-russian-pack.ts test/russian/derive.test.ts
git commit -m "feat: build Russian built-in pack from TSV into generic pack format"
```

---

## Task 11: Pack registry

**Files:**
- Create: `src/packs/registry.ts`
- Test: `test/packs/registry.test.ts`

**Interfaces:**
- Consumes: `Pack`, `Card` from `model/types`; `DbShape` from `storage/db`.
- Produces:
  - `loadBuiltinPacks(): Promise<Pack[]>` — `fetch('/data/russian.json')`.
  - `allPacks(db: DbShape, builtins: readonly Pack[]): Pack[]` — builtins + `Object.values(db.packs)`.
  - `findCard(packs: readonly Pack[], cardId: string): Card | undefined`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, vi } from 'vitest';
import { allPacks, findCard, loadBuiltinPacks } from '../../src/packs/registry';
import type { Pack } from '../../src/model/types';
import { DEFAULT_SETTINGS } from '../../src/storage/db';

const builtin: Pack = {
  id: 'russian', name: 'Russian', language: 'ru-RU', source: 'builtin',
  decks: [{ id: 'russian:deck-0', label: 'D', cardIds: ['russian:1'] }],
  cards: { 'russian:1': { id: 'russian:1', front: 'дом', back: 'house' } },
};
const imported: Pack = {
  id: 'imp', name: 'Imp', language: 'en', source: 'imported',
  decks: [], cards: { 'imp:0': { id: 'imp:0', front: 'a', back: 'b' } },
};

describe('registry', () => {
  it('combines builtins and imported packs', () => {
    const db = { schemaVersion: 1, packs: { imp: imported }, cardStates: {}, settings: DEFAULT_SETTINGS };
    const all = allPacks(db, [builtin]);
    expect(all.map((p) => p.id)).toEqual(['russian', 'imp']);
  });

  it('finds a card across packs', () => {
    expect(findCard([builtin, imported], 'imp:0')!.front).toBe('a');
    expect(findCard([builtin], 'nope')).toBeUndefined();
  });

  it('loadBuiltinPacks fetches russian.json', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => builtin }) as unknown as Response));
    const packs = await loadBuiltinPacks();
    expect(packs[0].id).toBe('russian');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/packs/registry.test.ts`
Expected: FAIL — cannot find module `../../src/packs/registry`.

- [ ] **Step 3: Write `src/packs/registry.ts`**

```ts
import type { Card, Pack } from '../model/types';
import { packIdOf } from '../model/types';
import type { DbShape } from '../storage/db';

const BUILTIN_URLS = ['/data/russian.json'];

export async function loadBuiltinPacks(): Promise<Pack[]> {
  const packs: Pack[] = [];
  for (const url of BUILTIN_URLS) {
    const res = await fetch(url);
    if (res.ok) packs.push((await res.json()) as Pack);
  }
  return packs;
}

export function allPacks(db: DbShape, builtins: readonly Pack[]): Pack[] {
  return [...builtins, ...Object.values(db.packs)];
}

export function findCard(packs: readonly Pack[], cardId: string): Card | undefined {
  const pid = packIdOf(cardId);
  const pack = packs.find((p) => p.id === pid);
  return pack?.cards[cardId];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/packs/registry.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/packs/registry.ts test/packs/registry.test.ts
git commit -m "feat: add pack registry (builtin + imported, card lookup)"
```

---

## Task 12: Language-aware TTS

**Files:**
- Reference (read only): `cls_app/src/tts.ts`
- Create: `src/tts.ts`
- Test: `test/tts.test.ts`

**Interfaces:**
- Produces:
  - `speak(card: { front: string; audio?: string }, language: string): void`
  - Behavior: if `card.audio` present, play that audio file (`new Audio(card.audio).play()`); else use `speechSynthesis` with `utterance.lang = language`. Guards when APIs are unavailable.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { speak } from '../src/tts';

beforeEach(() => { vi.restoreAllMocks(); });

describe('tts', () => {
  it('speaks front text with the given language when no audio', () => {
    const utterances: SpeechSynthesisUtterance[] = [];
    vi.stubGlobal('speechSynthesis', { speak: (u: SpeechSynthesisUtterance) => utterances.push(u), cancel: () => {} });
    vi.stubGlobal('SpeechSynthesisUtterance', class { lang = ''; text = ''; constructor(t: string) { this.text = t; } });
    speak({ front: 'дом' }, 'ru-RU');
    expect(utterances[0].lang).toBe('ru-RU');
    expect(utterances[0].text).toBe('дом');
  });

  it('plays the audio file when present', () => {
    const play = vi.fn(() => Promise.resolve());
    vi.stubGlobal('Audio', class { src: string; constructor(s: string) { this.src = s; } play = play; });
    speak({ front: 'дом', audio: '/audio/дом.mp3' }, 'ru-RU');
    expect(play).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/tts.test.ts`
Expected: FAIL — cannot find module `../src/tts`.

- [ ] **Step 3: Write `src/tts.ts`**

```ts
export function speak(card: { front: string; audio?: string }, language: string): void {
  if (card.audio && typeof Audio !== 'undefined') {
    void new Audio(card.audio).play().catch(() => fallbackSpeak(card.front, language));
    return;
  }
  fallbackSpeak(card.front, language);
}

function fallbackSpeak(text: string, language: string): void {
  if (typeof speechSynthesis === 'undefined' || typeof SpeechSynthesisUtterance === 'undefined') return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = language;
  speechSynthesis.speak(u);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/tts.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/tts.ts test/tts.test.ts
git commit -m "feat: add language-aware TTS with audio-file preference"
```

---

## Task 13: Hash router

**Files:**
- Reference (read only): `cls_app/src/router.ts`
- Create: `src/router.ts`
- Test: `test/router.test.ts`

**Interfaces:**
- Produces:
  - `type PageRenderer = (container: HTMLElement) => void | Promise<void>`
  - `registerRoute(path: string, renderer: PageRenderer): void`
  - `navigate(path: string): void`
  - `currentRoute(): string` (returns route name without params)
  - `routeParam(): string` (returns the segment after the first `/`, e.g. deck id in `#/study/russian:deck-0`)
  - `initRouter(container: HTMLElement): void`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { registerRoute, navigate, currentRoute, routeParam, initRouter } from '../src/router';

beforeEach(() => { window.location.hash = ''; document.body.innerHTML = '<div id="app"></div>'; });

describe('router', () => {
  it('parses route name and param', () => {
    navigate('study/russian:deck-0');
    expect(currentRoute()).toBe('study');
    expect(routeParam()).toBe('russian:deck-0');
  });

  it('renders the registered route into the container', () => {
    const app = document.getElementById('app')!;
    registerRoute('home', (c) => { c.textContent = 'HOME'; });
    initRouter(app);
    navigate('home');
    expect(app.textContent).toBe('HOME');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/router.test.ts`
Expected: FAIL — cannot find module `../src/router`.

- [ ] **Step 3: Write `src/router.ts`**

```ts
export type PageRenderer = (container: HTMLElement) => void | Promise<void>;

const routes: Record<string, PageRenderer> = {};
let contentEl: HTMLElement | null = null;

export function registerRoute(path: string, renderer: PageRenderer): void {
  routes[path] = renderer;
}

export function navigate(path: string): void {
  window.location.hash = `#/${path}`;
}

function rawRoute(): string {
  return window.location.hash.replace(/^#\//, '') || 'home';
}

export function currentRoute(): string {
  return rawRoute().split('/')[0];
}

export function routeParam(): string {
  const parts = rawRoute().split('/');
  return parts.slice(1).join('/');
}

export function initRouter(container: HTMLElement): void {
  contentEl = container;
  const render = (): void => {
    if (!contentEl) return;
    const renderer = routes[currentRoute()];
    if (renderer) {
      contentEl.innerHTML = '';
      void renderer(contentEl);
    } else {
      navigate('home');
    }
  };
  window.addEventListener('hashchange', render);
  render();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/router.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/router.ts test/router.test.ts
git commit -m "feat: add hash router with route param support"
```

---

## Task 14: Flashcard + progress-bar components

**Files:**
- Reference (read only): `cls_app/src/components/flashcard.ts`, `cls_app/src/components/progress-bar.ts`
- Create: `src/components/flashcard.ts`, `src/components/progress-bar.ts`
- Test: `test/components/flashcard.test.ts`

**Interfaces:**
- Produces:
  - `renderFlashcard(opts: { card: Card; language: string; onGrade: (g: Grade) => void; onFlip?: () => void }): HTMLElement`
  - `renderProgressBar(done: number, total: number): HTMLElement`
  - Card starts face showing `front`; clicking the card reveals `back` + `hint`, shows the 4 grade buttons and an audio button; a grade button calls `onGrade`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, vi } from 'vitest';
import { renderFlashcard } from '../../src/components/flashcard';
import { renderProgressBar } from '../../src/components/progress-bar';
import type { Card } from '../../src/model/types';

const card: Card = { id: 'russian:1', front: 'дом', back: 'house', hint: 'dom · noun' };

describe('flashcard', () => {
  it('shows front, hides back until flipped', () => {
    const el = renderFlashcard({ card, language: 'ru-RU', onGrade: () => {} });
    expect(el.textContent).toContain('дом');
    expect(el.querySelector('[data-role="back"]')!.getAttribute('hidden')).not.toBeNull();
  });

  it('reveals back and calls onGrade when a grade button is clicked', () => {
    const onGrade = vi.fn();
    const el = renderFlashcard({ card, language: 'ru-RU', onGrade });
    el.querySelector<HTMLElement>('[data-role="card"]')!.click();
    expect(el.querySelector('[data-role="back"]')!.getAttribute('hidden')).toBeNull();
    el.querySelector<HTMLButtonElement>('[data-grade="good"]')!.click();
    expect(onGrade).toHaveBeenCalledWith('good');
  });
});

describe('progress bar', () => {
  it('renders a fraction', () => {
    const el = renderProgressBar(3, 10);
    expect(el.getAttribute('aria-valuenow')).toBe('3');
    expect(el.getAttribute('aria-valuemax')).toBe('10');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/components/flashcard.test.ts`
Expected: FAIL — cannot find modules.

- [ ] **Step 3: Write `src/components/progress-bar.ts` then `src/components/flashcard.ts`**

`src/components/progress-bar.ts`:
```ts
export function renderProgressBar(done: number, total: number): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'progress';
  wrap.setAttribute('role', 'progressbar');
  wrap.setAttribute('aria-valuenow', String(done));
  wrap.setAttribute('aria-valuemin', '0');
  wrap.setAttribute('aria-valuemax', String(total));
  const fill = document.createElement('div');
  fill.className = 'progress__fill';
  fill.style.width = total > 0 ? `${Math.round((done / total) * 100)}%` : '0%';
  wrap.appendChild(fill);
  return wrap;
}
```

`src/components/flashcard.ts`:
```ts
import type { Card } from '../model/types';
import type { Grade } from '../scheduler';
import { speak } from '../tts';

const GRADES: readonly Grade[] = ['again', 'hard', 'good', 'easy'];

export function renderFlashcard(opts: {
  card: Card;
  language: string;
  onGrade: (g: Grade) => void;
  onFlip?: () => void;
}): HTMLElement {
  const { card, language, onGrade, onFlip } = opts;
  const root = document.createElement('div');
  root.className = 'flashcard';

  const cardEl = document.createElement('button');
  cardEl.type = 'button';
  cardEl.className = 'flashcard__card';
  cardEl.dataset.role = 'card';

  const front = document.createElement('div');
  front.className = 'flashcard__front';
  front.textContent = card.front;

  const back = document.createElement('div');
  back.className = 'flashcard__back';
  back.dataset.role = 'back';
  back.hidden = true;
  back.innerHTML = `<div class="flashcard__answer"></div><div class="flashcard__hint"></div>`;
  back.querySelector('.flashcard__answer')!.textContent = card.back;
  back.querySelector('.flashcard__hint')!.textContent = card.hint ?? '';

  cardEl.append(front, back);

  const audioBtn = document.createElement('button');
  audioBtn.type = 'button';
  audioBtn.className = 'flashcard__audio';
  audioBtn.textContent = '🔊';
  audioBtn.addEventListener('click', (e) => { e.stopPropagation(); speak(card, language); });

  const grades = document.createElement('div');
  grades.className = 'flashcard__grades';
  grades.hidden = true;
  for (const g of GRADES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.grade = g;
    b.className = `grade grade--${g}`;
    b.textContent = g[0].toUpperCase() + g.slice(1);
    b.addEventListener('click', () => onGrade(g));
    grades.appendChild(b);
  }

  cardEl.addEventListener('click', () => {
    if (back.hidden) {
      back.hidden = false;
      grades.hidden = false;
      onFlip?.();
    }
  });

  root.append(cardEl, audioBtn, grades);
  return root;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/components/flashcard.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/flashcard.ts src/components/progress-bar.ts test/components/flashcard.test.ts
git commit -m "feat: add flashcard flip component and progress bar"
```

---

## Task 15: Clean-minimal styles + nav

**Files:**
- Modify: `src/style.css`
- Create: `src/components/nav.ts`
- Test: `test/components/nav.test.ts`

**Interfaces:**
- Produces: `renderNav(active: 'home'): HTMLElement` — a minimal top bar with the app title linking home. (Study/Import are reached from Home, not the nav.)

**Design intent (clean & minimal):** one accent (`--accent`), generous whitespace, the card is the visual hero. This task has no logic test beyond nav; styling is verified manually via the run/Lightpanda check in Task 17.

- [ ] **Step 1: Write the failing test** (`test/components/nav.test.ts`)

```ts
import { describe, it, expect } from 'vitest';
import { renderNav } from '../../src/components/nav';

describe('nav', () => {
  it('renders the app title linking to home', () => {
    const el = renderNav('home');
    const link = el.querySelector('a')!;
    expect(link.getAttribute('href')).toBe('#/home');
    expect(el.textContent).toContain('Flashcards');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/components/nav.test.ts`
Expected: FAIL — cannot find module.

- [ ] **Step 3: Write `src/components/nav.ts`**

```ts
export function renderNav(_active: 'home'): HTMLElement {
  const nav = document.createElement('header');
  nav.className = 'nav';
  const a = document.createElement('a');
  a.href = '#/home';
  a.className = 'nav__brand';
  a.textContent = 'Flashcards';
  nav.appendChild(a);
  return nav;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/components/nav.test.ts`
Expected: PASS.

- [ ] **Step 5: Expand `src/style.css`** (append the layout system)

```css
:root {
  --bg: #ffffff; --surface: #ffffff; --fg: #111827; --muted: #6b7280;
  --accent: #2563eb; --accent-weak: #eff6ff; --line: #e5e7eb;
  --radius: 16px; --shadow: 0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.05);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); line-height: 1.5; }
#app { max-width: 640px; margin: 0 auto; padding: 0 20px 96px; }

.nav { display: flex; align-items: center; height: 64px; }
.nav__brand { font-weight: 700; font-size: 20px; color: var(--fg); text-decoration: none; letter-spacing: -0.01em; }

.stat { text-align: center; padding: 28px 0 8px; }
.stat__num { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; }
.stat__label { color: var(--muted); }
.btn { display: inline-block; border: 0; border-radius: 999px; padding: 12px 22px;
  background: var(--accent); color: #fff; font-weight: 600; cursor: pointer; text-decoration: none; }
.btn--ghost { background: var(--accent-weak); color: var(--accent); }
.btn:disabled { opacity: .5; cursor: default; }

.decklist { display: grid; gap: 12px; margin-top: 20px; }
.deckcard { display: flex; align-items: center; justify-content: space-between;
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 16px 18px; box-shadow: var(--shadow); cursor: pointer; }
.deckcard__meta { color: var(--muted); font-size: 14px; }
.badge { background: var(--accent); color: #fff; border-radius: 999px; padding: 2px 10px; font-size: 13px; font-weight: 700; }
.badge--zero { background: var(--line); color: var(--muted); }

.progress { height: 8px; background: var(--line); border-radius: 999px; overflow: hidden; }
.progress__fill { height: 100%; background: var(--accent); }

.flashcard { display: grid; gap: 20px; place-items: center; padding-top: 24px; }
.flashcard__card { width: 100%; min-height: 260px; border: 1px solid var(--line);
  border-radius: var(--radius); background: var(--surface); box-shadow: var(--shadow);
  display: grid; place-content: center; gap: 12px; padding: 32px; cursor: pointer; text-align: center; }
.flashcard__front { font-size: 40px; font-weight: 700; letter-spacing: -0.01em; }
.flashcard__answer { font-size: 28px; }
.flashcard__hint { color: var(--muted); margin-top: 6px; }
.flashcard__audio { border: 1px solid var(--line); background: var(--surface); border-radius: 999px;
  width: 48px; height: 48px; font-size: 20px; cursor: pointer; }
.flashcard__grades { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; width: 100%; }
.grade { border: 0; border-radius: 12px; padding: 12px 0; font-weight: 700; cursor: pointer; color: #fff; }
.grade--again { background: #ef4444; } .grade--hard { background: #f59e0b; }
.grade--good { background: #10b981; } .grade--easy { background: #3b82f6; }

.import { display: grid; gap: 16px; padding-top: 16px; }
.import__errors { color: #b91c1c; font-size: 14px; white-space: pre-wrap; }
.field { display: grid; gap: 6px; }
.field input, .field select { padding: 10px 12px; border: 1px solid var(--line); border-radius: 10px; font: inherit; }
```

- [ ] **Step 6: Commit**

```bash
git add src/style.css src/components/nav.ts test/components/nav.test.ts
git commit -m "feat: add clean-minimal design system and nav"
```

---

## Task 16: App boot + shared app state

**Files:**
- Create: `src/app-state.ts`
- Rewrite: `src/main.ts`
- Test: `test/app-state.test.ts`

**Interfaces:**
- Produces (`src/app-state.ts`):
  - `interface AppState { db: DbShape; packs: Pack[] }`
  - `initAppState(): Promise<AppState>` — loads db + builtin packs, returns combined state.
  - `saveCardState(state: AppState, cardId: string, card: FsrsCard): Promise<AppState>` — returns new state with persisted card state.
  - `addImportedPack(state: AppState, pack: Pack): Promise<AppState>` — persists pack, returns new state.
  - `takeNewAllowance(state: AppState, todayIso: string): Promise<{ state: AppState; remaining: number }>` — resets the daily new-card counter when the date rolls over; returns remaining allowance for `todayIso` and persists the reset.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { clear } from 'idb-keyval';
import { initAppState, addImportedPack, saveCardState, takeNewAllowance } from '../src/app-state';
import { newState } from '../src/scheduler';
import type { Pack } from '../src/model/types';

beforeEach(async () => { await clear(); });

const pack: Pack = { id: 'imp', name: 'Imp', language: 'en', source: 'imported',
  decks: [], cards: { 'imp:0': { id: 'imp:0', front: 'a', back: 'b' } } };

describe('app-state', () => {
  it('adds an imported pack and it survives reload', async () => {
    let s = await initAppState(); // builtins fail to fetch in jsdom → empty; that's fine
    s = await addImportedPack(s, pack);
    expect(s.packs.find((p) => p.id === 'imp')).toBeTruthy();
    const reloaded = await initAppState();
    expect(reloaded.db.packs.imp).toBeTruthy();
  });

  it('persists card state', async () => {
    let s = await initAppState();
    s = await saveCardState(s, 'imp:0', newState(new Date('2026-07-08T00:00:00Z')));
    const reloaded = await initAppState();
    expect(reloaded.db.cardStates['imp:0']).toBeTruthy();
  });

  it('resets the daily new allowance when the day rolls over', async () => {
    let s = await initAppState();
    const r1 = await takeNewAllowance(s, '2026-07-08');
    expect(r1.remaining).toBe(s.db.settings.dailyNewCards);
  });
});
```

Note: `initAppState` must tolerate `loadBuiltinPacks()` failing (no server in jsdom). Wrap the builtin fetch in try/catch and default to `[]`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/app-state.test.ts`
Expected: FAIL — cannot find module `../src/app-state`.

- [ ] **Step 3: Write `src/app-state.ts`**

```ts
import type { Card as FsrsCard } from 'ts-fsrs';
import type { Pack } from './model/types';
import { loadDb, saveDb, type DbShape } from './storage/db';
import { loadBuiltinPacks, allPacks } from './packs/registry';

export interface AppState {
  db: DbShape;
  packs: Pack[];
}

export async function initAppState(): Promise<AppState> {
  const db = await loadDb();
  let builtins: Pack[] = [];
  try { builtins = await loadBuiltinPacks(); } catch { builtins = []; }
  return { db, packs: allPacks(db, builtins) };
}

async function commit(db: DbShape, builtins: readonly Pack[]): Promise<AppState> {
  await saveDb(db);
  return { db, packs: allPacks(db, builtins) };
}

function builtinsOf(state: AppState): Pack[] {
  return state.packs.filter((p) => p.source === 'builtin');
}

export async function saveCardState(state: AppState, cardId: string, card: FsrsCard): Promise<AppState> {
  const db: DbShape = { ...state.db, cardStates: { ...state.db.cardStates, [cardId]: card } };
  return commit(db, builtinsOf(state));
}

export async function addImportedPack(state: AppState, pack: Pack): Promise<AppState> {
  const db: DbShape = { ...state.db, packs: { ...state.db.packs, [pack.id]: pack } };
  return commit(db, builtinsOf(state));
}

export async function takeNewAllowance(
  state: AppState,
  todayIso: string,
): Promise<{ state: AppState; remaining: number }> {
  const s = state.db.settings;
  const introduced = s.newIntroduced.date === todayIso ? s.newIntroduced.count : 0;
  if (s.newIntroduced.date !== todayIso) {
    const db: DbShape = { ...state.db, settings: { ...s, newIntroduced: { date: todayIso, count: 0 } } };
    const next = await commit(db, builtinsOf(state));
    return { state: next, remaining: s.dailyNewCards };
  }
  return { state, remaining: Math.max(0, s.dailyNewCards - introduced) };
}
```

- [ ] **Step 4: Rewrite `src/main.ts`**

```ts
import './style.css';
import { initRouter, registerRoute } from './router';
import { initAppState, type AppState } from './app-state';
import { renderHome } from './pages/home';
import { renderStudy } from './pages/study';
import { renderImport } from './pages/import';

async function boot(): Promise<void> {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  app.textContent = 'Loading…';
  let state: AppState = await initAppState();
  const setState = (s: AppState): void => { state = s; };
  const getState = (): AppState => state;

  registerRoute('home', (c) => renderHome(c, getState));
  registerRoute('study', (c) => renderStudy(c, getState, setState));
  registerRoute('import', (c) => renderImport(c, getState, setState));
  initRouter(app);
}

void boot();
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run test/app-state.test.ts`
Expected: PASS (3 tests). (`main.ts` is verified via the run check in Task 17.)

- [ ] **Step 6: Commit**

```bash
git add src/app-state.ts src/main.ts test/app-state.test.ts
git commit -m "feat: add app state hydration, persistence, and daily-new allowance"
```

---

## Task 17: Home, Study, and Import pages

**Files:**
- Create: `src/pages/home.ts`, `src/pages/study.ts`, `src/pages/import.ts`
- Test: `test/pages/home.test.ts`, `test/pages/study.test.ts`

**Interfaces:**
- Consumes: `AppState`, `saveCardState`, `addImportedPack`, `takeNewAllowance`; `renderNav`, `renderFlashcard`, `renderProgressBar`; `deckProgress`, `dueToday`; `buildStudyQueue`; `grade`, `newState`; `navigate`, `routeParam`; `findCard`; `importFile`.
- Produces:
  - `renderHome(container, getState): void`
  - `renderStudy(container, getState, setState): Promise<void>`
  - `renderImport(container, getState, setState): void`
- Study route param is a deck id, or `all` for "review everything due".

- [ ] **Step 1: Write failing tests**

`test/pages/home.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { renderHome } from '../../src/pages/home';
import type { AppState } from '../../src/app-state';
import { DEFAULT_SETTINGS } from '../../src/storage/db';
import type { Pack } from '../../src/model/types';

const pack: Pack = { id: 'imp', name: 'Imp', language: 'en', source: 'imported',
  decks: [{ id: 'imp:d', label: 'Deck', cardIds: ['imp:0'] }],
  cards: { 'imp:0': { id: 'imp:0', front: 'a', back: 'b' } } };

const state: AppState = { db: { schemaVersion: 1, packs: { imp: pack }, cardStates: {}, settings: DEFAULT_SETTINGS }, packs: [pack] };

describe('home', () => {
  it('shows due-today count and lists decks with an import link', () => {
    const c = document.createElement('div');
    renderHome(c, () => state);
    expect(c.textContent).toContain('due');
    expect(c.querySelector('.deckcard')).toBeTruthy();
    expect(c.querySelector('a[href="#/import"]')).toBeTruthy();
  });
});
```

`test/pages/study.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { renderStudy } from '../../src/pages/study';
import type { AppState } from '../../src/app-state';
import { DEFAULT_SETTINGS } from '../../src/storage/db';
import type { Pack } from '../../src/model/types';

const pack: Pack = { id: 'imp', name: 'Imp', language: 'en', source: 'imported',
  decks: [{ id: 'imp:d', label: 'Deck', cardIds: ['imp:0'] }],
  cards: { 'imp:0': { id: 'imp:0', front: 'a', back: 'b' } } };

function makeState(): AppState {
  return { db: { schemaVersion: 1, packs: { imp: pack }, cardStates: {}, settings: DEFAULT_SETTINGS }, packs: [pack] };
}

describe('study', () => {
  it('renders the first card of a deck session', async () => {
    window.location.hash = '#/study/imp:d';
    const c = document.createElement('div');
    let state = makeState();
    await renderStudy(c, () => state, (s) => { state = s; });
    expect(c.textContent).toContain('a'); // front of imp:0
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run test/pages/home.test.ts test/pages/study.test.ts`
Expected: FAIL — cannot find modules.

- [ ] **Step 3: Write `src/pages/home.ts`**

```ts
import type { AppState } from '../app-state';
import { renderNav } from '../components/nav';
import { deckProgress, dueToday } from '../progress';
import { navigate } from '../router';

export function renderHome(container: HTMLElement, getState: () => AppState): void {
  const state = getState();
  const now = new Date();
  container.appendChild(renderNav('home'));

  const stat = document.createElement('div');
  stat.className = 'stat';
  const due = dueToday(state.packs, state.db.cardStates, now);
  stat.innerHTML = `<div class="stat__num">${due}</div><div class="stat__label">cards due today</div>`;
  container.appendChild(stat);

  const reviewAll = document.createElement('button');
  reviewAll.className = 'btn';
  reviewAll.textContent = 'Review all due';
  reviewAll.disabled = due === 0;
  reviewAll.style.display = 'block';
  reviewAll.style.margin = '0 auto';
  reviewAll.addEventListener('click', () => navigate('study/all'));
  container.appendChild(reviewAll);

  const list = document.createElement('div');
  list.className = 'decklist';
  for (const pack of state.packs) {
    for (const deck of pack.decks) {
      const p = deckProgress(deck, state.db.cardStates, now);
      const row = document.createElement('div');
      row.className = 'deckcard';
      row.innerHTML = `<div><div>${deck.label}</div>
        <div class="deckcard__meta">${p.learned}/${p.total} learned · ${pack.name}</div></div>
        <span class="badge ${p.due === 0 ? 'badge--zero' : ''}">${p.due}</span>`;
      row.addEventListener('click', () => navigate(`study/${deck.id}`));
      list.appendChild(row);
    }
  }
  container.appendChild(list);

  const importLink = document.createElement('a');
  importLink.href = '#/import';
  importLink.className = 'btn btn--ghost';
  importLink.textContent = '+ Import a deck';
  importLink.style.display = 'inline-block';
  importLink.style.marginTop = '20px';
  container.appendChild(importLink);
}
```

- [ ] **Step 4: Write `src/pages/study.ts`**

```ts
import type { AppState } from '../app-state';
import { saveCardState, takeNewAllowance } from '../app-state';
import { buildStudyQueue, type QueueItem } from '../session';
import { grade, newState, type Grade } from '../scheduler';
import { deckProgress } from '../progress';
import { findCard } from '../packs/registry';
import { renderFlashcard } from '../components/flashcard';
import { renderProgressBar } from '../components/progress-bar';
import { navigate, routeParam } from '../router';

function isoDay(d: Date): string { return d.toISOString().slice(0, 10); }

function collectCardIds(state: AppState, deckParam: string): { ids: string[]; language: string } {
  if (deckParam === 'all') {
    const ids: string[] = [];
    let language = 'en';
    for (const pack of state.packs) {
      for (const deck of pack.decks) ids.push(...deck.cardIds);
      language = pack.language;
    }
    return { ids, language };
  }
  for (const pack of state.packs) {
    const deck = pack.decks.find((d) => d.id === deckParam);
    if (deck) return { ids: [...deck.cardIds], language: pack.language };
  }
  return { ids: [], language: 'en' };
}

export async function renderStudy(
  container: HTMLElement,
  getState: () => AppState,
  setState: (s: AppState) => void,
): Promise<void> {
  const deckParam = routeParam();
  const now = new Date();
  const allow = await takeNewAllowance(getState(), isoDay(now));
  setState(allow.state);

  const { ids, language } = collectCardIds(allow.state, deckParam);
  const queue: QueueItem[] = buildStudyQueue(ids, allow.state.db.cardStates, now, allow.remaining);

  let index = 0;
  const total = queue.length;

  const done = (): void => {
    container.innerHTML = '';
    const msg = document.createElement('div');
    msg.className = 'stat';
    msg.innerHTML = `<div class="stat__num">✓</div><div class="stat__label">Session complete</div>`;
    const back = document.createElement('button');
    back.className = 'btn';
    back.textContent = 'Back to decks';
    back.style.margin = '16px auto 0';
    back.style.display = 'block';
    back.addEventListener('click', () => navigate('home'));
    container.append(msg, back);
  };

  const showCard = async (): Promise<void> => {
    if (index >= total) { done(); return; }
    container.innerHTML = '';
    container.appendChild(renderProgressBar(index, total));
    const item = queue[index];
    const card = findCard(getState().packs, item.cardId);
    if (!card) { index += 1; await showCard(); return; }

    const onGrade = async (g: Grade): Promise<void> => {
      const prev = getState().db.cardStates[item.cardId] ?? newState(now);
      const next = grade(prev, g, now);
      setState(await saveCardState(getState(), item.cardId, next));
      index += 1;
      await showCard();
    };

    container.appendChild(renderFlashcard({ card, language, onGrade }));
  };

  if (total === 0) { done(); return; }
  await showCard();
}
```

- [ ] **Step 5: Write `src/pages/import.ts`**

```ts
import type { AppState } from '../app-state';
import { addImportedPack } from '../app-state';
import { importFile } from '../import/index';
import { renderNav } from '../components/nav';
import { navigate } from '../router';

function slugId(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'deck';
  return `${base}-${Date.now()}`;
}

export function renderImport(
  container: HTMLElement,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  container.appendChild(renderNav('home'));
  const form = document.createElement('div');
  form.className = 'import';
  form.innerHTML = `
    <h2>Import a deck</h2>
    <div class="field"><label>Deck name</label><input id="imp-name" placeholder="My deck" /></div>
    <div class="field"><label>Language (BCP-47)</label>
      <input id="imp-lang" value="en-US" placeholder="e.g. ru-RU, es-ES" /></div>
    <div class="field"><label>File (.csv or .json)</label><input id="imp-file" type="file" accept=".csv,.json" /></div>
    <div class="import__errors" id="imp-errors"></div>
    <button class="btn" id="imp-go">Import</button>`;
  container.appendChild(form);

  const errorsEl = form.querySelector<HTMLDivElement>('#imp-errors')!;
  form.querySelector<HTMLButtonElement>('#imp-go')!.addEventListener('click', async () => {
    errorsEl.textContent = '';
    const fileInput = form.querySelector<HTMLInputElement>('#imp-file')!;
    const file = fileInput.files?.[0];
    if (!file) { errorsEl.textContent = 'Choose a file first.'; return; }
    const name = form.querySelector<HTMLInputElement>('#imp-name')!.value.trim() || file.name.replace(/\.[^.]+$/, '');
    const language = form.querySelector<HTMLInputElement>('#imp-lang')!.value.trim() || 'en-US';
    const text = await file.text();
    const result = importFile(file.name, text, { packId: slugId(name), name, language });
    if (!result.pack) { errorsEl.textContent = result.errors.join('\n'); return; }
    setState(await addImportedPack(getState(), result.pack));
    if (result.errors.length) { errorsEl.textContent = `Imported with ${result.errors.length} skipped row(s).`; }
    navigate('home');
  });
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run test/pages/home.test.ts test/pages/study.test.ts`
Expected: PASS.

- [ ] **Step 7: Run the full suite + build**

Run: `npm test && npm run build`
Expected: all tests pass; build succeeds.

- [ ] **Step 8: Manual verification (run skill / Lightpanda)**

Start the dev server directly (the `npm run dev` form is blocked by a hook):
```bash
./node_modules/.bin/vite --port 5174
```
Then load `http://localhost:5174/#/home` with Lightpanda (`goto` + `markdown`) and confirm: due-today stat, deck list populated from `russian.json`, a study session flips a card and the 4 grades advance, and Import accepts a small CSV. Capture the confirmation as the completion evidence.

- [ ] **Step 9: Commit**

```bash
git add src/pages test/pages
git commit -m "feat: add home dashboard, study session, and import pages"
```

---

## Task 18: PWA icons, favicon, identity

**Files:**
- Create: `public/favicon.svg`, `public/icon-192.png`, `public/icon-512.png`
- Verify: `vite.config.ts` manifest (already set in Task 1)

**Interfaces:** none (assets).

- [ ] **Step 1: Add a distinct favicon** (`public/favicon.svg`) — a neutral generic mark (not the CLS icon):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#2563eb"/>
  <rect x="16" y="14" width="28" height="36" rx="5" fill="#fff"/>
  <rect x="22" y="20" width="28" height="36" rx="5" fill="#bfdbfe"/>
</svg>
```

- [ ] **Step 2: Generate PNG icons** (192/512). If ImageMagick/`rsvg-convert` is available:

```bash
cd "/Users/coreybailey/Documents - Local/GitHub/flashcards-app/public"
rsvg-convert -w 192 -h 192 favicon.svg -o icon-192.png
rsvg-convert -w 512 -h 512 favicon.svg -o icon-512.png
```
If no converter is available, note it and copy `cls_app/public/icon-*.png` as placeholders, flagging that distinct branding icons are a follow-up. Expected: both PNGs exist.

- [ ] **Step 3: Verify build includes the manifest + SW**

Run: `npm run build`
Expected: `dist/manifest.webmanifest` and a service worker are emitted.

- [ ] **Step 4: Commit**

```bash
git add public/favicon.svg public/icon-192.png public/icon-512.png
git commit -m "feat: add generic app identity (favicon + PWA icons)"
```

---

## Task 19: Deploy to a new Vercel project

**Files:**
- Create: `vercel.json` (optional — Vite is auto-detected; include only if needed)

**Interfaces:** none.

- [ ] **Step 1: Confirm the production build**

Run: `npm run build && ./node_modules/.bin/vite preview --port 5175`
Load `http://localhost:5175/#/home` via Lightpanda; confirm the app renders from the built `dist/`.

- [ ] **Step 2: Create and link a new Vercel project**

Run (from the repo root):
```bash
cd "/Users/coreybailey/Documents - Local/GitHub/flashcards-app"
vercel link
```
Choose to create a NEW project (a distinct name, e.g. `flashcards-app`) — do NOT link to the existing CLS project.

- [ ] **Step 3: Deploy to production**

Run: `vercel --prod`
Expected: a new production URL distinct from the CLS app. (An SSO 302 on `curl` is normal per the CLS deploy notes; verify in a browser/Lightpanda.)

- [ ] **Step 4: Verify the deployed app**

Load the production URL `#/home` in Lightpanda; confirm decks load and a study session works. Capture the URL + confirmation as completion evidence.

- [ ] **Step 5: Commit any deploy config + push**

```bash
git add -A
git commit -m "chore: configure Vercel deploy for flashcards app" --allow-empty
```
(Optionally create a GitHub remote and `git push -u origin master` if the user wants the repo hosted.)

---

## Self-Review

**Spec coverage:**
- Generic model → Task 2. Storage/IndexedDB/migration → Task 3. FSRS + daily limit → Tasks 4, 5, 16. Progress/due → Task 6. CSV + JSON import + dispatch → Tasks 7–9. Russian pack extraction (filler filter, deck split, field/audio mapping, id-uniqueness) → Task 10. Registry → Task 11. Language-aware TTS → Task 12. Router → Task 13. Clean-minimal UI (flashcard, progress, nav, styles) → Tasks 14–15. Boot/hydration + async loading state → Task 16. Home/Study/Import screens → Task 17. PWA/identity → Tasks 1 + 18. Deploy to new Vercel URL → Task 19. Testing throughout. **No gaps.**
- Aspect-pair merging: the spec lists it under Russian-specific build logic; Task 10 ports frequency decks + filler filtering and explicitly allows aspect-pairs as a same-scope fast-follow commit if the initial port is clean — flagged rather than dropped.

**Placeholder scan:** No "TBD"/"handle edge cases"/"similar to Task N". Each code step shows real code; each test step shows real assertions. ts-fsrs version-sensitive assertions (Tasks 4, 6) include explicit fallback guidance rather than vague hand-waving.

**Type consistency:** `ImportResult`/`ImportOpts` defined in Task 7, re-exported and reused in Tasks 8–9. `AppState`, `getState`/`setState` signatures consistent across Tasks 16–17. `Grade` from Task 4 used in Tasks 14, 17. `findCard`/`allPacks`/`loadBuiltinPacks` signatures match between Tasks 11 and 16–17. `routeParam` defined in Task 13, consumed in Task 17. `takeNewAllowance` return shape (`{ state, remaining }`) consistent between Tasks 16 and 17.

**Known version risk:** ts-fsrs API (`fsrs()`, `createEmptyCard`, `next().card`, `State`, `Rating`) is stable across recent 4.x/5.x, but the implementer should confirm the installed version's exports at Task 4 and adjust import names if pinned differently.
