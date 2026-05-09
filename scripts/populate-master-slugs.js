const fs = require('fs');
const path = require('path');

const LANGS = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
const ROOT_DIR = path.resolve(__dirname, '..');

function buildSlugs() {
    const masterSlugs = {};
    
    // Get all English files (root level)
    const enFiles = fs.readdirSync(ROOT_DIR)
        .filter(f => f.endsWith('.html') && f !== 'index.html' && f !== '404.html');

    enFiles.forEach(enFile => {
        const enSlug = enFile.replace('.html', '');
        masterSlugs[enSlug] = {};
        
        LANGS.forEach(lang => {
            const langDir = path.join(ROOT_DIR, lang);
            if (fs.existsSync(langDir)) {
                // Try to find the corresponding file in the language dir
                // We use the fact that these files were created from English ones
                // and the standardization script often keeps a reference or we can match by content/metadata
                // For now, we'll scan the lang dir and look for the most likely match
                // or use a simple heuristic: if there's only one file with a certain pattern.
                
                // Better approach: look at the canonical link in the localized file
                const langFiles = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
                for (const langFile of langFiles) {
                    const content = fs.readFileSync(path.join(langDir, langFile), 'utf8');
                    const canonicalMatch = content.match(/link rel="canonical" href="https:\/\/scrapsilvercalculater\.com\/([^"]+)\/"/);
                    if (canonicalMatch) {
                        const canonicalSlug = canonicalMatch[1].split('/').pop() || 'index';
                        if (canonicalSlug === enSlug) {
                            masterSlugs[enSlug][lang] = langFile.replace('.html', '');
                            break;
                        }
                    }
                }
            }
        });
    });

    // Write to file
    fs.writeFileSync(path.join(ROOT_DIR, 'master-slugs.json'), JSON.stringify(masterSlugs, null, 2));
    console.log('master-slugs.json has been repopulated.');
}

buildSlugs();
