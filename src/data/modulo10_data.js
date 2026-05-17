export const modulo10Data = [
  {
    id: "scrittura_1",
    title: "L'Email Formale: Reclamo",
    type: "email_formale",
    prompt: "Hai trascorso una settimana di vacanza in un hotel 4 stelle a Roma, ma il servizio è stato molto deludente (camera sporca, rumore notturno, personale scortese). Scrivi un'email formale al direttore dell'hotel per esprimere il tuo disappunto e chiedere un rimborso parziale. (Almeno 100 parole)",
    checklist: [
      { id: "c1", label: "Formula di apertura formale (es. Egregio/Gentile)", pattern: /(egregi[oa]|gentil(issim)?[ea]|spettabile)/i },
      { id: "c2", label: "Uso del Condizionale per richieste educate (es. vorrei, sarei)", pattern: /(vorrei|sarei|potrebbe|gradirei)/i },
      { id: "c3", label: "Connettivi di contrasto o aggiunta (es. tuttavia, inoltre, benché)", pattern: /(tuttavia|inoltre|benché|sebbene|nonostante)/i },
      { id: "c4", label: "Formula di chiusura formale (es. Cordiali saluti)", pattern: /(cordiali saluti|distinti saluti|in attesa di un vostro riscontro)/i },
      { id: "c5", label: "Almeno 100 parole", minWords: 100 }
    ]
  },
  {
    id: "scrittura_2",
    title: "Il Saggio Breve: Tecnologia e Società",
    type: "saggio",
    prompt: "I social media hanno radicalmente cambiato il modo in cui comunichiamo. Secondo alcuni sono uno strumento utile per mantenere i contatti, secondo altri aumentano l'isolamento sociale. Scrivi un breve testo esprimendo la tua opinione, motivandola con esempi. (Almeno 120 parole)",
    checklist: [
      { id: "c1", label: "Espressione di opinione (es. secondo me, ritengo che)", pattern: /(secondo me|ritengo che|penso che|credo che|a mio parere|a mio avviso)/i },
      { id: "c2", label: "Uso del Congiuntivo (dopo i verbi di opinione)", pattern: /(che sia|che abbiano|che possa|che diventino|che facciano)/i },
      { id: "c3", label: "Connettivi per argomentare (es. da un lato... dall'altro, infatti, perciò)", pattern: /(da un lato|dall'altro|infatti|perci[oò]|quindi|di conseguenza)/i },
      { id: "c4", label: "Conclusione chiara (es. in conclusione, per riassumere)", pattern: /(in conclusione|per riassumere|infine|in sintesi)/i },
      { id: "c5", label: "Almeno 120 parole", minWords: 120 }
    ]
  }
];
