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
