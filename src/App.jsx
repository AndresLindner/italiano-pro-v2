import React, { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, ScrollText, List, ChevronDown, ChevronUp, Info, Volume2, Gamepad2, Check, X, RefreshCw, Clock, Sun, History, Archive, Rocket } from 'lucide-react';

const top50Verbs = [
  {
    infinitive: "essere",
    translation: "to be",
    presente: ["sono", "sei", "è", "siamo", "siete", "sono"],
    imperfetto: ["ero", "eri", "era", "eravamo", "eravate", "erano"],
    passatoRemoto: ["fui", "fosti", "fu", "fummo", "foste", "furono"],
    imperativo: ["-", "sii", "sia", "siamo", "siate", "siano"],
    passatoProssimo: ["sono stato/a", "sei stato/a", "è stato/a", "siamo stati/e", "siete stati/e", "sono stati/e"],
    typePres: "Irregolare",
    typeImperf: "Irregolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "avere",
    translation: "to have",
    presente: ["ho", "hai", "ha", "abbiamo", "avete", "hanno"],
    imperfetto: ["avevo", "avevi", "aveva", "avevamo", "avevate", "avevano"],
    passatoRemoto: ["ebbi", "avesti", "ebbe", "avemmo", "aveste", "ebbero"],
    imperativo: ["-", "abbi", "abbia", "abbiamo", "abbiate", "abbiano"],
    passatoProssimo: ["ho avuto", "hai avuto", "ha avuto", "abbiamo avuto", "avete avuto", "hanno avuto"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  }
];

const futureRoots = {
  "essere": "sar", "avere": "avr", "fare": "far", "dire": "dir", "potere": "potr",
  "volere": "vorr", "sapere": "sapr", "stare": "star", "dovere": "dovr", "vedere": "vedr",
  "andare": "andr", "venire": "verr", "dare": "dar", "vivere": "vivr", "bere": "berr",
  "rimanere": "rimarr", "cercare": "cercher", "giocare": "giocher", "pagare": "pagher",
  "mangiare": "manger", "lasciare": "lascer"
};

// Generazione dinamica del Trapassato Prossimo basata sul Passato Prossimo
top50Verbs.forEach(verb => {
  verb.trapassatoProssimo = verb.passatoProssimo.map((pp, index) => {
    let tp = pp;
    tp = tp.replace(/^sono /, index === 5 ? "erano " : "ero ");
    tp = tp.replace(/^sei /, "eri ");
    tp = tp.replace(/^è /, "era ");
    tp = tp.replace(/^siamo /, "eravamo ");
    tp = tp.replace(/^siete /, "eravate ");
    tp = tp.replace(/^ho /, "avevo ");
    tp = tp.replace(/^hai /, "avevi ");
    tp = tp.replace(/^ha /, "aveva ");
    tp = tp.replace(/^abbiamo /, "avevamo ");
    tp = tp.replace(/^avete /, "avevate ");
    tp = tp.replace(/^hanno /, "avevano ");
    return tp;
  });
  verb.typeTP = verb.typePP;

  // Generazione dinamica del Futuro Semplice
  const inf = verb.infinitive;
  let futRoot;
  let futType = "Regolare";

  if (futureRoots[inf]) {
    futRoot = futureRoots[inf];
    // I cambi ortografici (-care/-gare, -ciare/-giare) mantengono la classificazione "Regolare"
    if (!["cercare", "giocare", "pagare", "mangiare", "lasciare"].includes(inf)) {
      futType = "Irregolare";
    }
  } else {
    if (inf.endsWith("are") || inf.endsWith("ere")) {
      futRoot = inf.slice(0, -3) + "er";
    } else if (inf.endsWith("ire")) {
      futRoot = inf.slice(0, -3) + "ir";
    }
  }

  verb.futuro = [
    futRoot + "ò",
    futRoot + "ai",
    futRoot + "à",
    futRoot + "emo",
    futRoot + "ete",
    futRoot + "anno"
  ];
  verb.typeFut = futType;
});

const pronouns = ["io", "tu", "lui/lei", "noi", "voi", "loro"];
const imperativePronouns = ["(io)", "tu", "Lei (formale)", "noi", "voi"];

export default function App() {
  const [activeTab, setActiveTab] = useState('presente');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-indigo-900 text-white flex flex-col shadow-xl flex-shrink-0 z-10 sticky top-0 md:h-screen overflow-y-auto">
        <div className="p-6 bg-indigo-950">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-emerald-400" />
            Italiano<span className="text-indigo-300">Pro</span>
          </h1>
          <p className="text-indigo-200 text-sm mt-1">Impara i verbi difficili</p>
        </div>
        
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          <NavItem 
            icon={<Sun size={20} />} 
            label="Il Presente" 
            isActive={activeTab === 'presente'} 
            onClick={() => setActiveTab('presente')} 
          />
          <NavItem 
            icon={<History size={20} />} 
            label="L'Imperfetto" 
            isActive={activeTab === 'imperfetto'} 
            onClick={() => setActiveTab('imperfetto')} 
          />
          <NavItem 
            icon={<Clock size={20} />} 
            label="Passato Prossimo" 
            isActive={activeTab === 'prossimo'} 
            onClick={() => setActiveTab('prossimo')} 
          />
          <NavItem 
            icon={<Archive size={20} />} 
            label="Trapassato Prossimo" 
            isActive={activeTab === 'trapassato'} 
            onClick={() => setActiveTab('trapassato')} 
          />
          <NavItem 
            icon={<Rocket size={20} />} 
            label="Futuro Semplice" 
            isActive={activeTab === 'futuro'} 
            onClick={() => setActiveTab('futuro')} 
          />
          <NavItem 
            icon={<ScrollText size={20} />} 
            label="Passato Remoto" 
            isActive={activeTab === 'passato'} 
            onClick={() => setActiveTab('passato')} 
          />
          <NavItem 
            icon={<AlertCircle size={20} />} 
            label="L'Imperativo" 
            isActive={activeTab === 'imperativo'} 
            onClick={() => setActiveTab('imperativo')} 
          />
          <NavItem 
            icon={<List size={20} />} 
            label="I 50 Verbi" 
            isActive={activeTab === 'verbi'} 
            onClick={() => setActiveTab('verbi')} 
          />
          <NavItem 
            icon={<Gamepad2 size={20} />} 
            label="Quiz Pratico" 
            isActive={activeTab === 'quiz'} 
            onClick={() => setActiveTab('quiz')} 
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-6xl mx-auto">
        {activeTab === 'presente' && <PresenteSection />}
        {activeTab === 'imperfetto' && <ImperfettoSection />}
        {activeTab === 'futuro' && <FuturoSempliceSection />}
        {activeTab === 'prossimo' && <PassatoProssimoSection />}
        {activeTab === 'trapassato' && <TrapassatoProssimoSection />}
        {activeTab === 'passato' && <PassatoRemotoSection />}
        {activeTab === 'imperativo' && <ImperativoSection />}
        {activeTab === 'verbi' && <TopVerbsSection />}
        {activeTab === 'quiz' && <QuizSection />}
      </main>

    </div>
  );
}

/* -----------------------------------------
   COMPONENTS
----------------------------------------- */

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-4 text-left font-medium transition-colors whitespace-nowrap flex-shrink-0
        ${isActive 
          ? 'bg-indigo-800 border-l-4 border-emerald-400 text-white' 
          : 'text-indigo-100 hover:bg-indigo-800/50 hover:text-white border-l-4 border-transparent'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

function PresenteSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Presente Indicativo</h2>
        <p className="text-slate-600 mt-2 text-lg">Il tempo fondamentale per parlare di azioni attuali e abitudini.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-4 text-slate-700">
          Il <strong>Presente Indicativo</strong> si usa per descrivere:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Azioni che avvengono nel momento in cui si parla:</strong> <em>Ora leggo un libro.</em></li>
          <li><strong>Abitudini e azioni ripetute:</strong> <em>Ogni mattina bevo il caffè.</em></li>
          <li><strong>Fatti sempre veri (leggi scientifiche, universali):</strong> <em>La Terra gira intorno al Sole.</em></li>
          <li><strong>Eventi futuri (molto vicini o certi):</strong> <em>Domani parto per Roma.</em></li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Regolari: Le Desinenze</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-900">
                <th className="p-3 border">Persona</th>
                <th className="p-3 border">-ARE (es. Parlare)</th>
                <th className="p-3 border">-ERE (es. Credere)</th>
                <th className="p-3 border">-IRE (es. Dormire)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">io</td><td className="p-3 border">parl-<strong>o</strong></td><td className="p-3 border">cred-<strong>o</strong></td><td className="p-3 border">dorm-<strong>o</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">tu</td><td className="p-3 border">parl-<strong>i</strong></td><td className="p-3 border">cred-<strong>i</strong></td><td className="p-3 border">dorm-<strong>i</strong></td></tr>
              <tr><td className="p-3 border font-semibold">lui/lei</td><td className="p-3 border">parl-<strong>a</strong></td><td className="p-3 border">cred-<strong>e</strong></td><td className="p-3 border">dorm-<strong>e</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">noi</td><td className="p-3 border">parl-<strong>iamo</strong></td><td className="p-3 border">cred-<strong>iamo</strong></td><td className="p-3 border">dorm-<strong>iamo</strong></td></tr>
              <tr><td className="p-3 border font-semibold">voi</td><td className="p-3 border">parl-<strong>ate</strong></td><td className="p-3 border">cred-<strong>ete</strong></td><td className="p-3 border">dorm-<strong>ite</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">loro</td><td className="p-3 border">parl-<strong>ano</strong></td><td className="p-3 border">cred-<strong>ono</strong></td><td className="p-3 border">dorm-<strong>ono</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
          💡 I verbi in -IRE con il suffisso "-ISC-"
        </h3>
        <p className="mb-4 text-purple-900">
          Molti verbi che finiscono in <strong>-IRE</strong> (come capire, finire, preferire, pulire) inseriscono il suffisso <strong>-isc-</strong> tra la radice e la desinenza, ma <strong>solo nelle prime tre persone singolari e nella terza plurale</strong>. Noi e Voi rimangono perfettamente normali.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ul className="space-y-1 bg-white p-4 rounded-lg shadow-sm border border-purple-100">
            <li><span className="inline-block w-8 text-purple-600 font-bold">io</span> cap-<strong>isc</strong>-o</li>
            <li><span className="inline-block w-8 text-purple-600 font-bold">tu</span> cap-<strong>isc</strong>-i</li>
            <li><span className="inline-block w-8 text-purple-600 font-bold">lui</span> cap-<strong>isc</strong>-e</li>
            <li><span className="inline-block w-8 text-slate-500">noi</span> cap-iamo</li>
            <li><span className="inline-block w-8 text-slate-500">voi</span> cap-ite</li>
            <li><span className="inline-block w-8 text-purple-600 font-bold">loro</span> cap-<strong>isc</strong>-ono</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function FuturoSempliceSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Futuro Semplice</h2>
        <p className="text-slate-600 mt-2 text-lg">Progetti, previsioni e ipotesi sul presente.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <ul className="list-disc pl-6 space-y-4 text-slate-700 mt-4">
          <li>
            <strong>Progetti e intenzioni:</strong><br />
            Azione che avverrà nel futuro.<br />
            <span className="italic text-slate-500">Es: L'anno prossimo <strong>andrò</strong> in Italia.</span>
          </li>
          <li>
            <strong>Previsioni:</strong><br />
            Eventi che si pensa accadranno (o meteo).<br />
            <span className="italic text-slate-500">Es: Domani <strong>pioverà</strong> tutto il giorno.</span>
          </li>
          <li>
            <strong>Dubbi e ipotesi nel presente:</strong><br />
            Per esprimere un'incertezza o fare una supposizione nel momento attuale.<br />
            <span className="italic text-slate-500">Es: "Che ore sono?" - "Non lo so, <strong>saranno</strong> le 5."</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Regolari: Le Desinenze</h3>
        <p className="mb-4 text-slate-700">Attenzione ai verbi in <strong>-ARE</strong>: la "A" si trasforma in "E" prima di aggiungere la desinenza (parlare → parl<strong>e</strong>rò).</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-900">
                <th className="p-3 border">Persona</th>
                <th className="p-3 border">-ARE (Parlare)</th>
                <th className="p-3 border">-ERE (Credere)</th>
                <th className="p-3 border">-IRE (Dormire)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">io</td><td className="p-3 border">parl-<strong>erò</strong></td><td className="p-3 border">cred-<strong>erò</strong></td><td className="p-3 border">dorm-<strong>irò</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">tu</td><td className="p-3 border">parl-<strong>erai</strong></td><td className="p-3 border">cred-<strong>erai</strong></td><td className="p-3 border">dorm-<strong>irai</strong></td></tr>
              <tr><td className="p-3 border font-semibold">lui/lei</td><td className="p-3 border">parl-<strong>erà</strong></td><td className="p-3 border">cred-<strong>erà</strong></td><td className="p-3 border">dorm-<strong>irà</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">noi</td><td className="p-3 border">parl-<strong>eremo</strong></td><td className="p-3 border">cred-<strong>eremo</strong></td><td className="p-3 border">dorm-<strong>iremo</strong></td></tr>
              <tr><td className="p-3 border font-semibold">voi</td><td className="p-3 border">parl-<strong>erete</strong></td><td className="p-3 border">cred-<strong>erete</strong></td><td className="p-3 border">dorm-<strong>irete</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">loro</td><td className="p-3 border">parl-<strong>eranno</strong></td><td className="p-3 border">cred-<strong>eranno</strong></td><td className="p-3 border">dorm-<strong>iranno</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-orange-50 p-6 rounded-xl border border-orange-200">
        <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center gap-2">
          💡 I Tre Gruppi di Irregolari
        </h3>
        <p className="mb-4 text-orange-900">
          I verbi irregolari al futuro si dividono principalmente in tre gruppi, modificando la radice ma mantenendo le stesse desinenze finali:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <h4 className="font-bold text-orange-700 border-b pb-2 mb-2">1. Perdono la vocale</h4>
            <ul className="text-sm space-y-1 text-slate-700">
              <li><strong>Avere:</strong> avrò, avrai...</li>
              <li><strong>Andare:</strong> andrò, andrai...</li>
              <li><strong>Potere:</strong> potrò, potrai...</li>
              <li><strong>Vedere:</strong> vedrò, vedrai...</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <h4 className="font-bold text-orange-700 border-b pb-2 mb-2">2. Raddoppiano la 'R'</h4>
            <ul className="text-sm space-y-1 text-slate-700">
              <li><strong>Venire:</strong> verrò, verrai...</li>
              <li><strong>Volere:</strong> vorrò, vorrai...</li>
              <li><strong>Bere:</strong> berrò, berrai...</li>
              <li><strong>Rimanere:</strong> rimarrò, rimarrai...</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
            <h4 className="font-bold text-orange-700 border-b pb-2 mb-2">3. Radici speciali</h4>
            <ul className="text-sm space-y-1 text-slate-700">
              <li><strong>Essere:</strong> sarò, sarai...</li>
              <li><strong>Fare:</strong> farò, farai... (mantiene la a)</li>
              <li><strong>Dare:</strong> darò, darai... (mantiene la a)</li>
              <li><strong>Stare:</strong> starò, starai... (mantiene la a)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function PassatoProssimoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Passato Prossimo</h2>
        <p className="text-slate-600 mt-2 text-lg">Il tempo del passato recente e della vita quotidiana.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Cos'è e come si forma?
        </h3>
        <p className="mb-4 text-slate-700">
          Il <strong>Passato Prossimo</strong> esprime un'azione avvenuta nel passato che ha ancora legami con il presente. Si forma con l'ausiliare (<strong>Essere</strong> o <strong>Avere</strong>) al presente + il <strong>Participio Passato</strong> del verbo.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <p className="text-xl font-bold text-indigo-900">Ho mangiato</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <p className="text-xl font-bold text-emerald-900">Sono andato</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AVERE section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            Quando usare AVERE?
          </h3>
          <ul className="space-y-4 text-slate-700">
            <li className="flex gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">1</div>
              <div>
                <p className="font-bold">Verbi Transitivi</p>
                <p className="text-sm">Sono i verbi che rispondono alla domanda "Chi?" o "Che cosa?".</p>
                <p className="text-sm italic text-slate-500 mt-1">Esempio: Ho letto (che cosa?) un libro.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">2</div>
              <div>
                <p className="font-bold">Verbi di Movimento (senza destinazione)</p>
                <p className="text-sm">Camminare, nuotare, ballare, viaggiare.</p>
                <p className="text-sm italic text-slate-500 mt-1">Esempio: Ho camminato per ore.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">3</div>
              <div>
                <p className="font-bold">Il participio NON cambia</p>
                <p className="text-sm">Con l'ausiliare avere, il participio passato finisce quasi sempre in <strong>-o</strong>.</p>
                <p className="text-sm italic text-slate-500 mt-1">Lui ha mangiato. Lei ha mangiat<strong>o</strong>.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* ESSERE section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            Quando usare ESSERE?
          </h3>
          <ul className="space-y-4 text-slate-700">
            <li className="flex gap-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">1</div>
              <div>
                <p className="font-bold">Verbi di Movimento (con destinazione)</p>
                <p className="text-sm">Andare, venire, arrivare, uscire, partire.</p>
                <p className="text-sm italic text-slate-500 mt-1">Esempio: Sono andato a casa.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">2</div>
              <div>
                <p className="font-bold">Verbi di Stato e Cambiamento</p>
                <p className="text-sm">Stare, rimanere, nascere, morire, diventare.</p>
                <p className="text-sm italic text-slate-500 mt-1">Esempio: È rimasta qui.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">3</div>
              <div>
                <p className="font-bold">Regola dell'Accordo (Importante!)</p>
                <p className="text-sm">Il participio deve concordare con il genere e il numero del soggetto.</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-50 p-1 rounded">M. Sing: -o</div>
                  <div className="bg-slate-50 p-1 rounded">F. Sing: -a</div>
                  <div className="bg-slate-50 p-1 rounded">M. Plur: -i</div>
                  <div className="bg-slate-50 p-1 rounded">F. Plur: -e</div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <section className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
          💡 La scorciatoia mentale
        </h3>
        <p className="text-amber-900 leading-relaxed">
          Se non sai quale scegliere, chiediti: <strong>"Posso mettere un oggetto dopo il verbo?"</strong>.<br />
          Se dici "Ho comprato...", puoi aggiungere "un giornale". Quindi usi <strong>AVERE</strong>.<br />
          Se dici "Sono andato...", non puoi aggiungere un oggetto. Quindi usi <strong>ESSERE</strong>.
        </p>
      </section>
    </div>
  );
}

function TrapassatoProssimoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Trapassato Prossimo</h2>
        <p className="text-slate-600 mt-2 text-lg">Il passato nel passato.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-4 text-slate-700">
          Il <strong>Trapassato Prossimo</strong> esprime un'azione passata che è avvenuta <em>prima</em> di un'altra azione anch'essa passata. 
          Si usa spesso per spiegare l'antefatto o le cause di un evento passato.
        </p>
        <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mt-4">
          <p className="text-sky-900 italic">
            "Quando sono arrivato in stazione, il treno <strong>era</strong> già <strong>partito</strong>."
          </p>
          <p className="text-sm mt-2 text-sky-800">
            L'azione di partire (Trapassato Prossimo) è successa prima dell'azione di arrivare (Passato Prossimo).
          </p>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          Come si forma?
        </h3>
        <p className="mb-4 text-slate-700">
          È un tempo composto, molto simile al Passato Prossimo, ma l'ausiliare (<strong>essere</strong> o <strong>avere</strong>) va coniugato all'<strong>Imperfetto</strong> anziché al presente.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <p className="text-xl font-bold text-indigo-900">Avevo mangiato</p>
            <p className="text-sm text-indigo-600 mt-1">(Imperfetto di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <p className="text-xl font-bold text-emerald-900">Ero andato</p>
            <p className="text-sm text-emerald-600 mt-1">(Imperfetto di essere + Participio)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Nota: Le regole per la scelta dell'ausiliare (essere vs avere) sono esattamente le stesse del Passato Prossimo!
        </p>
      </section>
    </div>
  );
}

function PassatoRemotoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Passato Remoto</h2>
        <p className="text-slate-600 mt-2 text-lg">Il tempo del passato lontano e della letteratura.</p>
      </header>
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-3">
          Il <strong>Passato Remoto</strong> si usa per indicare un'azione avvenuta e <em>completamente conclusa</em> in un passato lontano, senza alcun legame logico o emotivo con il presente.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Lingua scritta:</strong> È il tempo storico per eccellenza, usato nei romanzi, nelle fiabe ("C'era una volta...") e nei libri di storia.</li>
          <li><strong>Geografia:</strong> Nel Sud Italia (es. Campania, Sicilia), viene usato molto spesso anche nella lingua parlata quotidiana, al posto del passato prossimo.</li>
        </ul>
      </section>
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Regolari: Le Desinenze</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-900">
                <th className="p-3 border">Persona</th>
                <th className="p-3 border">-ARE (es. Parlare)</th>
                <th className="p-3 border">-ERE (es. Credere)</th>
                <th className="p-3 border">-IRE (es. Dormire)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">io</td><td className="p-3 border">parl-<strong>ai</strong></td><td className="p-3 border">cred-<strong>ei</strong> (o -etti)</td><td className="p-3 border">dorm-<strong>ii</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">tu</td><td className="p-3 border">parl-<strong>asti</strong></td><td className="p-3 border">cred-<strong>esti</strong></td><td className="p-3 border">dorm-<strong>isti</strong></td></tr>
              <tr><td className="p-3 border font-semibold">lui/lei</td><td className="p-3 border">parl-<strong>ò</strong></td><td className="p-3 border">cred-<strong>é</strong> (o -ette)</td><td className="p-3 border">dorm-<strong>ì</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">noi</td><td className="p-3 border">parl-<strong>ammo</strong></td><td className="p-3 border">cred-<strong>emmo</strong></td><td className="p-3 border">dorm-<strong>immo</strong></td></tr>
              <tr><td className="p-3 border font-semibold">voi</td><td className="p-3 border">parl-<strong>aste</strong></td><td className="p-3 border">cred-<strong>este</strong></td><td className="p-3 border">dorm-<strong>iste</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">loro</td><td className="p-3 border">parl-<strong>arono</strong></td><td className="p-3 border">cred-<strong>erono</strong> (o -ettero)</td><td className="p-3 border">dorm-<strong>irono</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
          La Regola Magica (1-3-6) per gli Irregolari
        </h3>
        <p className="mb-4 text-amber-900">
          Molti verbi italiani (soprattutto in <em>-ere</em>) sono irregolari al passato remoto. Ma c'è un trucco meraviglioso! L'irregolarità si presenta <strong>SOLO</strong> in tre persone (la 1ª, la 3ª e la 6ª). Le altre rimangono perfettamente regolari.
        </p>
        <p className="font-semibold text-amber-800 mb-2">Esempio con PRENDERE (radice reg. "prend-", radice irreg. "pres-"):</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ul className="space-y-1 bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <li><span className="inline-block w-6 text-amber-600 font-bold">1</span> <strong>Io pres-i</strong> (Irregolare)</li>
            <li><span className="inline-block w-6 text-slate-400">2</span> Tu prend-esti (Regolare)</li>
            <li><span className="inline-block w-6 text-amber-600 font-bold">3</span> <strong>Lui pres-e</strong> (Irregolare)</li>
            <li><span className="inline-block w-6 text-slate-400">4</span> Noi prend-emmo (Regolare)</li>
            <li><span className="inline-block w-6 text-slate-400">5</span> Voi prend-este (Regolare)</li>
            <li><span className="inline-block w-6 text-amber-600 font-bold">6</span> <strong>Loro pres-ero</strong> (Irregolare)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function ImperativoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">L'Imperativo</h2>
        <p className="text-slate-600 mt-2 text-lg">Ordini, consigli, istruzioni e preghiere.</p>
      </header>
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-3">
          L'imperativo si usa per dare comandi, fare inviti, dare istruzioni o consigli. Esiste solo nel tempo <strong>Presente</strong>. 
          Non si usa mai con il pronome "io" (non puoi dare un ordine a te stesso!).
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p className="text-blue-900">
            <strong>Attenzione:</strong> I pronomi soggetto (tu, noi, voi) nell'imperativo <em>non si dicono quasi mai</em>.
            Diciamo "Mangia!" e non "Tu mangia!".
          </p>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Regolari (Forma Affermativa)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-900">
                <th className="p-3 border">Persona</th>
                <th className="p-3 border">-ARE (Guardare)</th>
                <th className="p-3 border">-ERE (Prendere)</th>
                <th className="p-3 border">-IRE (Aprire)</th>
                <th className="p-3 border">-IRE (Finire)*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold text-emerald-600">tu</td>
                <td className="p-3 border text-emerald-700 font-bold">guard-a</td>
                <td className="p-3 border">prend-i</td>
                <td className="p-3 border">apr-i</td>
                <td className="p-3 border">fin-isc-i</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold text-purple-600">Lei (Cortesia)</td>
                <td className="p-3 border text-purple-700 font-bold">guard-i</td>
                <td className="p-3 border">prend-a</td>
                <td className="p-3 border">apr-a</td>
                <td className="p-3 border">fin-isc-a</td>
              </tr>
              <tr><td className="p-3 border font-semibold">noi</td><td className="p-3 border">guard-iamo</td><td className="p-3 border">prend-iamo</td><td className="p-3 border">apr-iamo</td><td className="p-3 border">fin-iamo</td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">voi</td><td className="p-3 border">guard-ate</td><td className="p-3 border">prend-ete</td><td className="p-3 border">apr-ite</td><td className="p-3 border">fin-ite</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-slate-500">*Alcuni verbi in -ire prendono il suffisso -isc- come al presente indicativo.</p>
        
        <div className="mt-4 p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
          <p className="text-emerald-900 font-medium">💡 Nota la differenza "Incrociata":</p>
          <ul className="list-disc pl-5 text-emerald-800 mt-2">
            <li>Il <strong>TU</strong> in <em>-ARE</em> finisce in <strong>-a</strong>. (Mangia!)</li>
            <li>Il <strong>Lei</strong> (formale) in <em>-ARE</em> finisce in <strong>-i</strong>. (Mangi!)</li>
          </ul>
        </div>
      </section>

      <section className="bg-red-50 p-6 rounded-xl border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
          L'Imperativo Negativo (I Divieti)
        </h3>
        <p className="mb-4 text-red-900">
          Per dire a qualcuno di NON fare qualcosa, la regola cambia solo per la persona <strong>"TU"</strong>.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
            <h4 className="font-bold text-red-700 mb-2 border-b pb-1">Per il "TU"</h4>
            <p className="text-2xl font-black text-center text-red-600 my-4">NON + INFINITO</p>
            <p className="text-center text-slate-700">"Non parlare!"</p>
            <p className="text-center text-slate-700">"Non correre!"</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
            <h4 className="font-bold text-slate-700 mb-2 border-b pb-1">Per le altre persone</h4>
            <p className="text-2xl font-black text-center text-slate-600 my-4">NON + IMPERATIVO</p>
            <p className="text-center text-slate-700">"Non parli (Lei)!"</p>
            <p className="text-center text-slate-700">"Non correte (voi)!"</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function TypeBadge({ type }) {
  if (!type || type === "N/A") return null;
  const isIrregular = type === "Irregolare";
  return (
    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${isIrregular ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
      {type}
    </span>
  );
}

function TopVerbsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const speakWord = (word) => {
    if (!word || word === "-" || word.includes("N/A")) return;
    
    let cleanWord = word;
    if (word.endsWith('/a') || word.endsWith('/e')) {
      cleanWord = word.slice(0, -2);
    } else if (word.includes('/')) {
      cleanWord = word.split('/')[0].trim();
    }

    const utterance = new SpeechSynthesisUtterance(cleanWord);
    utterance.lang = 'it-IT';
    utterance.rate = 0.85; 
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">I 50 Verbi Più Comuni</h2>
        <p className="text-slate-600 mt-2 text-lg">Esplora le coniugazioni per i 5 tempi verbali. Clicca su un verbo per espanderlo.</p>
      </header>

      <div className="space-y-3">
        {top50Verbs.map((verb, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={verb.infinitive} 
              className={`border rounded-xl overflow-hidden transition-all duration-300 shadow-sm
                ${isOpen ? 'border-indigo-400 ring-1 ring-indigo-400' : 'border-slate-200 hover:border-indigo-300'}
              `}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className={`w-full flex items-center justify-between p-4 text-left transition-colors
                  ${isOpen ? 'bg-indigo-50' : 'bg-white hover:bg-slate-50'}
                `}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-indigo-900">{verb.infinitive}</span>
                  <span className="text-sm text-slate-500 italic">({verb.translation})</span>
                </div>
                <div className="text-indigo-400">
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              {isOpen && (
                <div className="p-4 bg-white border-t border-indigo-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Presente */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex justify-between items-center mb-3 border-b border-purple-200 pb-2">
                      <h4 className="font-bold text-purple-800 text-lg">Presente</h4>
                      <TypeBadge type={verb.typePres} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.presente[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.presente[i]); }}
                                  className="text-slate-400 hover:text-purple-600 transition-colors flex-shrink-0"
                                  title="Ascolta la pronuncia"
                                >
                                  <Volume2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Imperfetto */}
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                    <div className="flex justify-between items-center mb-3 border-b border-teal-200 pb-2">
                      <h4 className="font-bold text-teal-800 text-lg">Imperfetto</h4>
                      <TypeBadge type={verb.typeImperf} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.imperfetto[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.imperfetto[i]); }}
                                  className="text-slate-400 hover:text-teal-600 transition-colors flex-shrink-0"
                                  title="Ascolta la pronuncia"
                                >
                                  <Volume2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Futuro Semplice */}
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <div className="flex justify-between items-center mb-3 border-b border-orange-200 pb-2">
                      <h4 className="font-bold text-orange-800 text-lg">Futuro Semplice</h4>
                      <TypeBadge type={verb.typeFut} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.futuro[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.futuro[i]); }}
                                  className="text-slate-400 hover:text-orange-600 transition-colors flex-shrink-0"
                                  title="Ascolta la pronuncia"
                                >
                                  <Volume2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Passato Prossimo */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-center mb-3 border-b border-blue-200 pb-2">
                      <h4 className="font-bold text-blue-800 text-lg">Passato Prossimo</h4>
                      <TypeBadge type={verb.typePP} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.passatoProssimo[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.passatoProssimo[i]); }}
                                  className="text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0"
                                  title="Ascolta la pronuncia"
                                >
                                  <Volume2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Trapassato Prossimo */}
                  <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                    <div className="flex justify-between items-center mb-3 border-b border-sky-200 pb-2">
                      <h4 className="font-bold text-sky-800 text-lg">Trapassato Prossimo</h4>
                      <TypeBadge type={verb.typeTP} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.trapassatoProssimo[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.trapassatoProssimo[i]); }}
                                  className="text-slate-400 hover:text-sky-600 transition-colors flex-shrink-0"
                                  title="Ascolta la pronuncia"
                                >
                                  <Volume2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Passato Remoto */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-center mb-3 border-b border-slate-200 pb-2">
                      <h4 className="font-bold text-indigo-800 text-lg">Passato Remoto</h4>
                      <TypeBadge type={verb.typePR} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.passatoRemoto[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.passatoRemoto[i]); }}
                                  className="text-slate-400 hover:text-indigo-600 transition-colors flex-shrink-0"
                                  title="Ascolta la pronuncia"
                                >
                                  <Volume2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Imperativo */}
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <div className="flex justify-between items-center mb-3 border-b border-emerald-200 pb-2">
                      <h4 className="font-bold text-emerald-800 text-lg">Imperativo</h4>
                      {verb.imperativo[1] !== "Non ha imperativo" && <TypeBadge type={verb.typeImp} />}
                    </div>
                    {verb.imperativo[1] === "Non ha imperativo" ? (
                      <div className="flex flex-col items-center justify-center h-full pb-8 text-emerald-700 opacity-70">
                        <AlertCircle className="mb-2" size={32} />
                        <p className="font-medium text-center px-4">I verbi modali spesso non hanno l'imperativo.</p>
                      </div>
                    ) : (
                      <table className="w-full text-sm">
                        <tbody>
                          {imperativePronouns.map((p, i) => (
                            <tr key={p} className={`${i % 2 === 0 ? 'bg-white' : ''} ${i === 0 ? 'opacity-50' : ''}`}>
                              <td className="py-2 px-3 text-emerald-700 w-24">{p}</td>
                              <td className="py-2 px-3 font-semibold text-slate-800">
                                <div className="flex items-center justify-between gap-2">
                                  <span>{verb.imperativo[i] === "-" ? "-" : verb.imperativo[i]}</span>
                                  {verb.imperativo[i] !== "-" && verb.imperativo[i] !== "" && (
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); speakWord(verb.imperativo[i]); }}
                                      className="text-emerald-400 hover:text-emerald-700 transition-colors flex-shrink-0"
                                      title="Ascolta la pronuncia"
                                    >
                                      <Volume2 size={16} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizMode, setQuizMode] = useState('misto');
  const [mistakes, setMistakes] = useState([]);

  const generateQuestion = (mode = quizMode) => {
    const actualMode = typeof mode === 'string' ? mode : quizMode;
    
    if (actualMode === 'ripasso' && mistakes.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    let selectedTense, selectedVerb;

    if (actualMode === 'ripasso') {
      const randomMistake = mistakes[Math.floor(Math.random() * mistakes.length)];
      selectedVerb = randomMistake.verb;
      selectedTense = randomMistake.tense;
    } else {
      const tenses = actualMode === 'misto' ? ['presente', 'imperfetto', 'futuro', 'passatoProssimo', 'trapassatoProssimo', 'passatoRemoto', 'imperativo'] : [actualMode];
      selectedTense = tenses[Math.floor(Math.random() * tenses.length)];
      
      let validVerbs = top50Verbs;
      if (selectedTense === 'imperativo') {
        validVerbs = top50Verbs.filter(v => v.imperativo[1] !== "Non ha imperativo");
      }
      
      selectedVerb = validVerbs[Math.floor(Math.random() * validVerbs.length)];
    }
    
    const displayPronouns = selectedTense === 'imperativo' ? imperativePronouns : pronouns;
    
    let correctAnswers;
    if (selectedTense === 'presente') correctAnswers = selectedVerb.presente;
    else if (selectedTense === 'imperfetto') correctAnswers = selectedVerb.imperfetto;
    else if (selectedTense === 'futuro') correctAnswers = selectedVerb.futuro;
    else if (selectedTense === 'passatoRemoto') correctAnswers = selectedVerb.passatoRemoto;
    else if (selectedTense === 'passatoProssimo') correctAnswers = selectedVerb.passatoProssimo;
    else if (selectedTense === 'trapassatoProssimo') correctAnswers = selectedVerb.trapassatoProssimo;
    else correctAnswers = selectedVerb.imperativo;

    setCurrentQuestion({
      verb: selectedVerb,
      tense: selectedTense,
      correctAnswers: correctAnswers,
      displayPronouns: displayPronouns
    });
    
    const initialAnswers = Array(displayPronouns.length).fill("");
    if (selectedTense === 'imperativo') {
      initialAnswers[0] = "-";
    }
    setUserAnswers(initialAnswers);
    setShowResults(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleInputChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const isAnswerCorrect = (userAns = "", correctAns) => {
    if (correctAns === "-") return userAns.trim() === "" || userAns.trim() === "-";
    
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
    
    return options.map(o => o.toLowerCase()).includes(userAns.trim().toLowerCase());
  };

  const checkAnswers = () => {
    let currentCorrect = 0;
    let hasError = false;

    currentQuestion.displayPronouns.forEach((_, i) => {
      if (isAnswerCorrect(userAnswers[i], currentQuestion.correctAnswers[i])) {
        currentCorrect++;
      } else {
        hasError = true;
      }
    });
    
    setScore({
      correct: score.correct + currentCorrect,
      total: score.total + currentQuestion.displayPronouns.length
    });

    if (hasError) {
      setMistakes(prev => {
        const existingIndex = prev.findIndex(m => m.verb.infinitive === currentQuestion.verb.infinitive && m.tense === currentQuestion.tense);
        if (existingIndex === -1) {
          return [...prev, { verb: currentQuestion.verb, tense: currentQuestion.tense, streak: 0 }];
        } else {
          const newMistakes = [...prev];
          newMistakes[existingIndex] = { ...newMistakes[existingIndex], streak: 0 };
          return newMistakes;
        }
      });
    } else {
      setMistakes(prev => {
        const existingIndex = prev.findIndex(m => m.verb.infinitive === currentQuestion.verb.infinitive && m.tense === currentQuestion.tense);
        if (existingIndex !== -1) {
          const currentStreak = prev[existingIndex].streak || 0;
          if (currentStreak + 1 >= 3) {
            return prev.filter((_, idx) => idx !== existingIndex);
          } else {
            const newMistakes = [...prev];
            newMistakes[existingIndex] = { ...newMistakes[existingIndex], streak: currentStreak + 1 };
            return newMistakes;
          }
        }
        return prev;
      });
    }

    setShowResults(true);
  };

  const handleModeChange = (newMode) => {
    setQuizMode(newMode);
    generateQuestion(newMode);
  };

  if (!currentQuestion) {
    if (quizMode === 'ripasso') {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-2xl mx-auto text-center mt-12">
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-emerald-200">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} />
            </div>
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Bravissimo!</h2>
            <p className="text-slate-600 text-lg mb-8">Non hai più nessun errore da ripassare. Ottimo lavoro!</p>
            <button 
              onClick={() => handleModeChange('misto')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-colors"
            >
              Torna al Quiz Misto
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  const isImperativeIo = (index) => currentQuestion.tense === 'imperativo' && index === 0;
  
  const getTenseTitle = (tense) => {
    if (tense === 'presente') return 'Il Presente';
    if (tense === 'imperfetto') return "L'Imperfetto";
    if (tense === 'futuro') return "Il Futuro Semplice";
    if (tense === 'passatoRemoto') return 'Il Passato Remoto';
    if (tense === 'passatoProssimo') return 'Il Passato Prossimo';
    if (tense === 'trapassatoProssimo') return 'Il Trapassato Prossimo';
    return "L'Imperativo";
  };

  const getTenseBadgeType = (question) => {
    if (question.tense === 'presente') return question.verb.typePres;
    if (question.tense === 'imperfetto') return question.verb.typeImperf;
    if (question.tense === 'futuro') return question.verb.typeFut;
    if (question.tense === 'passatoRemoto') return question.verb.typePR;
    if (question.tense === 'passatoProssimo') return question.verb.typePP;
    if (question.tense === 'trapassatoProssimo') return question.verb.typeTP;
    return question.verb.typeImp;
  };

  const currentBadgeType = getTenseBadgeType(currentQuestion);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-3xl mx-auto">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2 inline-block">Mettiti alla prova!</h2>
        <p className="text-slate-600 mt-2 text-lg">Coniuga il verbo in tutte le persone.</p>
        
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
            <button
              onClick={() => handleModeChange('misto')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'misto' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Misto
            </button>
            <button
              onClick={() => handleModeChange('presente')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'presente' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Presente
            </button>
            <button
              onClick={() => handleModeChange('imperfetto')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'imperfetto' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Imperfetto
            </button>
            <button
              onClick={() => handleModeChange('futuro')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'futuro' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Futuro
            </button>
            <button
              onClick={() => handleModeChange('passatoProssimo')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'passatoProssimo' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              P. Prossimo
            </button>
            <button
              onClick={() => handleModeChange('trapassatoProssimo')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'trapassatoProssimo' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Trapassato
            </button>
            <button
              onClick={() => handleModeChange('passatoRemoto')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'passatoRemoto' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              P. Remoto
            </button>
            <button
              onClick={() => handleModeChange('imperativo')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'imperativo' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Imperativo
            </button>
            <button
              onClick={() => handleModeChange('ripasso')}
              disabled={mistakes.length === 0 && quizMode !== 'ripasso'}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5
                ${quizMode === 'ripasso' ? 'bg-amber-100 text-amber-800' : 
                  mistakes.length > 0 ? 'text-amber-600 hover:bg-amber-50 border border-amber-200' : 'text-slate-300 cursor-not-allowed border border-transparent'}`}
            >
              Errori
              {mistakes.length > 0 && (
                <span className={`${quizMode === 'ripasso' ? 'bg-amber-800' : 'bg-amber-500'} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full`}>
                  {mistakes.length}
                </span>
              )}
            </button>
          </div>

          <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full text-indigo-800 font-semibold text-sm border border-indigo-200">
            <span>Punteggio totale:</span>
            <span className="bg-white px-2 py-1 rounded text-indigo-600">{score.correct} / {score.total}</span>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className="bg-indigo-900 p-6 text-white text-center flex flex-col items-center">
          <p className="text-indigo-200 uppercase tracking-wider text-sm font-bold mb-1">
            {getTenseTitle(currentQuestion.tense)}
          </p>
          <h3 className="text-4xl font-black mb-1">{currentQuestion.verb.infinitive}</h3>
          <p className="text-indigo-300 text-sm mb-3">({currentQuestion.verb.translation})</p>
          <div className="mt-1">
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              currentBadgeType === "Irregolare" 
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
            }`}>
              {currentBadgeType}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {currentQuestion.displayPronouns.map((p, i) => {
            const correct = currentQuestion.correctAnswers[i];
            const isCorrect = isAnswerCorrect(userAnswers[i], correct);
            const disabled = isImperativeIo(i) || showResults;

            return (
              <div key={p} className="flex items-center gap-4">
                <label className="w-32 text-right font-medium text-slate-600">
                  {p}
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={userAnswers[i] || ""}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    disabled={disabled}
                    placeholder={isImperativeIo(i) ? "-" : `Scrivi qui...`}
                    className={`w-full p-3 rounded-lg border outline-none transition-all
                      ${disabled && !showResults ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : ''}
                      ${!showResults && !disabled ? 'bg-slate-50 border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200' : ''}
                      ${showResults && isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold' : ''}
                      ${showResults && !isCorrect ? 'bg-red-50 border-red-400 text-red-800' : ''}
                    `}
                  />
                  
                  {showResults && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isCorrect ? (
                        <Check className="text-emerald-500" size={20} />
                      ) : (
                        <X className="text-red-500" size={20} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {showResults && (
            <div className="mt-6">
              {userAnswers.some((ans, i) => !isAnswerCorrect(ans, currentQuestion.correctAnswers[i])) ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-bold text-amber-800 mb-2">Correzioni:</h4>
                  <ul className="space-y-1 text-sm text-amber-900">
                    {currentQuestion.displayPronouns.map((p, i) => {
                      if (!isAnswerCorrect(userAnswers[i], currentQuestion.correctAnswers[i])) {
                        return (
                          <li key={i}>
                            <strong className="inline-block w-24">{p}:</strong> {currentQuestion.correctAnswers[i]}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-800">
                  <div className="bg-emerald-200 p-2 rounded-full flex-shrink-0">
                    <Check size={24} className="text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900">Perfetto!</h4>
                    {mistakes.find(m => m.verb.infinitive === currentQuestion.verb.infinitive && m.tense === currentQuestion.tense) ? (
                      <p className="text-sm mt-1">
                        Risposte corrette consecutive: <strong>{mistakes.find(m => m.verb.infinitive === currentQuestion.verb.infinitive && m.tense === currentQuestion.tense).streak} su 3</strong>. Continua così per rimuoverlo dagli errori!
                      </p>
                    ) : (
                      <p className="text-sm mt-1">Nessun errore! Questo verbo è padroneggiato.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          {!showResults ? (
            <button
              onClick={checkAnswers}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <Check size={20} /> Controlla le risposte
            </button>
          ) : (
            <button
              onClick={() => generateQuestion()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <RefreshCw size={20} /> Prossimo verbo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}