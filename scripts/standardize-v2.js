const fs = require('fs');
const path = require('path');

const slugs = JSON.parse(fs.readFileSync('master-slugs.json', 'utf8'));

const langs = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

langs.forEach(lang => {
    const dir = path.join(__dirname, '..', lang);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    const langSlugs = {};
    for (const [en, trans] of Object.entries(slugs)) {
        if (trans[lang]) langSlugs[en] = trans[lang];
    }

    const injection = `<script>window.MenuTranslations = ${JSON.stringify(langSlugs)};</script>`;

    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Inject MenuTranslations
        if (!content.includes('window.MenuTranslations')) {
            content = content.replace('<head>', '<head>\n' + injection);
        } else {
            content = content.replace(/<script>window\.MenuTranslations = .*?<\/script>/, injection);
        }

        // 2. Standardize Asset Paths to RELATIVE (Depth-aware)
        // Since these are in subdirectories, they need ../
        content = content.replace(/href="\/css\//g, 'href="../css/');
        content = content.replace(/src="\/js\//g, 'src="../js/');
        content = content.replace(/href="\/favicon\.png"/g, 'href="../favicon.png"');
        content = content.replace(/href="\/apple-touch-icon\.png"/g, 'href="../apple-touch-icon.png"');
        
        // Handle images in content if any
        content = content.replace(/src="\/images\//g, 'src="../images/');

        fs.writeFileSync(filePath, content);
        console.log(`Standardized: ${lang}/${file}`);
    });
});
