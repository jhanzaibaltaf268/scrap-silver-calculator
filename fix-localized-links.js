const fs = require('fs');
const path = require('path');

const TARGET_LANGS = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];

// The original english language switcher links inside index.html:
// <a href="index.html" class="lang-btn">🇬🇧 EN</a>
// <a href="es/index.html" class="lang-btn">🇪🇸 ES</a>
// etc

for (const lang of TARGET_LANGS) {
  const langDir = path.join(__dirname, lang);
  if (!fs.existsSync(langDir)) continue;

  const indexPath = path.join(langDir, 'index.html');
  if (!fs.existsSync(indexPath)) continue;

  let content = fs.readFileSync(indexPath, 'utf8');

  // Fix Language Switcher Links
  // We need to replace href="index.html" with href="../index.html"
  content = content.replace(/href="index\.html"/g, 'href="../index.html"');
  
  // Replace href="xx/index.html" with href="../xx/index.html"
  for (const l of TARGET_LANGS) {
    const regex = new RegExp(`href="${l}/index\\.html"`, 'g');
    content = content.replace(regex, `href="../${l}/index.html"`);
  }

  // Extract the dictionary to fix calculator links
  const dictMatch = content.match(/window\.MenuTranslations\s*=\s*(\{.*?\})\s*;/s);
  if (dictMatch) {
    try {
      // The dictionary contains single line strings for keys and values generally but we can parse it
      const dictObj = JSON.parse(dictMatch[1]);
      if (dictObj && dictObj.slugs) {
        // Iterate through all english slugs and replace them in the HTML
        for (const [engSlug, translatedSlug] of Object.entries(dictObj.slugs)) {
          // Replace exactly href="engSlug"
          const slugRegex = new RegExp(`href="${engSlug}"`, 'g');
          content = content.replace(slugRegex, `href="${translatedSlug}"`);
        }
      }
    } catch (e) {
      console.error(`Could not parse dictionary for ${lang}:`, e.message);
    }
  } else {
    console.warn(`No MenuTranslations found in ${lang}/index.html. Run restore-dicts script first!`);
  }

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`✅ Fixed links in ${lang}/index.html`);
}
