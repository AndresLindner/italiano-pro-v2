import React, { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, ScrollText, List, ChevronDown, ChevronUp, Info, Volume2, Gamepad2, Check, X, RefreshCw, Clock } from 'lucide-react';

const top50Verbs = [
  {
    infinitive: "essere",
    translation: "to be",
    passatoRemoto: ["fui", "fosti", "fu", "fummo", "foste", "furono"],
    imperativo: ["-", "sii", "sia", "siamo", "siate", "siano"],
    passatoProssimo: ["sono stato/a", "sei stato/a", "è stato/a", "siamo stati/e", "siete stati/e", "sono stati/e"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "avere",
    translation: "to have",
    passatoRemoto: ["ebbi", "avesti", "ebbe", "avemmo", "aveste", "ebbero"],
    imperativo: ["-", "abbi", "abbia", "abbiamo", "abbiate", "abbiano"],
    passatoProssimo: ["ho avuto", "hai avuto", "ha avuto", "abbiamo avuto", "avete avuto", "hanno avuto"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "fare",
    translation: "to do/make",
    passatoRemoto: ["feci", "facesti", "fece", "facemmo", "faceste", "fecero"],
    imperativo: ["-", "fai / fa'", "faccia", "facciamo", "fate", "facciano"],
    passatoProssimo: ["ho fatto", "hai fatto", "ha fatto", "abbiamo fatto", "avete fatto", "hanno fatto"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "dire",
    translation: "to say/tell",
    passatoRemoto: ["dissi", "dicesti", "disse", "dicemmo", "diceste", "dissero"],
    imperativo: ["-", "di'", "dica", "diciamo", "dite", "dicano"],
    passatoProssimo: ["ho detto", "hai detto", "ha detto", "abbiamo detto", "avete detto", "hanno detto"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "potere",
    translation: "to be able/can",
    passatoRemoto: ["potei / potetti", "potesti", "poté / potette", "potemmo", "poteste", "poterono / potettero"],
    imperativo: ["N/A", "Non ha imperativo", "", "", "", ""],
    passatoProssimo: ["ho potuto", "hai potuto", "ha potuto", "abbiamo potuto", "avete potuto", "hanno potuto"],
    typePR: "Irregolare",
    typeImp: "N/A",
    typePP: "Regolare"
  },
  {
    infinitive: "volere",
    translation: "to want",
    passatoRemoto: ["volli", "volesti", "volle", "volemmo", "voleste", "vollero"],
    imperativo: ["-", "vogli", "voglia", "vogliamo", "vogliate", "vogliano"],
    passatoProssimo: ["ho voluto", "hai voluto", "ha voluto", "abbiamo voluto", "avete voluto", "hanno voluto"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "sapere",
    translation: "to know",
    passatoRemoto: ["seppi", "sapesti", "seppe", "sapemmo", "sapeste", "seppero"],
    imperativo: ["-", "sappi", "sappia", "sappiamo", "sappiate", "sappiano"],
    passatoProssimo: ["ho saputo", "hai saputo", "ha saputo", "abbiamo saputo", "avete saputo", "hanno saputo"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "stare",
    translation: "to stay/be",
    passatoRemoto: ["stetti", "stesti", "stette", "stemmo", "steste", "stettero"],
    imperativo: ["-", "stai / sta'", "stia", "stiamo", "state", "stiano"],
    passatoProssimo: ["sono stato/a", "sei stato/a", "è stato/a", "siamo stati/e", "siete stati/e", "sono stati/e"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "dovere",
    translation: "to have to/must",
    passatoRemoto: ["dovei / dovetti", "dovesti", "dové / dovette", "dovemmo", "doveste", "doverono / dovettero"],
    imperativo: ["N/A", "Non ha imperativo", "", "", "", ""],
    passatoProssimo: ["ho dovuto", "hai dovuto", "ha dovuto", "abbiamo dovuto", "avete dovuto", "hanno dovuto"],
    typePR: "Irregolare",
    typeImp: "N/A",
    typePP: "Regolare"
  },
  {
    infinitive: "vedere",
    translation: "to see",
    passatoRemoto: ["vidi", "vedesti", "vide", "vedemmo", "vedeste", "videro"],
    imperativo: ["-", "vedi", "veda", "vediamo", "vedete", "vedano"],
    passatoProssimo: ["ho visto", "hai visto", "ha visto", "abbiamo visto", "avete visto", "hanno visto"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "andare",
    translation: "to go",
    passatoRemoto: ["andai", "andasti", "andò", "andammo", "andaste", "andarono"],
    imperativo: ["-", "vai / va'", "vada", "andiamo", "andate", "vadano"],
    passatoProssimo: ["sono andato/a", "sei andato/a", "è andato/a", "siamo andati/e", "siete andati/e", "sono andati/e"],
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "venire",
    translation: "to come",
    passatoRemoto: ["venni", "venisti", "venne", "venimmo", "veniste", "vennero"],
    imperativo: ["-", "vieni", "venga", "veniamo", "venite", "vengano"],
    passatoProssimo: ["sono venuto/a", "sei venuto/a", "è venuto/a", "siamo venuti/e", "siete venuti/e", "sono venuti/e"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "dare",
    translation: "to give",
    passatoRemoto: ["diedi / detti", "desti", "diede / dette", "demmo", "deste", "diedero / dettero"],
    imperativo: ["-", "dai / da'", "dia", "diamo", "date", "diano"],
    passatoProssimo: ["ho dato", "hai dato", "ha dato", "abbiamo dato", "avete dato", "hanno dato"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "parlare",
    translation: "to speak",
    passatoRemoto: ["parlai", "parlasti", "parlò", "parlammo", "parlaste", "parlarono"],
    imperativo: ["-", "parla", "parli", "parliamo", "parlate", "parlino"],
    passatoProssimo: ["ho parlato", "hai parlato", "ha parlato", "abbiamo parlato", "avete parlato", "hanno parlato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "trovare",
    translation: "to find",
    passatoRemoto: ["trovai", "trovasti", "trovò", "trovammo", "trovaste", "trovarono"],
    imperativo: ["-", "trova", "trovi", "troviamo", "trovate", "trovino"],
    passatoProssimo: ["ho trovato", "hai trovato", "ha trovato", "abbiamo trovato", "avete trovato", "hanno trovato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "sentire",
    translation: "to feel/hear",
    passatoRemoto: ["sentii", "sentisti", "sentì", "sentimmo", "sentiste", "sentirono"],
    imperativo: ["-", "senti", "senta", "sentiamo", "sentite", "sentano"],
    passatoProssimo: ["ho sentito", "hai sentito", "ha sentito", "abbiamo sentito", "avete sentito", "hanno sentito"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "lasciare",
    translation: "to leave",
    passatoRemoto: ["lasciai", "lasciasti", "lasciò", "lasciammo", "lasciaste", "lasciarono"],
    imperativo: ["-", "lascia", "lasci", "lasciamo", "lasciate", "lascino"],
    passatoProssimo: ["ho lasciato", "hai lasciato", "ha lasciato", "abbiamo lasciato", "avete lasciato", "hanno lasciato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "prendere",
    translation: "to take",
    passatoRemoto: ["presi", "prendesti", "prese", "prendemmo", "prendeste", "presero"],
    imperativo: ["-", "prendi", "prenda", "prendiamo", "prendete", "prendano"],
    passatoProssimo: ["ho preso", "hai preso", "ha preso", "abbiamo preso", "avete preso", "hanno preso"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "guardare",
    translation: "to look",
    passatoRemoto: ["guardai", "guardasti", "guardò", "guardammo", "guardaste", "guardarono"],
    imperativo: ["-", "guarda", "guardi", "guardiamo", "guardate", "guardino"],
    passatoProssimo: ["ho guardato", "hai guardato", "ha guardato", "abbiamo guardato", "avete guardato", "hanno guardato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "mettere",
    translation: "to put",
    passatoRemoto: ["misi", "mettesti", "mise", "mettemmo", "metteste", "misero"],
    imperativo: ["-", "metti", "metta", "mettiamo", "mettete", "mettano"],
    passatoProssimo: ["ho messo", "hai messo", "ha messo", "abbiamo messo", "avete messo", "hanno messo"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "capire",
    translation: "to understand",
    passatoRemoto: ["capii", "capisti", "capì", "capimmo", "capiste", "capirono"],
    imperativo: ["-", "capisci", "capisca", "capiamo", "capite", "capiscano"],
    passatoProssimo: ["ho capito", "hai capito", "ha capito", "abbiamo capito", "avete capito", "hanno capito"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "conoscere",
    translation: "to know/meet",
    passatoRemoto: ["conobbi", "conoscesti", "conobbe", "conoscemmo", "conosceste", "conobbero"],
    imperativo: ["-", "conosci", "conosca", "conosciamo", "conoscete", "conoscano"],
    passatoProssimo: ["ho conosciuto", "hai conosciuto", "ha conosciuto", "abbiamo conosciuto", "avete conosciuto", "hanno conosciuto"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "credere",
    translation: "to believe",
    passatoRemoto: ["credei / credetti", "credesti", "credé / credette", "credemmo", "credeste", "crederono / credettero"],
    imperativo: ["-", "credi", "creda", "crediamo", "credete", "credano"],
    passatoProssimo: ["ho creduto", "hai creduto", "ha creduto", "abbiamo creduto", "avete creduto", "hanno creduto"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "pensare",
    translation: "to think",
    passatoRemoto: ["pensai", "pensasti", "pensò", "pensammo", "pensaste", "pensarono"],
    imperativo: ["-", "pensa", "pensi", "pensiamo", "pensate", "pensino"],
    passatoProssimo: ["ho pensato", "hai pensato", "ha pensato", "abbiamo pensato", "avete pensato", "hanno pensato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "portare",
    translation: "to bring/wear",
    passatoRemoto: ["portai", "portasti", "portò", "portammo", "portaste", "portarono"],
    imperativo: ["-", "porta", "porti", "portiamo", "portate", "portino"],
    passatoProssimo: ["ho portato", "hai portato", "ha portato", "abbiamo portato", "avete portato", "hanno portato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "chiamare",
    translation: "to call",
    passatoRemoto: ["chiamai", "chiamasti", "chiamò", "chiamammo", "chiamaste", "chiamarono"],
    imperativo: ["-", "chiama", "chiami", "chiamiamo", "chiamate", "chiamino"],
    passatoProssimo: ["ho chiamato", "hai chiamato", "ha chiamato", "abbiamo chiamato", "avete chiamato", "hanno chiamato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "chiedere",
    translation: "to ask",
    passatoRemoto: ["chiesi", "chiedesti", "chiese", "chiedemmo", "chiedeste", "chiesero"],
    imperativo: ["-", "chiedi", "chieda", "chiediamo", "chiedete", "chiedano"],
    passatoProssimo: ["ho chiesto", "hai chiesto", "ha chiesto", "abbiamo chiesto", "avete chiesto", "hanno chiesto"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "leggere",
    translation: "to read",
    passatoRemoto: ["lessi", "leggesti", "lesse", "leggemmo", "leggeste", "lessero"],
    imperativo: ["-", "leggi", "legga", "leggiamo", "leggete", "leggano"],
    passatoProssimo: ["ho letto", "hai letto", "ha letto", "abbiamo letto", "avete letto", "hanno letto"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "scrivere",
    translation: "to write",
    passatoRemoto: ["scrissi", "scrivesti", "scrisse", "scrivemmo", "scriveste", "scrissero"],
    imperativo: ["-", "scrivi", "scriva", "scriviamo", "scrivete", "scrivano"],
    passatoProssimo: ["ho scritto", "hai scritto", "ha scritto", "abbiamo scritto", "avete scritto", "hanno scritto"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "vivere",
    translation: "to live",
    passatoRemoto: ["vissi", "vivesti", "visse", "vivemmo", "viveste", "vissero"],
    imperativo: ["-", "vivi", "viva", "viviamo", "vivete", "vivano"],
    passatoProssimo: ["ho vissuto", "hai vissuto", "ha vissuto", "abbiamo vissuto", "avete vissuto", "hanno vissuto"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "uscire",
    translation: "to go out",
    passatoRemoto: ["uscii", "uscisti", "uscì", "uscimmo", "usciste", "uscirono"],
    imperativo: ["-", "esci", "esca", "usciamo", "uscite", "escano"],
    passatoProssimo: ["sono uscito/a", "sei uscito/a", "è uscito/a", "siamo usciti/e", "siete usciti/e", "sono usciti/e"],
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "lavorare",
    translation: "to work",
    passatoRemoto: ["lavorai", "lavorasti", "lavorò", "lavorammo", "lavoraste", "lavorarono"],
    imperativo: ["-", "lavora", "lavori", "lavoriamo", "lavorate", "lavorino"],
    passatoProssimo: ["ho lavorato", "hai lavorato", "ha lavorato", "abbiamo lavorato", "avete lavorato", "hanno lavorato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "amare",
    translation: "to love",
    passatoRemoto: ["amai", "amasti", "amò", "amammo", "amaste", "amarono"],
    imperativo: ["-", "ama", "ami", "amiamo", "amate", "amino"],
    passatoProssimo: ["ho amato", "hai amato", "ha amato", "abbiamo amato", "avete amato", "hanno amato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "arrivare",
    translation: "to arrive",
    passatoRemoto: ["arrivai", "arrivasti", "arrivò", "arrivammo", "arrivaste", "arrivarono"],
    imperativo: ["-", "arriva", "arrivi", "arriviamo", "arrivate", "arrivino"],
    passatoProssimo: ["sono arrivato/a", "sei arrivato/a", "è arrivato/a", "siamo arrivati/e", "siete arrivati/e", "sono arrivati/e"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "partire",
    translation: "to leave",
    passatoRemoto: ["partii", "partisti", "partì", "partimmo", "partiste", "partirono"],
    imperativo: ["-", "parti", "parta", "partiamo", "partite", "partano"],
    passatoProssimo: ["sono partito/a", "sei partito/a", "è partito/a", "siamo partiti/e", "siete partiti/e", "sono partiti/e"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "rispondere",
    translation: "to answer",
    passatoRemoto: ["risposi", "rispondesti", "rispose", "rispondemmo", "rispondeste", "risposero"],
    imperativo: ["-", "rispondi", "risponda", "rispondiamo", "rispondete", "rispondano"],
    passatoProssimo: ["ho risposto", "hai risposto", "ha risposto", "abbiamo risposto", "avete risposto", "hanno risposto"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "chiudere",
    translation: "to close",
    passatoRemoto: ["chiusi", "chiudesti", "chiuse", "chiudemmo", "chiudeste", "chiusero"],
    imperativo: ["-", "chiudi", "chiuda", "chiudiamo", "chiudete", "chiudano"],
    passatoProssimo: ["ho chiuso", "hai chiuso", "ha chiuso", "abbiamo chiuso", "avete chiuso", "hanno chiuso"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "aprire",
    translation: "to open",
    passatoRemoto: ["aprii", "apristi", "aprì", "aprimmo", "apriste", "aprirono"],
    imperativo: ["-", "apri", "apra", "apriamo", "aprite", "aprano"],
    passatoProssimo: ["ho aperto", "hai aperto", "ha aperto", "abbiamo aperto", "avete aperto", "hanno aperto"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "bere",
    translation: "to drink",
    passatoRemoto: ["bevvi", "bevesti", "bevve", "bevemmo", "beveste", "bevvero"],
    imperativo: ["-", "bevi", "beva", "beviamo", "bevete", "bevano"],
    passatoProssimo: ["ho bevuto", "hai bevuto", "ha bevuto", "abbiamo bevuto", "avete bevuto", "hanno bevuto"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "mangiare",
    translation: "to eat",
    passatoRemoto: ["mangiai", "mangiasti", "mangiò", "mangiammo", "mangiaste", "mangiarono"],
    imperativo: ["-", "mangia", "mangi", "mangiamo", "mangiate", "mangino"],
    passatoProssimo: ["ho mangiato", "hai mangiato", "ha mangiato", "abbiamo mangiato", "avete mangiato", "hanno mangiato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "dormire",
    translation: "to sleep",
    passatoRemoto: ["dormii", "dormisti", "dormì", "dormimmo", "dormiste", "dormirono"],
    imperativo: ["-", "dormi", "dorma", "dormiamo", "dormite", "dormano"],
    passatoProssimo: ["ho dormito", "hai dormito", "ha dormito", "abbiamo dormito", "avete dormito", "hanno dormito"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "giocare",
    translation: "to play",
    passatoRemoto: ["giocai", "giocasti", "giocò", "giocammo", "giocaste", "giocarono"],
    imperativo: ["-", "gioca", "giochi", "giochiamo", "giocate", "giochino"],
    passatoProssimo: ["ho giocato", "hai giocato", "ha giocato", "abbiamo giocato", "avete giocato", "hanno giocato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "aspettare",
    translation: "to wait",
    passatoRemoto: ["aspettai", "aspettasti", "aspettò", "aspettammo", "aspettaste", "aspettarono"],
    imperativo: ["-", "aspetta", "aspetti", "aspettiamo", "aspettate", "aspettino"],
    passatoProssimo: ["ho aspettato", "hai aspettato", "ha aspettato", "abbiamo aspettato", "avete aspettato", "hanno aspettato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "cercare",
    translation: "to search",
    passatoRemoto: ["cercai", "cercasti", "cercò", "cercammo", "cercaste", "cercarono"],
    imperativo: ["-", "cerca", "cerchi", "cerchiamo", "cercate", "cerchino"],
    passatoProssimo: ["ho cercato", "hai cercato", "ha cercato", "abbiamo cercato", "avete cercato", "hanno cercato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "pagare",
    translation: "to pay",
    passatoRemoto: ["pagai", "pagasti", "pagò", "pagammo", "pagaste", "pagarono"],
    imperativo: ["-", "paga", "paghi", "paghiamo", "pagate", "paghino"],
    passatoProssimo: ["ho pagato", "hai pagato", "ha pagato", "abbiamo pagato", "avete pagato", "hanno pagato"],
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "decidere",
    translation: "to decide",
    passatoRemoto: ["decisi", "decidesti", "decise", "decidemmo", "decideste", "decisero"],
    imperativo: ["-", "decidi", "decida", "decidiamo", "decidete", "decidano"],
    passatoProssimo: ["ho deciso", "hai deciso", "ha deciso", "abbiamo deciso", "avete deciso", "hanno deciso"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "morire",
    translation: "to die",
    passatoRemoto: ["morii", "moristi", "morì", "morimmo", "moriste", "morirono"],
    imperativo: ["-", "muori", "muoia", "moriamo", "morite", "muoiano"],
    passatoProssimo: ["sono morto/a", "sei morto/a", "è morto/a", "siamo morti/e", "siete morti/e", "sono morti/e"],
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "nascere",
    translation: "to be born",
    passatoRemoto: ["nacqui", "nascesti", "nacque", "nascemmo", "nasceste", "nacquero"],
    imperativo: ["-", "nasci", "nasca", "nasciamo", "nascete", "nascano"],
    passatoProssimo: ["sono nato/a", "sei nato/a", "è nato/a", "siamo nati/e", "siete nati/e", "sono nati/e"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "rimanere",
    translation: "to remain/stay",
    passatoRemoto: ["rimasi", "rimanesti", "rimase", "rimanemmo", "rimaneste", "rimasero"],
    imperativo: ["-", "rimani", "rimanga", "rimaniamo", "rimanete", "rimangano"],
    passatoProssimo: ["sono rimasto/a", "sei rimasto/a", "è rimasto/a", "siamo rimasti/e", "siete rimasti/e", "sono rimasti/e"],
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "correre",
    translation: "to run",
    passatoRemoto: ["corsi", "corresti", "corse", "corremmo", "correste", "corsero"],
    imperativo: ["-", "corri", "corra", "corriamo", "correte", "corrano"],
    passatoProssimo: ["ho corso", "hai corso", "ha corso", "abbiamo corso", "avete corso", "hanno corso"],
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  }
];

const pronouns = ["io", "tu", "lui/lei", "noi", "voi", "loro"];
const imperativePronouns = ["(io)", "tu", "Lei (formale)", "noi", "voi"];

export default function App() {
  const [activeTab, setActiveTab] = useState('verbi');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-indigo-900 text-white flex flex-col shadow-xl flex-shrink-0 z-10 sticky top-0 md:h-screen">
        <div className="p-6 bg-indigo-950">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-emerald-400" />
            Italiano<span className="text-indigo-300">Pro</span>
          </h1>
          <p className="text-indigo-200 text-sm mt-1">Impara i verbi difficili</p>
        </div>
        
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          <NavItem 
            icon={<Clock size={20} />} 
            label="Passato Prossimo" 
            isActive={activeTab === 'prossimo'} 
            onClick={() => setActiveTab('prossimo')} 
          />
          <NavItem 
            icon={<ScrollText size={20} />} 
            label="Passato Remoto" 
            isActive={activeTab === 'passato'} 
            onClick={() => setActiveTab('passato')} 
          />
          <NavItem 
            icon={<AlertCircle size={20} />} 
            label="L'Imperativo" 
            isActive={activeTab === 'imperativo'} 
            onClick={() => setActiveTab('imperativo')} 
          />
          <NavItem 
            icon={<List size={20} />} 
            label="I 50 Verbi" 
            isActive={activeTab === 'verbi'} 
            onClick={() => setActiveTab('verbi')} 
          />
          <NavItem 
            icon={<Gamepad2 size={20} />} 
            label="Quiz Pratico" 
            isActive={activeTab === 'quiz'} 
            onClick={() => setActiveTab('quiz')} 
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto">
        {activeTab === 'prossimo' && <PassatoProssimoSection />}
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
      className={`flex items-center gap-3 w-full p-4 text-left font-medium transition-colors whitespace-nowrap
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
    
    // Migliora la pronuncia rimuovendo le forme alterative divise da slash per il TTS
    let cleanWord = word;
    if (word.endsWith('/a') || word.endsWith('/e')) {
      cleanWord = word.slice(0, -2); // Es: "sono andato/a" -> "sono andato"
    } else if (word.includes('/')) {
      cleanWord = word.split('/')[0].trim(); // Es: "fai / fa'" -> "fai"
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
        <p className="text-slate-600 mt-2 text-lg">Esplora le coniugazioni per il Passato Prossimo, Passato Remoto e Imperativo. Clicca su un verbo per espanderlo.</p>
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
                <div className="p-4 bg-white border-t border-indigo-100 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
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

  const generateQuestion = (mode = quizMode) => {
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
      const tenses = actualMode === 'misto' ? ['passatoProssimo', 'passatoRemoto', 'imperativo'] : [actualMode];
      selectedTense = tenses[Math.floor(Math.random() * tenses.length)];
      
      let validVerbs = top50Verbs;
      if (selectedTense === 'imperativo') {
        validVerbs = top50Verbs.filter(v => v.imperativo[1] !== "Non ha imperativo");
      }
      
      selectedVerb = validVerbs[Math.floor(Math.random() * validVerbs.length)];
    }
    
    const displayPronouns = selectedTense === 'imperativo' ? imperativePronouns : pronouns;
    
    let correctAnswers;
    if (selectedTense === 'passatoRemoto') correctAnswers = selectedVerb.passatoRemoto;
    else if (selectedTense === 'passatoProssimo') correctAnswers = selectedVerb.passatoProssimo;
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
  }, []);

  const handleInputChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const isAnswerCorrect = (userAns = "", correctAns) => {
    if (correctAns === "-") return userAns.trim() === "" || userAns.trim() === "-";
    
    let options = [];
    
    // Logica per supportare forme maschili/femminili flessibili ("sono andato/a" o "siamo andati/e")
    if (correctAns.endsWith('/a') || correctAns.endsWith('/e')) {
      const option1 = correctAns.slice(0, -2); // "sono andato" o "siamo andati"
      const option2 = option1.slice(0, -1) + correctAns.slice(-1); // "sono andata" o "siamo andate"
      options = [option1, option2, correctAns];
    } else if (correctAns.includes('/')) {
      options = correctAns.split('/').map(opt => opt.trim());
    } else {
      options = [correctAns];
    }
    
    return options.map(o => o.toLowerCase()).includes(userAns.trim().toLowerCase());
  };

  const checkAnswers = () => {
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
  
  // Determinare il titolo dinamico per il banner del quiz
  const getTenseTitle = (tense) => {
    if (tense === 'passatoRemoto') return 'Il Passato Remoto';
    if (tense === 'passatoProssimo') return 'Il Passato Prossimo';
    return "L'Imperativo";
  };

  // Determinare il badge regolare/irregolare per il quiz
  const getTenseBadgeType = (question) => {
    if (question.tense === 'passatoRemoto') return question.verb.typePR;
    if (question.tense === 'passatoProssimo') return question.verb.typePP;
    return question.verb.typeImp;
  };

  const currentBadgeType = getTenseBadgeType(currentQuestion);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-3xl mx-auto">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2 inline-block">Mettiti alla prova!</h2>
        <p className="text-slate-600 mt-2 text-lg">Coniuga il verbo in tutte le persone.</p>
        
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
            <button
              onClick={() => handleModeChange('misto')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${quizMode === 'misto' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Misto
            </button>
            <button
              onClick={() => handleModeChange('passatoProssimo')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${quizMode === 'passatoProssimo' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              P. Prossimo
            </button>
            <button
              onClick={() => handleModeChange('passatoRemoto')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${quizMode === 'passatoRemoto' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              P. Remoto
            </button>
            <button
              onClick={() => handleModeChange('imperativo')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${quizMode === 'imperativo' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Imperativo
            </button>
            <button
              onClick={() => handleModeChange('ripasso')}
              disabled={mistakes.length === 0 && quizMode !== 'ripasso'}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
                ${quizMode === 'ripasso' ? 'bg-amber-100 text-amber-800' : 
                  mistakes.length > 0 ? 'text-amber-600 hover:bg-amber-50 border border-amber-200' : 'text-slate-300 cursor-not-allowed border border-transparent'}`}
            >
              Ripasso Errori
              {mistakes.length > 0 && (
                <span className={`${quizMode === 'ripasso' ? 'bg-amber-800' : 'bg-amber-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
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

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
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

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
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
  );
}