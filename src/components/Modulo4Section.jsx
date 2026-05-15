import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, Play, Info, BrainCircuit } from 'lucide-react';
import { modulo4Data } from '../data/modulo4_data';
import { useAuth } from '../contexts/AuthContext';

export function Modulo4Section() {
  const [activeTab, setActiveTab] = useState('teoria'); 
  const [activeExerciseSection, setActiveExerciseSection] = useState('section4_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  React.useEffect(() => {
    if (userProgress && userProgress['modulo4']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo4'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo4'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo4Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo4', { 
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
      logError(ex, "Modulo 4: Pragmatica e Usi");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo4', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 4: Pragmatica e Usi");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo4', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo4', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section4_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section4_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            4.1 Modi di Dire
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section4_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section4_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            4.2 I Riempitivi
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section4_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section4_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            4.3 Registro Formale
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section4_1' && "Completa l'espressione idiomatica con la parola mancante"}
              {activeExerciseSection === 'section4_2' && "Inserisci il riempitivo più appropriato"}
              {activeExerciseSection === 'section4_3' && "Completa l'e-mail formale con la parola corretta"}
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
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">4.1 Espressioni Idiomatiche</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Le espressioni idiomatiche arricchiscono il vocabolario e dimostrano una grande familiarità con la cultura italiana.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 hover:shadow-md transition-shadow">
              <strong className="text-indigo-900 block text-lg mb-1">In bocca al lupo!</strong>
              <p className="text-slate-700 text-sm">Buona fortuna! Si risponde <em>sempre</em> con "Crepi il lupo!" (Mai dire "grazie!").</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 hover:shadow-md transition-shadow">
              <strong className="text-indigo-900 block text-lg mb-1">Avere le mani in pasta</strong>
              <p className="text-slate-700 text-sm">Essere coinvolto in molti affari (spesso con un'accezione di opportunismo).</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 hover:shadow-md transition-shadow">
              <strong className="text-indigo-900 block text-lg mb-1">Piove sul bagnato</strong>
              <p className="text-slate-700 text-sm">Quando le cose peggiorano ulteriormente, o quando chi ha già molta fortuna ne riceve ancora.</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 hover:shadow-md transition-shadow">
              <strong className="text-indigo-900 block text-lg mb-1">Arrampicarsi sugli specchi</strong>
              <p className="text-slate-700 text-sm">Trovare scuse assurde o improbabili per giustificare un errore palese.</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 hover:shadow-md transition-shadow">
              <strong className="text-indigo-900 block text-lg mb-1">Due piccioni con una fava</strong>
              <p className="text-slate-700 text-sm">Ottenere due risultati utili con un solo sforzo (To kill two birds with one stone).</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 hover:shadow-md transition-shadow">
              <strong className="text-indigo-900 block text-lg mb-1">Essere al verde</strong>
              <p className="text-slate-700 text-sm">Essere completamente senza soldi.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">4.2 I Riempitivi (Intercalari)</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Nel parlato, specialmente agli orali B2, i riempitivi sono fondamentali per prendere tempo, chiarire un concetto o mantenere l'attenzione di chi ascolta in modo naturale.
          </p>
          
          <ul className="space-y-4">
            <li className="flex gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="font-bold text-slate-800 w-24 flex-shrink-0">Cioè</div>
              <div className="text-slate-600 text-sm">Significa "in altre parole / voglio dire". Si usa per correggersi o spiegarsi meglio. <em className="block mt-1">"Non mangio carne, cioè sono vegetariano."</em></div>
            </li>
            <li className="flex gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="font-bold text-slate-800 w-24 flex-shrink-0">Insomma</div>
              <div className="text-slate-600 text-sm">Si usa per riassumere un discorso lungo. <em className="block mt-1">"Ha piovuto, ho bucato la gomma... insomma, una giornataccia."</em></div>
            </li>
            <li className="flex gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="font-bold text-slate-800 w-24 flex-shrink-0">Diciamo</div>
              <div className="text-slate-600 text-sm">Ammorbidisce un'affermazione forte o aiuta a cercare l'aggettivo giusto. <em className="block mt-1">"Il film era... diciamo, un po' noioso."</em></div>
            </li>
            <li className="flex gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="font-bold text-slate-800 w-24 flex-shrink-0">Allora</div>
              <div className="text-slate-600 text-sm">Molto usato per iniziare un discorso ("So..."). <em className="block mt-1">"Allora, da dove iniziamo?"</em></div>
            </li>
            <li className="flex gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="font-bold text-slate-800 w-24 flex-shrink-0">Guarda</div>
              <div className="text-slate-600 text-sm">Richiama l'attenzione dell'ascoltatore prima di dire la propria opinione. <em className="block mt-1">"Guarda, secondo me stai sbagliando."</em></div>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">4.3 Il Registro Formale</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Saper scrivere un'e-mail formale a professori o aziende è una competenza chiave. Richiede un lessico specifico e l'uso del <strong>Lei</strong> (3° persona singolare).
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-emerald-500 pl-4 py-2">
              <h4 className="font-bold text-slate-800 mb-3">L'Apertura</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><strong className="text-slate-800">Egregio</strong> Direttore, (Molto formale)</li>
                <li><strong className="text-slate-800">Gentile</strong> Dottoressa, (Formale standard)</li>
                <li><strong className="text-slate-800">Spettabile</strong> Azienda, (Per enti/aziende)</li>
                <li>Alla <strong className="text-slate-800">cortese attenzione</strong> di...</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-sky-500 pl-4 py-2">
              <h4 className="font-bold text-slate-800 mb-3">La Richiesta</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><strong className="text-slate-800">Le scrivo</strong> in merito a...</li>
                <li><strong className="text-slate-800">Sarei grato/a</strong> se potesse... (Condizionale)</li>
                <li>Le chiedo <strong className="text-slate-800">cortesemente</strong> di...</li>
                <li>In <strong className="text-slate-800">allegato</strong> troverà...</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 border-l-4 border-purple-500 pl-4 py-2">
            <h4 className="font-bold text-slate-800 mb-3">La Chiusura</h4>
            <ul className="space-y-2 text-sm text-slate-600 flex flex-wrap gap-x-8 gap-y-2">
              <li>In <strong className="text-slate-800">attesa di un Suo cortese riscontro</strong>...</li>
              <li>Resto a Sua <strong className="text-slate-800">completa disposizione</strong>.</li>
              <li><strong className="text-slate-800">Cordiali</strong> / <strong className="text-slate-800">Distinti</strong> saluti,</li>
            </ul>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 4: Pragmatica</h2>
        <p className="text-slate-600 text-lg">Competenza sociolinguistica, espressioni idiomatiche e registro formale.</p>
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
