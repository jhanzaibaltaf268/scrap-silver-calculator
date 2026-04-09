const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'old-gen-utf8.js');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // Emojis/Icons
  [/ΓÜû∩╕Å/g, '⚖️'],
  [/ΓÖ╗∩╕Å/g, '♻️'],
  [/≡ƒöÑ/g, '🔥'],
  [/Γ£¿/g, '✨'],
  [/≡ƒ¬Ö/g, '🪙'],
  [/≡ƒÅ¢∩╕Å/g, '🏛️'],
  [/≡ƒÑç/g, '🥇'],
  [/≡ƒº▒/g, '🧱'],
  [/≡ƒÆì/g, '💍'],
  [/≡ƒì┤/g, '🍴'],
  [/≡ƒôè/g, '📊'],
  [/≡ƒÆ▓/g, '💲'],
  [/≡ƒ¢á∩╕Å/g, '🛠️'],
  [/≡ƒôê/g, '📈'],
  [/≡ƒÆ╡/g, '💵'],
  [/≡ƒôï/g, '📋'],
  [/≡ƒîì/g, '🌍'],
  [/≡ƒº░/g, '🧮'],

  // Special Characters
  [/ΓÇö/g, '—'],
  [/┬╖/g, '·'],
  [/ΓêÆ/g, '−'],
  [/├ù/g, '×'],
  [/┬┐/g, '¿'],
  [/┬í/g, '¡'],

  // Accented Characters (common artifacts)
  [/├⌐/g, 'é'],
  [/├í/g, 'á'],
  [/├│/g, 'ó'],
  [/├¡/g, 'í'],
  [/├║/g, 'ú'],
  [/├▒/g, 'ñ'],
  [/├ñ/g, 'ä'],
  [/├╢/g, 'ö'],
  [/├╝/g, 'ü'],
  [/├¿/g, 'è'],
  [/├╡/g, 'õ'],
  [/├╖/g, '÷'],
  [/├á/g, 'à']
];

let changed = false;
replacements.forEach(([regex, replacement]) => {
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    changed = true;
  }
});

if (changed) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully cleaned up encoding artifacts in old-gen-utf8.js');
} else {
  console.log('No artifacts found to clean.');
}
