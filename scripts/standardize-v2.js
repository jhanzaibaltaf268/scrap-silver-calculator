const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const slugs = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'master-slugs.json'), 'utf8'));
const langs = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

langs.forEach(lang => {
    const dir = path.join(ROOT_DIR, lang);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    const langSlugs = {};
    for (const [en, trans] of Object.entries(slugs)) {
        if (trans[lang]) langSlugs[en] = trans[lang];
    }

    const translationInjection = `<script>window.MenuTranslations = window.MenuTranslations || {}; window.MenuTranslations.slugs = ${JSON.stringify(langSlugs)};</script>`;

    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Inject MenuTranslations
        if (!content.includes('window.MenuTranslations')) {
            content = content.replace('<head>', '<head>\n' + translationInjection);
        } else {
            content = content.replace(/<script>window\.MenuTranslations = .*?<\/script>/, translationInjection);
        }

        // 2. Standardize Asset Paths to RELATIVE (../)
        content = content.replace(/href="\/css\//g, 'href="../css/');
        content = content.replace(/src="\/js\//g, 'src="../js/');
        content = content.replace(/href="\/favicon\.png"/g, 'href="../favicon.png"');
        content = content.replace(/href="\/apple-touch-icon\.png"/g, 'href="../apple-touch-icon.png"');
        content = content.replace(/src="\/images\//g, 'src="../images/');

        // 3. Fix Hardcoded Absolute Links in Content (e.g. href="/es/...")
        const langLinkRegex = new RegExp(`href="/(${langs.join('|')})/`, 'g');
        content = content.replace(langLinkRegex, (match, l) => `href="../${l}/`);
        
        content = content.replace(/href="\/([^"/][^"]+\.html)"/g, 'href="../$1"');

        // 4. Special handling for localized homepages (index.html)
        if (file === 'index.html') {
            if (!content.includes('id="dynamic-steps"')) {
                if (content.includes('</main>')) {
                    content = content.replace('</main>', '<div id="dynamic-steps"></div>\n<div id="dynamic-understand"></div>\n<div id="dynamic-faq"></div>\n</main>');
                }
            }
        }

        fs.writeFileSync(filePath, content);
        console.log(`Standardized: ${lang}/${file}`);
    });
});

console.log('Site-wide standardization complete.');
