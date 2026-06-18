import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, AlertCircle } from 'lucide-react';

export default function SpeechRecorder({ onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  
  // Use a ref for the callback so we don't have to rebuild the recognition engine
  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech Recognition non è supportato dal tuo browser. Prova Chrome o Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT'; // Italian
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        onResultRef.current(finalTranscript, true);
        setIsListening(false);
      } else if (interimTranscript) {
        onResultRef.current(interimTranscript, false);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        setError('Permesso microfono negato.');
      } else if (event.error !== 'aborted') {
        setError(`Errore: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []); // Empty dependency array: only build the engine once

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (error && !recognitionRef.current) {
    return (
      <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded text-sm">
        <AlertCircle size={16} />
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={toggleRecording}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-indigo-600 hover:bg-indigo-500'
        }`}
        title={isListening ? "Ferma registrazione" : "Inizia a parlare"}
      >
        {isListening ? (
          <Square fill="white" className="text-white" size={24} />
        ) : (
          <Mic className="text-white" size={28} />
        )}
      </button>
      
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
      
      <p className="text-gray-400 text-xs mt-1">
        {isListening ? "In ascolto..." : "Premi per parlare"}
      </p>
    </div>
  );
}
