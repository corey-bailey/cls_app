export function renderProgressRing(
  container: HTMLElement,
  done: number,
  total: number,
  size: number = 80,
): void {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const el = document.createElement('div');
  el.className = 'progress-ring-wrapper';
  el.innerHTML = `
    <svg class="progress-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle
        class="progress-ring-bg"
        cx="${size / 2}" cy="${size / 2}" r="${radius}"
        fill="none" stroke="var(--color-border)" stroke-width="6"
      />
      <circle
        class="progress-ring-fill"
        cx="${size / 2}" cy="${size / 2}" r="${radius}"
        fill="none" stroke="var(--color-success)" stroke-width="6"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        transform="rotate(-90 ${size / 2} ${size / 2})"
      />
    </svg>
    <span class="progress-ring-text">${pct}%</span>
  `;

  container.appendChild(el);
}

export function renderProgressBar(
  container: HTMLElement,
  done: number,
  total: number,
): void {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const el = document.createElement('div');
  el.className = 'progress-bar-wrapper';
  el.innerHTML = `
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width: ${pct}%"></div>
    </div>
    <span class="progress-bar-text">${done}/${total}</span>
  `;
  container.appendChild(el);
}
