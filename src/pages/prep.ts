import { renderChecklist } from '../components/checklist.ts';
import { prepSections } from '../data/sections.ts';

export function renderPrep(container: HTMLElement): void {
  const header = document.createElement('div');
  header.innerHTML = `
    <div class="page-title">Pre-Departure Prep</div>
    <div class="page-subtitle">Check off items as you complete them. Your progress is saved automatically.</div>
  `;
  container.appendChild(header);

  renderChecklist(container, prepSections);
}
