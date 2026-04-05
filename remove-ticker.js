const fs = require('fs');
const path = require('path');

function removeTicker(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Don't go into git or node_modules or system folders
      if (file !== '.git' && file !== '.gemini' && file !== 'node_modules' && file !== 'css' && file !== 'js' && file !== 'images' && file !== 'assets') {
        removeTicker(fullPath);
      }
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Match <div id="price-ticker"[anything]></div> allowing whitespace
      const divRegex = /<div\s+id="price-ticker"[^>]*>\s*<\/div>/gi;
      if (divRegex.test(content)) {
        content = content.replace(divRegex, '');
        changed = true;
      }

      // Match SiteComponents.renderPriceTicker('price-ticker');
      const jsRegex = /SiteComponents\.renderPriceTicker\(['"]price-ticker['"]\);?/gi;
      if (jsRegex.test(content)) {
        content = content.replace(jsRegex, '');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Removed ticker from: ${fullPath}`);
      }
    }
  }
}

console.log('Starting price ticker removal...');
removeTicker(__dirname);
console.log('Done!');
