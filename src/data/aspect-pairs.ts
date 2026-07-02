import type { AspectPair } from './types.ts';

/**
 * Verb aspect pairs from the CLS textbook chart «Видовые пары глаголов»
 * (p. 100), grouped the way the chart groups them: perfectives formed with a
 * prefix, with a suffix change, or from a different stem entirely. Card front
 * is the imperfective, back is the perfective; `formation` mirrors the chart's
 * «способ образования» column.
 */

export interface AspectDeck {
  readonly id: string;
  readonly label: string;
  readonly pairs: readonly AspectPair[];
}

/** SRS key for an aspect-pair card — `ap-` namespace keeps it clear of `w<rank>`. */
export function pairKey(id: string): string {
  return `ap-${id}`;
}

const PREFIX_PAIRS: readonly AspectPair[] = [
  { id: 'znat', impf: 'знать', pf: 'узна́ть', english: 'to know / find out', formation: 'prefix у-' },
  { id: 'videt', impf: 'ви́деть', pf: 'уви́деть', english: 'to see', formation: 'prefix у-' },
  { id: 'dumat', impf: 'ду́мать', pf: 'поду́мать', english: 'to think', formation: 'prefix по-' },
  { id: 'smotret', impf: 'смотре́ть', pf: 'посмотре́ть', english: 'to watch, look', formation: 'prefix по-' },
  { id: 'byvat', impf: 'быва́ть', pf: 'побыва́ть', english: 'to be, visit', formation: 'prefix по-' },
  { id: 'zavtrakat', impf: 'за́втракать', pf: 'поза́втракать', english: 'to have breakfast', formation: 'prefix по-' },
  { id: 'obedat', impf: 'обе́дать', pf: 'пообе́дать', english: 'to have lunch', formation: 'prefix по-' },
  { id: 'uzhinat', impf: 'у́жинать', pf: 'поу́жинать', english: 'to have dinner', formation: 'prefix по-' },
  { id: 'teryat', impf: 'теря́ть', pf: 'потеря́ть', english: 'to lose', formation: 'prefix по-' },
  { id: 'znakomitsya', impf: 'знако́миться', pf: 'познако́миться', english: 'to meet, get acquainted', formation: 'prefix по-' },
  { id: 'slushat', impf: 'слу́шать', pf: 'послу́шать', english: 'to listen', formation: 'prefix по-' },
  { id: 'delat', impf: 'де́лать', pf: 'сде́лать', english: 'to do, make', formation: 'prefix с-' },
  { id: 'moch', impf: 'мочь', pf: 'смочь', english: 'to be able', formation: 'prefix с-' },
  { id: 'khotet', impf: 'хоте́ть', pf: 'захоте́ть', english: 'to want', formation: 'prefix за-' },
  { id: 'bolet', impf: 'боле́ть', pf: 'заболе́ть', english: 'to be sick', formation: 'prefix за-' },
  { id: 'chitat', impf: 'чита́ть', pf: 'прочита́ть', english: 'to read', formation: 'prefix про-' },
  { id: 'pisat', impf: 'писа́ть', pf: 'написа́ть', english: 'to write', formation: 'prefix на-' },
  { id: 'uchit', impf: 'учи́ть', pf: 'вы́учить', english: 'to learn, memorize', formation: 'prefix вы-' },
  { id: 'gotovit', impf: 'гото́вить', pf: 'пригото́вить', english: 'to prepare, cook', formation: 'prefix при-' },
];

const SUFFIX_PAIRS: readonly AspectPair[] = [
  { id: 'izuchat', impf: 'изуча́ть', pf: 'изучи́ть', english: 'to study (a subject)', formation: 'suffix -а- → -и-' },
  { id: 'vstrechat', impf: 'встреча́ть', pf: 'встре́тить', english: 'to meet', formation: 'suffix -а- → -и-' },
  { id: 'reshat', impf: 'реша́ть', pf: 'реши́ть', english: 'to decide, solve', formation: 'suffix -а- → -и-' },
  { id: 'povtoryat', impf: 'повторя́ть', pf: 'повтори́ть', english: 'to repeat, review', formation: 'suffix -а- → -и-' },
  { id: 'otvechat', impf: 'отвеча́ть', pf: 'отве́тить', english: 'to answer', formation: 'suffix -а- → -и-' },
  { id: 'obyasnyat', impf: 'объясня́ть', pf: 'объясни́ть', english: 'to explain', formation: 'suffix -а- → -и-' },
  { id: 'vspominat', impf: 'вспомина́ть', pf: 'вспо́мнить', english: 'to recall, remember', formation: 'suffix -а- → -и-' },
  { id: 'proveryat', impf: 'проверя́ть', pf: 'прове́рить', english: 'to check', formation: 'suffix -а- → -и-' },
  { id: 'ispravlyat', impf: 'исправля́ть', pf: 'испра́вить', english: 'to correct', formation: 'suffix -а- → -и-' },
  { id: 'rasskazyvat', impf: 'расска́зывать', pf: 'рассказа́ть', english: 'to tell, narrate', formation: 'suffix -ыва- → -а-' },
  { id: 'opazdyvat', impf: 'опа́здывать', pf: 'опозда́ть', english: 'to be late', formation: 'suffix -ыва- → -а-' },
  { id: 'pokazyvat', impf: 'пока́зывать', pf: 'показа́ть', english: 'to show', formation: 'suffix -ыва- → -а-' },
  { id: 'sprashivat', impf: 'спра́шивать', pf: 'спроси́ть', english: 'to ask', formation: 'suffix -ива- → -и-' },
  { id: 'zabyvat', impf: 'забыва́ть', pf: 'забы́ть', english: 'to forget', formation: 'suffix -ыва- → -ы-' },
  { id: 'otdykhat', impf: 'отдыха́ть', pf: 'отдохну́ть', english: 'to rest', formation: 'suffix -а- → -ну-' },
  { id: 'pokupat', impf: 'покупа́ть', pf: 'купи́ть', english: 'to buy', formation: 'prefix + suffix (по-, -а- → -и-)' },
];

const STEM_PAIRS: readonly AspectPair[] = [
  { id: 'govorit', impf: 'говори́ть', pf: 'сказа́ть', english: 'to say, speak', formation: 'different stems' },
  { id: 'prikhodit', impf: 'приходи́ть', pf: 'прийти́', english: 'to come, arrive', formation: 'different stems' },
  { id: 'perevodit', impf: 'переводи́ть', pf: 'перевести́', english: 'to translate', formation: 'different stems' },
  { id: 'ponimat', impf: 'понима́ть', pf: 'поня́ть', english: 'to understand', formation: 'different stems' },
  { id: 'brat', impf: 'брать', pf: 'взять', english: 'to take', formation: 'different stems' },
  { id: 'klast', impf: 'класть', pf: 'положи́ть', english: 'to put (lying)', formation: 'different stems' },
];

export const ASPECT_DECKS: readonly AspectDeck[] = [
  { id: 'prefixes', label: 'Prefixes', pairs: PREFIX_PAIRS },
  { id: 'suffixes', label: 'Suffixes', pairs: SUFFIX_PAIRS },
  { id: 'stems', label: 'Different stems', pairs: STEM_PAIRS },
];
