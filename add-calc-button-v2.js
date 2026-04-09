const fs = require('fs');
const path = require('path');

const TRANSLATIONS = {
  'en': 'Calculate Melt Value',
  'es': 'Calcular Valor de Fusión',
  'fr': 'Calculer la Valeur de Fonte',
  'de': 'Schmelzwert Berechnen',
  'pt': 'Calcular Valor de Fusão',
  'hi': 'मेल्ट वैल्यू की गणना करें',
  'ur': 'پگھلنے کی قیمت کا حساب لگائیں',
  'ar': 'احسب قيمة الصهر',
  'tr': 'Erime Değerini Hesapla',
  'it': 'Calcola Valore di Fusione',
  'zh': '计算熔毁价值',
  'ru': 'Рассчитать стоимость лома'
};

function getLanguage(filePath, content) {
  const parts = filePath.split(path.sep);
  for (let part of parts) {
    if (TRANSLATIONS[part]) return part;
  }
  const langMatch = content.match(/<html lang="([^"]+)"/);
  if (langMatch && TRANSLATIONS[langMatch[1]]) return langMatch[1];
  return 'en';
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const rootDir = process.cwd();
console.log(`Starting safer "Calculate" button injection (v2) in ${rootDir}...`);

let updatedCount = 0;

walkDir(rootDir, (filePath) => {
  if (path.extname(filePath) === '.html') {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('id="calc-btn"') || !content.includes('result-display')) return;

    const lang = getLanguage(filePath, content);
    const btnText = TRANSLATIONS[lang];
    
    // 1. Inject HTML
    // We target the result-display div and insert before it. 
    // Most files have <div class="result-display"
    const btnHTML = `\n          <button class="btn btn-primary btn-full" id="calc-btn" style="margin-top:var(--space-md);">${btnText}</button>`;
    let newContent = content.replace(/<div class="result-display"/, `${btnHTML}\n          <div class="result-display"`);

    // 2. Inject JS (Safe appending)
    // Find the last script block
    const scriptEndTag = '<\/script>';
    const lastScriptIndex = newContent.lastIndexOf(scriptEndTag);
    
    if (lastScriptIndex !== -1) {
      const listenerString = `
    / Add listener to Calculate button
    const cb = document.getElementById('calc-btn');
    if (cb) {
      const fn = typeof calculate === 'function' ? calculate : (typeof calc === 'function' ? calc : null);
      if (fn) cb.addEventListener('click', fn);
    }
  `;
      newContent = newContent.slice(0, lastScriptIndex) + listenerString + newContent.slice(lastScriptIndex);
    }

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
      if (updatedCount % 50 === 0) console.log(`Updated ${updatedCount} files...`);
    }
  }
});

console.log(`Done! Updated ${updatedCount} HTML files with a "Calculate" button (v2).`);
