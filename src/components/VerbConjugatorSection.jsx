import { useState } from 'react';
import { Search, Volume2, Shield, ShieldAlert, BookOpen, Layers, Milestone, HelpCircle, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { speakItalian } from '../utils/speech';

const pronouns = ["io", "tu", "lui/lei", "noi", "voi", "loro"];

export function VerbConjugatorSection({ verbs = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, regular, irregular
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(0);
  const [activeMoodTab, setActiveMoodTab] = useState('indicativo'); // indicativo, congiuntivo, condizionale, imperativo

  // Filter verbs based on search and type filter
  const filteredVerbs = verbs.filter(verb => {
    const matchesSearch = verb.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (verb.translation && verb.translation.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Check if the verb is irregular in at least one of the main tenses
    const isIrregular = 
      verb.typePres === "Irregolare" || 
      verb.typeImperf === "Irregolare" || 
      verb.typePassatoProssimo === "Irregolare" ||
      verb.typeFuturo === "Irregolare" ||
      verb.typeCondizionale === "Irregolare" ||
      verb.typeCongiuntivoPres === "Irregolare" ||
      verb.typeCongiuntivoImperf === "Irregolare";

    if (filterType === 'regular') return !isIrregular && matchesSearch;
    if (filterType === 'irregular') return isIrregular && matchesSearch;
    return matchesSearch;
  });

  // Safe selected verb
  const selectedVerb = filteredVerbs[selectedVerbIndex] || filteredVerbs[0] || verbs[0];

  const speakWord = (word) => {
    if (!word || word === "-" || word.toLowerCase().includes("non ha") || word.includes("N/A")) return;

    let cleanWord = word;
    if (word.endsWith('/a') || word.endsWith('/e')) {
      cleanWord = word.slice(0, -2);
    } else if (word.includes('/')) {
      cleanWord = word.split('/')[0].trim();
    }

    speakItalian(cleanWord);
  };

  const renderConjugationCard = (title, forms, type, colorClasses) => {
    if (!forms || forms.length === 0 || forms[0] === "Non ha imperativo" || forms[0] === "N/A") {
      return (
        <div className={`p-5 rounded-2xl border ${colorClasses.border} ${colorClasses.bg} backdrop-blur-md transition-all duration-300 shadow-sm flex flex-col items-center justify-center min-h-[220px]`}>
          <HelpCircle size={32} className={`${colorClasses.text} opacity-60 mb-2`} />
          <h4 className={`font-bold ${colorClasses.text} text-lg mb-1`}>{title}</h4>
          <p className="text-slate-400 text-xs italic">Nessuna forma coniugata</p>
        </div>
      );
    }

    const isIrregular = type === "Irregolare";
    const isSubjunctive = title.toLowerCase().includes("congiuntivo");
    const isPresentOrImperfettoSubjunctive = isSubjunctive && (title.toLowerCase().includes("presente") || title.toLowerCase().includes("imperfetto"));
    const isPassatoRemoto = title.toLowerCase().includes("passato remoto");

    let fullTTS = "";
    if (isPresentOrImperfettoSubjunctive) {
      fullTTS = pronouns
        .map((p, idx) => {
          const form = forms[idx];
          if (!form || form === "-") return "";
          const pronoun = p === "lui/lei" ? "lui" : p;
          return `che ${pronoun} ${form}`;
        })
        .filter(Boolean)
        .join(". ") + ".";
    } else if (isPassatoRemoto) {
      fullTTS = pronouns
        .map((p, idx) => {
          const form = forms[idx];
          if (!form || form === "-" || form.toLowerCase().includes("non ha") || form.includes("N/A")) return "";
          
          let cleanForm = form;
          if (form.endsWith('/a') || form.endsWith('/e')) {
            cleanForm = form.slice(0, -2);
          } else if (form.includes('/')) {
            cleanForm = form.split('/')[0].trim();
          }
          
          const pronoun = p === "lui/lei" ? "lui" : p;
          return `${pronoun} ${cleanForm}`;
        })
        .filter(Boolean)
        .join("; ");
    }

    return (
      <div className={`p-5 rounded-2xl border ${colorClasses.border} ${colorClasses.bg} backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-md`}>
        <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-100">
          <div className="flex items-center gap-1.5">
            <h4 className={`font-bold ${colorClasses.text} text-lg`}>{title}</h4>
            {(isPresentOrImperfettoSubjunctive || isPassatoRemoto) && fullTTS && (
              <button
                onClick={() => speakWord(fullTTS)}
                className="p-1 rounded-md text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                title="Ascolta la pronuncia completa"
              >
                <Volume2 size={15} />
              </button>
            )}
          </div>
          <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border ${
            isIrregular 
              ? 'bg-amber-50 text-amber-600 border-amber-200' 
              : 'bg-emerald-50 text-emerald-600 border-emerald-200'
          }`}>
            {type || 'Regolare'}
          </span>
        </div>

        <table className="w-full text-sm">
          <tbody>
            {pronouns.map((p, i) => {
              const form = forms[i] || '-';
              const hasForm = form !== "-";
              return (
                <tr key={p} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors`}>
                  <td className="py-2 px-1 text-slate-400 font-medium w-16">{p}</td>
                  <td className="py-2 px-2 font-bold text-slate-800">
                    {hasForm ? (
                      <div className="flex items-center justify-between gap-2 group">
                        <span className="text-slate-800 font-bold leading-tight">{form}</span>
                        <button
                          onClick={() => {
                            const pronoun = p === "lui/lei" ? "lui" : p;
                            const wordToSpeak = isSubjunctive ? `che ${pronoun} ${form}` : form;
                            speakWord(wordToSpeak);
                          }}
                          className="p-1 rounded-md text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
                          title="Ascolta la pronuncia"
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-300 font-normal">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const isVerbIrregular = selectedVerb && (
    selectedVerb.typePres === "Irregolare" || 
    selectedVerb.typeImperf === "Irregolare" || 
    selectedVerb.typePR === "Irregolare" || 
    selectedVerb.typeFut === "Irregolare" || 
    selectedVerb.typeCond === "Irregolare"
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-4xl font-black text-indigo-950 flex items-center gap-3">
            <Activity className="text-indigo-600 animate-pulse" size={36} /> Coniugatore Verbi Sandbox
          </h2>
          <p className="text-slate-600 text-lg mt-1">
            Ricerca e visualizza le coniugazioni complete per i 100 verbi italiani fondamentali di livello B2.
          </p>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Search and list */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col max-h-[750px]">
          {/* Search Box */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cerca un verbo o traduzione..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedVerbIndex(0);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-800 bg-slate-50 transition-all font-medium"
            />
          </div>

          {/* Type filters */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => { setFilterType('all'); setSelectedVerbIndex(0); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tutti
            </button>
            <button
              onClick={() => { setFilterType('regular'); setSelectedVerbIndex(0); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                filterType === 'regular'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Regolari
            </button>
            <button
              onClick={() => { setFilterType('irregular'); setSelectedVerbIndex(0); }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                filterType === 'irregular'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Irregolari
            </button>
          </div>

          <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider px-1">
            {filteredVerbs.length} {filteredVerbs.length === 1 ? 'verbo trovato' : 'verbi trovati'}
          </p>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[480px] lg:max-h-[500px]">
            {filteredVerbs.length > 0 ? (
              filteredVerbs.map((verb, idx) => {
                const isSelected = selectedVerb && selectedVerb.infinitive === verb.infinitive;
                // Calculate irregularity
                const localIrreg = 
                  verb.typePres === "Irregolare" || 
                  verb.typeImperf === "Irregolare" || 
                  verb.typePR === "Irregolare" || 
                  verb.typeFut === "Irregolare" || 
                  verb.typeCond === "Irregolare";

                return (
                  <button
                    key={verb.infinitive}
                    onClick={() => setSelectedVerbIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between group
                      ${isSelected
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-sm font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700'
                      }
                    `}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-black transition-all ${isSelected ? 'text-indigo-950 scale-102' : 'text-slate-800 group-hover:text-indigo-600'}`}>
                          {verb.infinitive}
                        </span>
                        {verb.prep && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-indigo-100 text-indigo-700 rounded border border-indigo-200">
                            + {verb.prep}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 italic font-medium">{verb.translation}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-full uppercase ${
                        localIrreg 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {localIrreg ? 'Irr' : 'Reg'}
                      </span>
                      <ChevronRight size={16} className={`transition-transform duration-200 ${isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300 group-hover:text-indigo-400'}`} />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 rounded-3xl">
                Nessun verbo corrispondente alla ricerca.
              </div>
            )}
          </div>
        </div>

        {/* Right column: Conjugation grid */}
        <div className="lg:col-span-8 space-y-6">
          {selectedVerb ? (
            <div className="space-y-6">
              {/* Verb Showcase Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/40 rounded-full blur-3xl opacity-60 -mr-20 -mt-20 pointer-events-none"></div>
                
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tight">{selectedVerb.infinitive}</h3>
                    <button
                      onClick={() => speakWord(selectedVerb.infinitive)}
                      className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-2xl transition-all duration-200 shadow-sm border border-slate-200/50"
                      title="Ascolta la pronuncia dell'infinito"
                    >
                      <Volume2 size={20} />
                    </button>
                    {selectedVerb.prep && (
                      <span className="text-sm font-extrabold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                        Preposizione: + {selectedVerb.prep}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-slate-500 font-medium">Traduzione: <span className="italic text-indigo-900 font-semibold">{selectedVerb.translation}</span></p>
                </div>

                <div className="flex-shrink-0 z-10 flex flex-col gap-2 bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50">
                  <div className="flex items-center gap-2">
                    {isVerbIrregular ? (
                      <ShieldAlert size={18} className="text-amber-600" />
                    ) : (
                      <Shield size={18} className="text-emerald-600" />
                    )}
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-950">Struttura Verbale</span>
                  </div>
                  <span className={`text-base font-bold ${isVerbIrregular ? 'text-amber-700' : 'text-emerald-700'}`}>
                    Verb {isVerbIrregular ? 'Irregolare' : 'Regolare'}
                  </span>
                </div>
              </div>

              {/* Navigation Tabs for Moods */}
              <div className="flex flex-wrap border-b border-slate-200">
                <button
                  className={`px-6 py-3 font-bold text-base border-b-4 transition-all duration-200 flex items-center gap-2 ${
                    activeMoodTab === 'indicativo'
                      ? 'border-indigo-600 text-indigo-700 font-black'
                      : 'border-transparent text-slate-500 hover:text-indigo-500'
                  }`}
                  onClick={() => setActiveMoodTab('indicativo')}
                >
                  <BookOpen size={18} /> Indicativo
                </button>
                <button
                  className={`px-6 py-3 font-bold text-base border-b-4 transition-all duration-200 flex items-center gap-2 ${
                    activeMoodTab === 'congiuntivo'
                      ? 'border-purple-500 text-purple-700 font-black'
                      : 'border-transparent text-slate-500 hover:text-purple-500'
                  }`}
                  onClick={() => setActiveMoodTab('congiuntivo')}
                >
                  <Sparkles size={18} /> Congiuntivo
                </button>
                <button
                  className={`px-6 py-3 font-bold text-base border-b-4 transition-all duration-200 flex items-center gap-2 ${
                    activeMoodTab === 'condizionale'
                      ? 'border-pink-500 text-pink-700 font-black'
                      : 'border-transparent text-slate-500 hover:text-pink-500'
                  }`}
                  onClick={() => setActiveMoodTab('condizionale')}
                >
                  <Milestone size={18} /> Condizionale
                </button>
                <button
                  className={`px-6 py-3 font-bold text-base border-b-4 transition-all duration-200 flex items-center gap-2 ${
                    activeMoodTab === 'imperativo'
                      ? 'border-rose-500 text-rose-700 font-black'
                      : 'border-transparent text-slate-500 hover:text-rose-500'
                  }`}
                  onClick={() => setActiveMoodTab('imperativo')}
                >
                  <Layers size={18} /> Imperativo
                </button>
              </div>

              {/* Conjugation Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeMoodTab === 'indicativo' && (
                  <>
                    {renderConjugationCard("Presente", selectedVerb.presente, selectedVerb.typePres, {
                      bg: "bg-indigo-50/40 hover:bg-indigo-50/70", border: "border-indigo-100", text: "text-indigo-900"
                    })}
                    {renderConjugationCard("Imperfetto", selectedVerb.imperfetto, selectedVerb.typeImperf, {
                      bg: "bg-indigo-50/40 hover:bg-indigo-50/70", border: "border-indigo-100", text: "text-indigo-900"
                    })}
                    {renderConjugationCard("Passato Remoto", selectedVerb.passatoRemoto, selectedVerb.typePR, {
                      bg: "bg-indigo-50/40 hover:bg-indigo-50/70", border: "border-indigo-100", text: "text-indigo-900"
                    })}
                    {renderConjugationCard("Futuro Semplice", selectedVerb.futuro, selectedVerb.typeFut, {
                      bg: "bg-indigo-50/40 hover:bg-indigo-50/70", border: "border-indigo-100", text: "text-indigo-900"
                    })}
                    {renderConjugationCard("Passato Prossimo", selectedVerb.passatoProssimo, selectedVerb.typePP, {
                      bg: "bg-indigo-50/40 hover:bg-indigo-50/70", border: "border-indigo-100", text: "text-indigo-900"
                    })}
                    {renderConjugationCard("Trapassato Prossimo", selectedVerb.trapassatoProssimo, selectedVerb.typeTP, {
                      bg: "bg-indigo-50/40 hover:bg-indigo-50/70", border: "border-indigo-100", text: "text-indigo-900"
                    })}
                  </>
                )}

                {activeMoodTab === 'congiuntivo' && (
                  <>
                    {renderConjugationCard("Congiuntivo Presente", selectedVerb.congiuntivoPresente, selectedVerb.typeCongPres, {
                      bg: "bg-purple-50/40 hover:bg-purple-50/70", border: "border-purple-100", text: "text-purple-900"
                    })}
                    {renderConjugationCard("Congiuntivo Imperfetto", selectedVerb.congiuntivoImperfetto, selectedVerb.typeCongImp, {
                      bg: "bg-purple-50/40 hover:bg-purple-50/70", border: "border-purple-100", text: "text-purple-900"
                    })}
                    {renderConjugationCard("Congiuntivo Passato", selectedVerb.congiuntivoPassato, selectedVerb.typeCongPass, {
                      bg: "bg-purple-50/40 hover:bg-purple-50/70", border: "border-purple-100", text: "text-purple-900"
                    })}
                    {renderConjugationCard("Congiuntivo Trapassato", selectedVerb.congiuntivoTrapassato, selectedVerb.typeCongTrap, {
                      bg: "bg-purple-50/40 hover:bg-purple-50/70", border: "border-purple-100", text: "text-purple-900"
                    })}
                  </>
                )}

                {activeMoodTab === 'condizionale' && (
                  <>
                    {renderConjugationCard("Condizionale Presente", selectedVerb.condizionale, selectedVerb.typeCond, {
                      bg: "bg-pink-50/40 hover:bg-pink-50/70", border: "border-pink-100", text: "text-pink-900"
                    })}
                    {renderConjugationCard("Condizionale Passato", selectedVerb.condizionalePassato, selectedVerb.typeCondPass, {
                      bg: "bg-pink-50/40 hover:bg-pink-50/70", border: "border-pink-100", text: "text-pink-900"
                    })}
                  </>
                )}

                {activeMoodTab === 'imperativo' && (
                  <div className="md:col-span-2">
                    {renderConjugationCard("Imperativo", selectedVerb.imperativo, selectedVerb.typeImp, {
                      bg: "bg-rose-50/40 hover:bg-rose-50/70", border: "border-rose-100", text: "text-rose-900"
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-slate-500">Seleziona un verbo dalla lista a sinistra per esplorarlo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
