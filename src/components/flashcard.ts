import type { Direction, Grade, VocabWord } from '../data/types.ts';
import { speak, stopSpeaking, hasTTSSupport } from '../tts.ts';
import { schedule, getSchedule, wordKey } from '../srs.ts';

interface FlashcardOptions {
  readonly word: VocabWord;
  readonly direction: Direction;
  readonly remaining: number;
  readonly onGrade: (grade: Grade) => void;
}

const GRADES: readonly { grade: Grade; label: string; cls: string }[] = [
  { grade: 'again', label: 'Again', cls: 'grade-again' },
  { grade: 'hard', label: 'Hard', cls: 'grade-hard' },
  { grade: 'good', label: 'Good', cls: 'grade-good' },
  { grade: 'easy', label: 'Easy', cls: 'grade-easy' },
];

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/** Spells out verb aspect for display; leaves gender / other notes untouched. */
function expandNotes(notes: string): string {
  return notes
    .split(/\s+/)
    .map((tok) => {
      if (tok === 'impf') return 'imperfective';
      if (tok === 'pf') return 'perfective';
      if (tok === 'biasp') return 'biaspectual';
      return tok;
    })
    .join(' ');
}

/** A verb card that shows both aspect forms together. */
function isAspectPair(word: VocabWord): boolean {
  return Boolean(word.impf && word.pf);
}

/** Builds the back-of-card metadata line (POS + spelled-out aspect/gender note). */
function metaLine(word: VocabWord): string {
  const note = isAspectPair(word) ? 'aspect pair' : word.notes ? expandNotes(word.notes) : '';
  const parts = [word.pos, note].filter(Boolean);
  return parts.map((p) => escapeHtml(p as string)).join(' · ');
}

/** A round audio button that speaks `text` (wired up after render). */
function audioButton(text: string): string {
  if (!hasTTSSupport()) return '';
  return `<button class="flashcard-audio" data-speak="${escapeHtml(text)}" aria-label="Listen">▶</button>`;
}

/**
 * The Russian face of the card. Aspect-pair verbs show both forms with
 * imperfective/perfective labels and a per-form audio button; everything else
 * shows the single word. Used on the prompt side for ru→en and the answer side
 * for en→ru, so the audio always rides along with the Russian.
 */
function russianBlock(word: VocabWord): string {
  if (isAspectPair(word)) {
    const row = (label: string, form: string): string => `
      <div class="flashcard-pair-row">
        <span class="flashcard-pair-label">${label}</span>
        <span class="flashcard-pair-form">${escapeHtml(form)}</span>
        ${audioButton(form)}
      </div>`;
    return `<div class="flashcard-pair">
      ${row('imperfective', word.impf!)}
      ${row('perfective', word.pf!)}
    </div>`;
  }
  return `<div class="flashcard-word">${escapeHtml(word.russian)}</div>${audioButton(word.russian)}`;
}

/** The English face of the card. */
function englishBlock(word: VocabWord): string {
  return `<div class="flashcard-word">${escapeHtml(word.english)}</div>`;
}

/** Human-readable "when you'll next see this card" label for a grade button. */
function intervalHint(grade: Grade, word: VocabWord, today: Date): string {
  if (grade === 'again') return 'soon';
  const days = schedule(getSchedule(wordKey(word.rank)), grade, today).intervalDays;
  if (days <= 1) return '1 day';
  if (days < 30) return `${days} days`;
  const months = Math.round(days / 30);
  return months <= 1 ? '1 mo' : `${months} mo`;
}

/**
 * Renders a single study card. The Russian side gets an audio button (Web
 * Speech ru-RU). Tap/space flips to the back, which reveals the answer and the
 * four SM-2 grade buttons. `onGrade` advances the queue.
 */
export function renderFlashcard(container: HTMLElement, opts: FlashcardOptions): void {
  const { word, direction, remaining, onGrade } = opts;
  stopSpeaking();

  const promptRussian = direction === 'ru-en';

  const wrap = document.createElement('div');
  wrap.className = 'flashcard-wrap';

  wrap.innerHTML = `
    <div class="flashcard-counter">${remaining} left</div>
    <div class="flashcard" role="button" tabindex="0" aria-label="Show answer">
      <div class="flashcard-side flashcard-prompt">
        ${promptRussian ? russianBlock(word) : englishBlock(word)}
        <div class="flashcard-hint">Tap to reveal</div>
      </div>
      <div class="flashcard-side flashcard-answer" hidden>
        ${promptRussian ? englishBlock(word) : russianBlock(word)}
        <div class="flashcard-meta">${metaLine(word)}</div>
        <div class="flashcard-footer">#${word.rank} most common</div>
      </div>
    </div>
    <div class="grade-buttons" hidden>
      ${GRADES.map((g) => `<button class="grade-btn ${g.cls}" data-grade="${g.grade}">
        <span class="grade-label">${g.label}</span>
        <span class="grade-interval">${intervalHint(g.grade, word, new Date())}</span>
      </button>`).join('')}
    </div>
  `;

  const card = wrap.querySelector<HTMLElement>('.flashcard')!;
  const promptSide = wrap.querySelector<HTMLElement>('.flashcard-prompt')!;
  const answerSide = wrap.querySelector<HTMLElement>('.flashcard-answer')!;
  const grades = wrap.querySelector<HTMLElement>('.grade-buttons')!;
  let flipped = false;

  function playText(text: string, btn: HTMLElement | null): void {
    speak(text, undefined, {
      onStart: () => btn?.classList.add('speaking'),
      onEnd: () => btn?.classList.remove('speaking'),
    });
  }

  function wireAudio(side: HTMLElement): void {
    side.querySelectorAll<HTMLButtonElement>('.flashcard-audio').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playText(btn.dataset.speak ?? '', btn);
      });
    });
  }
  wireAudio(promptSide);
  wireAudio(answerSide);

  function flip(): void {
    if (flipped) return;
    flipped = true;
    promptSide.hidden = true;
    answerSide.hidden = false;
    grades.hidden = false;
    card.setAttribute('aria-label', 'Card revealed');
    // Auto-play the Russian audio when it lands on the answer side. For an
    // aspect pair this is the imperfective (first) form.
    if (!promptRussian && hasTTSSupport()) {
      const btn = answerSide.querySelector<HTMLButtonElement>('.flashcard-audio');
      if (btn) playText(btn.dataset.speak ?? '', btn);
    }
  }

  card.addEventListener('click', flip);
  card.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      flip();
    }
  });

  grades.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>('.grade-btn');
    if (!target) return;
    stopSpeaking();
    onGrade(target.dataset.grade as Grade);
  });

  container.appendChild(wrap);
}
