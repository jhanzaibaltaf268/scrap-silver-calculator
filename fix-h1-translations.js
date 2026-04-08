const fs = require('fs');
const path = require('path');

const TARGET_LANGS = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];

for (const lang of TARGET_LANGS) {
  const indexPath = path.join(__dirname, lang, 'index');
  if (!fs.existsSync(indexPath)) continue;

  let content = fs.readFileSync(indexPath, 'utf8');

  // Extract the dictionary
  const dictMatch = content.match(/window\.MenuTranslations\s*=\s*(\{.*?\})\s*;/s);
  if (dictMatch) {
    try {
      const dictObj = JSON.parse(dictMatch[1]);
      const translatedTitle = dictObj["Scrap Silver Calculator"] || dictObj["Silver Scrap Calculator"];
      
      if (translatedTitle) {
        const regex = /<h1>\s*<span(?:[^>]*)>\s*(?:Scrap Silver Calculator|Silver Scrap Calculator)\s*<\/span>\s*<\/h1>/i;
        
        if (regex.test(content)) {
          content = content.replace(regex, `<h1><span class="highlight">${translatedTitle}</span></h1>`);
          fs.writeFileSync(indexPath, content, 'utf8');
          console.log(`✅ Fixed H1 in ${lang}/index to: ${translatedTitle}`);
        } else {
          console.log(`ℹ️ H1 not found or already translated in ${lang}/index`);
        }
      } else {
         console.warn(`⚠️ No translation found in dictionary for ${lang}`);
      }
    } catch (e) {
      console.error(`❌ Error parsing dictionary in ${lang}:`, e.message);
    }
  }
}
