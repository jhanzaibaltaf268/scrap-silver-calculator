#!/usr/bin/env node
const fs = require('fs');

const fullTrans = JSON.parse(fs.readFileSync('translations-full.json', 'utf8'));
const extTrans = JSON.parse(fs.readFileSync('translations-extended.json', 'utf8'));
const template = fs.readFileSync('index.html', 'utf8');

const OUTPUT_DIRS = {
  'en': './', 'de': './de/', 'es': './es/', 'fr': './fr/', 'it': './it/',
  'pt': './pt/', 'ru': './ru/', 'tr': './tr/', 'hi': './hi/',
  'ar': './ar/', 'ur': './ur/', 'zh': './zh/'
};

Object.values(OUTPUT_DIRS).forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

Object.entries(fullTrans).forEach(([lang, trans]) => {
  let html = template;
  const langPath = lang === 'en' ? '' : `/${lang}`;
  const baseUrl = 'https://scrapsilvercalculater.com';

  // Basic replacements from full translations
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${trans.lang}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${baseUrl}${langPath}/index/">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${trans.meta_title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${trans.meta_desc}">`);
  html = html.replace(/"name": "Scrap Silver Calculator",/, `"name": "${trans.app_name}",`);

  // Section title replacements
  const titleReplacements = [
    ["How much is scrap silver worth today?", trans.qa_title],
    ["Silver Price by Purity", trans.purity_section_title],
    ["Today's Scrap Silver Prices", trans.prices_table_title],
    ["Popular Silver Searches Answered", trans.intent_title],
    ["Try a Real-World Example", trans.example_title],
    ["More Silver Calculators", trans.calc_grid_title],
    ["How to Calculate Scrap Silver Value", trans.how_title],
    ["Silver Purity Chart", trans.chart_title],
    ["What Dealers Actually Pay for Scrap Silver", trans.dealer_title],
    ["How to Test If Silver Is Real", trans.test_title],
    ["Explore More Silver Tools", trans.hub_title],
    ["Frequently Asked Questions", trans.faq_title],
    ["How We Calculate", trans.method_title]
  ];

  titleReplacements.forEach(([en, translated]) => {
    html = html.replace(new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), translated);
  });

  // Replace FAQ questions
  if (extTrans.faq_questions[lang]) {
    const faqQuestions = extTrans.faq_questions[lang];
    const enFaqQuestions = extTrans.faq_questions['en'];

    enFaqQuestions.forEach((enQuestion, i) => {
      if (faqQuestions[i]) {
        const pattern = new RegExp(
          `<button class="faq-question">${enQuestion.replace(/[.*+?^${}()|[\]\\?]/g, '\\$&')} <span class="faq-icon">`,
          'g'
        );
        html = html.replace(pattern, `<button class="faq-question">${faqQuestions[i]} <span class="faq-icon">`);
      }
    });
  }

  // Replace calculator labels
  if (extTrans.calc_labels[lang]) {
    const labels = extTrans.calc_labels[lang];
    html = html.replace(/<span class="fl">Weight<\/span>/, `<span class="fl">${labels.weight}</span>`);
    html = html.replace(/<span class="fl">Silver Purity<\/span>/, `<span class="fl">${labels.purity}</span>`);
    html = html.replace(/<span class="fl">Estimated Melt Value<\/span>/, `<span class="fl">${labels.melt_label}</span>`);
    html = html.replace(/>GRAMS<\/span>/g, `>${labels.grams}</span>`);
    html = html.replace(/>TROY OZ<\/span>/g, `>${labels.troy_oz}</span>`);
    html = html.replace(/>DWT<\/span>/g, `>${labels.dwt}</span>`);
    html = html.replace(/>KG<\/span>/g, `>${labels.kg}</span>`);
  }

  fs.writeFileSync(`${OUTPUT_DIRS[lang]}index.html`, html, 'utf8');
  console.log(`✅ ${lang}`);
});

console.log('\n✨ Extended translations applied to all languages!');
