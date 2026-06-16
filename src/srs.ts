import type { CardSchedule, Direction, Grade } from './data/types.ts';

/**
 * SM-2 spaced-repetition engine plus localStorage persistence.
 *
 * Scheduling state lives under its own key (separate from the core AppState)
 * and is populated lazily — only cards the user has actually graded get an
 * entry. Word keys are `w<rank>`.
 */

const SRS_KEY = 'cls_app_srs';
const DIRECTION_KEY = 'cls_app_direction';

const MIN_EASE = 1.3;
const STARTING_EASE = 2.5;

export type SrsStore = Record<string, CardSchedule>;

export function wordKey(rank: number): string {
  return `w${rank}`;
}

/** Local calendar date (not UTC) as YYYY-MM-DD, for day-granular scheduling. */
function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): string {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return toDateKey(next);
}

/**
 * Pure SM-2 step. Returns a new CardSchedule; never mutates `prev`.
 * `again` resets the card to relearning (due today) and records a lapse.
 */
export function schedule(
  prev: CardSchedule | undefined,
  grade: Grade,
  today: Date,
): CardSchedule {
  const base: CardSchedule = prev ?? {
    ease: STARTING_EASE,
    intervalDays: 0,
    reps: 0,
    lapses: 0,
    due: toDateKey(today),
  };

  if (grade === 'again') {
    return {
      ease: Math.max(MIN_EASE, base.ease - 0.2),
      intervalDays: 0,
      reps: 0,
      lapses: base.lapses + 1,
      due: toDateKey(today), // relearn within the same session
    };
  }

  // Ease adjustments per grade (SM-2 style).
  const easeDelta = grade === 'hard' ? -0.15 : grade === 'easy' ? 0.15 : 0;
  const ease = Math.max(MIN_EASE, base.ease + easeDelta);

  let intervalDays: number;
  if (base.reps === 0) {
    intervalDays = grade === 'easy' ? 4 : 1;
  } else if (base.reps === 1) {
    intervalDays = grade === 'hard' ? 4 : 6;
  } else {
    const factor = grade === 'hard' ? 1.2 : grade === 'easy' ? ease * 1.3 : ease;
    intervalDays = Math.max(1, Math.round(base.intervalDays * factor));
  }

  return {
    ease,
    intervalDays,
    reps: base.reps + 1,
    lapses: base.lapses,
    due: addDays(today, intervalDays),
  };
}

/** Reads the whole SRS store once; callers pass it to the count helpers to
 *  avoid re-parsing localStorage per card. */
export function getStore(): SrsStore {
  try {
    const raw = localStorage.getItem(SRS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as SrsStore;
  } catch {
    return {};
  }
}

function writeStore(store: SrsStore): void {
  localStorage.setItem(SRS_KEY, JSON.stringify(store));
}

export function getSchedule(key: string): CardSchedule | undefined {
  return getStore()[key];
}

export function saveSchedule(key: string, sched: CardSchedule): void {
  writeStore({ ...getStore(), [key]: sched });
}

/** A card is due if it has no schedule yet (new) or its due date is today/past. */
export function isScheduleDue(sched: CardSchedule | undefined, today: Date): boolean {
  return !sched || sched.due <= toDateKey(today);
}

export function dueCount(keys: readonly string[], today: Date, store: SrsStore): number {
  return keys.reduce((count, key) => count + (isScheduleDue(store[key], today) ? 1 : 0), 0);
}

/** "Learned" = graded at least once (reps > 0). */
export function learnedCount(keys: readonly string[], store: SrsStore): number {
  return keys.reduce((count, key) => count + ((store[key]?.reps ?? 0) > 0 ? 1 : 0), 0);
}

export function getDirection(): Direction {
  const raw = localStorage.getItem(DIRECTION_KEY);
  return raw === 'en-ru' ? 'en-ru' : 'ru-en';
}

export function setDirection(direction: Direction): void {
  localStorage.setItem(DIRECTION_KEY, direction);
}
