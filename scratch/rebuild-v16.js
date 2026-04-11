const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const folders = ['ar','de','es','fr','hi','it','pt','ru','tr','ur','zh',''];

folders.forEach(lang => {
  const dirPath = lang ? path.join(rootDir, lang) : rootDir;
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // 1. HEAD CLEANUP: Inject translations.js and remove hardcoded window.MenuTranslations
    if (!content.includes('translations.js')) {
      content = content.replace('<head>', '<head>\n  <script src="/js/translations.js"></script>');
    }
    content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\};\s*<\/script>/gs, '');

    // 2. BODY CLEANUP: REBUILD AS SHELL
    // First, find the Hero/Calculator section (this is unique per page)
    const heroMatch = content.match(/<section[^>]*class="hero[^>]*>[\s\S]*?<\/section>/);
    if (!heroMatch) return; // Skip if it's not a standard calculator page
    const heroHtml = heroMatch[0];

    // Wipe everything between <body> and </body>
    // Reconstruct with hooks
    const newBody = `
  <div id="site-header"></div>
  <main>
    ${heroHtml}
    <div id="dynamic-steps"></div>
    <div id="dynamic-understand"></div>
    <div id="dynamic-faq"></div>
  </main>
  <div id="site-footer"></div>`;

    // Replace everything between <body> and </body> scripts
    const bodyRegex = /<body>[\s\S]*?<\/main>/;
    if (content.match(bodyRegex)) {
      content = content.replace(bodyRegex, `<body>${newBody}`);
    } else {
      // Fallback for non-standard structures
      content = content.replace(/<body>[\s\S]*?<\/body>/, `<body>${newBody}\n  <script src="/js/silver-price.js"></script>\n  <script src="/js/calculator.js"></script>\n  <script src="/js/components.js"></script>\n</body>`);
    }

    // 3. REMOVE DUPLICATE HEADERS/TAILS
    content = content.replace(/<div class="lang-switcher">[\s\S]*?<\/div>/g, '');
    content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/g, '');
    content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/g, '');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Rebuilt ${lang || 'root'} folder (${files.length} files)`);
});
