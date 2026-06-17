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

interface VocabWord {
  readonly rank: number;
  readonly russian: string;
  readonly english: string;
  readonly pos: string;
  readonly notes?: string;
  readonly pair?: string;
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TSV_PATH = resolve(root, 'russian-1000-frequency.tsv');
const OUT_PATH = resolve(root, 'public/data/russian-1000.json');

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

    words.push({
      rank,
      russian,
      english,
      pos,
      ...(notes ? { notes } : {}),
      ...(pair ? { pair } : {}),
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
