import type { AppState, ThemeName } from './data/types.ts';

const STORAGE_KEY = 'cls_app_state';
const CURRENT_VERSION = 2;

function defaultState(): AppState {
  return {
    checked: {},
    revealed: {},
    lastVisited: 'home',
    theme: 'golden-hour',
    version: CURRENT_VERSION,
  };
}

function migrateState(parsed: Record<string, unknown>): AppState {
  const base = defaultState();
  return {
    ...base,
    checked: (parsed.checked as Record<string, boolean>) ?? {},
    revealed: (parsed.revealed as Record<string, boolean>) ?? {},
    lastVisited: (parsed.lastVisited as string) ?? 'home',
    theme: (parsed.theme as ThemeName) ?? 'golden-hour',
  };
}

export function getState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (parsed.version !== CURRENT_VERSION) {
      const migrated = migrateState(parsed);
      saveState(migrated);
      return migrated;
    }
    return parsed as unknown as AppState;
  } catch {
    return defaultState();
  }
}

function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function toggleItem(id: string): boolean {
  const state = getState();
  const next = !state.checked[id];
  const newState: AppState = {
    ...state,
    checked: { ...state.checked, [id]: next },
  };
  saveState(newState);
  return next;
}

export function isChecked(id: string): boolean {
  return getState().checked[id] === true;
}

export function toggleRevealed(id: string): boolean {
  const state = getState();
  const next = !state.revealed[id];
  const newState: AppState = {
    ...state,
    revealed: { ...state.revealed, [id]: next },
  };
  saveState(newState);
  return next;
}

export function isRevealed(id: string): boolean {
  return getState().revealed[id] === true;
}

export function setLastVisited(page: string): void {
  const state = getState();
  saveState({ ...state, lastVisited: page });
}

export function getProgress(itemIds: readonly string[]): { done: number; total: number } {
  const state = getState();
  const done = itemIds.filter((id) => state.checked[id] === true).length;
  return { done, total: itemIds.length };
}

export function getRevealProgress(cardIds: readonly string[]): { done: number; total: number } {
  const state = getState();
  const done = cardIds.filter((id) => state.revealed[id] === true).length;
  return { done, total: cardIds.length };
}

export function getTheme(): ThemeName {
  return getState().theme;
}

export function setTheme(theme: ThemeName): void {
  const state = getState();
  saveState({ ...state, theme });
  applyTheme(theme);
}

export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute('data-theme', theme);
}
