let russianVoice: SpeechSynthesisVoice | null = null;
let voiceLoaded = false;
let currentAudio: HTMLAudioElement | null = null;

function findRussianVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'ru-RU') ??
    voices.find((v) => v.lang.startsWith('ru')) ??
    null
  );
}

function ensureVoice(): void {
  if (voiceLoaded) return;
  russianVoice = findRussianVoice();
  voiceLoaded = true;
}

export function initTTS(): void {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.onvoiceschanged = () => {
    russianVoice = findRussianVoice();
    voiceLoaded = true;
  };
  ensureVoice();
}

function speakWithSynthesis(text: string): void {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  ensureVoice();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.8;
  if (russianVoice) {
    utterance.voice = russianVoice;
  }
  speechSynthesis.speak(utterance);
}

export interface PlaybackCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
}

export function speak(text: string, phraseId?: string, callbacks?: PlaybackCallbacks): void {
  stopSpeaking();

  if (phraseId) {
    const audio = new Audio(`/audio/${phraseId}.mp3`);
    audio.playbackRate = 0.9;
    currentAudio = audio;

    audio.addEventListener('playing', () => callbacks?.onStart?.());
    audio.addEventListener('ended', () => {
      currentAudio = null;
      callbacks?.onEnd?.();
    });
    audio.addEventListener('error', () => {
      currentAudio = null;
      // Fallback to browser TTS
      speakWithSynthesis(text);
      callbacks?.onStart?.();
      setTimeout(() => callbacks?.onEnd?.(), 2000);
    });

    audio.play().catch(() => {
      currentAudio = null;
      speakWithSynthesis(text);
      callbacks?.onStart?.();
      setTimeout(() => callbacks?.onEnd?.(), 2000);
    });
    return;
  }

  speakWithSynthesis(text);
  callbacks?.onStart?.();
  setTimeout(() => callbacks?.onEnd?.(), 2000);
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.cancel();
  }
}

export function hasTTSSupport(): boolean {
  return typeof speechSynthesis !== 'undefined' || typeof Audio !== 'undefined';
}
