const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const languages = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Fix index.html in Logo/Home links (if missing from components.js injection)
    // Actually these are injected usually, but some pages might have hardcoded ones.
    content = content.replace(/href="index\.html"/g, 'href="/"');

    // 2. Fix localized index.html references in subdirectories
    content = content.replace(/href="\.\.\/index\.html"/g, 'href="/"');

    // 3. Fix breadcrumbs: [{label:'Home',href:'index.html'}] -> [{label:'Home',href:'/'}]
    content = content.replace(/label\s*:\s*'Home'\s*,\s*href\s*:\s*'index\.html'/g, "label:'Home',href:'/'");

    // 4. Fix slugs in window.MenuTranslations
    // Look for "slugs":{...}
    const slugsMatch = content.match(/"slugs"\s*:\s*\{(.*?)\}/s);
    if (slugsMatch) {
        let slugsContent = slugsMatch[1];
        // Remove .html from all keys and values in the slugs object
        // Example: "silver-scrap-calculator.html":"calculadora-de-plata-de-desecho.html"
        // becomes "silver-scrap-calculator":"calculadora-de-plata-de-desecho"
        const cleanedSlugs = slugsContent.replace(/\.html/g, '');
        content = content.replace(slugsMatch[1], cleanedSlugs);
    }

    // 5. Global cleanup for any href="/something.html" -> href="/something/"
    // Note: We add a trailing slash because vercel.json has trailingSlash: true
    content = content.replace(/href="\/([^"]+?)\.html"/g, 'href="/$1/"');

    // 6. Fix relative href="something.html" -> href="something/"
    // (Ensure we don't catch external links which start with http)
    content = content.replace(/href="(?!(http|\/|#))([^"]+?)\.html"/g, 'href="$2/"');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getAllHtmlFiles(name, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(name);
        }
    });
    return fileList;
}

console.log('🚀 Starting Clean URL Migration...');
const htmlFiles = getAllHtmlFiles(rootDir);
let updatedCount = 0;

htmlFiles.forEach(file => {
    if (processFile(file)) {
        updatedCount++;
    }
});

console.log(`✅ Migration complete! Updated ${updatedCount} files.`);
