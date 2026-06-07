import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, ChevronRight, Clock, Award, BookOpen, Sparkles, Brain, AlertCircle, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function HomeSection({ selectTab }) {
  const { userProgress, saveProgress } = useAuth() || { userProgress: {}, saveProgress: () => {} };
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    if (userProgress && userProgress['studyProgram']) {
      setCheckedTasks(userProgress['studyProgram'].checkedTasks || {});
    }
  }, [userProgress]);

  const studyProgram = [
    {
      day: 1,
      title: "Giorno 1: Fondamenti del Congiuntivo e Relativi",
      date: "Lunedì 8 Giugno",
      load: "Alto 🔥",
      description: "Inizia con un carico di studio maggiore. Ripassa le strutture più complesse e frequenti della grammatica B2.",
      tasks: [
        { id: "d1_t1", label: "Ripassa il Congiuntivo Presente (Modulo 1)", link: "modulo1" },
        { id: "d1_t2", label: "Allena i Pronomi Relativi (Modulo 2)", link: "modulo2" },
        { id: "d1_t3", label: "Studio del Congiuntivo Imperfetto (Teoria/Esercizi)", link: "congiuntivoImperfetto" },
        { id: "d1_t4", label: "Completa 15 esercizi nel Modulo 1", link: "modulo1" }
      ]
    },
    {
      day: 2,
      title: "Giorno 2: Passivo, Impersonale e Pronomi Combinati",
      date: "Martedì 9 Giugno",
      load: "Alto 🔥",
      description: "Continua con il secondo blocco ad alto carico di studio. Approfondisci sintassi e combinazioni clitiche.",
      tasks: [
        { id: "d2_t1", label: "Ripassa il Passivo e Impersonale (Modulo 3)", link: "modulo3" },
        { id: "d2_t2", label: "Studio dei Pronomi Combinati (Modulo 5)", link: "modulo5" },
        { id: "d2_t3", label: "Pratica con le Preposizioni B2 (Modulo 6)", link: "modulo6" },
        { id: "d2_t4", label: "Allena il Futuro Anteriore (Modulo 12)", link: "modulo12" }
      ]
    },
    {
      day: 3,
      title: "Giorno 3: Connettivi e Comprensione del Testo",
      date: "Mercoledì 10 Giugno",
      load: "Medio ⚡",
      description: "Migliora la coesione testuale ed esercitati sulla lettura critica e analitica.",
      tasks: [
        { id: "d3_t1", label: "Allena i Connettivi Logici (Modulo 7)", link: "modulo7" },
        { id: "d3_t2", label: "Leggi 2 brani di Comprensione Testo (Modulo 8)", link: "modulo8" },
        { id: "d3_t3", label: "Ripassa il Lessico Tematico (Aree 1-3)", link: "lessico" }
      ]
    },
    {
      day: 4,
      title: "Giorno 4: Comprensione dell'Ascolto",
      date: "Giovedì 11 Giugno",
      load: "Medio ⚡",
      description: "Sviluppa la comprensione orale con l'ascolto sintetizzato e le flashcards.",
      tasks: [
        { id: "d4_t1", label: "Esegui un esercizio di ascolto (Modulo 9)", link: "modulo9" },
        { id: "d4_t2", label: "Allena il Lessico Tematico (Aree 4-6)", link: "lessico" },
        { id: "d4_t3", label: "Esegui una sessione di ripasso Flashcards", link: "lessico" }
      ]
    },
    {
      day: 5,
      title: "Giorno 5: Produzione Scritta e Formule Utili",
      date: "Venerdì 12 Giugno",
      load: "Medio ⚡",
      description: "Focalizzati sulla stesura di email formali e testi argomentativi.",
      tasks: [
        { id: "d5_t1", label: "Ripassa l'Email Formale (Modulo 10)", link: "modulo10" },
        { id: "d5_t2", label: "Esegui una traccia di scrittura guidata con checklist", link: "modulo10" },
        { id: "d5_t3", label: "Studia le formule utili in 'Strategie B2'", link: "strategie" }
      ]
    },
    {
      day: 6,
      title: "Giorno 6: Sintassi Avanzata e Derivazione",
      date: "Sabato 13 Giugno",
      load: "Medio ⚡",
      description: "Lavora sulla morfologia delle parole (Word Formation) e sulla sintassi complessa.",
      tasks: [
        { id: "d6_t1", label: "Studio della Sintassi Avanzata (Modulo 11)", link: "modulo11" },
        { id: "d6_t2", label: "Esegui 2 set di Derivazione Parole", link: "derivazione" },
        { id: "d6_t3", label: "Ripassa gli errori salvati in 'Ripasso Errori'", link: "errori" }
      ]
    },
    {
      day: 7,
      title: "Giorno 7: Doppio Ausiliare e Verbi Servili",
      date: "Domenica 14 Giugno",
      load: "Medio ⚡",
      description: "Risolvi ogni dubbio finale sul doppio ausiliare (essere vs avere) con i verbi servili.",
      tasks: [
        { id: "d7_t1", label: "Studio del Doppio Ausiliare (Modulo 12)", link: "modulo12" },
        { id: "d7_t2", label: "Esegui gli esercizi del Modulo 12", link: "modulo12" },
        { id: "d7_t3", label: "Pulisci gli ultimi errori rimasti nel database", link: "errori" }
      ]
    },
    {
      day: 8,
      title: "Giorno 8: Simulazione Generale e Ultime Rifiniture",
      date: "Lunedì 15 Giugno",
      load: "Medio ⚡",
      description: "Effettua l'ultima simulazione d'esame completa per abituarti ai tempi ufficiali.",
      tasks: [
        { id: "d8_t1", label: "Completa una Simulazione Esame a tempo (60 min)", link: "simulazione" },
        { id: "d8_t2", label: "Consolida le formule scritte/orali in 'Strategie'", link: "strategie" },
        { id: "d8_t3", label: "Dormi bene e rilassati prima di domani!", link: "profilo" }
      ]
    }
  ];

  const handleToggleTask = (taskId) => {
    const updated = { ...checkedTasks, [taskId]: !checkedTasks[taskId] };
    setCheckedTasks(updated);
    saveProgress('studyProgram', { checkedTasks: updated });
  };

  const totalTasks = studyProgram.reduce((acc, curr) => acc + curr.tasks.length, 0);
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const getCountdownDays = () => {
    const today = new Date();
    const examDate = new Date('2026-06-16T00:00:00');
    const diff = examDate - today;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = getCountdownDays();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-5xl mx-auto">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-3 text-center md:text-left z-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center justify-center md:justify-start gap-2">
            <Home className="text-indigo-400" size={32} /> Ciao, Andres! 🇮🇹
          </h2>
          <p className="text-indigo-200 text-sm md:text-base max-w-xl leading-relaxed">
            Mancano solo <strong>{daysRemaining} giorni</strong> al tuo esame B2 di italiano il 16 giugno. Ecco il tuo piano di studio personalizzato giorno per giorno, progettato per massimizzare la tua preparazione.
          </p>
        </div>

        {/* Circular Countdown widget */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center flex-shrink-0 min-w-[150px] z-10">
          <span className="text-[10px] font-black tracking-widest text-indigo-300 uppercase block mb-1">Esame B2</span>
          <span className="text-4xl font-black block font-mono">{daysRemaining}</span>
          <span className="text-[10px] font-bold text-indigo-200 block mt-1">Giorni Rimasti</span>
        </div>
      </div>

      {/* Program Summary & Dynamic Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Plan Steps */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-slate-800">Il Tuo Programma di Studio (8 Giorni)</h3>
            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
              Completati: {completedTasks} / {totalTasks}
            </span>
          </div>

          <div className="space-y-4">
            {studyProgram.map((day) => {
              const dayTasks = day.tasks;
              const completedInDay = dayTasks.filter(t => checkedTasks[t.id]).length;
              const isDayComplete = completedInDay === dayTasks.length;

              return (
                <div key={day.day} className={`p-6 rounded-2xl border transition-all bg-white shadow-xs ${isDayComplete ? 'border-emerald-200 ring-2 ring-emerald-50' : 'border-slate-200 hover:border-indigo-300'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-sans">
                          Giorno {day.day}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">{day.date}</span>
                      </div>
                      <h4 className="text-base md:text-lg font-black text-slate-800 mt-1">{day.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${day.load.includes('Alto') ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                        Carico: {day.load}
                      </span>
                      {isDayComplete && (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Fatto!
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-500 mb-4 leading-relaxed">{day.description}</p>

                  <div className="space-y-2.5">
                    {dayTasks.map((task) => {
                      const isChecked = !!checkedTasks[task.id];
                      return (
                        <div 
                          key={task.id} 
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs md:text-sm transition-all
                            ${isChecked 
                              ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800 font-medium' 
                              : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100/50'}`}
                        >
                          <label className="flex items-center gap-3 cursor-pointer flex-1 py-0.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleTask(task.id)}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                            />
                            <span className={isChecked ? 'line-through text-slate-400 font-medium' : ''}>{task.label}</span>
                          </label>

                          <button
                            onClick={() => selectTab(task.link)}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                          >
                            Vai <ArrowRight size={10} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Progress Dashboard Card & Tips */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4 text-center">
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Avanzamento Programma</h4>
            
            <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center mx-auto relative">
              <span className="text-2xl font-black text-slate-800">{progressPercent}%</span>
              <div 
                className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent transition-transform duration-500"
                style={{ transform: `rotate(${(progressPercent / 100) * 360}deg)` }}
              />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Completa tutti i compiti giornalieri per essere pronto al 100% per il giorno dell'esame!
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 space-y-3">
            <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <Sparkles className="text-amber-600" size={18} /> Consigli per Andres
            </h4>
            <ul className="text-xs text-amber-900 space-y-2 list-disc pl-4 leading-relaxed font-medium">
              <li>I primi due giorni (Giorno 1 e Giorno 2) presentano un carico maggiore per coprire le basi fondamentali della grammatica B2 (4 obiettivi ciascuno).</li>
              <li>I restanti 6 giorni dividono il lavoro in modo equilibrato per darti tempo di esercitarti senza affaticarti.</li>
              <li>Tieni d'occhio i giorni rimasti sul pannello superiore. Forza, Andres! Puoi farcela!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
