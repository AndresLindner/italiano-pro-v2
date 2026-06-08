import React, { useState, useEffect } from 'react';
import { Headphones, CheckCircle2, XCircle, Play, Square, Info } from 'lucide-react';
import { modulo9Data } from '../data/modulo9_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian, cancelSpeech } from '../utils/speech';

export function Modulo9Section() {
  const [activeAudioId, setActiveAudioId] = useState(modulo9Data[0].id);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  const activeAudio = modulo9Data.find(a => a.id === activeAudioId);

  useEffect(() => {
    if (userProgress && userProgress['modulo9']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo9'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo9'].checked || {}) : prev);
    }
    
    // Cleanup speech synthesis on unmount
    return () => {
      cancelSpeech();
    };
  }, [userProgress]);

  // Handle Speech Synthesis state changes
  useEffect(() => {
    // When switching active audio, stop current playback
    cancelSpeech();
    setIsPlaying(false);
  }, [activeAudioId]);

  const toggleAudio = () => {
    if (isPlaying) {
      cancelSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakItalian(activeAudio.transcript, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleOptionSelect = (questionId, optionLetter) => {
    if (checkedAnswers[questionId]) return; // Non si può cambiare se già controllato

    const newAnswers = { ...userAnswers, [questionId]: optionLetter };
    setUserAnswers(newAnswers);
    saveProgress('modulo9', { answers: newAnswers, checked: checkedAnswers });
  };

  const checkSingleAnswer = (q) => {
    const userAnswer = userAnswers[q.id];
    if (!userAnswer) return;

    const isCorrect = userAnswer === q.correctAnswer;
    
    // Simulate an error log for the MCQ format
    const mockExerciseObj = {
      id: q.id,
      sentence: `Audio: ${activeAudio.title} - ${q.question}`,
      answer: q.correctAnswer
    };

    if (isCorrect) {
      resolveError(mockExerciseObj.id);
    } else {
      logError(mockExerciseObj, "Modulo 9: Ascolto");
    }

    const newChecked = { ...checkedAnswers, [q.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo9', { answers: userAnswers, checked: newChecked });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-5xl mx-auto">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2 flex items-center gap-3">
          <Headphones className="text-indigo-600" size={36} /> Modulo 9: Comprensione Orale
        </h2>
        <p className="text-slate-600 text-lg">Ascolta la traccia audio e rispondi alle domande. Esercitati per la prova di ascolto del B2.</p>
      </header>

      {/* Selector Component */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {modulo9Data.map((audio, index) => (
          <button
            key={audio.id}
            onClick={() => setActiveAudioId(audio.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-full font-bold transition-all shadow-sm
              ${activeAudioId === audio.id 
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' 
                : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'}`}
          >
            Traccia {index + 1}: {audio.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Audio Player (Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Headphones className="text-indigo-500" size={48} />
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 mb-2">{activeAudio.title}</h3>
            <p className="text-slate-500 mb-8">Ascolta attentamente il brano e rispondi alle domande di comprensione sulla destra.</p>

            <button 
              onClick={toggleAudio}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-lg transition-all
                ${isPlaying ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
            >
              {isPlaying ? (
                <><Square size={24} fill="currentColor" /> Ferma Riproduzione</>
              ) : (
                <><Play size={24} fill="currentColor" /> Riproduci Audio</>
              )}
            </button>
            
            <div className="mt-6 flex items-start gap-3 text-left bg-blue-50 p-4 rounded-xl text-sm text-blue-900 border border-blue-100">
              <Info className="flex-shrink-0 mt-0.5" size={18} />
              <p>Puoi ascoltare la traccia quante volte desideri. Se interrompi la riproduzione, ripartirà dall'inizio.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Questions */}
        <div className="lg:col-span-7 space-y-6">
          {activeAudio.questions.map((q, qIndex) => {
            const userAnswer = userAnswers[q.id];
            const isChecked = checkedAnswers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div key={q.id} className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${isChecked ? (isCorrect ? 'border-emerald-300 bg-emerald-50/30' : 'border-red-300 bg-red-50/30') : 'border-slate-200'}`}>
                <h4 className="text-lg font-bold text-slate-800 mb-4">
                  <span className="text-indigo-500 mr-2">{qIndex + 1}.</span> 
                  {q.question}
                </h4>
                
                <div className="space-y-3 mb-4">
                  {q.options.map((opt, oIndex) => {
                    const optionLetter = opt.charAt(0);
                    const isSelected = userAnswer === optionLetter;
                    
                    let optionStyle = "border-slate-200 hover:border-indigo-300 text-slate-700";
                    if (isSelected && !isChecked) optionStyle = "border-indigo-500 bg-indigo-50 text-indigo-800 font-semibold ring-1 ring-indigo-500";
                    if (isChecked && optionLetter === q.correctAnswer) optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-1 ring-emerald-500";
                    if (isChecked && isSelected && !isCorrect) optionStyle = "border-red-500 bg-red-50 text-red-800 font-semibold ring-1 ring-red-500 opacity-70 line-through";
                    if (isChecked && !isSelected && optionLetter !== q.correctAnswer) optionStyle = "border-slate-100 text-slate-400 opacity-50";

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleOptionSelect(q.id, optionLetter)}
                        disabled={isChecked}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${optionStyle} flex items-start gap-3`}
                      >
                        <div className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 
                          ${isSelected && !isChecked ? 'border-indigo-500 bg-indigo-500 text-white' : 
                            (isChecked && optionLetter === q.correctAnswer ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300')}`}
                        >
                          {isSelected && !isChecked && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                          {isChecked && optionLetter === q.correctAnswer && <CheckCircle2 size={16} />}
                          {isChecked && isSelected && !isCorrect && <XCircle size={16} className="text-white" />}
                        </div>
                        <span className="leading-tight">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {!isChecked && (
                  <button
                    onClick={() => checkSingleAnswer(q)}
                    disabled={!userAnswer}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Controlla Risposta
                  </button>
                )}
                
                {isChecked && !isCorrect && (
                   <div className="mt-3 text-sm p-3 bg-white border border-red-100 rounded-lg">
                     <span className="text-red-600 font-bold">Risposta errata.</span> La risposta corretta è la <strong className="text-emerald-600">{q.correctAnswer}</strong>. L'errore è stato salvato nel tuo Ripasso Errori.
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
