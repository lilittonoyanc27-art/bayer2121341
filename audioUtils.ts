import { Dialect } from './types';

// SpeechRecognition global types declaration for TypeScript
/* eslint-disable @typescript-eslint/no-explicit-any */
type SpeechRecognitionType = any;
type SpeechRecognitionEventType = any;
type SpeechRecognitionErrorEventType = any;

// Web Speech Synthesis wrapper
export class PhoneticsAudioEngine {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  private currentVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer Spanish voice
    const esVoice = voices.find(v => v.lang.startsWith('es-ES')) || 
                    voices.find(v => v.lang.startsWith('es')) || 
                    voices[0];
    this.currentVoice = esVoice || null;
  }

  public speak(text: string, dialect: Dialect = 'es-ES', rate: number = 0.85, pitch: number = 1.0) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.synth.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = dialect;
    utterance.rate = Math.max(0.4, Math.min(1.5, rate));
    utterance.pitch = Math.max(0.5, Math.min(1.5, pitch));

    const voices = this.synth.getVoices();
    const selectedVoice = voices.find(v => v.lang === dialect) || 
                          voices.find(v => v.lang.startsWith(dialect.split('-')[0])) || 
                          this.currentVoice;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const audioEngine = new PhoneticsAudioEngine();

// Speech Recognition helper with score evaluation
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  score: number; // 0 - 100
  feedbackRu: string;
}

export function startSpanishSpeechRecognition(
  dialect: Dialect,
  targetWord: string,
  onResult: (res: SpeechRecognitionResult) => void,
  onError: (err: string) => void
): { stop: () => void } {
  const windowObj = window as unknown as { SpeechRecognition?: SpeechRecognitionType; webkitSpeechRecognition?: SpeechRecognitionType };
  const SpeechRecognitionClass = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    onError('Ваш браузер не поддерживает распознавание речи. Используйте Chrome или Edge.');
    return { stop: () => {} };
  }

  const recognition = new SpeechRecognitionClass();
  recognition.lang = dialect;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: SpeechRecognitionEventType) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    const confidence = event.results[0][0].confidence || 0.85;

    const targetClean = targetWord.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim();
    const recognizedClean = transcript.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim();

    // Distance metric
    const distance = levenshteinDistance(targetClean, recognizedClean);
    const maxLen = Math.max(targetClean.length, recognizedClean.length) || 1;
    let similarity = Math.max(0, 1 - distance / maxLen);

    if (recognizedClean === targetClean) {
      similarity = 1.0;
    }

    let score = Math.round(similarity * 100);
    if (score > 90) score = 100;

    let feedbackRu = 'Отлично! Чистое испанское произношение!';
    if (score < 60) {
      feedbackRu = `Распознано как "${transcript}". Попробуйте четче произносить гласные и твёрдые согласные.`;
    } else if (score < 85) {
      feedbackRu = `Хорошо (${score}%), но обратите внимание на ударный слог и чёткость звуков.`;
    }

    onResult({
      transcript,
      confidence,
      score,
      feedbackRu
    });
  };

  recognition.onerror = (e: SpeechRecognitionErrorEventType) => {
    if (e.error === 'no-speech') {
      onError('Звук не обнаружен. Попробуйте говорить громче и ближе к микрофону.');
    } else if (e.error === 'not-allowed') {
      onError('Доступ к микрофону заблокирован в настройках браузера.');
    } else {
      onError(`Ошибка микрофона: ${e.error}`);
    }
  };

  recognition.start();

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {
        console.error(e);
      }
    }
  };
}

// Simple Levenshtein distance calculation for similarity score
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Dynamic Spanish -> Russian Phonetic Transliteration Engine
export function generateSpanishToRussianPhonetic(spanishText: string, dialect: Dialect = 'es-ES'): {
  ruText: string;
  stressedWordHtml: string;
  rulesApplied: string[];
} {
  const words = spanishText.split(/\s+/);
  const processedWords: string[] = [];
  const rulesAppliedSet = new Set<string>();

  words.forEach(word => {
    if (!word) return;
    const cleanWord = word.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g, '').toLowerCase();
    if (!cleanWord) {
      processedWords.push(word);
      return;
    }

    let ruPhonetic = cleanWord;

    // H is silent
    if (ruPhonetic.includes('h')) {
      rulesAppliedSet.add('Немая H (hache es muda)');
      ruPhonetic = ruPhonetic.replace(/h/g, '');
    }

    // RR
    if (ruPhonetic.includes('rr')) {
      rulesAppliedSet.add('Раскатистый [РР]');
      ruPhonetic = ruPhonetic.replace(/rr/g, 'РР');
    }

    // Ñ
    if (ruPhonetic.includes('ñ')) {
      rulesAppliedSet.add('Буква Ñ [НЬ]');
      ruPhonetic = ruPhonetic.replace(/ñ/g, 'нь');
    }

    // LL
    if (ruPhonetic.includes('ll')) {
      rulesAppliedSet.add('Yeísmo LL [ЙЬ/Й]');
      if (dialect === 'es-AR') {
        ruPhonetic = ruPhonetic.replace(/ll/g, 'ш');
      } else {
        ruPhonetic = ruPhonetic.replace(/ll/g, 'йь');
      }
    }

    // J and G before e, i
    if (ruPhonetic.includes('j')) {
      rulesAppliedSet.add('Jota J [Х]');
      ruPhonetic = ruPhonetic.replace(/j/g, 'х');
    }
    ruPhonetic = ruPhonetic.replace(/ge/g, 'хе').replace(/gi/g, 'хи');

    // C before e, i & Z
    if (dialect === 'es-ES') {
      if (ruPhonetic.includes('ce') || ruPhonetic.includes('ci') || ruPhonetic.includes('z')) {
        rulesAppliedSet.add('Межзубная C/Z [θ]');
      }
      ruPhonetic = ruPhonetic.replace(/ce/g, 'θе').replace(/ci/g, 'θи').replace(/z/g, 'θ');
    } else {
      ruPhonetic = ruPhonetic.replace(/ce/g, 'се').replace(/ci/g, 'си').replace(/z/g, 'с');
    }

    // CH
    ruPhonetic = ruPhonetic.replace(/ch/g, 'ч');

    // QU
    ruPhonetic = ruPhonetic.replace(/que/g, 'ке').replace(/qui/g, 'ки');

    // GU
    ruPhonetic = ruPhonetic.replace(/gue/g, 'ге').replace(/gui/g, 'ги');

    // C elsewhere = K
    ruPhonetic = ruPhonetic.replace(/c/g, 'к');

    // G elsewhere = G
    ruPhonetic = ruPhonetic.replace(/g/g, 'г');

    // V/B
    ruPhonetic = ruPhonetic.replace(/v/g, 'б');

    // General vowel replacement
    ruPhonetic = ruPhonetic
      .replace(/á/g, 'А́')
      .replace(/é/g, 'Э́')
      .replace(/í/g, 'И́')
      .replace(/ó/g, 'О́')
      .replace(/ú/g, 'У́')
      .replace(/a/g, 'а')
      .replace(/e/g, 'э')
      .replace(/i/g, 'и')
      .replace(/o/g, 'о')
      .replace(/u/g, 'у')
      .replace(/y/g, 'й');

    processedWords.push(`[${ruPhonetic}]`);
  });

  return {
    ruText: processedWords.join(' '),
    stressedWordHtml: spanishText,
    rulesApplied: Array.from(rulesAppliedSet)
  };
}
