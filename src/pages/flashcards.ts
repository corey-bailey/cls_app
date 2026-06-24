import type { Deck } from '../data/decks.ts';
import { buildDecks, mergeAspectPairs, isFillerWord } from '../data/decks.ts';
import type { Direction, Grade, VocabWord } from '../data/types.ts';
import { renderFlashcard } from '../components/flashcard.ts';
import {
  wordKey,
  isScheduleDue,
  dueCount,
  learnedCount,
  schedule,
  getStore,
  getSchedule,
  saveSchedule,
  getDirection,
  setDirection,
} from '../srs.ts';
import { stopSpeaking } from '../tts.ts';

const VOCAB_URL = '/data/russian-1000.json';
const NEW_PER_SESSION = 20;

let cachedDecks: Deck[] | null = null;

async function loadDecks(): Promise<Deck[]> {
  if (cachedDecks) return cachedDecks;
  const res = await fetch(VOCAB_URL);
  if (!res.ok) throw new Error(`Failed to load vocab: ${res.status}`);
  const words = (await res.json()) as VocabWord[];
  const content = words.filter((w) => !isFillerWord(w));
  cachedDecks = buildDecks(mergeAspectPairs(content));
  return cachedDecks;
}

export function renderFlashcards(container: HTMLElement): void {
  const header = document.createElement('div');
  header.innerHTML = `
    <div class="page-title">Flashcards</div>
    <div class="page-subtitle">The most common Russian words by frequency — grammatical filler removed so you drill real vocabulary. Spaced repetition keeps due cards coming back at the right time.</div>
  `;
  container.appendChild(header);

  const body = document.createElement('div');
  container.appendChild(body);

  loadDecks()
    .then((decks) => renderDeckList(body, decks))
    .catch(() => {
      body.innerHTML = `<div class="empty-state">Couldn't load the word list. Check your connection and reload.</div>`;
    });
}

function renderDeckList(body: HTMLElement, decks: readonly Deck[]): void {
  stopSpeaking();
  body.innerHTML = '';
  const today = new Date();
  const direction = getDirection();
  const store = getStore();

  // Labeled direction toggle (reuses the filter-pill styling).
  const toggle = document.createElement('div');
  toggle.className = 'phrase-filters';
  toggle.innerHTML = `<span class="direction-label">Direction:</span>${directionPills(direction)}`;
  toggle.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>('.filter-pill');
    if (!target) return;
    setDirection(target.dataset.dir as Direction);
    renderDeckList(body, decks);
  });
  body.appendChild(toggle);

  body.appendChild(buildHelp());

  const grid = document.createElement('div');
  grid.className = 'deck-grid';

  for (const deck of decks) {
    const keys = deck.words.map((w) => wordKey(w.rank));
    const due = dueCount(keys, today, store);
    const learned = learnedCount(keys, store);

    const btn = document.createElement('button');
    btn.className = 'deck-card';
    btn.innerHTML = `
      <div class="deck-label">${deck.label}</div>
      <div class="deck-progress">${learned}/${deck.words.length} learned</div>
      ${due > 0 ? `<span class="deck-due-badge">${due} due</span>` : `<span class="deck-done-badge">✓</span>`}
    `;
    btn.addEventListener('click', () => startStudy(body, decks, deck, direction));
    grid.appendChild(btn);
  }

  body.appendChild(grid);
}

/** Collapsible explainer for how the Again/Hard/Good/Easy ratings work. */
function buildHelp(): HTMLElement {
  const help = document.createElement('details');
  help.className = 'srs-help';
  help.innerHTML = `
    <summary>How reviews work &amp; what the buttons do</summary>
    <div class="srs-help-body">
      <p>Tap a card to flip it, then rate how well you knew the word. Your rating sets <em>when the card comes back</em> — the time shown under each button:</p>
      <ul>
        <li><strong>Again</strong> — you missed it. It returns later this session and its progress resets.</li>
        <li><strong>Hard</strong> — correct, but a struggle. Comes back soonest of the three.</li>
        <li><strong>Good</strong> — correct with normal effort. Standard spacing (1 → 6 → 15+ days).</li>
        <li><strong>Easy</strong> — instant recall. Jumps the furthest out.</li>
      </ul>
      <p>Words you know well drift far into the future; words you miss keep coming back. A deck's <strong>“due”</strong> badge counts new cards plus any scheduled for today.</p>
    </div>
  `;
  return help;
}

/** The RU↔EN toggle markup, shared by the deck list and the study bar. */
function directionPills(direction: Direction): string {
  return `
    <button class="filter-pill${direction === 'ru-en' ? ' active' : ''}" data-dir="ru-en">RU → EN</button>
    <button class="filter-pill${direction === 'en-ru' ? ' active' : ''}" data-dir="en-ru">EN → RU</button>
  `;
}

/** Builds the session queue: due cards in frequency order, capped on new cards. */
function buildQueue(deck: Deck, today: Date): VocabWord[] {
  const store = getStore();
  const queue: VocabWord[] = [];
  let newCount = 0;
  for (const word of deck.words) {
    const sched = store[wordKey(word.rank)];
    if (!sched) {
      if (newCount >= NEW_PER_SESSION) continue;
      newCount++;
      queue.push(word);
    } else if (isScheduleDue(sched, today)) {
      queue.push(word);
    }
  }
  return queue;
}

function startStudy(
  body: HTMLElement,
  decks: readonly Deck[],
  deck: Deck,
  direction: Direction,
): void {
  const today = new Date();
  const queue = buildQueue(deck, today);
  let currentDirection = direction;
  let currentWord: VocabWord | undefined;

  const view = document.createElement('div');
  body.replaceWith(view);
  // Keep a stable reference so we can re-render the deck list on exit.
  const exitToList = (): void => {
    const fresh = document.createElement('div');
    view.replaceWith(fresh);
    renderDeckList(fresh, decks);
  };

  const bar = document.createElement('div');
  bar.className = 'study-bar';
  view.appendChild(bar);

  const cardHost = document.createElement('div');
  view.appendChild(cardHost);

  function paintBar(): void {
    bar.innerHTML = `
      <button class="study-back">‹ Decks</button>
      <span class="study-deck-label">${deck.label}</span>
      <div class="study-direction">${directionPills(currentDirection)}</div>
    `;
    bar.querySelector('.study-back')!.addEventListener('click', () => {
      stopSpeaking();
      exitToList();
    });
    bar.querySelector('.study-direction')!.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest<HTMLButtonElement>('.filter-pill');
      if (!target) return;
      const dir = target.dataset.dir as Direction;
      if (dir === currentDirection) return;
      currentDirection = dir;
      setDirection(dir);
      paintBar();
      showCard(); // re-render the current card in the new direction
    });
  }

  /** Renders whatever `currentWord` is (or the done state) — does not advance. */
  function showCard(): void {
    cardHost.innerHTML = '';
    const word = currentWord;
    if (!word) {
      cardHost.innerHTML = `
        <div class="empty-state">
          <div class="empty-emoji">🎉</div>
          <div>Deck complete for now. Come back when cards are due again.</div>
          <button class="study-back-btn">Back to decks</button>
        </div>`;
      cardHost.querySelector('.study-back-btn')!.addEventListener('click', exitToList);
      return;
    }

    renderFlashcard(cardHost, {
      word,
      direction: currentDirection,
      remaining: queue.length + 1,
      onGrade: (grade: Grade) => {
        const key = wordKey(word.rank);
        saveSchedule(key, schedule(getSchedule(key), grade, today));
        // "Again" recycles the card within this session.
        if (grade === 'again') queue.push(word);
        next();
      },
    });
  }

  function next(): void {
    currentWord = queue.shift();
    showCard();
  }

  paintBar();
  next();
}
