import React from 'react';
import { BookOpen, BrainCircuit, Volume2 } from 'lucide-react';
import { TensePractice } from './TensePractice';
import { speakItalian } from '../utils/speech';

function PlayButton({ text }) {
  return (
    <button
      onClick={() => speakItalian(text)}
      className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors inline-flex items-center justify-center flex-shrink-0"
      title="Ascolta la pronuncia"
    >
      <Volume2 size={14} />
    </button>
  );
}

const exerciseData = [
  { id: 'cong_imp_1', sentence: "Pensavo che Luigi {blank} (andare) al supermercato.", answer: "andasse" },
  { id: 'cong_imp_2', sentence: "Vorrei che tu mi {blank} (dire) la verità.", answer: "dicessi" },
  { id: 'cong_imp_3', sentence: "Era probabile che noi {blank} (essere) in ritardo.", answer: "fossimo" },
  { id: 'cong_imp_4', sentence: "Speravo che loro {blank} (fare) un buon lavoro.", answer: "facessero" },
  { id: 'cong_imp_5', sentence: "Voleva che voi {blank} (capire) la situatione.", answer: "capiste" },
  { id: 'cong_imp_6', sentence: "Mi sembrava che Maria {blank} (bere) troppa acqua.", answer: "bevesse" },
  { id: 'cong_imp_7', sentence: "Credevo che voi gli {blank} (dare) una mano.", answer: "deste" },
  { id: 'cong_imp_8', sentence: "Non sapevo che loro {blank} (stare) così male.", answer: "stessero" },
  { id: 'cong_imp_9', sentence: "Pensavo che tu {blank} (sapere) la risposta.", answer: "sapessi" },
  { id: 'cong_imp_10', sentence: "Desideravo che lui {blank} (venire) con noi.", answer: "venisse" },
  { id: 'cong_imp_11', sentence: "Era necessario che noi {blank} (partire) subito.", answer: "partissimo" },
  { id: 'cong_imp_12', sentence: "Credevo che voi {blank} (avere) ragione.", answer: "aveste" },
  { id: 'cong_imp_13', sentence: "Speravo che io {blank} (potere) aiutarvi.", answer: "potessi" },
  { id: 'cong_imp_14', sentence: "Volevo che lei {blank} (uscire) di casa.", answer: "uscisse" },
  { id: 'cong_imp_15', sentence: "Sembrava che loro non {blank} (volere) ascoltare.", answer: "volessero" },
  { id: 'cong_imp_16', sentence: "Non pensavo che il film {blank} (finire) così tardi.", answer: "finisse" },
  { id: 'cong_imp_17', sentence: "Vorrei che tu {blank} (studiare) di più.", answer: "studiassi" },
  { id: 'cong_imp_18', sentence: "Speravamo che non {blank} (piovere) oggi.", answer: "piovesse" },
  { id: 'cong_imp_19', sentence: "Era strano che lui non {blank} (parlare).", answer: "parlasse" },
  { id: 'cong_imp_20', sentence: "Credevano che noi {blank} (dormire).", answer: "dormissimo" },
  { id: 'cong_imp_21', sentence: "Voleva che io {blank} (leggere) quel libro.", answer: "leggessi" },
  { id: 'cong_imp_22', sentence: "Mi sembrava che tu {blank} (scrivere) molto bene.", answer: "scrivessi" },
  { id: 'cong_imp_23', sentence: "Speravo che voi {blank} (vincere) la partita.", answer: "vinceste" },
  { id: 'cong_imp_24', sentence: "Pensavamo che loro {blank} (dovere) farlo.", answer: "dovessero" },
  { id: 'cong_imp_25', sentence: "Era meglio che tu {blank} (rimanere) qui.", answer: "rimanessi" },
  { id: 'cong_imp_26', sentence: "Desideravo che Maria {blank} (cantare) per noi.", answer: "cantasse" },
  { id: 'cong_imp_27', sentence: "Non credevo che voi {blank} (credere) ai fantasmi.", answer: "credeste" },
  { id: 'cong_imp_28', sentence: "Speravo che noi {blank} (trovare) i biglietti.", answer: "trovassimo" },
  { id: 'cong_imp_29', sentence: "Volevo che tu {blank} (mettere) in ordine la stanza.", answer: "mettessi" },
  { id: 'cong_imp_30', sentence: "Sembrava che lui {blank} (perdere) la pazienza.", answer: "perdesse" },
  { id: 'cong_imp_31', sentence: "Era giusto che loro {blank} (pagare) il conto.", answer: "pagassero" },
  { id: 'cong_imp_32', sentence: "Speravo che lei {blank} (rispondere) subito.", answer: "rispondesse" },
  { id: 'cong_imp_33', sentence: "Pensavo che noi {blank} (arrivare) in tempo.", answer: "arrivassimo" },
  { id: 'cong_imp_34', sentence: "Voleva che io {blank} (chiudere) la finestra.", answer: "chiudessi" },
  { id: 'cong_imp_35', sentence: "Credevo che voi {blank} (aprire) la porta.", answer: "apriste" },
  { id: 'cong_imp_36', sentence: "Mi sembrava che loro ci {blank} (offrire) da bere.", answer: "offrissero" },
  { id: 'cong_imp_37', sentence: "Speravo che tu {blank} (soffrire) meno.", answer: "soffrissi" },
  { id: 'cong_imp_38', sentence: "Era importante che noi {blank} (seguire) le regole.", answer: "seguissimo" },
  { id: 'cong_imp_39', sentence: "Desideravo che lui {blank} (costruire) una casa.", answer: "costruisse" },
  { id: 'cong_imp_40', sentence: "Pensavo che voi {blank} (preferire) il mare.", answer: "preferiste" },
  { id: 'cong_imp_41', sentence: "Volevo che loro {blank} (pulire) la cucina.", answer: "pulissero" },
  { id: 'cong_imp_42', sentence: "Credevo che io {blank} (spedire) il pacco.", answer: "spedissi" },
  { id: 'cong_imp_43', sentence: "Speravo che tu non {blank} (mentire).", answer: "mentissi" },
  { id: 'cong_imp_44', sentence: "Era peccato che noi non {blank} (uscire) insieme.", answer: "uscissimo" },
  { id: 'cong_imp_45', sentence: "Mi sembrava che lui {blank} (cercare) qualcosa.", answer: "cercasse" },
  { id: 'cong_imp_46', sentence: "Voleva che voi {blank} (mangiare) tutto.", answer: "mangiaste" },
  { id: 'cong_imp_47', sentence: "Pensavo che loro {blank} (giocare) bene.", answer: "giocassero" },
  { id: 'cong_imp_48', sentence: "Speravo che tu {blank} (cominciare) a studiare.", answer: "cominciassi" },
  { id: 'cong_imp_49', sentence: "Credevo che noi {blank} (viaggiare) in treno.", answer: "viaggiassimo" },
  { id: 'cong_imp_50', sentence: "Era impossibile che lui {blank} (dimenticare) il tuo nome.", answer: "dimenticasse" }
];

export function CongiuntivoImperfettoSection() {
  const theory = (
    <div className="space-y-8">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          <BrainCircuit className="text-indigo-500" />
          La Formazione
        </h3>
        <p className="text-slate-700 text-lg leading-relaxed mb-6">
          Il congiuntivo imperfetto è facilissimo da formare! Per quasi tutti i verbi (regolari e irregolari), basta prendere la prima persona dell'indicativo imperfetto (es. <strong>parlavo</strong>, <strong>leggevo</strong>, <strong>sentivo</strong>), togliere "vo" e aggiungere le desinenze del congiuntivo imperfetto:
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h4 className="font-bold text-indigo-800 text-xl mb-4 flex items-center justify-between border-b border-indigo-200 pb-2">
              <span>Parlare</span>
              <PlayButton text="che io parlassi. che tu parlassi. che lui parlasse. che noi parlassimo. che voi parlaste. che loro parlassero." />
            </h4>
            <ul className="space-y-2 text-indigo-900 text-lg">
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">io</span> parlassi</span>
                <PlayButton text="che io parlassi" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">tu</span> parlassi</span>
                <PlayButton text="che tu parlassi" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">lui</span> parlasse</span>
                <PlayButton text="che lui parlasse" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">noi</span> parlassimo</span>
                <PlayButton text="che noi parlassimo" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">voi</span> parlaste</span>
                <PlayButton text="che voi parlaste" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">loro</span> parlassero</span>
                <PlayButton text="che loro parlassero" />
              </li>
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h4 className="font-bold text-indigo-800 text-xl mb-4 flex items-center justify-between border-b border-indigo-200 pb-2">
              <span>Credere</span>
              <PlayButton text="che io credessi. che tu credessi. che lui credesse. che noi credessimo. che voi credeste. che loro credessero." />
            </h4>
            <ul className="space-y-2 text-indigo-900 text-lg">
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">io</span> credessi</span>
                <PlayButton text="che io credessi" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">tu</span> credessi</span>
                <PlayButton text="che tu credessi" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">lui</span> credesse</span>
                <PlayButton text="che lui credesse" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">noi</span> credessimo</span>
                <PlayButton text="che noi credessimo" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">voi</span> credeste</span>
                <PlayButton text="che voi credeste" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">loro</span> credessero</span>
                <PlayButton text="che loro credessero" />
              </li>
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h4 className="font-bold text-indigo-800 text-xl mb-4 flex items-center justify-between border-b border-indigo-200 pb-2">
              <span>Sentire</span>
              <PlayButton text="che io sentissi. che tu sentissi. che lui sentisse. che noi sentissimo. che voi sentiste. che loro sentissero." />
            </h4>
            <ul className="space-y-2 text-indigo-900 text-lg">
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">io</span> sentissi</span>
                <PlayButton text="che io sentissi" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">tu</span> sentissi</span>
                <PlayButton text="che tu sentissi" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">lui</span> sentisse</span>
                <PlayButton text="che lui sentisse" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">noi</span> sentissimo</span>
                <PlayButton text="che noi sentissimo" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">voi</span> sentiste</span>
                <PlayButton text="che voi sentiste" />
              </li>
              <li className="flex items-center justify-between">
                <span><span className="text-slate-500 inline-block w-12">loro</span> sentissero</span>
                <PlayButton text="che loro sentissero" />
              </li>
            </ul>
          </div>
        </div>
 
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
          <h4 className="font-bold text-amber-800 text-lg mb-2">Le 3 Eccezioni Assolute!</h4>
          <p className="text-amber-900 mb-4">
            Esistono solo tre verbi in italiano che non seguono questa regola:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <h5 className="font-bold text-amber-800 border-b border-amber-200 pb-2 mb-2 flex items-center justify-between">
                <span>Essere</span>
                <PlayButton text="che io fossi. che tu fossi. che lui fosse. che noi fossimo. che voi foste. che loro fossero." />
              </h5>
              <ul className="space-y-1 text-slate-800 text-base">
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">io</span> fossi</span>
                  <PlayButton text="che io fossi" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">tu</span> fossi</span>
                  <PlayButton text="che tu fossi" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">lui</span> fosse</span>
                  <PlayButton text="che lui fosse" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">noi</span> fossimo</span>
                  <PlayButton text="che noi fossimo" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">voi</span> foste</span>
                  <PlayButton text="che voi foste" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">loro</span> fossero</span>
                  <PlayButton text="che loro fossero" />
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <h5 className="font-bold text-amber-800 border-b border-amber-200 pb-2 mb-2 flex items-center justify-between">
                <span>Dare</span>
                <PlayButton text="che io dessi. che tu dessi. che lui desse. che noi dessimo. che voi deste. che loro dessero." />
              </h5>
              <ul className="space-y-1 text-slate-800 text-base">
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">io</span> dessi</span>
                  <PlayButton text="che io dessi" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">tu</span> dessi</span>
                  <PlayButton text="che tu dessi" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">lui</span> desse</span>
                  <PlayButton text="che lui desse" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">noi</span> dessimo</span>
                  <PlayButton text="che noi dessimo" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">voi</span> deste</span>
                  <PlayButton text="che voi deste" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">loro</span> dessero</span>
                  <PlayButton text="che loro dessero" />
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <h5 className="font-bold text-amber-800 border-b border-amber-200 pb-2 mb-2 flex items-center justify-between">
                <span>Stare</span>
                <PlayButton text="che io stessi. che tu stessi. che lui stesse. che noi stessimo. che voi steste. che loro stessero." />
              </h5>
              <ul className="space-y-1 text-slate-800 text-base">
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">io</span> stessi</span>
                  <PlayButton text="che io stessi" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">tu</span> stessi</span>
                  <PlayButton text="che tu stessi" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">lui</span> stesse</span>
                  <PlayButton text="che lui stesse" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">noi</span> stessimo</span>
                  <PlayButton text="che noi stessimo" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">voi</span> steste</span>
                  <PlayButton text="che voi steste" />
                </li>
                <li className="flex items-center justify-between">
                  <span><span className="text-slate-500 inline-block w-12 text-sm">loro</span> stessero</span>
                  <PlayButton text="che loro stessero" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <TensePractice
      id="cong_imp"
      title="Il Congiuntivo Imperfetto"
      subtitle="Formazione, usi e concordanza dei tempi."
      icon={BookOpen}
      exercises={exerciseData}
      errorPrefix="Il Congiuntivo Imperfetto"
      theoryComponent={theory}
    />
  );
}
