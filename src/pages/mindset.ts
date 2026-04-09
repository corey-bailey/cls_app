import { mindsetSections } from '../data/mindset.ts';
import { resourceCategories } from '../data/resources.ts';
import { renderRevealCard } from '../components/reveal-card.ts';
import { renderProgressBar } from '../components/progress-bar.ts';
import { getRevealProgress } from '../storage.ts';
import { getAllRevealCardIds } from '../data/mindset.ts';

export function renderMindset(container: HTMLElement): void {
  const header = document.createElement('div');
  header.innerHTML = `
    <div class="page-title">Immersion Mindset</div>
    <div class="page-subtitle">Tap each question to reveal the answer. Read them all before you go.</div>
  `;
  container.appendChild(header);

  // Overall mindset progress
  const allIds = getAllRevealCardIds();
  const progress = getRevealProgress(allIds);
  const progressEl = document.createElement('div');
  progressEl.className = 'mb-md';
  renderProgressBar(progressEl, progress.done, progress.total);
  container.appendChild(progressEl);

  // Mindset sections
  for (const section of mindsetSections) {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'reveal-section';

    sectionEl.innerHTML = `
      <div class="reveal-section-title">${section.icon} ${section.title}</div>
      <div class="reveal-section-intro">${section.intro}</div>
    `;

    for (const card of section.cards) {
      renderRevealCard(sectionEl, card);
    }

    container.appendChild(sectionEl);
  }

  // Resources section
  const resourceHeader = document.createElement('div');
  resourceHeader.className = 'reveal-section';
  resourceHeader.innerHTML = `
    <div class="page-title mt-md">Resources</div>
    <div class="page-subtitle">Curated tools and guides for before and during your program.</div>
  `;
  container.appendChild(resourceHeader);

  for (const category of resourceCategories) {
    const catEl = document.createElement('div');
    catEl.className = 'resource-category';
    catEl.innerHTML = `<div class="resource-category-title">${category.icon} ${category.title}</div>`;

    for (const link of category.links) {
      const linkEl = document.createElement('a');
      linkEl.className = 'resource-link';
      linkEl.href = link.url;
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
      linkEl.innerHTML = `
        <div class="resource-link-title">${link.title}</div>
        <div class="resource-link-desc">${link.description}</div>
      `;
      catEl.appendChild(linkEl);
    }

    container.appendChild(catEl);
  }
}
