import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Volume2, CheckCircle2, XCircle, AlertCircle, FileText, ChevronRight, Award, Headphones, PenTool, Check } from 'lucide-react';
import { modulo1Data } from '../data/modulo1_data';
import { modulo2Data } from '../data/modulo2_data';
import { modulo3Data } from '../data/modulo3_data';
import { modulo4Data } from '../data/modulo4_data';
import { modulo6Data } from '../data/modulo6_data';
import { modulo7Data } from '../data/modulo7_data';
import { modulo8Data } from '../data/modulo8_data';
import { modulo9Data } from '../data/modulo9_data';
import { modulo10Data } from '../data/modulo10_data';
import { modulo11Data } from '../data/modulo11_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

const getRandomElements = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export function SimulazioneEsame() {
  const { saveProgress } = useAuth() || {};
  const [examState, setExamState] = useState('start'); // start, running, finished
  const [currentPhase, setCurrentPhase] = useState(0); // 0: Ascolto, 1: Lettura, 2: Grammatica, 3: Scrittura
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [examData, setExamData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [writingText, setWritingText] = useState('');
  const [score, setScore] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let timer;
    if (examState === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && examState === 'running') {
      finishExam();
    }
    return () => {
      clearInterval(timer);
    };
  }, [examState, timeLeft]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const startExam = () => {
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
    const selectedReading = getRandomElements(modulo8Data, 1)[0];
    const selectedListening = getRandomElements(modulo9Data, 1)[0];
    const selectedWriting = getRandomElements(modulo10Data, 1)[0];

    setExamData({
      grammar: selectedGrammar,
      reading: selectedReading,
      listening: selectedListening,
      writing: selectedWriting
    });
    
    setAnswers({});
    setWritingText('');
    setTimeLeft(3600);
    setScore(null);
    setCurrentPhase(0);
    setExamState('running');
  };

  const playAudio = () => {
    if (!examData?.listening) return;
    setIsPlayingAudio(true);
    speakItalian(examData.listening.transcript, () => {
      setIsPlayingAudio(false);
    });
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
  };

  const isChecklistItemSatisfied = (crit, text) => {
    if (crit.minWords) {
      const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
      return wordCount >= crit.minWords;
    }
    if (crit.pattern) {
      return crit.pattern.test(text);
    }
    return false;
  };

  const finishExam = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);

    // 1. Ascolto
    let ascoltoScore = 0;
    examData.listening.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        ascoltoScore++;
      }
    });

    // 2. Lettura
    let letturaScore = 0;
    examData.reading.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        letturaScore++;
      }
    });

    // 3. Grammatica
    let grammaticaScore = 0;
    examData.grammar.forEach(q => {
      const rawAns = answers[q.id] || '';
      const qParts = q.sentence.split('{blank}');
      const userAnswer = qParts.length <= 2 
        ? rawAns 
        : rawAns.split('|||').map(s => s.trim()).join(' ');

      if (userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
        grammaticaScore++;
      }
    });

    // 4. Scrittura
    let scritturaScore = 0;
    examData.writing.checklist.forEach(crit => {
      if (isChecklistItemSatisfied(crit, writingText)) {
        scritturaScore++;
      }
    });

    const totalQuestions = 5 + examData.reading.questions.length + 10 + 5; // 5 ascolto, 5 lettura, 10 grammatica, 5 scrittura
    const totalCorrect = ascoltoScore + letturaScore + grammaticaScore + scritturaScore;
    const finalPercent = Math.round((totalCorrect / totalQuestions) * 100);

    const examScore = {
      ascolto: ascoltoScore,
      ascoltoMax: 5,
      lettura: letturaScore,
      letturaMax: examData.reading.questions.length,
      grammar: grammaticaScore,
      grammarMax: 10,
      scrittura: scritturaScore,
      scritturaMax: 5,
      total: totalCorrect,
      max: totalQuestions,
      percent: finalPercent,
      timestamp: Date.now()
    };

    setScore(examScore);

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

  const wordCount = writingText.trim() ? writingText.trim().split(/\s+/).length : 0;

  if (examState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto pb-12">
        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <Clock className="text-rose-600" size={48} />
        </div>
        <h2 className="text-4xl font-black text-indigo-950 mb-4 text-center">Simulazione Completa Esame B2</h2>
        <p className="text-slate-600 text-lg max-w-2xl text-center mb-8">
          Mettiti alla prova con un test simulato a tempo che copre tutte le quattro abilità fondamentali del livello B2 (CELI/CILS).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <Headphones className="text-indigo-600 mb-2" size={28} />
            <h4 className="font-bold text-slate-800 text-sm">1. Ascolto</h4>
            <p className="text-xs text-slate-500 mt-1">Ascolta il brano e rispondi a 5 domande</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <FileText className="text-indigo-600 mb-2" size={28} />
            <h4 className="font-bold text-slate-800 text-sm">2. Lettura</h4>
            <p className="text-xs text-slate-500 mt-1">Comprendi il brano e rispondi a 5 domande</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <Award className="text-indigo-600 mb-2" size={28} />
            <h4 className="font-bold text-slate-800 text-sm">3. Grammatica</h4>
            <p className="text-xs text-slate-500 mt-1">10 quesiti di morfologia e sintassi</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <PenTool className="text-indigo-600 mb-2" size={28} />
            <h4 className="font-bold text-slate-800 text-sm">4. Scrittura</h4>
            <p className="text-xs text-slate-500 mt-1">Produzione scritta con checklist B2</p>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 max-w-lg mb-8 shadow-xs">
          <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800">
            <strong>Regole dell'esame:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>Avrai a disposizione <strong>60 minuti</strong> in totale.</li>
              <li>Il timer scorre in tempo reale e non può essere messo in pausa.</li>
              <li>Puoi navigare tra le sezioni usando i pulsanti "Avanti" in fondo.</li>
            </ul>
          </div>
        </div>

        <button 
          onClick={startExam}
          className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white text-xl font-black rounded-full shadow-md hover:scale-102 transition-all flex items-center gap-3"
        >
          <Play size={24} fill="currentColor" /> Inizia Esame
        </button>
      </div>
    );
  }

  if (examState === 'running' && examData) {
    const phases = [
      { name: 'Ascolto', icon: <Headphones size={18} /> },
      { name: 'Lettura', icon: <FileText size={18} /> },
      { name: 'Grammatica', icon: <Award size={18} /> },
      { name: 'Scrittura', icon: <PenTool size={18} /> }
    ];

    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-1 overflow-x-auto w-full md:w-auto">
            {phases.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPhase(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0
                  ${currentPhase === idx 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {p.icon}
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className={`font-mono text-2xl font-black flex items-center gap-2 ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-indigo-950'}`}>
              <Clock size={24} /> {formatTime(timeLeft)}
            </div>
            <button 
              onClick={() => { if(window.confirm('Sei sicuro di voler consegnare? Le risposte non fornite saranno considerate errate.')) finishExam() }}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs text-sm"
            >
              Consegna Esame
            </button>
          </div>
        </div>

        {/* Phase 0: Ascolto */}
        {currentPhase === 0 && (
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
                <Headphones className="text-indigo-600" size={24} /> Parte 1: Comprensione dell'Ascolto
              </h3>
              <p className="text-slate-500 text-sm mt-1">Ascolta attentamente il brano e seleziona la risposta corretta per ciascuna delle 5 domande.</p>
            </div>

            {/* Audio Player Card */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">{examData.listening.title}</h4>
                  <p className="text-xs text-indigo-300">File audio sintetizzato in tempo reale</p>
                </div>
                {isPlayingAudio && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    In riproduzione...
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                {!isPlayingAudio ? (
                  <button
                    onClick={playAudio}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
                  >
                    <Play size={16} fill="currentColor" /> Ascolta Audio
                  </button>
                ) : (
                  <button
                    onClick={stopAudio}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
                  >
                    <Square size={16} /> Ferma Audio
                  </button>
                )}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6 pt-4">
              {examData.listening.questions.map((q, qIdx) => (
                <div key={q.id} className="border-l-4 border-indigo-200 pl-4 space-y-3">
                  <p className="font-bold text-slate-800 text-sm md:text-base">{qIdx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const letter = opt.charAt(0);
                      const isSelected = answers[q.id] === letter;
                      return (
                        <label 
                          key={oIdx} 
                          className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-xs md:text-sm
                            ${isSelected 
                              ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold shadow-xs' 
                              : 'border-slate-200 hover:border-indigo-300 bg-white text-slate-700'}`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={letter}
                            checked={isSelected}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            className="mt-0.5"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setCurrentPhase(1)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
              >
                Procedi alla Lettura <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Phase 1: Lettura */}
        {currentPhase === 1 && (
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
                <FileText className="text-indigo-600" size={24} /> Parte 2: Comprensione della Lettura
              </h3>
              <p className="text-slate-500 text-sm mt-1">Leggi attentamente il testo e rispondi alle 5 domande di comprensione logica.</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-black text-slate-800">{examData.reading.title}</h4>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                {examData.reading.text}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6 pt-4">
              {examData.reading.questions.map((q, qIdx) => (
                <div key={q.id} className="border-l-4 border-indigo-200 pl-4 space-y-3">
                  <p className="font-bold text-slate-800 text-sm md:text-base">{qIdx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const letter = opt.charAt(0);
                      const isSelected = answers[q.id] === letter;
                      return (
                        <label 
                          key={oIdx} 
                          className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-xs md:text-sm
                            ${isSelected 
                              ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold shadow-xs' 
                              : 'border-slate-200 hover:border-indigo-300 bg-white text-slate-700'}`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={letter}
                            checked={isSelected}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            className="mt-0.5"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setCurrentPhase(0)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm"
              >
                Indietro
              </button>
              <button
                onClick={() => setCurrentPhase(2)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
              >
                Procedi alla Grammatica <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Phase 2: Grammatica */}
        {currentPhase === 2 && (
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
                <Award className="text-indigo-600" size={24} /> Parte 3: Analisi delle Strutture (Grammatica)
              </h3>
              <p className="text-slate-500 text-sm mt-1">Completa le frasi scrivendo le risposte corrette nei campi di testo. Premi INVIO o clicca Avanti al termine.</p>
            </div>

            <div className="space-y-6">
              {examData.grammar.map((q, index) => {
                const parts = q.sentence.split('{blank}');
                const numBlanks = parts.length - 1;
                const rawAnswer = answers[q.id] || '';
                const answerArray = numBlanks > 1 ? rawAnswer.split('|||') : [rawAnswer];

                return (
                  <div key={q.id} className="flex flex-col md:flex-row gap-3 p-3 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-200/60 transition-all">
                    <span className="font-bold text-slate-400 w-6 flex-shrink-0">{index + 1}.</span>
                    <div className="flex-1 text-slate-700 leading-relaxed flex flex-wrap items-center gap-1.5 text-sm md:text-base">
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
                                className="w-32 md:w-40 px-3 py-1 text-center font-bold text-indigo-900 rounded-lg border-2 border-slate-200 focus:border-indigo-500 bg-white outline-none text-sm"
                                placeholder="..."
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

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setCurrentPhase(1)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm"
              >
                Indietro
              </button>
              <button
                onClick={() => setCurrentPhase(3)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
              >
                Procedi alla Scrittura <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Phase 3: Scrittura */}
        {currentPhase === 3 && (
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
                <PenTool className="text-indigo-600" size={24} /> Parte 4: Produzione Scritta
              </h3>
              <p className="text-slate-500 text-sm mt-1">Svolgi il tema proposto rispettando i criteri B2 descritti nella checklist a destra.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Input Text Editor */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                    <FileText size={16} /> Traccia Scelta
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 mt-1 leading-relaxed">
                    {examData.writing.prompt}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
                    <span>IL TUO TESTO:</span>
                    <span className={wordCount >= 100 ? "text-emerald-600" : "text-slate-500"}>
                      Conteggio Parole: {wordCount}
                    </span>
                  </div>
                  <textarea
                    value={writingText}
                    onChange={(e) => setWritingText(e.target.value)}
                    className="w-full h-72 p-4 border-2 border-slate-200 focus:border-indigo-500 rounded-2xl outline-none text-slate-800 leading-relaxed font-sans text-sm shadow-xs focus:ring-4 focus:ring-indigo-50"
                    placeholder="Scrivi qui il tuo elaborato in italiano..."
                  />
                </div>
              </div>

              {/* Right: B2 Guidelines Checklist */}
              <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="text-indigo-600" size={18} /> Criteri Valutazione B2
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rilevamento in tempo reale dell'uso di formule corrette, grammatica e lunghezza del testo:
                </p>
                
                <div className="space-y-3 pt-2">
                  {examData.writing.checklist.map(crit => {
                    const isSatisfied = isChecklistItemSatisfied(crit, writingText);
                    return (
                      <div 
                        key={crit.id} 
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs font-medium transition-all
                          ${isSatisfied 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                            : 'bg-white border-slate-200 text-slate-500'}`}
                      >
                        <div className="mt-0.5">
                          {isSatisfied 
                            ? <CheckCircle2 className="text-emerald-600" size={16} /> 
                            : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />}
                        </div>
                        <span className="leading-tight">{crit.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setCurrentPhase(2)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm"
              >
                Indietro
              </button>
              <button
                onClick={() => { if(window.confirm('Sei sicuro di voler completare l\'esame?')) finishExam() }}
                className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
              >
                Consegna e Vedi Risultato
              </button>
            </div>
          </section>
        )}
      </div>
    );
  }

  if (examState === 'finished' && score) {
    let outcome = "Non superato";
    let outcomeColor = "text-red-500";
    let outcomeBg = "bg-red-50";
    if (score.percent >= 60) {
      outcome = "Superato!";
      outcomeColor = "text-emerald-500";
      outcomeBg = "bg-emerald-50";
    }
    if (score.percent >= 85) {
      outcome = "Eccellente!";
      outcomeColor = "text-amber-500";
      outcomeBg = "bg-amber-50";
    }

    return (
      <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-3xl mx-auto pb-20">
        <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className={`absolute inset-0 rounded-full border-4 border-t-transparent ${outcomeColor.replace('text-', 'border-')}`} style={{ transform: `rotate(${(score.percent / 100) * 360}deg)` }}></div>
          <span className={`text-4xl font-black ${outcomeColor}`}>{score.percent}%</span>
        </div>
        
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Risultato Simulazione</h2>
        <h3 className={`text-2xl font-bold mb-8 px-4 py-1.5 rounded-full ${outcomeBg} ${outcomeColor}`}>{outcome}</h3>

        {/* Detailed Breakdown */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 w-full space-y-6 mb-8">
          <h4 className="text-xl font-bold text-slate-800 border-b pb-3">Dettaglio Punteggio Competenze</h4>
          
          <div className="space-y-4">
            {/* 1. Ascolto */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Headphones size={16} className="text-indigo-500" /> Comprensione dell'Ascolto
                </span>
                <span className="font-bold text-slate-800">{score.ascolto} / {score.ascoltoMax}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(score.ascolto / score.ascoltoMax) * 100}%` }}
                />
              </div>
            </div>

            {/* 2. Lettura */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText size={16} className="text-indigo-500" /> Comprensione della Lettura
                </span>
                <span className="font-bold text-slate-800">{score.lettura} / {score.letturaMax}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(score.lettura / score.letturaMax) * 100}%` }}
                />
              </div>
            </div>

            {/* 3. Grammatica */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Award size={16} className="text-indigo-500" /> Strutture Grammaticali
                </span>
                <span className="font-bold text-slate-800">{score.grammar} / {score.grammarMax}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(score.grammar / score.grammarMax) * 100}%` }}
                />
              </div>
            </div>

            {/* 4. Scrittura */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <PenTool size={16} className="text-indigo-500" /> Produzione Scritta
                </span>
                <span className="font-bold text-slate-800">{score.scrittura} / {score.scritturaMax}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(score.scrittura / score.scritturaMax) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setExamState('start')}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all"
        >
          Torna alla Dashboard
        </button>
      </div>
    );
  }

  return null;
}
