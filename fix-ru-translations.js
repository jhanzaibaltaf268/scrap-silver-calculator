const fs = require('fs');
const path = require('path');

const targetLang = 'ru';
const outDir = path.join(__dirname, targetLang);

const fixedTranslations = {
  "Tools": "Инструменты",
  "Silver Profit Calculator": "Калькулятор прибыли по серебру",
  "Batch Calculator": "Калькулятор партии",
  "Sona Chandi Calculator": "Калькулятор Сона Чанди",
  "Face Value Calculator": "Калькулятор номинальной стоимости",
  "Weight Converter": "Конвертер веса",
  "Pennyweight (DWT) Calc": "Калькулятор пеннивейта (DWT)",
  "Tola Calculator": "Калькулятор тола",
  "Sell or Hold Analysis": "Анализ: продавать или держать",
  "Silver Identifier": "Идентификатор серебра"
};

const fixedSlugs = {
  "sona-chandi-calculator": "калькулятор-сона-чанди",
  "silver-weight-converter": "конвертер-веса-серебра",
  "tola-calculator": "калькулятор-тола"
};

function slugify(text) {
  let t = text.trim().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}\-]/gu, '')
    .replace(/-+/g, '-');
  return t || 'page-' + Math.floor(Math.random()*1000); 
}

function processDirectory() {
  if (!fs.existsSync(outDir)) return;
  const files = fs.readdirSync(outDir).filter(f => f.endsWith(''));

  // First, let's grab the MenuTranslations from index (or any file that has it)
  // to patch it globally.
  const indexPath = path.join(outDir, 'index');
  if (!fs.existsSync(indexPath)) return;
  
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  const start = indexContent.indexOf('window.MenuTranslations = {') + 26;
  const end = indexContent.indexOf('</script>', start);
  const jsonString = indexContent.slice(start, end).replace(';\\n', '').trim().replace(/;$/, '');
  
  let menuDict = {};
  try {
    menuDict = JSON.parse(jsonString);
  } catch(e) {
    console.error("Parse error:", e);
    return;
  }
  
  // Update the missing translations
  Object.keys(fixedTranslations).forEach(k => {
    menuDict[k] = fixedTranslations[k];
  });
  
  Object.keys(fixedSlugs).forEach(k => {
    menuDict.slugs[k] = fixedSlugs[k];
  });
  
  // Now we must apply this updated dictionary to ALL files,
  // AND we must rewrite any hardcoded `href=""` that pointed to the wrong English slugs
  // to point to the newly fixed slugs!
  // ALSO, we need to actually rename those 3 English-labelled files to their Russian slugs!

  for (const file of files) {
    const originalPath = path.join(outDir, file);
    let targetFileName = file;

    // Check if this file IS one of the poorly slugged files (Wait, how do we know the file name? 
    // They were left as 'sona-chandi-calculator'!).
    if (Object.keys(fixedSlugs).includes(file) || Object.values(fixedSlugs).includes(file)) {
      // It's an English slugged file that needs renaming!
      let originalSlug = file;
      if (Object.keys(fixedSlugs).includes(file)) {
         targetFileName = fixedSlugs[file];
         fs.renameSync(originalPath, path.join(outDir, targetFileName));
         console.log(`Renamed missed slug: ${file} -> ${targetFileName}`);
      }
    }
  }

  // Refresh files list after renames
  const updatedFiles = fs.readdirSync(outDir).filter(f => f.endsWith(''));
  
  const jsInjection = `window.MenuTranslations = ${JSON.stringify(menuDict)};`;
  const jsScriptBlock = `<script>\n  ${jsInjection}\n</script>\n</body>`;

  for (const file of updatedFiles) {
    const filePath = path.join(outDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace bad URLs pointing internally across all documents
    Object.keys(fixedSlugs).forEach(oldSlug => {
      const newSlug = fixedSlugs[oldSlug];
      content = content.split(`href="${oldSlug}"`).join(`href="${newSlug}"`);
      content = content.split(`href="./${oldSlug}"`).join(`href="${newSlug}"`);
    });
    
    // Replace MenuTranslations dict globally
    content = content.replace(/window\.MenuTranslations\s*=\s*\{.*?\}\s*;/gs, '');
    content = content.replace(/window\.MenuTranslations\s*=\s*\{\}\s*;/g, '');
    content = content.replace('</body>', jsScriptBlock);
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  console.log("✅ Fixed Russian MenuTranslations & specific dropped URLs successfully!");
}

processDirectory();
