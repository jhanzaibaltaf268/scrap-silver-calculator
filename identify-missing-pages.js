const fs = require('fs');

const LANGUAGES = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

// Get English pages
const englishPages = fs.readdirSync('.')
  .filter(f => f.endsWith('.html') && f !== '404.html')
  .map(f => f.replace('.html', ''))
  .sort();

console.log('Identifying missing pages by language...\n');

// For each language, find missing pages
const missingByLang = {};

LANGUAGES.forEach(lang => {
  const langDir = lang;
  const langPages = fs.readdirSync(langDir)
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''));

  // For each English page, find the localized slug in translations if it exists
  const translations = require('./js/translations.js');
  // ... actually we can't easily load translations.js due to window object
  
  // Simpler approach: just check which English pages don't exist in a simple form
  const missingPages = [];
  englishPages.forEach(enPage => {
    // Check if the exact English slug exists
    if (!langPages.includes(enPage)) {
      // This might be OK if there's a localized slug instead
      // For now, just mark it
      missingPages.push(enPage);
    }
  });
  
  missingByLang[lang] = missingPages;
});

// Show most problematic pages
const allMissingPages = new Set();
Object.values(missingByLang).forEach(pages => {
  pages.forEach(p => allMissingPages.add(p));
});

console.log('Most commonly missing pages across all languages:\n');

const pageMissingCount = {};
allMissingPages.forEach(page => {
  let count = 0;
  LANGUAGES.forEach(lang => {
    if (missingByLang[lang].includes(page)) count++;
  });
  pageMissingCount[page] = count;
});

Object.entries(pageMissingCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([page, count]) => {
    const langs = LANGUAGES.filter(l => missingByLang[l].includes(page));
    console.log(`${page}`);
    console.log(`  Missing in ${count}/11 languages: ${langs.join(', ')}`);
  });

console.log('\n---\n');
console.log('Summary by language:');
LANGUAGES.forEach(lang => {
  const missing = missingByLang[lang].length;
  const ratio = ((missing / englishPages.length) * 100).toFixed(1);
  console.log(`${lang.toUpperCase()}: ${missing} pages missing (${ratio}%)`);
});
