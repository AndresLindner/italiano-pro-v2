import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, XCircle, Play, Info, BrainCircuit, Volume2 } from 'lucide-react';
import { modulo12Data } from '../data/modulo12_data';
import { useAuth } from '../contexts/AuthContext';
import { speakItalian } from '../utils/speech';

export function Modulo12Section() {
  const speakText = (text) => {
    speakItalian(text);
  };
  const [activeTab, setActiveTab] = useState('teoria'); // 'teoria' or 'pratica'
  const [activeExerciseSection, setActiveExerciseSection] = useState('section12_1');
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { userProgress, saveProgress, logError, resolveError } = useAuth() || { userProgress: {}, saveProgress: () => {}, logError: () => {}, resolveError: () => {} };

  // Load progress from database
  React.useEffect(() => {
    if (userProgress && userProgress['modulo12']) {
      setUserAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo12'].answers || {}) : prev);
      setCheckedAnswers(prev => Object.keys(prev).length === 0 ? (userProgress['modulo12'].checked || {}) : prev);
    }
  }, [userProgress]);

  const currentExercises = modulo12Data[activeExerciseSection] || [];

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
    if (showResults) {
      setShowResults(false);
    }
    if (checkedAnswers[id]) {
      setCheckedAnswers(prev => ({ ...prev, [id]: false }));
    }
    
    saveProgress('modulo12', { 
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
      logError(ex, "Modulo 12: Grammatica Integrativa");
    }

    const newChecked = { ...checkedAnswers, [ex.id]: true };
    setCheckedAnswers(newChecked);
    saveProgress('modulo12', { answers: userAnswers, checked: newChecked });
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
        logError(ex, "Modulo 12: Grammatica Integrativa");
      }
    });
    setScore(currentScore);
    setShowResults(true);

    const newChecked = { ...checkedAnswers };
    currentExercises.forEach(ex => newChecked[ex.id] = true);
    setCheckedAnswers(newChecked);

    saveProgress('modulo12', { answers: userAnswers, checked: newChecked });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setScore(0);
    saveProgress('modulo12', { answers: {}, checked: {} });
  };

  const renderExerciseSection = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => { setActiveExerciseSection('section12_1'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_1' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.1 Doppio Ausiliare
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_2'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_2' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.2 Verbi Pronominali
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_3'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_3' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.3 Indefiniti
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_4'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_4' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.4 Modi Indefiniti
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_5'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_5' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.5 Relativi B2
          </button>
          <button 
            onClick={() => { setActiveExerciseSection('section12_6'); resetQuiz(); }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeExerciseSection === 'section12_6' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          >
            12.6 Impersonale Avanzato
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              {activeExerciseSection === 'section12_1' && "Completa con l'ausiliare o il participio passato corretto"}
              {activeExerciseSection === 'section12_2' && "Completa coniugando il verbo pronominale o inserendo il pronome"}
              {activeExerciseSection === 'section12_3' && "Inserisci l'aggettivo o il pronome indefinito corretto"}
              {activeExerciseSection === 'section12_4' && "Scegli la forma non finita corretta del verbo o posiziona il clitico"}
              {activeExerciseSection === 'section12_5' && "Completa con il relativo possessivo (cui) o il relativo neutro (che)"}
              {activeExerciseSection === 'section12_6' && "Completa accordando correttamente l'aggettivo dopo 'si è'"}
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
                          className={`w-32 md:w-48 px-3 py-1 text-center font-semibold rounded-md border-2 outline-none transition-all
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
        {/* Doppio Ausiliare */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.1 Doppio Ausiliare e Accordo al Passato</h3>
          <p className="text-slate-700 mb-4 leading-relaxed font-medium">
            Alcuni verbi cambiano ausiliare nei tempi composti a seconda della loro transitività:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Con AVERE (Transitivo)</h4>
              <p className="text-sm text-slate-700">Quando c'è un complemento oggetto diretto.</p>
              <ul className="text-sm italic text-slate-600 space-y-1.5 mt-2">
                <li>• "Ho cambiato la macchina." (La macchina = oggetto)</li>
                <li>• "Ho salito le scale." (Le scale = oggetto)</li>
                <li>• "Ho finito i compiti." (I compiti = oggetto)</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-800 mb-2">Con ESSERE (Intransitivo)</h4>
              <p className="text-sm text-slate-700">Quando NON c'è un oggetto diretto. Il participio concorda col soggetto.</p>
              <ul className="text-sm italic text-slate-600 space-y-1.5 mt-2">
                <li>• "Il tempo è cambiat<strong>o</strong>." (No oggetto)</li>
                <li>• "Sono salit<strong>a</strong> sul treno." (No oggetto)</li>
                <li>• "La lezione è finit<strong>a</strong>." (No oggetto)</li>
              </ul>
            </div>
          </div>
          <div className="bg-amber-50 p-4 border-l-4 border-amber-500 text-amber-900 rounded-r-lg text-sm">
            <strong>Accordo col clitico:</strong> Quando l'ausiliare è *avere*, il participio concorda obbligatoriamente se preceduto da pronomi diretti di 3a persona (lo, la, li, le): *Le chiavi? Le ho lasciat<strong>e</strong> sul tavolo*.
          </div>
        </section>

        {/* Verbi Pronominali */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.2 I Verbi Pronominali Complessi</h3>
          <p className="text-slate-700 mb-4 leading-relaxed font-medium">
            Verbi clitici idiomatici tipici del registro parlato e delle conversazioni formali:
          </p>
          <ul className="space-y-4 text-sm text-slate-700">
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-indigo-800">Cavarsela:</strong> Uscire da una situazione difficile o superare un esame in modo dignitoso.<br />
              <span className="italic text-slate-500">Es: "All'esame di italiano me la sono cavata bene."</span>
            </li>
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-indigo-800">Entrarci:</strong> Avere pertinenza o essere collegato a qualcosa.<br />
              <span className="italic text-slate-500">Es: "Questo non c'entra niente con quello che ho detto."</span>
            </li>
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-indigo-800">Andarsene:</strong> Andare via da un luogo.<br />
              <span className="italic text-slate-500">Es: "Me ne vado a dormire, sono stanco."</span>
            </li>
            <li className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-indigo-800">Prendersela:</strong> Offendersi o arrabbiarsi per qualcosa.<br />
              <span className="italic text-slate-500">Es: "Non prendertela con lui, è solo un malinteso."</span>
            </li>
          </ul>
        </section>

        {/* Indefiniti */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.3 Aggettivi e Pronomi Indefiniti</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Esprimono una quantità o qualità imprecisata. La padronanza sintattica è fondamentale al B2:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-indigo-50 text-indigo-900 font-bold">
                  <th className="p-3 border">Solo Aggettivi</th>
                  <th className="p-3 border">Solo Pronomi</th>
                  <th className="p-3 border">Entrambi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-semibold">Qualche (+ nome singolare)<br /><span className="text-xs text-slate-500">Es: qualche giorno</span></td>
                  <td className="p-3 border font-semibold">Qualcuno / Qualcosa<br /><span className="text-xs text-slate-500">Es: qualcuno bussa</span></td>
                  <td className="p-3 border font-semibold">Nessuno / Ciascuno<br /><span className="text-xs text-slate-500">Es: nessun aiuto</span></td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border font-semibold">Ogni (+ nome singolare)<br /><span className="text-xs text-slate-500">Es: ogni volta</span></td>
                  <td className="p-3 border font-semibold">Chiunque (+ congiuntivo se concessivo)<br /><span className="text-xs text-slate-500">Es: chiunque venga</span></td>
                  <td className="p-3 border font-semibold">Alcuno (plurale = qualche)<br /><span className="text-xs text-slate-500">Es: alcuni amici</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Modi Indefiniti */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.4 Modi Indefiniti e Posizione dei Clitici</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Uso di Gerundio, Participio e Infinito per riassumere frasi secondarie ed evitare ripetizioni.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-sm text-slate-700">
            <li><strong>Gerundio Causale:</strong> *Sapendo di non farcela, ha chiesto aiuto.* (= Poiché sapeva...)</li>
            <li><strong>Gerundio Concessivo:</strong> *Pur lavorando molto, guadagna poco.* (= Anche se lavora molto...)</li>
            <li><strong>Gerundio Ipotetico:</strong> *Studiando di più, passeresti l'esame.* (= Se tu studiassi...)</li>
            <li><strong>Infinito Sostantivato:</strong> *L'essere puntuali è importante.*</li>
          </ul>
          <div className="bg-sky-50 p-4 border border-sky-200 rounded-lg text-sky-900 mt-4 text-sm">
            <strong>Posizione Pronomi (Enclisi):</strong> Nelle forme non finite i pronomi clitici si attaccano *sempre alla fine* del verbo: *guardando**la***, *aver**gli** parlato*, *salutar**lo***.
          </div>
        </section>

        {/* Relativi Possessivi e Neutri */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.5 Pronomi Relativi Complessi</h3>
          <ul className="space-y-4 text-sm text-slate-700">
            <li>
              <strong className="text-indigo-800">Il cui / La cui / I cui / Le cui (Relativo Possessivo):</strong>
              <p className="mt-1">Si interpone tra l'articolo e il sostantivo posseduto, e si accorda con quest'ultimo.</p>
              <span className="italic text-slate-500">Es: "L'insegnante, le cui spiegazioni sono famose, è stimato." (le spiegazioni = femminile plurale)</span>
            </li>
            <li>
              <strong className="text-indigo-800">Il che (Relativo Neutro):</strong>
              <p className="mt-1">Si usa per riferirsi a un'intera proposizione precedente con valore di "la qual cosa".</p>
              <span className="italic text-slate-500">Es: "Ha preso 30 all'esame, il che ha reso tutti felici."</span>
            </li>
          </ul>
        </section>

        {/* Si Impersonale Avanzato */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black text-indigo-900 mb-4 border-b pb-2">12.6 Si Impersonale con Aggettivi</h3>
          <p className="text-slate-700 mb-3 leading-relaxed">
            Quando la costruzione impersonale coinvolge il verbo *essere* o *diventare* seguito da un aggettivo qualificativo, quest'ultimo va concordato obbligatoriamente al **PLURALE MASCHILE**:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
            <ul className="space-y-2">
              <li>• Correct: "Quando si è <strong className="text-emerald-600">stanchi</strong>, si dorme male."</li>
              <li>• Incorrect: "Quando si è stanco, si dorme male."</li>
              <li>• Correct: "Se si diventa <strong className="text-emerald-600">adulti</strong>, le cose cambiano."</li>
            </ul>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Modulo 12: Grammatica Integrativa</h2>
        <p className="text-slate-600 text-lg">Argomenti grammaticali avanzati di livello B2.</p>
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
