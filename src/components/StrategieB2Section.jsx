import React, { useState, useEffect, useRef } from 'react';
import { PenTool, Headphones, BookOpen, Clock, Play, Square, RotateCcw, Check, Copy, AlertCircle, Info, ChevronRight, MessageSquare, Sparkles, Mic, MicOff, Volume2 } from 'lucide-react';
import { speakItalian, cancelSpeech } from '../utils/speech';

export function StrategieB2Section() {
  const [activeStrategyTab, setActiveStrategyTab] = useState('scrittura'); // 'scrittura' or 'parlato'
  const [copiedText, setCopiedText] = useState('');

  // Speaking Simulator States
  const [showExample, setShowExample] = useState(false);
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
    { 
      title: "Smart Working", 
      text: "Esprimi la tua opinione sullo smart working in Italia. Quali sono i vantaggi per l'azienda e per il dipendente? Quali sono le criticità?",
      response: "Innanzitutto, ritengo che lo smart working sia una delle più grandi rivoluzioni nel mondo del lavoro moderno. In primo luogo, per il dipendente, i vantaggi sono innegabili: permette una migliore gestione del tempo e un notevole risparmio sui costi di trasporto. Inoltre, si riduce lo stress legato al pendolarismo. D'altronde, anche per l'azienda ci sono benefici, come la riduzione dei costi per il mantenimento degli uffici. Tuttavia, esistono delle criticità importanti. Lavorare da casa può portare all'isolamento sociale e rendere difficile separare la vita privata da quella professionale. Di conseguenza, il rischio di burnout potrebbe aumentare. In conclusione, a mio avviso, la soluzione ideale è un modello ibrido che combini la flessibilità del lavoro a distanza con i momenti di socialità in presenza.",
      explanation: "Ottima struttura logica (introduzione, vantaggi, svantaggi, conclusione). Uso efficace di numerosi connettivi: 'Innanzitutto', 'In primo luogo', 'Inoltre', 'D'altronde', 'Tuttavia', 'Di conseguenza'. Il lessico è preciso e pertinente al tema ('pendolarismo', 'modello ibrido', 'burnout')."
    },
    { 
      title: "Turismo Sostenibile", 
      text: "Parla dell'impatto ambientale del turismo di massa e spiega come promuovere un turismo più rispettoso dell'ambiente e delle comunità locali.",
      response: "Il turismo di massa ha, senza dubbio, un impatto devastante sull'ambiente. In primo luogo, l'eccessivo afflusso di visitatori porta al degrado del patrimonio culturale e all'aumento dell'inquinamento, specialmente nelle città d'arte. Inoltre, le comunità locali spesso subiscono un aumento insostenibile del costo della vita. Ciononostante, viaggiare rimane un'esperienza fondamentale. Pertanto, è essenziale promuovere un turismo sostenibile. A mio avviso, i viaggiatori dovrebbero scegliere destinazioni meno note o viaggiare in bassa stagione. Oltre a ciò, è importante supportare l'economia locale acquistando prodotti a chilometro zero e rispettando le tradizioni del posto. Tirando le somme, ritengo che con una maggiore consapevolezza individuale sia possibile viaggiare senza distruggere il nostro pianeta.",
      explanation: "L'esposizione affronta in modo bilanciato sia il problema che le possibili soluzioni. Dimostra una buona padronanza di connettivi concessivi e conclusivi ('Ciononostante', 'Pertanto', 'Oltre a ciò', 'Tirando le somme'). Il vocabolario è specifico ('afflusso', 'degrado', 'consapevolezza', 'chilometro zero')."
    },
    { 
      title: "Tecnologia e Social", 
      text: "I social network hanno cambiato il modo in cui ci relazioniamo. Spiega se a tuo avviso aumentano l'isolamento sociale o facilitano i contatti.",
      response: "Dal mio punto di vista, i social network rappresentano un'arma a doppio taglio per le relazioni umane. Innanzitutto, è innegabile che abbiano facilitato i contatti: ci permettono di mantenere i legami con persone lontane e di fare nuove conoscenze basate su interessi comuni. Inoltre, sono strumenti utilissimi per la diffusione di informazioni. Tuttavia, l'uso eccessivo può portare a un forte isolamento sociale. Molte persone tendono a sostituire le interazioni faccia a faccia con quelle virtuali. Eppure, il calore di una vera conversazione non può essere replicato attraverso uno schermo. Di conseguenza, si rischia di perdere l'empatia e la capacità di ascolto attivo. In conclusione, credo che la tecnologia non sia né buona né cattiva; tutto dipende dall'uso che ne facciamo. Pertanto, dovremmo imparare a usarla con moderazione.",
      explanation: "Il candidato presenta un'argomentazione equilibrata valutando i pro e i contro. Ottimo uso delle espressioni di opinione ('Dal mio punto di vista', 'credo che') e dei connettivi di contrasto ('Tuttavia', 'Eppure'). Uso di espressioni idiomatiche calzanti come 'arma a doppio taglio'."
    },
    { 
      title: "Cibo Biologico", 
      text: "L'alimentazione è fondamentale per la salute. Descrivi il trend del cibo biologico e discuti se, secondo te, è una reale necessità o solo una moda.",
      response: "Negli ultimi anni, il consumo di cibo biologico ha registrato un aumento significativo in Italia. In primo luogo, molte persone scelgono questi prodotti poiché sono coltivati senza l'uso di pesticidi chimici, risultando quindi più salutari e sicuri. Oltre a ciò, l'agricoltura biologica ha un impatto molto inferiore sull'ambiente, rispettando i cicli naturali del terreno. D'altronde, i detrattori sostengono che si tratti spesso di una semplice strategia di marketing per vendere prodotti a prezzi più elevati. Personalmente, ritengo che non sia solo una moda passeggera, ma una reale presa di coscienza verso uno stile di vita più sano. Eppure, bisogna ammettere che il costo elevato rende questi alimenti non accessibili a tutti. In conclusione, spero che in futuro il cibo biologico diventi più economico e alla portata di ogni famiglia.",
      explanation: "Risposta articolata che analizza le cause del fenomeno e presenta posizioni contrastanti prima di esprimere un'opinione personale. Utilizzo di connettivi causali e aggiuntivi ('poiché', 'Oltre a ciò', 'D'altronde', 'Eppure'). Vocabolario pertinente e accurato ('pesticidi chimici', 'detrattori', 'presa di coscienza')."
    },
    { 
      title: "Istruzione e Futuro", 
      text: "Discuti l'importanza del tirocinio e dello studio universitario. Pensi che il percorso educativo tradizionale prepari bene al mondo del lavoro?",
      response: "A mio avviso, l'istruzione universitaria in Italia offre una preparazione teorica eccellente, ma spesso risulta carente dal punto di vista pratico. Innanzitutto, lo studio sui libri fornisce le basi fondamentali e sviluppa il pensiero critico. Tuttavia, il mondo del lavoro odierno richiede competenze molto più specifiche e trasversali, le cosiddette 'soft skills'. Poiché l'università fatica a stare al passo con le rapide evoluzioni del mercato, i giovani si trovano spesso disorientati al termine degli studi. Pertanto, ritengo che il tirocinio sia uno strumento di vitale importanza. Oltre a ciò, permette agli studenti di mettere in pratica la teoria e di creare una rete di contatti professionali. Di conseguenza, le aziende dovrebbero collaborare più strettamente con le università. Tirando le somme, solo unendo una solida teoria a esperienze pratiche mirate potremo preparare adeguatamente le nuove generazioni.",
      explanation: "La risposta è convincente perché identifica chiaramente una problematica (la distanza tra teoria e pratica) e propone una soluzione (il tirocinio). Ottimo l'inserimento di termini legati al mondo del lavoro ('soft skills', 'rete di contatti', 'mercato'). Eccellente la coesione garantita da connettivi appropriati ('Tuttavia', 'Poiché', 'Pertanto', 'Di conseguenza')."
    },
    {
      title: "Clima e Ambiente",
      text: "Il riscaldamento globale è una delle sfide più grandi del nostro tempo. Quali azioni quotidiane possono fare la differenza?",
      response: "Il cambiamento climatico è, senza dubbio, l'emergenza più pressante della nostra epoca. In primo luogo, è fondamentale riconoscere che ognuno di noi ha una responsabilità diretta. Spesso pensiamo che spetti solo ai governi prendere decisioni, ma le azioni quotidiane dei singoli cittadini possono avere un impatto enorme. Innanzitutto, dovremmo ridurre il consumo di carne, poiché gli allevamenti intensivi sono una delle principali fonti di gas serra. Inoltre, possiamo privilegiare i mezzi pubblici, l'uso della bicicletta o il car sharing al posto dell'auto privata. Eppure, cambiare le proprie abitudini non è facile e richiede impegno costante. Ciononostante, è l'unica strada percorribile. Di conseguenza, è essenziale educare i più giovani al rispetto dell'ambiente fin dalla scuola. In conclusione, solo attraverso uno sforzo collettivo e quotidiano potremo sperare di arginare i danni al nostro pianeta.",
      explanation: "Il monologo è fluido e persuasivo. L'uso dei connettivi ('In primo luogo', 'Innanzitutto', 'Inoltre', 'Eppure', 'Ciononostante', 'Di conseguenza') crea una forte struttura argomentativa. Buona varietà lessicale ('emergenza pressante', 'gas serra', 'arginare i danni')."
    },
    {
      title: "Città vs. Campagna",
      text: "Sempre più persone decidono di abbandonare le metropoli per trasferirsi in piccoli centri o in campagna. Quali sono i pro e i contro?",
      response: "Negli ultimi anni, si è registrata una vera e propria fuga dalle grandi città verso le zone rurali. Dal mio punto di vista, questa scelta presenta numerosi benefici. Innanzitutto, vivere in campagna offre una qualità della vita superiore: l'aria è più pulita, i ritmi sono più lenti e c'è un contatto diretto con la natura, il che riduce notevolmente lo stress. Inoltre, il costo degli affitti e delle abitazioni è decisamente più basso. D'altronde, non mancano i lati negativi. I piccoli centri spesso mancano di servizi essenziali come ospedali attrezzati, scuole superiori e, soprattutto, opportunità di lavoro. Pertanto, chi sceglie di trasferirsi deve spesso affrontare lunghi spostamenti per recarsi in ufficio, a meno che non lavori in smart working. Tirando le somme, ritengo che la decisione dipenda dalle priorità di ciascuno: chi cerca tranquillità sceglierà la campagna, mentre chi preferisce stimoli culturali e comodità opterà per la città.",
      explanation: "Esposizione molto ben strutturata che bilancia perfettamente vantaggi e svantaggi. L'uso dei connettivi è puntuale ('Innanzitutto', 'Inoltre', 'D'altronde', 'Pertanto', 'Tirando le somme'). Ottima la conclusione che sintetizza il ragionamento offrendo una prospettiva neutra."
    },
    {
      title: "Valori dello Sport",
      text: "Oltre al benessere fisico, quali valori importanti può trasmettere la pratica di uno sport, soprattutto ai più giovani?",
      response: "Personalmente, considero lo sport uno strumento educativo di inestimabile valore, specialmente per i giovani. In primo luogo, la pratica sportiva insegna la disciplina e il rispetto delle regole, competenze essenziali non solo in campo, ma in ogni ambito della vita. Inoltre, gli sport di squadra favoriscono la socializzazione e insegnano l'importanza della collaborazione per raggiungere un obiettivo comune. D'altronde, lo sport insegna anche ad affrontare la sconfitta. Poiché non si può sempre vincere, i ragazzi imparano la resilienza e la capacità di rialzarsi dopo un fallimento. Tuttavia, è preoccupante notare come a volte la pressione agonistica da parte dei genitori o degli allenatori possa trasformare un'attività ludica in fonte di forte stress. Di conseguenza, il focus dovrebbe sempre rimanere sul divertimento e sulla crescita personale. In conclusione, se praticato in un ambiente sano, lo sport è una vera e propria 'palestra di vita'.",
      explanation: "L'esposizione tocca aspetti fisici, psicologici e sociali in modo molto chiaro. Fa un ottimo uso dei connettivi per collegare le diverse tesi ('In primo luogo', 'Inoltre', 'D'altronde', 'Poiché', 'Tuttavia', 'Di conseguenza'). Molto bella la metafora finale ('palestra di vita') che denota una buona padronanza della lingua."
    },
    {
      title: "Ruolo dei Nonni",
      text: "Nella società italiana moderna, i nonni hanno un ruolo fondamentale all'interno della famiglia. Esprimi la tua opinione a riguardo.",
      response: "A mio avviso, i nonni rappresentano una vera e propria istituzione all'interno della società e della famiglia italiana. Innanzitutto, in un contesto in cui entrambi i genitori lavorano a tempo pieno, i nonni si prendono spesso cura dei nipoti, svolgendo una funzione di supporto indispensabile. Oltre a ciò, fungono da ammortizzatore sociale ed economico per le famiglie in difficoltà. Eppure, il loro contributo non è meramente pratico. I nonni sono i custodi della memoria storica e delle tradizioni familiari, trasmettendo valori e affetto alle nuove generazioni. Ciononostante, ritengo che a volte si approfitti eccessivamente della loro disponibilità, dimenticando che anche loro hanno il diritto di godersi il riposo durante la terza età. Di conseguenza, le istituzioni dovrebbero fornire maggiori servizi per l'infanzia, come asili nido più accessibili. In conclusione, i nonni sono un tesoro inestimabile, ma non dovrebbero sostituirsi ai doveri dello Stato.",
      explanation: "La risposta affronta in profondità la tematica, non fermandosi solo agli aspetti affettivi ma analizzando anche il contesto socio-economico ('ammortizzatore sociale', 'doveri dello Stato'). Notevole l'utilizzo di connettivi avversativi e conclusivi ('Eppure', 'Ciononostante', 'Di conseguenza', 'In conclusione')."
    },
    {
      title: "Globalizzazione",
      text: "La globalizzazione sta portando a un'omogeneizzazione delle culture. Discuti se questo fenomeno rappresenta una minaccia per le tradizioni locali o un'opportunità di arricchimento.",
      response: "Il dibattito sulla globalizzazione e i suoi effetti sulle culture locali è estremamente attuale. In primo luogo, è innegabile che questo fenomeno abbia favorito la diffusione di idee, conoscenze e diritti, avvicinando popoli un tempo lontanissimi. Grazie a internet e ai viaggi, oggi abbiamo l'opportunità di arricchirci confrontandoci con stili di vita diversi. D'altronde, esiste un rischio concreto di omogeneizzazione culturale. Le grandi multinazionali impongono in tutto il mondo gli stessi prodotti, dagli abiti al cibo, minacciando le identità locali e le tradizioni secolari. Tuttavia, non credo che le tradizioni siano destinate a scomparire. Al contrario, stiamo assistendo a un rinnovato interesse per i prodotti tipici e per la riscoperta delle proprie radici in risposta all'omologazione. Pertanto, la globalizzazione non è una minaccia in sé. In conclusione, la sfida consiste nel trovare un equilibrio: accogliere le novità del mondo globale senza però perdere la nostra unicità culturale.",
      explanation: "Monologo molto sofisticato su un tema complesso. Il candidato struttura perfettamente il confronto tra vantaggi (arricchimento) e svantaggi (omologazione). Uso magistrale dei connettivi ('In primo luogo', 'D'altronde', 'Tuttavia', 'Pertanto', 'In conclusione'). Il lessico è elevato ('omogeneizzazione', 'secolari', 'omologazione', 'unicità')."
    }
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
      cancelSpeech();
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

  const playAudio = (text) => {
    speakItalian(text, null, 0.9);
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
                <div className="flex gap-1.5 flex-wrap justify-end max-w-[50%]">
                  {prompts.map((p, idx) => (
                    <button 
                      key={idx}
                      onClick={() => { 
                        setSelectedPrompt(idx); 
                        resetTimer(); 
                        setShowExample(false);
                        cancelSpeech();
                      }}
                      className={`w-3 h-3 rounded-full mb-1 transition-colors ${selectedPrompt === idx ? 'bg-indigo-600 scale-110' : 'bg-slate-200 hover:bg-slate-300'}`}
                      title={p.title}
                    />
                  ))}
                </div>
              </div>
              
              <p className="bg-slate-50 p-4 rounded-xl text-slate-700 text-sm md:text-base leading-relaxed border border-slate-100">
                {activePrompt.text}
              </p>

              {/* Example Response Accordion */}
              <div className="border border-indigo-100 rounded-xl overflow-hidden bg-white mt-4">
                <button 
                  onClick={() => setShowExample(prev => !prev)}
                  className="w-full bg-indigo-50/50 p-3.5 flex justify-between items-center hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-bold text-indigo-800 text-sm flex items-center gap-2">
                    <BookOpen size={16} /> Esempio di Risposta B2
                  </span>
                  <ChevronRight size={16} className={`text-indigo-600 transition-transform duration-200 ${showExample ? 'rotate-90' : ''}`} />
                </button>
                
                {showExample && (
                  <div className="p-4 space-y-4 animate-in slide-in-from-top-2 border-t border-indigo-50">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => playAudio(activePrompt.response)}
                        className="flex items-center gap-1.5 text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-200 transition-colors shadow-sm"
                      >
                        <Volume2 size={14} /> Ascolta Esempio
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm italic border-l-2 border-indigo-300 pl-3 leading-relaxed">
                      "{activePrompt.response}"
                    </p>
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 mt-4">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                        <Check size={14} /> Perché è una buona risposta?
                      </span>
                      <p className="text-emerald-700 text-xs leading-relaxed">
                        {activePrompt.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
