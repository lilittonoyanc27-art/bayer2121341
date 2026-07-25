import React, { useState, useEffect } from 'react';
import { Dialect, UserStats } from './types';
import { Navbar } from './Navbar';
import { PhoneticsGuide } from './PhoneticsGuide';
import { AccentRules } from './AccentRules';
import { PronunciationTrainer } from './PronunciationTrainer';
import { TrabalenguasView } from './TrabalenguasView';
import { CustomTextPronouncer } from './CustomTextPronouncer';
import { PhoneticGames } from './PhoneticGames';
import { Sparkles, Flame, Heart, Globe, Award, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('guide');
  const [dialect, setDialect] = useState<Dialect>('es-ES');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const [stats, setStats] = useState<UserStats>({
    xp: 120,
    streakDays: 3,
    completedRules: ['vowels_purity'],
    masteredWords: [],
    gamesPlayed: 5,
    highScore: 450
  });

  // Apply Dark mode class on html / body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddXp = (amount: number) => {
    setStats(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const handleMasterRule = (ruleId: string) => {
    setStats(prev => {
      const exists = prev.completedRules.includes(ruleId);
      const newRules = exists
        ? prev.completedRules.filter(r => r !== ruleId)
        : [...prev.completedRules, ruleId];
      return {
        ...prev,
        completedRules: newRules,
        xp: exists ? prev.xp : prev.xp + 50
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 transition-colors selection:bg-amber-500 selection:text-slate-950 font-sans pb-16">
      
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dialect={dialect}
        setDialect={setDialect}
        stats={stats}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Dynamic View rendering */}
        {activeTab === 'guide' && (
          <PhoneticsGuide
            dialect={dialect}
            onMasterRule={handleMasterRule}
            masteredRules={stats.completedRules}
          />
        )}

        {activeTab === 'stress' && (
          <AccentRules
            dialect={dialect}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'trainer' && (
          <PronunciationTrainer
            dialect={dialect}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'twisters' && (
          <TrabalenguasView
            dialect={dialect}
          />
        )}

        {activeTab === 'converter' && (
          <CustomTextPronouncer
            dialect={dialect}
          />
        )}

        {activeTab === 'games' && (
          <PhoneticGames
            dialect={dialect}
            onAddXp={handleAddXp}
          />
        )}

      </main>

      {/* Bento Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-900/60 py-8 text-center text-xs text-slate-400 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-3 font-bold uppercase tracking-wider text-slate-300">
          <span className="text-amber-500">🇪🇸 FONÉTICA ESPAÑOLA</span>
          <span>•</span>
          <span>ДЛЯ РУССКОЯЗЫЧНЫХ</span>
          <span>•</span>
          <span className="text-indigo-400">BENTO GRID EDITION</span>
        </div>
        <p className="max-w-xl mx-auto text-[11px] text-slate-500 px-4">
          Приложение использует технологии Web Speech API для идеального синтеза и распознавания испанской речи.
        </p>
      </footer>

    </div>
  );
}
