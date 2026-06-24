import { renderRevealCard } from '../components/reveal-card.ts';
import { renderProgressBar } from '../components/progress-bar.ts';
import { getRevealProgress } from '../storage.ts';
import {
  getAllRevealCardIds,
  getMindsetWeeks,
  getSectionsForWeek,
  getGeneralSections,
} from '../data/mindset.ts';
import type { MindsetSection } from '../data/types.ts';

type WeekView = number | 'general';

export function renderMindset(container: HTMLElement): void {
  const header = document.createElement('div');
  header.innerHTML = `
    <div class="page-title">Immersion Mindset</div>
    <div class="page-subtitle">Pick a week to see what it feels like. Tap each question to reveal the answer.</div>
  `;
  container.appendChild(header);

  // Overall mindset progress across all weeks + general sections
  const allIds = getAllRevealCardIds();
  const progress = getRevealProgress(allIds);
  const progressEl = document.createElement('div');
  progressEl.className = 'mb-md';
  renderProgressBar(progressEl, progress.done, progress.total);
  container.appendChild(progressEl);

  // Build the list of selectable views: each program week, then General
  const weeks = getMindsetWeeks();
  const views: readonly { readonly key: WeekView; readonly label: string }[] = [
    ...weeks.map((w) => ({ key: w as WeekView, label: `Week ${w}` })),
    { key: 'general' as WeekView, label: 'General' },
  ];

  let active: WeekView = weeks[0] ?? 'general';

  const selector = document.createElement('div');
  selector.className = 'week-selector';
  selector.setAttribute('role', 'tablist');
  selector.setAttribute('aria-label', 'Program week');
  container.appendChild(selector);

  const sectionHost = document.createElement('div');
  container.appendChild(sectionHost);

  function sectionsFor(view: WeekView): readonly MindsetSection[] {
    return view === 'general' ? getGeneralSections() : getSectionsForWeek(view);
  }

  function renderSections(): void {
    sectionHost.replaceChildren();
    for (const section of sectionsFor(active)) {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'reveal-section';
      sectionEl.innerHTML = `
        <div class="reveal-section-title">${section.icon} ${section.title}</div>
        <div class="reveal-section-intro">${section.intro}</div>
      `;
      for (const card of section.cards) {
        renderRevealCard(sectionEl, card);
      }
      sectionHost.appendChild(sectionEl);
    }
  }

  function renderSelector(): void {
    selector.replaceChildren();
    for (const view of views) {
      const btn = document.createElement('button');
      btn.className = 'week-chip';
      btn.textContent = view.label;
      btn.setAttribute('role', 'tab');
      const isActive = view.key === active;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.addEventListener('click', () => {
        if (active === view.key) return;
        active = view.key;
        renderSelector();
        renderSections();
      });
      selector.appendChild(btn);
    }
  }

  renderSelector();
  renderSections();
}
