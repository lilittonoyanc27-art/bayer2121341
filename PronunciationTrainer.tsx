import React, { useState } from 'react';
import { Dialect } from './types';
import { audioEngine, startSpanishSpeechRecognition, SpeechRecognitionResult } from './audioUtils';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Volume2, Sparkles, RefreshCw, AlertCircle, CheckCircle2, Award, VolumeX } from 'lucide-react';

interface PronunciationTrainerProps {
  dialect: Dialect;
  onAddXp?: (amount: number) => void;
}

const PRACTICE_WORDS = [
  { word: 'Ferrocarril', translation: 'Железная дорога', targetSound: 'Раскатистый RR', ruPhonetic: 'фе-рро-ка-рр-и́ль' },
  { word: 'Zapato', translation: 'Туфля', targetSound: 'Межзубный [θ]', ruPhonetic: 'θа-па́-то' },
  { word: 'Español', translation: 'Испанский язык', targetSound: 'Буква Ñ [НЬ]', ruPhonetic: 'эс-па-ньо́ль' },
  { word: 'Cerveza', translation: 'Пиво', targetSound: 'Одинаковые B/V и C/Z', ruPhonetic: 'сэр-бэ́-са / θэр-βэ́-θа' },
  { word: 'Trabajo', translation: 'Работа', targetSound: 'Хриплая Jota [Х]', ruPhonetic: 'тра-ба́-хо' },
  { word: 'Buenos días', translation: 'Доброе утро', targetSound: 'Синалефа и B/V', ruPhonetic: 'бвэ́-нос ды́-ас' },
  { word: 'Маñana', translation: 'Завтра / утро', targetSound: 'Четкие гласные A, O', ruPhonetic: 'ма-нья́-на' },
  { word: 'Despacito', translation: 'Медленно', targetSound: 'Твёрдая T без смягчения', ruPhonetic: 'дес-па-сы́-то' }
];

export const PronunciationTrainer: React.FC<PronunciationTrainerProps> = ({ dialect, onAddXp }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognitionResult, setRecognitionResult] = useState<SpeechRecognitionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeStopFn, setActiveStopFn] = useState<(() => void) | null>(null);

  const currentItem = PRACTICE_WORDS[selectedIndex];

  const handlePlayAudio = () => {
    audioEngine.speak(currentItem.word, dialect, 0.8);
  };

  const handleStartRecording = () => {
    setErrorMessage(null);
    setRecognitionResult(null);
    setIsListening(true);

    const handleResult = (res: SpeechRecognitionResult) => {
      setIsListening(false);
      setRecognitionResult(res);

      if (res.score >= 80) {
        if (onAddXp) onAddXp(30);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    const handleError = (err: string) => {
      setIsListening(false);
      setErrorMessage(err);
    };

    const { stop } = startSpanishSpeechRecognition(dialect, currentItem.word, handleResult, handleError);
    setActiveStopFn(() => stop);
  };

  const handleStopRecording = () => {
    if (activeStopFn) {
      activeStopFn();
    }
    setIsListening(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header Bento Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest border border-amber-500/20">
          <Mic className="w-3.5 h-3.5 text-amber-500" />
          ИНТЕРАКТИВНЫЙ МИКРОФОННЫЙ АНАЛИЗ
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          ГОЛОСОВОЙ ТРЕНАЖЁР ПРОИЗНОШЕНИЯ
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-medium">
          Произнесите слово в микрофон. Алгоритм распознавания речи сразу оценит правильность испанского произношения и поставит вам оценку в процентах!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Word Selectors Column */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-500 px-1">
            Выберите слово для тренировки:
          </h3>
          <div className="space-y-2.5">
            {PRACTICE_WORDS.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setRecognitionResult(null);
                    setErrorMessage(null);
                  }}
                  className={`p-4 rounded-3xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/80 shadow-xl ring-1 ring-amber-500/30'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 min-w-0">
                    <div className="min-w-0 flex-1 pr-1">
                      <h4 className="font-bold text-white text-base break-words">
                        {item.word}
                      </h4>
                      <p className="text-xs text-slate-400 break-words">
                        {item.translation} • <span className="font-mono text-amber-400 font-bold break-words">[{item.ruPhonetic}]</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-xl border border-amber-500/20 shrink-0">
                      {item.targetSound}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Studio Recorder Box */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
              ЦЕЛЕВОЕ СЛОВО:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 break-words">
              <h2 className="text-2xl sm:text-5xl font-black text-white uppercase tracking-wide break-words max-w-full text-center">
                {currentItem.word}
              </h2>
              <button
                onClick={handlePlayAudio}
                className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-amber-500/20 shrink-0"
                title="Послушать эталонное произношение"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="bg-slate-800 px-3.5 py-1.5 rounded-2xl font-mono text-amber-400 font-bold border border-slate-700">
                [{currentItem.ruPhonetic}]
              </span>
              <span className="bg-slate-800 px-3.5 py-1.5 rounded-2xl font-bold text-slate-300 border border-slate-700">
                Перевод: {currentItem.translation}
              </span>
            </div>
          </div>

          {/* Record Control Button & Wave Animation */}
          <div className="flex flex-col items-center justify-center py-6 space-y-4 bg-slate-950/80 rounded-3xl border border-slate-800 p-6">
            
            {isListening ? (
              <div className="space-y-4 text-center">
                <div className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center animate-pulse shadow-xl shadow-amber-500/30">
                  <Mic className="w-8 h-8 animate-bounce" />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  СЛУШАЕМ ВАШЕ ПРОИЗНОШЕНИЕ... ГОВОРИТЕ!
                </p>
                <button
                  onClick={handleStopRecording}
                  className="px-4 py-2 bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-700 border border-slate-700"
                >
                  ОСТАНОВИТЬ
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-center">
                <button
                  onClick={handleStartRecording}
                  className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform group"
                >
                  <Mic className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  НАЖМИТЕ КНОПКУ И ПРОИЗНЕСИТЕ СЛОВО
                </p>
              </div>
            )}

            {/* Error state */}
            {errorMessage && (
              <div className="w-full bg-rose-950/80 border border-rose-500/60 p-3.5 rounded-2xl flex items-center gap-2 text-rose-200 text-xs font-medium">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

          </div>

          {/* Recognition Result Card */}
          {recognitionResult && (
            <div className={`p-6 rounded-3xl border space-y-4 animate-fadeIn ${
              recognitionResult.score >= 80
                ? 'bg-emerald-950/80 border-emerald-500/60'
                : 'bg-amber-950/80 border-amber-500/60'
            }`}>
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className={`w-6 h-6 ${recognitionResult.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <span className="font-black text-white text-base uppercase tracking-wider">
                    Оценка произношения:
                  </span>
                </div>
                <span className={`text-3xl font-black ${
                  recognitionResult.score >= 80 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {recognitionResult.score}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Распознано речи:</span>
                  <p className="font-extrabold text-white text-sm">
                    "{recognitionResult.transcript}"
                  </p>
                </div>
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Точность:</span>
                  <p className="font-extrabold text-white text-sm">
                    {recognitionResult.score >= 80 ? '🌟 Отлично! (+30 XP)' : '👍 Хорошая попытка!'}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {recognitionResult.feedbackRu}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
