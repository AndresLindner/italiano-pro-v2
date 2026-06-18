import React, { useState, useEffect } from 'react';
import { listenAndRepeatPhrases } from '../data/listenAndRepeatPhrases';
import SpeechRecorder from './SpeechRecorder';
import { isMatch } from '../utils/textMatching';
import { speakItalian, cancelSpeech } from '../utils/speech';
import { Volume2, ChevronRight, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function ListenAndRepeatTab() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', spoken: string }
  const [isPlaying, setIsPlaying] = useState(false);
  const [interimText, setInterimText] = useState('');

  const phrase = listenAndRepeatPhrases[currentIndex];

  useEffect(() => {
    // Cleanup speech if component unmounts
    return () => cancelSpeech();
  }, []);

  const handleListen = () => {
    if (isPlaying) {
      cancelSpeech();
      setIsPlaying(false);
      return;
    }
    
    setIsPlaying(true);
    speakItalian(phrase.text, () => setIsPlaying(false), 0.9); // Slightly slower for clarity
  };

  const handleSpeechResult = (spokenText, isFinal) => {
    if (!isFinal) {
      setInterimText(spokenText);
      return;
    }

    setInterimText(''); // Clear interim when final arrives
    const match = isMatch(spokenText, phrase.text);
    
    if (match) {
      setFeedback({ type: 'success', spoken: spokenText });
      setIsTextVisible(true); // Automatically reveal text on success
    } else {
      setFeedback({ type: 'error', spoken: spokenText });
    }
  };

  const nextPhrase = () => {
    setFeedback(null);
    setInterimText('');
    setIsTextVisible(false);
    cancelSpeech();
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % listenAndRepeatPhrases.length);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          Ascolta e Ripeti
        </h2>
        <p className="text-gray-400 mt-2">
          Ascolta la frase e ripetila a memoria usando il microfono. 
          L'obiettivo è allenare l'orecchio e la pronuncia.
        </p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 md:p-10 flex flex-col items-center shadow-lg relative">
        {/* Prominent Question Number */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white font-bold px-6 py-2 rounded-full shadow-lg border-4 border-gray-900 text-lg">
          Domanda {currentIndex + 1} di {listenAndRepeatPhrases.length}
        </div>

        {/* Listen Button */}
        <button
          onClick={handleListen}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-md mb-8 ${
            isPlaying 
              ? 'bg-indigo-400 text-gray-900 animate-pulse scale-105' 
              : 'bg-gray-700 hover:bg-gray-600 text-indigo-300'
          }`}
        >
          <Volume2 size={40} className={isPlaying ? 'animate-bounce' : ''} />
        </button>

        {/* Hidden / Revealed Text */}
        <div className="min-h-[140px] flex flex-col items-center justify-center text-center w-full mb-8 relative">
          {isTextVisible ? (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300 flex flex-col items-center">
              <p className="text-3xl font-medium text-white">{phrase.text}</p>
              <p className="text-md text-gray-400 italic">{phrase.translation}</p>
              <button 
                onClick={() => setIsTextVisible(false)}
                className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Eye size={16} /> Nascondi testo
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsTextVisible(true)}
              className="flex flex-col items-center gap-3 text-gray-500 hover:text-gray-300 transition-colors p-6 border-2 border-dashed border-gray-600 rounded-xl w-full max-w-md bg-gray-800/50 hover:bg-gray-700/50"
            >
              <EyeOff size={32} />
              <span className="font-medium text-lg">Testo nascosto</span>
              <span className="text-sm opacity-80">Clicca per mostrare</span>
            </button>
          )}
        </div>

        {/* Recorder Component */}
        <SpeechRecorder onResult={handleSpeechResult} />

        {/* Live Transcription */}
        {interimText && (
          <div className="mt-6 text-xl text-indigo-300 font-medium italic animate-pulse text-center">
            "{interimText}..."
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div className={`mt-8 w-full p-6 rounded-xl border-2 text-center animate-in zoom-in-95 duration-300 shadow-2xl ${
            feedback.type === 'success' 
              ? 'bg-green-900/40 border-green-500 text-green-50' 
              : 'bg-red-900/40 border-red-500 text-red-50'
          }`}>
            <h3 className={`font-black text-2xl mb-3 flex items-center justify-center gap-3 ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {feedback.type === 'success' ? '🎉 BRAVISSIMO! 🎉' : '❌ PECCATO, RIPROVA! ❌'}
            </h3>
            <p className="text-base opacity-90 mb-2">Hai detto:</p>
            <p className="text-xl font-mono bg-black/40 px-4 py-3 rounded-lg inline-block border border-white/10 shadow-inner">
              "{feedback.spoken}"
            </p>
          </div>
        )}

        {/* Next Button */}
        <div className="mt-8 pt-6 border-t border-gray-700 w-full flex justify-between">
          <button
            onClick={() => {
               setFeedback(null);
               setInterimText('');
               setIsTextVisible(false);
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded transition-colors"
          >
            <RefreshCw size={18} />
            Ripristina
          </button>
          
          <button
            onClick={nextPhrase}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded shadow transition-colors font-semibold"
          >
            Prossima <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
