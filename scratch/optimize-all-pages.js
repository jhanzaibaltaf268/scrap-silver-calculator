const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const OPTIMIZED_FONTS = `  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@400;700;800&display=swap">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@400;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@400;700;800&display=swap"></noscript>`;

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function optimizeFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Optimize Google Fonts Link
    const fontRegex = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@300\.\.900&amp;family=Outfit:wght@400\.\.800&amp;display=swap" rel="stylesheet">/g;
    const fontRegexAlt = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@300\.\.900&family=Outfit:wght@400\.\.800&display=swap" rel="stylesheet">/g;
    
    if (fontRegex.test(content)) {
        content = content.replace(fontRegex, OPTIMIZED_FONTS);
    } else if (fontRegexAlt.test(content)) {
        content = content.replace(fontRegexAlt, OPTIMIZED_FONTS);
    }

    // 2. Defer Microsoft Clarity
    const clarityRegex = /\(function\(c,l,a,r,i,t,y\)\{[\s\S]+?\}\)\(window, document, "clarity", "script", "wby5gobage"\);/g;
    if (clarityRegex.test(content) && !content.includes('window.addEventListener(\'load\'')) {
        content = content.replace(clarityRegex, (match) => {
            return `window.addEventListener('load', function() {\n        ${match}\n    });`;
        });
    }

    // 3. Remove LCP Reveal Blocks (h1, hero, dash)
    // Only remove reveal if it's likely above the fold
    content = content.replace(/class="([^"]*)\breveal\b([^"]*)"/g, (match, p1, p2) => {
        const lower = match.toLowerCase();
        if (lower.includes('h1') || lower.includes('hero') || lower.includes('dash') || lower.includes('header')) {
            return `class="${p1}${p2}"`.replace(/\s\s+/g, ' ').replace(/"\s/g, '"').replace(/\s"/g, '"');
        }
        return match;
    });
    
    // Also handle index.html specific reveal removal if regex missed it
    content = content.replace(/class="reveal reveal-d1"/g, 'class=""');
    content = content.replace(/class="hero-sub reveal reveal-d2"/g, 'class="hero-sub"');
    content = content.replace(/class="dash reveal reveal-d3"/g, 'class="dash visible"');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

const htmlFiles = getAllHtmlFiles(ROOT_DIR);
console.log(`Found ${htmlFiles.length} HTML files.`);

let count = 0;
htmlFiles.forEach(file => {
    if (optimizeFile(file)) {
        count++;
        console.log(`Optimized: ${path.relative(ROOT_DIR, file)}`);
    }
});

console.log(`Optimization complete. Total files updated: ${count}`);
