const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const languages = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];

function cleanupFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Remove messy legacy style blocks (specifically the lang-switcher fix)
    content = content.replace(/<style>[\s\S]*?\.lang-switcher[\s\S]*?<\/style>/gi, '');
    
    // 2. Remove duplicate Calculate buttons
    // We look for button blocks that look like the one we want to remove
    const btnPattern = /<button class="btn btn-primary btn-full" id="calc-btn" style="margin-top:var\(--space-md\);">Calculate Melt Value<\/button>/g;
    const matches = content.match(btnPattern);
    if (matches && matches.length > 1) {
        // Keep only the first one if it's inside the calc-widget, or better yet, 
        // if there's a script that handles it, we keep one.
        // Actually, many pages had two identical buttons injected.
        content = content.replace(btnPattern, (match, offset, full) => {
            // Only keep the first occurrence
            return full.indexOf(match) === offset ? match : '';
        });
    }

    // 3. Fix Breadcrumb injection to be cleaner
    // Replace hardcoded breadcrumb logic with a more standard one if it looks messy
    content = content.replace(/const homeMenuText = window\.MenuTranslations\["Home"\] \|\| "Home";\s*SiteComponents\.renderBreadcrumb\('breadcrumb', \[\s*\{label: homeMenuText, href:'\/'\},\s*\{label:'(.*?)'\}\s*\]\);/g, 
        "SiteComponents.renderBreadcrumb('breadcrumb', [{label:'Home', href:'/'}, {label:'$1'}]);");

    // 4. Update Header/Footer script versions to avoid caching issues during migration
    content = content.replace(/\?v=2\.1/g, '?v=3.0');

    // 5. Ensure body padding is removed (our new header is fixed but handles its own space)
    content = content.replace(/body\s*\{\s*padding-top:.*?!important;?\s*\}/gi, '');

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

console.log('🧹 Starting Project Sanitization...');
const htmlFiles = getAllHtmlFiles(rootDir);
let updatedCount = 0;

htmlFiles.forEach(file => {
    if (cleanupFile(file)) {
        updatedCount++;
    }
});

console.log(`✨ Cleanup complete! Sanitized ${updatedCount} files.`);
