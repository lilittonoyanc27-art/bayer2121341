import React, { useState } from 'react';
import { STRESS_RULES_WORDS } from './data';
import { StressWord, Dialect } from './types';
import { audioEngine } from './audioUtils';
import confetti from 'canvas-confetti';
import { Target, CheckCircle2, XCircle, Volume2, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface AccentRulesProps {
  dialect: Dialect;
  onAddXp?: (amount: number) => void;
}

export const AccentRules: React.FC<AccentRulesProps> = ({ dialect, onAddXp }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const wordObj: StressWord = STRESS_RULES_WORDS[currentWordIndex];

  const handleSelectType = (type: string) => {
    if (showResult) return;
    setSelectedType(type);
    setShowResult(true);

    if (type === wordObj.stressType) {
      setScore(prev => prev + 1);
      if (onAddXp) onAddXp(20);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextWord = () => {
    setSelectedType(null);
    setShowResult(false);
    setCurrentWordIndex(prev => (prev + 1) % STRESS_RULES_WORDS.length);
  };

  const playWord = (word: string) => {
    audioEngine.speak(word, dialect, 0.8);
  };

  return (
    <div className="space-y-6">
      
      {/* Rules Explainer Bento Card */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-2 border border-amber-500/20">
            ✍️ 3 КАНОНИЧЕСКИХ ПРАВИЛА УДАРЕНИЯ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            КУДА ПАДАЕТ УДАРЕНИЕ И КОГДА СТАВИТЬ ТИЛЬДУ (TILDE)?
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            В испанском языке правила ударения железные! По последней букве слова можно мгновенно понять, куда падает ударение, даже если вы видите слово впервые.
          </p>
        </div>

        {/* 3 Main Rule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Rule 1: Agudas */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-5 space-y-3">
            <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest block">
              1. Agudas (1-й слог от конца)
            </span>
            <h4 className="font-black text-white text-base uppercase">
              НА ПОСЛЕДНИЙ СЛОГ
            </h4>
            <p className="text-xs text-slate-300">
              Если слово оканчивается на <strong className="text-amber-400">согласную (кроме N, S)</strong>.
            </p>
            <div className="text-xs font-mono bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1 text-amber-200">
              <div>• hab-<strong>LAR</strong> (без тильды)</div>
              <div>• can-<strong>CIÓN</strong> (с тильдой, т.к. на N)</div>
            </div>
          </div>

          {/* Rule 2: Llanas */}
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-5 space-y-3">
            <span className="text-[11px] font-extrabold text-rose-400 uppercase tracking-widest block">
              2. Llanas (2-й слог от конца)
            </span>
            <h4 className="font-black text-white text-base uppercase">
              НА ПРЕДПОСЛЕДНИЙ СЛОГ
            </h4>
            <p className="text-xs text-slate-300">
              Если слово оканчивается на <strong className="text-rose-400">гласную, N или S</strong>.
            </p>
            <div className="text-xs font-mono bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1 text-rose-200">
              <div>• <strong>CA</strong>-sa (без тильды)</div>
              <div>• <strong>FÁ</strong>-cil (с тильдой, т.к. на L)</div>
            </div>
          </div>

          {/* Rule 3: Esdrújulas */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-5 space-y-3">
            <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest block">
              3. Esdrújulas (3-й слог от конца)
            </span>
            <h4 className="font-black text-white text-base uppercase">
              НА ТРЕТИЙ СЛОГ С КОНЦА
            </h4>
            <p className="text-xs text-slate-300">
              И любые более дальние слоги — <strong className="text-indigo-300">ВСЕГДА с графической тильдой!</strong>
            </p>
            <div className="text-xs font-mono bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1 text-indigo-200">
              <div>• <strong>MÚ</strong>-si-ca (с тильдой)</div>
              <div>• <strong>RÁ</strong>-pi-do (с тильдой)</div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Trainer / Quiz Bento Box */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-lg uppercase tracking-wider">ТРЕНАЖЁР УДАРЕНИЙ</h3>
          </div>
          <div className="text-xs font-extrabold bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            ПРАВИЛЬНО: {score}
          </div>
        </div>

        {/* Word Display Box */}
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-3 sm:gap-4 bg-slate-800/90 px-4 sm:px-8 py-3 sm:py-4 rounded-3xl border border-slate-700 break-words">
            <span className="text-3xl sm:text-5xl font-black text-amber-400 tracking-wider break-words max-w-full">
              {wordObj.word}
            </span>
            <button
              onClick={() => playWord(wordObj.word)}
              className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-amber-500/20 shrink-0"
              aria-label="Play audio"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-300 text-sm break-words">
            <span>Перевод: <strong className="text-white">{wordObj.translation}</strong></span>
            <span>•</span>
            <span className="font-mono text-amber-400 font-bold break-words">[{wordObj.ruPhonetic}]</span>
          </div>

          {/* Syllable Breakdown Visualizer */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 break-words">
            {wordObj.syllables.map((syl, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-2xl text-base font-mono font-black tracking-widest text-amber-300 break-words"
              >
                {syl}
              </span>
            ))}
          </div>
        </div>

        {/* Option Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'aguda', label: 'Aguda (1-й слог от конца)' },
            { id: 'llana', label: 'Llana (2-й слог от конца)' },
            { id: 'esdrujula', label: 'Esdrújula (3-й слог)' },
          ].map(opt => {
            const isSelected = selectedType === opt.id;
            const isCorrect = wordObj.stressType === opt.id;

            let btnStyle = 'bg-slate-800/80 border-slate-700 hover:border-amber-500/60 text-white';
            if (showResult) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500 border-rose-400 text-white font-black';
              }
            }

            return (
              <button
                key={opt.id}
                disabled={showResult}
                onClick={() => handleSelectType(opt.id)}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all ${btnStyle}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {showResult && (
          <div className={`p-5 rounded-3xl border ${
            selectedType === wordObj.stressType
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
              : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
          } space-y-3 animate-fadeIn`}>
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
              {selectedType === wordObj.stressType ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  СОВЕРШЕННО ВЕРНО! (+20 XP)
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  НЕ СОВСЕМ ТАК
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {wordObj.ruleExplanation}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextWord}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold uppercase tracking-wider text-xs rounded-2xl flex items-center gap-2 transition-transform hover:scale-105 shadow-md shadow-amber-500/20"
              >
                <span>СЛЕДУЮЩЕЕ СЛОВО</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
