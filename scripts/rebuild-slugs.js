const fs = require('fs');
const path = require('path');

const langs = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
const masterSlugs = {};

langs.forEach(lang => {
    const dir = path.join(__dirname, '..', lang);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Extract English canonical/alternate link to find the base slug
        // Pattern: <link rel="alternate" hreflang="en" href="https://scrapsilvercalculater.com/some-slug/">
        const match = content.match(/hreflang="en" href="https:\/\/scrapsilvercalculater\.com\/([^"\/]*)\/?"/);
        
        if (match) {
            let enSlug = match[1] || 'index';
            if (!enSlug || enSlug === '') enSlug = 'index';
            
            const currentSlug = file.replace('.html', '');
            
            if (!masterSlugs[enSlug]) masterSlugs[enSlug] = {};
            masterSlugs[enSlug][lang] = currentSlug;
        }
    });
});

fs.writeFileSync('master-slugs.json', JSON.stringify(masterSlugs, null, 2));
console.log('Rebuilt master-slugs.json with', Object.keys(masterSlugs).length, 'entries.');
