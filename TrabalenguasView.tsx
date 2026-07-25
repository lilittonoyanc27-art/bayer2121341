import React, { useState } from 'react';
import { TONGUE_TWISTERS } from './data';
import { Dialect, TongueTwister } from './types';
import { audioEngine } from './audioUtils';
import { Play, Volume2, Sparkles, Zap, BookOpen, Flame } from 'lucide-react';

interface TrabalenguasViewProps {
  dialect: Dialect;
}

export const TrabalenguasView: React.FC<TrabalenguasViewProps> = ({ dialect }) => {
  const [activeTwisterId, setActiveTwisterId] = useState<string>(TONGUE_TWISTERS[0].id);
  const [speed, setSpeed] = useState<number>(0.8);

  const currentTwister: TongueTwister = TONGUE_TWISTERS.find(t => t.id === activeTwisterId) || TONGUE_TWISTERS[0];

  const handlePlay = (spd: number) => {
    setSpeed(spd);
    audioEngine.speak(currentTwister.spanishText, dialect, spd);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Header Bento Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest border border-amber-500/20">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          ТРЕНИРОВКА ДИКЦИИ И ЯЗЫКА
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          ИСПАНСКИЕ СКОРОГОВОРКИ (TRABALENGUAS)
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-medium">
          Скороговорки — лучшая гимнастика для артикуляционного аппарата. Они помогают отработать раскатистый [RR], твёрдый [T] и глубокий [Jota].
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Twister Selection Column */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-500 px-1">
            Выберите скороговорку:
          </h3>
          <div className="space-y-2.5">
            {TONGUE_TWISTERS.map(item => {
              const isActive = item.id === activeTwisterId;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTwisterId(item.id)}
                  className={`p-4 rounded-3xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-slate-800/90 border-amber-500/80 shadow-xl ring-1 ring-amber-500/30'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {item.titleRu}
                      </h4>
                      <p className="text-xs text-amber-400 font-semibold mt-0.5">
                        Звук: {item.focusSound}
                      </p>
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl shrink-0 ${
                      item.difficulty === 'Легко'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : item.difficulty === 'Средне'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Twister Practice Studio */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                Целевой звук: {currentTwister.focusSound}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-3.5 py-1 rounded-full border border-slate-700">
                Сложность: {currentTwister.difficulty}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug bg-slate-950/80 p-6 rounded-3xl border border-slate-800 text-amber-300 tracking-wide break-words max-w-full">
              "{currentTwister.spanishText}"
            </h3>
          </div>

          {/* Russian Phonetics & Translation */}
          <div className="space-y-3 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Русская фонетическая транскрипция:</span>
              <p className="font-mono font-bold text-amber-400 mt-1 leading-relaxed text-sm break-words break-all sm:break-words">
                [{currentTwister.ruPhonetic}]
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Перевод на русский:</span>
              <p className="text-slate-300 italic mt-0.5 font-medium break-words">
                "{currentTwister.translationRu}"
              </p>
            </div>
          </div>

          {/* Tip Box */}
          <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2.5">
            <Flame className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-indigo-300 uppercase tracking-wider text-[11px] block mb-0.5">Совет по артикуляции:</strong>
              <span className="font-medium">{currentTwister.tips}</span>
            </div>
          </div>

          {/* Speed Controls */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
              Послушать с разной скоростью:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handlePlay(0.5)}
                className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
              >
                <Play className="w-3.5 h-3.5" />
                0.5x МЕДЛЕННО
              </button>
              <button
                onClick={() => handlePlay(0.8)}
                className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
              >
                <Play className="w-3.5 h-3.5" />
                0.8x УЧЕБНЫЙ
              </button>
              <button
                onClick={() => handlePlay(1.1)}
                className="py-3 px-4 rounded-2xl bg-amber-500 text-slate-950 font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
              >
                <Zap className="w-3.5 h-3.5" />
                1.1x СПРИНТ
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
