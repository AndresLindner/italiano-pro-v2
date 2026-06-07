import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, XCircle, Volume2, Info, BrainCircuit, RefreshCw, Award } from 'lucide-react';
import { wordFormationData } from '../data/word_formation_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

export function WordFormationSection() {
  const [activeSet, setActiveSet] = useState(0); // Sets 0 to 4 (10 questions each)
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth() || { userProgress: {}, saveProgress: () => {}, logError: () => {}, resolveError: () => {} };

  // Load progress
  useEffect(() => {
    if (userProgress && userProgress['wordFormation']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['wordFormation'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['wordFormation'].checked || {}) : prev);
    }
  }, [userProgress]);

  const startIndex = activeSet * 10;
  const currentExercises = wordFormationData.slice(startIndex, startIndex + 10);

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) setShowResults(false);
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('wordFormation', {
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
      logError(ex, "Derivazione e Morfologia B2");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('wordFormation', { answers: userAnswers, checked: newChecked });
  };

  const checkAllAnswers = () => {
    let currentScore = 0;
    currentExercises.forEach(ex => {
      const userAnswer = (userAnswers[ex.id] || '').trim().toLowerCase();
      const correctAnswer = ex.answer.toLowerCase();
      
      if (userAnswer === correctAnswer) {
        currentScore++;
        resolveError(ex.id);
      } else {
        logError(ex, "Derivazione e Morfologia B2");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('wordFormation', { answers: userAnswers, checked: newChecked });
  };

  const resetSet = () => {
    const newAnswers = { ...userAnswers };
    const newChecked = { ...checkedAnswers };
    
    currentExercises.forEach(ex => {
      delete newAnswers[ex.id];
      delete newChecked[ex.id];
    });

    setUserAnswers(newAnswers);
    setCheckedAnswers(newChecked);
    setShowResults(false);
    setScore(0);
    saveProgress('wordFormation', { answers: newAnswers, checked: newChecked });
  };

  const speakText = (text) => {
    speakItalian(text);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-5xl mx-auto">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2 flex items-center gap-3">
          <BrainCircuit className="text-indigo-600" size={36} /> Derivazione e Morfologia B2
        </h2>
        <p className="text-slate-600 text-lg">
          Allena la morfologia derivativa trasformando i verbi e i nomi tra parentesi nelle forme corrette per completare la frase (es. nominalizzazione, aggettivazione, avverbi).
        </p>
      </header>

      {/* Set Selector */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {[0, 1, 2, 3, 4].map((setIndex) => (
          <button
            key={setIndex}
            onClick={() => {
              setActiveSet(setIndex);
              setShowResults(false);
            }}
            className={`flex-shrink-0 px-5 py-3 rounded-full font-bold transition-all shadow-sm
              ${activeSet === setIndex 
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' 
                : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'}`}
          >
            Set {setIndex + 1} (Esercizi {setIndex * 10 + 1}-{setIndex * 10 + 10})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Exercises Card */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Trasforma le parole tra parentesi</h3>
            {showResults && (
              <div className="text-lg font-bold px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                Punteggio: {score} / 10
              </div>
            )}
          </div>

          <div className="space-y-4">
            {currentExercises.map((ex, idx) => {
              const parts = ex.sentence.split('{blank}');
              const userAnswer = userAnswers[ex.id] || '';
              const isChecked = showResults || checkedAnswers[ex.id];
              const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
              const textToSpeak = ex.sentence.replace('{blank}', isChecked ? ex.answer : (userAnswer || '...'));

              return (
                <div key={ex.id} className={`p-4 rounded-xl border transition-all ${isChecked ? (isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200') : 'bg-slate-50 border-slate-200 hover:border-indigo-300'}`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <span className="font-bold text-slate-400 w-6 flex-shrink-0">{startIndex + idx + 1}.</span>
                    <div className="flex-1 text-slate-700 leading-relaxed flex flex-wrap items-center gap-1">
                      <span>{parts[0]}</span>
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
                        className={`w-36 md:w-48 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
                          ${isChecked 
                            ? (isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-red-500 bg-red-100 text-red-800')
                            : 'border-indigo-200 focus:border-indigo-500 text-indigo-900 bg-white'
                          }
                        `}
                        placeholder="..."
                      />
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
                          className="text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                          title="Controlla risposta"
                        >
                          <CheckCircle2 size={24} />
                        </button>
                      )}
                      {isChecked && (
                        <div className="w-8 flex justify-center">
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
                onClick={checkAllAnswers}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <CheckCircle2 size={20} /> Controlla le Risposte
              </button>
            ) : (
              <button 
                onClick={resetSet}
                className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
              >
                <RefreshCw size={20} /> Riprova questo Set
              </button>
            )}
          </div>
        </div>

        {/* Right: Info Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-xs space-y-4">
            <h4 className="font-bold text-indigo-950 flex items-center gap-2">
              <Info size={20} className="text-indigo-600" /> Cos'è la Derivazione?
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              Negli esami ufficiali B2 (come la Prova 3 di CILS), viene spesso richiesto di trasformare una parola base in un'altra parte del discorso per completare il testo:
            </p>
            <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc">
              <li><strong>Nominalizzazione</strong>: Verbo &rarr; Nome (es. <em>descrivere</em> &rarr; <em>descrizione</em>, <em>assumere</em> &rarr; <em>assunzione</em>).</li>
              <li><strong>Aggettivazione</strong>: Nome &rarr; Aggettivo (es. <em>ecologia</em> &rarr; <em>ecologica</em>, <em>professione</em> &rarr; <em>professionale</em>).</li>
              <li><strong>Avverbializzazione</strong>: Aggettivo &rarr; Avverbio (es. <em>rapido</em> &rarr; <em>rapidamente</em>).</li>
            </ul>
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-xs flex items-start gap-3 text-emerald-900 text-sm">
            <Award className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <strong>Consiglio d'Esame:</strong> Presta molta attenzione all'accordo di genere e numero degli aggettivi con i sostantivi di riferimento (es. soluzione <em>ecologica</em>, contratti <em>professionali</em>).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
