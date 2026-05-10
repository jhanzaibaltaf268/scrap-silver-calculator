/**
 * COMPLETE SLUG MAP BUILDER
 * Uses filename pattern + HTML content analysis to map every localized file to its English slug
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const langs = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

// Load the current master-slugs.json
const current = JSON.parse(fs.readFileSync(path.join(ROOT, 'master-slugs.json'), 'utf8'));

// Get all English pages
const enPages = fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html') && !['404.html','audit-report.html','scrapsilver-masterpiece.html','modern-dashboard-calculator.html'].includes(f))
    .map(f => f.replace('.html', ''))
    .sort();

// Build complete slug map - start with existing
const slugMap = {
    "index": {}
};
for (const lang of langs) {
    slugMap["index"][lang] = "index";
}
for (const en of enPages) {
    if (en !== 'index') slugMap[en] = { ...(current[en] || {}) };
}

// For each language, list all files and try to find the English match
// by looking for anchor links to English pages, or by script references
for (const lang of langs) {
    const dir = path.join(ROOT, lang);
    if (!fs.existsSync(dir)) { console.log(`Missing dir: ${lang}`); continue; }
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html').map(f => f.replace('.html',''));
    
    for (const localSlug of files) {
        // Already mapped?
        const alreadyMapped = Object.entries(slugMap).some(([en, trans]) => trans[lang] === localSlug);
        if (alreadyMapped) continue;
        
        const filePath = path.join(dir, localSlug + '.html');
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Method 1: Look for hreflang="en" pointing to the canonical English page
        let enSlug = null;
        
        const hreflangMatch = content.match(/hreflang=["']en["'][^>]*href=["'][^"']*\/([a-z0-9][a-z0-9-]+)\/?["']/i)
                           || content.match(/href=["'][^"']*\/([a-z0-9][a-z0-9-]+)\/?["'][^>]*hreflang=["']en["']/i);
        if (hreflangMatch) {
            const candidate = hreflangMatch[1];
            if (slugMap[candidate] !== undefined) enSlug = candidate;
        }
        
        // Method 2: Look for canonical pointing to English
        if (!enSlug) {
            const canonMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']https?:\/\/[^\/]+\/([a-z0-9][a-z0-9-]+)\/?["']/i);
            if (canonMatch && slugMap[canonMatch[1]] !== undefined) {
                enSlug = canonMatch[1];
            }
        }
        
        // Method 3: Look for links to English site (../pageslug/) or (../../pageslug/)
        if (!enSlug) {
            // Look for script that calls SiteComponents.renderBreadcrumb with a localized slug
            // or any href that resolves to an English page
            const scriptMatch = content.match(/href=["']\.\.\/\.\.\/([a-z0-9][a-z0-9-]+)\/["']/g);
            if (scriptMatch) {
                for (const m of scriptMatch) {
                    const s = m.match(/\/([a-z0-9][a-z0-9-]+)\//);
                    if (s && slugMap[s[1]] !== undefined) {
                        enSlug = s[1];
                        break;
                    }
                }
            }
        }
        
        // Method 5: Pattern matching for localized filenames
        if (!enSlug) {
            const ls = localSlug.toLowerCase();
            
            // 1. Specific Number + Unit Patterns (High Priority)
            if (ls.includes('1-10') || ls.includes('10分之1') || ls.includes('1-10-')) enSlug = '1-10oz-silver-value';
            else if (ls.includes('100') && (ls.includes('oz') || ls.includes('ons') || ls.includes('盎司') || ls.includes('اوز') || ls.includes('أوقية'))) enSlug = '100oz-silver-value';
            else if (ls.includes('10') && (ls.includes('oz') || ls.includes('ons') || ls.includes('盎司') || ls.includes('اوز') || ls.includes('أوقية'))) enSlug = '10oz-silver-value';
            else if (ls.includes('1') && (ls.includes('oz') || ls.includes('ons') || ls.includes('盎司') || ls.includes('اوز') || ls.includes('أوقية')) && !ls.includes('10')) enSlug = '1oz-silver-value';
            else if (ls.includes('2') && (ls.includes('oz') || ls.includes('ons') || ls.includes('盎司') || ls.includes('اوز') || ls.includes('أوقية'))) enSlug = '2oz-silver-value';
            else if (ls.includes('5') && (ls.includes('oz') || ls.includes('ons') || ls.includes('盎司') || ls.includes('اوز') || ls.includes('أوقية'))) enSlug = '5oz-silver-value';
            else if (ls.includes('1kg') || ls.includes('1-kg') || ls.includes('1公斤') || ls.includes('1-公斤') || ls.includes('1کلو') || ls.includes('1-کلو') || ls.includes('1кг') || ls.includes('1-кг') || ls.includes('1-كيلو') || ls.includes('1كيلو')) enSlug = '1kg-silver-value';
            else if (ls.includes('tola')) enSlug = 'tola-calculator';
            else if (ls.includes('pennyweight') || ls.includes('dwt')) enSlug = 'pennyweight-calculator';

            // 2. Specific Purity Patterns
            else if (ls.includes('999')) enSlug = '999-silver-calculator';
            else if (ls.includes('958')) enSlug = '958-silver-calculator';
            else if (ls.includes('925')) {
                if (ls.includes('gram')) enSlug = '925-sterling-silver-price-per-gram';
                else if (ls.includes('mean') || ls.includes('anlama') || ls.includes('significa') || ls.includes('意思') || ls.includes('مطلب')) enSlug = 'what-does-925-mean';
                else enSlug = '925-silver-calculator';
            }
            else if (ls.includes('900')) enSlug = '900-silver-calculator';
            else if (ls.includes('835')) enSlug = '835-silver-calculator';
            else if (ls.includes('800')) enSlug = '800-silver-calculator';

            // 3. Specific Object Patterns
            else if (ls.includes('ring') || ls.includes('anillo') || ls.includes('bague') || ls.includes('yuzuk') || ls.includes('кольц') || ls.includes('戒指') || ls.includes('انگوٹھی') || ls.includes('خاتم')) enSlug = 'silver-ring-value';
            else if (ls.includes('necklace') || ls.includes('collar') || ls.includes('collier') || ls.includes('kolye') || ls.includes('ожерель') || ls.includes('项链') || ls.includes('ہار') || ls.includes('قلادة')) enSlug = 'silver-necklace-value';
            else if (ls.includes('bracelet') || ls.includes('pulsera') || ls.includes('bilezik') || ls.includes('браслет') || ls.includes('手镯') || ls.includes('کڑا') || ls.includes('سوار')) enSlug = 'silver-bracelet-value';
            else if (ls.includes('chain') || ls.includes('cadena') || ls.includes('chaine') || ls.includes('zincir') || ls.includes('цепоч') || ls.includes('链') || ls.includes('زنجیر') || ls.includes('سلسلة')) enSlug = 'silver-chain-value';
            else if (ls.includes('tray') || ls.includes('bandeja') || ls.includes('tepsi') || ls.includes('поднос') || ls.includes('托盘') || ls.includes('ٹرے') || ls.includes('صينية')) enSlug = 'silver-tray-value';
            else if (ls.includes('spoon') || ls.includes('cuchara') || ls.includes('cuillere') || ls.includes('kasik') || ls.includes('ложк') || ls.includes('汤匙') || ls.includes('چمچ') || ls.includes('ملعقة')) enSlug = 'silver-spoon-value';
            else if (ls.includes('fork') || ls.includes('tenedor') || ls.includes('fourchette') || ls.includes('catal') || ls.includes('вилк') || ls.includes('叉') || ls.includes('کانٹے') || ls.includes('شوكة')) enSlug = 'silver-fork-value';
            else if (ls.includes('knife') || ls.includes('cuchillo') || ls.includes('couteau') || ls.includes('bicak') || ls.includes('нож') || ls.includes('刀') || ls.includes('چاقو') || ls.includes('سكين')) enSlug = 'silver-knife-value';
            else if (ls.includes('plate') || ls.includes('plato') || ls.includes('assiette') || ls.includes('tabak') || ls.includes('тарелк') || ls.includes('板') || ls.includes('پلیٹ') || ls.includes('صحن')) enSlug = 'silver-plate-value';
            else if (ls.includes('cup') || ls.includes('copa') || ls.includes('coupe') || ls.includes('kupa') || ls.includes('куб') || ls.includes('杯') || ls.includes('کپ') || ls.includes('كأس')) enSlug = 'silver-cup-value';
            
            // 4. Specific Category Patterns
            else if (ls.includes('quarter') || ls.includes('cuarto') || ls.includes('quart') || ls.includes('ceyrek') || ls.includes('четверт')) enSlug = 'silver-quarter-calculator';
            else if (ls.includes('dime') || ls.includes('diez-centavos') || ls.includes('dix-cents') || ls.includes('десятицентов')) enSlug = 'silver-dime-calculator';
            else if (ls.includes('dollar') || ls.includes('dolar')) enSlug = 'silver-dollar-calculator';
            
            else if (ls.includes('canada') || ls.includes('canad')) enSlug = 'canadian-silver-coin-calculator';
            else if (ls.includes('bullion') || ls.includes('lingote') || ls.includes('lingot') || ls.includes('kulce') || ls.includes('слитк') || ls.includes('条') || ls.includes('بار') || ls.includes('سبائك')) {
                if (ls.includes('what') || ls.includes('que-es') || ls.includes('qu-est')) enSlug = 'what-is-silver-bullion';
                else enSlug = 'silver-bar-value-calculator';
            }
            else if (ls.includes('junk') || ls.includes('basura') || ls.includes('circulation') || ls.includes('мусорн') || ls.includes('废品') || ls.includes('کباڑ') || ls.includes('خردة')) {
                if (ls.includes('what') || ls.includes('que-es') || ls.includes('qu-est')) enSlug = 'what-is-junk-silver';
                else enSlug = 'junk-silver-calculator';
            }
            
            // 5. General Patterns (Lower Priority)
            else if (ls.includes('scrap') || ls.includes('ferraille') || ls.includes('desecho') || ls.includes('hurda') || ls.includes('лом') || ls.includes('废料') || ls.includes('ڈیسچو') || ls.includes('کباڑ') || ls.includes('خردة')) {
                if (ls.includes('what') || ls.includes('qu-est') || ls.includes('que-es') || ls.includes('nedir') || ls.includes('что-такое')) enSlug = 'what-is-silver-scrap';
                else enSlug = 'silver-scrap-calculator';
            }
            else if (ls.includes('sterling') || ls.includes('esterlina') || ls.includes('стерлинг') || ls.includes('سٹرلنگ')) {
                if (ls.includes('what') || ls.includes('qu-est') || ls.includes('que-es') || ls.includes('nedir')) enSlug = 'what-is-sterling-silver';
                else enSlug = 'sterling-silver-calculator';
            }
            else if (ls.includes('coin') || ls.includes('moneda') || ls.includes('piece') || ls.includes('para') || ls.includes('монет') || ls.includes('银币') || ls.includes('سکے') || ls.includes('عملة')) enSlug = 'silver-coin-value-calculator';
            else if (ls.includes('jewelry') || ls.includes('joyeria') || ls.includes('bijoux') || ls.includes('taki') || ls.includes('украшен') || ls.includes('首饰') || ls.includes('زیورات') || ls.includes('مجوهرات')) enSlug = 'silver-jewelry-value-calculator';
            else if (ls.includes('price-per-gram') || ls.includes('por-gramo') || ls.includes('au-gramme') || ls.includes('gram-fiyati') || ls.includes('за-грамм') || ls.includes('每克') || ls.includes('فی-گرام') || ls.includes('سعر-الجرام')) enSlug = 'silver-price-per-gram';
            else if (ls.includes('price-per-ounce') || ls.includes('por-onza') || ls.includes('a-l-once') || ls.includes('ons-fiyati') || ls.includes('за-унцию') || ls.includes('每盎司') || ls.includes('فی-اونٹ') || ls.includes('سعر-الأوقية')) enSlug = 'silver-price-per-ounce';
            else if (ls.includes('hallmark') || ls.includes('sello') || ls.includes('poincon') || ls.includes('damga') || ls.includes('клейм')) enSlug = 'silver-hallmarks-guide';
            else if (ls.includes('purity') || ls.includes('pureza') || ls.includes('purete') || ls.includes('saflik') || ls.includes('чистот') || ls.includes('纯度') || ls.includes('پاکیزگی') || ls.includes('نقاء')) enSlug = 'silver-purity-chart';
            else if (ls.includes('sell') && (ls.includes('how') || ls.includes('como') || ls.includes('comment') || ls.includes('nasil') || ls.includes('как') || ls.includes('如何') || ls.includes('کیسے') || ls.includes('كيف'))) enSlug = 'how-to-sell-silver';
            else if (ls.includes('all-currencies') || ls.includes('todas-las-monedas') || ls.includes('toutes-les-devises') || ls.includes('tum-para') || ls.includes('всех-валютах') || ls.includes('所有货币') || ls.includes('تمام-کرنسیوں') || ls.includes('جميع-العملات')) enSlug = 'silver-price-all-currencies';
            else if (ls.includes('profit') || ls.includes('ganancia') || ls.includes('kar') || ls.includes('прибыль') || ls.includes('أرباح')) enSlug = 'silver-profit-calculator';
            else if (ls.includes('sell-or-hold') || ls.includes('vender-o-mantener') || ls.includes('vendre-ou-garder') || ls.includes('sat-veya-tut') || ls.includes('продавать-или-держать') || ls.includes('بيع-أو-احتفظ')) enSlug = 'silver-sell-or-hold';
            else if (ls.includes('identify') || ls.includes('identificar') || ls.includes('identifier') || ls.includes('tanimla') || ls.includes('идентифицировать') || ls.includes('تعرف')) enSlug = 'identify-silver';
            else if (ls.includes('weight-converter') || ls.includes('conversor-de-peso') || ls.includes('convertisseur-de-poids') || ls.includes('donusturucu') || ls.includes('конвертер-веса') || ls.includes('重量转换') || ls.includes('وزن-کنورٹر') || ls.includes('محول-الوزن')) enSlug = 'silver-weight-converter';
            else if (ls.includes('troy-ounce') || ls.includes('onza-troy') || ls.includes('once-troy') || ls.includes('тройская-унция')) enSlug = 'what-is-troy-ounce';
            else if (ls.includes('sona-chandi')) enSlug = 'sona-chandi-calculator';
            else if (ls.includes('batch') || ls.includes('lote') || ls.includes('lot') || ls.includes('دفعة')) enSlug = 'silver-batch-calculator';
            else if (ls.includes('silverware') || ls.includes('cubiertos') || ls.includes('argenterie') || ls.includes('esya') || ls.includes('столового') || ls.includes('银器') || ls.includes('فضيات')) enSlug = 'silverware-value-calculator';
            else if (ls.includes('melt') || ls.includes('fusion') || ls.includes('fonte') || ls.includes('erime') || ls.includes('расплав') || ls.includes('熔') || ls.includes('پگھلنے') || ls.includes('صهر')) {
                if (ls.includes('what') || ls.includes('que-es') || ls.includes('qu-est')) enSlug = 'what-is-silver-melt-value';
                else enSlug = 'silver-melt-value-calculator';
            }
        }

        if (enSlug) {
            slugMap[enSlug][lang] = localSlug;
            console.log(`  MAPPED [${lang}] ${localSlug} -> ${enSlug}`);
        } else {
            console.log(`  STILL UNMAPPED: [${lang}] ${localSlug}`);
        }
    }
}

fs.writeFileSync(path.join(ROOT, 'master-slugs.json'), JSON.stringify(slugMap, null, 2));
console.log('\nmaster-slugs.json saved.');

// Coverage
let total = 0, mapped = 0;
for (const [en, trans] of Object.entries(slugMap)) {
    for (const l of langs) { total++; if (trans[l]) mapped++; }
}
console.log(`Coverage: ${mapped}/${total} (${Math.round(mapped/total*100)}%)`);
