import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function TensePractice({ 
  id, 
  title, 
  subtitle, 
  icon: Icon = BookOpen,
  theoryComponent,
  exercises = [],
  errorPrefix = "Esercizio" 
}) {
  const [activeTab, setActiveTab] = useState('teoria');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth() || {};

  useEffect(() => {
    if (userProgress && userProgress[id]) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress[id].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress[id].checked || {}) : prev);
    }
  }, [userProgress, id]);

  const handleInputChange = (exId, value) => {
    setUserAnswers(prev => ({ ...prev, [exId]: value }));
    if (showResults) setShowResults(false);
    if (checkedAnswers[exId]) setCheckedAnswers(prev => ({ ...prev, [exId]: false }));
    
    if (saveProgress) {
      saveProgress(id, { 
        answers: { ...userAnswers, [exId]: value },
        checked: { ...checkedAnswers, [exId]: false }
      });
    }
  };

  const checkSingleAnswer = (ex) => {
    const userAnswer = userAnswers[ex.id] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
    
    if (isCorrect) {
      if (resolveError) resolveError(ex.id);
    } else {
      if (logError) logError(ex, errorPrefix);
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    if (saveProgress) saveProgress(id, { answers: userAnswers, checked: newChecked });
  };

  const checkAnswers = () => {
    let currentScore = 0;
    exercises.forEach(ex => {
      const userAnswer = (userAnswers[ex.id] || '').trim().toLowerCase();
      if (userAnswer === ex.answer.toLowerCase()) {
        currentScore++;
        if (resolveError) resolveError(ex.id);
      } else {
        if (logError) logError(ex, errorPrefix);
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    exercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);
    if (saveProgress) saveProgress(id, { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    if (saveProgress) saveProgress(id, { answers: {}, checked: {} });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
            <Icon size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-indigo-950">{title}</h2>
            <p className="text-slate-600 text-lg mt-1">{subtitle}</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b-2 border-slate-200">
        <button
          className={`px-8 py-4 font-bold text-lg border-b-4 transition-colors ${activeTab === 'teoria' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-indigo-500'}`}
          onClick={() => setActiveTab('teoria')}
        >
          1. Teoria
        </button>
        <button
          className={`px-8 py-4 font-bold text-lg border-b-4 transition-colors ${activeTab === 'pratica' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-emerald-500'}`}
          onClick={() => setActiveTab('pratica')}
        >
          2. Pratica
        </button>
      </div>

      {activeTab === 'teoria' && theoryComponent}

      {activeTab === 'pratica' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Mettiti alla prova!</h3>
              {showResults && (
                <div className="text-lg font-bold px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                  Punteggio: {score} / {exercises.length}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {exercises.map((ex, index) => {
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
                        />
                        <span>{parts[1]}</span>
                      </div>
                      
                      {!isChecked && (
                        <button
                          onClick={() => checkSingleAnswer(ex)}
                          disabled={!userAnswer.trim()}
                          className="flex-shrink-0 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"
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
                        <span className="text-red-600 font-medium">Correzione:</span> <span className="font-bold text-slate-800">{ex.answer}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
              <button
                onClick={resetQuiz}
                className="px-6 py-2 text-slate-500 font-medium hover:text-slate-800 transition-colors"
              >
                Riprova tutto
              </button>
              <button
                onClick={checkAnswers}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <CheckCircle2 size={20} /> Controlla le risposte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
