import React, { useState, useEffect } from 'react';
import { PenTool, CheckCircle2, Circle, FileText, Send, Save } from 'lucide-react';
import { modulo10Data } from '../data/modulo10_data';
import { useAuth } from '../contexts/AuthContext';

export function Modulo10Section() {
  const [activePromptId, setActivePromptId] = useState(modulo10Data[0].id);
  const [userDrafts, setUserDrafts] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  
  const { userProgress, saveProgress } = useAuth();

  const activePrompt = modulo10Data.find(p => p.id === activePromptId);
  const currentText = userDrafts[activePromptId] || "";

  useEffect(() => {
    if (userProgress && userProgress['modulo10']) {
      setUserDrafts(prev => Object.keys(prev).length === 0 ? (userProgress['modulo10'].drafts || {}) : prev);
    }
  }, [userProgress]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setUserDrafts(prev => ({ ...prev, [activePromptId]: newText }));
    setIsSaved(false);
  };

  const saveDraft = () => {
    saveProgress('modulo10', { drafts: userDrafts });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const wordCount = currentText.trim().split(/\s+/).filter(word => word.length > 0).length;

  const checkCriterion = (criterion, text) => {
    if (criterion.minWords) {
      return wordCount >= criterion.minWords;
    }
    if (criterion.pattern) {
      return criterion.pattern.test(text);
    }
    return false;
  };

  const allCriteriaMet = activePrompt.checklist.every(c => checkCriterion(c, currentText));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2 flex items-center gap-3">
          <PenTool className="text-indigo-600" size={36} /> Modulo 10: Produzione Scritta
        </h2>
        <p className="text-slate-600 text-lg">Esercitati a scrivere email formali e saggi brevi usando strutture grammaticali avanzate.</p>
      </header>

      {/* Selector Component */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {modulo10Data.map((prompt, index) => (
          <button
            key={prompt.id}
            onClick={() => setActivePromptId(prompt.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2
              ${activePromptId === prompt.id 
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' 
                : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'}`}
          >
            <FileText size={18} /> Tema {index + 1}: {prompt.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Text Editor */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div className="bg-white rounded-t-2xl p-6 border border-slate-200 border-b-0">
            <h3 className="text-xl font-bold text-slate-800 mb-3">{activePrompt.title}</h3>
            <div className="bg-indigo-50 p-4 rounded-xl text-indigo-900 border border-indigo-100 text-sm md:text-base leading-relaxed">
              <strong>Traccia:</strong> {activePrompt.prompt}
            </div>
          </div>
          
          <div className="relative flex-grow">
            <textarea
              value={currentText}
              onChange={handleTextChange}
              placeholder="Inizia a scrivere qui la tua risposta..."
              className="w-full h-96 p-6 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-y text-slate-700 leading-relaxed rounded-b-2xl shadow-inner font-sans"
              spellCheck="false"
            />
          </div>

          <div className="flex justify-between items-center mt-4 px-2">
            <div className="text-slate-500 font-medium">
              Parole: <span className={wordCount >= (activePrompt.checklist.find(c => c.minWords)?.minWords || 0) ? 'text-emerald-600 font-bold' : 'text-slate-800 font-bold'}>{wordCount}</span>
            </div>
            
            <button 
              onClick={saveDraft}
              className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2
                ${isSaved ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm'}`}
            >
              {isSaved ? <><CheckCircle2 size={18} /> Salvato</> : <><Save size={18} /> Salva Bozza</>}
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Checklist */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-4 border-b border-slate-200 pb-2">Checklist Dinamica</h3>
            <p className="text-sm text-slate-500 mb-6">Mentre scrivi, il sistema verificherà se stai usando le strutture richieste dal livello B2.</p>
            
            <div className="space-y-4">
              {activePrompt.checklist.map(criterion => {
                const isMet = checkCriterion(criterion, currentText);
                return (
                  <div key={criterion.id} className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${isMet ? 'bg-emerald-100/50' : 'hover:bg-slate-100'}`}>
                    <div className="mt-0.5 flex-shrink-0">
                      {isMet ? <CheckCircle2 className="text-emerald-500" size={20} /> : <Circle className="text-slate-300" size={20} />}
                    </div>
                    <span className={`text-sm font-medium ${isMet ? 'text-emerald-800' : 'text-slate-600'}`}>
                      {criterion.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button 
                disabled={!allCriteriaMet}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black transition-all
                  ${allCriteriaMet 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <Send size={20} /> Invia Tema Completo
              </button>
              {!allCriteriaMet && (
                <p className="text-xs text-center text-slate-400 mt-3 font-medium">
                  Completa tutti i requisiti della checklist per abilitare l'invio.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
