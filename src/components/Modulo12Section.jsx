import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, Play, Info, BrainCircuit, Volume2 } from 'lucide-react';
import { modulo12Data } from '../data/modulo12_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

export function Modulo12Section() {
  const speakText = (text) => {
    speakItalian(text);
  };
  const [activeTab, setActiveTab] = useState('teoria'); // 'teoria' or 'pratica'
  const [activeExerciseSection, setActiveExerciseSection] = useState('section12_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth() || { userProgress: {}, saveProgress: () => {}, logError: () => {}, resolveError: () => {} };

  // Load progress from database
  React.useEffect(() => {
    if (userProgress && userProgress['modulo12']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo12'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo12'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo12Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo12', { 
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
      logError(ex, "Modulo 12: Grammatica Integrativa");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo12', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 12: Grammatica Integrativa");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo12', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo12', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section12_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.1 Doppio Ausiliare
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.2 Verbi Pronominali
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.3 Indefiniti
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_4'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_4' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.4 Modi Indefiniti
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_5'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_5' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.5 Relativi B2
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_6'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_6' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.6 Impersonale Avanzato
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section12_1' && "Completa con l'ausiliare o il participio passato corretto"}
              {activeExerciseSection === 'section12_2' && "Completa coniugando il verbo pronominale o inserendo il pronome"}
              {activeExerciseSection === 'section12_3' && "Inserisci l'aggettivo o il pronome indefinito corretto"}
              {activeExerciseSection === 'section12_4' && "Scegli la forma non finita corretta del verbo o posiziona il clitico"}
              {activeExerciseSection === 'section12_5' && "Completa con il relativo possessivo (cui) o il relativo neutro (che)"}
              {activeExerciseSection === 'section12_6' && "Completa accordando correttamente l'aggettivo dopo 'si è'"}
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
        {/* Doppio Ausiliare */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">
            12.1 Doppio Ausiliare e Accordo al Passato
          </h3>
          <p className="text-slate-700 mb-4 leading-relaxed font-medium">
            Alcuni verbi cambiano ausiliare nei tempi composti a seconda della loro transitività o del significato specifico della frase:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Con AVERE (Transitivo)</h4>
              <p className="text-sm text-slate-700 mb-3">Si usa quando il verbo regge un complemento oggetto diretto (risponde alla domanda: chi? che cosa?).</p>
              <ul className="text-sm space-y-2.5">
                <li className="flex flex-col">
                  <span>• <strong>Cambiare:</strong> "Ho cambiato la macchina."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Ho cambiato la macchina.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Salire:</strong> "Ho salito le scale di corsa."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Ho salito le scale di corsa.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Finire:</strong> "Ho finito i compiti alle otto."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Ho finito i compiti alle otto.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Passare:</strong> "Ho passato un pomeriggio stupendo."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Ho passato un pomeriggio stupendo.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Correre:</strong> "Marco ha corso una maratona."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Marco ha corso una maratona.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-2">Con ESSERE (Intransitivo)</h4>
              <p className="text-sm text-slate-700 mb-3">Si usa quando non c'è un oggetto diretto. Il participio passato concorda sempre in genere e numero con il soggetto.</p>
              <ul className="text-sm space-y-2.5">
                <li className="flex flex-col">
                  <span>• <strong>Cambiare:</strong> "Il tempo è cambiat<strong>o</strong> in peggio."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Il tempo è cambiato in peggio.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Salire:</strong> "Sono salit<strong>a</strong> sul treno in orario."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Sono salita sul treno in orario.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Finire:</strong> "La lezione è finit<strong>a</strong> da dieci minuti."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("La lezione è finita da dieci minuti.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Passare:</strong> "Il tempo è passat<strong>o</strong> in fretta."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Il tempo è passato in fretta.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
                <li className="flex flex-col">
                  <span>• <strong>Correre:</strong> "Sono cors<strong>o</strong> subito in ufficio."</span>
                  <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-xs" onClick={() => speakText("Sono corso subito in ufficio.")}>
                    Ascolta <Volume2 size={12} className="inline ml-1" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-amber-50 p-4 border-l-4 border-amber-500 text-amber-900 rounded-r-lg text-sm space-y-2">
            <p><strong>💡 Regola dell'Accordo con i Pronomi Diretti (Clitici):</strong></p>
            <p>Con l'ausiliare <em>avere</em> il participio di solito non cambia, ma concorda obbligatoriamente in genere e numero se preceduto dai pronomi diretti di 3ª persona (<strong>lo, la, li, le</strong>) o dal pronome partitivo <strong>ne</strong>.</p>
            <ul className="pl-4 list-disc space-y-1 text-xs italic text-slate-700">
              <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Le chiavi? Le ho lasciate sul tavolo.")}>"Le chiavi? Le ho lasciat<strong>e</strong> sul tavolo." (accordo con "le")</li>
              <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Il libro? L'ho comprato ieri.")}>"Il libro? L'ho comprat<strong>o</strong> ieri." (L' = lo, accordo con "lo")</li>
              <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Di mele, ne ho mangiate due.")}>"Di mele, ne ho mangiat<strong>e</strong> due." (accordo con il partitivo "ne" riferito a due mele)</li>
            </ul>
          </div>
        </section>

        {/* Verbi Pronominali */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.2 I Verbi Pronominali Complessi</h3>
          <p className="text-slate-700 mb-4 leading-relaxed font-medium">
            Questi verbi integrano pronomi clitici (<em>ci, vi, ne, la, le, si</em>) modificando radicalmente il significato originario del verbo base. Sono diffusissimi nella lingua quotidiana e nei contesti formali del B2:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <strong className="text-indigo-800 text-base">Cavarsela (cavarsi + la)</strong>
                <p className="text-xs text-slate-600 mt-1">Uscire indenni da una difficoltà, superare una prova in modo sufficiente o positivo.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block" onClick={() => speakText("All'esame di italiano me la sono cavata con un bel trenta.")}>
                  Es: "All'esame di italiano me la sono cavata con un bel 30." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block mt-1" onClick={() => speakText("Non ti preoccupare, vedrai che te la caverai.")}>
                  Es: "Non ti preoccupare, vedrai che te la caverai." <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <strong className="text-indigo-800 text-base">Entrarci (entrare + ci)</strong>
                <p className="text-xs text-slate-600 mt-1">Avere relazione, pertinenza o responsabilità in un fatto.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block" onClick={() => speakText("Questo argomento non c'entra nulla con la lezione di oggi.")}>
                  Es: "Questo non c'entra nulla con la lezione." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block mt-1" onClick={() => speakText("Io non c'entro niente in questa discussione!")}>
                  Es: "Io non c'entro niente in questa discussione!" <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <strong className="text-indigo-800 text-base">Andarsene (andarsi + ne)</strong>
                <p className="text-xs text-slate-600 mt-1">Allontanarsi, andare via da un posto (spesso con stizza, fretta o stanchezza).</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block" onClick={() => speakText("Me ne vado prima che inizi a piovere.")}>
                  Es: "Me ne vado prima che inizi a piovere." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block mt-1" onClick={() => speakText("Se ne sono andati senza dire una parola.")}>
                  Es: "Se ne sono andati senza salutare." <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <strong className="text-indigo-800 text-base">Prendersela (prendersi + la)</strong>
                <p className="text-xs text-slate-600 mt-1">Offendersi, arrabbiarsi o sentirsi feriti per qualcosa.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block" onClick={() => speakText("Non prendertela per così poco!")}>
                  Es: "Non prendertela per così poco!" <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block mt-1" onClick={() => speakText("Giulia se l'è presa perché non l'hai invitata.")}>
                  Es: "Giulia se l'è presa per il ritardo." <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <strong className="text-indigo-800 text-base">Farcela (fare + ci + la)</strong>
                <p className="text-xs text-slate-600 mt-1">Riuscire a raggiungere un obiettivo, tollerare una situatione difficile.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block" onClick={() => speakText("Sì, ce l'ho fatta a superare il test di livello!")}>
                  Es: "Sì, ce l'ho fatta a superare il test!" <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block mt-1" onClick={() => speakText("Non ce la faccio più a lavorare con questo rumore.")}>
                  Es: "Non ce la faccio più con questa confusione." <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <strong className="text-indigo-800 text-base">Metterci vs Volerci</strong>
                <p className="text-xs text-slate-600 mt-1"><strong>Metterci:</strong> tempo impiegato da un soggetto specifico. <strong>Volerci:</strong> tempo oggettivo necessario in generale.</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block" onClick={() => speakText("Io ci metto un'ora ad arrivare in ufficio.")}>
                  Es: "Io ci metto un'ora ad arrivare in ufficio." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors text-sm block mt-1" onClick={() => speakText("Ci vogliono due ore di macchina da Milano a Torino.")}>
                  Es: "Ci vogliono due ore da qui a Milano." <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Indefiniti */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.3 Aggettivi e Pronomi Indefiniti</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Gli indefiniti servono a indicare quantità o identità generiche. È importante saper distinguere tra aggettivi (accompagnano un nome) e pronomi (lo sostituiscono):
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-indigo-50 text-indigo-900 font-bold">
                  <th className="p-3 border">Solo Aggettivi</th>
                  <th className="p-3 border">Solo Pronomi</th>
                  <th className="p-3 border">Sia Aggettivi sia Pronomi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Qualche</span> (+ nome singolare)<br />
                    <span className="text-xs text-slate-500 italic">Es: "Ho qualche dubbio."</span>
                  </td>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Qualcuno / Qualcosa</span><br />
                    <span className="text-xs text-slate-500 italic">Es: "Qualcuno ha chiamato."</span>
                  </td>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Nessuno / Ciascuno</span><br />
                    <span className="text-xs text-slate-500 italic">Es: "Nessuno studente sapeva." / "Nessuno è venuto."</span>
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Ogni</span> (+ nome singolare)<br />
                    <span className="text-xs text-slate-500 italic">Es: "Ogni giorno studio."</span>
                  </td>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Chiunque</span><br />
                    <span className="text-xs text-slate-500 italic">Es: "Chiunque può capirlo."</span>
                  </td>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Alcuno / Tutto / Molto / Poco</span><br />
                    <span className="text-xs text-slate-500 italic">Es: "Alcuni amici" / "Ne conosco alcuni."</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Qualsiasi / Qualunque</span><br />
                    <span className="text-xs text-slate-500 italic">Es: "Scegli un giorno qualsiasi."</span>
                  </td>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Niente / Nulla</span><br />
                    <span className="text-xs text-slate-500 italic">Es: "Non c'è niente da dire."</span>
                  </td>
                  <td className="p-3 border font-semibold">
                    <span className="text-indigo-700">Tanto / Troppo / Diverso / Vario</span><br />
                    <span className="text-xs text-slate-500 italic">Es: "Troppe risposte" / "Ce ne sono troppe."</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm">
            <h4 className="font-bold text-slate-800 mb-3">Esempi pratici a confronto (Clicca per ascoltare):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2.5">
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Ho comprato qualche libro interessante.")}>
                  • <strong>Qualche (sing.) vs Alcuni (plur.):</strong><br />
                  <span className="italic text-slate-600">"Ho comprato <strong>qualche</strong> libro." (sing.)</span> / <span className="italic text-slate-600">"Ho comprato <strong>alcuni</strong> libri." (plur.)</span>
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Non ho visto nessuno studente in aula.")}>
                  • <strong>Nessuno (Doppia Negazione):</strong><br />
                  <span className="italic text-slate-600">"Non ho visto <strong>nessuno</strong>."</span> (Con "non" a inizio frase, "nessuno" va dopo il verbo).
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Nessuno mi ha avvisato dell'orario.")}>
                  • <strong>Nessuno (Soggetto):</strong><br />
                  <span className="italic text-slate-600">"<strong>Nessuno</strong> mi ha avvisato."</span> (Se precede il verbo, non serve il "non").
                </li>
              </ul>
              <ul className="space-y-2.5">
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Qualunque decisione tu prenda, ti sosterrò.")}>
                  • <strong>Qualunque / Qualsiasi (Indifferenza):</strong><br />
                  <span className="italic text-slate-600">"Accetto <strong>qualsiasi</strong> consiglio."</span> / <span className="italic text-slate-600">"<strong>Qualunque</strong> cosa dica, ha torto."</span>
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Chiunque può partecipare al corso gratuito.")}>
                  • <strong>Chiunque (Valore Concessivo):</strong><br />
                  <span className="italic text-slate-600">"<strong>Chiunque</strong> voglia entrare, deve registrarsi."</span> (Chiunque vuole/voglia).
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Ciascuno studente deve presentarsi all'esame.")}>
                  • <strong>Ciascuno (Distributivo singolare):</strong><br />
                  <span className="italic text-slate-600">"<strong>Ciascuno</strong> ha le proprie idee."</span> / <span className="italic text-slate-600">"<strong>Ciascun</strong> partecipante."</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Modi Indefiniti */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.4 Modi Indefiniti e Posizione dei Clitici</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            L'uso delle forme implicite (Gerundio, Participio, Infinito) permette di condensare il discorso eliminando le congiunzioni e i pronomi soggetto, tipico della scrittura formale B2:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold text-indigo-800 mb-2">Gerundio (Presente / Passato)</h4>
              <ul className="text-xs space-y-2">
                <li>
                  <strong className="block text-slate-700">Causale:</strong>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block mt-1" onClick={() => speakText("Sapendo che eri malato, sono venuto a trovarti.")}>
                    "<strong>Sapendo</strong> che eri malato, sono venuto." (= Poiché sapevo...) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
                <li>
                  <strong className="block text-slate-700 mt-2">Concessivo:</strong>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block mt-1" onClick={() => speakText("Pur avendo studiato molto, non ha superato l'esame.")}>
                    "<strong>Pur avendo studiato</strong>, non ha superato il test." (= Anche se ha studiato...) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
                <li>
                  <strong className="block text-slate-700 mt-2">Temporale/Causale Passato:</strong>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block mt-1" onClick={() => speakText("Avendo finito il lavoro, sono andata a casa.")}>
                    "<strong>Avendo finito</strong> il lavoro, sono andata." (= Dopo aver finito...) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold text-indigo-800 mb-2">Participio Assoluto</h4>
              <p className="text-[11px] text-slate-500 mb-2">Costruzione in cui il participio passato si concorda con il nome che funge da soggetto della frase implicita.</p>
              <ul className="text-xs space-y-2">
                <li>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block" onClick={() => speakText("Finiti i compiti, siamo andati a giocare.")}>
                    "<strong>Finiti i compiti</strong>, siamo andati al parco." (= Una volta che furono finiti i compiti) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
                <li>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block mt-2" onClick={() => speakText("Partiti gli ospiti, abbiamo pulito la cucina.")}>
                    "<strong>Partiti gli ospiti</strong>, abbiamo pulito casa." (= Dopo che gli ospiti se ne furono andati) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
                <li>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block mt-2" onClick={() => speakText("Approvata la legge, il parlamento si è sciolto.")}>
                    "<strong>Approvata la legge</strong>, si è festeggiato." (= Dopo che la legge fu approvata) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold text-indigo-800 mb-2">Infinito Sostantivato</h4>
              <p className="text-[11px] text-slate-500 mb-2">L'infinito preceduto dall'articolo determinativo assume il valore di un sostantivo astratto.</p>
              <ul className="text-xs space-y-2">
                <li>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block" onClick={() => speakText("L'essere puntuali è un segno di rispetto.")}>
                    "<strong>L'essere puntuali</strong> è fondamentale." (= Il fatto di essere puntuali) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
                <li>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block mt-2" onClick={() => speakText("Il viaggiare apre la mente a nuove culture.")}>
                    "<strong>Il viaggiare</strong> apre la mente." (= L'attività del viaggiare) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
                <li>
                  <span className="italic text-slate-600 cursor-pointer hover:text-indigo-600 block mt-2" onClick={() => speakText("Il mangiare sano allunga la vita.")}>
                    "<strong>Il mangiare sano</strong> previene le malattie." (= Un'alimentazione sana) <Volume2 size={11} className="inline ml-1" />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-sky-50 p-4 border border-sky-200 rounded-lg text-sky-900 text-sm">
            <p className="font-bold">⚠️ Regola dell'Enclisi (Posizione dei Pronomi Clitici):</p>
            <p className="mt-1">Nelle forme verbali di modo indefinito (Gerundio, Participio, Infinito) e nell'imperativo, i pronomi clitici si saldano obbligatoriamente <strong>alla fine del verbo</strong> formando una sola parola:</p>
            <ul className="pl-4 list-disc space-y-1.5 text-xs italic text-slate-700 mt-2">
              <li className="cursor-pointer hover:text-indigo-600" onClick={() => speakText("Guardandola attentamente, notai un piccolo dettaglio.")}>
                "Guardando + la ➔ <strong>Guardandola</strong> con attenzione, ho notato..." (Gerundio)
              </li>
              <li className="cursor-pointer hover:text-indigo-600" onClick={() => speakText("Dopo avergli parlato, mi sono sentito subito meglio.")}>
                "Avere + gli + parlato ➔ <strong>Avergli</strong> parlato è stato utile." (Infinito Passato)
              </li>
              <li className="cursor-pointer hover:text-indigo-600" onClick={() => speakText("Per dirla tutta, non sono d'accordo con la decisione.")}>
                "Dire + la + tutta ➔ <strong>Dirla</strong> tutta, non mi interessa." (Infinito Presente)
              </li>
              <li className="cursor-pointer hover:text-indigo-600" onClick={() => speakText("Fattosi tardi, salutò tutti e se ne andò.")}>
                "Fatto + si + tardi ➔ <strong>Fattosi</strong> tardi, è andato via." (Participio Passato)
              </li>
            </ul>
          </div>
        </section>

        {/* Relativi Possessivi e Neutri */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.5 Pronomi Relativi Complessi</h3>
          <p className="text-slate-700 mb-4 leading-relaxed font-medium">
            Nel livello B2, l'uso corretto di connettori relativi complessi garantisce fluidità e coesione testuale:
          </p>
          <ul className="space-y-4 text-sm text-slate-700">
            <li className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-indigo-800 block text-base">Il cui / La cui / I cui / Le cui (Relativo Possessivo)</strong>
              <p className="text-xs text-slate-600 mt-1 mb-2">Esprime possesso e si colloca tra l'articolo determinativo e il sostantivo a cui si riferisce, concordandosi con quest'ultimo in genere e numero (non con il possessore!).</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("L'insegnante, le cui spiegazioni sono famose, è stimato.")}>
                  Es (femm. plur.): "L'insegnante, <strong>le cui</strong> spiegazion<strong>i</strong> sono chiare..." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Lo scrittore, il cui romanzo ha vinto il premio, è giovane.")}>
                  Es (masch. sing.): "Lo scrittore, <strong>il cui</strong> romanz<strong>o</strong> ha vinto..." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("I ragazzi, i cui genitori sono all'estero, vivono qui.")}>
                  Es (masch. plur.): "I ragazzi, <strong>i cui</strong> genitor<strong>i</strong> lavorano..." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("La città, la cui storia è millenaria, attira turisti.")}>
                  Es (femm. sing.): "La città, <strong>la cui</strong> stori<strong>a</strong> è antica..." <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </li>
            <li className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-indigo-800 block text-base">Il che / La qual cosa (Relativo Neutro)</strong>
              <p className="text-xs text-slate-600 mt-1 mb-2">Si usa per riferirsi non a un singolo sostantivo, bensì all'intera proposizione precedente. Equivale a "questo fatto" o "la qual cosa".</p>
              <div className="space-y-1.5 mt-2">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors block" onClick={() => speakText("Ha superato l'esame con trenta, il che ha reso felici tutti.")}>
                  Es: "Ha superato l'esame con 30, <strong>il che</strong> ha reso felici tutti." <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors block" onClick={() => speakText("Non si è presentato all'appuntamento, la qual cosa mi ha insospettito.")}>
                  Es: "Ha dimenticato l'appuntamento, <strong>la qual cosa</strong> mi fa arrabbiare." <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </li>
            <li className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-indigo-800 block text-base">Chi (Pronome Relativo Misto / Doppio)</strong>
              <p className="text-xs text-slate-600 mt-1 mb-2">Funge contemporaneamente da pronome dimostrativo e relativo (significa: "colui che", "colei che", "coloro che", "tutti quelli che").</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Chi dorme non piglia pesci.")}>
                  Es: "<strong>Chi</strong> dorme non piglia pesci." (= Colui che dorme...) <Volume2 size={13} className="inline ml-1" />
                </span>
                <span className="italic text-slate-500 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Cerca chi ti capisce davvero.")}>
                  Es: "Cerca <strong>chi</strong> ti capisce veramente." (= Coloro che ti capiscono...) <Volume2 size={13} className="inline ml-1" />
                </span>
              </div>
            </li>
          </ul>
        </section>

        {/* Si Impersonale Avanzato */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.6 Si Impersonale Avanzato</h3>
          <p className="text-slate-700 mb-4 leading-relaxed font-medium">
            La costruzione impersonale con il pronome <em>si</em> segue regole d'accordo rigidissime nel B2, soprattutto in combinazione con aggettivi o verbi riflessivi:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-indigo-800 block text-base">Accordo degli Aggettivi (Si è + Aggettivo)</strong>
              <p className="text-xs text-slate-600 mt-1 mb-2">Quando la costruzione impersonale coinvolge il verbo ausiliare <em>essere</em> o <em>diventare</em> seguito da un aggettivo qualificativo, quest'ultimo deve essere coniugato rigorosamente al <strong>PLURALE MASCHILE</strong> (anche se ci si riferisce a una sola persona generica):</p>
              <ul className="text-sm space-y-2 mt-2">
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Quando si è stanchi, si dorme male.")}>
                  • Correct: "Quando si è <strong className="text-emerald-600">stanchi</strong>, si dorme meglio." <Volume2 size={13} className="inline ml-1" />
                </li>
                <li className="text-red-500 select-none font-medium text-xs pl-2.5">
                  • Incorrect: "Quando si è stanco, si dorme meglio." (errore comune di accordo singolare)
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Se si diventa adulti, si hanno più responsabilità.")}>
                  • Correct: "Se si diventa <strong className="text-emerald-600">adulti</strong>, le cose cambiano." <Volume2 size={13} className="inline ml-1" />
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Quando si è felici, tutto sembra più bello.")}>
                  • Correct: "Quando si è <strong className="text-emerald-600">felici</strong>, si sorride spesso." <Volume2 size={13} className="inline ml-1" />
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-indigo-800 block text-base">Costruzione con i Verbi Riflessivi (Ci si)</strong>
              <p className="text-xs text-slate-600 mt-1 mb-2">Quando si rende impersonale un verbo riflessivo (es. <em>svegliarsi, lavarsi, trovarsi</em>), per evitare la cacofonia del doppio "si" (*si si lava*), la particella riflessiva muta in <strong>ci</strong>. La struttura corretta diventa quindi <strong>ci si</strong>:</p>
              <ul className="text-sm space-y-2 mt-2">
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("In vacanza ci si sveglia tardi la mattina.")}>
                  • "Svegliarsi ➔ La mattina <strong>ci si</strong> sveglia tardi." (invece di *si si sveglia*) <Volume2 size={13} className="inline ml-1" />
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Ci si lava le mani prima di mangiare.")}>
                  • "Lavarsi ➔ Prima di mangiare <strong>ci si</strong> lava le mani." <Volume2 size={13} className="inline ml-1" />
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("Ci si pente sempre degli errori passati.")}>
                  • "Pentirsi ➔ Spesso <strong>ci si</strong> pente dei propri errori." <Volume2 size={13} className="inline ml-1" />
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-indigo-800 block text-base">Si Passivante (Accordo col Sostantivo)</strong>
              <p className="text-xs text-slate-600 mt-1 mb-2">Se il verbo è seguito da un sostantivo che funge da soggetto grammaticale della frase, il verbo concorda in numero con quest'ultimo (singolare o plurale):</p>
              <ul className="text-sm space-y-2 mt-2">
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("In Italia si mangia molta pasta ogni giorno.")}>
                  • "In Italia <strong>si mangia</strong> molta pasta." (pasta = singolare, verbo singolare) <Volume2 size={13} className="inline ml-1" />
                </li>
                <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => speakText("In questo ufficio si vendono biglietti per il concerto.")}>
                  • "Qui <strong>si vendono</strong> biglietti." (biglietti = plurale, verbo plurale) <Volume2 size={13} className="inline ml-1" />
                </li>
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
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 12: Grammatica Integrativa</h2>
        <p className="text-slate-600 text-lg">Argomenti grammaticali avanzati di livello B2.</p>
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
