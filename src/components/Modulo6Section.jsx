import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';
import { modulo6Data } from '../data/modulo6_data';
import { useAuth } from '../contexts/AuthContext';

export function Modulo6Section() {
  const [activeTab, setActiveTab] = useState('teoria'); 
  const [activeExerciseSection, setActiveExerciseSection] = useState('section6_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  React.useEffect(() => {
    if (userProgress && userProgress['modulo6']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo6'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo6'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo6Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo6', { 
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
      logError(ex, "Modulo 6: Preposizioni e Reggenze");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo6', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 6: Preposizioni e Reggenze");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo6', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo6', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section6_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section6_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            6.1 Verbi + a / di
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section6_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section6_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            6.2 Preposizioni di Luogo
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section6_1' && "Completa con la preposizione corretta (a / di)"}
              {activeExerciseSection === 'section6_2' && "Inserisci la preposizione semplice o articolata corretta"}
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
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">6.1 Verbi seguiti dalla preposizione "A"</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            In italiano, molti verbi richiedono una specifica preposizione prima di un infinito. Quelli che richiedono <strong>"a"</strong> indicano spesso l'inizio di un'azione, un tentativo o un'abitudine.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 border border-sky-100 rounded-lg">
              <h4 className="font-bold text-sky-900 mb-2">Verbi Comuni + A</h4>
              <ul className="space-y-2 text-sm text-sky-800">
                <li>• Andare / Venire <strong>a</strong></li>
                <li>• Cominciare / Iniziare <strong>a</strong></li>
                <li>• Provare / Riuscire <strong>a</strong></li>
                <li>• Imparare / Insegnare <strong>a</strong></li>
                <li>• Abituarsi <strong>a</strong></li>
                <li>• Continuare <strong>a</strong></li>
              </ul>
            </div>
            
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Esempi Pratici</h4>
              <ul className="space-y-3 text-sm text-slate-600 italic">
                <li>"Vado <strong>a</strong> studiare in biblioteca."</li>
                <li>"Non riesco <strong>a</strong> capire questo problema."</li>
                <li>"Ho cominciato <strong>a</strong> lavorare presto."</li>
                <li>"Mi devo abituare <strong>a</strong> svegliarmi presto."</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">6.2 Verbi seguiti dalla preposizione "DI"</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            I verbi che richiedono la preposizione <strong>"di"</strong> prima di un infinito spesso esprimono la fine di un'azione, una decisione, un'opinione o un suggerimento.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
              <h4 className="font-bold text-emerald-900 mb-2">Verbi Comuni + DI</h4>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Finire / Terminare <strong>di</strong></li>
                <li>• Smettere <strong>di</strong></li>
                <li>• Decidere <strong>di</strong></li>
                <li>• Dimenticare / Ricordare <strong>di</strong></li>
                <li>• Pensare / Credere <strong>di</strong></li>
                <li>• Cercare <strong>di</strong></li>
              </ul>
            </div>
            
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Esempi Pratici</h4>
              <ul className="space-y-3 text-sm text-slate-600 italic">
                <li>"Ho finito <strong>di</strong> leggere il libro."</li>
                <li>"Devi smettere <strong>di</strong> fumare."</li>
                <li>"Abbiamo deciso <strong>di</strong> partire."</li>
                <li>"Cerco <strong>di</strong> imparare l'italiano."</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-900">
            <strong>⚠️ Da non confondere:</strong> "Provare a" vs "Cercare di". Entrambi significano "to try", ma usano preposizioni diverse!
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">6.3 Preposizioni di Luogo: IN vs A (e Articolate)</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Le preposizioni di luogo possono essere semplici o articolate (unite all'articolo determinativo). La regola base per le nazioni e città è fissa, ma i luoghi comuni hanno regole specifiche.
          </p>

          <div className="space-y-6">
            <div className="border border-purple-200 rounded-lg overflow-hidden">
              <div className="bg-purple-100 px-4 py-2 font-bold text-purple-900 border-b border-purple-200">
                Regola Aurea: Città vs Nazioni
              </div>
              <div className="p-4 grid md:grid-cols-2 gap-4 bg-purple-50">
                <div>
                  <h5 className="font-bold text-purple-800">Usa "A" per le CITTÀ</h5>
                  <p className="text-sm italic text-purple-700">Vado <strong>a</strong> Roma. Vivo <strong>a</strong> Milano. Sono <strong>a</strong> Parigi.</p>
                </div>
                <div>
                  <h5 className="font-bold text-purple-800">Usa "IN" per NAZIONI / REGIONI</h5>
                  <p className="text-sm italic text-purple-700">Vado <strong>in</strong> Italia. Vivo <strong>in</strong> Toscana. Sono <strong>negli</strong> Stati Uniti (plurale).</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                <h5 className="font-bold text-slate-800 mb-2">Luoghi che prendono "IN"</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• in banca, in posta</li>
                  <li>• in ufficio, in farmacia</li>
                  <li>• in montagna, in campagna</li>
                  <li>• in centro, in periferia</li>
                  <li>• in biblioteca, in discoteca</li>
                </ul>
                <p className="text-xs mt-2 text-slate-500 italic">*I luoghi che finiscono in -teca o -ia prendono quasi sempre "in".</p>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                <h5 className="font-bold text-slate-800 mb-2">Luoghi che prendono "AL / ALLA"</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• al cinema, al teatro</li>
                  <li>• al ristorante, al bar</li>
                  <li>• al mare, al lago</li>
                  <li>• alla stazione, all'aeroporto</li>
                  <li>• al supermercato, al mercato</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-900">
              <strong>Il verbo Andare da una persona:</strong> Se la destinazione è una persona (nome, pronome, o professione), si usa SEMPRE la preposizione <strong>DA</strong>.<br/>
              <em>Vado <strong>da</strong> Marco. Vado <strong>dal</strong> medico. Vengo <strong>da</strong> te.</em>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 6: Preposizioni e Reggenze</h2>
        <p className="text-slate-600 text-lg">Reggenze verbali (verbi con 'a' e 'di') e l'uso avanzato delle preposizioni di luogo.</p>
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
