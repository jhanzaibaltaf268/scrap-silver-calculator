const fs = require('fs');
const path = require('path');

// Get all files in RU directory
const ruFiles = fs.readdirSync('ru').filter(f => f.endsWith('.html'));

// English files (from root)
const englishFiles = fs.readdirSync('.').filter(f => f.endsWith('.html')).map(f => f.replace('.html', ''));

console.log('Analyzing RU directory for duplicates...\n');

let duplicates = [];
let ruLocalized = [];

ruFiles.forEach(file => {
  const baseName = file.replace('.html', '');
  
  // Check if this file's basename (without .html) matches an English slug
  if (englishFiles.includes(baseName)) {
    duplicates.push(file);
  } else {
    ruLocalized.push(file);
  }
});

console.log(`RU directory contains ${ruFiles.length} files:`);
console.log(`  - ${duplicates.length} English-slug duplicates (will be removed)`);
console.log(`  - ${ruLocalized.length} Russian-localized files (will be kept)\n`);

console.log('Files to DELETE (English duplicates):');
duplicates.slice(0, 10).forEach(f => console.log(`  - ${f}`));
if (duplicates.length > 10) console.log(`  ... and ${duplicates.length - 10} more\n`);

console.log('Files to KEEP (Russian localized):');
ruLocalized.slice(0, 10).forEach(f => console.log(`  - ${f}`));
if (ruLocalized.length > 10) console.log(`  ... and ${ruLocalized.length - 10} more\n`);

// Now delete the duplicates
console.log(`\nDeleting ${duplicates.length} duplicate English-slug files from RU...\n`);

duplicates.forEach(file => {
  const filePath = path.join('ru', file);
  fs.unlinkSync(filePath);
});

console.log(`✓ Deleted ${duplicates.length} files`);
console.log(`✓ RU directory now contains ${ruLocalized.length} files (Russian-localized only)`);
