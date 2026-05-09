const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const langFolders = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
const masterSlugs = JSON.parse(fs.readFileSync('master-slugs.json', 'utf8'));

// Reverse mapping for finding English base from localized slug
const reverseMap = {};
Object.keys(masterSlugs).forEach(lang => {
    reverseMap[lang] = {};
    Object.entries(masterSlugs[lang]).forEach(([eng, loc]) => {
        reverseMap[lang][loc] = eng;
    });
});

function standardizeFile(filePath, lang) {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, '.html');
    
    // 1. Root-relative paths for assets
    content = content.replace(/(href|src)="(\.\.\/)*css\//g, '$1="/css/');
    content = content.replace(/(href|src)="(\.\.\/)*js\//g, '$1="/js/');
    content = content.replace(/(href|src)="(\.\.\/)*images\//g, '$1="/images/');
    content = content.replace(/(href|src)="(\.\.\/)*favicon\//g, '$1="/favicon/');
    content = content.replace(/url\((\.\.\/)*images\//g, 'url(/images/');

    // 2. Inject MenuTranslations
    const slugObj = JSON.stringify(masterSlugs[lang] || {});
    const injection = `\n    <script>window.MenuTranslations = ${slugObj};</script>`;
    
    // Check if already injected
    if (!content.includes('window.MenuTranslations')) {
        if (content.includes('</head>')) {
            content = content.replace('</head>', injection + '\n</head>');
        }
    } else {
        // Update existing one
        content = content.replace(/<script>window\.MenuTranslations = \{.*?\};<\/script>/, injection);
    }

    // 3. Fix Language Switcher Links (Dynamic Fix)
    // The components.js handles this if window.MenuTranslations is present.
    // But we should ensure components.js is loaded AFTER the injection.
    
    // 4. Fix Hardcoded Internal Links within the same language
    // Find all links like href="/fr/something" or href="something.html"
    // and ensure they use the correct slug from masterSlugs
    
    // 5. Canonical and alternate tags (SEO)
    // We'll leave them for now unless they are obviously broken.

    fs.writeFileSync(filePath, content);
    console.log(`Processed: ${filePath}`);
}

// Main execution
langFolders.forEach(lang => {
    const dir = path.join(rootDir, lang);
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    files.forEach(file => {
        standardizeFile(path.join(dir, file), lang);
    });
});

// Also process root files (English)
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
rootFiles.forEach(file => {
    // English doesn't need MenuTranslations injected for slugs usually, 
    // but SiteComponents expects it for the switcher to find OTHER languages.
    // Actually, English (root) should have a translation map too so it can find the FR/ES equivalents.
    // Let's inject a "null" or "identity" map for English if needed, but components.js handles English as base.
});
