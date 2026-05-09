const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const langs = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

langs.forEach(lang => {
    const dir = path.join(ROOT_DIR, lang);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Ensure translations.js is loaded
        if (!content.includes('js/translations.js')) {
            content = content.replace('<head>', '<head>\n  <script src="../js/translations.js"></script>');
        }
        
        // Remove any old inline MenuTranslations
        content = content.replace(/<script>window\.MenuTranslations = .*?<\/script>/g, '');

        // 2. Standardize Asset Paths to RELATIVE (../)
        content = content.replace(/href="\/css\//g, 'href="../css/');
        content = content.replace(/src="\/js\//g, 'src="../js/');
        content = content.replace(/href="\/favicon\.png"/g, 'href="../favicon.png"');

        // 3. Fix Absolute Internal Links to Relative
        // Matches href="/es/slug" or href="/fr/slug" etc.
        content = content.replace(/href="\/([a-z]{2})\/([^"]*)"/g, (match, l, s) => {
            if (l === lang) return `href="./${s}"`;
            return `href="../${l}/${s}"`;
        });

        // 4. Ensure Dynamic Placeholders exist for Homepages
        if (file === 'index.html') {
            if (!content.includes('id="dynamic-steps"')) {
                content = content.replace('</main>', '<div id="dynamic-steps"></div><div id="dynamic-understand"></div><div id="dynamic-faq"></div>\n</main>');
            }
        }

        fs.writeFileSync(filePath, content);
    });
    console.log(`Standardized: ${lang}`);
});
