import React from 'react';
import { User, Trophy, Star, Target, CheckCircle2, TrendingUp, Medal, Volume2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';
import { modulo6Data } from '../data/modulo6_data';
import { modulo7Data } from '../data/modulo7_data';
import { modulo8Data } from '../data/modulo8_data';
import { modulo9Data } from '../data/modulo9_data';
import { modulo11Data } from '../data/modulo11_data';

export function ProfiloSection() {
  const { currentUser, userProgress, userFlashcards } = useAuth();
  const [voices, setVoices] = React.useState([]);
  const [selectedVoice, setSelectedVoice] = React.useState('');

  React.useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const allVoices = window.speechSynthesis.getVoices();
        const italianVoices = allVoices.filter(v => {
          const lang = v.lang.toLowerCase().replace('_', '-');
          return lang === 'it-it' || lang.startsWith('it-') || lang === 'it';
        });
        setVoices(italianVoices);
        
        const saved = localStorage.getItem('selectedVoiceName');
        if (saved && italianVoices.some(v => v.name === saved)) {
          setSelectedVoice(saved);
        } else if (italianVoices.length > 0) {
          const best = 
            italianVoices.find(v => v.name.toLowerCase().includes('siri')) ||
            italianVoices.find(v => v.name.toLowerCase().includes('google')) ||
            italianVoices.find(v => v.name.toLowerCase().includes('alice')) ||
            italianVoices.find(v => v.name.toLowerCase().includes('premium')) ||
            italianVoices.find(v => v.name.toLowerCase().includes('enhanced')) ||
            italianVoices[0];
          setSelectedVoice(best ? best.name : '');
        }
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const handleVoiceChange = (e) => {
    const name = e.target.value;
    setSelectedVoice(name);
    localStorage.setItem('selectedVoiceName', name);
    setTimeout(() => {
      speakItalian("ch'io sia, ch'io abbia");
    }, 100);
  };

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
    { id: 'modulo1', name: 'Modulo 1: Il Congiuntivo', icon: <Target size={20} className="text-purple-500" />, stats: calculateCompletion('modulo1', 150) },
    { id: 'modulo2', name: 'Modulo 2: Pronomi Relativi', icon: <Target size={20} className="text-blue-500" />, stats: calculateCompletion('modulo2', 150) },
    { id: 'modulo3', name: 'Modulo 3: Passivo e Impersonale', icon: <Target size={20} className="text-emerald-500" />, stats: calculateCompletion('modulo3', 150) },
    { id: 'modulo4', name: 'Modulo 4: La Pragmatica', icon: <Target size={20} className="text-amber-500" />, stats: calculateCompletion('modulo4', 150) },
    { id: 'modulo5', name: 'Modulo 5: Pronomi Combinati', icon: <Target size={20} className="text-orange-500" />, stats: calculateCompletion('modulo5', 150) },
    { id: 'modulo6', name: 'Modulo 6: Le Preposizioni', icon: <Target size={20} className="text-rose-500" />, stats: calculateCompletion('modulo6', 95) },
    { id: 'modulo7', name: 'Modulo 7: I Connettivi', icon: <Target size={20} className="text-indigo-500" />, stats: calculateCompletion('modulo7', 45) },
    { id: 'modulo8', name: 'Modulo 8: Comprensione Testo', icon: <BookOpenIcon color="text-sky-500" />, stats: calculateCompletion('modulo8', 18) },
    { id: 'modulo9', name: 'Modulo 9: Comprensione Ascolto', icon: <HeadphonesIcon color="text-fuchsia-500" />, stats: calculateCompletion('modulo9', 12) },
    { id: 'modulo10', name: 'Modulo 10: Produzione Scritta', icon: <Target size={20} className="text-pink-500" />, stats: calculateCompletion('modulo10', 12) },
    { id: 'modulo11', name: 'Modulo 11: Sintassi Avanzata', icon: <Target size={20} className="text-teal-500" />, stats: calculateCompletion('modulo11', 150) },
    { id: 'modulo12', name: 'Modulo 12: Doppio Ausiliare', icon: <Target size={20} className="text-violet-500" />, stats: calculateCompletion('modulo12', 300) },
  ];

  const totalCompleted = stats.reduce((acc, curr) => acc + curr.stats.completed, 0);
  const totalExercises = stats.reduce((acc, curr) => acc + curr.stats.total, 0);
  const globalPercent = Math.round((totalCompleted / totalExercises) * 100);

  // B2 Readiness calculations
  const grammarPercent = Math.round(
    (calculateCompletion('modulo1', 150).percent +
     calculateCompletion('modulo2', 150).percent +
     calculateCompletion('modulo3', 150).percent +
     calculateCompletion('modulo5', 150).percent +
     calculateCompletion('modulo6', 95).percent +
     calculateCompletion('modulo7', 45).percent +
     calculateCompletion('modulo11', 150).percent +
     calculateCompletion('modulo12', 300).percent) / 8
  );
  
  const listeningPercent = calculateCompletion('modulo9', 12).percent;
  const readingPercent = calculateCompletion('modulo8', 18).percent;
  const writingPercent = calculateCompletion('modulo10', 12).percent;

  const exam = userProgress?.esame?.lastExam;
  
  const finalGrammar = exam 
    ? Math.round(grammarPercent * 0.4 + (exam.grammar / exam.grammarMax) * 100 * 0.6) 
    : grammarPercent;
  const finalListening = exam 
    ? Math.round(listeningPercent * 0.4 + (exam.ascolto / exam.ascoltoMax) * 100 * 0.6) 
    : listeningPercent;
  const finalReading = exam 
    ? Math.round(readingPercent * 0.4 + (exam.lettura / exam.letturaMax) * 100 * 0.6) 
    : readingPercent;
  const finalWriting = exam 
    ? Math.round(writingPercent * 0.4 + (exam.scrittura / exam.scritturaMax) * 100 * 0.6) 
    : writingPercent;

  const readinessIndex = Math.round((finalGrammar + finalListening + finalReading + finalWriting) / 4);

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

      {/* Impostazioni Sintesi Vocale (TTS Settings) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-2">
          <Volume2 className="text-indigo-600" size={24} /> Impostazioni Voce (Sintesi Vocale)
        </h3>
        <p className="text-slate-500 text-sm mb-4">
          Scegli la voce italiana che preferisci per ascoltare le pronunce. Le voci disponibili dipendono dal tuo browser e dal tuo sistema operativo (es. Siri, Alice Premium, Google Cloud).
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-80">
            <select
              value={selectedVoice}
              onChange={handleVoiceChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {voices.length === 0 ? (
                <option value="">Voce Predefinita del Sistema</option>
              ) : (
                voices.map(v => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.localService ? 'Offline' : 'Cloud'})
                  </option>
                ))
              )}
            </select>
          </div>
          <button
            onClick={() => speakItalian("ch'io sia, ch'io abbia, che tu sia, che tu abbia")}
            className="w-full sm:w-auto px-5 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Volume2 size={18} /> Prova Audio
          </button>
        </div>
      </div>

      {/* B2 Readiness Dashboard */}
      <h3 className="text-2xl font-black text-slate-800 mt-12 mb-6 flex items-center gap-2">
        <TrendingUp className="text-indigo-600" size={24} /> Dashboard Idoneità B2 (B2 Readiness)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 animate-in fade-in duration-300">
        {/* Overall Score */}
        <div className="md:col-span-4 bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-6 rounded-3xl shadow-sm border border-indigo-950 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-4 font-sans">Indice Idoneità B2</span>
          
          <div className="w-28 h-28 rounded-full border-4 border-indigo-800 flex items-center justify-center mb-4 relative">
            <span className="text-4xl font-black text-white">{readinessIndex}%</span>
          </div>

          <h4 className="font-bold text-sm text-indigo-200">
            {readinessIndex >= 85 ? "Eccellente Preparazione" : readinessIndex >= 60 ? "Pronto per l'Esame" : "Necessita di Ripasso"}
          </h4>
          <p className="text-[11px] text-indigo-300 mt-2 max-w-[200px] leading-relaxed">
            Calcolato combinando il completamento dei moduli (40%) e i punteggi dell'esame simulato (60%).
          </p>
        </div>

        {/* Breakdown Gauges */}
        <div className="md:col-span-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase font-sans">
              <span>Grammatica e Verbi</span>
              <span>{finalGrammar}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: `${finalGrammar}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">Moduli: 1-3, 5-7, 11-12</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase font-sans">
              <span>Comprensione Ascolto</span>
              <span>{finalListening}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-fuchsia-600 h-full rounded-full transition-all duration-500" style={{ width: `${finalListening}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">Modulo: 9</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase font-sans">
              <span>Comprensione Lettura</span>
              <span>{finalReading}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-sky-600 h-full rounded-full transition-all duration-500" style={{ width: `${finalReading}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">Modulo: 8</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase font-sans">
              <span>Produzione Scritta</span>
              <span>{finalWriting}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-pink-600 h-full rounded-full transition-all duration-500" style={{ width: `${finalWriting}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-400">Modulo: 10</p>
          </div>
        </div>
      </div>

      {/* Gamified Achievements / Medals Grid */}
      <h3 className="text-2xl font-black text-slate-800 mt-12 mb-6">I Miei Traguardi (Medaglie)</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Medal 1: Pioniere del Congiuntivo */}
        <MedalCard
          title="Pioniere del Congiuntivo"
          description="Completato il Modulo 1 al 100%"
          isUnlocked={calculateCompletion('modulo1', 45).percent >= 100}
          unlockedColor="from-amber-400 to-yellow-500 text-amber-950"
          criteria="Completa il Modulo 1 (Il Congiuntivo) al 100% per sbloccare questa medaglia d'oro."
          icon={
            <svg viewBox="0 0 24 24" className="w-16 h-16 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.5">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="8" r="7" fill="url(#goldGrad)" />
              <path d="M12 4v8M8 8h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 14l-2 7 7-3 7 3-2-7" stroke="#b45309" strokeWidth="1.5" fill="#fef3c7" strokeLinejoin="round" />
              <circle cx="12" cy="8" r="4" stroke="#78350f" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
          }
        />

        {/* Medal 2: Inarrestabile */}
        <MedalCard
          title="Inarrestabile"
          description="Punteggio d'esame >= 85%"
          isUnlocked={(userProgress?.esame?.lastExam?.percent || 0) >= 85}
          unlockedColor="from-rose-500 to-red-600 text-rose-950"
          criteria="Ottieni un punteggio superiore all'85% in una simulazione d'esame per sbloccare questo trofeo."
          icon={
            <svg viewBox="0 0 24 24" className="w-16 h-16 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.5">
              <defs>
                <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
              <path d="M12 2C7.5 7.5 12 11 12 14c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-4.5 4.5-8 4.5-8S3 9 3 14c0 5 4 9 9 9s9-4 9-9c0-5-4.5-8-4.5-8S21 9 21 14c0 4.5-4.5 8-4.5 8" fill="url(#fireGrad)" stroke="none" />
              <path d="M12 8c-2 2-1 4-1 6 0 1.1-.9 2-2 2s-2-.9-2-2c0-2.5 2.5-4.5 2.5-4.5" fill="#fecdd3" stroke="none" />
            </svg>
          }
        />

        {/* Medal 3: Cacciatore di Errori */}
        <MedalCard
          title="Cacciatore di Errori"
          description="Risolti 5 errori in ripasso"
          isUnlocked={(userProgress?.stats?.errorsResolved || 0) >= 5}
          unlockedColor="from-emerald-400 to-teal-500 text-emerald-950"
          criteria={`Risolvi correttamente 5 errori nella sezione "Ripasso Errori". (Attuale: ${userProgress?.stats?.errorsResolved || 0}/5)`}
          icon={
            <svg viewBox="0 0 24 24" className="w-16 h-16 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.5">
              <defs>
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#0f766e" />
                </linearGradient>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="9" fill="url(#emeraldGrad)" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="7" stroke="#115e59" strokeWidth="1" strokeDasharray="3 2" />
            </svg>
          }
        />

        {/* Medal 4: Lessicologo */}
        <MedalCard
          title="Lessicologo"
          description="Ripassate 20+ parole"
          isUnlocked={Object.keys(userFlashcards || {}).length >= 20}
          unlockedColor="from-indigo-400 to-purple-600 text-indigo-950"
          criteria={`Ripassa almeno 20 parole nelle flashcard del Lessico Tematico. (Attuale: ${Object.keys(userFlashcards || {}).length}/20)`}
          icon={
            <svg viewBox="0 0 24 24" className="w-16 h-16 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.5">
              <defs>
                <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#312e81" strokeWidth="1.5" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="url(#purpleGrad)" />
              <path d="M9 6h7M9 10h7M9 14h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
        />
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

// Sub-component for individual medal card
function MedalCard({ title, description, isUnlocked, unlockedColor, criteria, icon }) {
  return (
    <div className={`relative bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 flex flex-col items-center text-center group ${
      isUnlocked 
        ? 'border-slate-200 hover:-translate-y-1 hover:shadow-md' 
        : 'border-slate-100 opacity-75'
    }`}>
      {/* Medal Icon Wrapper */}
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
        isUnlocked 
          ? `bg-gradient-to-br ${unlockedColor} scale-100` 
          : 'bg-slate-100 filter grayscale opacity-45'
      }`}>
        {isUnlocked ? icon : (
          <div className="relative">
            {icon}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200/50 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
        )}
      </div>

      <h4 className="font-extrabold text-slate-800 text-lg leading-tight mb-1">{title}</h4>
      <p className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3 ${
        isUnlocked 
          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
          : 'bg-slate-100 text-slate-400 border border-slate-200'
      }`}>
        {isUnlocked ? 'Sbloccato' : 'Bloccato'}
      </p>
      
      <p className="text-xs text-slate-500 leading-relaxed px-2 font-medium">{description}</p>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-slate-900 text-white text-xs rounded-xl p-3 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="font-bold border-b border-slate-700 pb-1 mb-1 text-slate-200">Requisito di sblocco:</div>
        <p className="text-slate-300 font-medium leading-relaxed">{criteria}</p>
        {/* Tooltip triangle */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
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
