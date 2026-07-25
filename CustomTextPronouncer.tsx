import React, { useState } from 'react';
import { Dialect } from './types';
import { audioEngine, generateSpanishToRussianPhonetic } from './audioUtils';
import { Volume2, Sparkles, BookOpen, Sliders, Type, Play, RotateCcw } from 'lucide-react';

interface CustomTextPronouncerProps {
  dialect: Dialect;
}

export const CustomTextPronouncer: React.FC<CustomTextPronouncerProps> = ({ dialect }) => {
  const [inputText, setInputText] = useState<string>('Hola, ¿cómo estás? Me llamo Carlos.');
  const [rate, setRate] = useState<number>(0.85);
  const [pitch, setPitch] = useState<number>(1.0);

  const phoneticResult = generateSpanishToRussianPhonetic(inputText, dialect);

  const handleSpeak = () => {
    if (!inputText.trim()) return;
    audioEngine.speak(inputText, dialect, rate, pitch);
  };

  const samplePhrases = [
    'Hola, ¿cómo estás?',
    'Me llamo Alejandro y vivo в Испании',
    '¿Dónde está el baño?',
    'Una cerveza por favor',
    'Hasta la vista, baby',
    'Cerveza con limón'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner Bento Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-extrabold uppercase tracking-widest border border-amber-500/20">
          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
          МГНОВЕННАЯ ТРАНСКРИПЦИЯ
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          ФОНЕТИЧЕСКИЙ ТРАНСКРИПТОР ИСПАНСКИХ ТЕКСТОВ
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-medium">
          Введите любой испанский текст или фразу! Приложение мгновенно переведёт его в русскую фонетическую транскрипцию с учётом всех правил чтения и ударений.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Input & Controls Column */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-amber-500 flex items-center gap-2">
              <Type className="w-4 h-4 text-amber-500" />
              Введите испанский текст:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              placeholder="Введите слово или фразу на испанском..."
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-amber-500/80 focus:outline-none text-white font-medium text-base resize-none"
            />
          </div>

          {/* Quick Preset Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Попробуйте готовые фразы:
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePhrases.map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(phrase)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold transition-all border border-slate-700"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Speech Control Sliders */}
          <div className="pt-2 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                Настройка голоса
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rate */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>Скорость темпа:</span>
                  <span className="font-extrabold text-amber-400">{rate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.2"
                  step="0.05"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Pitch */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>Высота тона:</span>
                  <span className="font-extrabold text-amber-400">{pitch}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <button
              onClick={handleSpeak}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.01]"
            >
              <Volume2 className="w-6 h-6" />
              <span>Озвучить текстом носителя ({dialect})</span>
            </button>
          </div>

        </div>

        {/* Phonetic Output Column */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
              РЕЗУЛЬТАТ РАЗБОРА:
            </span>
            <h3 className="text-xl font-black text-white mt-1 uppercase">
              Русская фонетическая запись
            </h3>
          </div>

          {/* Rendered Russian Phonetics */}
          <div className="bg-slate-950/90 p-6 rounded-3xl border border-slate-800 text-white space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              Транскрипция для русскоязычных:
            </span>
            <p className="text-xl sm:text-2xl font-mono font-black text-amber-300 leading-relaxed break-words break-all sm:break-words">
              {phoneticResult.ruText || '[Введите текст]'}
            </p>
          </div>

          {/* Detected Rules Chips */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Применённые фонетические правила:
            </span>
            {phoneticResult.rulesApplied.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {phoneticResult.rulesApplied.map((rule, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700"
                  >
                    • {rule}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic font-medium">
                Введите текст с испанскими буквами (ñ, j, z, ll, rr и др.), чтобы увидеть правила.
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
