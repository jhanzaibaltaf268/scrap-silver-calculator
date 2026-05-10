const fs = require('fs');

// Get all English pages
const englishPages = fs.readdirSync('.')
  .filter(f => f.endsWith('.html') && f !== '404.html')
  .map(f => f.replace('.html', ''));

console.log(`Total English pages: ${englishPages.length}\n`);

// Read translations.js and extract slugs
const transContent = fs.readFileSync('js/translations.js', 'utf8');
// Find the slugs object using a simple approach
const slugsMatch = transContent.match(/"slugs":\s*\{([\s\S]*?)\n  \}/);

if (slugsMatch) {
  // Count pages with NO slug mappings and with incomplete mappings
  const noMappings = [];
  const incompleteMappings = [];
  
  englishPages.forEach(page => {
    if (!transContent.includes(`"${page}": {`)) {
      noMappings.push(page);
    } else {
      // Check how many languages it has
      const pageRegex = new RegExp(`"${page}":\s*\{([^}]+)\}`);
      const match = transContent.match(pageRegex);
      if (match) {
        const langs = (match[1].match(/"/g) || []).length / 2;
        if (langs < 11) {
          incompleteMappings.push({ page, langs });
        }
      }
    }
  });
  
  console.log(`Pages with NO slug mappings: ${noMappings.length}`);
  noMappings.forEach(p => console.log(`  - ${p}`));
  
  console.log(`\nPages with INCOMPLETE mappings (< 11 languages): ${incompleteMappings.length}`);
  incompleteMappings.slice(0, 10).forEach(p => {
    console.log(`  - ${p.page} (${p.langs} languages)`);
  });
}
