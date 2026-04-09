import { survivalPhrases, categoryLabels } from '../data/phrases.ts';
import { renderPhraseCard } from '../components/phrase-card.ts';
import type { PhraseCategory } from '../data/types.ts';

const categories: readonly PhraseCategory[] = [
  'confusion', 'homestay', 'classroom', 'transport', 'food', 'emergency', 'polite',
];

export function renderPhrases(container: HTMLElement): void {
  const header = document.createElement('div');
  header.innerHTML = `
    <div class="page-title">Survival Phrases</div>
    <div class="page-subtitle">Tap \u25B6 Play to hear pronunciation. These phrases reduce panic and keep you in Russian.</div>
  `;
  container.appendChild(header);

  // Category filter pills
  const filters = document.createElement('div');
  filters.className = 'phrase-filters';

  const allPill = createPill('All', true);
  filters.appendChild(allPill);

  for (const cat of categories) {
    const pill = createPill(categoryLabels[cat] ?? cat, false);
    pill.dataset.category = cat;
    filters.appendChild(pill);
  }

  container.appendChild(filters);

  // Phrase list
  const phraseList = document.createElement('div');
  phraseList.className = 'phrase-list';

  function renderFiltered(category: string | null): void {
    phraseList.innerHTML = '';
    const filtered = category
      ? survivalPhrases.filter((p) => p.category === category)
      : survivalPhrases;
    for (const phrase of filtered) {
      renderPhraseCard(phraseList, phrase);
    }
  }

  // Filter click handlers
  filters.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('.filter-pill') as HTMLElement | null;
    if (!target) return;

    for (const pill of filters.querySelectorAll('.filter-pill')) {
      pill.classList.remove('active');
    }
    target.classList.add('active');

    const category = target.dataset.category ?? null;
    renderFiltered(category);
  });

  renderFiltered(null);
  container.appendChild(phraseList);
}

function createPill(label: string, active: boolean): HTMLButtonElement {
  const pill = document.createElement('button');
  pill.className = `filter-pill${active ? ' active' : ''}`;
  pill.textContent = label;
  return pill;
}
