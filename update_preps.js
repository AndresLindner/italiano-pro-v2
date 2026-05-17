const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const prepMap = {
  "andare": "a",
  "venire": "a",
  "provare": "a",
  "continuare": "a",
  "iniziare": "a",
  "cominciare": "a",
  "imparare": "a",
  "riuscire": "a",
  "credere": "di",
  "pensare": "di",
  "cercare": "di",
  "decidere": "di",
  "dimenticare": "di",
  "finire": "di",
  "smettere": "di",
  "sperare": "di"
};

for (const [verb, prep] of Object.entries(prepMap)) {
  const regex = new RegExp(`(infinitive: "${verb}",\\s*translation: "[^"]*")`, 'g');
  content = content.replace(regex, `$1,\n    prep: "${prep}"`);
}

const uiTarget = `<span className="text-2xl font-bold text-indigo-900">{verb.infinitive}</span>
                  <span className="text-sm text-slate-500 italic">({verb.translation})</span>`;
const uiReplacement = `<span className="text-2xl font-bold text-indigo-900">{verb.infinitive}</span>
                  {verb.prep && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                      + {verb.prep}
                    </span>
                  )}
                  <span className="text-sm text-slate-500 italic">({verb.translation})</span>`;

content = content.replace(uiTarget, uiReplacement);

fs.writeFileSync('src/App.jsx', content);
console.log("Done");
