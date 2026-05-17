import React, { useState } from 'react';
import { BookA, Briefcase, Globe, HeartPulse, ChevronRight, Volume2 } from 'lucide-react';
import { lessicoTematico } from '../data/lessico_data';

const categoryIcons = {
  "ambiente": <Globe className="text-emerald-500" size={24} />,
  "lavoro": <Briefcase className="text-blue-500" size={24} />,
  "societa": <BookA className="text-purple-500" size={24} />,
  "salute": <HeartPulse className="text-rose-500" size={24} />
};

export function LessicoTematicoSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(lessicoTematico[0].id);

  const activeCategory = lessicoTematico.find(c => c.id === activeCategoryId);

  // Simple text-to-speech function using Web Speech API
  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.9; // Slightly slower for clarity
      
      // Try to find a good Italian voice (preferably Google/Apple native if available)
      const voices = window.speechSynthesis.getVoices();
      const itVoice = voices.find(voice => voice.lang.includes('it-IT') && voice.localService);
      if (itVoice) {
        utterance.voice = itVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Lessico Tematico</h2>
        <p className="text-slate-600 text-lg">Il vocabolario essenziale diviso per aree tematiche per superare le prove scritte e orali del B2.</p>
      </header>

      {/* Category Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {lessicoTematico.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategoryId(category.id)}
            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl transition-all duration-200 border-2 
              ${activeCategoryId === category.id 
                ? 'bg-white border-indigo-500 shadow-md scale-105' 
                : 'bg-slate-50 border-transparent hover:bg-indigo-50 text-slate-500'}`}
          >
            <div className={`p-3 rounded-full ${activeCategoryId === category.id ? 'bg-indigo-50' : 'bg-white shadow-sm'}`}>
              {categoryIcons[category.id]}
            </div>
            <span className={`font-bold text-sm md:text-base ${activeCategoryId === category.id ? 'text-indigo-900' : ''}`}>
              {category.title}
            </span>
          </button>
        ))}
      </div>

      {/* Active Category Content */}
      {activeCategory && (
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-black text-slate-800 mb-3 flex items-center justify-center gap-3">
              {categoryIcons[activeCategory.id]} {activeCategory.title}
            </h3>
            <p className="text-slate-500 text-lg">{activeCategory.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.words.map((wordObj, index) => {
              // Determine badge colors based on word type
              let typeLabel = "Sostantivo";
              let typeColors = "bg-blue-100 text-blue-700 border-blue-200";
              
              if (wordObj.type === 'v') {
                typeLabel = "Verbo";
                typeColors = "bg-emerald-100 text-emerald-700 border-emerald-200";
              } else if (wordObj.type === 'adj') {
                typeLabel = "Aggettivo";
                typeColors = "bg-amber-100 text-amber-700 border-amber-200";
              }

              return (
                <div key={index} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${typeColors}`}>
                      {typeLabel}
                    </span>
                    <button 
                      onClick={() => speakWord(wordObj.it)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors p-1 bg-white rounded-full shadow-sm hover:shadow"
                      title="Ascolta la pronuncia"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-slate-800">{wordObj.it}</h4>
                    <p className="text-slate-500 font-medium italic flex items-center gap-2">
                      <ChevronRight size={16} className="text-slate-300" />
                      {wordObj.en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
