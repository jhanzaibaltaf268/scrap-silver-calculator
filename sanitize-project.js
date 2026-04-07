const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const htmlFiles = [];

function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                findHtmlFiles(fullPath);
            }
        } else if (file.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    }
}

findHtmlFiles(baseDir);
console.log(`Found ${htmlFiles.length} HTML files. Sanitizing...`);

let count = 0;
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Standardize Assets to Root-Relative
    content = content.replace(/href="css\/style\.css"/g, 'href="/css/style.css"');
    content = content.replace(/src="js\//g, 'src="/js/');
    // Also handle nested assets (e.g. ../css/)
    content = content.replace(/href="\.\.\/css\/style\.css\?v=2\.1"/g, 'href="/css/style.css?v=2.1"');
    content = content.replace(/src="\.\.\/js\//g, 'src="/js/');

    // 2. Standardize Language Switcher Links (Root pages only should beware of relative links)
    // If we are in the root directory, fix "es/" to "/es/"
    const isRoot = path.dirname(file) === baseDir;
    if (isRoot) {
        const langs = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];
        langs.forEach(l => {
            const relPattern = new RegExp(`href="${l}\/"`, 'g');
            content = content.replace(relPattern, `href="/${l}/"`);
        });
    }

    // 3. Clean any remaining .html links in the body/nav (fallback)
    content = content.replace(/href="([^\/][^"]+)\.html"/g, 'href="/$1/"');

    if (content !== original) {
        fs.writeFileSync(file, content);
        count++;
    }
});

console.log(`Sanitization complete. Updated ${count} files.`);
