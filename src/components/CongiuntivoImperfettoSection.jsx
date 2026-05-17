import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, BrainCircuit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const exerciseData = [
  { id: 'cong_imp_1', sentence: "Pensavo che Luigi {blank} (andare) al supermercato.", answer: "andasse" },
  { id: 'cong_imp_2', sentence: "Vorrei che tu mi {blank} (dire) la verità.", answer: "dicessi" },
  { id: 'cong_imp_3', sentence: "Era probabile che noi {blank} (essere) in ritardo.", answer: "fossimo" },
  { id: 'cong_imp_4', sentence: "Speravo che loro {blank} (fare) un buon lavoro.", answer: "facessero" },
  { id: 'cong_imp_5', sentence: "Voleva che voi {blank} (capire) la situazione.", answer: "capiste" },
  { id: 'cong_imp_6', sentence: "Mi sembrava che Maria {blank} (bere) troppa acqua.", answer: "bevesse" },
  { id: 'cong_imp_7', sentence: "Credevo che voi gli {blank} (dare) una mano.", answer: "deste" },
  { id: 'cong_imp_8', sentence: "Non sapevo che loro {blank} (stare) così male.", answer: "stessero" },
  { id: 'cong_imp_9', sentence: "Pensavo che tu {blank} (sapere) la risposta.", answer: "sapessi" },
  { id: 'cong_imp_10', sentence: "Desideravo che lui {blank} (venire) con noi.", answer: "venisse" },
  { id: 'cong_imp_11', sentence: "Era necessario che noi {blank} (partire) subito.", answer: "partissimo" },
  { id: 'cong_imp_12', sentence: "Credevo che voi {blank} (avere) ragione.", answer: "aveste" },
  { id: 'cong_imp_13', sentence: "Speravo che io {blank} (potere) aiutarvi.", answer: "potessi" },
  { id: 'cong_imp_14', sentence: "Volevo che lei {blank} (uscire) di casa.", answer: "uscisse" },
  { id: 'cong_imp_15', sentence: "Sembrava che loro non {blank} (volere) ascoltare.", answer: "volessero" },
  { id: 'cong_imp_16', sentence: "Non pensavo che il film {blank} (finire) così tardi.", answer: "finisse" },
  { id: 'cong_imp_17', sentence: "Vorrei che tu {blank} (studiare) di più.", answer: "studiassi" },
  { id: 'cong_imp_18', sentence: "Speravamo che non {blank} (piovere) oggi.", answer: "piovesse" },
  { id: 'cong_imp_19', sentence: "Era strano che lui non {blank} (parlare).", answer: "parlasse" },
  { id: 'cong_imp_20', sentence: "Credevano che noi {blank} (dormire).", answer: "dormissimo" },
  { id: 'cong_imp_21', sentence: "Voleva che io {blank} (leggere) quel libro.", answer: "leggessi" },
  { id: 'cong_imp_22', sentence: "Mi sembrava che tu {blank} (scrivere) molto bene.", answer: "scrivessi" },
  { id: 'cong_imp_23', sentence: "Speravo che voi {blank} (vincere) la partita.", answer: "vinceste" },
  { id: 'cong_imp_24', sentence: "Pensavamo che loro {blank} (dovere) farlo.", answer: "dovessero" },
  { id: 'cong_imp_25', sentence: "Era meglio che tu {blank} (rimanere) qui.", answer: "rimanessi" },
  { id: 'cong_imp_26', sentence: "Desideravo che Maria {blank} (cantare) per noi.", answer: "cantasse" },
  { id: 'cong_imp_27', sentence: "Non credevo che voi {blank} (credere) ai fantasmi.", answer: "credeste" },
  { id: 'cong_imp_28', sentence: "Speravo che noi {blank} (trovare) i biglietti.", answer: "trovassimo" },
  { id: 'cong_imp_29', sentence: "Volevo che tu {blank} (mettere) in ordine la stanza.", answer: "mettessi" },
  { id: 'cong_imp_30', sentence: "Sembrava che lui {blank} (perdere) la pazienza.", answer: "perdesse" },
  { id: 'cong_imp_31', sentence: "Era giusto che loro {blank} (pagare) il conto.", answer: "pagassero" },
  { id: 'cong_imp_32', sentence: "Speravo che lei {blank} (rispondere) subito.", answer: "rispondesse" },
  { id: 'cong_imp_33', sentence: "Pensavo che noi {blank} (arrivare) in tempo.", answer: "arrivassimo" },
  { id: 'cong_imp_34', sentence: "Voleva che io {blank} (chiudere) la finestra.", answer: "chiudessi" },
  { id: 'cong_imp_35', sentence: "Credevo che voi {blank} (aprire) la porta.", answer: "apriste" },
  { id: 'cong_imp_36', sentence: "Mi sembrava che loro ci {blank} (offrire) da bere.", answer: "offrissero" },
  { id: 'cong_imp_37', sentence: "Speravo che tu {blank} (soffrire) meno.", answer: "soffrissi" },
  { id: 'cong_imp_38', sentence: "Era importante che noi {blank} (seguire) le regole.", answer: "seguissimo" },
  { id: 'cong_imp_39', sentence: "Desideravo che lui {blank} (costruire) una casa.", answer: "costruisse" },
  { id: 'cong_imp_40', sentence: "Pensavo che voi {blank} (preferire) il mare.", answer: "preferiste" },
  { id: 'cong_imp_41', sentence: "Volevo che loro {blank} (pulire) la cucina.", answer: "pulissero" },
  { id: 'cong_imp_42', sentence: "Credevo che io {blank} (spedire) il pacco.", answer: "spedissi" },
  { id: 'cong_imp_43', sentence: "Speravo che tu non {blank} (mentire).", answer: "mentissi" },
  { id: 'cong_imp_44', sentence: "Era peccato che noi non {blank} (uscire) insieme.", answer: "uscissimo" },
  { id: 'cong_imp_45', sentence: "Mi sembrava che lui {blank} (cercare) qualcosa.", answer: "cercasse" },
  { id: 'cong_imp_46', sentence: "Voleva che voi {blank} (mangiare) tutto.", answer: "mangiaste" },
  { id: 'cong_imp_47', sentence: "Pensavo che loro {blank} (giocare) bene.", answer: "giocassero" },
  { id: 'cong_imp_48', sentence: "Speravo che tu {blank} (cominciare) a studiare.", answer: "cominciassi" },
  { id: 'cong_imp_49', sentence: "Credevo che noi {blank} (viaggiare) in treno.", answer: "viaggiassimo" },
  { id: 'cong_imp_50', sentence: "Era impossibile che lui {blank} (dimenticare) il tuo nome.", answer: "dimenticasse" }
];

export function CongiuntivoImperfettoSection() {
  const [activeTab, setActiveTab] = useState('teoria');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth() || {};

  useEffect(() => {
    if (userProgress && userProgress['cong_imp']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['cong_imp'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['cong_imp'].checked || {}) : prev);
    }
  }, [userProgress]);

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) setShowResults(false);
    if (checkedAnswers[id]) setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    
    if (saveProgress) {
      saveProgress('cong_imp', { 
        answers: { ...userAnswers, [id]: value },
        checked: { ...checkedAnswers, [id]: false }
      });
    }
  };

  const checkSingleAnswer = (ex) => {
    const userAnswer = userAnswers[ex.id] || '';
    const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
    
    if (isCorrect) {
      if (resolveError) resolveError(ex.id);
    } else {
      if (logError) logError(ex, "Il Congiuntivo Imperfetto");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    if (saveProgress) saveProgress('cong_imp', { answers: userAnswers, checked: newChecked });
  };

  const checkAnswers = () => {
    let currentScore = 0;
    exerciseData.forEach(ex => {
      const userAnswer = (userAnswers[ex.id] || '').trim().toLowerCase();
      if (userAnswer === ex.answer.toLowerCase()) {
        currentScore++;
        if (resolveError) resolveError(ex.id);
      } else {
        if (logError) logError(ex, "Il Congiuntivo Imperfetto");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    exerciseData.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);
    if (saveProgress) saveProgress('cong_imp', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    if (saveProgress) saveProgress('cong_imp', { answers: {}, checked: {} });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
            <BookOpen size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-indigo-950">Il Congiuntivo Imperfetto</h2>
            <p className="text-slate-600 text-lg mt-1">Formazione, usi e concordanza dei tempi.</p>
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

      {activeTab === 'teoria' && (
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <BrainCircuit className="text-indigo-500" />
              La Formazione
            </h3>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Il congiuntivo imperfetto è facilissimo da formare! Per quasi tutti i verbi (regolari e irregolari), basta prendere la prima persona dell'indicativo imperfetto (es. <strong>parlavo</strong>, <strong>leggevo</strong>, <strong>sentivo</strong>), togliere "vo" e aggiungere le desinenze del congiuntivo imperfetto:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="font-bold text-indigo-800 text-xl mb-4 text-center border-b border-indigo-200 pb-2">Parlare</h4>
                <ul className="space-y-2 text-indigo-900 text-lg">
                  <li><span className="text-slate-500 inline-block w-12">io</span> parlassi</li>
                  <li><span className="text-slate-500 inline-block w-12">tu</span> parlassi</li>
                  <li><span className="text-slate-500 inline-block w-12">lui</span> parlasse</li>
                  <li><span className="text-slate-500 inline-block w-12">noi</span> parlassimo</li>
                  <li><span className="text-slate-500 inline-block w-12">voi</span> parlaste</li>
                  <li><span className="text-slate-500 inline-block w-12">loro</span> parlassero</li>
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="font-bold text-indigo-800 text-xl mb-4 text-center border-b border-indigo-200 pb-2">Credere</h4>
                <ul className="space-y-2 text-indigo-900 text-lg">
                  <li><span className="text-slate-500 inline-block w-12">io</span> credessi</li>
                  <li><span className="text-slate-500 inline-block w-12">tu</span> credessi</li>
                  <li><span className="text-slate-500 inline-block w-12">lui</span> credesse</li>
                  <li><span className="text-slate-500 inline-block w-12">noi</span> credessimo</li>
                  <li><span className="text-slate-500 inline-block w-12">voi</span> credeste</li>
                  <li><span className="text-slate-500 inline-block w-12">loro</span> credessero</li>
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="font-bold text-indigo-800 text-xl mb-4 text-center border-b border-indigo-200 pb-2">Sentire</h4>
                <ul className="space-y-2 text-indigo-900 text-lg">
                  <li><span className="text-slate-500 inline-block w-12">io</span> sentissi</li>
                  <li><span className="text-slate-500 inline-block w-12">tu</span> sentissi</li>
                  <li><span className="text-slate-500 inline-block w-12">lui</span> sentisse</li>
                  <li><span className="text-slate-500 inline-block w-12">noi</span> sentissimo</li>
                  <li><span className="text-slate-500 inline-block w-12">voi</span> sentiste</li>
                  <li><span className="text-slate-500 inline-block w-12">loro</span> sentissero</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-amber-800">Le 3 Eccezioni Assolute!</h4>
              <p className="text-amber-900 mt-2">
                Esistono solo tre verbi in italiano che non seguono questa regola:
                <br/><strong>Essere</strong>: fossi, fossi, fosse, fossimo, foste, fossero
                <br/><strong>Dare</strong>: dessi, dessi, desse, dessimo, deste, dessero
                <br/><strong>Stare</strong>: stessi, stessi, stesse, stessimo, steste, stessero
              </p>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'pratica' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Completa con il congiuntivo imperfetto</h3>
              {showResults && (
                <div className="text-lg font-bold px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                  Punteggio: {score} / {exerciseData.length}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {exerciseData.map((ex, index) => {
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
