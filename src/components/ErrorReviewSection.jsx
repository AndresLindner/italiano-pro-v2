import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, BrainCircuit, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function ErrorReviewSection() {
  const { userErrors, resolveError } = useAuth();
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});

  const errorList = Object.values(userErrors || {}).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
  };

  const checkSingleAnswer = (ex) => {
    const userAnswer = userAnswers[ex.id] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
    
    setCheckedAnswers(prev => ({ ...prev, [ex.id]: true }));

    // If correct, remove it from the error bank!
    if (isCorrect) {
      setTimeout(() => {
        resolveError(ex.id);
        // Clear local state for this item
        setUserAnswers(prev => { const n = {...prev}; delete n[ex.id]; return n; });
        setCheckedAnswers(prev => { const n = {...prev}; delete n[ex.id]; return n; });
      }, 1500); // Wait 1.5s so they can see the green check before it disappears
    }
  };

  if (errorList.length === 0) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <header className="mb-8">
          <h2 className="text-4xl font-black text-indigo-950 mb-2">Ripasso Errori</h2>
          <p className="text-slate-600 text-lg">Pratica mirata sugli esercizi in cui hai avuto difficoltà.</p>
        </header>

        <div className="bg-emerald-50 p-12 rounded-xl text-center border border-emerald-200">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">Ottimo lavoro!</h3>
          <p className="text-emerald-700">Non ci sono errori da ripassare al momento. Continua a esercitarti nei moduli!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Ripasso Errori</h2>
        <p className="text-slate-600 text-lg">Hai {errorList.length} {errorList.length === 1 ? 'errore' : 'errori'} da ripassare. Rispondi correttamente per rimuoverli da questa lista.</p>
      </header>

      <div className="space-y-4">
        {errorList.map((ex, index) => {
          const parts = ex.sentence.split('{blank}');
          const userAnswer = userAnswers[ex.id] || '';
          const isChecked = checkedAnswers[ex.id];
          const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
          
          return (
            <div key={ex.id} className={`p-4 rounded-lg border bg-white border-slate-200 shadow-sm transition-all relative overflow-hidden`}>
              {isChecked && isCorrect && (
                <div className="absolute inset-0 bg-emerald-100/90 z-10 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                  <span className="font-bold text-emerald-800 text-lg flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" /> Corretto! Rimosso dalla lista.
                  </span>
                </div>
              )}
              
              <div className="mb-2 inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md uppercase tracking-wider">
                {ex.moduleName}
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <span className="font-bold text-slate-400 w-6 flex-shrink-0">{index + 1}.</span>
                <div className="flex-1 text-slate-700 leading-relaxed flex flex-wrap items-center gap-1">
                  <span>{parts[0]}</span>
                  <div className="relative inline-block">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => handleInputChange(ex.id, e.target.value)}
                      disabled={isChecked && isCorrect}
                      className={`w-32 md:w-48 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
                        ${isChecked 
                          ? (isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-red-500 bg-red-100 text-red-800')
                          : 'border-amber-200 focus:border-amber-500 text-amber-900 bg-amber-50'
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
                {isChecked && !isCorrect && (
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    <XCircle className="text-red-500" size={24} />
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
    </div>
  );
}
