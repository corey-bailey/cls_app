import type { AppState } from './data/types.ts';

const STORAGE_KEY = 'cls_app_state';
const CURRENT_VERSION = 1;

function defaultState(): AppState {
  return {
    checked: {},
    revealed: {},
    lastVisited: 'home',
    version: CURRENT_VERSION,
  };
}

export function getState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.version !== CURRENT_VERSION) return defaultState();
    return parsed;
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
