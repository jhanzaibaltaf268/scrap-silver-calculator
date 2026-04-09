const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML files in ${rootDir}`);

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let changed = false;

  // 1. Remove defer from specific scripts
  if (content.includes('defer')) {
      content = content.replace(/src="\/js\/silver-price\.js(\?v=[^"]*)?"\s*defer[^>]*>/g, 'src="/js/silver-price.js$1">');
      content = content.replace(/src="\/js\/calculator\.js(\?v=[^"]*)?"\s*defer[^>]*>/g, 'src="/js/calculator.js$1">');
      content = content.replace(/src="\/js\/components\.js(\?v=[^"]*)?"\s*defer[^>]*>/g, 'src="/js/components.js$1">');
      changed = true;
  }

  // 2. Fix ReferenceError by ensuring SilverPrice is defined
  // (The removal of defer should handle this)

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});
