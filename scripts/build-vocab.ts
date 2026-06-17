#!/usr/bin/env tsx
/**
 * Build the runtime vocab JSON from the frequency TSV.
 *
 * Reads `russian-1000-frequency.tsv` (Rank, Russian, English, POS, Notes, Pair)
 * and writes `public/data/russian-1000.json` as a plain array of VocabWord objects.
 * The JSON is committed and is the source of truth at runtime; re-run this only
 * when the TSV changes. Mirrors build_deck.py's column handling.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type Aspect = 'impf' | 'pf' | 'biasp';

interface VocabWord {
  readonly rank: number;
  readonly russian: string;
  readonly english: string;
  readonly pos: string;
  readonly notes?: string;
  readonly pair?: string;
  readonly aspect?: Aspect;
  readonly impf?: string;
  readonly pf?: string;
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TSV_PATH = resolve(root, 'russian-1000-frequency.tsv');
const OUT_PATH = resolve(root, 'public/data/russian-1000.json');

const ASPECTS: ReadonlySet<string> = new Set(['impf', 'pf', 'biasp']);

/** The verb's own aspect token from its notes (impf/pf/biasp), if present. */
function aspectFromNotes(notes: string): Aspect | undefined {
  for (const tok of notes.split(/\s+/)) {
    if (ASPECTS.has(tok)) return tok as Aspect;
  }
  return undefined;
}

/** Parses a Pair cell like "говори́ть (impf)" into its form and aspect. */
function parsePair(pair: string): { form: string; aspect: Aspect } | null {
  const m = pair.match(/^(.+?)\s*\((impf|pf|biasp)\)\s*$/);
  return m ? { form: m[1].trim(), aspect: m[2] as Aspect } : null;
}

/**
 * Resolves the imperfective/perfective forms of a verb's aspect pair from the
 * verb itself plus its partner. Returns both only when the two sides cover
 * distinct aspects (impf + pf) — single-aspect or biaspectual verbs get none.
 */
function aspectForms(
  russian: string,
  own: Aspect | undefined,
  pair: string,
): { impf?: string; pf?: string } {
  const partner = parsePair(pair);
  if (!own || !partner || partner.aspect === own) return {};
  const slots: Partial<Record<Aspect, string>> = {};
  slots[own] = russian;
  slots[partner.aspect] = partner.form;
  return slots.impf && slots.pf ? { impf: slots.impf, pf: slots.pf } : {};
}

function parseTsv(raw: string): VocabWord[] {
  const lines = raw.split('\n').filter((l) => l.trim().length > 0);
  const header = lines[0]?.split('\t').map((h) => h.trim());
  if (!header || header[0] !== 'Rank') {
    throw new Error(`Unexpected TSV header: ${header?.join(', ')}`);
  }

  const words: VocabWord[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const rank = Number.parseInt((cols[0] ?? '').trim(), 10);
    const russian = (cols[1] ?? '').trim();
    const english = (cols[2] ?? '').trim();
    const pos = (cols[3] ?? '').trim();
    const notes = (cols[4] ?? '').trim();
    const pair = (cols[5] ?? '').trim();

    if (!Number.isFinite(rank) || !russian) {
      throw new Error(`Malformed row ${i + 1}: ${lines[i]}`);
    }

    const aspect = pos === 'verb' ? aspectFromNotes(notes) : undefined;
    const { impf, pf } = pos === 'verb' && pair
      ? aspectForms(russian, aspect, pair)
      : {};

    words.push({
      rank,
      russian,
      english,
      pos,
      ...(notes ? { notes } : {}),
      ...(pair ? { pair } : {}),
      ...(aspect ? { aspect } : {}),
      ...(impf && pf ? { impf, pf } : {}),
    });
  }
  return words;
}

function main(): void {
  const raw = readFileSync(TSV_PATH, 'utf-8');
  const words = parseTsv(raw);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(words), 'utf-8');
  console.log(`Wrote ${OUT_PATH} with ${words.length} words.`);
}

main();
