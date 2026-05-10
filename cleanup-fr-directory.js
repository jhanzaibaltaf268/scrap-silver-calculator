const fs = require('fs');
const path = require('path');

// Get all files in FR directory
const frFiles = fs.readdirSync('fr').filter(f => f.endsWith('.html'));

// English files (from root)
const englishFiles = fs.readdirSync('.').filter(f => f.endsWith('.html')).map(f => f.replace('.html', ''));

console.log('Analyzing FR directory for duplicates...\n');

let duplicates = [];
let frLocalized = [];

frFiles.forEach(file => {
  const baseName = file.replace('.html', '');
  
  // Check if this file's basename (without .html) matches an English slug
  if (englishFiles.includes(baseName)) {
    duplicates.push(file);
  } else {
    frLocalized.push(file);
  }
});

console.log(`FR directory contains ${frFiles.length} files:`);
console.log(`  - ${duplicates.length} English-slug duplicates (should be removed)`);
console.log(`  - ${frLocalized.length} French-localized files (should be kept)\n`);

console.log('Files to DELETE (English duplicates):');
duplicates.slice(0, 10).forEach(f => console.log(`  - ${f}`));
if (duplicates.length > 10) console.log(`  ... and ${duplicates.length - 10} more\n`);

console.log('Files to KEEP (French localized):');
frLocalized.slice(0, 10).forEach(f => console.log(`  - ${f}`));
if (frLocalized.length > 10) console.log(`  ... and ${frLocalized.length - 10} more\n`);

// Now delete the duplicates
console.log(`\nDeleting ${duplicates.length} duplicate English-slug files from FR...\n`);

duplicates.forEach(file => {
  const filePath = path.join('fr', file);
  fs.unlinkSync(filePath);
});

console.log(`✓ Deleted ${duplicates.length} files`);
console.log(`✓ FR directory now contains ${frLocalized.length} files (French-localized only)`);
