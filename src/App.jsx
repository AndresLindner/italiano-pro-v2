import { useState, useEffect, useRef } from 'react';
import { BookOpen, AlertCircle, ScrollText, List, ChevronDown, ChevronUp, Info, Volume2, Check, X, RefreshCw, Clock, Sun, History, Archive, Rocket, Lightbulb, Sparkles, LayoutDashboard, Brain, Layers, Milestone, Mic, Square, SkipForward, LogIn, LogOut, BookA, Headphones, PenTool, User, Sliders, Menu, Home } from 'lucide-react';
import { Modulo1Section } from './components/Modulo1Section';
import { VerbConjugatorSection } from './components/VerbConjugatorSection';
import { Modulo2Section } from './components/Modulo2Section';
import { Modulo3Section } from './components/Modulo3Section';
import { Modulo4Section } from './components/Modulo4Section';
import { Modulo5Section } from './components/Modulo5Section';
import { Modulo6Section } from './components/Modulo6Section';
import { Modulo7Section } from './components/Modulo7Section';
import { Modulo8Section } from './components/Modulo8Section';
import { Modulo9Section } from './components/Modulo9Section';
import { Modulo10Section } from './components/Modulo10Section';
import { Modulo11Section } from './components/Modulo11Section';
import { ProfiloSection } from './components/ProfiloSection';
import { SimulazioneEsame } from './components/SimulazioneEsame';
import { LessicoTematicoSection } from './components/LessicoTematicoSection';
import { ErrorReviewSection } from './components/ErrorReviewSection';
import { CongiuntivoImperfettoSection } from './components/CongiuntivoImperfettoSection';
import { Modulo12Section } from './components/Modulo12Section';
import { StrategieB2Section } from './components/StrategieB2Section';
import { SyllabusModuliB2Section } from './components/SyllabusModuliB2Section';
import { WordFormationSection } from './components/WordFormationSection';
import { HomeSection } from './components/HomeSection';
import { useAuth } from './contexts/AuthContext';
import { TensePractice } from './components/TensePractice';
import { 
  eserciziPresente, eserciziImperfetto, eserciziFuturo, eserciziCondizionale, 
  eserciziCondizionalePassato, eserciziCongiuntivoPresente, eserciziCongiuntivoPassato, 
  eserciziCongiuntivoTrapassato, eserciziPassatoProssimo, eserciziTrapassatoProssimo, 
  eserciziPassatoRemoto, eserciziImperativo, eserciziFuturoAnteriore
} from './data/esercizi_tempi';
import { speakItalian } from './utils/speech';

function PlayButton({ text, size = 14 }) {
  return (
    <button
      onClick={() => speakItalian(text)}
      className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors inline-flex items-center justify-center flex-shrink-0"
      title="Ascolta la pronuncia"
    >
      <Volume2 size={size} />
    </button>
  );
}

function VerbCell({ display, speakText, className = "" }) {
  return (
    <td className={`p-3 border ${className}`}>
      <div className="flex items-center justify-between gap-2 min-w-[120px]">
        <span>{display}</span>
        <PlayButton text={speakText} size={15} />
      </div>
    </td>
  );
}

const top100Verbs = [
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
    prep: "a",
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
    prep: "a",
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
    prep: "di",
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
    prep: "di",
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
    prep: "di",
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
    prep: "di",
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
  },
  {
    infinitive: "sembrare",
    translation: "to seem",
    presente: ["sembro", "sembri", "sembra", "sembriamo", "sembrate", "sembrano"],
    imperfetto: ["sembravo", "sembravi", "sembrava", "sembravamo", "sembravate", "sembravano"],
    passatoRemoto: ["sembrai", "sembrasti", "sembrò", "sembrammo", "sembraste", "sembrarono"],
    imperativo: ["-", "sembra", "sembri", "sembriamo", "sembrate", "sembrino"],
    passatoProssimo: ["sono sembrato/a", "sei sembrato/a", "è sembrato/a", "siamo sembrati/e", "siete sembrati/e", "sono sembrati/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "tenere",
    translation: "to hold/keep",
    presente: ["tengo", "tieni", "tiene", "teniamo", "tenete", "tengono"],
    imperfetto: ["tenevo", "tenevi", "teneva", "tenevamo", "tenevate", "tenevano"],
    passatoRemoto: ["tenni", "tenesti", "tenne", "tenemmo", "teneste", "tennero"],
    imperativo: ["-", "tieni", "tenga", "teniamo", "tenete", "tengano"],
    passatoProssimo: ["ho tenuto", "hai tenuto", "ha tenuto", "abbiamo tenuto", "avete tenuto", "hanno tenuto"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "piacere",
    translation: "to like/be pleasing",
    presente: ["piaccio", "piaci", "piace", "piacciamo", "piacete", "piacciono"],
    imperfetto: ["piacevo", "piacevi", "piaceva", "piacevamo", "piacevate", "piacevano"],
    passatoRemoto: ["piacqui", "piacesti", "piacque", "piacemmo", "piaceste", "piacquero"],
    imperativo: ["-", "piaci", "piaccia", "piacciamo", "piacete", "piacciano"],
    passatoProssimo: ["sono piaciuto/a", "sei piaciuto/a", "è piaciuto/a", "siamo piaciuti/e", "siete piaciuti/e", "sono piaciuti/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "provare",
    translation: "to try/feel",
    prep: "a",
    presente: ["provo", "provi", "prova", "proviamo", "provate", "provano"],
    imperfetto: ["provavo", "provavi", "provava", "provavamo", "provavate", "provavano"],
    passatoRemoto: ["provai", "provasti", "provò", "provammo", "provaste", "provarono"],
    imperativo: ["-", "prova", "provi", "proviamo", "provate", "provino"],
    passatoProssimo: ["ho provato", "hai provato", "ha provato", "abbiamo provato", "avete provato", "hanno provato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "usare",
    translation: "to use",
    presente: ["uso", "usi", "usa", "usiamo", "usate", "usano"],
    imperfetto: ["usavo", "usavi", "usava", "usavamo", "usavate", "usavano"],
    passatoRemoto: ["usai", "usasti", "usò", "usammo", "usaste", "usarono"],
    imperativo: ["-", "usa", "usi", "usiamo", "usate", "usino"],
    passatoProssimo: ["ho usato", "hai usato", "ha usato", "abbiamo usato", "avete usato", "hanno usato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "ricordare",
    translation: "to remember",
    presente: ["ricordo", "ricordi", "ricorda", "ricordiamo", "ricordate", "ricordano"],
    imperfetto: ["ricordavo", "ricordavi", "ricordava", "ricordavamo", "ricordavate", "ricordavano"],
    passatoRemoto: ["ricordai", "ricordasti", "ricordò", "ricordammo", "ricordaste", "ricordarono"],
    imperativo: ["-", "ricorda", "ricordi", "ricordiamo", "ricordate", "ricordino"],
    passatoProssimo: ["ho ricordato", "hai ricordato", "ha ricordato", "abbiamo ricordato", "avete ricordato", "hanno ricordato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "dimenticare",
    translation: "to forget",
    prep: "di",
    presente: ["dimentico", "dimentichi", "dimentica", "dimentichiamo", "dimenticate", "dimenticano"],
    imperfetto: ["dimenticavo", "dimenticavi", "dimenticava", "dimenticavamo", "dimenticavate", "dimenticavano"],
    passatoRemoto: ["dimenticai", "dimenticasti", "dimenticò", "dimenticammo", "dimenticaste", "dimenticarono"],
    imperativo: ["-", "dimentica", "dimentichi", "dimentichiamo", "dimenticate", "dimentichino"],
    passatoProssimo: ["ho dimenticato", "hai dimenticato", "ha dimenticato", "abbiamo dimenticato", "avete dimenticato", "hanno dimenticato"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "succedere",
    translation: "to happen",
    presente: ["succedo", "succedi", "succede", "succediamo", "succedete", "succedono"],
    imperfetto: ["succedevo", "succedevi", "succedeva", "succedevamo", "succedevate", "succedevano"],
    passatoRemoto: ["successi", "succedesti", "successe", "succedemmo", "succedeste", "successero"],
    imperativo: ["-", "succedi", "succeda", "succediamo", "succedete", "succedano"],
    passatoProssimo: ["è successo/a", "sei successo/a", "è successo/a", "siamo successi/e", "siete successi/e", "sono successi/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "tornare",
    translation: "to return/come back",
    presente: ["torno", "torni", "torna", "torniamo", "tornate", "tornano"],
    imperfetto: ["tornavo", "tornavi", "tornava", "tornavamo", "tornavate", "tornavano"],
    passatoRemoto: ["tornai", "tornasti", "tornò", "tornammo", "tornaste", "tornarono"],
    imperativo: ["-", "torna", "torni", "torniamo", "tornate", "tornino"],
    passatoProssimo: ["sono tornato/a", "sei tornato/a", "è tornato/a", "siamo tornati/e", "siete tornati/e", "sono tornati/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "cambiare",
    translation: "to change",
    presente: ["cambio", "cambi", "cambia", "cambiamo", "cambiate", "cambiano"],
    imperfetto: ["cambiavo", "cambiavi", "cambiava", "cambiavamo", "cambiavate", "cambiavano"],
    passatoRemoto: ["cambiai", "cambiasti", "cambiò", "cambiammo", "cambiaste", "cambiarono"],
    imperativo: ["-", "cambia", "cambi", "cambiamo", "cambiate", "cambino"],
    passatoProssimo: ["ho cambiato", "hai cambiato", "ha cambiato", "abbiamo cambiato", "avete cambiato", "hanno cambiato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "continuare",
    translation: "to continue",
    prep: "a",
    presente: ["continuo", "continui", "continua", "continuiamo", "continuate", "continuano"],
    imperfetto: ["continuavo", "continuavi", "continuava", "continuavamo", "continuavate", "continuavano"],
    passatoRemoto: ["continuai", "continuasti", "continuò", "continuammo", "continuaste", "continuarono"],
    imperativo: ["-", "continua", "continui", "continuiamo", "continuate", "continuino"],
    passatoProssimo: ["ho continuato", "hai continuato", "ha continuato", "abbiamo continuato", "avete continuato", "hanno continuato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "iniziare",
    translation: "to start",
    prep: "a",
    presente: ["inizio", "inizi", "inizia", "iniziamo", "iniziate", "iniziano"],
    imperfetto: ["iniziavo", "iniziavi", "iniziava", "iniziavamo", "iniziavate", "iniziavano"],
    passatoRemoto: ["iniziai", "iniziasti", "iniziò", "iniziammo", "iniziaste", "iniziarono"],
    imperativo: ["-", "inizia", "inizi", "iniziamo", "iniziate", "inizino"],
    passatoProssimo: ["ho iniziato", "hai iniziato", "ha iniziato", "abbiamo iniziato", "avete iniziato", "hanno iniziato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "cominciare",
    translation: "to begin",
    prep: "a",
    presente: ["comincio", "cominci", "comincia", "cominciamo", "cominciate", "cominciano"],
    imperfetto: ["cominciavo", "cominciavi", "cominciava", "cominciavamo", "cominciavate", "cominciavano"],
    passatoRemoto: ["cominciai", "cominciasti", "cominciò", "cominciammo", "cominciaste", "cominciarono"],
    imperativo: ["-", "comincia", "cominci", "cominciamo", "cominciate", "comincino"],
    passatoProssimo: ["ho cominciato", "hai cominciato", "ha cominciato", "abbiamo cominciato", "avete cominciato", "hanno cominciato"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "finire",
    translation: "to finish",
    prep: "di",
    presente: ["finisco", "finisci", "finisce", "finiamo", "finite", "finiscono"],
    imperfetto: ["finivo", "finivi", "finiva", "finivamo", "finivate", "finivano"],
    passatoRemoto: ["finii", "finisti", "finì", "finimmo", "finiste", "finirono"],
    imperativo: ["-", "finisci", "finisca", "finiamo", "finite", "finiscano"],
    passatoProssimo: ["ho finito", "hai finito", "ha finito", "abbiamo finito", "avete finito", "hanno finito"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "fermare",
    translation: "to stop",
    presente: ["fermo", "fermi", "ferma", "fermiamo", "fermate", "fermano"],
    imperfetto: ["fermavo", "fermavi", "fermava", "fermavamo", "fermavate", "fermavano"],
    passatoRemoto: ["fermai", "fermasti", "fermò", "fermammo", "fermaste", "fermarono"],
    imperativo: ["-", "ferma", "fermi", "fermiamo", "fermate", "fermino"],
    passatoProssimo: ["ho fermato", "hai fermato", "ha fermato", "abbiamo fermato", "avete fermato", "hanno fermato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "scendere",
    translation: "to go down/descend",
    presente: ["scendo", "scendi", "scende", "scendiamo", "scendete", "scendono"],
    imperfetto: ["scendevo", "scendevi", "scendeva", "scendevamo", "scendevate", "scendevano"],
    passatoRemoto: ["scesi", "scendesti", "scese", "scendemmo", "scendeste", "scesero"],
    imperativo: ["-", "scendi", "scenda", "scendiamo", "scendete", "scendano"],
    passatoProssimo: ["sono sceso/a", "sei sceso/a", "è sceso/a", "siamo scesi/e", "siete scesi/e", "sono scesi/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "salire",
    translation: "to go up/climb",
    presente: ["salgo", "sali", "sale", "saliamo", "salite", "salgono"],
    imperfetto: ["salivo", "salivi", "saliva", "salivamo", "salivate", "salivano"],
    passatoRemoto: ["salii", "salisti", "salì", "salimmo", "saliste", "salirono"],
    imperativo: ["-", "sali", "salga", "saliamo", "salite", "salgano"],
    passatoProssimo: ["sono salito/a", "sei salito/a", "è salito/a", "siamo saliti/e", "siete saliti/e", "sono saliti/e"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "cadere",
    translation: "to fall",
    presente: ["cado", "cadi", "cade", "cadiamo", "cadete", "cadono"],
    imperfetto: ["cadevo", "cadevi", "cadeva", "cadevamo", "cadevate", "cadevano"],
    passatoRemoto: ["caddi", "cadesti", "cadde", "cademmo", "cadeste", "caddero"],
    imperativo: ["-", "cadi", "cada", "cadiamo", "cadete", "cadano"],
    passatoProssimo: ["sono caduto/a", "sei caduto/a", "è caduto/a", "siamo caduti/e", "siete caduti/e", "sono caduti/e"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "perdere",
    translation: "to lose",
    presente: ["perdo", "perdi", "perde", "perdiamo", "perdete", "perdono"],
    imperfetto: ["perdevo", "perdevi", "perdeva", "perdevamo", "perdevate", "perdevano"],
    passatoRemoto: ["persi", "perdesti", "perse", "perdemmo", "perdeste", "persero"],
    imperativo: ["-", "perdi", "perda", "perdiamo", "perdete", "perdano"],
    passatoProssimo: ["ho perso", "hai perso", "ha perso", "abbiamo perso", "avete perso", "hanno perso"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "vincere",
    translation: "to win",
    presente: ["vinco", "vinci", "vince", "vinciamo", "vincete", "vincono"],
    imperfetto: ["vincevo", "vincevi", "vinceva", "vincevamo", "vincevate", "vincevano"],
    passatoRemoto: ["vinsi", "vincesti", "vinse", "vincemmo", "vinceste", "vinsero"],
    imperativo: ["-", "vinci", "vinca", "vinciamo", "vincete", "vincano"],
    passatoProssimo: ["ho vinto", "hai vinto", "ha vinto", "abbiamo vinto", "avete vinto", "hanno vinto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "comprare",
    translation: "to buy",
    presente: ["compro", "compri", "compra", "compriamo", "comprate", "comprano"],
    imperfetto: ["compravo", "compravi", "comprava", "compravamo", "compravate", "compravano"],
    passatoRemoto: ["comprai", "comprasti", "comprò", "comprammo", "compraste", "comprarono"],
    imperativo: ["-", "compra", "compri", "compriamo", "comprate", "comprino"],
    passatoProssimo: ["ho comprato", "hai comprato", "ha comprato", "abbiamo comprato", "avete comprato", "hanno comprato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "vendere",
    translation: "to sell",
    presente: ["vendo", "vendi", "vende", "vendiamo", "vendete", "vendono"],
    imperfetto: ["vendevo", "vendevi", "vendeva", "vendevamo", "vendevate", "vendevano"],
    passatoRemoto: ["vendei / vendetti", "vendesti", "vendé / vendette", "vendemmo", "vendeste", "venderono / vendettero"],
    imperativo: ["-", "vendi", "venda", "vendiamo", "vendete", "vendano"],
    passatoProssimo: ["ho venduto", "hai venduto", "ha venduto", "abbiamo venduto", "avete venduto", "hanno venduto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "aiutare",
    translation: "to help",
    presente: ["aiuto", "aiuti", "aiuta", "aiutiamo", "aiutate", "aiutano"],
    imperfetto: ["aiutavo", "aiutavi", "aiutava", "aiutavamo", "aiutavate", "aiutavano"],
    passatoRemoto: ["aiutai", "aiutasti", "aiutò", "aiutammo", "aiutaste", "aiutarono"],
    imperativo: ["-", "aiuta", "aiuti", "aiutiamo", "aiutate", "aiutino"],
    passatoProssimo: ["ho aiutato", "hai aiutato", "ha aiutato", "abbiamo aiutato", "avete aiutato", "hanno aiutato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "sperare",
    translation: "to hope",
    prep: "di",
    presente: ["spero", "speri", "spera", "speriamo", "sperate", "sperano"],
    imperfetto: ["speravo", "speravi", "sperava", "speravamo", "speravate", "speravano"],
    passatoRemoto: ["sperai", "sperasti", "sperò", "sperammo", "speraste", "sperarono"],
    imperativo: ["-", "spera", "speri", "speriamo", "sperate", "sperino"],
    passatoProssimo: ["ho sperato", "hai sperato", "ha sperato", "abbiamo sperato", "avete sperato", "hanno sperato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "ascoltare",
    translation: "to listen",
    presente: ["ascolto", "ascolti", "ascolta", "ascoltiamo", "ascoltate", "ascoltano"],
    imperfetto: ["ascoltavo", "ascoltavi", "ascoltava", "ascoltavamo", "ascoltavate", "ascoltavano"],
    passatoRemoto: ["ascoltai", "ascoltasti", "ascoltò", "ascoltammo", "ascoltaste", "ascoltarono"],
    imperativo: ["-", "ascolta", "ascolti", "ascoltiamo", "ascoltate", "ascoltino"],
    passatoProssimo: ["ho ascoltato", "hai ascoltato", "ha ascoltato", "abbiamo ascoltato", "avete ascoltato", "hanno ascoltato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "mandare",
    translation: "to send",
    presente: ["mando", "mandi", "manda", "mandiamo", "mandate", "mandano"],
    imperfetto: ["mandavo", "mandavi", "mandava", "mandavamo", "mandavate", "mandavano"],
    passatoRemoto: ["mandai", "mandasti", "mandò", "mandammo", "mandaste", "mandarono"],
    imperativo: ["-", "manda", "mandi", "mandiamo", "mandate", "mandino"],
    passatoProssimo: ["ho mandato", "hai mandato", "ha mandato", "abbiamo mandato", "avete mandato", "hanno mandato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "ricevere",
    translation: "to receive",
    presente: ["ricevo", "ricevi", "riceve", "riceviamo", "ricevete", "ricevono"],
    imperfetto: ["ricevevo", "ricevevi", "riceveva", "ricevevamo", "ricevevate", "ricevevano"],
    passatoRemoto: ["ricevei", "ricevesti", "ricevé", "ricevemmo", "riceveste", "riceverono"],
    imperativo: ["-", "ricevi", "riceva", "riceviamo", "ricevete", "ricevano"],
    passatoProssimo: ["ho ricevuto", "hai ricevuto", "ha ricevuto", "abbiamo ricevuto", "avete ricevuto", "hanno ricevuto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "spiegare",
    translation: "to explain",
    presente: ["spiego", "spieghi", "spiega", "spieghiamo", "spiegate", "spiegano"],
    imperfetto: ["spiegavo", "spiegavi", "spiegava", "spiegavamo", "spiegavate", "spiegavano"],
    passatoRemoto: ["spiegai", "spiegasti", "spiegò", "spiegammo", "spiegaste", "spiegarono"],
    imperativo: ["-", "spiega", "spieghi", "spieghiamo", "spiegate", "spieghino"],
    passatoProssimo: ["ho spiegato", "hai spiegato", "ha spiegato", "abbiamo spiegato", "avete spiegato", "hanno spiegato"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "imparare",
    translation: "to learn",
    prep: "a",
    presente: ["imparo", "impari", "impara", "impariamo", "imparate", "imparano"],
    imperfetto: ["imparavo", "imparavi", "imparava", "imparavamo", "imparavate", "imparavano"],
    passatoRemoto: ["imparai", "imparasti", "imparò", "imparammo", "imparaste", "impararono"],
    imperativo: ["-", "impara", "impari", "impariamo", "imparate", "imparino"],
    passatoProssimo: ["ho imparato", "hai imparato", "ha imparato", "abbiamo imparato", "avete imparato", "hanno imparato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "studiare",
    translation: "to study",
    presente: ["studio", "studi", "studia", "studiamo", "studiate", "studiano"],
    imperfetto: ["studiavo", "studiavi", "studiava", "studiavamo", "studiavate", "studiavano"],
    passatoRemoto: ["studiai", "studiasti", "studiò", "studiammo", "studiaste", "studiarono"],
    imperativo: ["-", "studia", "studi", "studiamo", "studiate", "studino"],
    passatoProssimo: ["ho studiato", "hai studiato", "ha studiato", "abbiamo studiato", "avete studiato", "hanno studiato"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "insegnare",
    translation: "to teach",
    presente: ["insegno", "insegni", "insegna", "insegniamo", "insegnate", "insegnano"],
    imperfetto: ["insegnavo", "insegnavi", "insegnava", "insegnavamo", "insegnavate", "insegnavano"],
    passatoRemoto: ["insegnai", "insegnasti", "insegnò", "insegnammo", "insegnaste", "insegnarono"],
    imperativo: ["-", "insegna", "insegni", "insegniamo", "insegnate", "insegnino"],
    passatoProssimo: ["ho insegnato", "hai insegnato", "ha insegnato", "abbiamo insegnato", "avete insegnato", "hanno insegnato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "incontrare",
    translation: "to meet",
    presente: ["incontro", "incontri", "incontra", "incontriamo", "incontrate", "incontrano"],
    imperfetto: ["incontravo", "incontravi", "incontrava", "incontravamo", "incontravate", "incontravano"],
    passatoRemoto: ["incontrai", "incontrasti", "incontrò", "incontrammo", "incontraste", "incontrarono"],
    imperativo: ["-", "incontra", "incontri", "incontriamo", "incontrate", "incontrino"],
    passatoProssimo: ["ho incontrato", "hai incontrato", "ha incontrato", "abbiamo incontrato", "avete incontrato", "hanno incontrato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "scegliere",
    translation: "to choose",
    presente: ["scelgo", "scegli", "sceglie", "scegliamo", "scegliete", "scelgono"],
    imperfetto: ["sceglievo", "sceglievi", "sceglieva", "sceglievamo", "sceglievate", "sceglievano"],
    passatoRemoto: ["scelsi", "scegliesti", "scelse", "scegliemmo", "sceglieste", "scelsero"],
    imperativo: ["-", "scegli", "scelga", "scegliamo", "scegliete", "scelgano"],
    passatoProssimo: ["ho scelto", "hai scelto", "ha scelto", "abbiamo scelto", "avete scelto", "hanno scelto"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Irregolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "viaggiare",
    translation: "to travel",
    presente: ["viaggio", "viaggi", "viaggia", "viaggiamo", "viaggiate", "viaggiano"],
    imperfetto: ["viaggiavo", "viaggiavi", "viaggiava", "viaggiavamo", "viaggiavate", "viaggiavano"],
    passatoRemoto: ["viaggiai", "viaggiasti", "viaggiò", "viaggiammo", "viaggiaste", "viaggiarono"],
    imperativo: ["-", "viaggia", "viaggi", "viaggiamo", "viaggiate", "viaggino"],
    passatoProssimo: ["ho viaggiato", "hai viaggiato", "ha viaggiato", "abbiamo viaggiato", "avete viaggiato", "hanno viaggiato"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "camminare",
    translation: "to walk",
    presente: ["cammino", "cammini", "cammina", "camminiamo", "camminate", "camminano"],
    imperfetto: ["camminavo", "camminavi", "camminava", "camminavamo", "camminavate", "camminavano"],
    passatoRemoto: ["camminai", "camminasti", "camminò", "camminammo", "camminaste", "camminarono"],
    imperativo: ["-", "cammina", "cammini", "camminiamo", "camminate", "camminino"],
    passatoProssimo: ["ho camminato", "hai camminato", "ha camminato", "abbiamo camminato", "avete camminato", "hanno camminato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "guidare",
    translation: "to drive",
    presente: ["guido", "guidi", "guida", "guidiamo", "guidate", "guidano"],
    imperfetto: ["guidavo", "guidavi", "guidava", "guidavamo", "guidavate", "guidavano"],
    passatoRemoto: ["guidai", "guidasti", "guidò", "guidammo", "guidaste", "guidarono"],
    imperativo: ["-", "guida", "guidi", "guidiamo", "guidate", "guidino"],
    passatoProssimo: ["ho guidato", "hai guidato", "ha guidato", "abbiamo guidato", "avete guidato", "hanno guidato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "preparare",
    translation: "to prepare",
    presente: ["preparo", "prepari", "prepara", "prepariamo", "preparate", "preparano"],
    imperfetto: ["preparavo", "preparavi", "preparava", "preparavamo", "preparavate", "preparavano"],
    passatoRemoto: ["preparai", "preparasti", "preparò", "preparammo", "preparaste", "prepararono"],
    imperativo: ["-", "prepara", "prepari", "prepariamo", "preparate", "preparino"],
    passatoProssimo: ["ho preparato", "hai preparato", "ha preparato", "abbiamo preparato", "avete preparato", "hanno preparato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "cucinare",
    translation: "to cook",
    presente: ["cucino", "cucini", "cucina", "cuciniamo", "cucinate", "cucinano"],
    imperfetto: ["cucinavo", "cucinavi", "cucinava", "cucinavamo", "cucinavate", "cucinavano"],
    passatoRemoto: ["cucinai", "cucinasti", "cucinò", "cucinammo", "cucinaste", "cucinarono"],
    imperativo: ["-", "cucina", "cucini", "cuciniamo", "cucinate", "cucinino"],
    passatoProssimo: ["ho cucinato", "hai cucinato", "ha cucinato", "abbiamo cucinato", "avete cucinato", "hanno cucinato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "pulire",
    translation: "to clean",
    presente: ["pulisco", "pulisci", "pulisce", "puliamo", "pulite", "puliscono"],
    imperfetto: ["pulivo", "pulivi", "puliva", "pulivamo", "pulivate", "pulivano"],
    passatoRemoto: ["pulii", "pulisti", "pulì", "pulimmo", "puliste", "pulirono"],
    imperativo: ["-", "pulisci", "pulisca", "puliamo", "pulite", "puliscano"],
    passatoProssimo: ["ho pulito", "hai pulito", "ha pulito", "abbiamo pulito", "avete pulito", "hanno pulito"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
  },
  {
    infinitive: "lavare",
    translation: "to wash",
    presente: ["lavo", "lavi", "lava", "laviamo", "lavate", "lavano"],
    imperfetto: ["lavavo", "lavavi", "lavava", "lavavamo", "lavavate", "lavavano"],
    passatoRemoto: ["lavai", "lavasti", "lavò", "lavammo", "lavaste", "lavarono"],
    imperativo: ["-", "lava", "lavi", "laviamo", "lavate", "lavino"],
    passatoProssimo: ["ho lavato", "hai lavato", "ha lavato", "abbiamo lavato", "avete lavato", "hanno lavato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "svegliare",
    translation: "to wake up",
    presente: ["sveglio", "svegli", "sveglia", "svegliamo", "svegliate", "svegliano"],
    imperfetto: ["svegliavo", "svegliavi", "svegliava", "svegliavamo", "svegliavate", "svegliavano"],
    passatoRemoto: ["svegliai", "svegliasti", "svegliò", "svegliammo", "svegliaste", "svegliarono"],
    imperativo: ["-", "sveglia", "svegli", "svegliamo", "svegliate", "sveglino"],
    passatoProssimo: ["ho svegliato", "hai svegliato", "ha svegliato", "abbiamo svegliato", "avete svegliato", "hanno svegliato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "ridere",
    translation: "to laugh",
    presente: ["rido", "ridi", "ride", "ridiamo", "ridete", "ridono"],
    imperfetto: ["ridevo", "ridevi", "rideva", "ridevamo", "ridevate", "ridevano"],
    passatoRemoto: ["risi", "ridesti", "rise", "ridemmo", "rideste", "risero"],
    imperativo: ["-", "ridi", "rida", "ridiamo", "ridete", "ridano"],
    passatoProssimo: ["ho riso", "hai riso", "ha riso", "abbiamo riso", "avete riso", "hanno riso"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "sorridere",
    translation: "to smile",
    presente: ["sorrido", "sorridi", "sorride", "sorridiamo", "sorridete", "sorridono"],
    imperfetto: ["sorridevo", "sorridevi", "sorrideva", "sorridevamo", "sorridevate", "sorridevano"],
    passatoRemoto: ["sorrisi", "sorridesti", "sorrise", "sorridemmo", "sorrideste", "sorrisero"],
    imperativo: ["-", "sorridi", "sorrida", "sorridiamo", "sorridete", "sorridano"],
    passatoProssimo: ["ho sorriso", "hai sorriso", "ha sorriso", "abbiamo sorriso", "avete sorriso", "hanno sorriso"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "piangere",
    translation: "to cry",
    presente: ["piango", "piangi", "piange", "piangiamo", "piangete", "piangono"],
    imperfetto: ["piangevo", "piangevi", "piangeva", "piangevamo", "piangevate", "piangevano"],
    passatoRemoto: ["piansi", "piangesti", "pianse", "piangemmo", "piangeste", "piansero"],
    imperativo: ["-", "piangi", "pianga", "piangiamo", "piangete", "piangano"],
    passatoProssimo: ["ho pianto", "hai pianto", "ha pianto", "abbiamo pianto", "avete pianto", "hanno pianto"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Irregolare",
    typeImp: "Regolare",
    typePP: "Irregolare"
  },
  {
    infinitive: "cantare",
    translation: "to sing",
    presente: ["canto", "canti", "canta", "cantiamo", "cantate", "cantano"],
    imperfetto: ["cantavo", "cantavi", "cantava", "cantavamo", "cantavate", "cantavano"],
    passatoRemoto: ["cantai", "cantasti", "cantò", "cantammo", "cantaste", "cantarono"],
    imperativo: ["-", "canta", "canti", "cantiamo", "cantate", "cantino"],
    passatoProssimo: ["ho cantato", "hai cantato", "ha cantato", "abbiamo cantato", "avete cantato", "hanno cantato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "ballare",
    translation: "to dance",
    presente: ["ballo", "balli", "balla", "balliamo", "ballate", "ballano"],
    imperfetto: ["ballavo", "ballavi", "ballava", "ballavamo", "ballavate", "ballavano"],
    passatoRemoto: ["ballai", "ballasti", "ballò", "ballammo", "ballaste", "ballarono"],
    imperativo: ["-", "balla", "balli", "balliamo", "ballate", "ballino"],
    passatoProssimo: ["ho ballato", "hai ballato", "ha ballato", "abbiamo ballato", "avete ballato", "hanno ballato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "saltare",
    translation: "to jump",
    presente: ["salto", "salti", "salta", "saltiamo", "saltate", "saltano"],
    imperfetto: ["saltavo", "saltavi", "saltava", "saltavamo", "saltavate", "saltavano"],
    passatoRemoto: ["saltai", "saltasti", "saltò", "saltammo", "saltaste", "saltarono"],
    imperativo: ["-", "salta", "salti", "saltiamo", "saltate", "saltino"],
    passatoProssimo: ["ho saltato", "hai saltato", "ha saltato", "abbiamo saltato", "avete saltato", "hanno saltato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "mostrare",
    translation: "to show",
    presente: ["mostro", "mostri", "mostra", "mostriamo", "mostrate", "mostrano"],
    imperfetto: ["mostravo", "mostravi", "mostrava", "mostravamo", "mostravate", "mostravano"],
    passatoRemoto: ["mostrai", "mostrasti", "mostrò", "mostrammo", "mostraste", "mostrarono"],
    imperativo: ["-", "mostra", "mostri", "mostriamo", "mostrate", "mostrino"],
    passatoProssimo: ["ho mostrato", "hai mostrato", "ha mostrato", "abbiamo mostrato", "avete mostrato", "hanno mostrato"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "servire",
    translation: "to serve/be needed",
    presente: ["servo", "servi", "serve", "serviamo", "servite", "servono"],
    imperfetto: ["servivo", "servivi", "serviva", "servivamo", "servivate", "servivano"],
    passatoRemoto: ["servii", "servisti", "servì", "servimmo", "serviste", "servirono"],
    imperativo: ["-", "servi", "serva", "serviamo", "servite", "servano"],
    passatoProssimo: ["ho servito", "hai servito", "ha servito", "abbiamo servito", "avete servito", "hanno servito"],
    typePres: "Regolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Regolare",
    typePP: "Regolare"
  },
  {
    infinitive: "ringraziare",
    translation: "to thank",
    presente: ["ringrazio", "ringrazi", "ringrazia", "ringraziamo", "ringraziate", "ringraziano"],
    imperfetto: ["ringraziavo", "ringraziavi", "ringraziava", "ringraziavamo", "ringraziavate", "ringraziavano"],
    passatoRemoto: ["ringraziai", "ringraziasti", "ringraziò", "ringraziammo", "ringraziaste", "ringraziarono"],
    imperativo: ["-", "ringrazia", "ringrazi", "ringraziamo", "ringraziate", "ringrazino"],
    passatoProssimo: ["ho ringraziato", "hai ringraziato", "ha ringraziato", "abbiamo ringraziato", "avete ringraziato", "hanno ringraziato"],
    typePres: "Irregolare",
    typeImperf: "Regolare",
    typePR: "Regolare",
    typeImp: "Irregolare",
    typePP: "Regolare"
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
top100Verbs.forEach(verb => {
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

  // Congiuntivo Imperfetto
  let congImpStem;
  if (inf === "essere") {
    congImpStem = "fo";
  } else if (inf === "dare") {
    congImpStem = "de";
  } else if (inf === "stare") {
    congImpStem = "ste";
  } else {
    congImpStem = verb.imperfetto[0].slice(0, -2);
  }
  
  verb.congiuntivoImperfetto = [
    congImpStem + "ssi",
    congImpStem + "ssi",
    congImpStem + "sse",
    congImpStem + "ssimo",
    congImpStem + "ste",
    congImpStem + "ssero"
  ];
  
  verb.typeCongImp = ["essere", "dare", "stare"].includes(inf) ? "Irregolare" : verb.typeImperf;
});

const pronouns = ["io", "tu", "lui/lei", "noi", "voi", "loro"];
const imperativePronouns = ["(io)", "tu", "Lei (formale)", "noi", "voi"];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userErrors } = useAuth() || { userErrors: {} };
  const errorCount = Object.keys(userErrors || {}).length;
  const quizErrorCount = Object.values(userErrors || {}).filter(e => e.type === 'quiz_verb').length;

  const selectTab = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 text-slate-800 font-sans flex flex-col md:flex-row">

      {/* Mobile Top Header Bar */}
      <header className="md:hidden w-full bg-gradient-to-r from-indigo-950 to-slate-900 text-white flex items-center justify-between px-5 py-4 sticky top-0 z-30 shadow-md border-b border-indigo-900/30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-1.5 hover:bg-white/10 rounded-lg text-indigo-200 hover:text-white transition-colors"
            aria-label="Apri menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-black flex items-center gap-2">
            <BookOpen className="text-emerald-400" size={20} />
            Italiano<span className="text-indigo-300 font-medium">Pro</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">B2</span>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <nav className={`md:hidden fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-in-out border-r border-indigo-950/20 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 bg-indigo-950/40 border-b border-indigo-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="text-emerald-400" size={22} />
            <span className="text-xl font-black">Italiano<span className="text-indigo-300 font-medium">Pro</span></span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-indigo-200 hover:text-white transition-colors"
            aria-label="Chiudi menu"
          >
            <X size={20} />
          </button>
        </div>

        <UserProfile />

        <div className="flex-1 overflow-y-auto">
          <NavigationContent activeTab={activeTab} selectTab={selectTab} errorCount={errorCount} />
        </div>
      </nav>

      {/* Desktop Sidebar Navigation (Always Visible on Desktop) */}
      <nav className="hidden md:flex w-64 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white flex-col shadow-2xl flex-shrink-0 z-10 sticky top-0 h-screen overflow-y-auto border-r border-indigo-950/20">
        <div className="p-6 bg-indigo-950/40 backdrop-blur-md border-b border-indigo-900/30 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
          <h1 className="text-2xl font-black flex items-center gap-2 relative z-10">
            <BookOpen className="text-emerald-400 animate-pulse" />
            Italiano<span className="text-indigo-300 font-medium">Pro</span>
          </h1>
          <p className="text-indigo-200/80 text-xs mt-1 font-bold tracking-wider uppercase relative z-10">B2 Maestro</p>
        </div>

        <UserProfile />

        <div className="flex-1 overflow-y-auto">
          <NavigationContent activeTab={activeTab} selectTab={selectTab} errorCount={errorCount} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-6xl mx-auto">
        {activeTab === 'home' && <HomeSection selectTab={selectTab} />}
        {activeTab === 'errori' && <ErrorReviewSection />}
        {activeTab === 'modulo1' && <Modulo1Section />}
        {activeTab === 'modulo2' && <Modulo2Section />}
        {activeTab === 'modulo3' && <Modulo3Section />}
        {activeTab === 'modulo4' && <Modulo4Section />}
        {activeTab === 'modulo5' && <Modulo5Section />}
        {activeTab === 'modulo6' && <Modulo6Section />}
        {activeTab === 'modulo7' && <Modulo7Section />}
        {activeTab === 'modulo8' && <Modulo8Section />}
        {activeTab === 'modulo9' && <Modulo9Section />}
        {activeTab === 'modulo10' && <Modulo10Section />}
        {activeTab === 'modulo11' && <Modulo11Section />}
        {activeTab === 'modulo12' && <Modulo12Section />}
        {activeTab === 'strategie' && <StrategieB2Section />}
        {activeTab === 'syllabus' && <SyllabusModuliB2Section />}
        {activeTab === 'derivazione' && <WordFormationSection />}
        {activeTab === 'futuroAnteriore' && <FuturoAnterioreSection />}
        {activeTab === 'profilo' && <ProfiloSection />}
        {activeTab === 'simulazione' && <SimulazioneEsame />}
        {activeTab === 'panoramica' && <PanoramicaSection />}
        {activeTab === 'presente' && <PresenteSection />}
        {activeTab === 'imperfetto' && <ImperfettoSection />}
        {activeTab === 'futuro' && <FuturoSempliceSection />}
        {activeTab === 'condizionale' && <CondizionaleSection />}
        {activeTab === 'condizionalePassato' && <CondizionalePassatoSection />}
        {activeTab === 'congiuntivoPresente' && <CongiuntivoPresenteSection />}
        {activeTab === 'congiuntivoImperfetto' && <CongiuntivoImperfettoSection />}
        {activeTab === 'congiuntivoPassato' && <CongiuntivoPassatoSection />}
        {activeTab === 'congiuntivoTrapassato' && <CongiuntivoTrapassatoSection />}
        {activeTab === 'prossimo' && <PassatoProssimoSection />}
        {activeTab === 'trapassato' && <TrapassatoProssimoSection />}
        {activeTab === 'passato' && <PassatoRemotoSection />}
        {activeTab === 'imperativo' && <ImperativoSection />}
        {activeTab === 'verbi' && <VerbConjugatorSection verbs={top100Verbs} />}
        {activeTab === 'topVerbs' && <TopVerbsSection />}
        {activeTab === 'lessico' && <LessicoTematicoSection />}
        {activeTab === 'quiz' && <QuizSection />}
      </main>

    </div>
  );
}

/* -----------------------------------------
   COMPONENTS
----------------------------------------- */

function NavigationContent({ activeTab, selectTab, errorCount }) {
  return (
    <div className="flex flex-col select-none">
      <div className="pb-3 border-b border-white/5 mb-3">
        <NavItem icon={<Home size={20} />} label="Pagina Iniziale" isActive={activeTab === 'home'} onClick={() => selectTab('home')} />
      </div>
      <div className="pb-2">
        <p className="px-6 text-[10px] font-black uppercase tracking-wider text-indigo-400 mb-2">Moduli B2</p>
        <NavItem icon={<LayoutDashboard size={20} />} label="Syllabus Moduli B2" isActive={activeTab === 'syllabus'} onClick={() => selectTab('syllabus')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 1" isActive={activeTab === 'modulo1'} onClick={() => selectTab('modulo1')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 2" isActive={activeTab === 'modulo2'} onClick={() => selectTab('modulo2')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 3" isActive={activeTab === 'modulo3'} onClick={() => selectTab('modulo3')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 4" isActive={activeTab === 'modulo4'} onClick={() => selectTab('modulo4')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 5" isActive={activeTab === 'modulo5'} onClick={() => selectTab('modulo5')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 6" isActive={activeTab === 'modulo6'} onClick={() => selectTab('modulo6')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 7" isActive={activeTab === 'modulo7'} onClick={() => selectTab('modulo7')} />
        <NavItem icon={<BookOpen size={20} />} label="Modulo 8" isActive={activeTab === 'modulo8'} onClick={() => selectTab('modulo8')} />
        <NavItem icon={<Headphones size={20} />} label="Modulo 9" isActive={activeTab === 'modulo9'} onClick={() => selectTab('modulo9')} />
        <NavItem icon={<PenTool size={20} />} label="Modulo 10" isActive={activeTab === 'modulo10'} onClick={() => selectTab('modulo10')} />
        <NavItem icon={<Layers size={20} />} label="Modulo 11" isActive={activeTab === 'modulo11'} onClick={() => selectTab('modulo11')} />
        <NavItem icon={<Sparkles size={20} />} label="Modulo 12 (Extra)" isActive={activeTab === 'modulo12'} onClick={() => selectTab('modulo12')} />
      </div>
      
      <div className="pt-4 pb-2 border-t border-white/5">
        <p className="px-6 text-[10px] font-black uppercase tracking-wider text-indigo-400 mb-2">Verbi</p>
        <NavItem icon={<LayoutDashboard size={20} />} label="Panoramica B2" isActive={activeTab === 'panoramica'} onClick={() => selectTab('panoramica')} />
        <NavItem icon={<Sun size={20} />} label="Il Presente" isActive={activeTab === 'presente'} onClick={() => selectTab('presente')} />
        <NavItem icon={<History size={20} />} label="L'Imperfetto" isActive={activeTab === 'imperfetto'} onClick={() => selectTab('imperfetto')} />
        <NavItem icon={<Rocket size={20} />} label="Futuro Semplice" isActive={activeTab === 'futuro'} onClick={() => selectTab('futuro')} />
        <NavItem icon={<Sparkles size={20} />} label="Futuro Anteriore" isActive={activeTab === 'futuroAnteriore'} onClick={() => selectTab('futuroAnteriore')} />
        <NavItem icon={<Lightbulb size={20} />} label="Condizionale Pres." isActive={activeTab === 'condizionale'} onClick={() => selectTab('condizionale')} />
        <NavItem icon={<Sparkles size={20} />} label="Condizionale Pass." isActive={activeTab === 'condizionalePassato'} onClick={() => selectTab('condizionalePassato')} />
        <NavItem icon={<Brain size={20} />} label="Congiuntivo Pres." isActive={activeTab === 'congiuntivoPresente'} onClick={() => selectTab('congiuntivoPresente')} />
        <NavItem icon={<Layers size={20} />} label="Congiuntivo Imp." isActive={activeTab === 'congiuntivoImperfetto'} onClick={() => selectTab('congiuntivoImperfetto')} />
        <NavItem icon={<Layers size={20} />} label="Congiuntivo Pass." isActive={activeTab === 'congiuntivoPassato'} onClick={() => selectTab('congiuntivoPassato')} />
        <NavItem icon={<Milestone size={20} />} label="Congiuntivo Trap." isActive={activeTab === 'congiuntivoTrapassato'} onClick={() => selectTab('congiuntivoTrapassato')} />
        <NavItem icon={<Clock size={20} />} label="Passato Prossimo" isActive={activeTab === 'prossimo'} onClick={() => selectTab('prossimo')} />
        <NavItem icon={<Archive size={20} />} label="Trapassato Prossimo" isActive={activeTab === 'trapassato'} onClick={() => selectTab('trapassato')} />
        <NavItem icon={<ScrollText size={20} />} label="Passato Remoto" isActive={activeTab === 'passato'} onClick={() => selectTab('passato')} />
        <NavItem icon={<AlertCircle size={20} />} label="L'Imperativo" isActive={activeTab === 'imperativo'} onClick={() => selectTab('imperativo')} />
      </div>

      <div className="pt-4 pb-2 border-t border-white/5">
        <p className="px-6 text-[10px] font-black uppercase tracking-wider text-indigo-400 mb-2">Risorse Extra</p>
        <NavItem icon={<BookA size={20} />} label="Lessico Tematico" isActive={activeTab === 'lessico'} onClick={() => selectTab('lessico')} />
        <NavItem icon={<Sparkles size={20} />} label="Strategie B2" isActive={activeTab === 'strategie'} onClick={() => selectTab('strategie')} />
        <NavItem icon={<Brain size={20} />} label="Derivazione Parole" isActive={activeTab === 'derivazione'} onClick={() => selectTab('derivazione')} />
        <NavItem icon={<List size={20} />} label="I 100 Verbi" isActive={activeTab === 'topVerbs'} onClick={() => selectTab('topVerbs')} />
        <NavItem icon={<Sliders size={20} />} label="Coniugatore Verbi" isActive={activeTab === 'verbi'} onClick={() => selectTab('verbi')} />
        <NavItem 
          icon={<History size={20} />} 
          label={
            <div className="flex items-center gap-2">
              Ripasso Errori
              {errorCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {errorCount}
                </span>
              )}
            </div>
          }
          isActive={activeTab === 'errori'} 
          onClick={() => selectTab('errori')} 
        />
        <NavItem icon={<Clock size={20} />} label="Simulazione Esame" isActive={activeTab === 'simulazione'} onClick={() => selectTab('simulazione')} />
      </div>
      
      <div className="pt-4 pb-2 border-t border-white/5">
        <NavItem icon={<User size={20} />} label="Il Mio Profilo" isActive={activeTab === 'profilo'} onClick={() => selectTab('profilo')} />
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3.5 transition-all duration-200 group relative border-l-4 ${
        isActive
          ? 'bg-white/10 backdrop-blur-md text-emerald-400 border-emerald-400 font-extrabold shadow-inner'
          : 'text-indigo-100 hover:bg-white/5 hover:text-white border-transparent hover:translate-x-0.5'
      }`}
    >
      <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-emerald-400" : "text-indigo-300 group-hover:text-emerald-300"}`}>{icon}</span>
      <span className="text-sm text-left tracking-wide font-semibold whitespace-nowrap">{label}</span>
      {isActive && (
        <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      )}
    </button>
  );
}

export function UserProfile() {
  const { currentUser, loginWithGoogle, logout } = useAuth();

  if (currentUser) {
    return (
      <div className="p-4 bg-white/5 backdrop-blur-md border-b border-indigo-500/10 flex flex-col gap-3 transition-all duration-300">
        <div className="flex items-center gap-3">
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-emerald-400 transition-transform duration-300 hover:scale-105" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center font-black text-white shadow-sm">
              {currentUser.email.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-black text-white truncate leading-snug">{currentUser.displayName || 'Studente'}</span>
            <span className="text-xs text-indigo-300/80 truncate leading-none">{currentUser.email}</span>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center justify-center gap-2 py-2 px-3 bg-white/5 hover:bg-red-500/10 hover:text-red-200 border border-white/10 hover:border-red-500/20 text-indigo-200 text-xs font-bold rounded-xl transition-all duration-200"
        >
          <LogOut size={14} /> Disconnetti
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/5 backdrop-blur-md border-b border-indigo-500/10 transition-all duration-300">
      <button 
        onClick={loginWithGoogle}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-extrabold rounded-xl hover:from-emerald-300 hover:to-teal-400 transition-all duration-300 shadow-md shadow-emerald-500/10 active:scale-98"
      >
        <LogIn size={18} /> Accedi con Google
      </button>
    </div>
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
  const theory = (
    <div className="space-y-8">
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
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ARE (es. Parlare)</span>
                    <PlayButton text="io parlo; tu parli; lui parla; noi parliamo; voi parlate; loro parlano" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ERE (es. Credere)</span>
                    <PlayButton text="io credo; tu credi; lui crede; noi crediamo; voi credete; loro credono" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-IRE (es. Dormire)</span>
                    <PlayButton text="io dormo; tu dormi; lui dorme; noi dormiamo; voi dormite; loro dormono" size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold">io</td>
                <VerbCell display={<>parl-<strong>o</strong></>} speakText="parlo" />
                <VerbCell display={<>cred-<strong>o</strong></>} speakText="credo" />
                <VerbCell display={<>dorm-<strong>o</strong></>} speakText="dormo" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">tu</td>
                <VerbCell display={<>parl-<strong>i</strong></>} speakText="parli" />
                <VerbCell display={<>cred-<strong>i</strong></>} speakText="credi" />
                <VerbCell display={<>dorm-<strong>i</strong></>} speakText="dormi" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">lui/lei</td>
                <VerbCell display={<>parl-<strong>a</strong></>} speakText="parla" />
                <VerbCell display={<>cred-<strong>e</strong></>} speakText="crede" />
                <VerbCell display={<>dorm-<strong>e</strong></>} speakText="dorme" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">noi</td>
                <VerbCell display={<>parl-<strong>iamo</strong></>} speakText="parliamo" />
                <VerbCell display={<>cred-<strong>iamo</strong></>} speakText="crediamo" />
                <VerbCell display={<>dorm-<strong>iamo</strong></>} speakText="dormiamo" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">voi</td>
                <VerbCell display={<>parl-<strong>ate</strong></>} speakText="parlate" />
                <VerbCell display={<>cred-<strong>ete</strong></>} speakText="credete" />
                <VerbCell display={<>dorm-<strong>ite</strong></>} speakText="dormite" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">loro</td>
                <VerbCell display={<>parl-<strong>ano</strong></>} speakText="parlano" />
                <VerbCell display={<>cred-<strong>ono</strong></>} speakText="credono" />
                <VerbCell display={<>dorm-<strong>ono</strong></>} speakText="dormono" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
          <span>💡 I verbi in -IRE con il suffisso "-ISC-"</span>
          <PlayButton text="io capisco; tu capisci; lui capisce; noi capiamo; voi capite; loro capiscono" size={16} />
        </h3>
        <p className="mb-4 text-purple-900">
          Molti verbi che finiscono in <strong>-IRE</strong> (come capire, finire, preferire, pulire) inseriscono il suffisso <strong>-isc-</strong> tra la radice e la desinenza, ma <strong>solo nelle prime tre persone singolari e nella terza plurale</strong>. Noi e Voi rimangono perfettamente normali.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ul className="space-y-2 bg-white p-4 rounded-lg shadow-sm border border-purple-100">
            <li className="flex items-center justify-between">
              <span><span className="inline-block w-8 text-purple-600 font-bold">io</span> cap-<strong>isc</strong>-o</span>
              <PlayButton text="capisco" />
            </li>
            <li className="flex items-center justify-between">
              <span><span className="inline-block w-8 text-purple-600 font-bold">tu</span> cap-<strong>isc</strong>-i</span>
              <PlayButton text="capisci" />
            </li>
            <li className="flex items-center justify-between">
              <span><span className="inline-block w-8 text-purple-600 font-bold">lui</span> cap-<strong>isc</strong>-e</span>
              <PlayButton text="capisce" />
            </li>
            <li className="flex items-center justify-between">
              <span><span className="inline-block w-8 text-slate-500">noi</span> cap-iamo</span>
              <PlayButton text="capiamo" />
            </li>
            <li className="flex items-center justify-between">
              <span><span className="inline-block w-8 text-slate-500">voi</span> cap-ite</span>
              <PlayButton text="capite" />
            </li>
            <li className="flex items-center justify-between">
              <span><span className="inline-block w-8 text-purple-600 font-bold">loro</span> cap-<strong>isc</strong>-ono</span>
              <PlayButton text="capiscono" />
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
          <span>💡 I 10 Verbi Irregolari Fondamentali</span>
          <PlayButton text="io sono, tu sei, lui è, noi siamo, voi siete, loro sono; io ho, tu hai, lui ha, noi abbiamo, voi avete, loro hanno; io faccio, tu fai, lui fa, noi facciamo, voi fate, loro fanno; io vado, tu vai, lui va, noi andiamo, voi andate, loro vanno; io dico, tu dici, lui dice, noi diciamo, voi dite, loro dicono; io devo, tu devi, lui deve, noi dobbiamo, voi dovete, loro devono; io posso, tu puoi, lui può, noi possiamo, voi potete, loro possono; io voglio, tu vuoi, lui vuole, noi vogliamo, voi volete, loro vogliono; io so, tu sai, lui sa, noi sappiamo, voi sapete, loro sanno; io vengo, tu vieni, lui viene, noi veniamo, voi venite, loro vengono" size={16} />
        </h3>
        <p className="mb-4 text-amber-900">
          Questi verbi sono usati continuamente in italiano. Imparare la loro coniugazione al presente indicativo è indispensabile per la comunicazione quotidiana.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* Essere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Essere</span>
              <PlayButton text="io sono; tu sei; lui è; noi siamo; voi siete; loro sono" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>sono</span><PlayButton text="sono" /></li>
              <li className="flex items-center justify-between"><span>sei</span><PlayButton text="sei" /></li>
              <li className="flex items-center justify-between"><span>è</span><PlayButton text="è" /></li>
              <li className="flex items-center justify-between"><span>siamo</span><PlayButton text="siamo" /></li>
              <li className="flex items-center justify-between"><span>siete</span><PlayButton text="siete" /></li>
              <li className="flex items-center justify-between"><span>sono</span><PlayButton text="sono" /></li>
            </ul>
          </div>
          {/* Avere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Avere</span>
              <PlayButton text="io ho; tu hai; lui ha; noi abbiamo; voi avete; loro hanno" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>ho</span><PlayButton text="ho" /></li>
              <li className="flex items-center justify-between"><span>hai</span><PlayButton text="hai" /></li>
              <li className="flex items-center justify-between"><span>ha</span><PlayButton text="ha" /></li>
              <li className="flex items-center justify-between"><span>abbiamo</span><PlayButton text="abbiamo" /></li>
              <li className="flex items-center justify-between"><span>avete</span><PlayButton text="avete" /></li>
              <li className="flex items-center justify-between"><span>hanno</span><PlayButton text="hanno" /></li>
            </ul>
          </div>
          {/* Fare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Fare</span>
              <PlayButton text="io faccio; tu fai; lui fa; noi facciamo; voi fate; loro fanno" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>faccio</span><PlayButton text="faccio" /></li>
              <li className="flex items-center justify-between"><span>fai</span><PlayButton text="fai" /></li>
              <li className="flex items-center justify-between"><span>fa</span><PlayButton text="fa" /></li>
              <li className="flex items-center justify-between"><span>facciamo</span><PlayButton text="facciamo" /></li>
              <li className="flex items-center justify-between"><span>fate</span><PlayButton text="fate" /></li>
              <li className="flex items-center justify-between"><span>fanno</span><PlayButton text="fanno" /></li>
            </ul>
          </div>
          {/* Andare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Andare</span>
              <PlayButton text="io vado; tu vai; lui va; noi andiamo; voi andate; loro vanno" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>vado</span><PlayButton text="vado" /></li>
              <li className="flex items-center justify-between"><span>vai</span><PlayButton text="vai" /></li>
              <li className="flex items-center justify-between"><span>va</span><PlayButton text="va" /></li>
              <li className="flex items-center justify-between"><span>andiamo</span><PlayButton text="andiamo" /></li>
              <li className="flex items-center justify-between"><span>andate</span><PlayButton text="andate" /></li>
              <li className="flex items-center justify-between"><span>vanno</span><PlayButton text="vanno" /></li>
            </ul>
          </div>
          {/* Dire */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Dire</span>
              <PlayButton text="io dico; tu dici; lui dice; noi diciamo; voi dite; loro dicono" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>dico</span><PlayButton text="dico" /></li>
              <li className="flex items-center justify-between"><span>dici</span><PlayButton text="dici" /></li>
              <li className="flex items-center justify-between"><span>dice</span><PlayButton text="dice" /></li>
              <li className="flex items-center justify-between"><span>diciamo</span><PlayButton text="diciamo" /></li>
              <li className="flex items-center justify-between"><span>dite</span><PlayButton text="dite" /></li>
              <li className="flex items-center justify-between"><span>dicono</span><PlayButton text="dicono" /></li>
            </ul>
          </div>
          {/* Dovere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Dovere</span>
              <PlayButton text="io devo; tu devi; lui deve; noi dobbiamo; voi dovete; loro devono" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>devo</span><PlayButton text="devo" /></li>
              <li className="flex items-center justify-between"><span>devi</span><PlayButton text="devi" /></li>
              <li className="flex items-center justify-between"><span>deve</span><PlayButton text="deve" /></li>
              <li className="flex items-center justify-between"><span>dobbiamo</span><PlayButton text="dobbiamo" /></li>
              <li className="flex items-center justify-between"><span>dovete</span><PlayButton text="dovete" /></li>
              <li className="flex items-center justify-between"><span>devono</span><PlayButton text="devono" /></li>
            </ul>
          </div>
          {/* Potere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Potere</span>
              <PlayButton text="io posso; tu puoi; lui può; noi possiamo; voi potete; loro possono" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>posso</span><PlayButton text="posso" /></li>
              <li className="flex items-center justify-between"><span>puoi</span><PlayButton text="puoi" /></li>
              <li className="flex items-center justify-between"><span>può</span><PlayButton text="può" /></li>
              <li className="flex items-center justify-between"><span>possiamo</span><PlayButton text="possiamo" /></li>
              <li className="flex items-center justify-between"><span>potete</span><PlayButton text="potete" /></li>
              <li className="flex items-center justify-between"><span>possono</span><PlayButton text="possono" /></li>
            </ul>
          </div>
          {/* Volere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Volere</span>
              <PlayButton text="io voglio; tu vuoi; lui vuole; noi vogliamo; voi volete; loro vogliono" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>voglio</span><PlayButton text="voglio" /></li>
              <li className="flex items-center justify-between"><span>vuoi</span><PlayButton text="vuoi" /></li>
              <li className="flex items-center justify-between"><span>vuole</span><PlayButton text="vuole" /></li>
              <li className="flex items-center justify-between"><span>vogliamo</span><PlayButton text="vogliamo" /></li>
              <li className="flex items-center justify-between"><span>volete</span><PlayButton text="volete" /></li>
              <li className="flex items-center justify-between"><span>vogliono</span><PlayButton text="vogliono" /></li>
            </ul>
          </div>
          {/* Sapere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Sapere</span>
              <PlayButton text="io so; tu sai; lui sa; noi sappiamo; voi sapete; loro sanno" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>so</span><PlayButton text="so" /></li>
              <li className="flex items-center justify-between"><span>sai</span><PlayButton text="sai" /></li>
              <li className="flex items-center justify-between"><span>sa</span><PlayButton text="sa" /></li>
              <li className="flex items-center justify-between"><span>sappiamo</span><PlayButton text="sappiamo" /></li>
              <li className="flex items-center justify-between"><span>sapete</span><PlayButton text="sapete" /></li>
              <li className="flex items-center justify-between"><span>sanno</span><PlayButton text="sanno" /></li>
            </ul>
          </div>
          {/* Venire */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <h4 className="font-bold text-amber-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Venire</span>
              <PlayButton text="io vengo; tu vieni; lui viene; noi veniamo; voi venite; loro vengono" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5 text-slate-700">
              <li className="flex items-center justify-between"><span>vengo</span><PlayButton text="vengo" /></li>
              <li className="flex items-center justify-between"><span>vieni</span><PlayButton text="vieni" /></li>
              <li className="flex items-center justify-between"><span>viene</span><PlayButton text="viene" /></li>
              <li className="flex items-center justify-between"><span>veniamo</span><PlayButton text="veniamo" /></li>
              <li className="flex items-center justify-between"><span>venite</span><PlayButton text="venite" /></li>
              <li className="flex items-center justify-between"><span>vengono</span><PlayButton text="vengono" /></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="presente"
      title="Il Presente Indicativo"
      subtitle="Il tempo fondamentale per parlare di azioni attuali e abitudini."
      icon={BookOpen}
      exercises={eserciziPresente}
      errorPrefix="Il Presente"
      theoryComponent={theory}
    />
  );
}

function ImperfettoSection() {
  const theory = (
    <div className="space-y-8">
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
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ARE (Parlare)</span>
                    <PlayButton text="io parlavo; tu parlavi; lui parlava; noi parlavamo; voi parlavate; loro parlavano" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ERE (Credere)</span>
                    <PlayButton text="io credevo; tu credevi; lui credeva; noi credevamo; voi credevate; loro credevano" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-IRE (Dormire)</span>
                    <PlayButton text="io dormivo; tu dormivi; lui dormiva; noi dormivamo; voi dormivate; loro dormivano" size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold">io</td>
                <VerbCell display={<>parl-<strong>avo</strong></>} speakText="parlavo" />
                <VerbCell display={<>cred-<strong>evo</strong></>} speakText="credevo" />
                <VerbCell display={<>dorm-<strong>ivo</strong></>} speakText="dormivo" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">tu</td>
                <VerbCell display={<>parl-<strong>avi</strong></>} speakText="parlavi" />
                <VerbCell display={<>cred-<strong>evi</strong></>} speakText="credevi" />
                <VerbCell display={<>dorm-<strong>ivi</strong></>} speakText="dormivi" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">lui/lei</td>
                <VerbCell display={<>parl-<strong>ava</strong></>} speakText="parlava" />
                <VerbCell display={<>cred-<strong>eva</strong></>} speakText="credeva" />
                <VerbCell display={<>dorm-<strong>iva</strong></>} speakText="dormiva" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">noi</td>
                <VerbCell display={<>parl-<strong>avamo</strong></>} speakText="parlavamo" />
                <VerbCell display={<>cred-<strong>evamo</strong></>} speakText="credevamo" />
                <VerbCell display={<>dorm-<strong>ivamo</strong></>} speakText="dormivamo" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">voi</td>
                <VerbCell display={<>parl-<strong>avate</strong></>} speakText="parlavate" />
                <VerbCell display={<>cred-<strong>evate</strong></>} speakText="credevate" />
                <VerbCell display={<>dorm-<strong>ivate</strong></>} speakText="dormivate" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">loro</td>
                <VerbCell display={<>parl-<strong>avano</strong></>} speakText="parlavano" />
                <VerbCell display={<>cred-<strong>evano</strong></>} speakText="credevano" />
                <VerbCell display={<>dorm-<strong>ivano</strong></>} speakText="dormivano" />
              </tr>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Essere</span>
              <PlayButton text="io ero; tu eri; lui era; noi eravamo; voi eravate; loro erano" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>ero</span><PlayButton text="ero" /></li>
              <li className="flex items-center justify-between"><span>eri</span><PlayButton text="eri" /></li>
              <li className="flex items-center justify-between"><span>era</span><PlayButton text="era" /></li>
              <li className="flex items-center justify-between"><span>eravamo</span><PlayButton text="eravamo" /></li>
              <li className="flex items-center justify-between"><span>eravate</span><PlayButton text="eravate" /></li>
              <li className="flex items-center justify-between"><span>erano</span><PlayButton text="erano" /></li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Fare</span>
              <PlayButton text="io facevo; tu facevi; lui faceva; noi facevamo; voi facevate; loro facevano" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>facevo</span><PlayButton text="facevo" /></li>
              <li className="flex items-center justify-between"><span>facevi</span><PlayButton text="facevi" /></li>
              <li className="flex items-center justify-between"><span>faceva</span><PlayButton text="faceva" /></li>
              <li className="flex items-center justify-between"><span>facevamo</span><PlayButton text="facevamo" /></li>
              <li className="flex items-center justify-between"><span>facevate</span><PlayButton text="facevate" /></li>
              <li className="flex items-center justify-between"><span>facevano</span><PlayButton text="facevano" /></li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Dire</span>
              <PlayButton text="io dicevo; tu dicevi; lui diceva; noi dicevamo; voi dicevate; loro dicevano" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>dicevo</span><PlayButton text="dicevo" /></li>
              <li className="flex items-center justify-between"><span>dicevi</span><PlayButton text="dicevi" /></li>
              <li className="flex items-center justify-between"><span>diceva</span><PlayButton text="diceva" /></li>
              <li className="flex items-center justify-between"><span>dicevamo</span><PlayButton text="dicevamo" /></li>
              <li className="flex items-center justify-between"><span>dicevate</span><PlayButton text="dicevate" /></li>
              <li className="flex items-center justify-between"><span>dicevano</span><PlayButton text="dicevano" /></li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
            <h4 className="font-bold text-teal-700 text-center border-b pb-2 mb-2 flex items-center justify-center gap-1">
              <span>Bere</span>
              <PlayButton text="io bevevo; tu bevevi; lui beveva; noi bevevamo; voi bevevate; loro bevevano" size={13} />
            </h4>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>bevevo</span><PlayButton text="bevevo" /></li>
              <li className="flex items-center justify-between"><span>bevevi</span><PlayButton text="bevevi" /></li>
              <li className="flex items-center justify-between"><span>beveva</span><PlayButton text="beveva" /></li>
              <li className="flex items-center justify-between"><span>bevevamo</span><PlayButton text="bevevamo" /></li>
              <li className="flex items-center justify-between"><span>bevevate</span><PlayButton text="bevevate" /></li>
              <li className="flex items-center justify-between"><span>bevevano</span><PlayButton text="bevevano" /></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="imperfetto"
      title="L'Imperfetto"
      subtitle="Il tempo delle descrizioni, delle abitudini passate e delle azioni in corso d'opera."
      icon={BookOpen}
      exercises={eserciziImperfetto}
      errorPrefix="L'Imperfetto"
      theoryComponent={theory}
    />
  );
}

function FuturoSempliceSection() {
  const theory = (
    <div className="space-y-8">
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
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ARE (Parlare)</span>
                    <PlayButton text="io parlerò; tu parlerai; lui parlerà; noi parleremo; voi parlerete; loro parleranno" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ERE (Credere)</span>
                    <PlayButton text="io crederò; tu crederai; lui crederà; noi crederemo; voi crederete; loro crederanno" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-IRE (Dormire)</span>
                    <PlayButton text="io dormirò; tu dormirai; lui dormirà; noi dormiremo; voi dormirete; loro dormiranno" size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold">io</td>
                <VerbCell display={<>parl-<strong>erò</strong></>} speakText="parlerò" />
                <VerbCell display={<>cred-<strong>erò</strong></>} speakText="crederò" />
                <VerbCell display={<>dorm-<strong>irò</strong></>} speakText="dormirò" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">tu</td>
                <VerbCell display={<>parl-<strong>erai</strong></>} speakText="parlerai" />
                <VerbCell display={<>cred-<strong>erai</strong></>} speakText="crederai" />
                <VerbCell display={<>dorm-<strong>irai</strong></>} speakText="dormirai" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">lui/lei</td>
                <VerbCell display={<>parl-<strong>erà</strong></>} speakText="parlerà" />
                <VerbCell display={<>cred-<strong>erà</strong></>} speakText="crederà" />
                <VerbCell display={<>dorm-<strong>irà</strong></>} speakText="dormirà" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">noi</td>
                <VerbCell display={<>parl-<strong>eremo</strong></>} speakText="parleremo" />
                <VerbCell display={<>cred-<strong>eremo</strong></>} speakText="crederemo" />
                <VerbCell display={<>dorm-<strong>iremo</strong></>} speakText="dormiremo" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">voi</td>
                <VerbCell display={<>parl-<strong>erete</strong></>} speakText="parlerete" />
                <VerbCell display={<>cred-<strong>erete</strong></>} speakText="crederete" />
                <VerbCell display={<>dorm-<strong>irete</strong></>} speakText="dormirete" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">loro</td>
                <VerbCell display={<>parl-<strong>eranno</strong></>} speakText="parleranno" />
                <VerbCell display={<>cred-<strong>eranno</strong></>} speakText="crederanno" />
                <VerbCell display={<>dorm-<strong>iranno</strong></>} speakText="dormiranno" />
              </tr>
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
          {/* Group 1 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 space-y-4">
            <h4 className="font-bold text-orange-700 border-b pb-2 mb-2">1. Perdono la vocale</h4>
            <div className="space-y-4">
              {/* Avere */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Avere</span>
                  <PlayButton text="io avrò; tu avrai; lui avrà; noi avremo; voi avrete; loro avranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> avrò</span><PlayButton text="avrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> avrai</span><PlayButton text="avrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> avrà</span><PlayButton text="avrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> avremo</span><PlayButton text="avremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> avrete</span><PlayButton text="avrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> avranno</span><PlayButton text="avranno" size={11} /></li>
                </ul>
              </div>
              {/* Andare */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Andare</span>
                  <PlayButton text="io andrò; tu andrai; lui andrà; noi andremo; voi andrete; loro andranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> andrò</span><PlayButton text="andrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> andrai</span><PlayButton text="andrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> andrà</span><PlayButton text="andrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> andremo</span><PlayButton text="andremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> andrete</span><PlayButton text="andrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> andranno</span><PlayButton text="andranno" size={11} /></li>
                </ul>
              </div>
              {/* Potere */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Potere</span>
                  <PlayButton text="io potrò; tu potrai; lui potrà; noi potremo; voi potrete; loro potranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> potrò</span><PlayButton text="potrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> potrai</span><PlayButton text="potrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> potrà</span><PlayButton text="potrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> potremo</span><PlayButton text="potremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> potrete</span><PlayButton text="potrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> potranno</span><PlayButton text="potranno" size={11} /></li>
                </ul>
              </div>
              {/* Vedere */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Vedere</span>
                  <PlayButton text="io vedrò; tu vedrai; lui vedrà; noi vedremo; voi vedrete; loro vedranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> vedrò</span><PlayButton text="vedrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> vedrai</span><PlayButton text="vedrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> vedrà</span><PlayButton text="vedrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> vedremo</span><PlayButton text="vedremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> vedrete</span><PlayButton text="vedrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> vedranno</span><PlayButton text="vedranno" size={11} /></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Group 2 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 space-y-4">
            <h4 className="font-bold text-orange-700 border-b pb-2 mb-2">2. Raddoppiano la 'R'</h4>
            <div className="space-y-4">
              {/* Venire */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Venire</span>
                  <PlayButton text="io verrò; tu verrai; lui verrà; noi verremo; voi verrete; loro verranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> verrò</span><PlayButton text="verrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> verrai</span><PlayButton text="verrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> verrà</span><PlayButton text="verrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> verremo</span><PlayButton text="verremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> verrete</span><PlayButton text="verrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> verranno</span><PlayButton text="verranno" size={11} /></li>
                </ul>
              </div>
              {/* Volere */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Volere</span>
                  <PlayButton text="io vorrò; tu vorrai; lui vorrà; noi vorremo; voi vorrete; loro vorranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> vorrò</span><PlayButton text="vorrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> vorrai</span><PlayButton text="vorrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> vorrà</span><PlayButton text="vorrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> vorremo</span><PlayButton text="vorremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> vorrete</span><PlayButton text="vorrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> vorranno</span><PlayButton text="vorranno" size={11} /></li>
                </ul>
              </div>
              {/* Bere */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Bere</span>
                  <PlayButton text="io berrò; tu berrai; lui berrà; noi berremo; voi berrete; loro berranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> berrò</span><PlayButton text="berrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> berrai</span><PlayButton text="berrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> berrà</span><PlayButton text="berrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> berremo</span><PlayButton text="berremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> berrete</span><PlayButton text="berrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> berranno</span><PlayButton text="berranno" size={11} /></li>
                </ul>
              </div>
              {/* Rimanere */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Rimanere</span>
                  <PlayButton text="io rimarrò; tu rimarrai; lui rimarrà; noi rimarremo; voi rimarrete; loro rimarranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> rimarrò</span><PlayButton text="rimarrò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> rimarrai</span><PlayButton text="rimarrai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> rimarrà</span><PlayButton text="rimarrà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> rimarremo</span><PlayButton text="rimarremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> rimarrete</span><PlayButton text="rimarrete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> rimarranno</span><PlayButton text="rimarranno" size={11} /></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Group 3 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 space-y-4">
            <h4 className="font-bold text-orange-700 border-b pb-2 mb-2">3. Radici speciali</h4>
            <div className="space-y-4">
              {/* Essere */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Essere</span>
                  <PlayButton text="io sarò; tu sarai; lui sarà; noi saremo; voi sarete; loro saranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> sarò</span><PlayButton text="sarò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> sarai</span><PlayButton text="sarai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> sarà</span><PlayButton text="sarà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> saremo</span><PlayButton text="saremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> sarete</span><PlayButton text="sarete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> saranno</span><PlayButton text="saranno" size={11} /></li>
                </ul>
              </div>
              {/* Fare */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Fare</span>
                  <PlayButton text="io farò; tu farai; lui farà; noi faremo; voi farete; loro faranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> farò</span><PlayButton text="farò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> farai</span><PlayButton text="farai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> farà</span><PlayButton text="farà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> faremo</span><PlayButton text="faremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> farete</span><PlayButton text="farete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> faranno</span><PlayButton text="faranno" size={11} /></li>
                </ul>
              </div>
              {/* Dare */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Dare</span>
                  <PlayButton text="io darò; tu darai; lui darà; noi daremo; voi darete; loro daranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> darò</span><PlayButton text="darò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> darai</span><PlayButton text="darai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> darà</span><PlayButton text="darà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> daremo</span><PlayButton text="daremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> darete</span><PlayButton text="darete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> daranno</span><PlayButton text="daranno" size={11} /></li>
                </ul>
              </div>
              {/* Stare */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-800 flex items-center justify-between border-b pb-1 mb-1.5">
                  <span>Stare</span>
                  <PlayButton text="io starò; tu starai; lui starà; noi staremo; voi starete; loro staranno" size={13} />
                </h5>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li className="flex items-center justify-between"><span><strong>io</strong> starò</span><PlayButton text="starò" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>tu</strong> starai</span><PlayButton text="starai" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>lui/lei</strong> starà</span><PlayButton text="starà" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>noi</strong> staremo</span><PlayButton text="staremo" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>voi</strong> starete</span><PlayButton text="starete" size={11} /></li>
                  <li className="flex items-center justify-between"><span><strong>loro</strong> staranno</span><PlayButton text="staranno" size={11} /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="futuro"
      title="Il Futuro Semplice"
      subtitle="Progetti, previsioni e ipotesi sul presente."
      icon={BookOpen}
      exercises={eserciziFuturo}
      errorPrefix="Il Futuro Semplice"
      theoryComponent={theory}
    />
  );
}

function FuturoAnterioreSection() {
  const theory = (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-4 text-slate-700">
          Il <strong>Futuro Anteriore</strong> si forma con il futuro semplice degli ausiliari <em>essere</em> o <em>avere</em> + il <em>participio passato</em> del verbo. Ha due funzioni principali:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>
            <strong>Uso Temporale (Azione futura anteriore):</strong><br />
            Indica un'azione futura che avverrà prima di un'altra azione futura. Spesso è introdotto da congiunzioni temporali come <em>appena, dopo che, quando</em>.<br />
            <span className="italic text-slate-500">Es: Appena <strong>avrò finito</strong> di pranzare, farò una passeggiata. (Prima pranzo, poi cammino).</span>
          </li>
          <li>
            <strong>Uso Epistemico / Modale (Ipotesi o dubbio sul passato):</strong><br />
            Serve per esprimere un'ipotesi, una supposizione o un dubbio riferito a un evento avvenuto nel passato.<br />
            <span className="italic text-slate-500">Es: Ieri non è venuto a scuola. <strong>Avrà avuto</strong> un contrattempo. (Probabilmente ha avuto un contrattempo).</span><br />
            <span className="italic text-slate-500">Es: Dove sono le mie chiavi? Le <strong>avrò lasciate</strong> in ufficio. (Probabilmente le ho lasciate).</span>
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Ausiliari al Futuro Semplice + Participio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="font-bold text-indigo-950 mb-2">Ausiliare AVERE (es. Finire)</h4>
            <ul className="text-sm space-y-1.5 font-mono">
              <li>io <strong>avrò</strong> finito</li>
              <li>tu <strong>avrai</strong> finito</li>
              <li>lui/lei <strong>avrà</strong> finito</li>
              <li>noi <strong>avremo</strong> finito</li>
              <li>voi <strong>avrete</strong> finito</li>
              <li>loro <strong>avranno</strong> finito</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="font-bold text-indigo-950 mb-2">Ausiliare ESSERE (es. Partire)</h4>
            <p className="text-xs text-amber-600 mb-2 font-sans font-bold">⚠️ Il participio concorda in genere e numero col soggetto:</p>
            <ul className="text-sm space-y-1.5 font-mono">
              <li>io <strong>sarò</strong> partito/a</li>
              <li>tu <strong>sarai</strong> partito/a</li>
              <li>lui/lei <strong>sarà</strong> partito/a</li>
              <li>noi <strong>saremo</strong> partiti/e</li>
              <li>voi <strong>sarete</strong> partiti/e</li>
              <li>loro <strong>saranno</strong> partiti/e</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="futuroAnteriore"
      title="Il Futuro Anteriore"
      subtitle="Esprimere azioni future passate o formulare ipotesi su eventi passati."
      icon={Sparkles}
      exercises={eserciziFuturoAnteriore}
      errorPrefix="Il Futuro Anteriore"
      theoryComponent={theory}
    />
  );
}

function CondizionaleSection() {
  const theory = (
    <div className="space-y-8">
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
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ARE (Parlare)</span>
                    <PlayButton text="io parlerei; tu parleresti; lui parlerebbe; noi parleremmo; voi parlereste; loro parlerebbero" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-ERE (Credere)</span>
                    <PlayButton text="io crederei; tu crederesti; lui crederebbe; noi crederemmo; voi credereste; loro crederebbero" size={14} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <span>-IRE (Dormire)</span>
                    <PlayButton text="io dormirei; tu dormiresti; lui dormirebbe; noi dormiremmo; voi dormireste; loro dormirebbero" size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold">io</td>
                <VerbCell display={<>parler-<strong>ei</strong></>} speakText="parlerei" />
                <VerbCell display={<>creder-<strong>ei</strong></>} speakText="crederei" />
                <VerbCell display={<>dormir-<strong>ei</strong></>} speakText="dormirei" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">tu</td>
                <VerbCell display={<>parler-<strong>esti</strong></>} speakText="parleresti" />
                <VerbCell display={<>creder-<strong>esti</strong></>} speakText="crederesti" />
                <VerbCell display={<>dormir-<strong>esti</strong></>} speakText="dormiresti" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">lui/lei</td>
                <VerbCell display={<>parler-<strong>ebbe</strong></>} speakText="parlerebbe" />
                <VerbCell display={<>creder-<strong>ebbe</strong></>} speakText="crederebbe" />
                <VerbCell display={<>dormir-<strong>ebbe</strong></>} speakText="dormirebbe" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">noi</td>
                <VerbCell display={<>parler-<strong>emmo</strong></>} speakText="parleremmo" />
                <VerbCell display={<>creder-<strong>emmo</strong></>} speakText="crederemmo" />
                <VerbCell display={<>dormir-<strong>emmo</strong></>} speakText="dormiremmo" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">voi</td>
                <VerbCell display={<>parler-<strong>este</strong></>} speakText="parlereste" />
                <VerbCell display={<>creder-<strong>este</strong></>} speakText="credereste" />
                <VerbCell display={<>dormir-<strong>este</strong></>} speakText="dormireste" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">loro</td>
                <VerbCell display={<>parler-<strong>ebbero</strong></>} speakText="parlerebbero" />
                <VerbCell display={<>creder-<strong>ebbero</strong></>} speakText="crederebbero" />
                <VerbCell display={<>dormir-<strong>ebbero</strong></>} speakText="dormirebbero" />
              </tr>
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

  return (
    <TensePractice
      id="condizionale"
      title="Il Condizionale Presente"
      subtitle="Desideri, richieste cortesi e possibilità."
      icon={BookOpen}
      exercises={eserciziCondizionale}
      errorPrefix="Il Condizionale Presente"
      theoryComponent={theory}
    />
  );
}

function CondizionalePassatoSection() {
  const theory = (
    <div className="space-y-8">
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
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-indigo-900">Avrei mangiato</p>
              <PlayButton text="avrei mangiato" />
            </div>
            <p className="text-sm text-indigo-600 mt-1">(Condizionale di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-emerald-900">Sarei andato</p>
              <PlayButton text="sarei andato" />
            </div>
            <p className="text-sm text-emerald-600 mt-1">(Condizionale di essere + Participio)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Nota: Le regole per la scelta dell'ausiliare sono identiche a quelle del Passato Prossimo.
        </p>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="condizionale_passato"
      title="Il Condizionale Passato"
      subtitle="Desideri irrealizzati, rimpianti e il 'futuro nel passato'."
      icon={BookOpen}
      exercises={eserciziCondizionalePassato}
      errorPrefix="Il Condizionale Passato"
      theoryComponent={theory}
    />
  );
}

function CongiuntivoPresenteSection() {
  const renderCell = (display, speakText) => (
    <VerbCell display={display} speakText={speakText} />
  );

  const irregularVerbs = [
    {
      infinitive: "ESSERE",
      forms: ["sia", "sia", "sia", "siamo", "siate", "siano"]
    },
    {
      infinitive: "AVERE",
      forms: ["abbia", "abbia", "abbia", "abbiamo", "abbiate", "abbiano"]
    },
    {
      infinitive: "FARE",
      forms: ["faccia", "faccia", "faccia", "facciamo", "facciate", "facciano"]
    },
    {
      infinitive: "DIRE",
      forms: ["dica", "dica", "dica", "diciamo", "diciate", "dicano"]
    },
    {
      infinitive: "ANDARE",
      forms: ["vada", "vada", "vada", "andiamo", "andiate", "vadano"]
    },
    {
      infinitive: "VENIRE",
      forms: ["venga", "venga", "venga", "veniamo", "veniate", "vengano"]
    },
    {
      infinitive: "POTERE",
      forms: ["possa", "possa", "possa", "possiamo", "possiate", "possano"]
    },
    {
      infinitive: "VOLERE",
      forms: ["voglia", "voglia", "voglia", "vogliamo", "vogliate", "vogliano"]
    },
    {
      infinitive: "DOVERE",
      forms: ["debba", "debba", "debba", "dobbiamo", "dobbiate", "debbano"]
    },
    {
      infinitive: "SAPERE",
      forms: ["sappia", "sappia", "sappia", "sappiamo", "sappiate", "sappiano"]
    },
    {
      infinitive: "STARE",
      forms: ["stia", "stia", "stia", "stiamo", "stiate", "stiano"]
    },
    {
      infinitive: "DARE",
      forms: ["dia", "dia", "dia", "diamo", "diate", "diano"]
    }
  ];

  const theory = (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Quando si usa?
        </h3>
        <p className="mb-4 text-slate-700">
          A differenza dell'indicativo (che esprime certezze), il <strong>Congiuntivo</strong> si usa per espressare soggettività in frasi secondarie, spesso introdotte dalla congiunzione <em>"che"</em>:
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
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-ARE (Parlare)</span>
                    <PlayButton text="che io parli, che tu parli, che lui parli, che noi parliamo, che voi parliate, che loro parlino" />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-ERE (Credere)</span>
                    <PlayButton text="che io creda, che tu creda, che lui creda, che noi crediamo, che voi crediate, che loro credano" />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-IRE (Dormire)</span>
                    <PlayButton text="che io dorma, che tu dorma, che lui dorma, che noi dormiamo, che voi dormiate, che loro dormano" />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-IRE (Finire) *</span>
                    <PlayButton text="che io finisca, che tu finisca, che lui finisca, che noi finiamo, che voi finiate, che loro finiscano" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold">io</td>
                {renderCell(<>parl-<strong>i</strong></>, "che io parli")}
                {renderCell(<>cred-<strong>a</strong></>, "che io creda")}
                {renderCell(<>dorm-<strong>a</strong></>, "che io dorma")}
                {renderCell(<>fin-<strong>isca</strong></>, "che io finisca")}
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">tu</td>
                {renderCell(<>parl-<strong>i</strong></>, "che tu parli")}
                {renderCell(<>cred-<strong>a</strong></>, "che tu creda")}
                {renderCell(<>dorm-<strong>a</strong></>, "che tu dorma")}
                {renderCell(<>fin-<strong>isca</strong></>, "che tu finisca")}
              </tr>
              <tr>
                <td className="p-3 border font-semibold">lui/lei</td>
                {renderCell(<>parl-<strong>i</strong></>, "che lui parli")}
                {renderCell(<>cred-<strong>a</strong></>, "che lui creda")}
                {renderCell(<>dorm-<strong>a</strong></>, "che lui dorma")}
                {renderCell(<>fin-<strong>isca</strong></>, "che lui finisca")}
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">noi</td>
                {renderCell(<>parl-<strong>iamo</strong></>, "che noi parliamo")}
                {renderCell(<>cred-<strong>iamo</strong></>, "che noi crediamo")}
                {renderCell(<>dorm-<strong>iamo</strong></>, "che noi dormiamo")}
                {renderCell(<>fin-<strong>iamo</strong></>, "che noi finiamo")}
              </tr>
              <tr>
                <td className="p-3 border font-semibold">voi</td>
                {renderCell(<>parl-<strong>iate</strong></>, "che voi parliate")}
                {renderCell(<>cred-<strong>iate</strong></>, "che voi crediate")}
                {renderCell(<>dorm-<strong>iate</strong></>, "che voi dormiate")}
                {renderCell(<>fin-<strong>iate</strong></>, "che voi finiate")}
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">loro</td>
                {renderCell(<>parl-<strong>ino</strong></>, "che loro parlino")}
                {renderCell(<>cred-<strong>ano</strong></>, "che loro credano")}
                {renderCell(<>dorm-<strong>ano</strong></>, "che loro dormano")}
                {renderCell(<>fin-<strong>iscano</strong></>, "che loro finiscano")}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">Verbi Irregolari più Comuni</h3>
        <p className="mb-4 text-slate-700 text-sm">Molti verbi ad alta frequenza presentano forme irregolari al congiuntivo presente. Di seguito le coniugazioni complete per i 12 verbi irregolari più importanti:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {irregularVerbs.map((v) => {
            const fullTTS = `che io ${v.forms[0]}, che tu ${v.forms[1]}, che lui ${v.forms[2]}, che noi ${v.forms[3]}, che voi ${v.forms[4]}, che loro ${v.forms[5]}`;
            return (
              <div key={v.infinitive} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-indigo-950 border-b pb-1.5 mb-2.5 text-sm flex justify-between items-center">
                  <span>{v.infinitive}</span>
                  <PlayButton text={fullTTS} />
                </h4>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs font-mono text-slate-700">
                  <div className="flex items-center justify-between py-0.5 border-b border-slate-100/50">
                    <span>io <strong>{v.forms[0]}</strong></span>
                    <PlayButton text={`che io ${v.forms[0]}`} size={12} />
                  </div>
                  <div className="flex items-center justify-between py-0.5 border-b border-slate-100/50">
                    <span>noi <strong>{v.forms[3]}</strong></span>
                    <PlayButton text={`che noi ${v.forms[3]}`} size={12} />
                  </div>
                  
                  <div className="flex items-center justify-between py-0.5 border-b border-slate-100/50">
                    <span>tu <strong>{v.forms[1]}</strong></span>
                    <PlayButton text={`che tu ${v.forms[1]}`} size={12} />
                  </div>
                  <div className="flex items-center justify-between py-0.5 border-b border-slate-100/50">
                    <span>voi <strong>{v.forms[4]}</strong></span>
                    <PlayButton text={`che voi ${v.forms[4]}`} size={12} />
                  </div>

                  <div className="flex items-center justify-between py-0.5 border-b border-slate-100/50">
                    <span>lui/lei <strong>{v.forms[2]}</strong></span>
                    <PlayButton text={`che lui ${v.forms[2]}`} size={12} />
                  </div>
                  <div className="flex items-center justify-between py-0.5 border-b border-slate-100/50">
                    <span>loro <strong>{v.forms[5]}</strong></span>
                    <PlayButton text={`che loro ${v.forms[5]}`} size={12} />
                  </div>
                </div>
              </div>
            );
          })}
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

  return (
    <TensePractice
      id="cong_pres"
      title="Il Congiuntivo Presente"
      subtitle="Opinioni, dubbi, sentimenti e incertezze."
      icon={BookOpen}
      exercises={eserciziCongiuntivoPresente}
      errorPrefix="Il Congiuntivo Presente"
      theoryComponent={theory}
    />
  );
}

function CongiuntivoPassatoSection() {
  const theory = (
    <div className="space-y-8">
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
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-indigo-900">che io abbia mangiato</p>
              <PlayButton text="che io abbia mangiato" />
            </div>
            <p className="text-sm text-indigo-600 mt-1">(Congiuntivo di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-emerald-900">che lui sia andato</p>
              <PlayButton text="che lui sia andato" />
            </div>
            <p className="text-sm text-emerald-600 mt-1">(Congiuntivo di essere + Participio)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Attenzione: Con l'ausiliare <em>essere</em>, ricordati sempre di accordare l'ultima lettera del participio passato (o, a, i, e) con il soggetto!
        </p>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="cong_passato"
      title="Il Congiuntivo Passato"
      subtitle="Opinioni, dubbi e sentimenti su azioni già concluse nel passato."
      icon={BookOpen}
      exercises={eserciziCongiuntivoPassato}
      errorPrefix="Il Congiuntivo Passato"
      theoryComponent={theory}
    />
  );
}

function CongiuntivoTrapassatoSection() {
  const theory = (
    <div className="space-y-8">
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
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-indigo-900">che io avessi mangiato</p>
              <PlayButton text="che io avessi mangiato" />
            </div>
            <p className="text-sm text-indigo-600 mt-1">(Congiuntivo Imperfetto di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-emerald-900">che lui fosse andato</p>
              <PlayButton text="che lui fosse andato" />
            </div>
            <p className="text-sm text-emerald-600 mt-1">(Congiuntivo Imperfetto di essere + Participio)</p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="cong_trapassato"
      title="Il Congiuntivo Trapassato"
      subtitle="Ipotesi irreali nel passato, rimpianti e anteriorità."
      icon={BookOpen}
      exercises={eserciziCongiuntivoTrapassato}
      errorPrefix="Il Congiuntivo Trapassato"
      theoryComponent={theory}
    />
  );
}

function PassatoProssimoSection() {
  const theory = (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
          <Info size={20} /> Cos'è e come si forma?
        </h3>
        <p className="mb-4 text-slate-700">
          Il <strong>Passato Prossimo</strong> esprime un'azione avvenuta nel passato che ha ancora legami con il presente. Si forma con l'ausiliare (<strong>Essere</strong> o <strong>Avere</strong>) al presente + il <strong>Participio Passato</strong> del verbo.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-indigo-900">Ho mangiato</p>
              <PlayButton text="ho mangiato" />
            </div>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-emerald-900">Sono andato</p>
              <PlayButton text="sono andato" />
            </div>
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

      <section className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
          <Sparkles size={20} /> ✨ Altri Casi Importanti con "ESSERE"
        </h3>
        <p className="mb-4 text-purple-900 text-sm">
          Oltre ai verbi di movimento e stato, ci sono altre strutture grammaticali fondamentali che richiedono sempre l'ausiliare <strong>essere</strong>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Verbi Riflessivi e Reciproci */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">1. Verbi Riflessivi & Reciproci</span>
              <p className="text-xs text-slate-500 mt-1">
                Quando l'azione si rivolge su se stessi (*svegliarsi*) o è condivisa da più persone (*incontrarsi*).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Mi sono svegliato/a</span>
                <PlayButton text="mi sono svegliato, mi sono svegliata" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Ci siamo incontrati/e</span>
                <PlayButton text="ci siamo incontrati, ci siamo incontrate" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Si è vestito/a</span>
                <PlayButton text="si è vestito, si è vestita" size={12} />
              </div>
            </div>
          </div>

          {/* 2. Verbi Pronominali */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">2. Verbi Pronominali</span>
              <p className="text-xs text-slate-500 mt-1">
                Verbi che integrano pronomi per assumere un significato specifico (es. *andarsene*, *accorgersi*, *pentirsi*).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Mi sono accorto/a</span>
                <PlayButton text="mi sono accorto, mi sono accorta" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Me ne sono andato/a</span>
                <PlayButton text="me ne sono andato, me ne sono andata" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Si è pentito/a</span>
                <PlayButton text="si è pentito, si è pentita" size={12} />
              </div>
            </div>
          </div>

          {/* 3. Costruzioni Impersonali */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">3. Costruzioni Impersonali</span>
              <p className="text-xs text-slate-500 mt-1">
                Quando si usa il <strong>si impersonale</strong> o espressioni come *sembrare* o *accadere* in modo generico.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Si è mangiato bene</span>
                <PlayButton text="si è mangiato bene" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">Si è andati al cinema</span>
                <PlayButton text="si è andati al cinema" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">È sembrato strano</span>
                <PlayButton text="è sembrato strano" size={12} />
              </div>
            </div>
          </div>

          {/* 4. Forma Passiva */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">4. Forma Passiva</span>
              <p className="text-xs text-slate-500 mt-1">
                Quando il soggetto subisce l'azione anziché compierla. La forma passiva si forma sempre con *essere*.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">La pizza è stata mangiata</span>
                <PlayButton text="la pizza è stata mangiata" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">I libri sono stati letti</span>
                <PlayButton text="i libri sono stati letti" size={12} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-700 font-semibold">La casa è stata venduta</span>
                <PlayButton text="la casa è stata venduta" size={12} />
              </div>
            </div>
          </div>

          {/* 5. Verbi con Doppio Ausiliare (Essere o Avere?) */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <span className="block font-bold text-slate-800 text-sm">5. Verbi con Doppio Ausiliare (Transitivo vs Intransitivo)</span>
              <p className="text-xs text-slate-500 mt-1">
                Alcuni verbi (es. *finire*, *cambiare*, *cominciare*, *passare*, *salire*) usano <strong>avere</strong> se sono seguiti da un oggetto diretto (rispondono a "chi/cosa?"), e <strong>essere</strong> negli altri casi.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold text-emerald-600 uppercase">Intransitivo (Essere)</span>
                <div className="flex items-center justify-between bg-emerald-50/50 px-2 py-1 rounded">
                  <span className="text-xs font-mono text-emerald-800">La lezione è finita.</span>
                  <PlayButton text="la lezione è finita" size={12} />
                </div>
                <div className="flex items-center justify-between bg-emerald-50/50 px-2 py-1 rounded">
                  <span className="text-xs font-mono text-emerald-800">Il tempo è passato.</span>
                  <PlayButton text="il tempo è passato" size={12} />
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold text-blue-600 uppercase">Transitivo (Avere)</span>
                <div className="flex items-center justify-between bg-blue-50/50 px-2 py-1 rounded">
                  <span className="text-xs font-mono text-blue-800">Ho finito i compiti.</span>
                  <PlayButton text="ho finito i compiti" size={12} />
                </div>
                <div className="flex items-center justify-between bg-blue-50/50 px-2 py-1 rounded">
                  <span className="text-xs font-mono text-blue-800">Ho passato l'esame.</span>
                  <PlayButton text="ho passato l'esame" size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
        <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
          <span>🏠 I 30 Verbi con "ESSERE" più Importanti</span>
          <PlayButton text="i trenta verbi con essere più importanti" size={16} />
        </h3>
        <p className="mb-4 text-emerald-900 text-sm">
          Questi verbi formano il passato prossimo con l'ausiliare <strong>essere</strong>. Ricorda che il loro participio passato concorda sempre in genere e numero col soggetto (es. <em>lui è andato</em>, <em>lei è andata</em>).
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* 1. Andare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Andare</span>
              <span className="block text-xs text-slate-500 italic">to go</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">andato/a</span>
              <PlayButton text="sono andato, sono andata" size={12} />
            </div>
          </div>
          {/* 2. Venire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Venire</span>
              <span className="block text-xs text-slate-500 italic">to come</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">venuto/a</span>
              <PlayButton text="sono venuto, sono venuta" size={12} />
            </div>
          </div>
          {/* 3. Arrivare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Arrivare</span>
              <span className="block text-xs text-slate-500 italic">to arrive</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">arrivato/a</span>
              <PlayButton text="sono arrivato, sono arrivata" size={12} />
            </div>
          </div>
          {/* 4. Partire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Partire</span>
              <span className="block text-xs text-slate-500 italic">to depart/leave</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">partito/a</span>
              <PlayButton text="sono partito, sono partita" size={12} />
            </div>
          </div>
          {/* 5. Entrare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Entrare</span>
              <span className="block text-xs text-slate-500 italic">to enter</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">entrato/a</span>
              <PlayButton text="sono entrato, sono entrata" size={12} />
            </div>
          </div>
          {/* 6. Uscire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Uscire</span>
              <span className="block text-xs text-slate-500 italic">to go out</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">uscito/a</span>
              <PlayButton text="sono uscito, sono uscita" size={12} />
            </div>
          </div>
          {/* 7. Salire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Salire</span>
              <span className="block text-xs text-slate-500 italic">to go up</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">salito/a</span>
              <PlayButton text="sono salito, sono salita" size={12} />
            </div>
          </div>
          {/* 8. Scendere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Scendere</span>
              <span className="block text-xs text-slate-500 italic">to go down</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">sceso/a</span>
              <PlayButton text="sono sceso, sono scesa" size={12} />
            </div>
          </div>
          {/* 9. Cadere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Cadere</span>
              <span className="block text-xs text-slate-500 italic">to fall</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">caduto/a</span>
              <PlayButton text="sono caduto, sono caduta" size={12} />
            </div>
          </div>
          {/* 10. Tornare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Tornare</span>
              <span className="block text-xs text-slate-500 italic">to return</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">tornato/a</span>
              <PlayButton text="sono tornato, sono tornata" size={12} />
            </div>
          </div>
          {/* 11. Rimanere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Rimanere</span>
              <span className="block text-xs text-slate-500 italic">to remain</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">rimasto/a</span>
              <PlayButton text="sono rimasto, sono rimasta" size={12} />
            </div>
          </div>
          {/* 12. Restare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Restare</span>
              <span className="block text-xs text-slate-500 italic">to stay</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">restato/a</span>
              <PlayButton text="sono restato, sono restata" size={12} />
            </div>
          </div>
          {/* 13. Stare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Stare</span>
              <span className="block text-xs text-slate-500 italic">to stay/be</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">stato/a</span>
              <PlayButton text="sono stato, sono stata" size={12} />
            </div>
          </div>
          {/* 14. Essere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Essere</span>
              <span className="block text-xs text-slate-500 italic">to be</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">stato/a</span>
              <PlayButton text="sono stato, sono stata" size={12} />
            </div>
          </div>
          {/* 15. Nascere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Nascere</span>
              <span className="block text-xs text-slate-500 italic">to be born</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">nato/a</span>
              <PlayButton text="sono nato, sono nata" size={12} />
            </div>
          </div>
          {/* 16. Morire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Morire</span>
              <span className="block text-xs text-slate-500 italic">to die</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">morto/a</span>
              <PlayButton text="sono morto, sono morta" size={12} />
            </div>
          </div>
          {/* 17. Diventare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Diventare</span>
              <span className="block text-xs text-slate-500 italic">to become</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">diventato/a</span>
              <PlayButton text="sono diventato, sono diventata" size={12} />
            </div>
          </div>
          {/* 18. Piacere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Piacere</span>
              <span className="block text-xs text-slate-500 italic">to like/please</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">piaciuto/a</span>
              <PlayButton text="mi è piaciuto, mi è piaciuta" size={12} />
            </div>
          </div>
          {/* 19. Succedere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Succedere</span>
              <span className="block text-xs text-slate-500 italic">to happen</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">successo/a</span>
              <PlayButton text="è successo, è successa" size={12} />
            </div>
          </div>
          {/* 20. Crescere */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Crescere</span>
              <span className="block text-xs text-slate-500 italic">to grow</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">cresciuto/a</span>
              <PlayButton text="sono cresciuto, sono cresciuta" size={12} />
            </div>
          </div>
          {/* 21. Apparire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Apparire</span>
              <span className="block text-xs text-slate-500 italic">to appear</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">apparso/a</span>
              <PlayButton text="sono apparso, sono apparsa" size={12} />
            </div>
          </div>
          {/* 22. Sparire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Sparire</span>
              <span className="block text-xs text-slate-500 italic">to disappear</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">sparito/a</span>
              <PlayButton text="sono sparito, sono sparita" size={12} />
            </div>
          </div>
          {/* 23. Scomparire */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Scomparire</span>
              <span className="block text-xs text-slate-500 italic">to disappear/fade</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">scomparso/a</span>
              <PlayButton text="sono scomparso, sono scomparsa" size={12} />
            </div>
          </div>
          {/* 24. Sembrare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Sembrare</span>
              <span className="block text-xs text-slate-500 italic">to seem</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">sembrato/a</span>
              <PlayButton text="sono sembrato, sono sembrata" size={12} />
            </div>
          </div>
          {/* 25. Durare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Durare</span>
              <span className="block text-xs text-slate-500 italic">to last</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">durato/a</span>
              <PlayButton text="è durato, è durata" size={12} />
            </div>
          </div>
          {/* 26. Bastare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Bastare</span>
              <span className="block text-xs text-slate-500 italic">to be enough</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">bastato/a</span>
              <PlayButton text="è bastato, è bastata" size={12} />
            </div>
          </div>
          {/* 27. Mancare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Mancare</span>
              <span className="block text-xs text-slate-500 italic">to miss/lack</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">mancato/a</span>
              <PlayButton text="sono mancato, sono mancata" size={12} />
            </div>
          </div>
          {/* 28. Costare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Costare</span>
              <span className="block text-xs text-slate-500 italic">to cost</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">costato/a</span>
              <PlayButton text="è costato, è costata" size={12} />
            </div>
          </div>
          {/* 29. Rientrare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Rientrare</span>
              <span className="block text-xs text-slate-500 italic">to return/re-enter</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">rientrato/a</span>
              <PlayButton text="sono rientrato, sono rientrata" size={12} />
            </div>
          </div>
          {/* 30. Scappare */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="block font-bold text-slate-800 text-sm">Scappare</span>
              <span className="block text-xs text-slate-500 italic">to run away/escape</span>
            </div>
            <div className="flex items-center justify-between mt-2 border-t pt-1.5 border-slate-100">
              <span className="text-xs font-semibold text-emerald-700">scappato/a</span>
              <PlayButton text="sono scappato, sono scappata" size={12} />
            </div>
          </div>
        </div>
      </section>

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

  return (
    <TensePractice
      id="passato_prossimo"
      title="Il Passato Prossimo"
      subtitle="Il tempo del passato recente e della vita quotidiana."
      icon={BookOpen}
      exercises={eserciziPassatoProssimo}
      errorPrefix="Il Passato Prossimo"
      theoryComponent={theory}
    />
  );
}

function TrapassatoProssimoSection() {
  const theory = (
    <div className="space-y-8">
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
          <div className="flex-1 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-indigo-400 mb-1">Esempio con Avere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-indigo-900">Avevo mangiato</p>
              <PlayButton text="avevo mangiato" />
            </div>
            <p className="text-sm text-indigo-600 mt-1">(Imperfetto di avere + Participio)</p>
          </div>
          <div className="flex-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center flex flex-col items-center justify-center">
            <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Esempio con Essere</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-emerald-900">Ero andato</p>
              <PlayButton text="ero andato" />
            </div>
            <p className="text-sm text-emerald-600 mt-1">(Imperfetto di essere + Participio)</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Nota: Le regole per la scelta dell'ausiliare (essere vs avere) sono esattamente le stesse del Passato Prossimo!
        </p>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="trapassato_prossimo"
      title="Il Trapassato Prossimo"
      subtitle="Il passato nel passato."
      icon={BookOpen}
      exercises={eserciziTrapassatoProssimo}
      errorPrefix="Il Trapassato Prossimo"
      theoryComponent={theory}
    />
  );
}

const irregularEreVerbs = [
  {
    verb: "Chiedere",
    meaning: "to ask",
    regularRoot: "chied-",
    irregularRoot: "chies-",
    forms: { io: "chiesi", lui: "chiese", loro: "chiesero" },
    fullConjugation: "io chiesi, tu chiedesti, lui chiese, noi chiedemmo, voi chiedeste, loro chiesero"
  },
  {
    verb: "Decidere",
    meaning: "to decide",
    regularRoot: "decid-",
    irregularRoot: "decis-",
    forms: { io: "decisi", lui: "decise", loro: "decisero" },
    fullConjugation: "io decisi, tu decidesti, lui decise, noi decidemmo, voi decideste, loro decisero"
  },
  {
    verb: "Leggere",
    meaning: "to read",
    regularRoot: "legg-",
    irregularRoot: "less-",
    forms: { io: "lessi", lui: "lesse", loro: "lessero" },
    fullConjugation: "io lessi, tu leggesti, lui lesse, noi leggemmo, voi leggeste, loro lessero"
  },
  {
    verb: "Rispondere",
    meaning: "to answer",
    regularRoot: "rispond-",
    irregularRoot: "rispos-",
    forms: { io: "risposi", lui: "rispose", loro: "risposero" },
    fullConjugation: "io risposi, tu rispondesti, lui rispose, noi rispondemmo, voi rispondeste, loro risposero"
  },
  {
    verb: "Rimanere",
    meaning: "to remain",
    regularRoot: "riman-",
    irregularRoot: "rimas-",
    forms: { io: "rimasi", lui: "rimase", loro: "rimasero" },
    fullConjugation: "io rimasi, tu rimanesti, lui rimase, noi rimanemmo, voi rimaneste, loro rimasero"
  },
  {
    verb: "Chiudere",
    meaning: "to close",
    regularRoot: "chiud-",
    irregularRoot: "chius-",
    forms: { io: "chiusi", lui: "chiuse", loro: "chiusero" },
    fullConjugation: "io chiusi, tu chiudesti, lui chiuse, noi chiudemmo, voi chiudeste, loro chiusero"
  },
  {
    verb: "Correre",
    meaning: "to run",
    regularRoot: "corr-",
    irregularRoot: "cors-",
    forms: { io: "corsi", lui: "corse", loro: "corsero" },
    fullConjugation: "io corsi, tu corresti, lui corse, noi corremmo, voi correste, loro corsero"
  },
  {
    verb: "Nascere",
    meaning: "to be born",
    regularRoot: "nasc-",
    irregularRoot: "nacqu-",
    forms: { io: "nacqui", lui: "nacque", loro: "nacquero" },
    fullConjugation: "io nacqui, tu nascesti, lui nacque, noi nascemmo, voi nasceste, loro nacquero"
  },
  {
    verb: "Vincere",
    meaning: "to win",
    regularRoot: "vinc-",
    irregularRoot: "vins-",
    forms: { io: "vinsi", lui: "vinse", loro: "vinsero" },
    fullConjugation: "io vinsi, tu vincesti, lui vinse, noi vincemmo, voi vinceste, loro vinsero"
  },
  {
    verb: "Conoscere",
    meaning: "to know",
    regularRoot: "conosc-",
    irregularRoot: "conobb-",
    forms: { io: "conobbi", lui: "conobbe", loro: "conobbero" },
    fullConjugation: "io conobbi, tu conoscesti, lui conobbe, noi conoscemmo, voi conosceste, loro conobbero"
  },
  {
    verb: "Dipingere",
    meaning: "to paint",
    regularRoot: "diping-",
    irregularRoot: "dipins-",
    forms: { io: "dipinsi", lui: "dipinse", loro: "dipinsero" },
    fullConjugation: "io dipinsi, tu dipingesti, lui dipinse, noi dipingemmo, voi dipingeste, loro dipinsero"
  },
  {
    verb: "Prendere",
    meaning: "to take",
    regularRoot: "prend-",
    irregularRoot: "pres-",
    forms: { io: "presi", lui: "prese", loro: "presero" },
    fullConjugation: "io presi, tu prendesti, lui prese, noi prendemmo, voi prendeste, loro presero"
  }
];

function PassatoRemotoSection() {
  const theory = (
    <div className="space-y-8">
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
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-ARE (es. Parlare)</span>
                    <PlayButton text="io parlai, tu parlasti, lui parlò, noi parlammo, voi parlaste, loro parlarono" size={15} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-ERE (es. Credere)</span>
                    <PlayButton text="io credei, tu credesti, lui credé, noi credemmo, voi credeste, loro crederono" size={15} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-IRE (es. Dormire)</span>
                    <PlayButton text="io dormii, tu dormisti, lui dormì, noi dormimmo, voi dormiste, loro dormirono" size={15} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold">io</td>
                <VerbCell display={<>parl-<strong>ai</strong></>} speakText="parlai" />
                <VerbCell display={<>cred-<strong>ei</strong> <span className="text-xs text-slate-400">(o -etti)</span></>} speakText="credei" />
                <VerbCell display={<>dorm-<strong>ii</strong></>} speakText="dormii" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">tu</td>
                <VerbCell display={<>parl-<strong>asti</strong></>} speakText="parlasti" />
                <VerbCell display={<>cred-<strong>esti</strong></>} speakText="credesti" />
                <VerbCell display={<>dorm-<strong>isti</strong></>} speakText="dormisti" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">lui/lei</td>
                <VerbCell display={<>parl-<strong>ò</strong></>} speakText="parlò" />
                <VerbCell display={<>cred-<strong>é</strong> <span className="text-xs text-slate-400">(o -ette)</span></>} speakText="credé" />
                <VerbCell display={<>dorm-<strong>ì</strong></>} speakText="dormì" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">noi</td>
                <VerbCell display={<>parl-<strong>ammo</strong></>} speakText="parlammo" />
                <VerbCell display={<>cred-<strong>emmo</strong></>} speakText="credemmo" />
                <VerbCell display={<>dorm-<strong>immo</strong></>} speakText="dormimmo" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">voi</td>
                <VerbCell display={<>parl-<strong>aste</strong></>} speakText="parlaste" />
                <VerbCell display={<>cred-<strong>este</strong></>} speakText="credeste" />
                <VerbCell display={<>dorm-<strong>iste</strong></>} speakText="dormiste" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">loro</td>
                <VerbCell display={<>parl-<strong>arono</strong></>} speakText="parlarono" />
                <VerbCell display={<>cred-<strong>erono</strong> <span className="text-xs text-slate-400">(o -ettero)</span></>} speakText="crederono" />
                <VerbCell display={<>dorm-<strong>irono</strong></>} speakText="dormirono" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">La Regola Magica (1-3-6) per gli Irregolari</span>
          <PlayButton text="io presi, tu prendesti, lui prese, noi prendemmo, voi prendeste, loro presero" size={15} />
        </h3>
        <p className="mb-4 text-amber-900">
          Molti verbi italiani (soprattutto in <em>-ere</em>) sono irregolari al passato remoto. Ma c'è un trucco meraviglioso! L'irregolarità si presenta <strong>SOLO</strong> in tre persone (la 1ª, la 3ª e la 6ª). Le altre rimangono perfettamente regolari.
        </p>
        <p className="font-semibold text-amber-800 mb-2">Esempio con PRENDERE (radice reg. "prend-", radice irreg. "pres-"):</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ul className="space-y-2 bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <li className="flex items-center justify-between"><span><span className="inline-block w-6 text-amber-600 font-bold">1</span> <strong>Io pres-i</strong> (Irregolare)</span><PlayButton text="presi" /></li>
            <li className="flex items-center justify-between"><span><span className="inline-block w-6 text-slate-400">2</span> Tu prend-esti (Regolare)</span><PlayButton text="prendesti" /></li>
            <li className="flex items-center justify-between"><span><span className="inline-block w-6 text-amber-600 font-bold">3</span> <strong>Lui pres-e</strong> (Irregolare)</span><PlayButton text="prese" /></li>
            <li className="flex items-center justify-between"><span><span className="inline-block w-6 text-slate-400">4</span> Noi prend-emmo (Regolare)</span><PlayButton text="prendemmo" /></li>
            <li className="flex items-center justify-between"><span><span className="inline-block w-6 text-slate-400">5</span> Voi prend-este (Regolare)</span><PlayButton text="prendeste" /></li>
            <li className="flex items-center justify-between"><span><span className="inline-block w-6 text-amber-600 font-bold">6</span> <strong>Loro pres-ero</strong> (Irregolare)</span><PlayButton text="presero" /></li>
          </ul>
        </div>

        <div className="mt-6 border-t border-amber-200 pt-6">
          <h4 className="font-bold text-amber-900 mb-1 text-lg flex items-center gap-2">
            <span>📚 Esempi di altri verbi irregolari in <em>-ere</em> (1-3-6)</span>
          </h4>
          <p className="text-amber-800 text-sm mb-4">
            Usa il tasto audio per ascoltare l'intera coniugazione! Le persone 1ª, 3ª e 6ª usano la radice irregolare (indicata in grassetto), le altre mantengono la radice regolare.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {irregularEreVerbs.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-amber-100 flex flex-col justify-between">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <div>
                    <span className="font-bold text-amber-900 text-base">{item.verb}</span>
                    <span className="text-xs text-slate-500 ml-2">({item.meaning})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                      {item.regularRoot} ➔ <strong>{item.irregularRoot}</strong>
                    </span>
                    <PlayButton text={item.fullConjugation} size={15} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="bg-slate-50 p-2 rounded flex flex-col justify-center">
                    <span className="text-slate-400 text-[10px] uppercase">io (1ª)</span>
                    <span className="text-amber-800 font-semibold mt-0.5">{item.forms.io}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded flex flex-col justify-center">
                    <span className="text-slate-400 text-[10px] uppercase">lui/lei (3ª)</span>
                    <span className="text-amber-800 font-semibold mt-0.5">{item.forms.lui}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded flex flex-col justify-center">
                    <span className="text-slate-400 text-[10px] uppercase">loro (6ª)</span>
                    <span className="text-amber-800 font-semibold mt-0.5">{item.forms.loro}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
        <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
          🌟 Coniugazione dei Verbi Irregolari più Importanti
        </h3>
        <p className="mb-4 text-indigo-950 text-sm">
          Tutti i verbi elencati qui sotto (ad eccezione di <em>essere</em> che è completamente irregolare) seguono rigorosamente la <strong>regola del 1-3-6</strong>. Le persone 1, 3 e 6 (in grassetto) utilizzano la radice irregolare, mentre le persone 2, 4 e 5 usano la radice regolare del verbo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Card Essere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Essere</h4>
              <PlayButton text="io fui, tu fosti, lui fu, noi fummo, voi foste, loro furono" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>fui</strong></span><PlayButton text="fui" /></li>
              <li className="flex items-center justify-between"><span>tu fosti</span><PlayButton text="fosti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>fu</strong></span><PlayButton text="fu" /></li>
              <li className="flex items-center justify-between"><span>noi fummo</span><PlayButton text="fummo" /></li>
              <li className="flex items-center justify-between"><span>voi foste</span><PlayButton text="foste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>furono</strong></span><PlayButton text="furono" /></li>
            </ul>
          </div>
          {/* Card Avere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Avere</h4>
              <PlayButton text="io ebbi, tu avesti, lui ebbe, noi avemmo, voi aveste, loro ebbero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>ebbi</strong></span><PlayButton text="ebbi" /></li>
              <li className="flex items-center justify-between"><span>tu avesti</span><PlayButton text="avesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>ebbe</strong></span><PlayButton text="ebbe" /></li>
              <li className="flex items-center justify-between"><span>noi avemmo</span><PlayButton text="avemmo" /></li>
              <li className="flex items-center justify-between"><span>voi aveste</span><PlayButton text="aveste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>ebbero</strong></span><PlayButton text="ebbero" /></li>
            </ul>
          </div>
          {/* Card Fare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Fare</h4>
              <PlayButton text="io feci, tu facesti, lui fece, noi facemmo, voi faceste, loro fecero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>feci</strong></span><PlayButton text="feci" /></li>
              <li className="flex items-center justify-between"><span>tu facesti</span><PlayButton text="facesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>fece</strong></span><PlayButton text="fece" /></li>
              <li className="flex items-center justify-between"><span>noi facemmo</span><PlayButton text="facemmo" /></li>
              <li className="flex items-center justify-between"><span>voi faceste</span><PlayButton text="faceste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>fecero</strong></span><PlayButton text="fecero" /></li>
            </ul>
          </div>
          {/* Card Dire */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Dire</h4>
              <PlayButton text="io dissi, tu dicesti, lui disse, noi dicemmo, voi diceste, loro dissero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>dissi</strong></span><PlayButton text="dissi" /></li>
              <li className="flex items-center justify-between"><span>tu dicesti</span><PlayButton text="dicesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>disse</strong></span><PlayButton text="disse" /></li>
              <li className="flex items-center justify-between"><span>noi dicemmo</span><PlayButton text="dicemmo" /></li>
              <li className="flex items-center justify-between"><span>voi diceste</span><PlayButton text="diceste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>dissero</strong></span><PlayButton text="dissero" /></li>
            </ul>
          </div>
          {/* Card Venire */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Venire</h4>
              <PlayButton text="io venni, tu venisti, lui venne, noi venimmo, voi veniste, loro vennero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>venni</strong></span><PlayButton text="venni" /></li>
              <li className="flex items-center justify-between"><span>tu venisti</span><PlayButton text="venisti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>venne</strong></span><PlayButton text="venne" /></li>
              <li className="flex items-center justify-between"><span>noi venimmo</span><PlayButton text="venimmo" /></li>
              <li className="flex items-center justify-between"><span>voi veniste</span><PlayButton text="veniste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>vennero</strong></span><PlayButton text="vennero" /></li>
            </ul>
          </div>
          {/* Card Vedere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Vedere</h4>
              <PlayButton text="io vidi, tu vedesti, lui vide, noi vedemmo, voi vedeste, loro videro" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>vidi</strong></span><PlayButton text="vidi" /></li>
              <li className="flex items-center justify-between"><span>tu vedesti</span><PlayButton text="vedesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>vide</strong></span><PlayButton text="vide" /></li>
              <li className="flex items-center justify-between"><span>noi vedemmo</span><PlayButton text="vedemmo" /></li>
              <li className="flex items-center justify-between"><span>voi vedeste</span><PlayButton text="vedeste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>videro</strong></span><PlayButton text="videro" /></li>
            </ul>
          </div>
          {/* Card Volere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Volere</h4>
              <PlayButton text="io volli, tu volesti, lui volle, noi volemmo, voi voleste, loro vollero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>volli</strong></span><PlayButton text="volli" /></li>
              <li className="flex items-center justify-between"><span>tu volesti</span><PlayButton text="volesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>volle</strong></span><PlayButton text="volle" /></li>
              <li className="flex items-center justify-between"><span>noi volemmo</span><PlayButton text="volemmo" /></li>
              <li className="flex items-center justify-between"><span>voi voleste</span><PlayButton text="voleste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>vollero</strong></span><PlayButton text="vollero" /></li>
            </ul>
          </div>
          {/* Card Dare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Dare</h4>
              <PlayButton text="io diedi, tu desti, lui diede, noi demmo, voi deste, loro diedero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>diedi</strong> <span className="text-[10px] text-slate-400">(detti)</span></span><PlayButton text="diedi" /></li>
              <li className="flex items-center justify-between"><span>tu desti</span><PlayButton text="desti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>diede</strong> <span className="text-[10px] text-slate-400">(dette)</span></span><PlayButton text="diede" /></li>
              <li className="flex items-center justify-between"><span>noi demmo</span><PlayButton text="demmo" /></li>
              <li className="flex items-center justify-between"><span>voi deste</span><PlayButton text="deste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>diedero</strong> <span className="text-[10px] text-slate-400">(dettero)</span></span><PlayButton text="diedero" /></li>
            </ul>
          </div>
          {/* Card Stare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Stare</h4>
              <PlayButton text="io stetti, tu stesti, lui stette, noi stemmo, voi steste, loro stettero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>stetti</strong></span><PlayButton text="stetti" /></li>
              <li className="flex items-center justify-between"><span>tu stesti</span><PlayButton text="stesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>stette</strong></span><PlayButton text="stette" /></li>
              <li className="flex items-center justify-between"><span>noi stemmo</span><PlayButton text="stemmo" /></li>
              <li className="flex items-center justify-between"><span>voi steste</span><PlayButton text="steste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>stettero</strong></span><PlayButton text="stettero" /></li>
            </ul>
          </div>
          {/* Card Bere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Bere</h4>
              <PlayButton text="io bevvi, tu bevesti, lui bevve, noi bevemmo, voi beveste, loro bevvero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>bevvi</strong></span><PlayButton text="bevvi" /></li>
              <li className="flex items-center justify-between"><span>tu bevesti</span><PlayButton text="bevesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>bevve</strong></span><PlayButton text="bevve" /></li>
              <li className="flex items-center justify-between"><span>noi bevemmo</span><PlayButton text="bevemmo" /></li>
              <li className="flex items-center justify-between"><span>voi beveste</span><PlayButton text="beveste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>bevvero</strong></span><PlayButton text="bevvero" /></li>
            </ul>
          </div>
          {/* Card Mettere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Mettere</h4>
              <PlayButton text="io misi, tu mettesti, lui mise, noi mettemmo, voi metteste, loro misero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>misi</strong></span><PlayButton text="misi" /></li>
              <li className="flex items-center justify-between"><span>tu mettesti</span><PlayButton text="mettesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>mise</strong></span><PlayButton text="mise" /></li>
              <li className="flex items-center justify-between"><span>noi mettemmo</span><PlayButton text="mettemmo" /></li>
              <li className="flex items-center justify-between"><span>voi metteste</span><PlayButton text="metteste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>misero</strong></span><PlayButton text="misero" /></li>
            </ul>
          </div>
          {/* Card Scrivere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Scrivere</h4>
              <PlayButton text="io scrissi, tu scrivesti, lui scrisse, noi scrivemmo, voi scriveste, loro scrissero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>scrissi</strong></span><PlayButton text="scrissi" /></li>
              <li className="flex items-center justify-between"><span>tu scrivesti</span><PlayButton text="scrivesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>scrisse</strong></span><PlayButton text="scrisse" /></li>
              <li className="flex items-center justify-between"><span>noi scrivemmo</span><PlayButton text="scrivemmo" /></li>
              <li className="flex items-center justify-between"><span>voi scriveste</span><PlayButton text="scriveste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>scrissero</strong></span><PlayButton text="scrissero" /></li>
            </ul>
          </div>
          {/* Card Sapere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Sapere</h4>
              <PlayButton text="io seppi, tu sapesti, lui seppe, noi sapemmo, voi sapeste, loro seppero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>seppi</strong></span><PlayButton text="seppi" /></li>
              <li className="flex items-center justify-between"><span>tu sapesti</span><PlayButton text="sapesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>seppe</strong></span><PlayButton text="seppe" /></li>
              <li className="flex items-center justify-between"><span>noi sapemmo</span><PlayButton text="sapemmo" /></li>
              <li className="flex items-center justify-between"><span>voi sapeste</span><PlayButton text="sapeste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>seppero</strong></span><PlayButton text="seppero" /></li>
            </ul>
          </div>
          {/* Card Prendere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Prendere</h4>
              <PlayButton text="io presi, tu prendesti, lui prese, noi prendemmo, voi prendeste, loro presero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>presi</strong></span><PlayButton text="presi" /></li>
              <li className="flex items-center justify-between"><span>tu prendesti</span><PlayButton text="prendesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>prese</strong></span><PlayButton text="prese" /></li>
              <li className="flex items-center justify-between"><span>noi prendemmo</span><PlayButton text="prendemmo" /></li>
              <li className="flex items-center justify-between"><span>voi prendeste</span><PlayButton text="prendeste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>presero</strong></span><PlayButton text="presero" /></li>
            </ul>
          </div>
          {/* Card Rimanere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Rimanere</h4>
              <PlayButton text="io rimasi, tu rimanesti, lui rimase, noi rimanemmo, voi rimaneste, loro rimasero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>rimasi</strong></span><PlayButton text="rimasi" /></li>
              <li className="flex items-center justify-between"><span>tu rimanesti</span><PlayButton text="rimanesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>rimase</strong></span><PlayButton text="rimase" /></li>
              <li className="flex items-center justify-between"><span>noi rimanemmo</span><PlayButton text="rimanemmo" /></li>
              <li className="flex items-center justify-between"><span>voi rimaneste</span><PlayButton text="rimaneste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>rimasero</strong></span><PlayButton text="rimasero" /></li>
            </ul>
          </div>
          {/* Card Leggere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Leggere</h4>
              <PlayButton text="io lessi, tu leggesti, lui lesse, noi leggemmo, voi leggeste, loro lessero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>lessi</strong></span><PlayButton text="lessi" /></li>
              <li className="flex items-center justify-between"><span>tu leggesti</span><PlayButton text="leggesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>lesse</strong></span><PlayButton text="lesse" /></li>
              <li className="flex items-center justify-between"><span>noi leggemmo</span><PlayButton text="leggemmo" /></li>
              <li className="flex items-center justify-between"><span>voi leggeste</span><PlayButton text="leggeste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>lessero</strong></span><PlayButton text="lessero" /></li>
            </ul>
          </div>
          {/* Card Rompere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Rompere</h4>
              <PlayButton text="io ruppi, tu rompesti, lui ruppe, noi rompemmo, voi rompeste, loro ruppero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>ruppi</strong></span><PlayButton text="ruppi" /></li>
              <li className="flex items-center justify-between"><span>tu rompesti</span><PlayButton text="rompesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>ruppe</strong></span><PlayButton text="ruppe" /></li>
              <li className="flex items-center justify-between"><span>noi rompemmo</span><PlayButton text="rompemmo" /></li>
              <li className="flex items-center justify-between"><span>voi rompeste</span><PlayButton text="rompeste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>ruppero</strong></span><PlayButton text="ruppero" /></li>
            </ul>
          </div>
          {/* Card Cadere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-indigo-800">Cadere</h4>
              <PlayButton text="io caddi, tu cadesti, lui cadde, noi cademmo, voi cadeste, loro caddero" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>io <strong>caddi</strong></span><PlayButton text="caddi" /></li>
              <li className="flex items-center justify-between"><span>tu cadesti</span><PlayButton text="cadesti" /></li>
              <li className="flex items-center justify-between"><span>lui/lei <strong>cadde</strong></span><PlayButton text="cadde" /></li>
              <li className="flex items-center justify-between"><span>noi cademmo</span><PlayButton text="cademmo" /></li>
              <li className="flex items-center justify-between"><span>voi cadeste</span><PlayButton text="cadeste" /></li>
              <li className="flex items-center justify-between"><span>loro <strong>caddero</strong></span><PlayButton text="caddero" /></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="passato_remoto"
      title="Il Passato Remoto"
      subtitle="Il tempo del passato lontano e della letteratura."
      icon={BookOpen}
      exercises={eserciziPassatoRemoto}
      errorPrefix="Il Passato Remoto"
      theoryComponent={theory}
    />
  );
}

function ImperativoSection() {
  const theory = (
    <div className="space-y-8">
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
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-ARE (Guardare)</span>
                    <PlayButton text="tu guarda, lei guardi, noi guardiamo, voi guardate" size={15} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-ERE (Prendere)</span>
                    <PlayButton text="tu prendi, lei prenda, noi prendiamo, voi prendete" size={15} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-IRE (Aprire)</span>
                    <PlayButton text="tu apri, lei apra, noi apriamo, voi aprite" size={15} />
                  </div>
                </th>
                <th className="p-3 border">
                  <div className="flex items-center justify-between gap-1">
                    <span>-IRE (Finire)*</span>
                    <PlayButton text="tu finisci, lei finisca, noi finiamo, voi finite" size={15} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold text-emerald-600">tu</td>
                <VerbCell display={<>guard-a</>} speakText="guarda" className="text-emerald-700 font-bold" />
                <VerbCell display={<>prend-i</>} speakText="prendi" />
                <VerbCell display={<>apr-i</>} speakText="apri" />
                <VerbCell display={<>fin-isc-i</>} speakText="finisci" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold text-purple-600">Lei (Cortesia)</td>
                <VerbCell display={<>guard-i</>} speakText="guardi" className="text-purple-700 font-bold" />
                <VerbCell display={<>prend-a</>} speakText="prenda" />
                <VerbCell display={<>apr-a</>} speakText="apra" />
                <VerbCell display={<>fin-isc-a</>} speakText="finisca" />
              </tr>
              <tr>
                <td className="p-3 border font-semibold">noi</td>
                <VerbCell display={<>guard-iamo</>} speakText="guardiamo" />
                <VerbCell display={<>prend-iamo</>} speakText="prendiamo" />
                <VerbCell display={<>apr-iamo</>} speakText="apriamo" />
                <VerbCell display={<>fin-iamo</>} speakText="finiamo" />
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 border font-semibold">voi</td>
                <VerbCell display={<>guard-ate</>} speakText="guardate" />
                <VerbCell display={<>prend-ete</>} speakText="prendete" />
                <VerbCell display={<>apr-ite</>} speakText="aprite" />
                <VerbCell display={<>fin-ite</>} speakText="finite" />
              </tr>
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

      <section className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
        <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">🌟 Coniugazione dei Verbi Irregolari più Importanti</span>
        </h3>
        <p className="mb-4 text-emerald-950 text-sm">
          I verbi elencati qui sotto presentano forme irregolari e molto comuni all'imperativo. Ricorda che la forma di cortesia (Lei) coincide con il congiuntivo presente.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Card Essere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Essere</h4>
              <PlayButton text="tu sii, lei sia, noi siamo, voi siate" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>sii</strong></span><PlayButton text="sii" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>sia</strong></span><PlayButton text="sia" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>siamo</strong></span><PlayButton text="siamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>siate</strong></span><PlayButton text="siate" /></li>
            </ul>
          </div>
          {/* Card Avere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Avere</h4>
              <PlayButton text="tu abbi, lei abbia, noi abbiamo, voi abbiate" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>abbi</strong></span><PlayButton text="abbi" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>abbia</strong></span><PlayButton text="abbia" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>abbiamo</strong></span><PlayButton text="abbiamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>abbiate</strong></span><PlayButton text="abbiate" /></li>
            </ul>
          </div>
          {/* Card Fare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Fare</h4>
              <PlayButton text="tu fa' o fai, lei faccia, noi facciamo, voi fate" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>fa' / fai</strong></span><PlayButton text="fa'" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>faccia</strong></span><PlayButton text="faccia" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>facciamo</strong></span><PlayButton text="facciamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>fate</strong></span><PlayButton text="fate" /></li>
            </ul>
          </div>
          {/* Card Dire */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Dire</h4>
              <PlayButton text="tu di', lei dica, noi diciamo, voi dite" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>di'</strong></span><PlayButton text="di'" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>dica</strong></span><PlayButton text="dica" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>diciamo</strong></span><PlayButton text="diciamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>dite</strong></span><PlayButton text="dite" /></li>
            </ul>
          </div>
          {/* Card Andare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Andare</h4>
              <PlayButton text="tu va' o vai, lei vada, noi andiamo, voi andate" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>va' / vai</strong></span><PlayButton text="va'" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>vada</strong></span><PlayButton text="vada" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>andiamo</strong></span><PlayButton text="andiamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>andate</strong></span><PlayButton text="andate" /></li>
            </ul>
          </div>
          {/* Card Stare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Stare</h4>
              <PlayButton text="tu sta' o stai, lei stia, noi stiamo, voi state" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>sta' / stai</strong></span><PlayButton text="sta'" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>stia</strong></span><PlayButton text="stia" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>stiamo</strong></span><PlayButton text="stiamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>state</strong></span><PlayButton text="state" /></li>
            </ul>
          </div>
          {/* Card Dare */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Dare</h4>
              <PlayButton text="tu da' o dai, lei dia, noi diamo, voi date" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>da' / dai</strong></span><PlayButton text="da'" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>dia</strong></span><PlayButton text="dia" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>diamo</strong></span><PlayButton text="diamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>date</strong></span><PlayButton text="date" /></li>
            </ul>
          </div>
          {/* Card Venire */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Venire</h4>
              <PlayButton text="tu vieni, lei venga, noi veniamo, voi venite" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>vieni</strong></span><PlayButton text="vieni" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>venga</strong></span><PlayButton text="venga" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>veniamo</strong></span><PlayButton text="veniamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>venite</strong></span><PlayButton text="venite" /></li>
            </ul>
          </div>
          {/* Card Sapere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Sapere</h4>
              <PlayButton text="tu sappi, lei sappia, noi sappiamo, voi sappiate" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>sappi</strong></span><PlayButton text="sappi" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>sappia</strong></span><PlayButton text="sappia" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>sappiamo</strong></span><PlayButton text="sappiamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>sappiate</strong></span><PlayButton text="sappiate" /></li>
            </ul>
          </div>
          {/* Card Volere */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h4 className="font-bold text-emerald-800">Volere</h4>
              <PlayButton text="tu vogli, lei voglia, noi vogliamo, voi vogliate" size={15} />
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex items-center justify-between"><span>tu <strong>vogli</strong></span><PlayButton text="vogli" /></li>
              <li className="flex items-center justify-between"><span>Lei (formale) <strong>voglia</strong></span><PlayButton text="voglia" /></li>
              <li className="flex items-center justify-between"><span>noi <strong>vogliamo</strong></span><PlayButton text="vogliamo" /></li>
              <li className="flex items-center justify-between"><span>voi <strong>vogliate</strong></span><PlayButton text="vogliate" /></li>
            </ul>
          </div>
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
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-700">"Non parlare!"</span>
                <PlayButton text="Non parlare!" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-700">"Non correre!"</span>
                <PlayButton text="Non correre!" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
            <h4 className="font-bold text-slate-700 mb-2 border-b pb-1">Per le altre persone</h4>
            <p className="text-2xl font-black text-center text-slate-600 my-4">NON + IMPERATIVO</p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-700">"Non parli (Lei)!"</span>
                <PlayButton text="Non parli!" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-700">"Non correte (voi)!"</span>
                <PlayButton text="Non correte!" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="imperativo"
      title="L'Imperativo"
      subtitle="Ordini, consigli, istruzioni e preghiere."
      icon={BookOpen}
      exercises={eserciziImperativo}
      errorPrefix="L'Imperativo"
      theoryComponent={theory}
    />
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

    speakItalian(cleanWord);
  };

  const speakFullConjugation = (forms) => {
    const parts = pronouns.map((p, i) => {
      const form = forms[i];
      if (!form || form === "-" || form.includes("N/A")) return "";
      
      let cleanForm = form;
      if (form.endsWith('/a') || form.endsWith('/e')) {
        cleanForm = form.slice(0, -2);
      } else if (form.includes('/')) {
        cleanForm = form.split('/')[0].trim();
      }
      
      const pronoun = p === "lui/lei" ? "lui" : p;
      return `${pronoun} ${cleanForm}`;
    }).filter(Boolean);
    
    if (parts.length > 0) {
      speakItalian(parts.join("; "));
    }
  };

  const speakFullImperativo = (forms) => {
    const pronounsList = ["(io)", "tu", "lei", "noi", "voi"];
    const parts = pronounsList.map((p, i) => {
      if (i === 0) return ""; // Skip io
      const form = forms[i];
      if (!form || form === "-" || form.toLowerCase().includes("non ha") || form.includes("N/A")) return "";
      
      let cleanForm = form;
      if (form.endsWith('/a') || form.endsWith('/e')) {
        cleanForm = form.slice(0, -2);
      } else if (form.includes('/')) {
        cleanForm = form.split('/')[0].trim();
      }
      
      return `${p} ${cleanForm}`;
    }).filter(Boolean);
    
    if (parts.length > 0) {
      speakItalian(parts.join("; "));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <header>
        <h2 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-100 pb-2">I 100 Verbi Più Comuni</h2>
        <p className="text-slate-600 mt-2 text-lg">Esplora le coniugazioni per i 12 tempi verbali. Clicca su un verbo per espanderlo.</p>
      </header>

      <div className="space-y-3">
        {top100Verbs.map((verb, index) => {
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
                  {verb.prep && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                      + {verb.prep}
                    </span>
                  )}
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

                  {/* Congiuntivo Imperfetto */}
                  <div className="bg-fuchsia-50 p-4 rounded-lg border border-fuchsia-100">
                    <div className="flex justify-between items-center mb-3 border-b border-fuchsia-200 pb-2">
                      <h4 className="font-bold text-fuchsia-800 text-lg">Congiuntivo Imp.</h4>
                      <TypeBadge type={verb.typeCongImp} />
                    </div>
                    <table className="w-full text-sm">
                      <tbody>
                        {pronouns.map((p, i) => (
                          <tr key={p} className={i % 2 === 0 ? 'bg-white' : ''}>
                            <td className="py-2 px-3 text-slate-500 w-20">{p}</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <div className="flex items-center justify-between gap-2">
                                <span>{verb.congiuntivoImperfetto[i]}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); speakWord(verb.congiuntivoImperfetto[i]); }}
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
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-indigo-800 text-lg">Passato Remoto</h4>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakFullConjugation(verb.passatoRemoto); }}
                          className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex-shrink-0"
                          title="Ascolta la coniugazione completa"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
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
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-emerald-800 text-lg">Imperativo</h4>
                        {verb.imperativo[1] !== "Non ha imperativo" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); speakFullImperativo(verb.imperativo); }}
                            className="p-1 rounded text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors flex-shrink-0"
                            title="Ascolta la coniugazione completa"
                          >
                            <Volume2 size={16} />
                          </button>
                        )}
                      </div>
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
  const { logError, resolveError, userErrors } = useAuth() || {};

  const mistakes = Object.values(userErrors || {})
    .filter(e => e.type === 'quiz_verb')
    .map(e => ({ verb: e.verb, tense: e.tense }));

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
      if (q) {
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
      const tenses = actualMode === 'misto' ? ['presente', 'imperfetto', 'futuro', 'condizionale', 'condizionalePassato', 'congiuntivoPresente', 'congiuntivoImperfetto', 'congiuntivoPassato', 'congiuntivoTrapassato', 'passatoProssimo', 'trapassatoProssimo', 'passatoRemoto', 'imperativo'] : [actualMode];
      selectedTense = tenses[Math.floor(Math.random() * tenses.length)];

      let validVerbs = top100Verbs;
      if (selectedTense === 'imperativo') {
        validVerbs = top100Verbs.filter(v => v.imperativo[1] !== "Non ha imperativo");
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
    else if (selectedTense === 'congiuntivoImperfetto') correctAnswers = selectedVerb.congiuntivoImperfetto;
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

    currentQuestion.displayPronouns.forEach((pronoun, i) => {
      const correctAns = currentQuestion.correctAnswers[i];
      if (isAnswerCorrect(userAnswers[i], correctAns)) {
        currentCorrect++;
      } else {
        hasError = true;
      }
    });

    const exId = `quiz_${currentQuestion.verb.infinitive}_${currentQuestion.tense}`;

    if (hasError) {
      if (logError) {
        logError({
          id: exId,
          type: 'quiz_verb',
          verb: currentQuestion.verb,
          tense: currentQuestion.tense,
          displayPronouns: currentQuestion.displayPronouns,
          correctAnswers: currentQuestion.correctAnswers,
          sentence: `Coniuga "${currentQuestion.verb.infinitive}" al ${currentQuestion.tense.replace(/([A-Z])/g, ' $1').toLowerCase()}`
        }, "Quiz Pratico");
      }
    } else {
      if (resolveError) resolveError(exId);
    }

    setScore({
      correct: score.correct + currentCorrect,
      total: score.total + currentQuestion.displayPronouns.length
    });

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
    if (tense === 'congiuntivoImperfetto') return "Il Congiuntivo Imperfetto";
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
    if (question.tense === 'congiuntivoImperfetto') return question.verb.typeCongImp;
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
              onClick={() => handleModeChange('congiuntivoImperfetto')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${quizMode === 'congiuntivoImperfetto' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Congiuntivo Imp.
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
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${currentBadgeType === "Irregolare"
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
                className={`px-5 py-3 font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 ${isListening
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

          <div className="flex gap-3">
            {!showResults ? (
              <>
                <button
                  onClick={() => generateQuestion()}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <SkipForward size={20} /> Salta
                </button>
                <button
                  onClick={checkAnswers}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <Check size={20} /> Controlla le risposte
                </button>
              </>
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