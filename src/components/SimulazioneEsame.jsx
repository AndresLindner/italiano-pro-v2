import React, { useState, useEffect } from 'react';
import { Clock, Play, FileCheck, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { modulo1Data } from '../data/modulo1_data';
import { modulo2Data } from '../data/modulo2_data';
import { modulo3Data } from '../data/modulo3_data';
import { modulo4Data } from '../data/modulo4_data';
import { modulo6Data } from '../data/modulo6_data';
import { modulo7Data } from '../data/modulo7_data';
import { modulo8Data } from '../data/modulo8_data';
import { modulo11Data } from '../data/modulo11_data';
import { useAuth } from '../contexts/AuthContext';

// Helper to get random elements from array
const getRandomElements = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export function SimulazioneEsame() {
  const { saveProgress } = useAuth() || {};
  const [examState, setExamState] = useState('start'); // start, running, finished
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [examData, setExamData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Timer logic
  useEffect(() => {
    let timer;
    if (examState === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && examState === 'running') {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  const startExam = () => {
    // Generate a random mock exam
    // 10 Grammar questions (mixed from modulo1, 2, 3, 4, 6, 7, 11)
    const allGrammar = [
      ...modulo1Data.section1, ...modulo1Data.section2, ...modulo1Data.section3,
      ...modulo2Data.section1, ...modulo2Data.section2,
      ...modulo3Data.section1, ...modulo3Data.section2,
      ...modulo4Data.section1, ...modulo4Data.section2,
      ...modulo6Data.section6_1, ...modulo6Data.section6_2,
      ...modulo7Data.section7_1, ...modulo7Data.section7_2,
      ...modulo11Data.section11_1, ...modulo11Data.section11_2, ...modulo11Data.section11_3
    ];
    
    const selectedGrammar = getRandomElements(allGrammar, 10);
    
    // 1 Reading passage with its questions
    const selectedReading = getRandomElements(modulo8Data, 1)[0];

    setExamData({
      grammar: selectedGrammar,
      reading: selectedReading
    });
    
    setAnswers({});
    setTimeLeft(3600);
    setScore(null);
    setExamState('running');
  };

  const finishExam = () => {
    let grammarScore = 0;
    examData.grammar.forEach(q => {
      const rawAns = answers[q.id] || '';
      const qParts = q.sentence.split('{blank}');
      const userAnswer = qParts.length <= 2 
        ? rawAns 
        : rawAns.split('|||').map(s => s.trim()).join(' ');

      if (userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
        grammarScore++;
      }
    });

    let readingScore = 0;
    examData.reading.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        readingScore++;
      }
    });

    const totalQuestions = 10 + examData.reading.questions.length;
    const finalScore = grammarScore + readingScore;
    const finalPercent = Math.round((finalScore / totalQuestions) * 100);
    
    const examScore = {
      grammar: grammarScore,
      reading: readingScore,
      total: finalScore,
      max: totalQuestions,
      percent: finalPercent,
      timestamp: Date.now()
    };
    
    setScore(examScore);
    
    // Save to user progress so it is persistent!
    if (saveProgress) {
      saveProgress('esame', { lastExam: examScore });
    }
    
    setExamState('finished');
  };

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (examState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <Clock className="text-rose-600" size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-4 text-center">Simulazione Esame B2</h2>
        <p className="text-slate-600 text-lg max-w-2xl text-center mb-8">
          Mettiti alla prova con un test simulato. Avrai <strong>60 minuti</strong> per completare:
          <br/>- 10 domande di grammatica avanzata
          <br/>- 1 prova di comprensione del testo
        </p>
        
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 max-w-lg mb-8">
          <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">Assicurati di avere un'ora libera senza interruzioni. Il timer non può essere messo in pausa una volta iniziato.</p>
        </div>

        <button 
          onClick={startExam}
          className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white text-xl font-black rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
        >
          <Play size={24} fill="currentColor" /> Inizia la Simulazione
        </button>
      </div>
    );
  }

  if (examState === 'running' && examData) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-4xl mx-auto">
        {/* Sticky Header Timer */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md p-4 rounded-b-2xl border-b border-slate-200 shadow-sm flex justify-between items-center">
          <h3 className="font-black text-slate-800 text-xl hidden md:block">Esame in corso</h3>
          <div className="flex items-center gap-4 mx-auto md:mx-0">
            <div className={`font-mono text-3xl font-black flex items-center gap-2 ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
              <Clock size={28} /> {formatTime(timeLeft)}
            </div>
            <button 
              onClick={() => { if(window.confirm('Sei sicuro di voler consegnare? Non potrai più modificare le risposte.')) finishExam() }}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm"
            >
              Consegna Ora
            </button>
          </div>
        </div>

        {/* Parte 1: Grammatica */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
          <h4 className="text-2xl font-black text-indigo-900 mb-6 border-b pb-2">Parte 1: Grammatica e Sintassi</h4>
          <div className="space-y-6">
            {examData.grammar.map((q, index) => {
              const parts = q.sentence.split('{blank}');
              const numBlanks = parts.length - 1;
              const rawAnswer = answers[q.id] || '';
              const answerArray = numBlanks > 1 ? rawAnswer.split('|||') : [rawAnswer];

              return (
                <div key={q.id} className="flex flex-col md:flex-row gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <span className="font-bold text-slate-400 w-6 flex-shrink-0">{index + 1}.</span>
                  <div className="flex-1 text-slate-700 leading-relaxed flex flex-wrap items-center gap-1">
                    {parts.map((part, partIdx) => {
                      const isLast = partIdx === parts.length - 1;
                      return (
                        <React.Fragment key={partIdx}>
                          <span>{part}</span>
                          {!isLast && (
                            <input
                              type="text"
                              value={answerArray[partIdx] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (numBlanks > 1) {
                                  const newArr = [...answerArray];
                                  for (let k = 0; k < numBlanks; k++) {
                                    if (newArr[k] === undefined) newArr[k] = '';
                                  }
                                  newArr[partIdx] = val;
                                  handleInputChange(q.id, newArr.join('|||'));
                                } else {
                                  handleInputChange(q.id, val);
                                }
                              }}
                              className="w-32 md:w-40 px-3 py-1 text-center font-semibold rounded-md border-2 border-slate-200 focus:border-indigo-500 outline-none"
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Parte 2: Lettura */}
        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
          <h4 className="text-2xl font-black text-indigo-900 mb-6 border-b pb-2">Parte 2: Comprensione del Testo</h4>
          <h5 className="text-xl font-bold text-slate-800 mb-4">{examData.reading.title}</h5>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
            <p className="text-slate-700 leading-loose whitespace-pre-line">{examData.reading.text}</p>
          </div>

          <div className="space-y-8">
            {examData.reading.questions.map((q, qIndex) => (
              <div key={q.id} className="border-l-4 border-indigo-200 pl-4">
                <p className="font-bold text-slate-800 mb-3">{qIndex + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oIndex) => {
                    const letter = opt.charAt(0);
                    const isSelected = answers[q.id] === letter;
                    return (
                      <label key={oIndex} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}>
                        <input 
                          type="radio" 
                          name={q.id} 
                          value={letter}
                          checked={isSelected}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          className="mt-1"
                        />
                        <span className={isSelected ? 'font-semibold text-indigo-900' : 'text-slate-700'}>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (examState === 'finished' && score) {
    let outcome = "Non superato";
    let outcomeColor = "text-red-500";
    if (score.percent >= 60) {
      outcome = "Superato!";
      outcomeColor = "text-emerald-500";
    }
    if (score.percent >= 85) {
      outcome = "Eccellente!";
      outcomeColor = "text-amber-500";
    }

    return (
      <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className={`absolute inset-0 rounded-full border-4 border-t-transparent ${outcomeColor.replace('text-', 'border-')}`} style={{ transform: `rotate(${(score.percent / 100) * 360}deg)` }}></div>
          <span className={`text-4xl font-black ${outcomeColor}`}>{score.percent}%</span>
        </div>
        
        <h2 className="text-4xl font-black text-slate-800 mb-2">Risultato Simulazione</h2>
        <h3 className={`text-2xl font-bold mb-8 ${outcomeColor}`}>{outcome}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <p className="text-slate-500 font-medium mb-1">Grammatica</p>
            <p className="text-3xl font-black text-slate-800">{score.grammar} <span className="text-lg text-slate-400">/ 10</span></p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <p className="text-slate-500 font-medium mb-1">Comprensione Testo</p>
            <p className="text-3xl font-black text-slate-800">{score.reading} <span className="text-lg text-slate-400">/ {score.max - 10}</span></p>
          </div>
        </div>

        <button 
          onClick={() => setExamState('start')}
          className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-md transition-all"
        >
          Torna alla Dashboard
        </button>
      </div>
    );
  }

  return null;
}
