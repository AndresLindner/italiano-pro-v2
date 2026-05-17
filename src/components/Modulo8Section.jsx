import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ChevronRight, FileText } from 'lucide-react';
import { modulo8Data } from '../data/modulo8_data';
import { useAuth } from '../contexts/AuthContext';

export function Modulo8Section() {
  const [activeLetturaId, setActiveLetturaId] = useState(modulo8Data[0].id);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  React.useEffect(() => {
    if (userProgress && userProgress['modulo8']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo8'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo8'].checked || {}) : prev);
    }
  }, [userProgress]);

  const activeLettura = modulo8Data.find(l => l.id === activeLetturaId);
  const currentQuestions = activeLettura?.questions || [];

  const handleSelectOption = (questionId, optionIndex) => {
    if (showResults || checkedAnswers[questionId]) return;

    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    
    saveProgress('modulo8', { 
      answers: { ...userAnswers, [questionId]: optionIndex },
      checked: checkedAnswers
    });
  };

  const checkAnswers = () => {
    let currentScore = 0;
    currentQuestions.forEach(q => {
      const userAnswerIndex = userAnswers[q.id];
      if (userAnswerIndex === q.answerIndex) {
        currentScore++;
        // Format for logError expects {id, sentence, answer}
        resolveError(q.id);
      } else if (userAnswerIndex !== undefined) {
        // Log the error
        const errorObj = {
          id: q.id,
          sentence: `[${activeLettura.title}] ${q.question}`,
          answer: q.options[q.answerIndex]
        };
        logError(errorObj, "Modulo 8: Comprensione del Testo");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] !== undefined) {
        newChecked[q.id] = true;
      }
    });
    setCheckedAnswers(newChecked);

    saveProgress('modulo8', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    // Solo per la lettura corrente
    const newAnswers = { ...userAnswers };
    const newChecked = { ...checkedAnswers };
    
    currentQuestions.forEach(q => {
      delete newAnswers[q.id];
      delete newChecked[q.id];
    });

    setUserAnswers(newAnswers);
    setCheckedAnswers(newChecked);
    setShowResults(false);
    setScore(0);
    saveProgress('modulo8', { answers: newAnswers, checked: newChecked });
  };

  const changeLettura = (id) => {
    setActiveLetturaId(id);
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 8: Comprensione del Testo</h2>
        <p className="text-slate-600 text-lg">Esercitazioni di lettura e comprensione basate su testi di livello B2.</p>
      </header>

      {/* Selector delle Letture */}
      <div className="flex flex-wrap gap-2 mb-8">
        {modulo8Data.map((lettura, index) => (
          <button
            key={lettura.id}
            onClick={() => changeLettura(lettura.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
              activeLetturaId === lettura.id 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            <FileText size={18} />
            Lettura {index + 1}
          </button>
        ))}
      </div>

      {activeLettura && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Colonna del Testo (Sinistra) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-amber-50 rounded-2xl p-6 md:p-8 shadow-sm border border-amber-100">
              <h3 className="text-2xl font-black text-amber-900 mb-6 border-b border-amber-200 pb-4">
                {activeLettura.title}
              </h3>
              <div className="prose prose-amber max-w-none">
                {activeLettura.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-amber-950 text-lg leading-relaxed mb-4 text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Colonna delle Domande (Destra) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-bold text-indigo-900">Domande</h3>
                {showResults && (
                  <div className="text-sm font-bold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg">
                    {score} / {currentQuestions.length}
                  </div>
                )}
              </div>

              <div className="space-y-8">
                {currentQuestions.map((q, qIndex) => {
                  const userAnswerIdx = userAnswers[q.id];
                  const isChecked = showResults || checkedAnswers[q.id];
                  const isAnswered = userAnswerIdx !== undefined;
                  const isCorrect = userAnswerIdx === q.answerIndex;

                  return (
                    <div key={q.id} className="space-y-3">
                      <div className="flex gap-2 items-start">
                        <span className="font-bold text-indigo-600">{qIndex + 1}.</span>
                        <p className="font-semibold text-slate-800 leading-snug">{q.question}</p>
                      </div>

                      <div className="space-y-2 pl-6">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = userAnswerIdx === optIndex;
                          const isActuallyCorrect = q.answerIndex === optIndex;
                          
                          let optionClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200";
                          
                          if (isChecked) {
                            if (isActuallyCorrect) {
                              optionClass = "bg-emerald-100 border-emerald-500 text-emerald-900 font-medium"; // Correct answer is always green
                            } else if (isSelected && !isCorrect) {
                              optionClass = "bg-red-100 border-red-500 text-red-900 line-through opacity-70"; // Wrong selection is red
                            } else {
                              optionClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50"; // Unselected wrong answers fade out
                            }
                          } else if (isSelected) {
                            optionClass = "bg-indigo-100 border-indigo-500 text-indigo-900 font-medium shadow-sm"; // Currently selected
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleSelectOption(q.id, optIndex)}
                              disabled={isChecked}
                              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-between group ${optionClass}`}
                            >
                              <span className="text-sm">{opt}</span>
                              {isChecked && isActuallyCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                              {isChecked && isSelected && !isCorrect && <XCircle size={18} className="text-red-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                {!showResults ? (
                  <button 
                    onClick={checkAnswers}
                    disabled={Object.keys(userAnswers).filter(k => currentQuestions.some(q => q.id === k)).length < currentQuestions.length}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} /> Controlla le Risposte
                  </button>
                ) : (
                  <button 
                    onClick={resetQuiz}
                    className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    Riprova questa lettura
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
