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

/** Builds the back-of-card metadata line (POS + aspect/gender note + rank). */
function metaLine(word: VocabWord): string {
  const parts = [word.pos, word.notes, `rank #${word.rank}`].filter(Boolean);
  return parts.map((p) => escapeHtml(p as string)).join(' · ');
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
  const promptText = promptRussian ? word.russian : word.english;
  const answerText = promptRussian ? word.english : word.russian;
  const russianText = word.russian;

  const wrap = document.createElement('div');
  wrap.className = 'flashcard-wrap';

  wrap.innerHTML = `
    <div class="flashcard-counter">${remaining} left</div>
    <div class="flashcard" role="button" tabindex="0" aria-label="Show answer">
      <div class="flashcard-side flashcard-prompt">
        <div class="flashcard-word">${escapeHtml(promptText)}</div>
        ${promptRussian && hasTTSSupport() ? `<button class="flashcard-audio" aria-label="Listen">▶</button>` : ''}
        <div class="flashcard-hint">Tap to reveal</div>
      </div>
      <div class="flashcard-side flashcard-answer" hidden>
        <div class="flashcard-word">${escapeHtml(answerText)}</div>
        ${!promptRussian && hasTTSSupport() ? `<button class="flashcard-audio" aria-label="Listen">▶</button>` : ''}
        <div class="flashcard-meta">${metaLine(word)}</div>
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

  function playRussian(btn: HTMLElement | null): void {
    speak(russianText, undefined, {
      onStart: () => btn?.classList.add('speaking'),
      onEnd: () => btn?.classList.remove('speaking'),
    });
  }

  function wireAudio(side: HTMLElement): void {
    const btn = side.querySelector<HTMLButtonElement>('.flashcard-audio');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playRussian(btn);
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
    // Auto-play the Russian audio when it lands on the answer side.
    if (!promptRussian && hasTTSSupport()) {
      playRussian(answerSide.querySelector<HTMLButtonElement>('.flashcard-audio'));
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
