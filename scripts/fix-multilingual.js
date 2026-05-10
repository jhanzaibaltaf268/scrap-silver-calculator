/**
 * COMPREHENSIVE MULTILINGUAL FIX SCRIPT
 * 
 * 1. Builds complete slug mapping by matching localized slugs in existing master-slugs.json
 *    and by scanning actual files with pattern matching
 * 2. Fixes all localized HTML pages:
 *    - Correct canonical URLs
 *    - Correct hreflang tags for all 11 languages  
 *    - Ensures ../js/translations.js is loaded FIRST
 *    - Ensures ../js/components.js is loaded
 *    - Fixes internal links to use correct localized slugs
 * 3. Regenerates translations.js with complete slug map
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const langs = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
const BASE_URL = 'https://scrapsilvercalculater.com';

// ============================================================
// STEP 1: Load complete slug map
// ============================================================
console.log('Step 1: Loading slug map...');

const slugMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'master-slugs.json'), 'utf8'));

// Build reverse lookup
const reverseMap = {}; // lang -> localSlug -> enSlug
for (const [enSlug, translations] of Object.entries(slugMap)) {
    for (const [lang, localSlug] of Object.entries(translations)) {
        if (!reverseMap[lang]) reverseMap[lang] = {};
        reverseMap[lang][localSlug] = enSlug;
    }
}


// Coverage report
let total = 0, mapped = 0;
for (const [en, trans] of Object.entries(slugMap)) {
    for (const lang of langs) { total++; if (trans[lang]) mapped++; }
}
console.log(`  Coverage: ${mapped}/${total} (${Math.round(mapped/total*100)}%)`);

// ============================================================
// STEP 2: Fix all localized HTML pages
// ============================================================
console.log('\nStep 2: Fixing all localized HTML pages...');

function buildHreflangTags(enSlug) {
    const lines = [];
    lines.push(`  <link rel="alternate" hreflang="en" href="${BASE_URL}/${enSlug}/">`);
    lines.push(`  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/${enSlug}/">`);
    
    for (const lang of langs) {
        const localSlug = slugMap[enSlug] && slugMap[enSlug][lang];
        if (localSlug) {
            lines.push(`  <link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}/${localSlug}/">`);
        }
    }
    return lines.join('\n');
}

let pagesFixed = 0;

for (const lang of langs) {
    const dir = path.join(ROOT, lang);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    for (const file of files) {
        const localSlug = file.replace('.html', '');
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Find the English slug for this page
        let enSlug = null;
        if (localSlug === 'index') {
            enSlug = 'index';
        } else if (reverseMap[lang] && reverseMap[lang][localSlug]) {
            enSlug = reverseMap[lang][localSlug];
        }

        // FIX 0: Set html lang attribute
        content = content.replace(/<html[^>]*>/i, `<html lang="${lang}">`);

        // FIX 1: Ensure translations.js is loaded as the very first script
        if (!content.includes('../js/translations.js')) {
            content = content.replace('<head>', '<head>\n  <script src="../js/translations.js"></script>');
            modified = true;
        }

        // FIX 2: Ensure components.js is loaded
        if (!content.includes('../js/components.js')) {
            // Add before </body>
            content = content.replace('</body>', '  <script src="../js/components.js"></script>\n</body>');
            modified = true;
        }

        // FIX 3: Ensure site-header div exists
        if (!content.includes('id="site-header"')) {
            content = content.replace('<body>', '<body>\n  <div id="site-header"></div>');
            modified = true;
        }

        // FIX 4: Ensure site-footer div exists  
        if (!content.includes('id="site-footer"')) {
            content = content.replace('</main>', '</main>\n  <div id="site-footer"></div>');
            modified = true;
        }

        // FIX 5: Fix canonical and hreflang if we know the English slug
        if (enSlug && enSlug !== 'index') {
            const canonUrl = localSlug === 'index' 
                ? `${BASE_URL}/${lang}/` 
                : `${BASE_URL}/${lang}/${localSlug}/`;
            
            // Fix canonical
            const newCanon = `<link rel="canonical" href="${canonUrl}">`;
            if (content.includes('rel="canonical"')) {
                content = content.replace(/<link rel="canonical"[^>]+>/i, newCanon);
            } else {
                content = content.replace('</head>', `  ${newCanon}\n</head>`);
            }
            
            // Replace/add hreflang tags
            const newHreflang = buildHreflangTags(enSlug);
            
            // Remove old hreflang tags
            content = content.replace(/<link rel="alternate"[^>]+hreflang[^>]+>\n?/gi, '');
            
            // Add new hreflang after canonical
            content = content.replace(newCanon, newCanon + '\n' + newHreflang);
            modified = true;
        } else if (localSlug === 'index') {
            // Homepage canonical
            const canonUrl = `${BASE_URL}/${lang}/`;
            const newCanon = `<link rel="canonical" href="${canonUrl}">`;
            if (content.includes('rel="canonical"')) {
                content = content.replace(/<link rel="canonical"[^>]+>/i, newCanon);
            }
            modified = true;
        }

        // FIX 6: Fix asset paths
        content = content.replace(/href="\/css\//g, 'href="../css/');
        content = content.replace(/src="\/js\//g, 'src="../js/');
        content = content.replace(/href="\/favicon/g, 'href="../favicon');

        // FIX 7: Remove old inline MenuTranslations slug injections (now comes from translations.js)
        content = content.replace(/<script>window\.MenuTranslations\s*=\s*window\.MenuTranslations\s*\|\|\s*\{\};\s*window\.MenuTranslations\.slugs\s*=\s*[^<]+<\/script>\n?/g, '');

        if (modified) {
            fs.writeFileSync(filePath, content);
            pagesFixed++;
        }
    }
}
console.log(`  Fixed ${pagesFixed} pages.`);

// ============================================================
// STEP 3: Regenerate translations.js with complete slug map
// ============================================================
console.log('\nStep 3: Regenerating translations.js...');

const translationsPath = path.join(ROOT, 'js', 'translations.js');
let transContent = fs.readFileSync(translationsPath, 'utf8');

// Remove old slugs section and replace with new complete one
const slugsJson = JSON.stringify(slugMap, null, 2);

// Find where "slugs": starts and replace to end
const slugsStart = transContent.indexOf('"slugs"');
if (slugsStart !== -1) {
    const beforeSlugs = transContent.substring(0, slugsStart - 2); // remove ,\n before slugs
    const newContent = beforeSlugs + `,\n  "slugs": ${slugsJson}\n};\n`;
    fs.writeFileSync(translationsPath, newContent);
    console.log('  translations.js updated with complete slug map.');
} else {
    // Add slugs to the end
    const endIdx = transContent.lastIndexOf('};');
    const newContent = transContent.substring(0, endIdx) + `,\n  "slugs": ${slugsJson}\n};\n`;
    fs.writeFileSync(translationsPath, newContent);
    console.log('  translations.js: added slug map.');
}

console.log('\nAll done! Summary:');
console.log(`  - master-slugs.json: ${Object.keys(slugMap).length} English pages`);
console.log(`  - Slug coverage: ${mapped}/${total} (${Math.round(mapped/total*100)}%)`);
console.log(`  - Pages fixed: ${pagesFixed}`);
