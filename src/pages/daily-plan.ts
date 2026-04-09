import { renderDailyPlan } from '../components/daily-plan.ts';
import { renderProgressBar } from '../components/progress-bar.ts';
import { getProgress } from '../storage.ts';
import { weekPlans, getAllDailyTaskIds } from '../data/daily-plan.ts';

export function renderDailyPlanPage(container: HTMLElement): void {
  const header = document.createElement('div');
  header.innerHTML = `
    <div class="page-title">2-Week Prep Plan</div>
    <div class="page-subtitle">Daily structure: listen, speak, focus on one grammar point, do one real-life task. You're training endurance and confidence, not perfection.</div>
  `;
  container.appendChild(header);

  // Overall progress
  const allIds = getAllDailyTaskIds();
  const progress = getProgress(allIds);
  const progressEl = document.createElement('div');
  progressEl.className = 'mb-md';
  renderProgressBar(progressEl, progress.done, progress.total);
  container.appendChild(progressEl);

  renderDailyPlan(container, weekPlans);
}
