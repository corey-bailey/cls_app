import type { RevealCard } from '../data/types.ts';
import { toggleRevealed, isRevealed } from '../storage.ts';

export function renderRevealCard(container: HTMLElement, card: RevealCard): void {
  const el = document.createElement('div');
  el.className = `reveal-card${isRevealed(card.id) ? ' revealed' : ''}`;

  const question = document.createElement('div');
  question.className = 'reveal-question';
  question.setAttribute('role', 'button');
  question.setAttribute('aria-expanded', String(isRevealed(card.id)));
  question.textContent = card.question;

  const answer = document.createElement('div');
  answer.className = 'reveal-answer';

  let answerHtml = `<div class="reveal-answer-text">${card.answer}</div>`;
  answerHtml += `<div class="reveal-takeaway">${card.takeaway}</div>`;

  if (card.actionItem) {
    answerHtml += `<div class="reveal-answer-text mt-sm" style="font-style: italic; font-size: 13px;">\u{1F4CC} ${card.actionItem}</div>`;
  }

  answer.innerHTML = answerHtml;

  question.addEventListener('click', () => {
    const wasRevealed = isRevealed(card.id);
    if (!wasRevealed) {
      toggleRevealed(card.id);
    }
    el.classList.toggle('revealed');
    question.setAttribute('aria-expanded', String(el.classList.contains('revealed')));
  });

  el.appendChild(question);
  el.appendChild(answer);
  container.appendChild(el);
}
