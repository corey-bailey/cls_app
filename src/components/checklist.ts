import type { Section } from '../data/types.ts';
import { toggleItem, isChecked, getProgress } from '../storage.ts';

export function renderChecklist(container: HTMLElement, sections: readonly Section[]): void {
  for (const section of sections) {
    const card = document.createElement('div');
    card.className = 'section-card';

    const { done, total } = getProgress(section.items.map((i) => i.id));

    // Header
    const header = document.createElement('div');
    header.className = 'section-header';
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    header.innerHTML = `
      <span class="section-icon">${section.icon}</span>
      <span class="section-title">${section.title}</span>
      <span class="section-count" data-section="${section.id}">${done}/${total}</span>
      <span class="section-chevron">\u25B6</span>
    `;

    header.addEventListener('click', () => {
      card.classList.toggle('expanded');
      header.setAttribute('aria-expanded', String(card.classList.contains('expanded')));
    });

    card.appendChild(header);

    // Items
    const itemsEl = document.createElement('div');
    itemsEl.className = 'section-items';

    for (const item of section.items) {
      const itemEl = document.createElement('div');
      itemEl.className = `check-item${isChecked(item.id) ? ' done' : ''}`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = isChecked(item.id);
      checkbox.setAttribute('aria-label', item.label);

      const labelWrap = document.createElement('div');
      labelWrap.className = 'check-label';

      const labelText = document.createElement('span');
      labelText.textContent = item.label;
      labelWrap.appendChild(labelText);

      if (item.detail) {
        const detail = document.createElement('div');
        detail.className = 'check-detail';
        detail.textContent = item.detail;
        labelWrap.appendChild(detail);
      }

      if (item.link) {
        const link = document.createElement('a');
        link.className = 'check-link';
        link.href = item.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Open resource \u2192';
        labelWrap.appendChild(link);
      }

      const handleToggle = (): void => {
        const checked = toggleItem(item.id);
        checkbox.checked = checked;
        itemEl.classList.toggle('done', checked);
        updateSectionCount(container, section);
      };

      checkbox.addEventListener('change', handleToggle);
      labelText.addEventListener('click', handleToggle);
      labelText.style.cursor = 'pointer';

      itemEl.appendChild(checkbox);
      itemEl.appendChild(labelWrap);
      itemsEl.appendChild(itemEl);
    }

    card.appendChild(itemsEl);
    container.appendChild(card);
  }
}

function updateSectionCount(root: HTMLElement, section: Section): void {
  const { done, total } = getProgress(section.items.map((i) => i.id));
  const countEl = root.querySelector(`[data-section="${section.id}"]`);
  if (countEl) {
    countEl.textContent = `${done}/${total}`;
  }
}
