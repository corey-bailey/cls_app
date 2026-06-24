import { resourceCategories } from '../data/resources.ts';

export function renderResources(container: HTMLElement): void {
  const header = document.createElement('div');
  header.innerHTML = `
    <div class="page-title">Resources</div>
    <div class="page-subtitle">Curated tools and guides for before and during your program.</div>
  `;
  container.appendChild(header);

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
