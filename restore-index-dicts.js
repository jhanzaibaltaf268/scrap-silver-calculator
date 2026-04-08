const fs = require('fs');
const path = require('path');

const TARGET_LANGS = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];

for (const lang of TARGET_LANGS) {
  const langDir = path.join(__dirname, lang);
  if (!fs.existsSync(langDir)) continue;

  const files = fs.readdirSync(langDir);
  let dictionaryInjection = null;

  for (const file of files) {
    if (file.endsWith('.html') && file !== 'index') {
      const content = fs.readFileSync(path.join(langDir, file), 'utf8');
      const match = content.match(/window\.MenuTranslations\s*=\s*\{.*?\};/s);
      
      // Ensure we found a real dictionary, not an empty {}
      if (match && match[0].length > 100) {
        dictionaryInjection = match[0];
        break; 
      }
    }
  }

  if (dictionaryInjection) {
    const indexPath = path.join(langDir, 'index');
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // If it already has one, replace it
      if (indexContent.includes('window.MenuTranslations')) {
        indexContent = indexContent.replace(/window\.MenuTranslations\s*=\s*\{.*?\};/s, dictionaryInjection);
      } else {
        indexContent = indexContent.replace('</body>', `<script>\n  ${dictionaryInjection}\n</script>\n</body>`);
      }
      
      fs.writeFileSync(indexPath, indexContent);
      console.log(`✅ Restored FULL dictionary for ${lang}/index (${dictionaryInjection.length} bytes)`);
    }
  } else {
    console.warn(`⚠️ Could not find FULL dictionary for ${lang}`);
  }
}
