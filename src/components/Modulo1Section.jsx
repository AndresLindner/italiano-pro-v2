import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, Play, Info, BrainCircuit } from 'lucide-react';
import { modulo1Data } from '../data/modulo1_data';

export function Modulo1Section() {
  const [activeTab, setActiveTab] = useState('teoria'); // 'teoria' or 'pratica'
  const [activeExerciseSection, setActiveExerciseSection] = useState('section1_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercises = modulo1Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
  };

  const checkSingleAnswer = (id) => {
    setCheckedAnswers(prev => ({ ...prev, [id]: true }));
  };

  const checkAnswers = () => {
    let currentScore = 0;
    currentExercises.forEach(ex => {
      const userAnswer = (userAnswers[ex.id] || '').trim().toLowerCase();
      const correctAnswer = ex.answer.toLowerCase();
      
      // Some answers have multiple options in the data like "dobbiamo (anche indicativo) / dobbiamo (congiuntivo)"
      // The data provided in modulo1_data.js has single string answers so simple string matching works
      if (userAnswer === correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section1_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section1_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            1.1 I Quattro Tempi
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section1_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section1_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            1.2 I "Trigger"
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section1_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section1_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            1.3 Le Congiunzioni
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section1_1' && "Completa con il tempo corretto del congiuntivo"}
              {activeExerciseSection === 'section1_2' && "Scegli tra Indicativo e Congiuntivo"}
              {activeExerciseSection === 'section1_3' && "Completa la frase (Congiunzione o verbo)"}
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
                          className={`w-32 md:w-40 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
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
                        onClick={() => checkSingleAnswer(ex.id)}
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
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">1.1 I Quattro Tempi del Congiuntivo</h3>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Il congiuntivo ha quattro tempi: due semplici (presente, imperfetto) e due composti (passato, trapassato).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-50 p-5 rounded-xl border border-sky-200">
              <h4 className="font-bold text-sky-800 mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sky-500"></div> Congiuntivo Presente</h4>
              <p className="text-sm text-sky-900 mb-3">Si usa per un'azione contemporanea o futura rispetto a un verbo principale al presente o al futuro.</p>
              <div className="bg-white p-3 rounded border border-sky-100 text-sm italic text-slate-600">
                "Spero che tu <strong className="text-sky-700">venga</strong> alla festa."
              </div>
            </div>

            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Congiuntivo Passato</h4>
              <p className="text-sm text-emerald-900 mb-3">Si usa per un'azione passata e conclusa rispetto a un verbo principale al presente. (Ausiliare al presente + part. passato).</p>
              <div className="bg-white p-3 rounded border border-emerald-100 text-sm italic text-slate-600">
                "Penso che Marco <strong className="text-emerald-700">abbia studiato</strong> molto."
              </div>
            </div>

            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Congiuntivo Imperfetto</h4>
              <p className="text-sm text-amber-900 mb-3">Si usa quando il verbo principale è al passato (o condizionale) e l'azione è contemporanea o futura.</p>
              <div className="bg-white p-3 rounded border border-amber-100 text-sm italic text-slate-600">
                "Speravo che tu <strong className="text-amber-700">venissi</strong> alla festa."
              </div>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Congiuntivo Trapassato</h4>
              <p className="text-sm text-purple-900 mb-3">Si usa quando il verbo principale è al passato e l'azione subordinata è avvenuta prima. (Ausiliare imperfetto + part. passato).</p>
              <div className="bg-white p-3 rounded border border-purple-100 text-sm italic text-slate-600">
                "Pensavo che Marco <strong className="text-purple-700">avesse studiato</strong> molto."
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">1.2 I "Trigger" del Congiuntivo</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">Il congiuntivo è obbligatorio dopo verbi e espressioni che indicano soggettività:</p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-1 text-indigo-500"><Info size={20} /></div>
              <div>
                <strong className="text-slate-800">Opinione e dubbio:</strong>
                <p className="text-sm text-slate-600 mt-1">credere, pensare, dubitare, supporre, ritenere.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-indigo-500"><Info size={20} /></div>
              <div>
                <strong className="text-slate-800">Volontà e desiderio:</strong>
                <p className="text-sm text-slate-600 mt-1">volere, sperare, preferire, desiderare, pretendere.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-indigo-500"><Info size={20} /></div>
              <div>
                <strong className="text-slate-800">Emozioni e stati d'animo:</strong>
                <p className="text-sm text-slate-600 mt-1">essere felice, essere triste, dispiacere, avere paura.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-indigo-500"><Info size={20} /></div>
              <div>
                <strong className="text-slate-800">Espressioni impersonali:</strong>
                <p className="text-sm text-slate-600 mt-1">è necessario, è importante, sembra, pare, bisogna.</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-900 rounded-r-lg">
            <strong>⚠️ Attenzione:</strong> Verbi come <em>sapere, affermare, dire, essere sicuro, promettere</em> reggono l'<strong>INDICATIVO</strong>!
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">1.3 Congiunzioni Subordinanti</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">Alcune congiunzioni richiedono <strong>sempre</strong> il congiuntivo, indipendentemente dal verbo della frase principale:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <strong className="text-indigo-800 block mb-2">Concessive</strong>
              <p className="text-sm text-slate-600">sebbene, benché, malgrado, nonostante</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <strong className="text-indigo-800 block mb-2">Condizionali</strong>
              <p className="text-sm text-slate-600">purché, a patto che, a condizione che, nel caso in cui</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <strong className="text-indigo-800 block mb-2">Finali</strong>
              <p className="text-sm text-slate-600">affinché, in modo che</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <strong className="text-indigo-800 block mb-2">Temporali & Esclusive</strong>
              <p className="text-sm text-slate-600">prima che, senza che, tranne che</p>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 1: Il Congiuntivo</h2>
        <p className="text-slate-600 text-lg">Padronanza del modo della soggettività per il livello B2.</p>
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
