import React from 'react';
import { Dialect, UserStats } from './types';
import { Volume2, Flame, Award, Globe, Sparkles, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dialect: Dialect;
  setDialect: (d: Dialect) => void;
  stats: UserStats;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  dialect,
  setDialect,
  stats,
  darkMode,
  setDarkMode
}) => {
  const tabs = [
    { id: 'guide', label: '🔊 Звуки и Буквы', icon: '🗣️' },
    { id: 'stress', label: '🎯 Правила Ударения', icon: '✍️' },
    { id: 'trainer', label: '🎙️ Голосовой Тренажёр', icon: '🎤' },
    { id: 'twisters', label: '👅 Скороговорки', icon: '⚡' },
    { id: 'converter', label: '🔍 Переводчик Фонетики', icon: '📖' },
    { id: 'games', label: '🎮 Игры и Викторины', icon: '🏆' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 dark:bg-[#0F172A]/90 border-b border-slate-800 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('guide')}>
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40">
              Ñ
            </div>
            <div>
              <h1 className="font-black text-white text-xs sm:text-lg leading-tight uppercase tracking-tight flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>FONÉTICA <span className="text-amber-500">PRO</span></span>
                <span className="bg-slate-800 text-amber-400 text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-700 whitespace-nowrap">
                  Для русских
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                Интерактивный Bento-тренажёр произношения
              </p>
            </div>
          </div>

          {/* Controls: Dialect & Stats */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Dialect selector */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-2xl border border-slate-700/80 text-xs font-medium">
              <Globe className="w-3.5 h-3.5 ml-2 text-slate-400 hidden sm:inline" />
              <button
                onClick={() => setDialect('es-ES')}
                className={`px-2.5 py-1 rounded-xl transition-all ${
                  dialect === 'es-ES'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Испания (Кастильский диалект: C/Z = [θ])"
              >
                🇪🇸 Испания
              </button>
              <button
                onClick={() => setDialect('es-MX')}
                className={`px-2.5 py-1 rounded-xl transition-all ${
                  dialect === 'es-MX'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Латинская Америка (Seseo: C/Z = [S])"
              >
                🇲🇽 Латам
              </button>
            </div>

            {/* Streak & XP Badge */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 text-amber-400 rounded-2xl border border-slate-700 text-xs font-extrabold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{stats.streakDays} ДНЕЙ УДАРНО</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/80 text-indigo-300 rounded-2xl border border-indigo-800/80 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>{stats.xp} XP</span>
              </div>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
