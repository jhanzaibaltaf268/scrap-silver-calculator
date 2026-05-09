const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('old-gen.js', 'utf8');
const langSlugs = {};
const langFolders = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

langFolders.forEach(lang => {
    // Look for lang: { ... }
    const startIdx = content.indexOf(lang + ': {');
    if (startIdx === -1) return;
    
    // Find the matching closing brace
    let braceCount = 0;
    let endIdx = -1;
    for (let i = startIdx + lang.length + 2; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') {
            if (braceCount === 0) {
                endIdx = i;
                break;
            }
            braceCount--;
        }
    }
    
    if (endIdx !== -1) {
        const inner = content.substring(startIdx + lang.length + 3, endIdx);
        const slugs = {};
        const slugRegex = /"([^"]+)":\s*"([^"]+)"/g;
        let match;
        while ((match = slugRegex.exec(inner)) !== null) {
            slugs[match[1]] = match[2];
        }
        langSlugs[lang] = slugs;
    }
});

fs.writeFileSync('master-slugs.json', JSON.stringify(langSlugs, null, 2));
console.log('Successfully generated master-slugs.json');
