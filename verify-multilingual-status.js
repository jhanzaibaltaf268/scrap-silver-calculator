const fs = require('fs');
const path = require('path');

const LANGUAGES = ['en', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

function getEnglishPages() {
  return fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && f !== '404.html')
    .map(f => f.replace('.html', ''));
}

function getLanguagePages(lang) {
  const dir = lang === 'en' ? '.' : lang;
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html') && (lang !== 'en' || f !== '404.html'))
    .map(f => f.replace('.html', ''));
}

function loadTranslations() {
  const content = fs.readFileSync('js/translations.js', 'utf8');
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
const translations = loadTranslations();
const slugMapping = translations.slugs || {};

console.log('\n=== MULTILINGUAL STATUS REPORT ===\n');
console.log(`English pages: ${englishPages.length}\n`);

// Check page coverage per language
const stats = {};
LANGUAGES.forEach(lang => {
  const pages = getLanguagePages(lang);
  const ratio = ((pages.length / englishPages.length) * 100).toFixed(1);
  stats[lang] = { count: pages.length, ratio: parseFloat(ratio) };
  console.log(`${lang.toUpperCase().padEnd(4)}: ${pages.length.toString().padStart(3)}/${englishPages.length} (${ratio.padStart(5)}%)`);
});

// Check slug mapping completeness
console.log('\n=== SLUG MAPPING ANALYSIS ===\n');

const missingSlugPages = [];
const incompleteSlugPages = [];

englishPages.forEach(page => {
  const mapping = slugMapping[page] || {};
  const mappedLangs = Object.keys(mapping).length;
  
  if (mappedLangs === 0) {
    missingSlugPages.push(page);
  } else if (mappedLangs < 11) {
    incompleteSlugPages.push({ page, mapped: mappedLangs, missing: 11 - mappedLangs });
  }
});

console.log(`Pages with NO slug mappings: ${missingSlugPages.length}`);
if (missingSlugPages.length > 0) {
  missingSlugPages.slice(0, 5).forEach(p => console.log(`  - ${p}`));
  if (missingSlugPages.length > 5) console.log(`  ... and ${missingSlugPages.length - 5} more`);
}

console.log(`\nPages with INCOMPLETE slug mappings (< 11 languages): ${incompleteSlugPages.length}`);
incompleteSlugPages.sort((a, b) => a.mapped - b.mapped).slice(0, 5).forEach(p => {
  console.log(`  - ${p.page}: ${p.mapped}/11 languages`);
});
if (incompleteSlugPages.length > 5) {
  console.log(`  ... and ${incompleteSlugPages.length - 5} more`);
}

// Check for script defer issues (spot check)
console.log('\n=== SCRIPT LOADING CHECK (Sample) ===\n');

let deferFound = 0;
['ar/index.html', 'de/index.html', 'es/index.html', 'fr/index.html'].forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('defer') && content.match(/defer.*src=.*js\/(silver-price|calculator|components)\.js/)) {
      deferFound++;
    }
  }
});

if (deferFound === 0) {
  console.log('✓ Script defer attribute removed (spot check passed)');
} else {
  console.log(`✗ Found ${deferFound} files still using defer on JS scripts`);
}

// Check for RTL support
console.log('\n=== RTL SUPPORT CHECK ===\n');

const arPage = fs.existsSync('ar/index.html') ? fs.readFileSync('ar/index.html', 'utf8') : '';
const urPage = fs.existsSync('ur/index.html') ? fs.readFileSync('ur/index.html', 'utf8') : '';

const arHasRTL = arPage.includes('dir="rtl"');
const urHasRTL = urPage.includes('dir="rtl"');
const cssHasRTL = fs.existsSync('css/style.css') && fs.readFileSync('css/style.css', 'utf8').includes('html[dir="rtl"]');

console.log(`Arabic (AR) has dir="rtl": ${arHasRTL ? '✓' : '✗'}`);
console.log(`Urdu (UR) has dir="rtl": ${urHasRTL ? '✓' : '✗'}`);
console.log(`CSS has RTL rules: ${cssHasRTL ? '✓' : '✗'}`);

// Final summary
console.log('\n=== OVERALL STATUS ===\n');
const allLangsAbove90 = Object.values(stats).every(s => s.lang !== 'en' && s.ratio >= 90 || s.lang === 'en');
const completeSlugMappings = missingSlugPages.length === 0 && incompleteSlugPages.length === 0;

console.log(`Language coverage above 90%: ${allLangsAbove90 ? '✓ YES' : '✗ NO'}`);
console.log(`Complete slug mappings: ${completeSlugMappings ? '✓ YES' : '✗ NO'}`);
console.log(`RTL support enabled: ${arHasRTL && urHasRTL && cssHasRTL ? '✓ YES' : '✗ NO'}`);
console.log(`Script defer removed: ${deferFound === 0 ? '✓ YES' : '✗ NO'}`);

