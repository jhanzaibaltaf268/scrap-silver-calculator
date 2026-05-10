const fs = require('fs');
const path = require('path');

const LANGUAGES = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

function fixCalcButtonInDirectory(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  let fixed = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content;

    // Check if the calc-btn listener already exists
    if (!content.includes("document.getElementById('calc-btn')")) {
      // Find the inline script section and add before the closing </script>
      // Look for patterns like "SilverPrice.onPriceUpdate" and add after it
      const pattern = /(SilverPrice\.onPriceUpdate\([^)]*\);?\s*\n\s*calculate\(\);?)/;
      const match = content.match(pattern);
      
      if (match) {
        const insertPoint = match.index + match[0].length;
        const insertCode = `\n\n    // Add listener to Calculate button\n    const cb = document.getElementById('calc-btn');\n    if (cb) {\n      const fn = typeof calculate === 'function' ? calculate : (typeof calc === 'function' ? calc : null);\n      if (fn) cb.addEventListener('click', fn);\n    }`;
        
        content = content.slice(0, insertPoint) + insertCode + content.slice(insertPoint);
        fixed++;
      }
    }

    if (content !== before) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });

  return fixed;
}

console.log('Adding calc-btn click listener to all language pages...\n');

let totalFixed = 0;
LANGUAGES.forEach(lang => {
  const langDir = path.join('.', lang);
  if (fs.existsSync(langDir)) {
    const count = fixCalcButtonInDirectory(langDir);
    totalFixed += count;
    console.log(`${lang.toUpperCase()}: ${count} files fixed`);
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);
