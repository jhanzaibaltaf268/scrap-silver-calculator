const fs = require('fs');
const path = require('path');

const LANGUAGES = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

function fixScriptsInDirectory(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  let fixed = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove defer attribute from script tags for js/silver-price.js, js/calculator.js, js/components.js
    const before = content;
    content = content.replace(/<script\s+src="\.\.\/js\/silver-price\.js"\s+defer[^>]*>/g, '<script src="../js/silver-price.js">');
    content = content.replace(/<script\s+src="\.\.\/js\/calculator\.js"\s+defer[^>]*>/g, '<script src="../js/calculator.js">');
    content = content.replace(/<script\s+src="\.\.\/js\/components\.js"\s+defer[^>]*>/g, '<script src="../js/components.js">');
    
    // Also handle variations like defer=""
    content = content.replace(/<script\s+defer=""\s+src="\.\.\/js\/silver-price\.js"[^>]*>/g, '<script src="../js/silver-price.js">');
    content = content.replace(/<script\s+defer=""\s+src="\.\.\/js\/calculator\.js"[^>]*>/g, '<script src="../js/calculator.js">');
    content = content.replace(/<script\s+defer=""\s+src="\.\.\/js\/components\.js"[^>]*>/g, '<script src="../js/components.js">');
    
    if (content !== before) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixed++;
    }
  });

  return fixed;
}

console.log('Fixing script loading in all language directories...\n');

let totalFixed = 0;
LANGUAGES.forEach(lang => {
  const langDir = path.join('.', lang);
  if (fs.existsSync(langDir)) {
    const count = fixScriptsInDirectory(langDir);
    totalFixed += count;
    console.log(`${lang.toUpperCase()}: ${count} files fixed`);
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);
