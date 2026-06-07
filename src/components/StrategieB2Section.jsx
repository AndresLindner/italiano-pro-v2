import React, { useState, useEffect, useRef } from 'react';
import { PenTool, Headphones, BookOpen, Clock, Play, Square, RotateCcw, Check, Copy, AlertCircle, Info, ChevronRight, MessageSquare, Sparkles, Mic, MicOff } from 'lucide-react';

export function StrategieB2Section() {
  const [activeStrategyTab, setActiveStrategyTab] = useState('scrittura'); // 'scrittura' or 'parlato'
  const [copiedText, setCopiedText] = useState('');

  // Speaking Simulator States
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [usedConnectors, setUsedConnectors] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  const prompts = [
    { title: "Smart Working", text: "Esprimi la tua opinione sullo smart working in Italia. Quali sono i vantaggi per l'azienda e per il dipendente? Quali sono le criticità?" },
    { title: "Turismo Sostenibile", text: "Parla dell'impatto ambientale del turismo di massa e spiega come promuovere un turismo più rispettoso dell'ambiente e delle comunità locali." },
    { title: "Tecnologia e Social Network", text: "I social network hanno cambiato il modo in cui ci relazioniamo. Spiega se a tuo avviso aumentano l'isolamento sociale o facilitano i contatti." },
    { title: "Cibo Biologico e Alimentazione", text: "L'alimentazione è fondamentale per la salute. Descrivi il trend del cibo biologico e discuti se, secondo te, è una reale necessità o solo una moda." },
    { title: "Istruzione e Futuro", text: "Discuti l'importanza del tirocinio e dello studio universitario. Pensi che il percorso educativo tradizionale prepari bene al mondo del lavoro?" }
  ];

  const connectors = [
    { id: "c1", word: "Innanzitutto", category: "Introdurre", desc: "Introduce il discorso in modo ordinato." },
    { id: "c2", word: "In primo luogo", category: "Introdurre", desc: "Introduce la prima tesi." },
    { id: "c3", word: "Inoltre", category: "Aggiungere", desc: "Aggiunge elementi o argomenti a supporto." },
    { id: "c4", word: "Oltre a ciò", category: "Aggiungere", desc: "Fornisce ulteriori informazioni." },
    { id: "c5", word: "Tuttavia", category: "Contrastare", desc: "Introduce una forte contrapposizione." },
    { id: "c6", word: "Eppure", category: "Contrastare", desc: "Mostra una discrepanza o un contrasto inaspettato." },
    { id: "c7", word: "Ciononostante", category: "Contrastare", desc: "Introduce un'idea concessiva forte (nonostante questo)." },
    { id: "c8", word: "D'altronde", category: "Contrastare", desc: "Aggiunge un fatto ovvio che bilancia l'argomento." },
    { id: "c9", word: "Pertanto", category: "Causa/Effetto", desc: "Fornisce una conseguenza logica." },
    { id: "c10", word: "Di conseguenza", category: "Causa/Effetto", desc: "Indica un chiaro nesso causa-effetto." },
    { id: "c11", word: "Poiché", category: "Causa/Effetto", desc: "Spiega la causa dell'azione principale." },
    { id: "c12", word: "In conclusione", category: "Concludere", desc: "Riassume e chiude il discorso." },
    { id: "c13", word: "Tirando le somme", category: "Concludere", desc: "Espressione colloquiale ma formale per concludere." },
    { id: "c14", word: "A mio avviso", category: "Opinione", desc: "Introduce la propria opinione personale." },
    { id: "c15", word: "Dal mio punto di vista", category: "Opinione", desc: "Fornisce una prospettiva soggettiva." },
    { id: "c16", word: "Personalmente", category: "Opinione", desc: "Sottolinea la propria opinione personale." }
  ];

  // Timer Effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Check Speech Recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (activeStrategyTab !== 'parlato' && isListening) {
      stopListening();
    }
  }, [activeStrategyTab, isListening]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'it-IT';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(fullTranscript);
        checkConnectorsInText(fullTranscript);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error(e);
      }
    }
    setIsListening(false);
  };

  const checkConnectorsInText = (text) => {
    const lowercaseText = text.toLowerCase();
    connectors.forEach(conn => {
      const cleanWord = conn.word.toLowerCase();
      if (lowercaseText.includes(cleanWord)) {
        setUsedConnectors(prev => ({ ...prev, [conn.id]: true }));
      }
    });
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    if (speechSupported && !isListening) {
      startListening();
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (isListening) {
      stopListening();
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(120);
    setUsedConnectors({});
    setTranscript('');
    if (isListening) {
      stopListening();
    }
  };

  const toggleConnector = (id) => {
    setUsedConnectors(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderScrittura = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-indigo-950 mb-4 flex items-center gap-2">
            <Info className="text-indigo-600" size={22} /> La Struttura dell'Email Formale B2
          </h3>
          <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
            All'esame B2 (CILS/CELI), la lettera o email formale richiede il rigoroso rispetto dei registri. Passa con il mouse o premi sui blocchi dell'email campione per capirne la struttura logica:
          </p>

          {/* Interactive email guide */}
          <div className="border border-indigo-100 rounded-2xl overflow-hidden font-mono text-xs md:text-sm bg-slate-50">
            <div className="p-4 bg-indigo-950 text-indigo-200 border-b border-indigo-900 flex justify-between items-center">
              <span>A: direzione@hotelroma.it</span>
              <span className="text-[10px] bg-indigo-900 px-2 py-0.5 rounded text-indigo-300 font-bold uppercase tracking-wider">Email Formale</span>
            </div>
            
            <div className="p-6 space-y-4 text-slate-700 bg-white">
              <div className="group relative p-2 rounded hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all cursor-pointer">
                <span className="text-amber-800 font-bold block mb-1 font-sans text-[11px] uppercase tracking-widest">1. INTESTAZIONE</span>
                <strong>Gentile Direttore,</strong>
                <div className="absolute left-full top-0 ml-4 w-48 p-2 bg-slate-800 text-white font-sans text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20">
                  Usa sempre "Gentile" o "Egregio" seguito dal titolo professionale della persona.
                </div>
              </div>

              <div className="group relative p-2 rounded hover:bg-sky-50 border border-transparent hover:border-sky-200 transition-all cursor-pointer">
                <span className="text-sky-800 font-bold block mb-1 font-sans text-[11px] uppercase tracking-widest">2. FORMULA DI APERTURA</span>
                <p>Le scrivo in merito al soggiorno trascorso presso la Sua struttura dal 1 al 8 giugno scorsi.</p>
                <div className="absolute left-full top-0 ml-4 w-48 p-2 bg-slate-800 text-white font-sans text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20">
                  Definisci lo scopo dello scritto fin dalla prima riga con una formula standard.
                </div>
              </div>

              <div className="group relative p-2 rounded hover:bg-purple-50 border border-transparent hover:border-purple-200 transition-all cursor-pointer">
                <span className="text-purple-800 font-bold block mb-1 font-sans text-[11px] uppercase tracking-widest">3. CORPO DEL TESTO</span>
                <p>Vorrei sottoporre alla Sua attenzione alcuni gravi inconvenienti. Nonostante avessi prenotato una camera superior, me ne è stata assegnata una di categoria inferiore, il che ha rovinato le nostre aspettative. Inoltre, il personale si è dimostrato poco comprensivo.</p>
                <div className="absolute left-full top-0 ml-4 w-48 p-2 bg-slate-800 text-white font-sans text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20">
                  Esponi i fatti usando la terza persona formale (Lei/Sua/Le) e connettivi avanzati.
                </div>
              </div>

              <div className="group relative p-2 rounded hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all cursor-pointer">
                <span className="text-emerald-800 font-bold block mb-1 font-sans text-[11px] uppercase tracking-widest">4. FORMULA DI CHIUSURA</span>
                <p>In attesa di un Suo cortese riscontro, Le porgo i miei più cordiali saluti.</p>
                <div className="absolute left-full top-0 ml-4 w-48 p-2 bg-slate-800 text-white font-sans text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20">
                  Richiedi un riscontro e chiudi con formule adeguate prima del saluto finale.
                </div>
              </div>

              <div className="group p-2 rounded border border-transparent">
                <span className="text-slate-400 font-bold block mb-1 font-sans text-[11px] uppercase tracking-widest">5. FIRMA</span>
                <p className="font-bold">Andres Lindner</p>
              </div>
            </div>
          </div>
        </section>

        {/* Copy-paste sections */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-800">Formule Utili da Copiare</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">Intestazioni e Apertura</span>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex justify-between items-center p-2 rounded bg-slate-50 hover:bg-indigo-50/50">
                  <span>Egregio Dottor [Cognome],</span>
                  <button onClick={() => copyToClipboard('Egregio Dottor [Cognome],')} className="text-slate-400 hover:text-indigo-600"><Copy size={16} /></button>
                </li>
                <li className="flex justify-between items-center p-2 rounded bg-slate-50 hover:bg-indigo-50/50">
                  <span>Spettabile Direzione,</span>
                  <button onClick={() => copyToClipboard('Spettabile Direzione,')} className="text-slate-400 hover:text-indigo-600"><Copy size={16} /></button>
                </li>
                <li className="flex justify-between items-center p-2 rounded bg-slate-50 hover:bg-indigo-50/50">
                  <span>Le scrivo in merito a...</span>
                  <button onClick={() => copyToClipboard('Le scrivo in merito a...')} className="text-slate-400 hover:text-indigo-600"><Copy size={16} /></button>
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">Richieste e Chiusura</span>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex justify-between items-center p-2 rounded bg-slate-50 hover:bg-indigo-50/50">
                  <span>Sarei molto grato se potesse...</span>
                  <button onClick={() => copyToClipboard('Sarei molto grato se potesse...')} className="text-slate-400 hover:text-indigo-600"><Copy size={16} /></button>
                </li>
                <li className="flex justify-between items-center p-2 rounded bg-slate-50 hover:bg-indigo-50/50">
                  <span>In attesa di un Suo cortese riscontro...</span>
                  <button onClick={() => copyToClipboard('In attesa di un Suo cortese riscontro, Le porgo cordiali saluti.')} className="text-slate-400 hover:text-indigo-600"><Copy size={16} /></button>
                </li>
                <li className="flex justify-between items-center p-2 rounded bg-slate-50 hover:bg-indigo-50/50">
                  <span>RingraziandoLa per la Sua disponibilità...</span>
                  <button onClick={() => copyToClipboard('RingraziandoLa per la Sua disponibilità, Le porgo distinti saluti.')} className="text-slate-400 hover:text-indigo-600"><Copy size={16} /></button>
                </li>
              </ul>
            </div>

          </div>
          {copiedText && (
            <div className="text-xs text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-lg text-center animate-pulse">
              Copiato negli appunti: "{copiedText}"
            </div>
          )}
        </section>
      </div>
    );
  };

  const renderParlato = () => {
    const activePrompt = prompts[selectedPrompt];
    const totalConnectorsCount = connectors.length;
    const usedConnectorsCount = Object.values(usedConnectors).filter(Boolean).length;
    const progressPercent = Math.round((usedConnectorsCount / 6) * 100); // target 6 connectors in monologue

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Prompt & Timer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <MessageSquare size={14} /> Traccia del Monologo B2
              </span>
              
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-slate-800">{activePrompt.title}</h4>
                <div className="flex gap-1">
                  {prompts.map((p, idx) => (
                    <button 
                      key={idx}
                      onClick={() => { setSelectedPrompt(idx); resetTimer(); }}
                      className={`w-3 h-3 rounded-full ${selectedPrompt === idx ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      title={p.title}
                    />
                  ))}
                </div>
              </div>
              
              <p className="bg-slate-50 p-4 rounded-xl text-slate-700 text-sm md:text-base leading-relaxed border border-slate-100">
                {activePrompt.text}
              </p>
            </div>

            {/* Timer card */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white p-6 rounded-2xl shadow-sm text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
              <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase block">Tempo Esposizione</span>
              <div className="text-5xl font-black font-mono tracking-wider">{formatTime(timeLeft)}</div>
              
              <div className="flex justify-center gap-3">
                {!isTimerRunning ? (
                  <button 
                    onClick={startTimer}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow transition-all flex items-center gap-2"
                  >
                    <Play size={16} /> Avvia
                  </button>
                ) : (
                  <button 
                    onClick={stopTimer}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow transition-all flex items-center gap-2"
                  >
                    <Square size={16} /> Ferma
                  </button>
                )}
                <button 
                  onClick={resetTimer}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
                  title="Resetta"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Speech-to-Text Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit font-sans">
                  <Mic size={14} className={isListening ? "animate-pulse text-red-500" : ""} /> Tracciamento Vocale (STT)
                </span>
                {isListening && (
                  <span className="flex items-center gap-1.5 text-xs text-red-500 font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    In ascolto...
                  </span>
                )}
              </div>
              
              {!speechSupported ? (
                <div className="p-3 bg-amber-50 text-amber-800 text-xs rounded-xl flex items-start gap-2 border border-amber-200">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    Il tuo browser non supporta il riconoscimento vocale. Consigliamo <strong>Chrome, Safari o Edge</strong>. Puoi comunque cliccare sui connettivi per segnarli manualmente.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-xs
                        ${isListening 
                          ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-100' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white ring-4 ring-indigo-100'}`}
                    >
                      {isListening ? (
                        <>
                          <MicOff size={16} /> Spegni Microfono
                        </>
                      ) : (
                        <>
                          <Mic size={16} /> Accendi Microfono
                        </>
                      )}
                    </button>
                    {transcript && (
                      <button
                        onClick={() => setTranscript('')}
                        className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all font-bold text-xs"
                      >
                        Cancella
                      </button>
                    )}
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 h-28 overflow-y-auto text-xs text-slate-700 leading-relaxed font-sans">
                    {transcript ? (
                      <span className="text-slate-800 font-medium">{transcript}</span>
                    ) : (
                      <span className="text-slate-400 italic">Clicca su "Accendi Microfono" o "Avvia" e parla. Rileveremo automaticamente i connettivi usati...</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Connector Cards Deck */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={20} /> Mazzo dei Connettivi
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Usa almeno 6 connettivi diversi per variare il discorso.</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-indigo-600">{usedConnectorsCount} / 6</span>
                  <div className="w-24 bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Connectors grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {connectors.map(conn => {
                  const isUsed = !!usedConnectors[conn.id];
                  return (
                    <button
                      key={conn.id}
                      onClick={() => toggleConnector(conn.id)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative group
                        ${isUsed 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm' 
                          : 'bg-slate-50 hover:bg-indigo-50/50 border-slate-200 text-slate-700 hover:scale-102 hover:shadow-xs'}`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-bold text-sm tracking-wide">{conn.word}</span>
                        {isUsed && <Check className="text-emerald-500" size={16} />}
                      </div>
                      <span className={`text-[9px] font-black uppercase mt-2 ${isUsed ? 'text-emerald-600/70' : 'text-slate-400'}`}>
                        {conn.category}
                      </span>

                      {/* Tooltip description */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 p-2 bg-slate-800 text-white font-sans text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-20 w-40 text-center shadow">
                        {conn.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {usedConnectorsCount >= 6 && (
                <div className="p-3 bg-emerald-100/50 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2 border border-emerald-200/50 animate-bounce">
                  <Check size={18} /> Ottimo lavoro! Hai inserito una ricca varietà di connettivi argomentativi.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 mb-2">Strategie Comunicative B2</h2>
        <p className="text-slate-600 text-lg">Tecniche, schede interattive e simulatori per eccellere nelle prove scritte e orali.</p>
      </header>

      {/* Tabs selectors */}
      <div className="flex bg-slate-200 p-1 rounded-xl mb-8 w-full max-w-md mx-auto md:mx-0">
        <button
          onClick={() => setActiveStrategyTab('scrittura')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all ${
            activeStrategyTab === 'scrittura' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <PenTool size={20} /> Prova Scritta (Email)
        </button>
        <button
          onClick={() => setActiveStrategyTab('parlato')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all ${
            activeStrategyTab === 'parlato' ? 'bg-white text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Headphones size={20} /> Prova Orale (Monologo)
        </button>
      </div>

      {activeStrategyTab === 'scrittura' ? renderScrittura() : renderParlato()}
    </div>
  );
}
