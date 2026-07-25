export type Dialect = 'es-ES' | 'es-MX' | 'es-AR';

export type SoundCategory = 'vowels' | 'consonants' | 'diphthongs' | 'special_letters' | 'sinalefa';

export interface SoundRule {
  id: string;
  letter: string;
  ipa: string;
  ruTranscription: string; // Russian friendly phonetic sound, e.g. [с-межзубный] or [ррр]
  title: string;
  category: SoundCategory;
  description: string;
  ruComparison: string; // Comparison with Russian language phonetics
  commonMistake: string; // What Russian speakers usually do wrong (e.g. reduction of 'O' to 'A')
  mouthPosition: string; // Tips on lips/tongue placement
  examples: {
    spanish: string;
    translationRu: string;
    ruPhonetic: string; // e.g. [пе́рро]
    stressIndex?: number; // character index of stressed vowel
  }[];
}

export type StressType = 'aguda' | 'llana' | 'esdrujula' | 'sobresdrujula';

export interface StressWord {
  id: string;
  word: string;
  cleanWord: string; // without tilde if testing
  translation: string;
  ruPhonetic: string;
  stressType: StressType;
  stressedSyllableIndex: number; // 0-based syllable index from end or start
  syllables: string[];
  stressedSyllableNum: number; // 1-based from right: 1=aguda, 2=llana, 3=esdrujula
  ruleExplanation: string;
  hasTilde: boolean;
}

export interface TongueTwister {
  id: string;
  titleRu: string;
  spanishText: string;
  translationRu: string;
  ruPhonetic: string;
  difficulty: 'Легко' | 'Средне' | 'Хардкор';
  focusSound: string;
  tips: string;
}

export interface QuizQuestion {
  id: string;
  type: 'sound_identification' | 'stress_identify' | 'ru_mistake_check' | 'audio_listen';
  question: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hintRu: string;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  completedRules: string[];
  masteredWords: string[];
  gamesPlayed: number;
  highScore: number;
}
