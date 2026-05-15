import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, Play, Info, BrainCircuit } from 'lucide-react';
import { modulo3Data } from '../data/modulo3_data';

export function Modulo3Section() {
  const [activeTab, setActiveTab] = useState('teoria'); 
  const [activeExerciseSection, setActiveExerciseSection] = useState('section3_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercises = modulo3Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) setShowResults(false);
  };

  const checkAnswers = () => {
    let currentScore = 0;
    currentExercises.forEach(ex => {
      const userAnswer = (userAnswers[ex.id] || '').trim().toLowerCase();
      const correctAnswer = ex.answer.toLowerCase();
      if (userAnswer === correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section3_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section3_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            3.1 Essere vs. Venire
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section3_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section3_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            3.2 Passivo con Andare
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section3_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section3_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            3.3 Si Impersonale
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section3_1' && "Trasforma la frase usando l'ausiliare corretto (essere o venire)"}
              {activeExerciseSection === 'section3_2' && "Trasforma esprimendo dovere con l'ausiliare 'andare'"}
              {activeExerciseSection === 'section3_3' && "Riscrivi usando il 'si' passivante/impersonale"}
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
              const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
              
              return (
                <div key={ex.id} className={`p-4 rounded-lg border ${showResults ? (isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200') : 'bg-slate-50 border-slate-200 hover:border-indigo-300'} transition-colors`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <span className="font-bold text-slate-400 w-6 flex-shrink-0">{index + 1}.</span>
                    <div className="flex-1 text-slate-700 leading-relaxed flex flex-wrap items-center gap-1">
                      <span>{parts[0]}</span>
                      <div className="relative inline-block">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => handleInputChange(ex.id, e.target.value)}
                          disabled={showResults}
                          className={`w-32 md:w-40 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
                            ${showResults 
                              ? (isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-red-500 bg-red-100 text-red-800')
                              : 'border-indigo-200 focus:border-indigo-500 text-indigo-900 bg-white'
                            }
                          `}
                          placeholder="..."
                        />
                      </div>
                      <span>{parts[1]}</span>
                    </div>
                    
                    {showResults && (
                      <div className="flex-shrink-0 w-8 flex justify-center">
                        {isCorrect ? <CheckCircle2 className="text-emerald-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                      </div>
                    )}
                  </div>
                  
                  {showResults && !isCorrect && (
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
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">3.1 Costruire il Passivo: Essere vs. Venire</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            La forma passiva si costruisce con un ausiliare + il participio passato del verbo. Il participio passato deve sempre concordare in genere e numero con il nuovo soggetto.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-50 p-5 rounded-xl border border-sky-200">
              <h4 className="font-bold text-sky-800 mb-2">1. Passivo con ESSERE</h4>
              <p className="text-sm text-sky-900 mb-3">Può essere usato con <strong>tutti i tempi verbali</strong> (semplici e composti). Può indicare sia un'azione dinamica sia uno stato.</p>
              <ul className="text-sm text-sky-800 space-y-2 italic">
                <li>"L'America è stata scoperta nel 1492." (Azione)</li>
                <li>"La porta è chiusa." (Stato)</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-2">2. Passivo con VENIRE</h4>
              <p className="text-sm text-emerald-900 mb-3">Rende la frase più dinamica. Si può usare <strong>SOLO con i tempi semplici</strong> (Presente, Imperfetto, Futuro, Condizionale, Cong. Pres/Imp).</p>
              <ul className="text-sm text-emerald-800 space-y-2 italic">
                <li>"La porta viene chiusa dal custode."</li>
                <li>"Le regole venivano spiegate."</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-900">
            <strong>⚠️ ERRORE DA EVITARE:</strong> Non puoi mai dire "La porta è venuta chiusa". Per i tempi composti (come il passato prossimo), si usa solo <em>essere</em>.
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">3.2 Il Passivo con "Andare"</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            L'ausiliare <em>andare</em> si usa al passivo per esprimere <strong>necessità, dovere o obbligo</strong>. Significa "deve essere fatto".
            Anche questo si usa <strong>SOLO nei tempi semplici</strong>.
          </p>
          
          <div className="space-y-3">
            <div className="p-3 border border-slate-200 rounded-lg flex items-start gap-3 bg-slate-50">
              <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-slate-800">Presente:</strong>
                <p className="text-slate-600 italic mt-1">"I certificati di nascita <strong>vanno richiesti</strong> al municipio." (= devono essere richiesti).</p>
              </div>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg flex items-start gap-3 bg-slate-50">
              <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-slate-800">Imperfetto:</strong>
                <p className="text-slate-600 italic mt-1">"La medicina <strong>andava presa</strong> a stomaco pieno." (= doveva essere presa).</p>
              </div>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg flex items-start gap-3 bg-slate-50">
              <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-slate-800">Futuro:</strong>
                <p className="text-slate-600 italic mt-1">"Questo libro <strong>andrà letto</strong> entro domani." (= dovrà essere letto).</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">3.3 Il "Si" Impersonale e Passivante</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            L'uso del "si" è un'alternativa molto comune in italiano per creare frasi impersonali o passive senza indicare chi compie l'azione.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-indigo-200 rounded-lg p-5">
              <h4 className="font-bold text-indigo-800 mb-2">1. Si Impersonale (Verbi Intransitivi)</h4>
              <p className="text-sm text-slate-600 mb-3">Il verbo è <strong>sempre alla 3° persona singolare</strong>. (Equivale a "one" o "people").</p>
              <ul className="text-sm text-slate-800 space-y-2 italic bg-slate-50 p-2 rounded">
                <li>"In Italia <strong>si vive</strong> bene."</li>
                <li>"Quando <strong>si è</strong> in vacanza, <strong>si dorme</strong> di più."</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">Nota: Se c'è un aggettivo dopo essere, va al plurale: "Quando si è stanch<strong>i</strong>..."</p>
            </div>
            
            <div className="border border-purple-200 rounded-lg p-5">
              <h4 className="font-bold text-purple-800 mb-2">2. Si Passivante (Verbi Transitivi)</h4>
              <p className="text-sm text-slate-600 mb-3">Il verbo deve concordare (al singolare o plurale) con l'oggetto diretto, che diventa il soggetto.</p>
              <ul className="text-sm text-slate-800 space-y-2 italic bg-slate-50 p-2 rounded">
                <li>"Qui <strong>si mangia</strong> una buona pizza." (Sing.)</li>
                <li>"In Italia <strong>si bevono</strong> troppi caffè." (Plur.)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 3: La Forma Passiva</h2>
        <p className="text-slate-600 text-lg">Strutture passive e impersonali per il registro formale B2.</p>
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
