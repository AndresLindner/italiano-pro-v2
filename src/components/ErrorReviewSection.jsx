import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, BrainCircuit, AlertCircle, Trash2, RotateCcw, Mic, Square, Volume2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function ErrorReviewSection() {
  const { userErrors, resolveError } = useAuth();
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [randomPronounIndices, setRandomPronounIndices] = useState({});
  const [listeningId, setListeningId] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
    }
  }, []);

  const startListening = (exId) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (listeningId) {
      setListeningId(null);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListeningId(exId);
    };

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript;
      const cleaned = resultText.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
      handleInputChange(exId, cleaned);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setListeningId(null);
    };

    recognition.onend = () => {
      setListeningId(null);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setListeningId(null);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Clean up text in parentheses (e.g. "(andare)") and trim extra spaces
      const cleanedText = text.replace(/\s*\(.*?\)\s*/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'it-IT';
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const itVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === 'it-it') || 
                      voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith('it'));
      if (itVoice) {
        utterance.voice = itVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const errorList = Object.values(userErrors || {}).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  // Initialize random pronoun indices for quiz verbs
  React.useEffect(() => {
    const newIndices = { ...randomPronounIndices };
    let hasChanges = false;
    errorList.forEach(ex => {
      if (ex.type === 'quiz_verb' && newIndices[ex.id] === undefined) {
        const validIndices = ex.displayPronouns
          .map((_, i) => i)
          .filter(i => ex.correctAnswers[i] && ex.correctAnswers[i] !== "-" && ex.correctAnswers[i] !== "");
        
        if (validIndices.length > 0) {
          newIndices[ex.id] = validIndices[Math.floor(Math.random() * validIndices.length)];
          hasChanges = true;
        }
      }
    });
    if (hasChanges) setRandomPronounIndices(newIndices);
  }, [errorList]);

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
  };

  const checkSingleAnswer = (ex) => {
    const userAnswer = userAnswers[ex.id] || '';
    
    let isCorrect = false;
    if (ex.type === 'quiz_verb') {
      const idx = randomPronounIndices[ex.id];
      const correctAns = ex.correctAnswers[idx];
      let options = [];
      if (correctAns.endsWith('/a') || correctAns.endsWith('/e')) {
        const option1 = correctAns.slice(0, -2);
        const option2 = option1.slice(0, -1) + correctAns.slice(-1);
        options = [option1, option2, correctAns];
      } else if (correctAns.includes('/')) {
        options = correctAns.split('/').map(opt => opt.trim());
      } else {
        options = [correctAns];
      }
      isCorrect = options.map(o => o.toLowerCase()).includes(userAnswer.trim().toLowerCase());
    } else {
      isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
    }
    
    setCheckedAnswers(prev => ({ ...prev, [ex.id]: true }));

    // If correct, remove it from the error bank!
    if (isCorrect) {
      setTimeout(() => {
        resolveError(ex.id);
        // Clear local state for this item
        setUserAnswers(prev => { const n = {...prev}; delete n[ex.id]; return n; });
        setCheckedAnswers(prev => { const n = {...prev}; delete n[ex.id]; return n; });
        setRandomPronounIndices(prev => { const n = {...prev}; delete n[ex.id]; return n; });
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
          let parts = ["", ""];
          let isCorrect = false;
          let correctAnswerDisplay = "";
          const userAnswer = userAnswers[ex.id] || '';
          const isChecked = checkedAnswers[ex.id];
          const isListening = listeningId === ex.id;

          let textToSpeak = "";

          if (ex.type === 'quiz_verb') {
            const pIdx = randomPronounIndices[ex.id];
            if (pIdx !== undefined) {
              const pronoun = ex.displayPronouns[pIdx];
              const tenseName = ex.tense.replace(/([A-Z])/g, ' $1').toLowerCase();
              parts = [`${pronoun} `, ` (${ex.verb.infinitive} - ${tenseName})`];
              const correctAns = ex.correctAnswers[pIdx];
              correctAnswerDisplay = correctAns.includes('/') ? correctAns.split('/')[0].trim() : correctAns;
              
              let options = [];
              if (correctAns.endsWith('/a') || correctAns.endsWith('/e')) {
                const option1 = correctAns.slice(0, -2);
                const option2 = option1.slice(0, -1) + correctAns.slice(-1);
                options = [option1, option2, correctAns];
              } else if (correctAns.includes('/')) {
                options = correctAns.split('/').map(opt => opt.trim());
              } else {
                options = [correctAns];
              }
              isCorrect = options.map(o => o.toLowerCase()).includes(userAnswer.trim().toLowerCase());
              
              textToSpeak = `${pronoun} ${isChecked ? correctAnswerDisplay : (userAnswer || '...')}`;
            }
          } else {
            parts = ex.sentence.split('{blank}');
            isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
            correctAnswerDisplay = ex.answer;
            
            textToSpeak = ex.sentence.replace('{blank}', isChecked ? ex.answer : (userAnswer || '...'));
          }
          
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
                {ex.moduleName || 'Quiz Pratico'}
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <span className="font-bold text-slate-400 w-6 flex-shrink-0">{index + 1}.</span>
                <div className="flex-1 text-slate-700 leading-relaxed flex flex-wrap items-center gap-1.5">
                  <span>{parts[0]}</span>
                  <div className="relative inline-flex items-center">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => handleInputChange(ex.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && userAnswer.trim()) {
                          checkSingleAnswer(ex);
                        }
                      }}
                      disabled={isChecked && isCorrect}
                      className={`w-32 md:w-48 px-3 py-1 pr-8 text-center font-semibold rounded-md border-2 outline-none transition-all
                        ${isChecked 
                          ? (isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-red-500 bg-red-100 text-red-800')
                          : 'border-amber-200 focus:border-amber-500 text-amber-900 bg-amber-50'
                        }
                      `}
                      placeholder="..."
                    />
                    {!(isChecked && isCorrect) && speechSupported && (
                      <button
                        onClick={() => startListening(ex.id)}
                        className={`absolute right-1.5 p-1 rounded-full transition-all ${isListening ? 'text-red-500 bg-red-50 animate-pulse border border-red-200 scale-110' : 'text-slate-400 hover:text-indigo-600'}`}
                        title={isListening ? "Sto ascoltando... premi per interrompere" : "Rispondi a voce (in italiano)"}
                      >
                        {isListening ? <Square size={12} fill="currentColor" /> : <Mic size={12} />}
                      </button>
                    )}
                  </div>
                  <span>{parts[1]}</span>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Speaker Button to listen to full pronunciation */}
                  <button
                    onClick={() => speakText(textToSpeak)}
                    className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-indigo-300 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="Ascolta la pronuncia della frase o espressione"
                  >
                    <Volume2 size={16} />
                  </button>

                  {!isChecked && (
                    <button
                      onClick={() => checkSingleAnswer(ex)}
                      disabled={!userAnswer.trim()}
                      className="text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors p-1"
                      title="Controlla risposta"
                    >
                      <CheckCircle2 size={24} />
                    </button>
                  )}
                  {isChecked && !isCorrect && (
                    <div className="flex items-center gap-1">
                      <div className="w-8 flex justify-center">
                        <XCircle className="text-red-500" size={24} />
                      </div>
                      <button
                        onClick={() => {
                          setUserAnswers(prev => ({ ...prev, [ex.id]: '' }));
                          setCheckedAnswers(prev => ({ ...prev, [ex.id]: false }));
                        }}
                        className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                        title="Riprova"
                      >
                        <RotateCcw size={20} />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      // Instantly remove it from UI and database
                      resolveError(ex.id);
                      setUserAnswers(prev => { const n = {...prev}; delete n[ex.id]; return n; });
                      setCheckedAnswers(prev => { const n = {...prev}; delete n[ex.id]; return n; });
                    }}
                    className="text-slate-300 hover:text-rose-500 transition-colors ml-2 p-1"
                    title="Rimuovi questo esercizio"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              
              {isChecked && !isCorrect && (
                <div className="mt-2 ml-9 text-sm flex items-center gap-2">
                  <span className="text-red-600 font-medium">Correzione:</span>
                  <span className="font-bold text-slate-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1.5">
                    {correctAnswerDisplay}
                    <button
                      onClick={() => speakText(correctAnswerDisplay)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Ascolta la parola corretta"
                    >
                      <Volume2 size={12} />
                    </button>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
