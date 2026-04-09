import type { Phrase } from '../data/types.ts';
import { speak, stopSpeaking, hasTTSSupport } from '../tts.ts';

export function renderPhraseCard(container: HTMLElement, phrase: Phrase): void {
  const card = document.createElement('div');
  card.className = 'phrase-card';

  let html = `
    <div class="phrase-russian">${phrase.russian}</div>
    <div class="phrase-translit">${phrase.translit}</div>
    <div class="phrase-english">${phrase.english}</div>
  `;

  if (phrase.context) {
    html += `<div class="phrase-context">${phrase.context}</div>`;
  }

  if (hasTTSSupport()) {
    html += `<button class="phrase-play" aria-label="Listen to pronunciation">\u25B6 Play</button>`;
  }

  card.innerHTML = html;

  if (hasTTSSupport()) {
    const btn = card.querySelector<HTMLButtonElement>('.phrase-play')!;
    let isPlaying = false;

    btn.addEventListener('click', () => {
      if (isPlaying) {
        stopSpeaking();
        btn.classList.remove('speaking');
        btn.textContent = '\u25B6 Play';
        isPlaying = false;
        return;
      }

      speak(phrase.russian, phrase.id, {
        onStart: () => {
          btn.classList.add('speaking');
          btn.textContent = '\u25A0 Stop';
          isPlaying = true;
        },
        onEnd: () => {
          btn.classList.remove('speaking');
          btn.textContent = '\u25B6 Play';
          isPlaying = false;
        },
      });
    });
  }

  container.appendChild(card);
}
