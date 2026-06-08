import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, Play, Info, BrainCircuit, Volume2 } from 'lucide-react';
import { modulo1Data } from '../data/modulo1_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

export function Modulo1Section() {
  const speakText = (text) => {
    speakItalian(text);
  };
  const [activeTab, setActiveTab] = useState('teoria'); // 'teoria' or 'pratica'
  const [activeExerciseSection, setActiveExerciseSection] = useState('section1_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  // Load progress from database
  React.useEffect(() => {
    if (userProgress && userProgress['modulo1']) {
      // Only set if local is empty to avoid overwriting ongoing typing
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo1'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo1'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo1Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    // Save progress as they type
    saveProgress('modulo1', { 
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
      logError(ex, "Modulo 1: Il Congiuntivo");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo1', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 1: Il Congiuntivo");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo1', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo1', { answers: {}, checked: {} });
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
          <p className="text-slate-700 mb-6 leading-relaxed">Alcune congiunzioni richiedono <strong>sempre</strong> il congiuntivo, indipendentemente dal verbo della frase principale:</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Concessive */}
            <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors bg-slate-50/50 space-y-4">
              <strong className="text-indigo-800 text-lg block border-b pb-1">Concessive</strong>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Esprimono una concessione (sebbene, benché, malgrado, nonostante):</p>
              
              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">sebbene</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Sebbene sia stanco, continuerò a studiare.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Sebbene sia</strong> stanco, continuerò a studiare. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Although I am tired, I will continue studying.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ha comprato quel libro, sebbene costi molto.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ha comprato quel libro, <strong>sebbene costi</strong> molto. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(He bought that book, although it costs a lot.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Sebbene faccia freddo, faremo una passeggiata.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Sebbene faccia</strong> freddo, faremo una passeggiata. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Although it is cold, we will take a walk.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">benché</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Benché sia tardi, preferisco finire il lavoro.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Benché sia</strong> tardi, preferisco finire il lavoro. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Even though it is late, I prefer to finish the work.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Non siamo andati al mare benché ci fosse il sole.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Non siamo andati al mare <strong>benché ci fosse</strong> il sole. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(We didn't go to the beach even though it was sunny.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Benché dica il contrario, so che ha paura.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Benché dica</strong> il contrario, so che ha paura. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Even though he says the opposite, I know he is afraid.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">malgrado</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Malgrado sia difficile, risolveremo il problema.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Malgrado sia</strong> difficile, risolveremo il problema. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(In spite of it being difficult, we will solve the problem.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Continuava a sorridere malgrado fosse molto triste.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Continuava a sorridere <strong>malgrado fosse</strong> molto triste. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(She kept smiling in spite of being very sad.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Malgrado abbiano studiato molto, non hanno superato il test.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Malgrado abbiano</strong> studiato molto, non hanno superato il test. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Despite having studied a lot, they didn't pass the test.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">nonostante</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Nonostante piova, usciremo a correre.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Nonostante piova</strong>, usciremo a correre. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Despite it raining, we will go out for a run.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ha accettato l'offerta nonostante lo stipendio fosse basso.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ha accettato l'offerta <strong>nonostante lo stipendio fosse</strong> basso. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(He accepted the offer despite the salary being low.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Nonostante avesse poco tempo, mi ha aiutato.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Nonostante avesse</strong> poco tempo, mi ha aiutato. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Despite having little time, he helped me.)</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Condizionali */}
            <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors bg-slate-50/50 space-y-4">
              <strong className="text-indigo-800 text-lg block border-b pb-1">Condizionali</strong>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Esprimono una condizione (purché, a patto che, a condizione che, nel caso in cui):</p>
              
              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">purché</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Puoi venire con noi, purché tu faccia silenzio.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Puoi venire con noi, <strong>purché tu faccia</strong> silenzio. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(You can come with us, provided you keep quiet.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ti presterò la macchina purché tu la riporti domani.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ti presterò la macchina <strong>purché tu la riporti</strong> domani. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I will lend you the car provided you bring it back tomorrow.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Farò qualsiasi lavoro purché sia ben pagato.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Farò qualsiasi lavoro <strong>purché sia</strong> ben pagato. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I will do any job provided it is well paid.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">a patto che</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ti perdono, a patto che tu non lo faccia più.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ti perdono, <strong>a patto che tu</strong> non lo <strong>faccia</strong> più. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I forgive you, on condition that you don't do it again.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Accetto l'invito a patto che cucini tu.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Accetto l'invito <strong>a patto che cucini</strong> tu. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I accept the invitation on condition that you cook.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Possiamo firmare l'accordo a patto che vengano rispettati i termini.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Possiamo firmare l'accordo <strong>a patto che vengano</strong> rispettati i termini. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(We can sign the agreement on condition that the terms are respected.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">a condizione che</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ti aiuterò a condizione che tu mi ascolti.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ti aiuterò <strong>a condizione che tu</strong> mi <strong>ascolti</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I will help you on condition that you listen to me.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Verrò alla cena a condizione che ci sia anche Maria.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Verrò alla cena <strong>a condizione che ci sia</strong> anche Maria. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I will come to the dinner on condition that Maria is also there.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Gli daranno il permesso a condizione che finisca i compiti.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Gli daranno il permesso <strong>a condizione che finisca</strong> i compiti. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(They will give him permission on condition that he finishes his homework.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">nel caso in cui</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Nel caso in cui tu abbia bisogno, chiamami.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Nel caso in cui tu abbia</strong> bisogno, chiamami. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(In case you need anything, call me.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Portati l'ombrello nel caso in cui piova.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Portati l'ombrello <strong>nel caso in cui piova</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Take an umbrella in case it rains.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Nel caso in cui ci fossero problemi, contattate la reception.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Nel caso in cui ci fossero</strong> problemi, contattate la reception. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(In case there are any problems, contact reception.)</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Finali */}
            <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors bg-slate-50/50 space-y-4">
              <strong className="text-indigo-800 text-lg block border-b pb-1">Finali</strong>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Esprimono uno scopo o fine (affinché, in modo che):</p>
              
              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">affinché</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ti spiego la regola affinché tu capisca l'errore.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ti spiego la regola <strong>affinché tu capisca</strong> l'errore. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I explain the rule to you so that you understand the mistake.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ha parlato a voce alta affinché tutti lo sentissero.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ha parlato a voce alta <strong>affinché</strong> tutti lo <strong>sentissero</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(He spoke in a loud voice so that everyone could hear him.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Dobbiamo agire subito affinché la situazione non peggiori.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Dobbiamo agire subito <strong>affinché</strong> la situazione non <strong>peggiori</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(We must act immediately so that the situation doesn't get worse.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">in modo che</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Scrivilo in modo che tu non lo dimentichi.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Scrivilo <strong>in modo che tu</strong> non lo <strong>dimentichi</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Write it down so that you don't forget it.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Sposta la sedia in modo che io possa passare.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Sposta la sedia <strong>in modo che io possa</strong> passare. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Move the chair so that I can pass.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Organizziamo tutto in modo che non ci siano ritardi.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Organizziamo tutto <strong>in modo che</strong> non ci <strong>siano</strong> ritardi. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Let's organize everything so that there are no delays.)</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Temporali & Esclusive */}
            <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors bg-slate-50/50 space-y-4">
              <strong className="text-indigo-800 text-lg block border-b pb-1">Temporali & Esclusive</strong>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Esprimono tempo o esclusione (prima che, senza che, tranne che):</p>
              
              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">prima che</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Usciamo prima che inizi a piovere.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Usciamo <strong>prima che inizi</strong> a piovere. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Let's go out before it starts raining.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Voglio parlarti prima che tu prenda una decisione.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Voglio parlarti <strong>prima che tu prenda</strong> una decisione. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I want to talk to you before you make a decision.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Finisci il pranzo prima che si raffreddi.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Finisci il pranzo <strong>prima che</strong> si <strong>raffreddi</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Finish your lunch before it gets cold.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">senza che</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("È partito senza che nessuno lo sapesse.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>È partito <strong>senza che</strong> nessuno lo <strong>sapesse</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(He left without anyone knowing it.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Ha risolto il problema senza che io dicessi nulla.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Ha risolto il problema <strong>senza che io dicessi</strong> nulla. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(He solved the problem without me saying anything.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Il tempo passa senza che ce ne accorgiamo.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Il tempo passa <strong>senza che</strong> ce ne <strong>accorgiamo</strong>. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Time passes without us noticing it.)</span></span>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">tranne che</span>
                  <ul className="mt-2 space-y-1.5 pl-2 border-l border-indigo-200">
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Farò di tutto tranne che venire a quel concerto.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Farò di tutto <strong>tranne che venire</strong> a quel concerto. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I will do anything except come to that concert.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Accetto qualsiasi soluzione tranne che si perda tempo.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span>Accetto qualsiasi soluzione <strong>tranne che</strong> si <strong>perda</strong> tempo. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(I accept any solution except that time is wasted.)</span></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-slate-700">
                      <button onClick={() => speakText("Tranne che tu non preferisca rimanere a casa, noi andiamo.")} className="text-slate-400 hover:text-indigo-600 mt-0.5 flex-shrink-0" title="Ascolta"><Volume2 size={14} /></button>
                      <span><strong>Tranne che tu</strong> non <strong>preferisca</strong> rimanere a casa, noi andiamo. <span className="text-slate-400 text-xs italic block md:inline md:ml-1">(Unless you prefer to stay home, we are going.)</span></span>
                    </li>
                  </ul>
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
