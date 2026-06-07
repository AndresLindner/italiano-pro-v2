import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, BrainCircuit, Volume2 } from 'lucide-react';
import { modulo7Data } from '../data/modulo7_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

export function Modulo7Section() {
  const speakText = (text) => {
    speakItalian(text);
  };
  const [activeTab, setActiveTab] = useState('teoria'); 
  const [activeExerciseSection, setActiveExerciseSection] = useState('section7_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  React.useEffect(() => {
    if (userProgress && userProgress['modulo7']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo7'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo7'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo7Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo7', { 
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
      logError(ex, "Modulo 7: Connettivi Logici");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo7', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 7: Connettivi Logici");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo7', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo7', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section7_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section7_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            7.1 Concessivi
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section7_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section7_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            7.2 Causali / Finali
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section7_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section7_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            7.3 Avversativi / Aggiuntivi
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section7_1' && "Completa con: sebbene, benché, nonostante, malgrado"}
              {activeExerciseSection === 'section7_2' && "Completa con: perché, poiché, affinché, siccome, dato che"}
              {activeExerciseSection === 'section7_3' && "Completa con: tuttavia, ma, invece, inoltre, eppure, nonché"}
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
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">7.1 Connettivi Concessivi</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Esprimono una concessione o un contrasto rispetto a ciò che ci si aspetterebbe ("although", "even though", "despite"). Al livello B2 è cruciale sapere quali richiedono il congiuntivo e quali l'indicativo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r-lg">
              <h4 className="font-bold text-emerald-900 mb-2">Vogliono il CONGIUNTIVO:</h4>
              <ul className="text-emerald-800 text-sm space-y-2">
                <li>• <strong>Sebbene</strong> / <strong>Benché</strong></li>
                <li>• <strong>Nonostante</strong> / <strong>Malgrado</strong></li>
              </ul>
              <p className="text-emerald-700 text-sm italic mt-3">"<strong>Sebbene</strong> sia stanco, vado a correre."</p>
            </div>
            
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <h4 className="font-bold text-blue-900 mb-2">Vogliono l'INDICATIVO:</h4>
              <ul className="text-blue-800 text-sm space-y-2">
                <li>• <strong>Anche se</strong></li>
              </ul>
              <p className="text-blue-700 text-sm italic mt-3">"<strong>Anche se</strong> sono stanco, vado a correre."</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">7.2 Connettivi Causali e Finali</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Servono a spiegare il "perché" di un'azione. I connettivi <strong>causali</strong> spiegano la causa (il passato/presente che genera l'azione), i connettivi <strong>finali</strong> spiegano lo scopo (il futuro desiderato).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
              <h4 className="font-bold text-slate-800 text-lg mb-3 border-b pb-2">Causali (Indicativo)</h4>
              <ul className="space-y-3">
                <li>
                  <strong className="text-slate-900">Perché / Poiché</strong>
                  <span className="block text-sm text-slate-600">"Non esco perché/poiché piove." (In mezzo alla frase)</span>
                </li>
                <li>
                  <strong className="text-slate-900">Siccome / Dato che</strong>
                  <span className="block text-sm text-slate-600">"Siccome piove, non esco." (Di solito all'inizio)</span>
                </li>
              </ul>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-5 shadow-sm">
              <h4 className="font-bold text-sky-800 text-lg mb-3 border-b border-sky-200 pb-2">Finali (Congiuntivo)</h4>
              <ul className="space-y-3">
                <li>
                  <strong className="text-sky-900">Affinché / Perché</strong> (con valore finale)
                  <span className="block text-sm text-sky-700 italic mt-1">"Parlo piano <strong>affinché</strong> tu capisca."</span>
                </li>
              </ul>
              <p className="text-xs text-sky-600 mt-2">Attenzione: "Perché" causale prende l'indicativo. "Perché" finale (affinché) prende il congiuntivo!</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">7.3 Connettivi Avversativi e Aggiuntivi</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Per scrivere un buon tema al livello B2, è necessario arricchire il vocabolario oltre ai semplici "ma" e "e".
          </p>

          <div className="space-y-4">
            <div className="border border-red-200 rounded-lg overflow-hidden">
              <div className="bg-red-50 px-4 py-2 font-bold text-red-900">Avversativi (Esprimono contrasto)</div>
              <div className="p-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-slate-800">Invece</h5>
                  <p className="text-sm text-slate-600">Opposizione forte. <br/><em className="italic text-slate-500">"Io amo il mare, lui invece ama la montagna."</em></p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Tuttavia / Eppure</h5>
                  <p className="text-sm text-slate-600">Sostituti eleganti di "ma" / "però". <br/><em className="italic text-slate-500">"Pioveva a dirotto. Tuttavia, siamo usciti."</em></p>
                </div>
              </div>
            </div>

            <div className="border border-indigo-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-50 px-4 py-2 font-bold text-indigo-900">Aggiuntivi (Aggiungono informazioni)</div>
              <div className="p-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-slate-800">Inoltre</h5>
                  <p className="text-sm text-slate-600">Significa "in addition" / "furthermore". <br/><em className="italic text-slate-500">"L'hotel è bello e, inoltre, economico."</em></p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Nonché</h5>
                  <p className="text-sm text-slate-600">Significa "as well as". Molto formale. <br/><em className="italic text-slate-500">"È un ottimo scrittore, nonché un bravo attore."</em></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 7: Connettivi Logici</h2>
        <p className="text-slate-600 text-lg">Strutturare frasi complesse con connettivi concessivi, causali, finali e avversativi.</p>
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
