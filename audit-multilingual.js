const fs = require('fs');
const path = require('path');

const LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];
const ROOT_DIR = '.';

// Get all pages in root (English)
function getEnglishPages() {
  const files = fs.readdirSync(ROOT_DIR)
    .filter(f => f.endsWith('.html') && f !== '404.html')
    .map(f => f.replace('.html', ''));
  return files;
}

// Get all pages in language directory
function getLanguagePages(lang) {
  const dir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''));
}

// Load translations for slug mapping
function getTranslations() {
  const transFile = path.join(ROOT_DIR, 'js', 'translations.js');
  if (!fs.existsSync(transFile)) return {};
  const content = fs.readFileSync(transFile, 'utf8');
  const match = content.match(/window\.MenuTranslations\s*=\s*\{([\s\S]*?)\};/);
  if (match) {
    try {
      const data = eval('{' + match[1] + '}');
      return data;
    } catch (e) {
      return {};
    }
  }
  return {};
}

const englishPages = getEnglishPages();
const translations = getTranslations();
const slugMapping = translations.slugs || {};

console.log('\n=== MULTILINGUAL AUDIT REPORT ===\n');
console.log(`Root English pages: ${englishPages.length}`);

// Check each language
const issues = {
  missingPages: {},
  slugMismatch: {},
  hreflangIssues: {},
  contentIssues: {}
};

englishPages.forEach(enPage => {
  LANGUAGES.forEach(lang => {
    if (lang === 'en') return;
    
    // Get expected slug
    let expectedSlug = enPage;
    if (slugMapping[enPage] && slugMapping[enPage][lang]) {
      expectedSlug = slugMapping[enPage][lang];
    }
    
    // Check if page exists
    const langPages = getLanguagePages(lang);
    const exists = langPages.includes(expectedSlug);
    
    if (!exists) {
      if (!issues.missingPages[lang]) issues.missingPages[lang] = [];
      issues.missingPages[lang].push(`${enPage} (expected: ${expectedSlug})`);
    }
  });
});

// Print missing pages
console.log('\n--- MISSING PAGES BY LANGUAGE ---');
Object.entries(issues.missingPages).forEach(([lang, pages]) => {
  console.log(`\n${lang.toUpperCase()}: ${pages.length} missing`);
  pages.slice(0, 5).forEach(p => console.log(`  - ${p}`));
  if (pages.length > 5) console.log(`  ... and ${pages.length - 5} more`);
});

// Check page counts
console.log('\n--- PAGE COUNT BY LANGUAGE ---');
LANGUAGES.forEach(lang => {
  const count = lang === 'en' ? englishPages.length : getLanguagePages(lang).length;
  const ratio = ((count / englishPages.length) * 100).toFixed(1);
  console.log(`${lang.toUpperCase()}: ${count}/${englishPages.length} (${ratio}%)`);
});

// Check for translations.js issues
console.log('\n--- TRANSLATION COVERAGE ---');
const menuTrans = translations.en || {};
const missingLangs = LANGUAGES.filter(l => !translations[l]);
if (missingLangs.length > 0) {
  console.log(`Missing language translations: ${missingLangs.join(', ')}`);
}

// Sample a few pages to check hreflang
console.log('\n--- HREFLANG SAMPLE CHECK ---');
const samplePages = [englishPages[0], englishPages[Math.floor(englishPages.length/2)]];
samplePages.forEach(page => {
  const htmlPath = path.join(ROOT_DIR, page + '.html');
  if (fs.existsSync(htmlPath)) {
    const content = fs.readFileSync(htmlPath, 'utf8');
    const hreflangCount = (content.match(/rel="alternate" hreflang=/g) || []).length;
    console.log(`${page}.html: ${hreflangCount} hreflang tags`);
  }
});

