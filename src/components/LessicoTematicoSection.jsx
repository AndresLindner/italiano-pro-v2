import React, { useState, useEffect } from 'react';
import { BookA, Briefcase, Globe, HeartPulse, ChevronRight, Volume2, Maximize2, X, RefreshCw, Layers } from 'lucide-react';
import { lessicoTematico } from '../data/lessico_data';
import { useAuth } from '../contexts/AuthContext';

const categoryIcons = {
  "ambiente": <Globe className="text-emerald-500" size={24} />,
  "lavoro": <Briefcase className="text-blue-500" size={24} />,
  "societa": <BookA className="text-purple-500" size={24} />,
  "salute": <HeartPulse className="text-rose-500" size={24} />
};

export function LessicoTematicoSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(lessicoTematico[0].id);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  
  // Flashcard specific states
  const [flashcardQueue, setFlashcardQueue] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const { userFlashcards, saveFlashcardProgress } = useAuth();

  const activeCategory = lessicoTematico.find(c => c.id === activeCategoryId);

  // Initialize flashcard queue based on SRS logic (prioritize overdue or unreviewed)
  useEffect(() => {
    if (isFlashcardMode && activeCategory) {
      const now = Date.now();
      
      const sortedWords = [...activeCategory.words].sort((a, b) => {
        const wordAId = `${activeCategory.id}_${a.it}`;
        const wordBId = `${activeCategory.id}_${b.it}`;
        
        const dataA = userFlashcards?.[wordAId];
        const dataB = userFlashcards?.[wordBId];

        // If never reviewed, high priority
        if (!dataA) return -1;
        if (!dataB) return 1;

        // If reviewed, check next review date (smaller/earlier date = higher priority)
        return (dataA.nextReview || 0) - (dataB.nextReview || 0);
      });

      setFlashcardQueue(sortedWords);
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
    }
  }, [isFlashcardMode, activeCategoryId, activeCategory, userFlashcards]);

  const speakWord = (text, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.9;
      
      const voices = window.speechSynthesis.getVoices();
      const itVoice = voices.find(voice => voice.lang.includes('it-IT') && voice.localService);
      if (itVoice) utterance.voice = itVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSRSResponse = (quality) => {
    const currentWord = flashcardQueue[currentCardIndex];
    const wordId = `${activeCategory.id}_${currentWord.it}`;
    
    // Very simplified SRS algorithm
    // quality: 0 (Sbagliato), 1 (Normale), 2 (Facile)
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    let nextReviewDelta = dayInMs; // Default 1 day
    if (quality === 0) {
      nextReviewDelta = 0; // Review immediately next session
    } else if (quality === 1) {
      nextReviewDelta = dayInMs * 2; // 2 days
    } else if (quality === 2) {
      nextReviewDelta = dayInMs * 7; // 7 days
    }

    saveFlashcardProgress(wordId, {
      quality,
      nextReview: now + nextReviewDelta,
      historyCount: (userFlashcards?.[wordId]?.historyCount || 0) + 1
    });

    // Move to next card
    if (currentCardIndex < flashcardQueue.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsCardFlipped(false);
    } else {
      // Finished queue
      setIsFlashcardMode(false);
      alert("Hai completato tutte le parole di questa categoria per oggi!");
    }
  };

  if (isFlashcardMode && flashcardQueue.length > 0) {
    const currentWord = flashcardQueue[currentCardIndex];
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center p-4">
        <button 
          onClick={() => setIsFlashcardMode(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        <div className="text-white/70 mb-8 font-medium tracking-widest text-sm uppercase">
          Flashcard {currentCardIndex + 1} di {flashcardQueue.length}
        </div>

        {/* Card Container */}
        <div 
          className="w-full max-w-lg aspect-[4/3] perspective-1000 cursor-pointer group"
          onClick={() => setIsCardFlipped(!isCardFlipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isCardFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front of Card (Italian) */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden">
              <button 
                onClick={(e) => speakWord(currentWord.it, e)}
                className="absolute top-6 right-6 p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
              >
                <Volume2 size={24} />
              </button>
              <span className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">{currentWord.type === 'v' ? 'Verbo' : currentWord.type === 'adj' ? 'Aggettivo' : 'Sostantivo'}</span>
              <h2 className="text-5xl font-black text-slate-800 text-center">{currentWord.it}</h2>
              <p className="absolute bottom-6 text-slate-400 font-medium text-sm animate-pulse">Clicca per girare</p>
            </div>

            {/* Back of Card (English) */}
            <div className="absolute inset-0 bg-indigo-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180">
              <h2 className="text-4xl font-black text-white text-center mb-6">{currentWord.en}</h2>
              <div className="w-full h-px bg-white/20 mb-6"></div>
              <h3 className="text-indigo-200 text-lg mb-2">Com'è andata?</h3>
              
              <div className="flex gap-4 w-full" onClick={e => e.stopPropagation()}>
                <button 
                  onClick={() => handleSRSResponse(0)}
                  className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors shadow-lg"
                >
                  Sbagliato
                </button>
                <button 
                  onClick={() => handleSRSResponse(1)}
                  className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg"
                >
                  Normale
                </button>
                <button 
                  onClick={() => handleSRSResponse(2)}
                  className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg"
                >
                  Facile
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-6xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-indigo-950 mb-2">Lessico Tematico</h2>
          <p className="text-slate-600 text-lg">Il vocabolario essenziale diviso per aree tematiche per superare le prove scritte e orali del B2.</p>
        </div>
        <button 
          onClick={() => setIsFlashcardMode(true)}
          className="flex-shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <Layers size={20} className="group-hover:scale-110 transition-transform" />
          Studio Attivo (Flashcard)
        </button>
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
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="text-center mb-10 max-w-2xl mx-auto relative z-10">
            <h3 className="text-3xl font-black text-slate-800 mb-3 flex items-center justify-center gap-3">
              {categoryIcons[activeCategory.id]} {activeCategory.title}
            </h3>
            <p className="text-slate-500 text-lg">{activeCategory.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {activeCategory.words.map((wordObj, index) => {
              const wordId = `${activeCategory.id}_${wordObj.it}`;
              const srsData = userFlashcards?.[wordId];
              
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
                  
                  <div className="space-y-1 mb-4">
                    <h4 className="text-2xl font-bold text-slate-800">{wordObj.it}</h4>
                    <p className="text-slate-500 font-medium italic flex items-center gap-2">
                      <ChevronRight size={16} className="text-slate-300" />
                      {wordObj.en}
                    </p>
                  </div>

                  {srsData && (
                    <div className="pt-3 border-t border-slate-200 text-xs font-medium flex items-center gap-2">
                      {srsData.quality === 2 && <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Facile</span>}
                      {srsData.quality === 1 && <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Normale</span>}
                      {srsData.quality === 0 && <span className="text-rose-600 bg-rose-100 px-2 py-0.5 rounded">Difficile</span>}
                      <span className="text-slate-400">Ripassato {srsData.historyCount} volte</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
