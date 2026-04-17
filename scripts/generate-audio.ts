import { writeFile, access } from 'fs/promises';
import { join } from 'path';
import { survivalPhrases } from '../src/data/phrases.ts';

const AUDIO_DIR = join(import.meta.dirname, '..', 'public', 'audio');
const VOICE = 'ara'; // warm, friendly — good for language learning
const API_URL = 'https://api.x.ai/v1/tts';

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  const apiKey = process.env.GROK_API_KEY ?? process.env.XAI_API_KEY;
  if (!apiKey) {
    console.error('Error: GROK_API_KEY environment variable is required');
    console.error('Get your key at https://console.x.ai/');
    process.exit(1);
  }

  let generated = 0;
  let skipped = 0;

  console.log(`Generating audio for ${survivalPhrases.length} phrases...`);
  console.log(`Voice: ${VOICE}, API: x.ai Grok TTS`);
  console.log(`Output: ${AUDIO_DIR}\n`);

  for (const phrase of survivalPhrases) {
    const outPath = join(AUDIO_DIR, `${phrase.id}.mp3`);

    if (await fileExists(outPath)) {
      skipped++;
      continue;
    }

    try {
      console.log(`  Generating: ${phrase.id} — "${phrase.russian}"`);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: phrase.russian,
          voice_id: VOICE,
          language: 'ru',
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`${response.status}: ${errText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      await writeFile(outPath, buffer);
      generated++;

      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error(`  Failed: ${phrase.id} —`, err);
    }
  }

  console.log(`\nDone! Generated: ${generated}, Skipped (existing): ${skipped}`);
  console.log(`Total files: ${generated + skipped}/${survivalPhrases.length}`);
}

main();
