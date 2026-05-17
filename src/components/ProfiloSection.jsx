import React from 'react';
import { User, Trophy, Star, Target, CheckCircle2, TrendingUp, Medal } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { modulo6Data } from '../data/modulo6_data';
import { modulo7Data } from '../data/modulo7_data';
import { modulo8Data } from '../data/modulo8_data';
import { modulo9Data } from '../data/modulo9_data';
import { modulo11Data } from '../data/modulo11_data';

export function ProfiloSection() {
  const { currentUser, userProgress } = useAuth();

  // Helper to calculate module completion
  const calculateCompletion = (moduleId, totalExercises) => {
    if (!userProgress || !userProgress[moduleId] || !userProgress[moduleId].checked) {
      return { completed: 0, total: totalExercises, percent: 0 };
    }
    const completedCount = Object.keys(userProgress[moduleId].checked).filter(id => userProgress[moduleId].checked[id]).length;
    return {
      completed: completedCount,
      total: totalExercises,
      percent: Math.round((completedCount / totalExercises) * 100)
    };
  };

  // Rough estimation of total exercises per module
  const stats = [
    { id: 'modulo1', name: 'M1: Il Congiuntivo', icon: <Target size={20} className="text-purple-500" />, stats: calculateCompletion('modulo1', 45) }, // 3 sections * 15
    { id: 'modulo2', name: 'M2: Pronomi Relativi', icon: <Target size={20} className="text-blue-500" />, stats: calculateCompletion('modulo2', 20) }, // 2 sections * 10
    { id: 'modulo3', name: 'M3: Passivo e Impersonale', icon: <Target size={20} className="text-emerald-500" />, stats: calculateCompletion('modulo3', 20) },
    { id: 'modulo4', name: 'M4: La Pragmatica', icon: <Target size={20} className="text-amber-500" />, stats: calculateCompletion('modulo4', 20) },
    { id: 'modulo6', name: 'M6: Preposizioni', icon: <Target size={20} className="text-rose-500" />, stats: calculateCompletion('modulo6', 40) }, // 30 + 10
    { id: 'modulo7', name: 'M7: Connettivi', icon: <Target size={20} className="text-indigo-500" />, stats: calculateCompletion('modulo7', 15) },
    { id: 'modulo8', name: 'M8: Comprensione Testo', icon: <BookOpenIcon color="text-sky-500" />, stats: calculateCompletion('modulo8', 15) },
    { id: 'modulo9', name: 'M9: Ascolto', icon: <HeadphonesIcon color="text-fuchsia-500" />, stats: calculateCompletion('modulo9', 10) },
    { id: 'modulo11', name: 'M11: Sintassi Avanzata', icon: <Target size={20} className="text-teal-500" />, stats: calculateCompletion('modulo11', 30) },
  ];

  const totalCompleted = stats.reduce((acc, curr) => acc + curr.stats.completed, 0);
  const totalExercises = stats.reduce((acc, curr) => acc + curr.stats.total, 0);
  const globalPercent = Math.round((totalCompleted / totalExercises) * 100);

  // Gamification logic
  let level = "Studente Principiante";
  let badgeIcon = <Medal className="text-slate-400" size={48} />;
  
  if (globalPercent > 80) {
    level = "Maestro dell'Italiano B2";
    badgeIcon = <Trophy className="text-amber-400" size={48} />;
  } else if (globalPercent > 50) {
    level = "Studente Avanzato";
    badgeIcon = <Star className="text-indigo-400" size={48} />;
  } else if (globalPercent > 20) {
    level = "Studente Intermedio";
    badgeIcon = <TrendingUp className="text-emerald-400" size={48} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-5xl mx-auto">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2 flex items-center gap-3">
          <User className="text-indigo-600" size={36} /> Il Mio Profilo
        </h2>
        <p className="text-slate-600 text-lg">Monitora i tuoi progressi e sblocca trofei completando gli esercizi.</p>
      </header>

      {/* Global Stats Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center relative z-10 flex-shrink-0">
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt="Profilo" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User size={64} className="text-slate-400" />
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <h3 className="text-3xl font-black text-slate-800 mb-1">{currentUser?.displayName || 'Studente'}</h3>
          <p className="text-indigo-600 font-bold mb-4">{level}</p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-wrap gap-6 justify-center md:justify-start">
            <div>
              <p className="text-sm text-slate-500 font-medium">Completamento Globale</p>
              <p className="text-3xl font-black text-slate-800">{globalPercent}%</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Esercizi Fatti</p>
              <p className="text-3xl font-black text-emerald-600">{totalCompleted} <span className="text-base text-slate-400 font-normal">/ {totalExercises}</span></p>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 relative z-10 bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center">
          <div className="mb-2 flex justify-center">{badgeIcon}</div>
          <p className="font-bold text-indigo-900 text-sm">Livello Attuale</p>
        </div>
      </div>

      <h3 className="text-2xl font-black text-slate-800 mt-12 mb-6">Progressi per Modulo</h3>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map(mod => (
          <div key={mod.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                {mod.icon} {mod.name}
              </div>
              <span className={`text-sm font-black ${mod.stats.percent === 100 ? 'text-emerald-500' : 'text-slate-500'}`}>
                {mod.stats.percent}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${mod.stats.percent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                style={{ width: `${Math.min(100, Math.max(0, mod.stats.percent))}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">
              {mod.stats.completed} / {mod.stats.total} completati
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookOpenIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  );
}

function HeadphonesIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={color}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
  );
}
