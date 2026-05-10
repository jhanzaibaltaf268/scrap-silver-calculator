const fs = require('fs');
const path = require('path');

const LANGUAGES = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

function fixBreadcrumbsInDirectory(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  let fixed = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content;

    // Fix: window.MenuTranslations['Home'] → (window.MenuTranslations[SiteComponents.getLangCode()] || window.MenuTranslations['en'])['Home']
    // Pattern: {label: window.MenuTranslations['...'] || '...'
    content = content.replace(
      /\{label:\s*window\.MenuTranslations\['([^']+)'\]\s*\|\|/g,
      (match, key) => `{label: ((window.MenuTranslations[SiteComponents.getLangCode()] || window.MenuTranslations['en']) || {})['${key}'] ||`
    );

    // Also handle cases without fallback
    content = content.replace(
      /\{label:\s*window\.MenuTranslations\['([^']+)'\][^,]*,/g,
      (match, key) => `{label: ((window.MenuTranslations[SiteComponents.getLangCode()] || window.MenuTranslations['en']) || {})['${key}'],`
    );

    if (content !== before) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixed++;
    }
  });

  return fixed;
}

console.log('Fixing breadcrumb translation syntax...\n');

let totalFixed = 0;
LANGUAGES.forEach(lang => {
  const langDir = path.join('.', lang);
  if (fs.existsSync(langDir)) {
    const count = fixBreadcrumbsInDirectory(langDir);
    totalFixed += count;
    console.log(`${lang.toUpperCase()}: ${count} files fixed`);
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);
