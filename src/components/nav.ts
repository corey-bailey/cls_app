import { currentRoute, navigate } from '../router.ts';

interface Tab {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

const tabs: readonly Tab[] = [
  { id: 'home', label: 'Home', icon: '&#9750;' },
  { id: 'plan', label: '14-Day', icon: '&#128197;' },
  { id: 'prep', label: 'Prep', icon: '&#9745;' },
  { id: 'phrases', label: 'Phrases', icon: '&#128172;' },
  { id: 'mindset', label: 'Mindset', icon: '&#129504;' },
];

export function renderNav(container: HTMLElement): void {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.setAttribute('role', 'tablist');

  for (const tab of tabs) {
    const btn = document.createElement('button');
    btn.className = 'nav-tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', tab.label);
    btn.dataset.route = tab.id;

    if (currentRoute() === tab.id) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }

    btn.innerHTML = `
      <span class="nav-icon">${tab.icon}</span>
      <span class="nav-label">${tab.label}</span>
    `;

    btn.addEventListener('click', () => {
      navigate(tab.id);
      updateActiveTab(nav);
    });

    nav.appendChild(btn);
  }

  container.appendChild(nav);

  window.addEventListener('hashchange', () => updateActiveTab(nav));
}

function updateActiveTab(nav: HTMLElement): void {
  const route = currentRoute();
  for (const btn of nav.querySelectorAll<HTMLButtonElement>('.nav-tab')) {
    const isActive = btn.dataset.route === route;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  }
}
