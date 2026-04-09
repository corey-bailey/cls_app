import type { WeekPlan } from '../data/types.ts';
import { toggleItem, isChecked, getProgress } from '../storage.ts';

export function renderDailyPlan(container: HTMLElement, weekPlans: readonly WeekPlan[]): void {
  for (const week of weekPlans) {
    // Week header
    const weekHeader = document.createElement('div');
    weekHeader.className = 'reveal-section';
    weekHeader.innerHTML = `
      <div class="reveal-section-title">${week.icon} ${week.title}</div>
    `;

    // Week goals
    const goalsEl = document.createElement('div');
    goalsEl.className = 'week-goals';
    goalsEl.innerHTML = week.weekGoals
      .map((g) => `<div class="week-goal-item">\u{1F3AF} ${g}</div>`)
      .join('');
    weekHeader.appendChild(goalsEl);

    container.appendChild(weekHeader);

    // Days
    for (const day of week.days) {
      const allTaskIds = day.tasks.map((t) => t.id);
      const { done, total } = getProgress(allTaskIds);

      const card = document.createElement('div');
      card.className = 'section-card';

      // Day header
      const header = document.createElement('div');
      header.className = 'section-header';
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', 'false');
      header.innerHTML = `
        <span class="day-number">Day ${day.day}</span>
        <span class="section-title">${day.title}</span>
        <span class="section-count" data-day="${day.id}">${done}/${total}</span>
        <span class="section-chevron">\u25B6</span>
      `;

      header.addEventListener('click', () => {
        card.classList.toggle('expanded');
        header.setAttribute('aria-expanded', String(card.classList.contains('expanded')));
      });

      card.appendChild(header);

      // Day goal
      const goalEl = document.createElement('div');
      goalEl.className = 'section-items';

      const goalBanner = document.createElement('div');
      goalBanner.className = 'day-goal';
      goalBanner.textContent = day.goal;
      goalEl.appendChild(goalBanner);

      // Tasks
      for (const task of day.tasks) {
        const taskEl = document.createElement('div');
        taskEl.className = `check-item${isChecked(task.id) ? ' done' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked(task.id);
        checkbox.setAttribute('aria-label', task.label);

        const labelWrap = document.createElement('div');
        labelWrap.className = 'check-label';

        const labelText = document.createElement('span');
        labelText.textContent = task.label;
        labelWrap.appendChild(labelText);

        const duration = document.createElement('span');
        duration.className = 'task-duration';
        duration.textContent = task.duration;
        labelWrap.appendChild(duration);

        if (task.detail) {
          const detail = document.createElement('div');
          detail.className = 'check-detail';
          detail.textContent = task.detail;
          labelWrap.appendChild(detail);
        }

        const handleToggle = (): void => {
          const checked = toggleItem(task.id);
          checkbox.checked = checked;
          taskEl.classList.toggle('done', checked);
          // Update day count
          const { done: newDone, total: newTotal } = getProgress(allTaskIds);
          const countEl = container.querySelector(`[data-day="${day.id}"]`);
          if (countEl) countEl.textContent = `${newDone}/${newTotal}`;
        };

        checkbox.addEventListener('change', handleToggle);
        labelText.addEventListener('click', handleToggle);
        labelText.style.cursor = 'pointer';

        taskEl.appendChild(checkbox);
        taskEl.appendChild(labelWrap);
        goalEl.appendChild(taskEl);
      }

      card.appendChild(goalEl);
      container.appendChild(card);
    }
  }
}
