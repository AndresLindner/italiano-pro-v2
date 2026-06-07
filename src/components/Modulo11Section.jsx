import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, BrainCircuit, Volume2 } from 'lucide-react';
import { modulo11Data } from '../data/modulo11_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

export function Modulo11Section() {
  const speakText = (text) => {
    speakItalian(text);
  };
  const [activeTab, setActiveTab] = useState('teoria'); 
  const [activeExerciseSection, setActiveExerciseSection] = useState('section11_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  React.useEffect(() => {
    if (userProgress && userProgress['modulo11']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo11'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo11'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo11Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo11', { 
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
      logError(ex, "Modulo 11: Sintassi Avanzata");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo11', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 11: Sintassi Avanzata");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo11', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo11', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section11_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section11_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            11.1 Periodo Ipotetico (Tipo 2)
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section11_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section11_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            11.2 Periodo Ipotetico (Tipo 3)
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section11_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section11_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            11.3 Discorso Indiretto
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section11_1' && "Completa con il Congiuntivo Imperfetto"}
              {activeExerciseSection === 'section11_2' && "Completa con il Congiuntivo Trapassato (Irrealtà nel passato)"}
              {activeExerciseSection === 'section11_3' && "Trasforma dal discorso diretto all'indiretto al passato"}
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
              const textToSpeak = ex.sentence.replace('{blank}', isChecked ? ex.answer : (userAnswer || '...'));
              
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
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && userAnswer.trim()) {
                              checkSingleAnswer(ex);
                            }
                          }}
                          disabled={isChecked}
                          className={`w-40 md:w-48 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
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
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => speakText(textToSpeak)}
                        className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-indigo-300 text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Ascolta la pronuncia"
                      >
                        <Volume2 size={16} />
                      </button>

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
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">11.1 Il Periodo Ipotetico</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Il periodo ipotetico esprime un'ipotesi e la sua conseguenza. Esistono 3 tipi principali, ma al livello B2 ci si concentra sul Tipo 2 (possibilità/irrealtà nel presente) e sul Tipo 3 (irrealtà nel passato).
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-sky-50 border border-sky-100 rounded-lg">
              <h4 className="font-bold text-sky-900 mb-2">Tipo 2: Possibilità (Presente)</h4>
              <p className="text-sm text-sky-800 mb-2">Ipotesi non reale al momento presente o poco probabile nel futuro.</p>
              <div className="bg-white p-3 rounded border border-sky-200 font-mono text-sm text-center font-bold text-sky-700">
                Se + Congiuntivo Imperfetto ➜ Condizionale Presente
              </div>
              <p className="text-sm mt-2 italic text-sky-900">Esempio: Se <strong>avessi</strong> i soldi, <strong>comprerei</strong> una barca.</p>
            </div>
            
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
              <h4 className="font-bold text-emerald-900 mb-2">Tipo 3: Irrealtà (Passato)</h4>
              <p className="text-sm text-emerald-800 mb-2">Ipotesi impossibile perché si riferisce a un evento passato già concluso.</p>
              <div className="bg-white p-3 rounded border border-emerald-200 font-mono text-sm text-center font-bold text-emerald-700">
                Se + Congiuntivo Trapassato ➜ Condizionale Passato
              </div>
              <p className="text-sm mt-2 italic text-emerald-900">Esempio: Se <strong>avessi studiato</strong>, <strong>avrei passato</strong> l'esame.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">11.2 Il Discorso Indiretto</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Quando riportiamo le parole di qualcuno al passato (es. <em>Marco ha detto che...</em>), dobbiamo applicare la <strong>concordanza dei tempi</strong> e cambiare pronomi e riferimenti temporali.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-indigo-50 text-indigo-900">
                  <th className="p-3 border">Discorso Diretto</th>
                  <th className="p-3 border">Discorso Indiretto (verbo introduttivo al passato)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">Presente ("Mangio")</td>
                  <td className="p-3 border font-semibold text-emerald-700">Imperfetto ("...che mangiava")</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border">Passato Prossimo ("Ho mangiato")</td>
                  <td className="p-3 border font-semibold text-emerald-700">Trapassato Prossimo ("...che aveva mangiato")</td>
                </tr>
                <tr>
                  <td className="p-3 border">Futuro ("Mangerò")</td>
                  <td className="p-3 border font-semibold text-emerald-700">Condizionale Passato ("...che avrebbe mangiato")</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border">Oggi / Ieri / Domani</td>
                  <td className="p-3 border font-semibold text-purple-700">Quel giorno / Il giorno prima / Il giorno dopo</td>
                </tr>
                <tr>
                  <td className="p-3 border">Qui / Questo</td>
                  <td className="p-3 border font-semibold text-purple-700">Lì / Quello</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 11: Sintassi Avanzata</h2>
        <p className="text-slate-600 text-lg">Padronanza del Periodo Ipotetico e del Discorso Indiretto per un livello B2 solido.</p>
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
