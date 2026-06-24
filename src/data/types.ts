export interface CheckItem {
  readonly id: string;
  readonly label: string;
  readonly detail?: string;
  readonly link?: string;
}

export interface Section {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly description: string;
  readonly items: readonly CheckItem[];
}

export interface RevealCard {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly takeaway: string;
  readonly actionItem?: string;
}

export interface MindsetSection {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly intro: string;
  /** Program week (1-8) this section belongs to. Omitted = General. */
  readonly week?: number;
  readonly cards: readonly RevealCard[];
}

export type PhraseCategory =
  | 'confusion'
  | 'homestay'
  | 'classroom'
  | 'transport'
  | 'food'
  | 'emergency'
  | 'polite';

export interface Phrase {
  readonly id: string;
  readonly russian: string;
  readonly translit: string;
  readonly english: string;
  readonly category: PhraseCategory;
  readonly context?: string;
}

export interface ResourceLink {
  readonly title: string;
  readonly url: string;
  readonly description: string;
}

export interface ResourceCategory {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly links: readonly ResourceLink[];
}

export interface DailyTask {
  readonly id: string;
  readonly label: string;
  readonly duration: string;
  readonly detail?: string;
}

export interface DayPlan {
  readonly id: string;
  readonly day: number;
  readonly title: string;
  readonly goal: string;
  readonly tasks: readonly DailyTask[];
}

export interface WeekPlan {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly weekGoals: readonly string[];
  readonly days: readonly DayPlan[];
}

export interface VocabWord {
  readonly rank: number;
  readonly russian: string;
  readonly english: string;
  readonly pos: string;
  readonly notes?: string;
  /** Aspectual partner verb, e.g. "говори́ть (impf)". Empty for non-verbs. */
  readonly pair?: string;
  /** This verb's own aspect, derived from `notes` at build time. */
  readonly aspect?: 'impf' | 'pf' | 'biasp';
  /** Imperfective form of the aspect pair (this verb or its partner). */
  readonly impf?: string;
  /** Perfective form of the aspect pair (this verb or its partner). */
  readonly pf?: string;
}

export type Direction = 'ru-en' | 'en-ru';

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export interface CardSchedule {
  readonly ease: number;
  readonly intervalDays: number;
  readonly reps: number;
  readonly lapses: number;
  readonly due: string; // ISO date (YYYY-MM-DD)
}

export type ThemeName = 'golden-hour' | 'alpine-meadow';

export interface AppState {
  checked: Record<string, boolean>;
  revealed: Record<string, boolean>;
  lastVisited: string;
  theme: ThemeName;
  version: number;
}
