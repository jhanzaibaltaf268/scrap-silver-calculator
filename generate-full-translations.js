#!/usr/bin/env node
const fs = require('fs');

const translations = JSON.parse(fs.readFileSync('translations-full.json', 'utf8'));
const template = fs.readFileSync('index.html', 'utf8');

const OUTPUT_DIRS = {
  'en': './', 'de': './de/', 'es': './es/', 'fr': './fr/', 'it': './it/',
  'pt': './pt/', 'ru': './ru/', 'tr': './tr/', 'hi': './hi/',
  'ar': './ar/', 'ur': './ur/', 'zh': './zh/'
};

Object.values(OUTPUT_DIRS).forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

Object.entries(translations).forEach(([lang, trans]) => {
  let html = template;
  const langPath = lang === 'en' ? '' : `/${lang}`;
  const baseUrl = 'https://scrapsilvercalculater.com';

  // Update lang attribute
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${trans.lang}">`);

  // Update canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${baseUrl}${langPath}/index/">`
  );

  // Replace all translatable titles and content
  const replaces = [
    [/<title>[^<]*<\/title>/, `<title>${trans.meta_title}</title>`],
    [/<meta name="description" content="[^"]*">/, `<meta name="description" content="${trans.meta_desc}">`],
    [/"name": "Scrap Silver Calculator",/, `"name": "${trans.app_name}",`],
    [/<h2>How much is scrap silver worth today\?<\/h2>/, `<h2>${trans.qa_title}</h2>`],
    [/<h2 class="sec-title">Silver Price by Purity[^<]*<\/h2>/, `<h2 class="sec-title">${trans.purity_section_title}</h2>`],
    [/<h2 class="sec-title">Today's Scrap Silver Prices[^<]*<\/h2>/, `<h2 class="sec-title">${trans.prices_table_title}</h2>`],
    [/<h2 class="sec-title">Popular Silver Searches Answered<\/h2>/, `<h2 class="sec-title">${trans.intent_title}</h2>`],
    [/<h2 class="sec-title">Try a Real-World Example<\/h2>/, `<h2 class="sec-title">${trans.example_title}</h2>`],
    [/<h2 class="sec-title">More Silver Calculators<\/h2>/, `<h2 class="sec-title">${trans.calc_grid_title}</h2>`],
    [/<h2 class="sec-title">How to Calculate Scrap Silver Value<\/h2>/, `<h2 class="sec-title">${trans.how_title}</h2>`],
    [/<h2 class="sec-title sec-title-sm">Silver Purity Chart<\/h2>/, `<h2 class="sec-title sec-title-sm">${trans.chart_title}</h2>`],
    [/<h2 class="sec-title">What Dealers Actually Pay for Scrap Silver<\/h2>/, `<h2 class="sec-title">${trans.dealer_title}</h2>`],
    [/<h2 class="sec-title sec-title-sm">How to Test If Silver Is Real<\/h2>/, `<h2 class="sec-title sec-title-sm">${trans.test_title}</h2>`],
    [/<h2 class="sec-title">Explore More Silver Tools[^<]*<\/h2>/, `<h2 class="sec-title">${trans.hub_title}</h2>`],
    [/<h2 class="sec-title">Frequently Asked Questions<\/h2>/, `<h2 class="sec-title">${trans.faq_title}</h2>`],
    [/<h2 class="sec-title sec-title-sm">How We Calculate[^<]*<\/h2>/, `<h2 class="sec-title sec-title-sm">${trans.method_title}</h2>`]
  ];

  replaces.forEach(([pattern, replacement]) => {
    html = html.replace(pattern, replacement);
  });

  fs.writeFileSync(`${OUTPUT_DIRS[lang]}index.html`, html, 'utf8');
  console.log(`✅ ${lang}: ${OUTPUT_DIRS[lang]}index.html`);
});

console.log('\n✨ All language versions regenerated with full translations!');
