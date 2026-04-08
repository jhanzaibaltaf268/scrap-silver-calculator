const fs = require('fs');
const path = require('path');

const FONT_PRECONNECTS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&family=Outfit:wght@400..800&display=swap" rel="stylesheet">`;

const SCRIPTS_TO_DEFER = [
    'silver-price.js',
    'calculator.js',
    'components.js',
    'silver-price.js', // Redundant but safe
];

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            if (file.endsWith(".html")) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add Defer to Scripts (Improved Regex to handle ?v=2.1 etc.)
    SCRIPTS_TO_DEFER.forEach(scriptName => {
        // Pattern matches <script src="...scriptName[anything_before_quote]" [any_other_attrs]>
        const scriptRegex = new RegExp(`<script\\s+src="([^"]*${scriptName}[^"]*)"([^>]*)><\\/script>`, 'g');
        
        if (content.match(scriptRegex)) {
            content = content.replace(scriptRegex, (match, src, attrs) => {
                const trimmedAttrs = attrs.trim();
                if (!trimmedAttrs.includes('defer') && !match.includes('defer')) {
                    modified = true;
                    // Preserve any other attributes and add defer
                    return `<script src="${src}" ${trimmedAttrs} defer></script>`.replace(/\s+/g, ' ').replace(' >', '>');
                }
                return match;
            });
        }
    });

    // 2. Add Font Preconnects and Stylesheet to <head>
    if (!content.includes('fonts.googleapis.com')) {
        if (content.includes('</head>')) {
            content = content.replace('</head>', `${FONT_PRECONNECTS}\n</head>`);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Optimized: ${filePath}`);
    }
}

// Execution
const htmlFiles = getAllHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach(file => {
    try {
        processFile(file);
    } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
    }
});

console.log('Global optimization (V2) complete.');
