import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, BrainCircuit, Volume2 } from 'lucide-react';
import { modulo5Data } from '../data/modulo5_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

export function Modulo5Section() {
  const speakText = (text) => {
    speakItalian(text);
  };
  const [activeTab, setActiveTab] = useState('teoria'); 
  const [activeExerciseSection, setActiveExerciseSection] = useState('section5_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth();

  React.useEffect(() => {
    if (userProgress && userProgress['modulo5']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo5'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo5'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo5Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo5', { 
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
      logError(ex, "Modulo 5: Pronomi e Particelle");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo5', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 5: Pronomi e Particelle");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo5', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo5', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section5_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section5_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            5.1 Pronomi Combinati
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section5_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section5_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            5.2 Particelle "Ci" e "Ne"
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section5_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section5_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            5.3 Pronomi Relativi
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section5_1' && "Completa con il pronome combinato corretto"}
              {activeExerciseSection === 'section5_2' && "Completa inserendo la particella 'ci' o 'ne'"}
              {activeExerciseSection === 'section5_3' && "Inserisci il pronome relativo adeguato"}
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
                          className={`w-32 md:w-40 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
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
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">5.1 Pronomi Combinati</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            I pronomi combinati si usano per sostituire contemporaneamente l'oggetto diretto (chi/che cosa?) e l'oggetto indiretto (a chi?). Sono essenziali per evitare ripetizioni.
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <h4 className="font-bold text-amber-900 mb-2">La Regola d'Oro</h4>
            <p className="text-amber-800">
              Il pronome <strong>indiretto</strong> (mi, ti, gli, ci, vi) precede <em>sempre</em> il pronome <strong>diretto</strong> (lo, la, li, le).<br />
              Davanti ai pronomi diretti, la vocale 'i' del pronome indiretto cambia in 'e' (mi ➔ me lo, ti ➔ te lo, ecc.).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-50 text-indigo-900">
                  <th className="p-3 border">+ Lo / La / Li / Le</th>
                  <th className="p-3 border">Risultato</th>
                  <th className="p-3 border">Esempio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-semibold">mi</td>
                  <td className="p-3 border">me lo, me la...</td>
                  <td className="p-3 border italic">"Mi dai il libro?" ➔ "Me lo dai?"</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border font-semibold">ti</td>
                  <td className="p-3 border">te lo, te la...</td>
                  <td className="p-3 border italic">"Ti porto i fiori?" ➔ "Te li porto?"</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold text-emerald-600">gli / le / Le</td>
                  <td className="p-3 border font-bold text-emerald-700">glielo, gliela, glieli, gliele</td>
                  <td className="p-3 border italic">"Do il regalo a Maria?" ➔ "Glielo do?"</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border font-semibold">ci</td>
                  <td className="p-3 border">ce lo, ce la...</td>
                  <td className="p-3 border italic">"Ci presti la macchina?" ➔ "Ce la presti?"</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">vi</td>
                  <td className="p-3 border">ve lo, ve la...</td>
                  <td className="p-3 border italic">"Vi racconto la storia?" ➔ "Ve la racconto?"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-3 text-slate-500">
            *Attenzione: "Gli" e "le" (sia femminile che formale) si uniscono ai pronomi diretti formando una parola unica (es. <strong>glielo</strong>).
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">5.2 Le Particelle "Ci" e "Ne"</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Piccole parole, grande confusione! Al livello B2 è richiesto un uso padrone di queste due particelle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-sky-200 rounded-lg p-5 bg-sky-50">
              <h4 className="font-bold text-sky-800 text-xl mb-3 border-b border-sky-200 pb-2">La particella "CI"</h4>
              <ul className="space-y-4">
                <li>
                  <strong className="text-sky-900 block">1. Luogo (a/in/su/da + qualcosa)</strong>
                  <span className="text-sm text-sky-800">"Vai a Roma?" ➔ "Sì, <strong>ci</strong> vado."</span>
                </li>
                <li>
                  <strong className="text-sky-900 block">2. Sostituisce "A + qualcosa/qualcuno"</strong>
                  <span className="text-sm text-sky-800">Con verbi come credere, pensare, provare.<br/>"Credi ai fantasmi?" ➔ "Non <strong>ci</strong> credo."</span>
                </li>
                <li>
                  <strong className="text-sky-900 block">3. Sostituisce "Con + qualcosa/qualcuno"</strong>
                  <span className="text-sm text-sky-800">"Parli con Maria?" ➔ "Sì, <strong>ci</strong> parlo spesso."</span>
                </li>
              </ul>
            </div>

            <div className="border border-emerald-200 rounded-lg p-5 bg-emerald-50">
              <h4 className="font-bold text-emerald-800 text-xl mb-3 border-b border-emerald-200 pb-2">La particella "NE"</h4>
              <ul className="space-y-4">
                <li>
                  <strong className="text-emerald-900 block">1. Quantità (una parte del tutto)</strong>
                  <span className="text-sm text-emerald-800">"Quanti caffè bevi?" ➔ "<strong>Ne</strong> bevo tre."<br/>"Vuoi della torta?" ➔ "Sì, <strong>ne</strong> vorrei una fetta."</span>
                </li>
                <li>
                  <strong className="text-emerald-900 block">2. Sostituisce "Di + qualcosa/qualcuno"</strong>
                  <span className="text-sm text-emerald-800">Con verbi come parlare, sapere, avere paura/bisogno.<br/>"Hai paura dei ragni?" ➔ "Sì, <strong>ne</strong> ho paura."</span>
                </li>
                <li>
                  <strong className="text-emerald-900 block">3. Luogo di provenienza (Da dove?)</strong>
                  <span className="text-sm text-emerald-800">"Sei stato in banca?" ➔ "Sì, <strong>ne</strong> esco ora."</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">5.3 Pronomi Relativi</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            I pronomi relativi uniscono due frasi che hanno un elemento in comune.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-1">CHE</h4>
              <p className="text-sm text-slate-700 mb-2">Sostituisce il soggetto o l'oggetto diretto. Non è <strong>mai</strong> preceduto da preposizione.</p>
              <p className="text-sm italic text-slate-600">"Il ragazzo <strong>che</strong> parla è mio fratello." (Soggetto)<br/>"Il libro <strong>che</strong> leggo è bello." (Oggetto)</p>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-1">CUI</h4>
              <p className="text-sm text-slate-700 mb-2">Si usa <strong>sempre</strong> dopo una preposizione (di, a, da, in, con, su, per, tra, fra).</p>
              <p className="text-sm italic text-slate-600">"La ragazza <strong>a cui</strong> ho parlato..."<br/>"Il motivo <strong>per cui</strong> ti scrivo..."</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-1">IL QUALE / LA QUALE / I QUALI / LE QUALI</h4>
              <p className="text-sm text-slate-700 mb-2">È un'alternativa formale a "che" (soggetto) e "cui". Concorda in genere e numero col nome.</p>
              <p className="text-sm italic text-slate-600">"Ho incontrato Marco, <strong>il quale</strong> mi ha salutato."<br/>"L'azienda per <strong>la quale</strong> lavoro..."</p>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-1">CHI</h4>
              <p className="text-sm text-slate-700 mb-2">Significa "la persona che / le persone che". Si usa sempre con il verbo al singolare nei proverbi e nelle regole.</p>
              <p className="text-sm italic text-slate-600">"<strong>Chi</strong> rompe paga e i cocci sono suoi."</p>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 5: Pronomi e Particelle</h2>
        <p className="text-slate-600 text-lg">Pronomi combinati, particelle 'ci' e 'ne', e pronomi relativi per il livello B2.</p>
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
