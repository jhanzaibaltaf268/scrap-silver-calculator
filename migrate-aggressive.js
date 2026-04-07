const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Replace index.html with / (handles double and single quotes)
    content = content.replace(/href=["']index\.html["']/g, 'href="/"');
    
    // 2. Fix localized index.html (e.g., ../index.html)
    content = content.replace(/href=["']\.\.\/index\.html["']/g, 'href="/"');

    // 3. Fix breadcrumbs: label:'Home',href:'index.html' (handles spaces, quotes)
    content = content.replace(/label\s*:\s*['"]Home['"]\s*,\s*href\s*:\s*['"]index\.html['"]/g, "label:'Home',href:'/'");

    // 4. Robust Slug Cleaning
    // Matches "slugs":{ ... } or slugs:{ ... }
    const slugsMatch = content.match(/["']?slugs["']?\s*:\s*\{(.*?)\}/s);
    if (slugsMatch) {
        let slugsContent = slugsMatch[1];
        // Remove .html from all strings inside the slugs object
        const cleanedSlugs = slugsContent.replace(/\.html/g, '');
        content = content.replace(slugsMatch[1], cleanedSlugs);
    }

    // 5. Global Internal Link Cleaning: href="/path.html" -> href="/path/"
    // Added a trailing slash to match vercel.json trailingSlash: true
    content = content.replace(/href=["']\/([^"'>]+?)\.html["']/g, 'href="/$1/"');

    // 6. Global relative Link Cleaning: href="path.html" -> href="path/"
    // Exclude external links, hashes, and slashes
    content = content.replace(/href=["'](?!(http|\/|#))([^"'>]+?)\.html["']/g, 'href="$2/"');

    // 7. Cleanup duplicate trailing slashes (just in case)
    content = content.replace(/\/\/"/g, '/"');
    content = content.replace(/\/\/'/g, "/'");

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

console.log('🔥 Starting AGGRESSIVE Clean URL Migration...');
const htmlFiles = getAllHtmlFiles(rootDir);
let updatedCount = 0;

htmlFiles.forEach(file => {
    try {
        if (processFile(file)) {
            updatedCount++;
        }
    } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
    }
});

console.log(`✅ Migration complete! Updated/Verified ${updatedCount} files.`);
