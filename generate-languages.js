#!/usr/bin/env node
/**
 * Generates localized homepage versions (11 languages)
 * from English template using translations-homepage.json
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_FILE = 'translations-homepage.json';
const TEMPLATE_FILE = 'index.html';
const OUTPUT_DIRS = {
  'en': './',
  'de': './de/',
  'es': './es/',
  'fr': './fr/',
  'it': './it/',
  'pt': './pt/',
  'ru': './ru/',
  'tr': './tr/',
  'hi': './hi/',
  'ar': './ar/',
  'ur': './ur/',
  'zh': './zh/'
};

// Ensure directories exist
Object.values(OUTPUT_DIRS).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Load translations
const translations = JSON.parse(fs.readFileSync(TRANSLATIONS_FILE, 'utf8'));
const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

console.log(`\n🚀 Generating ${Object.keys(translations).length} language versions...\n`);

// Translation keys and their HTML placeholders
const TRANSLATION_MAP = {
  'meta_title': (value) => [`<title>${value}</title>`],
  'meta_desc': (value) => [`<meta name="description" content="${value}">`],
  'app_name': (value) => [
    `"name": "${value}",`,
    `"applicationName": "${value}"`
  ],
  'app_desc': (value) => [
    `"description": "${value}",`,
    `"description": "${value}"`
  ],
  'h1_main': (value) => [`<h1 class="h1"><span class="h1-scrap">Scrap</span> <span class="h1-calc">Silver</span> <span class="h1-calc">Calculator</span></h1>`],
  'h1_span': () => [], // Will be handled in h1_main replacement
  'hero_sub': (value) => [`<p class="hero-sub">`],
  'hero_chip_1': (value) => [],
  'hero_chip_2': (value) => [],
  'hero_chip_3': (value) => [],
  'hero_chip_4': (value) => []
};

function generateLanguageVersion(langCode, trans) {
  let content = template;
  const baseUrl = 'https://scrapsilvercalculater.com';
  const langPath = langCode === 'en' ? '' : `/${langCode}`;

  // Update html lang attribute
  content = content.replace(/<html lang="[^"]*">/, `<html lang="${trans.lang_code}">`);

  // Update canonical link
  const canonicalUrl = `${baseUrl}${langPath}/index/`;
  content = content.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonicalUrl}">`);

  // Update x-default hreflang (only set on English)
  if (langCode !== 'en') {
    content = content.replace(
      /<link rel="alternate" hreflang="x-default"[^>]*>/,
      `<link rel="alternate" hreflang="x-default" href="${baseUrl}/index/">`
    );
  }

  // Replace title
  content = content.replace(
    /<title>[^<]*<\/title>/,
    `<title>${trans.meta_title}</title>`
  );

  // Replace meta description
  content = content.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${trans.meta_desc}">`
  );

  // Replace WebApplication schema name
  content = content.replace(
    /"name": "Scrap Silver Calculator",/,
    `"name": "${trans.app_name}",`
  );

  // Replace WebApplication schema description
  content = content.replace(
    /"description": "Free scrap silver calculator[^"]*",/,
    `"description": "${trans.app_desc}",`
  );

  // Replace h1 heading - Build the correct structure based on language
  const h1Part = trans.h1_main;
  const h1SpanPart = trans.h1_span;

  // For most languages, h1_main contains full text, h1_span is just the word "Calculator" etc
  const h1Html = `<h1 class="h1"><span class="h1-scrap">${h1Part.split(' ')[0]}</span> <span class="h1-calc">${h1Part.split(' ').slice(1).join(' ')}</span></h1>`;
  content = content.replace(
    /<h1 class="h1"><span class="h1-scrap">[^<]*<\/span> <span class="h1-calc">[^<]*<\/span> <span class="h1-calc">[^<]*<\/span><\/h1>/,
    h1Html
  );

  // Replace hero subtitle
  const heroSubHtml = `<p class="hero-sub">${trans.hero_sub}</p>`;
  content = content.replace(
    /<p class="hero-sub">[^<]*<\/p>/,
    heroSubHtml
  );

  // Replace hero chips (4 items in flex-chips)
  const chipsPattern = /<div class="hero-chips">[\s\S]*?<\/div>/;
  const newChips = `<div class="hero-chips">
            <div class="chip">${trans.hero_chip_1}</div>
            <div class="chip">${trans.hero_chip_2}</div>
            <div class="chip">${trans.hero_chip_3}</div>
            <div class="chip">${trans.hero_chip_4}</div>
          </div>`;
  content = content.replace(chipsPattern, newChips);

  return content;
}

// Generate each language version
Object.entries(translations).forEach(([langCode, trans]) => {
  const outputDir = OUTPUT_DIRS[langCode];
  const outputFile = path.join(outputDir, 'index.html');

  const content = generateLanguageVersion(langCode, trans);

  fs.writeFileSync(outputFile, content, 'utf8');
  console.log(`✅ Generated: ${outputFile} (${langCode})`);
});

console.log(`\n✨ All 11 language versions generated successfully!\n`);
console.log('📋 Generated files:');
Object.keys(translations).forEach(lang => {
  const dir = OUTPUT_DIRS[lang];
  console.log(`   ${dir}index.html`);
});
console.log('\n💡 Next: Commit and push to GitHub');
