import React, { useState } from 'react';
import { BookOpen, GraduationCap, MessageCircle, ChevronRight, CheckCircle2, Award, Info, BookMarked, Globe, Lightbulb } from 'lucide-react';

const syllabusData = {
  modulo1: {
    title: "Modulo 1: Il Congiuntivo",
    subtitle: "Opinioni, sentimenti e concordanza del presente/passato",
    grammatica: {
      desc: "Il modo congiuntivo è essenziale per superare l'esame B2. Questo modulo consolida le desinenze regolari e irregolari e introduce l'attivazione sintattica.",
      points: [
        "Tempi Verbali: Congiuntivo Presente e Passato (formato con ausiliare essere/avere + participio passato).",
        "Attivatori Sintattici: Verbi di opinione (penso che, credo che), dubbio (dubito che), sentimento (sono felice che) e volontà (voglio che).",
        "Costruzioni Impersonali: 'Bisogna che', 'È necessario che', 'Sembra che' seguite dal congiuntivo.",
        "Concordanza dei Tempi: Rapporto di contemporaneità (congiuntivo presente) e anteriorità (congiuntivo passato) retto da un verbo principale al presente."
      ],
      tip: "Se il soggetto della frase principale e quello della subordinata coincidono, si deve usare l'infinito preceduto da 'di': 'Penso di avere ragione' (non: 'Penso che io abbia ragione')."
    },
    lessico: {
      desc: "Vocabolario focalizzato sulla scuola, il percorso formativo accademico e la descrizione della personalità.",
      points: [
        "Istituzione e Ricordi: La cattedra, la lavagna, il cancellino, il grembiule scolastico.",
        "Università e Lavoro: Il tirocinio (stage formativo), il percorso educativo, la laurea.",
        "Tratti Caratteriali (Scolastici): Il secchione (diligentissimo), il docente comprensivo, severo o imparziale."
      ],
      examples: [
        { term: "Il tirocinio", def: "Periodo di addestramento pratico svolto da un laureando o neolaureato." },
        { term: "Empatico", def: "Persona capace di immedesimarsi e comprendere profondamente gli stati d'animo altrui." }
      ]
    },
    funzioni: {
      desc: "Funzioni per la produzione orale e scritta formale.",
      points: [
        "Esprimere la propria opinione personale in modo argomentato durante un dibattito.",
        "Raccontare ricordi d'infanzia ed esperienze scolastiche passate usando l'imperfetto indicativo alternato al congiuntivo per le riflessioni personali.",
        "Esprimere desideri, timori e speranze sul proprio futuro formativo o professionale."
      ]
    }
  },
  modulo2: {
    title: "Modulo 2: Sintassi Avanzata",
    subtitle: "Condizionale e periodo ipotetico di 2° e 3° tipo",
    grammatica: {
      desc: "Espressione di ipotesi nel presente e nel passato. Il periodo ipotetico dell'irrealtà è un caposaldo del livello B2.",
      points: [
        "Tempi Verbali: Condizionale Presente e Passato (es. 'comprerei', 'avrei comprato').",
        "Periodo Ipotetico di 2° Tipo (Possibilità): Se + Congiuntivo Imperfetto -> Condizionale Presente ('Se studiassi, passeresti').",
        "Periodo Ipotetico di 3° Tipo (Irrealtà): Se + Congiuntivo Trapassato -> Condizionale Passato ('Se ieri avessi studiato, avrei superato l'esame').",
        "Strutture Miste: Collegare un'ipotesi passata a una conseguenza presente ('Se si fossero incontrati anni fa, oggi sarei qui')."
      ],
      tip: "Attenzione a non usare mai il condizionale dopo la congiunzione 'se' nel periodo ipotetico: 'Se avessi tempo' (non: 'Se avrei tempo')."
    },
    lessico: {
      desc: "Vocabolario associato alla gastronomia, all'arte culinaria e agli strumenti da cucina.",
      points: [
        "Utensili da Cucina: Lo scolapasta, il tagliere, la pentola, la padella, la bilancia di precisione.",
        "Verbi di Preparazione: Condire, friggere, cuocere al forno, infarinare, scolare.",
        "Abitudini Moderne: Il cibo biologico (coltivato senza chimica), l'essere 'filoetnico' (amante di cucine straniere)."
      ],
      examples: [
        { term: "Lo scolapasta", def: "Recipiente forato usato per eliminare l'acqua di cottura dalla pasta." },
        { term: "Puzza sotto al naso", def: "Locuzione colloquiale che indica un atteggiamento altezzoso o snob, tipico di chi giudica il cibo altrui." }
      ]
    },
    funzioni: {
      desc: "Interazione ed esposizione scritta/orale.",
      points: [
        "Formulare raccomandazioni ed ipotesi formali o informali.",
        "Esprimere rimpianti per occasioni perse nel passato utilizzando il condizionale passato ('Avrei dovuto accettare quel lavoro...').",
        "Spiegare ricette, tradizioni alimentari e abitudini culinarie della propria cultura a parlanti nativi."
      ]
    }
  },
  modulo3: {
    title: "Modulo 3: La Forma Passiva",
    subtitle: "Uso di essere, venire, andare e il si passivante",
    grammatica: {
      desc: "Le strutture passive sono usate per dare un tono formale, giornalistico e impersonale alla scrittura.",
      points: [
        "Passivo con ESSERE: Si usa in tutti i tempi verbali, indica sia l'azione che lo stato.",
        "Passivo con VENIRE: Utilizzato solo nei tempi semplici per sottolineare il dinamismo dell'azione ('Il palazzo viene restaurato').",
        "Passivo con ANDARE: Esprime un'idea di obbligo o necessità ('La legge va rispettata' = deve essere rispettata).",
        "Si Passivante: SI + Verbo attivo alla 3a persona (singolare o plurale) d'accordo con l'oggetto ('Si vendono appartamenti')."
      ],
      tip: "Nel passivo con 'venire', non si possono formare i tempi composti. Per quelli si ricorre obbligatoriamente a 'essere': 'La casa è stata costruita' (non: 'La casa è venuta stata costruita')."
    },
    lessico: {
      desc: "Terminologia dei mezzi di comunicazione di massa, giornalismo e televisione.",
      points: [
        "Format Televisivi: La fiction (serie TV sceneggiata), il documentario scientifico o storico.",
        "Canali di Informazione: I mass media, la televisione, i giornali, la rete internet.",
        "Azioni Giornalistiche: Riferire una notizia d'attualità, commentare una statistica, inquadrare storicamente un evento."
      ],
      examples: [
        { term: "La fiction", def: "Genere di programmi televisivi di intrattenimento basati su sceneggiature di fantasia." },
        { term: "La fonte", def: "L'origine documentaria o la persona da cui proviene un'informazione giornalistica." }
      ]
    },
    funzioni: {
      desc: "Capacità espositive di livello B2.",
      points: [
        "Riassumere notizie lette o ascoltate mantenendo un registro oggettivo.",
        "Analizzare e commentare grafici o dati statistici durante una presentazione orale.",
        "Scrivere relazioni formali o articoli di giornale simulando lo stile accademico."
      ]
    }
  },
  modulo4: {
    title: "Modulo 4: Pragmatica e Registro",
    subtitle: "Il discorso indiretto nel passato e l'imperativo formale",
    grammatica: {
      desc: "Saper riferire messaggi altrui adattando i tempi verbali e utilizzare l'imperativo di cortesia nelle interazioni d'esame.",
      points: [
        "Discorso Indiretto (Reggente al Passato): Trasposizione dei tempi verbali (il presente diventa imperfetto, il passato prossimo diventa trapassato prossimo, il futuro diventa condizionale passato).",
        "Imperativo Diretto: Usato con tu, noi, voi per dare istruzioni o ordini immediati.",
        "Imperativo Indiretto (Cortesia): Coniugazione basata sul congiuntivo presente di 3a persona singolare ('Lei').",
        "Imperativo Negativo: Si forma con 'non' + infinito per la 2a persona singolare ('Non fumare!'), e 'non' + imperfetto/congiuntivo per gli altri."
      ],
      tip: "Nel discorso indiretto, il futuro nella reggente al passato si trasforma sempre in condizionale passato: 'Ha detto che sarebbe arrivato tardi' (non: 'che arriverà tardi')."
    },
    lessico: {
      desc: "Lessico relativo all'ambiente lavorativo, alla ricerca d'impiego e alle professioni.",
      points: [
        "Tipologie Contrattuali: Contratto a tempo indeterminato (stabile), contratto a tempo determinato (con scadenza).",
        "Ricerca Lavoro: Il colloquio di lavoro, lo stipendio mensile, il tirocinante.",
        "Professioni Comuni: L'assistente agli anziani, l'elettricista, il contadino, il datore di lavoro."
      ],
      examples: [
        { term: "Tempo indeterminato", def: "Rapporto di lavoro subordinato privo di una scadenza temporale prefissata." },
        { term: "Il colloquio", def: "Fase di selezione in cui il candidato sostiene un'intervista con il datore di lavoro." }
      ]
    },
    funzioni: {
      desc: "Applicazioni comunicative reali B2.",
      points: [
        "Sostenere un colloquio di lavoro formale rispondendo a domande su esperienze e competenze.",
        "Riportare in modo fedele ciò che è stato detto da un collega o da un cliente durante una riunione.",
        "Fornire istruzioni chiare e comandi cortesi a collaboratori o clienti usando il registro formale."
      ]
    }
  },
  modulo5: {
    title: "Modulo 5: Pronomi e Particelle",
    subtitle: "Pronomi combinati, usi avanzati di 'ci' e 'ne'",
    grammatica: {
      desc: "La corretta combinazione e fluidità nell'uso delle particelle pronominali è sinonimo di padronanza della lingua italiana.",
      points: [
        "Pronomi Combinati: L'unione di pronomi indiretti/riflessivi (mi, ti, si, ci, vi) con pronomi diretti (lo, la, li, le) o la particella 'ne' (mi + lo = me lo).",
        "Posizione: Precedono sempre il verbo coniugato e si attaccano all'infinito o gerundio.",
        "La particella 'CI': Usata come locativo (stato in luogo / moto a luogo) o strumentale (con ciò, a ciò).",
        "La particella 'NE': Usata come partitivo (quantità) o di argomento (di questo, di ciò)."
      ],
      tip: "Quando si usa un pronome combinato con l'ausiliare avere, il participio passato deve sempre concordare in genere e numero con il pronome oggetto diretto: 'Il libro? Me lo ha regalat**o**' / 'Le mele? Te le ho comprat**e**'."
    },
    lessico: {
      desc: "Aggettivi qualificativi per descrivere i tratti positivi e negativi della personalità.",
      points: [
        "Contrasti Comportamentali: Empatico / Freddo, Severo / Comprensivo, Diligente / Disinteressato.",
        "Qualità Morali: Imparziale / Ingiusto, Onesto / Disonesto, Sensibile / Insensibile.",
        "Stati Mentali: Attento / Disattento, Razionale / Irrazionale, Paziente / Impaziente."
      ],
      examples: [
        { term: "Diligente", def: "Persona costante, scrupolosa e impegnata nello studio o nello svolgimento dei propri doveri." },
        { term: "Imparziale", def: "Chi giudica o agisce in modo equo e neutrale, senza fare favoritismi o preferenze personali." }
      ]
    },
    funzioni: {
      desc: "Efficacia della comunicazione parlata.",
      points: [
        "Descrivere dettagliatamente il carattere, i pregi e i difetti di un amico o collega.",
        "Evitare ripetizioni tediose nella conversazione riassumendo complementi oggetto e indiretti con pronomi integrati.",
        "Argomentare sulle relazioni umane ed esprimere simpatia o antipatia motivando le proprie reazioni emotive."
      ]
    }
  },
  modulo6: {
    title: "Modulo 6: Preposizioni e Reggenze",
    subtitle: "Uso corretto delle preposizioni e delle reggenze verbali",
    grammatica: {
      desc: "Questo modulo allena lo studente a evitare gli errori tipici di interferenza linguistica legati alla scelta della preposizione.",
      points: [
        "Preposizioni Semplici e Articolate: Regole di formazione e scelta in base al sostantivo.",
        "Reggenze Verbali: Verbi seguiti da infinito con 'a' (es. cominciare a, abituarsi a, riuscire a).",
        "Reggenze con 'di': Verbi seguiti da infinito con 'di' (es. decidere di, finire di, sperare di, temere di).",
        "Reggenze con altre preposizioni: Verbi con 'su' (contare su) o 'per' (ringraziare per)."
      ],
      tip: "Il verbo 'pensare' regge la preposizione 'di' se seguito da infinito ('Penso di partire'), ma regge 'a' se seguito da sostantivo ('Penso a mia madre')."
    },
    lessico: {
      desc: "Terminologia legata all'arte, alla pittura, alla scultura e alla tutela del patrimonio artistico.",
      points: [
        "Creazione Artistica: L'opera d'arte, la scultura tridimensionale, il dipinto a olio, il capolavoro.",
        "Luoghi ed Eventi: La mostra temporanea, l'esposizione d'arte, la pinacoteca.",
        "Conservazione: Il restauro conservativo, il mecenate (finanziatore di artisti)."
      ],
      examples: [
        { term: "Il mecenate", def: "Persona o ente che sostiene economicamente gli artisti e favorisce lo sviluppo delle arti." },
        { term: "La pinacoteca", def: "Galleria d'arte o museo specifico adibito all'esposizione e conservazione di soli quadri e dipinti." }
      ]
    },
    funzioni: {
      desc: "Capacità descrittive avanzate.",
      points: [
        "Descrivere e commentare un quadro o un monumento storico evidenziandone lo stile e l'impatto visivo.",
        "Raccontare visite a musei o città d'arte formulando frasi sintatticamente corrette con le giuste reggenze preposizionali.",
        "Scrivere una biografia di un artista o personaggio celebre strutturando i dettagli cronologici."
      ]
    }
  },
  modulo7: {
    title: "Modulo 7: Connettivi Logici",
    subtitle: "Connettivi coordinanti e subordinanti per argomentare",
    grammatica: {
      desc: "I connettivi sono le fondamenta della coesione testuale per superare le prove scritte e orali del B2.",
      points: [
        "Connettivi Concessivi (+ congiuntivo): Sebbene, nonostante, malgrado, benché.",
        "Connettivi Condizionali (+ congiuntivo): Purché, a patto che, a condizione che.",
        "Connettivi Esclusivi (+ congiuntivo/indicativo): A meno che non (+ congiuntivo), senza che (+ congiuntivo).",
        "Connettivi Avversativi e Causali (+ indicativo): Tuttavia, ciononostante, eppure, pertanto, di conseguenza."
      ],
      tip: "Il connettivo 'sebbene' richiede obbligatoriamente il congiuntivo, mentre 'tuttavia' richiede l'indicativo: 'Sebbene sia tardi, studio' / 'È tardi, tuttavia continuo a studiare'."
    },
    lessico: {
      desc: "Vocabolario dell'ecologia, della tutela ambientale e dello sviluppo sostenibile.",
      points: [
        "Sfide Ecologiche: Il riscaldamento globale, l'impatto ambientale, lo smaltimento dei rifiuti tossici.",
        "Soluzioni Ecologiche: Lo sviluppo sostenibile, la raccolta differenziata, la mobilità sostenibile.",
        "Fonti di Energia: Le energie rinnovabili (energia solare, eolica, idroelettrica)."
      ],
      examples: [
        { term: "La raccolta differenziata", def: "Sistema di smaltimento dei rifiuti domestici suddivisi per tipo (plastica, vetro, carta, organico)." },
        { term: "La mobilità sostenibile", def: "Insieme di modalità di spostamento a basso impatto ambientale come le bici, il car sharing e i mezzi pubblici." }
      ]
    },
    funzioni: {
      desc: "Abilità di argomentazione d'esame.",
      points: [
        "Sviluppare un saggio argomentativo (120-180 parole) strutturando i paragrafi e legando le idee con i connettivi idonei.",
        "Presentare un monologo orale sostenendo una tesi con logica, confutando le possibili obiezioni.",
        "Esprimere concessioni ed eccezioni in modo formale e diplomatico."
      ]
    }
  },
  modulo8: {
    title: "Modulo 8: Comprensione del Testo",
    subtitle: "Skimming, scanning e analisi strutturale di testi B2",
    grammatica: {
      desc: "Tecniche avanzate di lettura e decodifica di articoli giornalistici o testi letterari della prova scritta CILS/CELI.",
      points: [
        "Lettura Orientativa (Skimming): Cogliere rapidamente l'idea centrale del testo.",
        "Lettura Selettiva (Scanning): Trovare specifiche informazioni o parole chiave all'interno del brano.",
        "Ricostruzione Strutturale: Abilità di riordinare paragrafi o frasi sconnesse rispettando la coerenza logica e temporale dei connettivi.",
        "Inferenza Contestuale: Capire il significato di parole complesse B2 deducendole dal contesto."
      ],
      tip: "Nelle prove di ricostruzione del testo, osserva sempre i pronomi e i connettivi all'inizio delle frasi spezzate: ti indicheranno qual è il legame con la frase precedente."
    },
    lessico: {
      desc: "Cultura, tradizioni popolari, feste regionali e mutamenti della società italiana contemporanea.",
      points: [
        "Società e Famiglia: Evoluzione dei ruoli familiari, natalità, invecchiamento della popolazione.",
        "Feste e Tradizioni: Il Carnevale, le sagre paesane, le festività religiose e il folklore locale.",
        "Cultura Popolare: Modi di dire legati al calendario o alle tradizioni agricole."
      ],
      examples: [
        { term: "Sagra", def: "Festa popolare di carattere locale legata alla celebrazione di prodotti gastronomici tipici." },
        { term: "Folklore", def: "Insieme di tradizioni, leggende, canti e usanze popolari di una determinata area o regione." }
      ]
    },
    funzioni: {
      desc: "Abilità analitiche di livello B2.",
      points: [
        "Comprendere a fondo articoli di giornale complessi su temi sociali o storici.",
        "Identificare l'opinione o la posizione dell'autore all'interno di un testo editoriale.",
        "Individuare e interpretare informazioni implicite e metafore comuni nella stampa."
      ]
    }
  },
  modulo9: {
    title: "Modulo 9: Comprensione Orale",
    subtitle: "Strategie di ascolto, toni e registri colloquiali",
    grammatica: {
      desc: "Ascolto attivo e decodifica di conversazioni reali, interviste radiofoniche e annunci pubblici.",
      points: [
        "Registri Linguistici: Riconoscere la differenza tra il parlato formale accademico e quello informale colloquiale.",
        "Identificazione di Dettagli: Rispondere a quesiti a scelta multipla basati su dialoghi a velocità normale.",
        "Espressioni Rinforzanti: Uso dell'avverbio 'mica' per rafforzare la negazione in contesti orali ('Non è mica facile!').",
        "Elisioni e Clitici: Capire le catene foniche del parlato nativo veloce (es. 'se n'è andato' pronunciato come un'unica parola)."
      ],
      tip: "All'esame di ascolto, usa il primo ascolto per comprendere il tema generale e annotare parole chiave, e il secondo ascolto per verificare e confermare i dettagli precisi delle risposte."
    },
    lessico: {
      desc: "Espressioni idiomatiche verbali e locuzioni colloquiali tipiche della quotidianità italiana.",
      points: [
        "Verbi Pronominali Comuni: Cavarsela (riuscire), prendersela (offendersi), sbrigarsela (risolvere).",
        "Modi di Dire: Darci giù (esagerare), arrampicarsi sugli specchi (trovare scuse deboli).",
        "Connettivi del Parlato: 'A dirla tutta' (sinceramente), 'in fondo' (dopotutto), 'mica' (affatto)."
      ],
      examples: [
        { term: "Mica", def: "Avverbio colloquiale che rafforza una negazione o esprime sorpresa (es. 'Mica male!' = Niente male, molto bello)." },
        { term: "Cavarsela", def: "Uscire dignitosamente da una situazione problematica o d'esame." }
      ]
    },
    funzioni: {
      desc: "Competenze di interazione orale.",
      points: [
        "Comprendere messaggi orali articolati e annunci registrati in contesti rumorosi (stazioni, aeroporti).",
        "Cogliere le sfumature ironiche o gli stati d'animo dei parlanti tramite il tono di voce.",
        "Seguire discussioni di gruppo su argomenti complessi d'attualità partecipandovi in modo pertinente."
      ]
    }
  },
  modulo10: {
    title: "Modulo 10: Produzione Scritta",
    subtitle: "Email formale, saggio breve e coerenza testuale",
    grammatica: {
      desc: "Regole sintattiche e strutturali per superare a pieni voti le due prove scritte d'esame.",
      points: [
        "La Lettera Formale: Struttura rigida composta da Intestazione, Scopo dello scritto, Corpo, Chiusura e Firma.",
        "Uso della 3a Persona: Impiego corretto dei pronomi di cortesia (Lei, Suo, Le, La) con iniziale maiuscola.",
        "Coerenza nei Paragrafi: Suddivisione ordinata del testo in blocchi logici distinti.",
        "Connettivi Argomentativi: Uso di connettivi formali per legare le frasi (es. 'in riferimento a', 'pertanto', 'ciononostante')."
      ],
      tip: "Nelle email formali, non usare mai abbreviazioni gergali o formule informali come 'ciao' o 'un abbraccio'. Mantieni sempre la formula 'Cordiali saluti'."
    },
    lessico: {
      desc: "Formule fisse e terminologia burocratica per la corrispondenza formale.",
      points: [
        "Apertura Burocratica: 'Spettabile Ditta', 'Gentile Dottor [Cognome]', 'Egregio Direttore'.",
        "Corpo Formale: 'Sottoporre alla Sua attenzione', 'In riferimento alla Sua richiesta del'.",
        "Formule di Chiusura: 'In attesa di un Suo cortese riscontro, Le porgo i miei più cordiali saluti'."
      ],
      examples: [
        { term: "Spettabile", def: "Aggettivo di cortesia obbligatorio per rivolgersi formalmente ad aziende, uffici o enti collettivi." },
        { term: "Cortese riscontro", def: "Formula elegante per richiedere una risposta scritta a una lettera ufficiale." }
      ]
    },
    funzioni: {
      desc: "Abilità di scrittura attiva B2.",
      points: [
        "Scrivere un'email formale di reclamo o di richiesta informazioni a un'istituzione rispettando il registro di cortesia.",
        "Redigere un saggio breve argomentativo (120-180 parole) esprimendo opinioni personali pro e contro su temi di attualità.",
        "Rispettare i limiti di parole richiesti dall'esame strutturando il discorso con efficacia sintattica."
      ]
    }
  },
  modulo11: {
    title: "Modulo 11: Sintassi Avanzata",
    subtitle: "Uso sintattico dei modi indefiniti e dei relativi doppi",
    grammatica: {
      desc: "Coniugazione dei verbi all'infinito, gerundio e participio con integrazione di pronomi suffixati (enclisi).",
      points: [
        "Il Gerundio Sintattico: Gerundio presente e passato per esprimere causa ('Sapendo...'), tempo ('Uscendo...'), concessione ('Pur essendo...') o ipotesi ('Studiando...').",
        "Infinito Sostantivato: Trasformazione di un verbo in sostantivo tramite l'articolo ('L'essere puntuali', 'Il dipingere').",
        "Posizione dei Clitici (Enclisi): I pronomi si attaccano sempre alla fine delle forme non finite ('guardandolo', 'avergli parlato', 'salutandoli').",
        "Pronomi Relativi Doppi o Misti: Riconoscimento e uso di 'chi' (= colui che / colei che) e 'ciò che' / 'quello che' (= la cosa che)."
      ],
      tip: "Ricorda che il pronome doppio 'chi' richiede sempre il verbo alla terza persona singolare ed è riferito solo a persone: 'Chi vuole superare l'esame deve studiare'."
    },
    lessico: {
      desc: "Vocabolario sull'innovazione tecnologica, mobilità urbana e dinamiche sociali moderne.",
      points: [
        "Tecnologia e Futuro: Le macchine autonome, il lavoro agile, l'innovazione digitale.",
        "Città e Società: La mobilità integrata, l'inquinamento acustico, la società multiculturale.",
        "Beni di Consumo: Lo scolapasta adatto, la spesa ecologica, la bilancia intelligente."
      ],
      examples: [
        { term: "Macchine autonome", def: "Veicoli capaci di guidarsi da soli senza l'intervento attivo del conducente umano." },
        { term: "Società multiculturale", def: "Comunità caratterizzata dalla coesistenza pacifica e integrazione di culture e nazionalità diverse." }
      ]
    },
    funzioni: {
      desc: "Fluidità e ricchezza espressiva.",
      points: [
        "Sostituire intere frasi secondarie con costrutti al gerundio per rendere il discorso molto più snello ed elegante.",
        "Esprimere concetti complessi e generalizzazioni astratte usando l'infinito sostantivato.",
        "Descrivere bisogni o preferenze tecnologiche personali ed argomentare sul progresso sociale."
      ]
    }
  },
  modulo12: {
    title: "Modulo 12: Grammatica Integrativa",
    subtitle: "Ausiliari complessi, verbi pronominali ed accordi speciali",
    grammatica: {
      desc: "Perfezionamento finale delle eccezioni sintattiche e grammaticali del livello B2.",
      points: [
        "Doppio Ausiliare B2: Scelta tra essere e avere per verbi di moto/cambiamento (es. cambiare, finire, salire, scendere, cominciare) in base all'uso transitivo o intransitivo.",
        "Verbi Pronominali Complessi: Coniugazione attiva di verbi idiomatici come cavarsela, sbrigarsela, andarsene, prendersela.",
        "Aggettivi e Pronomi Indefiniti: Uso corretto di qualche (sempre singolare), chiunque, qualsiasi, qualunque, nessuno, ciascuno.",
        "Si Impersonale Avanzato: Regola speciale di accordo al plurale maschile dell'aggettivo che segue la costruzione 'si è' o 'si diventa' (es. 'Quando si è stanchi...')."
      ],
      tip: "Nelle frasi con 'si è' + aggettivo, l'accordo al plurale maschile è obbligatorio: 'Quando si è giovani si fanno molti progetti' (non: 'Quando si è giovane')."
    },
    lessico: {
      desc: "Glossario integrativo sulla mobilità ecologica, contratti di lavoro e termini universitari avanzati.",
      points: [
        "Lavoro e Stabilità: Il contratto a tempo indeterminato, la sicurezza salariale, lo stage aziendale.",
        "Sostenibilità Pratica: La mobilità ecologica, l'impatto dei trasporti pubblici, la riduzione delle emissioni.",
        "Burocrazia: Esibire il pass di accesso, presentare il CV, firmare la transazione o il mutuo."
      ],
      examples: [
        { term: "Accordo al passato", def: "La concordanza del participio con l'oggetto diretto preceduto da pronomi diretti (es. 'Le ho cambiate')." },
        { term: "Burocrazia", def: "Insieme di norme e procedure amministrative formali tipiche di uffici pubblici." }
      ]
    },
    funzioni: {
      desc: "Padronanza finale della comunicazione B2.",
      points: [
        "Gestire in modo naturale la sintassi del parlato quotidiano includendo verbi pronominali ed espressioni idiomatiche.",
        "Compilare e comprendere la modulistica burocratica italiana (contratti, pass, mutui).",
        "Risolvere incomprensioni e argomentare con fermezza durante interazioni di gioco di ruolo d'esame."
      ]
    }
  }
};

export function SyllabusModuliB2Section() {
  const [selectedModule, setSelectedModule] = useState('modulo1');
  const [activeSubTab, setActiveSubTab] = useState('grammatica'); // 'grammatica', 'lessico', 'funzioni'

  const currentModuleData = syllabusData[selectedModule];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="mb-6">
        <h2 className="text-4xl font-black text-indigo-950 mb-2 flex items-center gap-3">
          <BookMarked className="text-indigo-600" size={36} /> Syllabus Moduli B2
        </h2>
        <p className="text-slate-600 text-lg">
          La mappa completa delle competenze del manuale <em>Nuovo Espresso 4 (B2)</em>. Esplora la grammatica, il lessico e le funzioni comunicative di ciascun modulo.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Module Selector List */}
        <div className="lg:col-span-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-2 max-h-[600px] overflow-y-auto">
          <h3 className="text-xs font-black uppercase text-slate-400 px-3 py-2 tracking-wider">I 12 Moduli del Corso</h3>
          <div className="space-y-1">
            {Object.keys(syllabusData).map((modKey) => {
              const mod = syllabusData[modKey];
              const isSelected = selectedModule === modKey;
              return (
                <button
                  key={modKey}
                  onClick={() => {
                    setSelectedModule(modKey);
                    setActiveSubTab('grammatica'); // Reset subtab when changing module
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between border
                    ${isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-md shadow-indigo-100' 
                      : 'bg-white border-transparent text-slate-700 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className={`text-[10px] uppercase font-black tracking-wider ${isSelected ? 'text-indigo-200' : 'text-indigo-500'}`}>
                      {modKey === 'modulo12' ? 'Extra' : `Modulo ${modKey.replace('modulo', '')}`}
                    </span>
                    <span className="truncate font-semibold text-sm mt-0.5">{mod.title.split(': ')[1]}</span>
                  </div>
                  <ChevronRight size={16} className={isSelected ? 'text-indigo-200' : 'text-slate-400'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Tabbed Content Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
            {/* Main Header inside Card */}
            <div className="border-b border-slate-100 pb-6 mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Syllabus Dettagliato
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 mt-3">{currentModuleData.title}</h3>
              <p className="text-slate-500 text-sm md:text-base mt-1.5 font-medium">{currentModuleData.subtitle}</p>
            </div>

            {/* Sub-Tab Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                onClick={() => setActiveSubTab('grammatica')}
                className={`flex-1 py-3 px-3 text-xs md:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all
                  ${activeSubTab === 'grammatica' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <BookOpen size={16} /> Grammatica
              </button>
              <button
                onClick={() => setActiveSubTab('lessico')}
                className={`flex-1 py-3 px-3 text-xs md:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all
                  ${activeSubTab === 'lessico' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <GraduationCap size={16} /> Lessico
              </button>
              <button
                onClick={() => setActiveSubTab('funzioni')}
                className={`flex-1 py-3 px-3 text-xs md:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all
                  ${activeSubTab === 'funzioni' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <MessageCircle size={16} /> Funzioni Orale/Scritto
              </button>
            </div>

            {/* Tab Body */}
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* TAB 1: GRAMMATICA */}
              {activeSubTab === 'grammatica' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                      {currentModuleData.grammatica.desc}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Regole e Strutture Chiave</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {currentModuleData.grammatica.points.map((pt, idx) => (
                        <div key={idx} className="flex gap-3 items-start p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm md:text-base leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {currentModuleData.grammatica.tip && (
                    <div className="flex gap-3 bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-900 text-sm">
                      <Lightbulb className="flex-shrink-0 mt-0.5 text-amber-600" size={18} />
                      <div>
                        <strong className="font-bold">Consiglio d'Esame:</strong> {currentModuleData.grammatica.tip}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: LESSICO TEMATICO */}
              {activeSubTab === 'lessico' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                      {currentModuleData.lessico.desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Campi Semantici</h4>
                    <ul className="space-y-2 pl-4">
                      {currentModuleData.lessico.points.map((pt, idx) => (
                        <li key={idx} className="list-disc text-slate-700 text-sm md:text-base leading-relaxed">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Vocaboli B2 Fondamentali</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentModuleData.lessico.examples.map((ex, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                          <strong className="text-indigo-800 font-bold text-base block">{ex.term}</strong>
                          <span className="text-slate-600 text-xs md:text-sm mt-1 block leading-relaxed">{ex.def}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FUNZIONI COMUNICATIVE */}
              {activeSubTab === 'funzioni' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                      {currentModuleData.funzioni.desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Cosa saprai fare all'esame</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {currentModuleData.funzioni.points.map((pt, idx) => (
                        <div key={idx} className="flex gap-3 items-start p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                          <Award size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-900 text-sm">
                    <Globe className="flex-shrink-0 mt-0.5 text-blue-600" size={18} />
                    <div>
                      Questo modulo allinea la tua produzione scritta e parlata agli standard del QCER per il livello di competenza indipendente B2.
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
