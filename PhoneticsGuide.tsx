import React, { useState } from 'react';
import { PHONETIC_RULES } from './data';
import { SoundCategory, Dialect, SoundRule } from './types';
import { audioEngine } from './audioUtils';
import { Volume2, AlertTriangle, Sparkles, Smile, Play, CheckCircle2, Info } from 'lucide-react';

interface PhoneticsGuideProps {
  dialect: Dialect;
  onMasterRule?: (ruleId: string) => void;
  masteredRules: string[];
}

export const PhoneticsGuide: React.FC<PhoneticsGuideProps> = ({
  dialect,
  onMasterRule,
  masteredRules
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory | 'all'>('all');
  const [activeRuleId, setActiveRuleId] = useState<string>(PHONETIC_RULES[0].id);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);

  const categories: { id: SoundCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Все звуки (9)' },
    { id: 'vowels', label: 'Гласные O/A/E' },
    { id: 'consonants', label: 'Твёрдые T/D/N' },
    { id: 'special_letters', label: 'Хитрые B/V, C/Z, RR, Ñ, J' },
    { id: 'sinalefa', label: 'Сцепка слов' }
  ];

  const filteredRules = selectedCategory === 'all'
    ? PHONETIC_RULES
    : PHONETIC_RULES.filter(r => r.category === selectedCategory);

  const currentRule = PHONETIC_RULES.find(r => r.id === activeRuleId) || PHONETIC_RULES[0];

  const playWordAudio = (spanishWord: string) => {
    audioEngine.speak(spanishWord, dialect, playbackSpeed);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Hero Bento Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            КЛЮЧ К ИСПАНСКОМУ АКЦЕНТУ
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
            СЕКРЕТЫ ИСПАНСКОЙ ФОНЕТИКИ
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            В испанском языке ВСЕ буквы читаются всегда одинаково! Нет сложных правил чтения как в английском, но есть ключевые отличия от русского языка: <strong className="text-amber-400 font-bold">нет редукции гласных</strong>, <strong className="text-amber-400 font-bold">твёрдые согласные перед E/I</strong> и уникальный межзубный звук.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-2xl">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Скорость озвучки:</span>
              <button
                onClick={() => setPlaybackSpeed(0.6)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${playbackSpeed === 0.6 ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
              >
                0.6x МЕДЛЕННО
              </button>
              <button
                onClick={() => setPlaybackSpeed(0.85)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${playbackSpeed === 0.85 ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
              >
                0.85x ОБЫЧНАЯ
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid Layout: Left List, Right Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sound Cards Selection Column */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-500 px-1">
            Выберите звук или правило:
          </h3>
          <div className="space-y-2.5">
            {filteredRules.map(rule => {
              const isActive = rule.id === activeRuleId;
              const isMastered = masteredRules.includes(rule.id);

              return (
                <div
                  key={rule.id}
                  onClick={() => setActiveRuleId(rule.id)}
                  className={`p-4 rounded-3xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-slate-800/90 border-amber-500/80 shadow-xl ring-1 ring-amber-500/30'
                      : 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="min-w-12 px-2 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center text-center shadow-lg shadow-amber-500/10 shrink-0 max-w-[96px] leading-tight break-words">
                        {rule.letter}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm sm:text-base break-words">
                            {rule.title}
                          </h4>
                          {isMastered && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-amber-400/90 font-mono font-semibold break-words">
                          {rule.ruTranscription} • {rule.ipa}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sound Deep Dive Detail Card */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
          
          {/* Header of Selected Rule */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 border border-slate-700">
                ФОНЕТИЧЕСКИЙ РАЗБОР
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white flex flex-wrap items-center gap-2 sm:gap-3 uppercase break-words">
                <span>{currentRule.letter}</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 break-words">
                  {currentRule.ruTranscription}
                </span>
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {currentRule.description}
              </p>
            </div>

            {onMasterRule && (
              <button
                onClick={() => onMasterRule(currentRule.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
                  masteredRules.includes(currentRule.id)
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-amber-500 hover:text-slate-950'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {masteredRules.includes(currentRule.id) ? 'ИЗУЧЕНО' : 'ИЗУЧИТЬ'}
              </button>
            )}
          </div>

          {/* Comparison with Russian Language */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              СРАВНЕНИЕ С РУССКИМ ЯЗЫКОМ:
            </div>
            <p className="text-xs sm:text-sm text-amber-200 leading-relaxed font-medium">
              {currentRule.ruComparison}
            </p>
          </div>

          {/* Russian Speaker Common Mistake Warning */}
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              ТИПИЧНАЯ ОШИБКА РУССКОГОВОРЯЩИХ:
            </div>
            <p className="text-xs sm:text-sm text-rose-200 leading-relaxed font-medium">
              {currentRule.commonMistake}
            </p>
          </div>

          {/* Mouth Position Tip */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
              <Smile className="w-4 h-4 text-indigo-400 shrink-0" />
              ПОЛОЖЕНИЕ ГУБ И ЯЗЫКА:
            </div>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium">
              {currentRule.mouthPosition}
            </p>
          </div>

          {/* Interactive Word Examples soundboard */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
              Примеры с озвучкой (Нажмите для прослушивания):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentRule.examples.map((example, idx) => (
                <div
                  key={idx}
                  onClick={() => playWordAudio(example.spanish)}
                  className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="space-y-1 min-w-0 flex-1 pr-2">
                    <div className="flex flex-wrap items-center gap-2 break-words">
                      <span className="font-black text-white text-base">
                        {example.spanish}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20 break-words">
                        [{example.ruPhonetic}]
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium break-words">
                      {example.translationRu}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-amber-500 text-amber-400 group-hover:text-slate-950 flex items-center justify-center shadow-md transition-all border border-slate-700 group-hover:border-amber-400">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
