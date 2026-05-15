import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, Play, Info, BrainCircuit } from 'lucide-react';
import { modulo2Data } from '../data/modulo2_data';
import { useAuth } from '../contexts/AuthContext';

export function Modulo2Section() {
  const [activeTab, setActiveTab] = useState('teoria'); // 'teoria' or 'pratica'
  const [activeExerciseSection, setActiveExerciseSection] = useState('section2_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  React.useEffect(() => {
    if (userProgress && userProgress['modulo2']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo2'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo2'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo2Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo2', { 
      answers: { ...userAnswers, [id]: value },
      checked: { ...checkedAnswers, [id]: false }
    });
  };

  const checkSingleAnswer = (ex) => {
    const userAnswer = userAnswers[ex.id] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
    
    if (isCorrect) {
      resolveError(ex.id);
    } else {
      logError(ex, "Modulo 2: Sintassi Avanzata");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo2', { answers: userAnswers, checked: newChecked });
  };

  const checkAnswers = () => {
    let currentScore = 0;
    currentExercises.forEach(ex => {
      const userAnswer = (userAnswers[ex.id] || '').trim().toLowerCase();
      const correctAnswer = ex.answer.toLowerCase();
      if (userAnswer === correctAnswer) {
        currentScore++;
        resolveError(ex.id);
      } else {
        logError(ex, "Modulo 2: Sintassi Avanzata");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo2', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo2', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section2_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section2_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            2.1 Concordanza Tempi
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section2_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section2_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            2.2 Periodo Ipotetico
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section2_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section2_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            2.3 Discorso Indiretto
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section2_1' && "Completa applicando la concordanza dei tempi (Indicativo/Congiuntivo)"}
              {activeExerciseSection === 'section2_2' && "Completa il periodo ipotetico (es: saresti venuto)"}
              {activeExerciseSection === 'section2_3' && "Trasforma la frase al discorso indiretto"}
            </h3>
            {showResults && (
              <div className="text-lg font-bold px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                Punteggio: {score} / {currentExercises.length}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {currentExercises.map((ex, index) => {
              const parts = ex.sentence.split('{blank}');
              const userAnswer = userAnswers[ex.id] || '';
              const isChecked = showResults || checkedAnswers[ex.id];
              const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
              
              return (
                <div key={ex.id} className={`p-4 rounded-lg border ${isChecked ? (isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200') : 'bg-slate-50 border-slate-200 hover:border-indigo-300'} transition-colors`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <span className="font-bold text-slate-400 w-6 flex-shrink-0">{index + 1}.</span>
                    <div className="flex-1 text-slate-700 leading-relaxed flex flex-wrap items-center gap-1">
                      <span>{parts[0]}</span>
                      <div className="relative inline-block">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => handleInputChange(ex.id, e.target.value)}
                          disabled={isChecked}
                          className={`w-32 md:w-48 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
                            ${isChecked 
                              ? (isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-red-500 bg-red-100 text-red-800')
                              : 'border-indigo-200 focus:border-indigo-500 text-indigo-900 bg-white'
                            }
                          `}
                          placeholder="..."
                        />
                      </div>
                      <span>{parts[1]}</span>
                    </div>
                    
                    {!isChecked && (
                      <button
                        onClick={() => checkSingleAnswer(ex)}
                        disabled={!userAnswer.trim()}
                        className="flex-shrink-0 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                        title="Controlla risposta"
                      >
                        <CheckCircle2 size={24} />
                      </button>
                    )}
                    {isChecked && (
                      <div className="flex-shrink-0 w-8 flex justify-center">
                        {isCorrect ? <CheckCircle2 className="text-emerald-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                      </div>
                    )}
                  </div>
                  
                  {isChecked && !isCorrect && (
                    <div className="mt-2 ml-9 text-sm">
                      <span className="text-red-600 font-medium">Correzione:</span> <span className="font-bold text-slate-800 bg-emerald-100 px-2 py-0.5 rounded">{ex.answer}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {!showResults ? (
              <button 
                onClick={checkAnswers}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <CheckCircle2 size={20} /> Controlla le Risposte
              </button>
            ) : (
              <button 
                onClick={resetQuiz}
                className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                Riprova
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTheorySection = () => {
    return (
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">2.1 La Concordanza dei Tempi</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            La "Concordanza dei Tempi" definisce quale tempo verbale usare nella frase dipendente, in base al tempo della frase principale (Presente o Passato) e al rapporto cronologico (Anteriorità, Contemporaneità, Posteriorità).
          </p>

          <div className="space-y-6">
            <div className="border border-indigo-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-100 text-indigo-900 font-bold p-3 border-b border-indigo-200">
                Se il verbo principale è al PRESENTE / FUTURO (Es: So, Penso)
              </div>
              <div className="p-4 grid gap-4 md:grid-cols-3 bg-white">
                <div>
                  <h5 className="font-bold text-slate-800 border-b pb-1 mb-2 text-sm">Anteriorità (Prima)</h5>
                  <p className="text-sm text-slate-600">Indicativo: Passato Prossimo / Remoto<br/>Congiuntivo: Passato</p>
                  <p className="text-xs text-slate-500 mt-2 italic">Es: So che <strong>ha studiato</strong> / Penso che <strong>abbia studiato</strong>.</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 border-b pb-1 mb-2 text-sm">Contemporaneità (Ora)</h5>
                  <p className="text-sm text-slate-600">Indicativo: Presente<br/>Congiuntivo: Presente</p>
                  <p className="text-xs text-slate-500 mt-2 italic">Es: So che <strong>studia</strong> / Penso che <strong>studi</strong>.</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 border-b pb-1 mb-2 text-sm">Posteriorità (Dopo)</h5>
                  <p className="text-sm text-slate-600">Indicativo: Futuro Semplice<br/>Congiuntivo: Futuro Semplice</p>
                  <p className="text-xs text-slate-500 mt-2 italic">Es: So che <strong>studierà</strong> / Penso che <strong>studierà</strong>.</p>
                </div>
              </div>
            </div>

            <div className="border border-purple-200 rounded-lg overflow-hidden">
              <div className="bg-purple-100 text-purple-900 font-bold p-3 border-b border-purple-200">
                Se il verbo principale è al PASSATO (Es: Sapevo, Pensavo)
              </div>
              <div className="p-4 grid gap-4 md:grid-cols-3 bg-white">
                <div>
                  <h5 className="font-bold text-slate-800 border-b pb-1 mb-2 text-sm">Anteriorità (Prima)</h5>
                  <p className="text-sm text-slate-600">Indicativo: Trapassato Prossimo<br/>Congiuntivo: Trapassato</p>
                  <p className="text-xs text-slate-500 mt-2 italic">Es: Sapevo che <strong>aveva studiato</strong> / Pensavo che <strong>avesse studiato</strong>.</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 border-b pb-1 mb-2 text-sm">Contemporaneità (In quel momento)</h5>
                  <p className="text-sm text-slate-600">Indicativo: Imperfetto<br/>Congiuntivo: Imperfetto</p>
                  <p className="text-xs text-slate-500 mt-2 italic">Es: Sapevo che <strong>studiava</strong> / Pensavo che <strong>studiasse</strong>.</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 border-b pb-1 mb-2 text-sm">Posteriorità (Il "Futuro nel passato")</h5>
                  <p className="text-sm text-slate-600">Indicativo: Condizionale Passato<br/>Congiuntivo: Condizionale Passato</p>
                  <p className="text-xs text-slate-500 mt-2 italic">Es: Sapevo che <strong>avrebbe studiato</strong> / Pensavo che <strong>avrebbe studiato</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">2.2 Il Periodo Ipotetico</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">Formato da due frasi: una condizione (introdotta da "se") e una conseguenza.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-2 border-b border-emerald-200 pb-1">Tipo 1: La Realtà</h4>
              <p className="text-sm text-emerald-900 mb-2 font-mono bg-white p-1 rounded">Se + IND, IND/IMP</p>
              <p className="text-sm text-emerald-800">Ipotesi reale e possibile.</p>
              <p className="text-sm italic text-emerald-700 mt-2">"Se studi, passi l'esame."</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 border-b border-amber-200 pb-1">Tipo 2: La Possibilità</h4>
              <p className="text-sm text-amber-900 mb-2 font-mono bg-white p-1 rounded">Se + CONG IMP, COND PRES</p>
              <p className="text-sm text-amber-800">Ipotesi improbabile nel presente/futuro.</p>
              <p className="text-sm italic text-amber-700 mt-2">"Se studiassi, passeresti."</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <h4 className="font-bold text-red-800 mb-2 border-b border-red-200 pb-1">Tipo 3: L'Irrealtà</h4>
              <p className="text-sm text-red-900 mb-2 font-mono bg-white p-1 rounded">Se + CONG TRAP, COND PASS</p>
              <p className="text-sm text-red-800">Ipotesi impossibile nel passato.</p>
              <p className="text-sm italic text-red-700 mt-2">"Se avessi studiato, saresti passato."</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">2.3 Il Discorso Indiretto</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">Quando riportiamo le parole di qualcuno al passato (es. "Lui disse che..."), dobbiamo fare un salto indietro nel tempo, applicando la regola del "passo indietro" (Backshifting).</p>
          
          <table className="w-full text-left border-collapse mt-4 text-sm md:text-base">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="p-3 border font-bold">Discorso Diretto</th>
                <th className="p-3 border font-bold">➔ Discorso Indiretto (Verbo introduttivo al Passato)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border">Presente ("Vado")</td><td className="p-3 border">➔ Imperfetto ("Disse che andava")</td></tr>
              <tr className="bg-slate-50"><td className="p-3 border">Passato Prossimo ("Sono andato")</td><td className="p-3 border">➔ Trapassato Prossimo ("Disse che era andato")</td></tr>
              <tr><td className="p-3 border">Futuro ("Andrò")</td><td className="p-3 border">➔ Condizionale Passato ("Disse che sarebbe andato")</td></tr>
              <tr className="bg-slate-50"><td className="p-3 border">Imperativo ("Vai!")</td><td className="p-3 border">➔ "di" + Infinito ("Mi disse di andare")</td></tr>
            </tbody>
          </table>
          <div className="mt-4 p-4 bg-sky-50 border-l-4 border-sky-500 text-sky-900">
            <strong>Nota sugli avverbi:</strong> Anche gli avverbi cambiano! <em>Oggi ➔ Quel giorno</em> | <em>Ieri ➔ Il giorno prima</em> | <em>Domani ➔ Il giorno dopo</em> | <em>Qui ➔ Lì</em>.
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 2: Sintassi Avanzata</h2>
        <p className="text-slate-600 text-lg">Concordanza dei tempi, periodo ipotetico e discorso indiretto.</p>
      </header>

      <div className="flex bg-slate-200 p-1 rounded-xl mb-8 w-full max-w-md mx-auto md:mx-0">
        <button
          onClick={() => setActiveTab('teoria')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all ${
            activeTab === 'teoria' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <BookOpen size={20} /> Teoria Completa
        </button>
        <button
          onClick={() => setActiveTab('pratica')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all ${
            activeTab === 'pratica' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <BrainCircuit size={20} /> Esercizi Interattivi
        </button>
      </div>

      {activeTab === 'teoria' ? renderTheorySection() : renderExerciseSection()}

    </div>
  );
}
