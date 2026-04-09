import { navigate } from '../router.ts';
import { renderProgressRing } from '../components/progress-bar.ts';
import { getProgress, getRevealProgress, getTheme, setTheme } from '../storage.ts';
import { getAllCheckItemIds } from '../data/sections.ts';
import { getAllRevealCardIds } from '../data/mindset.ts';
import { getAllDailyTaskIds } from '../data/daily-plan.ts';
import type { ThemeName } from '../data/types.ts';

export function renderHome(container: HTMLElement): void {
  // Header
  const header = document.createElement('div');
  header.className = 'home-header';
  header.innerHTML = `
    <div class="home-title">CLS Bishkek Prep</div>
    <div class="home-subtitle">You're already in \u2014 now it's about mindset + consistency.</div>
  `;
  container.appendChild(header);

  // Progress
  const allCheckIds = getAllCheckItemIds();
  const allRevealIds = getAllRevealCardIds();
  const allDailyIds = getAllDailyTaskIds();
  const checkProgress = getProgress(allCheckIds);
  const revealProgress = getRevealProgress(allRevealIds);
  const dailyProgress = getProgress(allDailyIds);
  const totalDone = checkProgress.done + revealProgress.done + dailyProgress.done;
  const totalItems = checkProgress.total + revealProgress.total + dailyProgress.total;

  const progressSection = document.createElement('div');
  progressSection.className = 'home-progress';
  renderProgressRing(progressSection, totalDone, totalItems, 100);
  container.appendChild(progressSection);

  // Quick links
  const links = document.createElement('div');
  links.className = 'quick-links';

  const quickLinkData = [
    {
      icon: '\u{1F4C5}',
      label: '14-Day Plan',
      sub: `${dailyProgress.done}/${dailyProgress.total} tasks`,
      route: 'plan',
    },
    {
      icon: '\u{1F4CB}',
      label: 'Pre-Departure',
      sub: `${checkProgress.done}/${checkProgress.total} items`,
      route: 'prep',
    },
    {
      icon: '\u{1F4AC}',
      label: 'Survival Phrases',
      sub: '50 essential phrases',
      route: 'phrases',
    },
    {
      icon: '\u{1F9E0}',
      label: 'Mindset Guide',
      sub: `${revealProgress.done}/${revealProgress.total} explored`,
      route: 'mindset',
    },
  ];

  for (const ql of quickLinkData) {
    const btn = document.createElement('button');
    btn.className = 'quick-link';
    btn.innerHTML = `
      <div class="quick-link-icon">${ql.icon}</div>
      <div class="quick-link-label">${ql.label}</div>
      <div class="quick-link-sub">${ql.sub}</div>
    `;
    btn.addEventListener('click', () => navigate(ql.route));
    links.appendChild(btn);
  }

  container.appendChild(links);

  // Motivation quote
  const quote = document.createElement('div');
  quote.className = 'card mt-md';
  quote.innerHTML = `
    <div style="font-size: 14px; color: var(--color-text-muted); line-height: 1.6;">
      <strong style="color: var(--color-text);">From CLS alumni:</strong><br>
      "The students who benefit most are not the best prepared. They are the ones who keep talking even when it feels uncomfortable."
    </div>
  `;
  container.appendChild(quote);

  // Theme switcher
  renderThemeSwitcher(container);
}

function renderThemeSwitcher(container: HTMLElement): void {
  const currentTheme = getTheme();

  const wrapper = document.createElement('div');
  wrapper.className = 'mt-md';
  wrapper.innerHTML = `
    <div style="font-size: 13px; font-weight: 700; color: var(--color-text-muted); margin-bottom: 8px;">Theme</div>
  `;

  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';

  const themes: { id: ThemeName; label: string; desc: string; swatchClass: string }[] = [
    { id: 'golden-hour', label: 'Golden Hour', desc: 'Amber warmth', swatchClass: 'theme-swatch-golden' },
    { id: 'alpine-meadow', label: 'Alpine Meadow', desc: 'Sage calm', swatchClass: 'theme-swatch-sage' },
  ];

  for (const theme of themes) {
    const btn = document.createElement('button');
    btn.className = `theme-option${currentTheme === theme.id ? ' active' : ''}`;
    btn.innerHTML = `
      <div class="theme-swatch ${theme.swatchClass}"></div>
      <div>
        <div class="theme-option-label">${theme.label}</div>
        <div class="theme-option-desc">${theme.desc}</div>
      </div>
    `;

    btn.addEventListener('click', () => {
      setTheme(theme.id);
      for (const b of switcher.querySelectorAll('.theme-option')) {
        b.classList.remove('active');
      }
      btn.classList.add('active');
    });

    switcher.appendChild(btn);
  }

  wrapper.appendChild(switcher);
  container.appendChild(wrapper);
}
