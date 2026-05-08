import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, AlertCircle, ScrollText, List, ChevronDown, ChevronUp, Info, Volume2, Gamepad2, Check, X, RefreshCw, Clock, Sun, History, Archive, Rocket, Lightbulb, Sparkles, LayoutDashboard, Brain, Layers, Milestone, Mic, Square } from 'lucide-react';

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
  },
  {
    infinitive: "fare",
    translation: "to do/make",
    presente: ["faccio", "fai", "fa", "facciamo", "fate", "fanno"],
    imperfetto: ["facevo", "facevi", "faceva", "facevamo", "facevate", "facevano"],
    passatoRemoto: ["feci", "facesti", "fece", "facemmo", "faceste", "fecero"],
    imperativo: ["-", "fai / fa'", "faccia", "facciamo", "fate", "facciano"],
    passatoProssimo: ["ho fatto", "hai fatto", "ha fatto", "abbiamo fatto", "avete fatto", "hanno fatto"],
    typePres: "Irregolare",
    typeImperf: "Irregolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "dire",
    translation: "to say/tell",
    presente: ["dico", "dici", "dice", "diciamo", "dite", "dicono"],
    imperfetto: ["dicevo", "dicevi", "diceva", "dicevamo", "dicevate", "dicevano"],
    passatoRemoto: ["dissi", "dicesti", "disse", "dicemmo", "diceste", "dissero"],
    imperativo: ["-", "di'", "dica", "diciamo", "dite", "dicano"],
    passatoProssimo: ["ho detto", "hai detto", "ha detto", "abbiamo detto", "avete detto", "hanno detto"],
    typePres: "Irregolare",
    typeImperf: "Irregolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "potere",
    translation: "to be able/can",
    presente: ["posso", "puoi", "può", "possiamo", "potete", "possono"],
    imperfetto: ["potevo", "potevi", "poteva", "potevamo", "potevate", "potevano"],
    passatoRemoto: ["potei / potetti", "potesti", "poté / potette", "potemmo", "poteste", "poterono / potettero"],
    imperativo: ["N/A", "Non ha imperativo", "", "", "", ""],
    passatoProssimo: ["ho potuto", "hai potuto", "ha potuto", "abbiamo potuto", "avete potuto", "hanno potuto"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "N/A",
    typePP: "Regolare"
  },
  {
    infinitive: "volere",
    translation: "to want",
    presente: ["voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"],
    imperfetto: ["volevo", "volevi", "voleva", "volevamo", "volevate", "volevano"],
    passatoRemoto: ["volli", "volesti", "volle", "volemmo", "voleste", "vollero"],
    imperativo: ["-", "vogli", "voglia", "vogliamo", "vogliate", "vogliano"],
    passatoProssimo: ["ho voluto", "hai voluto", "ha voluto", "abbiamo voluto", "avete voluto", "hanno voluto"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "sapere",
    translation: "to know",
    presente: ["so", "sai", "sa", "sappiamo", "sapete", "sanno"],
    imperfetto: ["sapevo", "sapevi", "sapeva", "sapevamo", "sapevate", "sapevano"],
    passatoRemoto: ["seppi", "sapesti", "seppe", "sapemmo", "sapeste", "seppero"],
    imperativo: ["-", "sappi", "sappia", "sappiamo", "sappiate", "sappiano"],
    passatoProssimo: ["ho saputo", "hai saputo", "ha saputo", "abbiamo saputo", "avete saputo", "hanno saputo"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "stare",
    translation: "to stay/be",
    presente: ["sto", "stai", "sta", "stiamo", "state", "stanno"],
    imperfetto: ["stavo", "stavi", "stava", "stavamo", "stavate", "stavano"],
    passatoRemoto: ["stetti", "stesti", "stette", "stemmo", "steste", "stettero"],
    imperativo: ["-", "stai / sta'", "stia", "stiamo", "state", "stiano"],
    passatoProssimo: ["sono stato/a", "sei stato/a", "è stato/a", "siamo stati/e", "siete stati/e", "sono stati/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "dovere",
    translation: "to have to/must",
    presente: ["devo", "devi", "deve", "dobbiamo", "dovete", "devono"],
    imperfetto: ["dovevo", "dovevi", "doveva", "dovevamo", "dovevate", "dovevano"],
    passatoRemoto: ["dovei / dovetti", "dovesti", "dové / dovette", "dovemmo", "doveste", "doverono / dovettero"],
    imperativo: ["N/A", "Non ha imperativo", "", "", "", ""],
    passatoProssimo: ["ho dovuto", "hai dovuto", "ha dovuto", "abbiamo dovuto", "avete dovuto", "hanno dovuto"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "N/A",
    typePP: "Regolare"
  },
  {
    infinitive: "vedere",
    translation: "to see",
    presente: ["vedo", "vedi", "vede", "vediamo", "vedete", "vedono"],
    imperfetto: ["vedevo", "vedevi", "vedeva", "vedevamo", "vedevate", "vedevano"],
    passatoRemoto: ["vidi", "vedesti", "vide", "vedemmo", "vedeste", "videro"],
    imperativo: ["-", "vedi", "veda", "vediamo", "vedete", "vedano"],
    passatoProssimo: ["ho visto", "hai visto", "ha visto", "abbiamo visto", "avete visto", "hanno visto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "andare",
    translation: "to go",
    presente: ["vado", "vai", "va", "andiamo", "andate", "vanno"],
    imperfetto: ["andavo", "andavi", "andava", "andavamo", "andavate", "andavano"],
    passatoRemoto: ["andai", "andasti", "andò", "andammo", "andaste", "andarono"],
    imperativo: ["-", "vai / va'", "vada", "andiamo", "andate", "vadano"],
    passatoProssimo: ["sono andato/a", "sei andato/a", "è andato/a", "siamo andati/e", "siete andati/e", "sono andati/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "venire",
    translation: "to come",
    presente: ["vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
    imperfetto: ["venivo", "venivi", "veniva", "venivamo", "venivate", "venivano"],
    passatoRemoto: ["venni", "venisti", "venne", "venimmo", "veniste", "vennero"],
    imperativo: ["-", "vieni", "venga", "veniamo", "venite", "vengano"],
    passatoProssimo: ["sono venuto/a", "sei venuto/a", "è venuto/a", "siamo venuti/e", "siete venuti/e", "sono venuti/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "dare",
    translation: "to give",
    presente: ["do", "dai", "dà", "diamo", "date", "danno"],
    imperfetto: ["davo", "davi", "dava", "davamo", "davate", "davano"],
    passatoRemoto: ["diedi / detti", "desti", "diede / dette", "demmo", "deste", "diedero / dettero"],
    imperativo: ["-", "dai / da'", "dia", "diamo", "date", "diano"],
    passatoProssimo: ["ho dato", "hai dato", "ha dato", "abbiamo dato", "avete dato", "hanno dato"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "parlare",
    translation: "to speak",
    presente: ["parlo", "parli", "parla", "parliamo", "parlate", "parlano"],
    imperfetto: ["parlavo", "parlavi", "parlava", "parlavamo", "parlavate", "parlavano"],
    passatoRemoto: ["parlai", "parlasti", "parlò", "parlammo", "parlaste", "parlarono"],
    imperativo: ["-", "parla", "parli", "parliamo", "parlate", "parlino"],
    passatoProssimo: ["ho parlato", "hai parlato", "ha parlato", "abbiamo parlato", "avete parlato", "hanno parlato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "trovare",
    translation: "to find",
    presente: ["trovo", "trovi", "trova", "troviamo", "trovate", "trovano"],
    imperfetto: ["trovavo", "trovavi", "trovava", "trovavamo", "trovavate", "trovavano"],
    passatoRemoto: ["trovai", "trovasti", "trovò", "trovammo", "trovaste", "trovarono"],
    imperativo: ["-", "trova", "trovi", "troviamo", "trovate", "trovino"],
    passatoProssimo: ["ho trovato", "hai trovato", "ha trovato", "abbiamo trovato", "avete trovato", "hanno trovato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "sentire",
    translation: "to feel/hear",
    presente: ["sento", "senti", "sente", "sentiamo", "sentite", "sentono"],
    imperfetto: ["sentivo", "sentivi", "sentiva", "sentivamo", "sentivate", "sentivano"],
    passatoRemoto: ["sentii", "sentisti", "sentì", "sentimmo", "sentiste", "sentirono"],
    imperativo: ["-", "senti", "senta", "sentiamo", "sentite", "sentano"],
    passatoProssimo: ["ho sentito", "hai sentito", "ha sentito", "abbiamo sentito", "avete sentito", "hanno sentito"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "lasciare",
    translation: "to leave",
    presente: ["lascio", "lasci", "lascia", "lasciamo", "lasciate", "lasciano"],
    imperfetto: ["lasciavo", "lasciavi", "lasciava", "lasciavamo", "lasciavate", "lasciavano"],
    passatoRemoto: ["lasciai", "lasciasti", "lasciò", "lasciammo", "lasciaste", "lasciarono"],
    imperativo: ["-", "lascia", "lasci", "lasciamo", "lasciate", "lascino"],
    passatoProssimo: ["ho lasciato", "hai lasciato", "ha lasciato", "abbiamo lasciato", "avete lasciato", "hanno lasciato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "prendere",
    translation: "to take",
    presente: ["prendo", "prendi", "prende", "prendiamo", "prendete", "prendono"],
    imperfetto: ["prendevo", "prendevi", "prendeva", "prendevamo", "prendevate", "prendevano"],
    passatoRemoto: ["presi", "prendesti", "prese", "prendemmo", "prendeste", "presero"],
    imperativo: ["-", "prendi", "prenda", "prendiamo", "prendete", "prendano"],
    passatoProssimo: ["ho preso", "hai preso", "ha preso", "abbiamo preso", "avete preso", "hanno preso"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "guardare",
    translation: "to look",
    presente: ["guardo", "guardi", "guarda", "guardiamo", "guardate", "guardano"],
    imperfetto: ["guardavo", "guardavi", "guardava", "guardavamo", "guardavate", "guardavano"],
    passatoRemoto: ["guardai", "guardasti", "guardò", "guardammo", "guardaste", "guardarono"],
    imperativo: ["-", "guarda", "guardi", "guardiamo", "guardate", "guardino"],
    passatoProssimo: ["ho guardato", "hai guardato", "ha guardato", "abbiamo guardato", "avete guardato", "hanno guardato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "mettere",
    translation: "to put",
    presente: ["metto", "metti", "mette", "mettiamo", "mettete", "mettono"],
    imperfetto: ["mettevo", "mettevi", "metteva", "mettevamo", "mettevate", "mettevano"],
    passatoRemoto: ["misi", "mettesti", "mise", "mettemmo", "metteste", "misero"],
    imperativo: ["-", "metti", "metta", "mettiamo", "mettete", "mettano"],
    passatoProssimo: ["ho messo", "hai messo", "ha messo", "abbiamo messo", "avete messo", "hanno messo"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "capire",
    translation: "to understand",
    presente: ["capisco", "capisci", "capisce", "capiamo", "capite", "capiscono"],
    imperfetto: ["capivo", "capivi", "capiva", "capivamo", "capivate", "capivano"],
    passatoRemoto: ["capii", "capisti", "capì", "capimmo", "capiste", "capirono"],
    imperativo: ["-", "capisci", "capisca", "capiamo", "capite", "capiscano"],
    passatoProssimo: ["ho capito", "hai capito", "ha capito", "abbiamo capito", "avete capito", "hanno capito"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "conoscere",
    translation: "to know/meet",
    presente: ["conosco", "conosci", "conosce", "conosciamo", "conoscete", "conoscono"],
    imperfetto: ["conoscevo", "conoscevi", "conosceva", "conoscevamo", "conoscevate", "conoscevano"],
    passatoRemoto: ["conobbi", "conoscesti", "conobbe", "conoscemmo", "conosceste", "conobbero"],
    imperativo: ["-", "conosci", "conosca", "conosciamo", "conoscete", "conoscano"],
    passatoProssimo: ["ho conosciuto", "hai conosciuto", "ha conosciuto", "abbiamo conosciuto", "avete conosciuto", "hanno conosciuto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "credere",
    translation: "to believe",
    presente: ["credo", "credi", "crede", "crediamo", "credete", "credono"],
    imperfetto: ["credevo", "credevi", "credeva", "credevamo", "credevate", "credevano"],
    passatoRemoto: ["credei / credetti", "credesti", "credé / credette", "credemmo", "credeste", "crederono / credettero"],
    imperativo: ["-", "credi", "creda", "crediamo", "credete", "credano"],
    passatoProssimo: ["ho creduto", "hai creduto", "ha creduto", "abbiamo creduto", "avete creduto", "hanno creduto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "pensare",
    translation: "to think",
    presente: ["penso", "pensi", "pensa", "pensiamo", "pensate", "pensano"],
    imperfetto: ["pensavo", "pensavi", "pensava", "pensavamo", "pensavate", "pensavano"],
    passatoRemoto: ["pensai", "pensasti", "pensò", "pensammo", "pensaste", "pensarono"],
    imperativo: ["-", "pensa", "pensi", "pensiamo", "pensate", "pensino"],
    passatoProssimo: ["ho pensato", "hai pensato", "ha pensato", "abbiamo pensato", "avete pensato", "hanno pensato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "portare",
    translation: "to bring/wear",
    presente: ["porto", "porti", "porta", "portiamo", "portate", "portano"],
    imperfetto: ["portavo", "portavi", "portava", "portavamo", "portavate", "portavano"],
    passatoRemoto: ["portai", "portasti", "portò", "portammo", "portaste", "portarono"],
    imperativo: ["-", "porta", "porti", "portiamo", "portate", "portino"],
    passatoProssimo: ["ho portato", "hai portato", "ha portato", "abbiamo portato", "avete portato", "hanno portato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "chiamare",
    translation: "to call",
    presente: ["chiamo", "chiami", "chiama", "chiamiamo", "chiamate", "chiamano"],
    imperfetto: ["chiamavo", "chiamavi", "chiamava", "chiamavamo", "chiamavate", "chiamavano"],
    passatoRemoto: ["chiamai", "chiamasti", "chiamò", "chiamammo", "chiamaste", "chiamarono"],
    imperativo: ["-", "chiama", "chiami", "chiamiamo", "chiamate", "chiamino"],
    passatoProssimo: ["ho chiamato", "hai chiamato", "ha chiamato", "abbiamo chiamato", "avete chiamato", "hanno chiamato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "chiedere",
    translation: "to ask",
    presente: ["chiedo", "chiedi", "chiede", "chiediamo", "chiedete", "chiedono"],
    imperfetto: ["chiedevo", "chiedevi", "chiedeva", "chiedevamo", "chiedevate", "chiedevano"],
    passatoRemoto: ["chiesi", "chiedesti", "chiese", "chiedemmo", "chiedeste", "chiesero"],
    imperativo: ["-", "chiedi", "chieda", "chiediamo", "chiedete", "chiedano"],
    passatoProssimo: ["ho chiesto", "hai chiesto", "ha chiesto", "abbiamo chiesto", "avete chiesto", "hanno chiesto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "leggere",
    translation: "to read",
    presente: ["leggo", "leggi", "legge", "leggiamo", "leggete", "leggono"],
    imperfetto: ["leggevo", "leggevi", "leggeva", "leggevamo", "leggevate", "leggevano"],
    passatoRemoto: ["lessi", "leggesti", "lesse", "leggemmo", "leggeste", "lessero"],
    imperativo: ["-", "leggi", "legga", "leggiamo", "leggete", "leggano"],
    passatoProssimo: ["ho letto", "hai letto", "ha letto", "abbiamo letto", "avete letto", "hanno letto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "scrivere",
    translation: "to write",
    presente: ["scrivo", "scrivi", "scrive", "scriviamo", "scrivete", "scrivono"],
    imperfetto: ["scrivevo", "scrivevi", "scriveva", "scrivevamo", "scrivevate", "scrivevano"],
    passatoRemoto: ["scrissi", "scrivesti", "scrisse", "scrivemmo", "scriveste", "scrissero"],
    imperativo: ["-", "scrivi", "scriva", "scriviamo", "scrivete", "scrivano"],
    passatoProssimo: ["ho scritto", "hai scritto", "ha scritto", "abbiamo scritto", "avete scritto", "hanno scritto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "vivere",
    translation: "to live",
    presente: ["vivo", "vivi", "vive", "viviamo", "vivete", "vivono"],
    imperfetto: ["vivevo", "vivevi", "viveva", "vivevamo", "vivevate", "vivevano"],
    passatoRemoto: ["vissi", "vivesti", "visse", "vivemmo", "viveste", "vissero"],
    imperativo: ["-", "vivi", "viva", "viviamo", "vivete", "vivano"],
    passatoProssimo: ["ho vissuto", "hai vissuto", "ha vissuto", "abbiamo vissuto", "avete vissuto", "hanno vissuto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "uscire",
    translation: "to go out",
    presente: ["esco", "esci", "esce", "usciamo", "uscite", "escono"],
    imperfetto: ["uscivo", "uscivi", "usciva", "uscivamo", "uscivate", "uscivano"],
    passatoRemoto: ["uscii", "uscisti", "uscì", "uscimmo", "usciste", "uscirono"],
    imperativo: ["-", "esci", "esca", "usciamo", "uscite", "escano"],
    passatoProssimo: ["sono uscito/a", "sei uscito/a", "è uscito/a", "siamo usciti/e", "siete usciti/e", "sono usciti/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "lavorare",
    translation: "to work",
    presente: ["lavoro", "lavori", "lavora", "lavoriamo", "lavorate", "lavorano"],
    imperfetto: ["lavoravo", "lavoravi", "lavorava", "lavoravamo", "lavoravate", "lavoravano"],
    passatoRemoto: ["lavorai", "lavorasti", "lavorò", "lavorammo", "lavoraste", "lavorarono"],
    imperativo: ["-", "lavora", "lavori", "lavoriamo", "lavorate", "lavorino"],
    passatoProssimo: ["ho lavorato", "hai lavorato", "ha lavorato", "abbiamo lavorato", "avete lavorato", "hanno lavorato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "amare",
    translation: "to love",
    presente: ["amo", "ami", "ama", "amiamo", "amate", "amano"],
    imperfetto: ["amavo", "amavi", "amava", "amavamo", "amavate", "amavano"],
    passatoRemoto: ["amai", "amasti", "amò", "amammo", "amaste", "amarono"],
    imperativo: ["-", "ama", "ami", "amiamo", "amate", "amino"],
    passatoProssimo: ["ho amato", "hai amato", "ha amato", "abbiamo amato", "avete amato", "hanno amato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "arrivare",
    translation: "to arrive",
    presente: ["arrivo", "arrivi", "arriva", "arriviamo", "arrivate", "arrivano"],
    imperfetto: ["arrivavo", "arrivavi", "arrivava", "arrivavamo", "arrivavate", "arrivavano"],
    passatoRemoto: ["arrivai", "arrivasti", "arrivò", "arrivammo", "arrivaste", "arrivarono"],
    imperativo: ["-", "arriva", "arrivi", "arriviamo", "arrivate", "arrivino"],
    passatoProssimo: ["sono arrivato/a", "sei arrivato/a", "è arrivato/a", "siamo arrivati/e", "siete arrivati/e", "sono arrivati/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "partire",
    translation: "to leave",
    presente: ["parto", "parti", "parte", "partiamo", "partite", "partono"],
    imperfetto: ["partivo", "partivi", "partiva", "partivamo", "partivate", "partivano"],
    passatoRemoto: ["partii", "partisti", "partì", "partimmo", "partiste", "partirono"],
    imperativo: ["-", "parti", "parta", "partiamo", "partite", "partano"],
    passatoProssimo: ["sono partito/a", "sei partito/a", "è partito/a", "siamo partiti/e", "siete partiti/e", "sono partiti/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "rispondere",
    translation: "to answer",
    presente: ["rispondo", "rispondi", "risponde", "rispondiamo", "rispondete", "rispondono"],
    imperfetto: ["rispondevo", "rispondevi", "rispondeva", "rispondevamo", "rispondevate", "rispondevano"],
    passatoRemoto: ["risposi", "rispondesti", "rispose", "rispondemmo", "rispondeste", "risposero"],
    imperativo: ["-", "rispondi", "risponda", "rispondiamo", "rispondete", "rispondano"],
    passatoProssimo: ["ho risposto", "hai risposto", "ha risposto", "abbiamo risposto", "avete risposto", "hanno risposto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "chiudere",
    translation: "to close",
    presente: ["chiudo", "chiudi", "chiude", "chiudiamo", "chiudete", "chiudono"],
    imperfetto: ["chiudevo", "chiudevi", "chiudeva", "chiudevamo", "chiudevate", "chiudevano"],
    passatoRemoto: ["chiusi", "chiudesti", "chiuse", "chiudemmo", "chiudeste", "chiusero"],
    imperativo: ["-", "chiudi", "chiuda", "chiudiamo", "chiudete", "chiudano"],
    passatoProssimo: ["ho chiuso", "hai chiuso", "ha chiuso", "abbiamo chiuso", "avete chiuso", "hanno chiuso"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "aprire",
    translation: "to open",
    presente: ["apro", "apri", "apre", "apriamo", "aprite", "aprono"],
    imperfetto: ["aprivo", "aprivi", "apriva", "aprivamo", "aprivate", "aprivano"],
    passatoRemoto: ["aprii", "apristi", "aprì", "aprimmo", "apriste", "aprirono"],
    imperativo: ["-", "apri", "apra", "apriamo", "aprite", "aprano"],
    passatoProssimo: ["ho aperto", "hai aperto", "ha aperto", "abbiamo aperto", "avete aperto", "hanno aperto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "bere",
    translation: "to drink",
    presente: ["bevo", "bevi", "beve", "beviamo", "bevete", "bevono"],
    imperfetto: ["bevevo", "bevevi", "beveva", "bevevamo", "bevevate", "bevevano"],
    passatoRemoto: ["bevvi", "bevesti", "bevve", "bevemmo", "beveste", "bevvero"],
    imperativo: ["-", "bevi", "beva", "beviamo", "bevete", "bevano"],
    passatoProssimo: ["ho bevuto", "hai bevuto", "ha bevuto", "abbiamo bevuto", "avete bevuto", "hanno bevuto"],
    typePres: "Irregolare",
    typeImperf: "Irregolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "mangiare",
    translation: "to eat",
    presente: ["mangio", "mangi", "mangia", "mangiamo", "mangiate", "mangiano"],
    imperfetto: ["mangiavo", "mangiavi", "mangiava", "mangiavamo", "mangiavate", "mangiavano"],
    passatoRemoto: ["mangiai", "mangiasti", "mangiò", "mangiammo", "mangiaste", "mangiarono"],
    imperativo: ["-", "mangia", "mangi", "mangiamo", "mangiate", "mangino"],
    passatoProssimo: ["ho mangiato", "hai mangiato", "ha mangiato", "abbiamo mangiato", "avete mangiato", "hanno mangiato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "dormire",
    translation: "to sleep",
    presente: ["dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono"],
    imperfetto: ["dormivo", "dormivi", "dormiva", "dormivamo", "dormivate", "dormivano"],
    passatoRemoto: ["dormii", "dormisti", "dormì", "dormimmo", "dormiste", "dormirono"],
    imperativo: ["-", "dormi", "dorma", "dormiamo", "dormite", "dormano"],
    passatoProssimo: ["ho dormito", "hai dormito", "ha dormito", "abbiamo dormito", "avete dormito", "hanno dormito"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "giocare",
    translation: "to play",
    presente: ["gioco", "giochi", "gioca", "giochiamo", "giocate", "giocano"],
    imperfetto: ["giocavo", "giocavi", "giocava", "giocavamo", "giocavate", "giocavano"],
    passatoRemoto: ["giocai", "giocasti", "giocò", "giocammo", "giocaste", "giocarono"],
    imperativo: ["-", "gioca", "giochi", "giochiamo", "giocate", "giochino"],
    passatoProssimo: ["ho giocato", "hai giocato", "ha giocato", "abbiamo giocato", "avete giocato", "hanno giocato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "aspettare",
    translation: "to wait",
    presente: ["aspetto", "aspetti", "aspetta", "aspettiamo", "aspettate", "aspettano"],
    imperfetto: ["aspettavo", "aspettavi", "aspettava", "aspettavamo", "aspettavate", "aspettavano"],
    passatoRemoto: ["aspettai", "aspettasti", "aspettò", "aspettammo", "aspettaste", "aspettarono"],
    imperativo: ["-", "aspetta", "aspetti", "aspettiamo", "aspettate", "aspettino"],
    passatoProssimo: ["ho aspettato", "hai aspettato", "ha aspettato", "abbiamo aspettato", "avete aspettato", "hanno aspettato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "cercare",
    translation: "to search",
    presente: ["cerco", "cerchi", "cerca", "cerchiamo", "cercate", "cercano"],
    imperfetto: ["cercavo", "cercavi", "cercava", "cercavamo", "cercavate", "cercavano"],
    passatoRemoto: ["cercai", "cercasti", "cercò", "cercammo", "cercaste", "cercarono"],
    imperativo: ["-", "cerca", "cerchi", "cerchiamo", "cercate", "cerchino"],
    passatoProssimo: ["ho cercato", "hai cercato", "ha cercato", "abbiamo cercato", "avete cercato", "hanno cercato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "pagare",
    translation: "to pay",
    presente: ["pago", "paghi", "paga", "paghiamo", "pagate", "pagano"],
    imperfetto: ["pagavo", "pagavi", "pagava", "pagavamo", "pagavate", "pagavano"],
    passatoRemoto: ["pagai", "pagasti", "pagò", "pagammo", "pagaste", "pagarono"],
    imperativo: ["-", "paga", "paghi", "paghiamo", "pagate", "paghino"],
    passatoProssimo: ["ho pagato", "hai pagato", "ha pagato", "abbiamo pagato", "avete pagato", "hanno pagato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "decidere",
    translation: "to decide",
    presente: ["decido", "decidi", "decide", "decidiamo", "decidete", "decidono"],
    imperfetto: ["decidevo", "decidevi", "decideva", "decidevamo", "decidevate", "decidevano"],
    passatoRemoto: ["decisi", "decidesti", "decise", "decidemmo", "decideste", "decisero"],
    imperativo: ["-", "decidi", "decida", "decidiamo", "decidete", "decidano"],
    passatoProssimo: ["ho deciso", "hai deciso", "ha deciso", "abbiamo deciso", "avete deciso", "hanno deciso"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "morire",
    translation: "to die",
    presente: ["muoio", "muori", "muore", "moriamo", "morite", "muoiono"],
    imperfetto: ["morivo", "morivi", "moriva", "morivamo", "morivate", "morivano"],
    passatoRemoto: ["morii", "moristi", "morì", "morimmo", "moriste", "morirono"],
    imperativo: ["-", "muori", "muoia", "moriamo", "morite", "muoiano"],
    passatoProssimo: ["sono morto/a", "sei morto/a", "è morto/a", "siamo morti/e", "siete morti/e", "sono morti/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "nascere",
    translation: "to be born",
    presente: ["nasco", "nasci", "nasce", "nasciamo", "nascete", "nascono"],
    imperfetto: ["nascevo", "nascevi", "nasceva", "nascevamo", "nascevate", "nascevano"],
    passatoRemoto: ["nacqui", "nascesti", "nacque", "nascemmo", "nasceste", "nacquero"],
    imperativo: ["-", "nasci", "nasca", "nasciamo", "nascete", "nascano"],
    passatoProssimo: ["sono nato/a", "sei nato/a", "è nato/a", "siamo nati/e", "siete nati/e", "sono nati/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "rimanere",
    translation: "to remain/stay",
    presente: ["rimango", "rimani", "rimane", "rimaniamo", "rimanete", "rimangono"],
    imperfetto: ["rimanevo", "rimanevi", "rimaneva", "rimanevamo", "rimanevate", "rimanevano"],
    passatoRemoto: ["rimasi", "rimanesti", "rimase", "rimanemmo", "rimaneste", "rimasero"],
    imperativo: ["-", "rimani", "rimanga", "rimaniamo", "rimanete", "rimangano"],
    passatoProssimo: ["sono rimasto/a", "sei rimasto/a", "è rimasto/a", "siamo rimasti/e", "siete rimasti/e", "sono rimasti/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "correre",
    translation: "to run",
    presente: ["corro", "corri", "corre", "corriamo", "correte", "corrono"],
    imperfetto: ["correvo", "correvi", "correva", "correvamo", "correvate", "correvano"],
    passatoRemoto: ["corsi", "corresti", "corse", "corremmo", "correste", "corsero"],
    imperativo: ["-", "corri", "corra", "corriamo", "correte", "corrano"],
    passatoProssimo: ["ho corso", "hai corso", "ha corso", "abbiamo corso", "avete corso", "hanno corso"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  }
];

// Dizionario delle forme altamente irregolari del Congiuntivo Presente
const congiuntivoPresenteMap = {
  "essere": ["sia", "sia", "sia", "siamo", "siate", "siano"],
  "avere": ["abbia", "abbia", "abbia", "abbiamo", "abbiate", "abbiano"],
  "fare": ["faccia", "faccia", "faccia", "facciamo", "facciate", "facciano"],
  "dire": ["dica", "dica", "dica", "diciamo", "diciate", "dicano"],
  "potere": ["possa", "possa", "possa", "possiamo", "possiate", "possano"],
  "volere": ["voglia", "voglia", "voglia", "vogliamo", "vogliate", "vogliano"],
  "sapere": ["sappia", "sappia", "sappia", "sappiamo", "sappiate", "sappiano"],
  "stare": ["stia", "stia", "stia", "stiamo", "stiate", "stiano"],
  "dovere": ["debba", "debba", "debba", "dobbiamo", "dobbiate", "debbano"],
  "andare": ["vada", "vada", "vada", "andiamo", "andiate", "vadano"],
  "venire": ["venga", "venga", "venga", "veniamo", "veniate", "vengano"],
  "dare": ["dia", "dia", "dia", "diamo", "diate", "diano"],
  "uscire": ["esca", "esca", "esca", "usciamo", "usciate", "escano"],
  "morire": ["muoia", "muoia", "muoia", "moriamo", "moriate", "muoiano"],
  "rimanere": ["rimanga", "rimanga", "rimanga", "rimaniamo", "rimaniate", "rimangano"],
  "bere": ["beva", "beva", "beva", "beviamo", "beviate", "bevano"]
};

// Radici irregolari per il Futuro Semplice (e Condizionale)
const futureRoots = {
  "essere": "sar", "avere": "avr", "fare": "far", "dire": "dir", "potere": "potr",
  "volere": "vorr", "sapere": "sapr", "stare": "star", "dovere": "dovr", "vedere": "vedr",
  "andare": "andr", "venire": "verr", "dare": "dar", "vivere": "vivr", "bere": "berr",
  "rimanere": "rimarr", "cercare": "cercher", "giocare": "giocher", "pagare": "pagher",
  "mangiare": "manger", "lasciare": "lascer"
};

// Generazione dinamica per i vari tempi derivati
top50Verbs.forEach(verb => {
  const inf = verb.infinitive;

  // Congiuntivo Presente Dinamico
  if (congiuntivoPresenteMap[inf]) {
    verb.congiuntivoPresente = congiuntivoPresenteMap[inf];
    verb.typeCongPres = "Irregolare";
  } else {
    let p0 = verb.presente[0]; 
    let root0 = p0.slice(0, -1); 
    let noiForm = verb.presente[3]; 
    let voiForm = noiForm.slice(0, -2) + "te"; 

    if (inf.endsWith("are")) {
      if (root0.endsWith("c") || root0.endsWith("g")) {
        root0 += "h"; 
      } else if (root0.endsWith("i")) {
        root0 = root0.slice(0, -1); 
      }
      verb.congiuntivoPresente = [root0 + "i", root0 + "i", root0 + "i", noiForm, voiForm, root0 + "ino"];
    } else {
      verb.congiuntivoPresente = [root0 + "a", root0 + "a", root0 + "a", noiForm, voiForm, root0 + "ano"];
    }
    verb.typeCongPres = "Regolare";
  }

  // Trapassato Prossimo
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

  // Futuro Semplice e Condizionale Presente
  let futRoot;
  let futType = "Regolare";

  if (futureRoots[inf]) {
    futRoot = futureRoots[inf];
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

  // Futuro
  verb.futuro = [
    futRoot + "ò",
    futRoot + "ai",
    futRoot + "à",
    futRoot + "emo",
    futRoot + "ete",
    futRoot + "anno"
  ];
  verb.typeFut = futType;

  // Condizionale Presente
  verb.condizionale = [
    futRoot + "ei",
    futRoot + "esti",
    futRoot + "ebbe",
    futRoot + "emmo",
    futRoot + "este",
    futRoot + "ebbero"
  ];
  verb.typeCond = futType;

  // Condizionale Passato
  verb.condizionalePassato = verb.passatoProssimo.map((pp, index) => {
    let cp = pp;
    cp = cp.replace(/^sono /, index === 5 ? "sarebbero " : "sarei ");
    cp = cp.replace(/^sei /, "saresti ");
    cp = cp.replace(/^è /, "sarebbe ");
    cp = cp.replace(/^siamo /, "saremmo ");
    cp = cp.replace(/^siete /, "sareste ");
    cp = cp.replace(/^ho /, "avrei ");
    cp = cp.replace(/^hai /, "avresti ");
    cp = cp.replace(/^ha /, "avrebbe ");
    cp = cp.replace(/^abbiamo /, "avremmo ");
    cp = cp.replace(/^avete /, "avreste ");
    cp = cp.replace(/^hanno /, "avrebbero ");
    return cp;
  });
  verb.typeCondPass = verb.typePP;

  // Congiuntivo Passato
  verb.congiuntivoPassato = verb.passatoProssimo.map((pp, index) => {
    let cp = pp;
    cp = cp.replace(/^sono /, index === 5 ? "siano " : "sia ");
    cp = cp.replace(/^sei /, "sia ");
    cp = cp.replace(/^è /, "sia ");
    cp = cp.replace(/^siamo /, "siamo ");
    cp = cp.replace(/^siete /, "siate ");
    cp = cp.replace(/^ho /, "abbia ");
    cp = cp.replace(/^hai /, "abbia ");
    cp = cp.replace(/^ha /, "abbia ");
    cp = cp.replace(/^abbiamo /, "abbiamo ");
    cp = cp.replace(/^avete /, "abbiate ");
    cp = cp.replace(/^hanno /, "abbiano ");
    return cp;
  });
  verb.typeCongPass = verb.typePP;

  // Congiuntivo Trapassato
  verb.congiuntivoTrapassato = verb.passatoProssimo.map((pp, index) => {
    let ct = pp;
    if (index === 0) ct = ct.replace(/^sono /, "fossi ").replace(/^ho /, "avessi ");
    if (index === 1) ct = ct.replace(/^sei /, "fossi ").replace(/^hai /, "avessi ");
    if (index === 2) ct = ct.replace(/^è /, "fosse ").replace(/^ha /, "avesse ");
    if (index === 3) ct = ct.replace(/^siamo /, "fossimo ").replace(/^abbiamo /, "avessimo ");
    if (index === 4) ct = ct.replace(/^siete /, "foste ").replace(/^avete /, "aveste ");
    if (index === 5) ct = ct.replace(/^sono /, "fossero ").replace(/^hanno /, "avessero ");
    return ct;
  });
  verb.typeCongTrap = verb.typePP;
});

const pronouns = ["io", "tu", "lui/lei", "noi", "voi", "loro"];
const imperativePronouns = ["(io)", "tu", "Lei (formale)", "noi", "voi"];

export default function App() {
  const [activeTab, setActiveTab] = useState('panoramica');

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
        
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-16 md:pb-0">
          <NavItem icon={<LayoutDashboard size={20} />} label="Panoramica B2" isActive={activeTab === 'panoramica'} onClick={() => setActiveTab('panoramica')} />
          <NavItem icon={<Sun size={20} />} label="Il Presente" isActive={activeTab === 'presente'} onClick={() => setActiveTab('presente')} />
          <NavItem icon={<History size={20} />} label="L'Imperfetto" isActive={activeTab === 'imperfetto'} onClick={() => setActiveTab('imperfetto')} />
          <NavItem icon={<Rocket size={20} />} label="Futuro Semplice" isActive={activeTab === 'futuro'} onClick={() => setActiveTab('futuro')} />
          <NavItem icon={<Lightbulb size={20} />} label="Condizionale Pres." isActive={activeTab === 'condizionale'} onClick={() => setActiveTab('condizionale')} />
          <NavItem icon={<Sparkles size={20} />} label="Condizionale Pass." isActive={activeTab === 'condizionalePassato'} onClick={() => setActiveTab('condizionalePassato')} />
          <NavItem icon={<Brain size={20} />} label="Congiuntivo Pres." isActive={activeTab === 'congiuntivoPresente'} onClick={() => setActiveTab('congiuntivoPresente')} />
          <NavItem icon={<Layers size={20} />} label="Congiuntivo Pass." isActive={activeTab === 'congiuntivoPassato'} onClick={() => setActiveTab('congiuntivoPassato')} />
          <NavItem icon={<Milestone size={20} />} label="Congiuntivo Trap." isActive={activeTab === 'congiuntivoTrapassato'} onClick={() => setActiveTab('congiuntivoTrapassato')} />
          <NavItem icon={<Clock size={20} />} label="Passato Prossimo" isActive={activeTab === 'prossimo'} onClick={() => setActiveTab('prossimo')} />
          <NavItem icon={<Archive size={20} />} label="Trapassato Prossimo" isActive={activeTab === 'trapassato'} onClick={() => setActiveTab('trapassato')} />
          <NavItem icon={<ScrollText size={20} />} label="Passato Remoto" isActive={activeTab === 'passato'} onClick={() => setActiveTab('passato')} />
          <NavItem icon={<AlertCircle size={20} />} label="L'Imperativo" isActive={activeTab === 'imperativo'} onClick={() => setActiveTab('imperativo')} />
          <NavItem icon={<List size={20} />} label="I 50 Verbi" isActive={activeTab === 'verbi'} onClick={() => setActiveTab('verbi')} />
          <NavItem icon={<Gamepad2 size={20} />} label="Quiz Pratico" isActive={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-6xl mx-auto">
        {activeTab === 'panoramica' && <PanoramicaSection />}
        {activeTab === 'presente' && <PresenteSection />}
        {activeTab === 'imperfetto' && <ImperfettoSection />}
        {activeTab === 'futuro' && <FuturoSempliceSection />}
        {activeTab === 'condizionale' && <CondizionaleSection />}
        {activeTab === 'condizionalePassato' && <CondizionalePassatoSection />}
        {activeTab === 'congiuntivoPresente' && <CongiuntivoPresenteSection />}
        {activeTab === 'congiuntivoPassato' && <CongiuntivoPassatoSection />}
        {activeTab === 'congiuntivoTrapassato' && <CongiuntivoTrapassatoSection />}
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

function PanoramicaSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Panoramica Livello B2</h2>
        <p className="text-slate-600 mt-2 text-lg leading-relaxed">
          Ecco la lista completa dei tempi verbali che devi padroneggiare per il livello B2. Ho inserito degli esempi legati a temi comuni degli esami (come il lavoro, l'ambiente e la società) per darti anche un po' di lessico utile:
        </p>
      </header>

      {/* Indicativo */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
        <h3 className="text-xl font-bold text-blue-800 mb-3">1. Modo Indicativo (La Realtà)</h3>
        <p className="mb-4 text-slate-700">Al livello B2, l'uso corretto e l'alternanza fluida tra passato prossimo, imperfetto e trapassato prossimo sono fondamentali per raccontare eventi passati.</p>
        <ul className="space-y-3 text-slate-700">
          <li><strong>Presente:</strong> <em>Le energie rinnovabili rappresentano il futuro del nostro pianeta.</em></li>
          <li><strong>Passato Prossimo:</strong> <em>Negli ultimi anni, la tecnologia ha cambiato radicalmente il nostro modo di comunicare.</em></li>
          <li><strong>Imperfetto:</strong> <em>Prima della rivoluzione industriale, la società si basava principalmente sull'agricoltura.</em></li>
          <li><strong>Trapassato Prossimo:</strong> <em>Quando il governo ha approvato la nuova legge, i cittadini avevano già protestato per settimane.</em></li>
          <li><strong>Passato Remoto:</strong> <span className="text-sm text-slate-500">(La produzione attiva non è sempre richiesta all'orale in tutti gli esami, ma devi saperlo riconoscere e usare nella comprensione e produzione scritta formale):</span> <em>Nel 1946 l'Italia divenne una Repubblica.</em></li>
          <li><strong>Futuro Semplice:</strong> <em>Si prevede che le macchine autonome ridurranno gli incidenti stradali.</em></li>
          <li><strong>Futuro Anteriore:</strong> <em>Ti invierò il documento non appena avrò finito di scriverlo.</em></li>
        </ul>
      </section>

      {/* Congiuntivo */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500">
        <h3 className="text-xl font-bold text-purple-800 mb-3">2. Modo Congiuntivo (La Soggettività e l'Incertezza)</h3>
        <p className="mb-4 text-slate-700">Questo è il cuore del livello B2! Devi saperlo usare per esprimere opinioni, dubbi, stati d'animo e dopo specifici connettivi subordinanti (come <em>sebbene, nonostante, affinché, a patto che</em>).</p>
        <ul className="space-y-3 text-slate-700">
          <li><strong>Presente:</strong> <em>Molti esperti credono che il cambiamento climatico sia un'emergenza assoluta.</em></li>
          <li><strong>Passato:</strong> <em>Nonostante abbia studiato molto l'argomento, il test mi preoccupa ancora un po'.</em></li>
          <li><strong>Imperfetto:</strong> <em>Sarebbe opportuno che le istituzioni investissero maggiori risorse nell'istruzione pubblica.</em></li>
          <li><strong>Trapassato:</strong> <em>Se la riunione fosse finita prima, avrei partecipato volentieri al seminario.</em></li>
        </ul>
      </section>

      {/* Condizionale */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-orange-500">
        <h3 className="text-xl font-bold text-orange-800 mb-3">3. Modo Condizionale (La Possibilità e l'Ipotesi)</h3>
        <ul className="space-y-3 text-slate-700">
          <li><strong>Presente:</strong> <em>Mi piacerebbe approfondire le cause e le conseguenze della globalizzazione.</em></li>
          <li><strong>Passato:</strong> <em>Sarei andato all'evento, tuttavia imprevisti lavorativi me lo hanno impedito.</em> <span className="text-sm text-slate-500">(Nota come l'uso del connettivo tuttavia renda la frase più elegante).</span></li>
        </ul>
      </section>

      {/* Imperativo */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
        <h3 className="text-xl font-bold text-emerald-800 mb-3">4. Modo Imperativo</h3>
        <p className="mb-4 text-slate-700">Serve padroneggiare bene non solo l'imperativo diretto, ma soprattutto la forma di cortesia (il "Lei" formale), molto comune nelle prove di gioco di ruolo (role-play) degli esami orali.</p>
        <ul className="space-y-3 text-slate-700">
          <li><strong>Diretto:</strong> <em>Leggi attentamente il contratto prima di firmare!</em></li>
          <li><strong>Indiretto (Cortesia):</strong> <em>Signor Rossi, compili questo modulo e attenda in sala d'aspetto, per favore.</em></li>
        </ul>
      </section>

      {/* Modi Indefiniti */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-slate-500">
        <h3 className="text-xl font-bold text-slate-800 mb-3">5. Modi Indefiniti</h3>
        <p className="mb-4 text-slate-700">L'uso di questi modi rende i tuoi testi e discorsi molto più coesi e naturali, tipici di un candidato B2 che sa unire le frasi senza ripetere continuamente il soggetto.</p>
        <ul className="space-y-3 text-slate-700">
          <li><strong>Infinito (Presente e Passato):</strong> <em>Dopo aver analizzato i dati, possiamo trarre delle conclusioni importanti.</em></li>
          <li><strong>Gerundio (Presente e Passato):</strong> <em>Investendo nelle infrastrutture, la città ridurrà notevolmente il traffico.</em></li>
          <li><strong>Participio (Presente e Passato):</strong> <em>Il candidato, una volta superato lo scritto, accederà all'esame orale.</em></li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <Info className="text-amber-600 flex-shrink-0 mt-1" size={24} />
          <p className="text-amber-900 leading-relaxed font-medium">
            Ricorda sempre che la ricchezza grammaticale deve andare di pari passo con un buon uso dei "connettivi" per dare logica al discorso.
          </p>
        </div>
      </section>
    </div>
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

function ImperfettoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">L'Imperfetto</h2>
        <p className="text-slate-600 mt-2 text-lg">Il tempo delle descrizioni, delle abitudini passate e delle azioni in corso d'opera.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <ul className="list-disc pl-6 space-y-4 text-slate-700 mt-4">
          <li>
            <strong>Abitudini nel passato:</strong><br />
            Azioni che si ripetevano regolarmente.<br />
            <span className="italic text-slate-500">Es: Da bambino <strong>giocavo</strong> sempre a calcio.</span>
          </li>
          <li>
            <strong>Descrizioni nel passato:</strong><br />
            Stato fisico, psicologico o meteorologico.<br />
            <span className="italic text-slate-500">Es: <strong>Era</strong> una bella giornata e il sole <strong>splendeva</strong>.</span>
          </li>
          <li>
            <strong>Azioni in corso interrotte:</strong><br />
            Un'azione continuata (all'imperfetto) che viene interrotta da un'azione improvvisa (al passato prossimo).<br />
            <span className="italic text-slate-500">Es: Mentre <strong>guardavo</strong> la TV, è suonato il telefono.</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Regolari: Le Desinenze</h3>
        <p className="mb-4 text-slate-700">L'imperfetto è il tempo più regolare in italiano. Si mantiene la vocale tematica dell'infinito (a, e, i) e si aggiunge una <strong>v</strong>.</p>
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
              <tr><td className="p-3 border font-semibold">io</td><td className="p-3 border">parl-<strong>avo</strong></td><td className="p-3 border">cred-<strong>evo</strong></td><td className="p-3 border">dorm-<strong>ivo</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">tu</td><td className="p-3 border">parl-<strong>avi</strong></td><td className="p-3 border">cred-<strong>evi</strong></td><td className="p-3 border">dorm-<strong>ivi</strong></td></tr>
              <tr><td className="p-3 border font-semibold">lui/lei</td><td className="p-3 border">parl-<strong>ava</strong></td><td className="p-3 border">cred-<strong>eva</strong></td><td className="p-3 border">dorm-<strong>iva</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">noi</td><td className="p-3 border">parl-<strong>avamo</strong></td><td className="p-3 border">cred-<strong>evamo</strong></td><td className="p-3 border">dorm-<strong>ivamo</strong></td></tr>
              <tr><td className="p-3 border font-semibold">voi</td><td className="p-3 border">parl-<strong>avate</strong></td><td className="p-3 border">cred-<strong>evate</strong></td><td className="p-3 border">dorm-<strong>ivate</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">loro</td><td className="p-3 border">parl-<strong>avano</strong></td><td className="p-3 border">cred-<strong>evano</strong></td><td className="p-3 border">dorm-<strong>ivano</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-teal-50 p-6 rounded-xl border border-teal-200">
        <h3 className="text-xl font-bold text-teal-800 mb-3 flex items-center gap-2">
          💡 I pochi (ma importanti) Irregolari
        </h3>
        <p className="mb-4 text-teal-900">
          A differenza degli altri tempi, l'imperfetto ha pochissimi verbi irregolari. I più usati sono <strong>Essere</strong> (che ha una radice propria) e <strong>Bere, Dire, Fare</strong> (che in realtà sono regolari se si guarda la loro antica radice latina: <em>bevere, dicere, facere</em>).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2">Essere</h4>
            <ul className="text-sm space-y-1 text-center">
              <li>ero</li><li>eri</li><li>era</li><li>eravamo</li><li>eravate</li><li>erano</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2">Fare</h4>
            <ul className="text-sm space-y-1 text-center">
              <li>facevo</li><li>facevi</li><li>faceva</li><li>facevamo</li><li>facevate</li><li>facevano</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2">Dire</h4>
            <ul className="text-sm space-y-1 text-center">
              <li>dicevo</li><li>dicevi</li><li>diceva</li><li>dicevamo</li><li>dicevate</li><li>dicevano</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2">Bere</h4>
            <ul className="text-sm space-y-1 text-center">
              <li>bevevo</li><li>bevevi</li><li>beveva</li><li>bevevamo</li><li>bevevate</li><li>bevevano</li>
            </ul>
          </div>
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

function CondizionaleSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Condizionale Presente</h2>
        <p className="text-slate-600 mt-2 text-lg">Desideri, richieste cortesi e possibilità.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <ul className="list-disc pl-6 space-y-4 text-slate-700 mt-4">
          <li>
            <strong>Richieste cortesi:</strong><br />
            Per chiedere qualcosa in modo educato o attenuare un ordine.<br />
            <span className="italic text-slate-500">Es: <strong>Vorrei</strong> un caffè, per favore. / Mi <strong>daresti</strong> una mano?</span>
          </li>
          <li>
            <strong>Desideri e sogni:</strong><br />
            Per esprimere qualcosa che si vorrebbe fare o avere.<br />
            <span className="italic text-slate-500">Es: Mi <strong>piacerebbe</strong> viaggiare in Giappone.</span>
          </li>
          <li>
            <strong>Consigli:</strong><br />
            Per suggerire a qualcuno cosa fare (spesso con <em>Dovere</em>, <em>Potere</em> o espressioni come <em>Al posto tuo</em>).<br />
            <span className="italic text-slate-500">Es: Al posto tuo, <strong>studierei</strong> di più.</span>
          </li>
          <li>
            <strong>Informazioni non confermate:</strong><br />
            Spesso usato nel giornalismo per riportare notizie non del tutto certe.<br />
            <span className="italic text-slate-500">Es: Il sospettato <strong>sarebbe</strong> fuggito all'estero.</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Come si forma? Le Desinenze</h3>
        <p className="mb-4 text-slate-700">La bellissima notizia è che il Condizionale Presente usa <strong>esattamente la stessa radice del Futuro Semplice</strong>! L'unica cosa che cambia sono le sei desinenze finali: <em>-ei, -esti, -ebbe, -emmo, -este, -ebbero</em>.</p>
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
              <tr><td className="p-3 border font-semibold">io</td><td className="p-3 border">parler-<strong>ei</strong></td><td className="p-3 border">creder-<strong>ei</strong></td><td className="p-3 border">dormir-<strong>ei</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">tu</td><td className="p-3 border">parler-<strong>esti</strong></td><td className="p-3 border">creder-<strong>esti</strong></td><td className="p-3 border">dormir-<strong>esti</strong></td></tr>
              <tr><td className="p-3 border font-semibold">lui/lei</td><td className="p-3 border">parler-<strong>ebbe</strong></td><td className="p-3 border">creder-<strong>ebbe</strong></td><td className="p-3 border">dormir-<strong>ebbe</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">noi</td><td className="p-3 border">parler-<strong>emmo</strong></td><td className="p-3 border">creder-<strong>emmo</strong></td><td className="p-3 border">dormir-<strong>emmo</strong></td></tr>
              <tr><td className="p-3 border font-semibold">voi</td><td className="p-3 border">parler-<strong>este</strong></td><td className="p-3 border">creder-<strong>este</strong></td><td className="p-3 border">dormir-<strong>este</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">loro</td><td className="p-3 border">parler-<strong>ebbero</strong></td><td className="p-3 border">creder-<strong>ebbero</strong></td><td className="p-3 border">dormir-<strong>ebbero</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-pink-50 p-6 rounded-xl border border-pink-200">
        <h3 className="text-xl font-bold text-pink-800 mb-3 flex items-center gap-2">
          💡 E i verbi Irregolari?
        </h3>
        <p className="text-pink-900 leading-relaxed">
          Tutte le irregolarità che hai imparato per il <strong>Futuro Semplice</strong> si applicano in modo assolutamente identico al Condizionale Presente!<br />
          Ad esempio, se "Avere" al futuro diventa <em>avr-ò</em>, al condizionale sarà <em>avr-ei</em>. Se "Essere" è <em>sar-ò</em>, diventerà <em>sar-ei</em>. Se "Andare" è <em>andr-ò</em>, diventerà <em>andr-ei</em>.
          Non hai bisogno di imparare nuove eccezioni!
        </p>
      </section>
    </div>
  );
}

function CondizionalePassatoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Condizionale Passato</h2>
        <p className="text-slate-600 mt-2 text-lg">Desideri irrealizzati, rimpianti e il "futuro nel passato".</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <ul className="list-disc pl-6 space-y-4 text-slate-700 mt-4">
          <li>
            <strong>Azioni non realizzate e rimpianti:</strong><br />
            Per esprimere un desiderio nel passato che non si è potuto concretizzare.<br />
            <span className="italic text-slate-500">Es: <strong>Sarei andato</strong> alla festa, ma ero malato.</span>
          </li>
          <li>
            <strong>Il "Futuro nel Passato":</strong><br />
            Per indicare un'azione successiva a un'altra azione passata (spesso nei discorsi indiretti).<br />
            <span className="italic text-slate-500">Es: Disse che <strong>sarebbe arrivato</strong> alle 8.</span>
          </li>
          <li>
            <strong>Notizie non confermate nel passato:</strong><br />
            Come il condizionale presente, ma per eventi passati.<br />
            <span className="italic text-slate-500">Es: I ladri <strong>sarebbero fuggiti</strong> su un'auto rubata.</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          Come si forma?
        </h3>
        <p className="mb-4 text-slate-700">
          È un tempo composto facilissimo se conosci già gli altri tempi! Si forma con l'ausiliare (<strong>essere</strong> o <strong>avere</strong>) coniugato al <strong>Condizionale Presente</strong> + il <strong>Participio Passato</strong> del verbo principale.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <p className="text-xl font-bold text-indigo-900">Avrei mangiato</p>
            <p className="text-sm text-indigo-600 mt-1">(Condizionale di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <p className="text-xl font-bold text-emerald-900">Sarei andato</p>
            <p className="text-sm text-emerald-600 mt-1">(Condizionale di essere + Participio)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Nota: Le regole per la scelta dell'ausiliare sono identiche a quelle del Passato Prossimo.
        </p>
      </section>
    </div>
  );
}

function CongiuntivoPresenteSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Congiuntivo Presente</h2>
        <p className="text-slate-600 mt-2 text-lg">Opinioni, dubbi, sentimenti e incertezze.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-4 text-slate-700">
          A differenza dell'indicativo (che esprime certezze), il <strong>Congiuntivo</strong> si usa per esprimere soggettività in frasi secondarie, spesso introdotte dalla congiunzione <em>"che"</em>:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>
            <strong>Opinioni e pensieri:</strong> (Credere, pensare, ritenere, supporre)<br />
            <span className="italic text-slate-500">Es: Penso che lui <strong>sia</strong> stanco.</span>
          </li>
          <li>
            <strong>Sentimenti e stati d'animo:</strong> (Essere felice, avere paura, dispiacere)<br />
            <span className="italic text-slate-500">Es: Sono felice che voi <strong>veniate</strong> alla festa.</span>
          </li>
          <li>
            <strong>Volontà, ordini e desideri:</strong> (Volere, preferire, sperare)<br />
            <span className="italic text-slate-500">Es: Voglio che tu <strong>studi</strong> di più.</span>
          </li>
          <li>
            <strong>Espressioni impersonali:</strong> (È importante, bisogna, è probabile)<br />
            <span className="italic text-slate-500">Es: È importante che tutti <strong>capiscano</strong>.</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Regolari: Le Desinenze</h3>
        <p className="mb-4 text-slate-700">Nota la regola incrociata: i verbi in <em>-ARE</em> prendono la <strong>-i</strong>, mentre i verbi in <em>-ERE</em> e <em>-IRE</em> prendono la <strong>-a</strong>. Le prime tre persone singolari (io, tu, lui/lei) sono sempre uguali!</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-900">
                <th className="p-3 border">Persona</th>
                <th className="p-3 border">-ARE (Parlare)</th>
                <th className="p-3 border">-ERE (Credere)</th>
                <th className="p-3 border">-IRE (Dormire)</th>
                <th className="p-3 border">-IRE (Finire) *</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border font-semibold">io</td><td className="p-3 border">parl-<strong>i</strong></td><td className="p-3 border">cred-<strong>a</strong></td><td className="p-3 border">dorm-<strong>a</strong></td><td className="p-3 border">fin-<strong>isca</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">tu</td><td className="p-3 border">parl-<strong>i</strong></td><td className="p-3 border">cred-<strong>a</strong></td><td className="p-3 border">dorm-<strong>a</strong></td><td className="p-3 border">fin-<strong>isca</strong></td></tr>
              <tr><td className="p-3 border font-semibold">lui/lei</td><td className="p-3 border">parl-<strong>i</strong></td><td className="p-3 border">cred-<strong>a</strong></td><td className="p-3 border">dorm-<strong>a</strong></td><td className="p-3 border">fin-<strong>isca</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">noi</td><td className="p-3 border">parl-<strong>iamo</strong></td><td className="p-3 border">cred-<strong>iamo</strong></td><td className="p-3 border">dorm-<strong>iamo</strong></td><td className="p-3 border">fin-<strong>iamo</strong></td></tr>
              <tr><td className="p-3 border font-semibold">voi</td><td className="p-3 border">parl-<strong>iate</strong></td><td className="p-3 border">cred-<strong>iate</strong></td><td className="p-3 border">dorm-<strong>iate</strong></td><td className="p-3 border">fin-<strong>iate</strong></td></tr>
              <tr className="bg-slate-50"><td className="p-3 border font-semibold">loro</td><td className="p-3 border">parl-<strong>ino</strong></td><td className="p-3 border">cred-<strong>ano</strong></td><td className="p-3 border">dorm-<strong>ano</strong></td><td className="p-3 border">fin-<strong>iscano</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-violet-50 p-6 rounded-xl border border-violet-200">
        <h3 className="text-xl font-bold text-violet-800 mb-3 flex items-center gap-2">
          💡 Il "Trucco" per memorizzare il Congiuntivo
        </h3>
        <p className="mb-4 text-violet-900">
          Anche i verbi più irregolari nel congiuntivo seguono in realtà degli schemi utilissimi:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-violet-900">
          <li><strong>Le prime 3 persone sono identiche:</strong> Se sai dire "che io faccia", sai dire anche "che tu faccia" e "che lui faccia".</li>
          <li><strong>Il 'Noi' e il 'Voi' sono facili:</strong> La forma "Noi" è <em>identica</em> a quella dell'Indicativo Presente ("noi facciamo" = "che noi facciamo"). Per il "Voi", ti basta cambiare <em>-mo</em> con <em>-te</em> ("facciamo" $\rightarrow$ "che voi facciate").</li>
          <li><strong>Dalla 1ª persona singolare:</strong> Molti verbi irregolari formano tutto il loro congiuntivo partendo dal presente "Io". Es: io veng-o $\rightarrow$ che io veng-a. io esco $\rightarrow$ che io esca.</li>
        </ul>
      </section>
    </div>
  );
}

function CongiuntivoPassatoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Congiuntivo Passato</h2>
        <p className="text-slate-600 mt-2 text-lg">Opinioni, dubbi e sentimenti su azioni già concluse nel passato.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-4 text-slate-700">
          Usiamo il <strong>Congiuntivo Passato</strong> nelle frasi subordinate (introdotte da <em>"che"</em>) quando il verbo della frase principale è al Presente (o al Futuro), ma l'azione della secondaria è <strong>già successa e finita</strong>.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>
            <strong>Opinioni su un evento passato:</strong><br />
            <span className="italic text-slate-500">Es: Credo che ieri sera Luigi <strong>sia andato</strong> al cinema.</span>
          </li>
          <li>
            <strong>Stati d'animo su fatti passati:</strong><br />
            <span className="italic text-slate-500">Es: Sono felice che voi <strong>abbiate superato</strong> l'esame.</span>
          </li>
          <li>
            <strong>Speranze e dubbi rivolti al passato:</strong><br />
            <span className="italic text-slate-500">Es: Dubito che loro <strong>abbiano capito</strong> il problema.</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          Come si forma?
        </h3>
        <p className="mb-4 text-slate-700">
          È un tempo composto facilissimo: basta prendere l'ausiliare (<strong>essere</strong> o <strong>avere</strong>) coniugato al <strong>Congiuntivo Presente</strong> e aggiungere il <strong>Participio Passato</strong>.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <p className="text-xl font-bold text-indigo-900">Io abbia mangiato</p>
            <p className="text-sm text-indigo-600 mt-1">(Congiuntivo di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <p className="text-xl font-bold text-emerald-900">Lui sia andato</p>
            <p className="text-sm text-emerald-600 mt-1">(Congiuntivo di essere + Participio)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Attenzione: Con l'ausiliare <em>essere</em>, ricordati sempre di accordare l'ultima lettera del participio passato (o, a, i, e) con il soggetto!
        </p>
      </section>
    </div>
  );
}

function CongiuntivoTrapassatoSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">Il Congiuntivo Trapassato</h2>
        <p className="text-slate-600 mt-2 text-lg">Ipotesi irreali nel passato, rimpianti e anteriorità.</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <ul className="list-disc pl-6 space-y-4 text-slate-700 mt-4">
          <li>
            <strong>Ipotesi irreali nel passato (Periodo Ipotetico del 3° tipo):</strong><br />
            Esprime una condizione che non si è verificata nel passato, con conseguenze spesso anch'esse nel passato.<br />
            <span className="italic text-slate-500">Es: Se <strong>avessi studiato</strong> di più, avrei superato l'esame.</span>
          </li>
          <li>
            <strong>Anteriorità nel passato:</strong><br />
            Nelle frasi subordinate introdotte da verbi di opinione, dubbio o sentimento coniugati al passato (credevo, speravo, ecc.), per indicare un'azione avvenuta ancora <em>prima</em>.<br />
            <span className="italic text-slate-500">Es: Pensavo che Luigi <strong>fosse</strong> già <strong>partito</strong>.</span>
          </li>
          <li>
            <strong>Desideri impossibili e rimpianti:</strong><br />
            Spesso introdotti da "magari" o "se solo".<br />
            <span className="italic text-slate-500">Es: Magari <strong>avessi accettato</strong> quell'offerta di lavoro!</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          Come si forma?
        </h3>
        <p className="mb-4 text-slate-700">
          Il Congiuntivo Trapassato è un tempo composto: si forma combinando l'ausiliare (<strong>essere</strong> o <strong>avere</strong>) al <strong>Congiuntivo Imperfetto</strong> con il <strong>Participio Passato</strong> del verbo principale.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <p className="text-xl font-bold text-indigo-900">Io avessi mangiato</p>
            <p className="text-sm text-indigo-600 mt-1">(Congiuntivo Imperfetto di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <p className="text-xl font-bold text-emerald-900">Lui fosse andato</p>
            <p className="text-sm text-emerald-600 mt-1">(Congiuntivo Imperfetto di essere + Participio)</p>
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
        <p className="text-slate-600 mt-2 text-lg">Esplora le coniugazioni per i 12 tempi verbali. Clicca su un verbo per espanderlo.</p>
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
                <div className="p-4 bg-white border-t border-indigo-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  
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

                  {/* Condizionale Presente */}
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                    <div className="flex justify-between items-center mb-3 border-b border-pink-200 pb-2">
                      <h4 className="font-bold text-pink-800 text-lg">Condizionale Pres.</h4>
                      <TypeBadge type={verb.typeCond} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.condizionale[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.condizionale[i]); }}
                                  className="text-slate-400 hover:text-pink-600 transition-colors flex-shrink-0"
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

                  {/* Congiuntivo Presente */}
                  <div className="bg-violet-50 p-4 rounded-lg border border-violet-100">
                    <div className="flex justify-between items-center mb-3 border-b border-violet-200 pb-2">
                      <h4 className="font-bold text-violet-800 text-lg">Congiuntivo Pres.</h4>
                      <TypeBadge type={verb.typeCongPres} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.congiuntivoPresente[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.congiuntivoPresente[i]); }}
                                  className="text-slate-400 hover:text-violet-600 transition-colors flex-shrink-0"
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

                  {/* Congiuntivo Passato */}
                  <div className="bg-fuchsia-50 p-4 rounded-lg border border-fuchsia-100">
                    <div className="flex justify-between items-center mb-3 border-b border-fuchsia-200 pb-2">
                      <h4 className="font-bold text-fuchsia-800 text-lg">Congiuntivo Pass.</h4>
                      <TypeBadge type={verb.typeCongPass} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.congiuntivoPassato[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.congiuntivoPassato[i]); }}
                                  className="text-slate-400 hover:text-fuchsia-600 transition-colors flex-shrink-0"
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

                  {/* Congiuntivo Trapassato */}
                  <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                    <div className="flex justify-between items-center mb-3 border-b border-cyan-200 pb-2">
                      <h4 className="font-bold text-cyan-800 text-lg">Congiuntivo Trap.</h4>
                      <TypeBadge type={verb.typeCongTrap} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.congiuntivoTrapassato[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.congiuntivoTrapassato[i]); }}
                                  className="text-slate-400 hover:text-cyan-600 transition-colors flex-shrink-0"
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

                  {/* Condizionale Passato */}
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <div className="flex justify-between items-center mb-3 border-b border-rose-200 pb-2">
                      <h4 className="font-bold text-rose-800 text-lg">Condizionale Pass.</h4>
                      <TypeBadge type={verb.typeCondPass} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.condizionalePassato[i]}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.condizionalePassato[i]); }}
                                  className="text-slate-400 hover:text-rose-600 transition-colors flex-shrink-0"
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
                      <h4 className="font-bold text-sky-800 text-lg">Trapassato P.</h4>
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

  // Dictation States & Refs
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const currentQuestionRef = useRef(null);

  // Keep ref updated to access inside the speech recognition event listener
  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
  }, [currentQuestion]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'it-IT';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e) => {
      console.error("Speech error", e);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let finalTrans = '';
      let interimTrans = '';
      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTrans += event.results[i][0].transcript;
        else interimTrans += event.results[i][0].transcript;
      }

      const fullText = (finalTrans + ' ' + interimTrans).toLowerCase().replace(/[.,!?]/g, '').trim();
      const words = fullText.split(/\s+/).filter(w => w.length > 0);

      // Filter out subject pronouns so users can dictate with or without them smoothly
      const cleanWords = words.filter(w => !["io", "tu", "lui", "lei", "noi", "voi", "loro", "egli", "ella", "essi", "esse"].includes(w));

      const q = currentQuestionRef.current;
      if (!q) return;

      const isCompound = ['condizionalePassato', 'congiuntivoPassato', 'congiuntivoTrapassato', 'passatoProssimo', 'trapassatoProssimo'].includes(q.tense);

      const groupedWords = [];
      if (isCompound) {
        // Group compound tenses into pairs of words
        for (let i = 0; i < cleanWords.length; i += 2) {
          if (cleanWords[i + 1]) {
            groupedWords.push(cleanWords[i] + ' ' + cleanWords[i + 1]);
          } else {
            groupedWords.push(cleanWords[i]);
          }
        }
      } else {
        groupedWords.push(...cleanWords);
      }

      setUserAnswers(prev => {
        const newAnswers = [...prev];
        let wordIndex = 0;
        for (let i = 0; i < newAnswers.length; i++) {
          if (newAnswers[i] === "-") continue; // Skip disabled fields like Imperativo "io"
          
          // Map transcribed words to the respective inputs dynamically
          newAnswers[i] = wordIndex < groupedWords.length ? groupedWords[wordIndex] : "";
          wordIndex++;
        }
        return newAnswers;
      });
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      const q = currentQuestionRef.current;
      if(q) {
        // Clear current text fields to start fresh dictation
        const emptyAnswers = Array(q.displayPronouns.length).fill("");
        if (q.tense === 'imperativo') emptyAnswers[0] = "-";
        setUserAnswers(emptyAnswers);
      }
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const generateQuestion = (mode = quizMode) => {
    if (recognitionRef.current) recognitionRef.current.stop();
    
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
      const tenses = actualMode === 'misto' ? ['presente', 'imperfetto', 'futuro', 'condizionale', 'condizionalePassato', 'congiuntivoPresente', 'congiuntivoPassato', 'congiuntivoTrapassato', 'passatoProssimo', 'trapassatoProssimo', 'passatoRemoto', 'imperativo'] : [actualMode];
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
    else if (selectedTense === 'condizionale') correctAnswers = selectedVerb.condizionale;
    else if (selectedTense === 'condizionalePassato') correctAnswers = selectedVerb.condizionalePassato;
    else if (selectedTense === 'congiuntivoPresente') correctAnswers = selectedVerb.congiuntivoPresente;
    else if (selectedTense === 'congiuntivoPassato') correctAnswers = selectedVerb.congiuntivoPassato;
    else if (selectedTense === 'congiuntivoTrapassato') correctAnswers = selectedVerb.congiuntivoTrapassato;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (isListening) recognitionRef.current?.stop();

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
    if (tense === 'condizionale') return "Il Condizionale Presente";
    if (tense === 'condizionalePassato') return "Il Condizionale Passato";
    if (tense === 'congiuntivoPresente') return "Il Congiuntivo Presente";
    if (tense === 'congiuntivoPassato') return "Il Congiuntivo Passato";
    if (tense === 'congiuntivoTrapassato') return "Il Congiuntivo Trapassato";
    if (tense === 'passatoRemoto') return 'Il Passato Remoto';
    if (tense === 'passatoProssimo') return 'Il Passato Prossimo';
    if (tense === 'trapassatoProssimo') return 'Il Trapassato Prossimo';
    return "L'Imperativo";
  };

  const getTenseBadgeType = (question) => {
    if (question.tense === 'presente') return question.verb.typePres;
    if (question.tense === 'imperfetto') return question.verb.typeImperf;
    if (question.tense === 'futuro') return question.verb.typeFut;
    if (question.tense === 'condizionale') return question.verb.typeCond;
    if (question.tense === 'condizionalePassato') return question.verb.typeCondPass;
    if (question.tense === 'congiuntivoPresente') return question.verb.typeCongPres;
    if (question.tense === 'congiuntivoPassato') return question.verb.typeCongPass;
    if (question.tense === 'congiuntivoTrapassato') return question.verb.typeCongTrap;
    if (question.tense === 'passatoRemoto') return question.verb.typePR;
    if (question.tense === 'passatoProssimo') return question.verb.typePP;
    if (question.tense === 'trapassatoProssimo') return question.verb.typeTP;
    return question.verb.typeImp;
  };

  const currentBadgeType = getTenseBadgeType(currentQuestion);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-4xl mx-auto">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2 inline-block">Mettiti alla prova!</h2>
        <p className="text-slate-600 mt-2 text-lg">Coniuga il verbo in tutte le persone (puoi usare la dettatura vocale).</p>
        
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm max-w-full">
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
              onClick={() => handleModeChange('condizionale')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'condizionale' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Condizionale
            </button>
            <button
              onClick={() => handleModeChange('condizionalePassato')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'condizionalePassato' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Cond. Pass.
            </button>
            <button
              onClick={() => handleModeChange('congiuntivoPresente')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'congiuntivoPresente' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Congiuntivo Pres.
            </button>
            <button
              onClick={() => handleModeChange('congiuntivoPassato')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'congiuntivoPassato' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Congiuntivo Pass.
            </button>
            <button
              onClick={() => handleModeChange('congiuntivoTrapassato')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'congiuntivoTrapassato' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Congiuntivo Trap.
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

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden max-w-3xl mx-auto">
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

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            {!showResults && speechSupported && (
              <button
                onClick={toggleListening}
                className={`px-5 py-3 font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
                title="Dì i verbi per riempire automaticamente le risposte"
              >
                {isListening ? <Square size={20} /> : <Mic size={20} />}
                <span className="hidden sm:inline">
                  {isListening ? 'Ferma dettatura' : 'Dettatura vocale'}
                </span>
              </button>
            )}
            {isListening && (
              <span className="text-sm text-red-500 font-medium animate-pulse">In ascolto...</span>
            )}
          </div>

          <div>
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
    </div>
  );
}