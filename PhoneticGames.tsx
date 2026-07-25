import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from './data';
import { Dialect, QuizQuestion } from './types';
import { audioEngine } from './audioUtils';
import confetti from 'canvas-confetti';
import { Trophy, Gamepad2, Volume2, CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface PhoneticGamesProps {
  dialect: Dialect;
  onAddXp?: (amount: number) => void;
}

export const PhoneticGames: React.FC<PhoneticGamesProps> = ({ dialect, onAddXp }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      if (onAddXp) onAddXp(25);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setCurrentQuestionIndex(prev => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const playQuestionAudio = () => {
    if (question.audioText) {
      audioEngine.speak(question.audioText, dialect, 0.85);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Game Header Bento Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest border border-amber-500/20">
            <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
            ИГРОВОЙ ФОНЕТИЧЕСКИЙ РИНГ
          </div>
          <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-wider">
            <span className="bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-full shadow-md shadow-amber-500/20">
              🔥 СТРИК: {streak}
            </span>
            <span className="bg-indigo-950 text-indigo-300 border border-indigo-800 px-3.5 py-1.5 rounded-full">
              🏆 ОЧКИ: {score * 100}
            </span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          ФОНЕТИЧЕСКИЕ ИГРЫ И ВИКТОРИНЫ
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-medium">
          Проверьте свой слух и знание правил испанской фонетики в игровой форме.
        </p>
      </div>

      {/* Main Quiz Card */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
            Вопрос {currentQuestionIndex + 1} из {QUIZ_QUESTIONS.length}
          </span>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold uppercase tracking-wider"
          >
            <HelpCircle className="w-4 h-4" />
            {showHint ? 'Скрыть подсказку' : 'Подсказка'}
          </button>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200 animate-fadeIn font-medium">
            💡 <strong className="uppercase font-bold tracking-wider text-amber-400">Подсказка:</strong> {question.hintRu}
          </div>
        )}

        {/* Question Title */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug break-words">
            {question.question}
          </h3>

          {question.audioText && (
            <button
              onClick={playQuestionAudio}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-transform hover:scale-105"
            >
              <Volume2 className="w-4 h-4" />
              <span>Послушать аудио к вопросу</span>
            </button>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = question.correctIndex === idx;

            let cardStyle = 'bg-slate-800/80 border-slate-700/80 hover:border-amber-500/60 text-white';

            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-extrabold';
              } else if (isSelected) {
                cardStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-extrabold';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-sm sm:text-base font-semibold ${cardStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                  <span className="w-8 h-8 rounded-xl bg-slate-950 font-mono font-black text-xs text-amber-400 flex items-center justify-center border border-slate-800 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="break-words min-w-0">{option}</span>
                </div>

                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Explanation Footer */}
        {isAnswered && (
          <div className="bg-slate-950/80 border border-slate-800 p-5 sm:p-6 rounded-3xl space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" />
              ОБЪЯСНЕНИЕ ОТ РЕПЕТИТОРА:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {question.explanation}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-transform hover:scale-105"
              >
                <span>СЛЕДУЮЩИЙ ВОПРОС</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
