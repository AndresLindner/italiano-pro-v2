const fs = require('fs');

const data = fs.readFileSync('/Users/andreslindner/Desktop/italiano-pro/src/data/esercizi_tempi.js', 'utf8');

// extract the array of sentences
const regex = /sentence: ".*?\((.*?)\).*?"/g;
let match;
const testedVerbs = new Set();

while ((match = regex.exec(data)) !== null) {
  // only taking the ones in the passato remoto section, but we can just grab all and filter by index if needed
  testedVerbs.add(match[1]);
}

const allVerbsToCheck = [
  // from original irregularEreVerbs
  "prendere", "leggere", "chiedere", "rispondere", "chiudere", "vincere", "dipingere", "scegliere", "conoscere", "nascere", "decidere", "vivere",
  // from original cards
  "essere", "avere", "fare", "dire", "venire", "vedere", "volere", "dare", "stare", "bere", "mettere", "sapere", "rimanere", "cadere", "dovere", "condurre", "cuocere",
  // 13 added in list 1
  "scrivere", "rompere", "piangere", "ridere", "esprimere", "scendere", "accendere", "perdere", "distruggere", "offendere", "spingere", "difendere", "stringere",
  // 13 added in list 2
  "piacere", "tenere", "trarre", "porre", "correre"
];

const missing = [];
for (const verb of allVerbsToCheck) {
  if (!testedVerbs.has(verb)) {
    missing.push(verb);
  }
}

console.log("Missing verbs:");
console.log(missing.join(', '));
