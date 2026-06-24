import type { VocabWord } from './types.ts';

/**
 * Derives ~20 frequency-ordered decks of 50 words each from the full vocab
 * list. Pure helpers — no hand-listed deck definitions.
 */

const DECK_SIZE = 50;

export interface Deck {
  readonly label: string;
  readonly words: readonly VocabWord[];
}

/** POS tags treated as grammatical "filler" — excluded from flashcard decks. */
const FILLER_POS: ReadonlySet<string> = new Set([
  'conjunction',
  'preposition',
  'particle',
  'parenthetical',
  'interjection',
  'particle/pron', // "то" — primarily a particle here
]);

/** True for grammatical glue words a learner doesn't drill (и, в, не, конечно…). */
export function isFillerWord(word: VocabWord): boolean {
  return FILLER_POS.has(word.pos);
}

/** Strips Cyrillic stress marks (combining diacritics) so accented forms compare equal. */
function deaccent(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Collapses each verb aspect pair into a single card. Both halves of a pair
 * (e.g. де́лать + сде́лать) carry the same resolved {impf, pf}; we keep the
 * first (lowest-rank) occurrence and drop the duplicate, so the merged card
 * lives in its more frequent member's deck and keeps a stable rank SRS key.
 * Non-verbs, single-aspect verbs, and pairs with only one half in the list
 * pass through untouched.
 */
export function mergeAspectPairs(words: readonly VocabWord[]): VocabWord[] {
  const sorted = [...words].sort((a, b) => a.rank - b.rank);
  const seen = new Set<string>();
  const merged: VocabWord[] = [];
  for (const word of sorted) {
    if (word.impf && word.pf) {
      const key = `${deaccent(word.impf)}|${deaccent(word.pf)}`;
      if (seen.has(key)) continue;
      seen.add(key);
    }
    merged.push(word);
  }
  return merged;
}

export function buildDecks(words: readonly VocabWord[]): Deck[] {
  const sorted = [...words].sort((a, b) => a.rank - b.rank);
  const decks: Deck[] = [];
  for (let start = 0; start < sorted.length; start += DECK_SIZE) {
    const slice = sorted.slice(start, start + DECK_SIZE);
    const first = slice[0]?.rank ?? start + 1;
    const last = slice[slice.length - 1]?.rank ?? start + slice.length;
    decks.push({
      label: `${first}–${last}`,
      words: slice,
    });
  }
  return decks;
}
