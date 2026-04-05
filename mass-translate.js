const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const TARGET_LANGS = ['pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];
const baseFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'graber.html');

const englishUIKeys = [
  "Home", "Calculators", "Silver Scrap Calculator", "Gold & Silver Calculator", "Silver Melt Value", "Sterling Silver Calculator", "Junk Silver Calculator", "Silver Coin Value", "Silver Bar Value", "Silver Jewelry Value", "Silverware Value", "Purity", "999 Fine Silver", "958 Britannia Silver", "925 Sterling Silver", "900 Coin Silver", "835 Silver", "800 Silver", "Silver Purity Chart", "Pricing", "Silver Spot Price Today", "925 Sterling Price / Gram", "Silver Price Per Gram", "Silver Price Per Ounce", "Price in All Currencies", "1/10oz Silver Value", "1oz Silver Value", "2oz Silver Value", "5oz Silver Value", "10oz Silver Value", "100oz Silver Value", "1kg Silver Value", "Tools", "Silver Profit Calculator", "Batch Calculator", "Sona Chandi Calculator", "Face Value Calculator", "Weight Converter", "Pennyweight (DWT) Calc", "Tola Calculator", "Sell or Hold Analysis", "Silver Identifier", "Guides", "How to Use Our Calculators", "What Is Silver Scrap?", "What Is Melt Value?", "What Is Junk Silver?", "What Is a Troy Ounce?", "What Is Silver Bullion?", "How Silver Prices Work", "Silver Hallmarks Guide", "What Does 925 Mean?", "What Is Sterling Silver?", "How to Sell Silver", "Scrap Silver", "Gold & Silver", "Silver Profit", "Melt Value", "Junk Silver", "Silver Coins", "Silver Dollar", "Silver Quarter", "Silver Dime", "Jewelry Value", "925 Sterling", "Purity Chart", "How to Use Calculators", "Sona Chandi Calc", "Face Value Calc", "Sell or Hold", "About", "Privacy", "Terms", "All rights reserved.", "Prices are for informational purposes only.", "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly."
];

function slugify(text) {
  let t = text.trim().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}\-]/gu, '')
    .replace(/-+/g, '-');
  return t || 'page-' + Math.floor(Math.random()*1000); 
}

async function translateBatch(texts, targetLang) {
  if (!texts || texts.length === 0) return [];
  try {
    const combined = texts.join('\n');
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
       body: `q=${encodeURIComponent(combined)}`
    });
    const json = await res.json();
    if (json && json[0]) {
       const fullTranslation = json[0].map(item => item[0] || '').join('');
       const results = fullTranslation.split('\n').map(s => s.trim());
       while (results.length < texts.length) results.push(texts[results.length]);
       return results.slice(0, texts.length);
    }
  } catch (err) {
    console.error(`Translation error for ${targetLang}:`, err.message);
  }
  return texts; 
}

async function processLanguage(lang) {
  console.log(`\n=== Starting translation for language: ${lang.toUpperCase()} ===`);
  const outDir = path.join(__dirname, lang);
  if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, { recursive: true }); }
  
  const textSet = new Set();
  
  // 1. Add all UI Keys
  englishUIKeys.forEach(k => textSet.add(k));
  
  // 2. Add slugs-as-titles
  const slugTitlesMap = new Map();
  baseFiles.forEach(slug => {
    let title = slug.replace('.html', '').replace(/-/g, ' ');
    slugTitlesMap.set(slug, title);
    textSet.add(title);
  });
  
  // 3. Extract text nodes
  console.log('Extracting text from all 60 files...');
  const fileParsedItems = {}; 
  
  for (const file of baseFiles) {
    const content = fs.readFileSync(path.join(__dirname, file), 'utf-8');
    const $ = cheerio.load(content);
    const nodes = [];
    
    $('title, h1, h2, h3, h4, p, li, label, .result-label, th, td, caption, option, .form-label, .category-card').each((i, el) => {
      $(el).contents().each((j, child) => {
        if (child.type === 'text') {
          const text = child.data.trim();
          if (text && /[a-zA-Z]/.test(text) && text.length > 1) {
             nodes.push({ node: child, original: child.data, trim: text });
             textSet.add(text);
          }
        }
      });
    });

    const metaDesc = $('meta[name="description"]');
    if (metaDesc.length && metaDesc.attr('content')) {
      const metaTrim = metaDesc.attr('content').trim();
      nodes.push({ node: metaDesc, isMeta: true, original: metaDesc.attr('content'), trim: metaTrim });
      textSet.add(metaTrim);
    }
    
    fileParsedItems[file] = { $, nodes };
  }
  
  const textsArr = Array.from(textSet);
  console.log(`Found ${textsArr.length} unique text strings to translate.`);
  
  // 4. Batch translate
  const translationMap = new Map();
  const chunkSize = 100;
  for (let i = 0; i < textsArr.length; i += chunkSize) {
    const chunk = textsArr.slice(i, i + chunkSize);
    console.log(`Translating chunk ${Math.floor(i/chunkSize)+1}/${Math.ceil(textsArr.length/chunkSize)}...`);
    const translated = await translateBatch(chunk, lang);
    chunk.forEach((txt, idx) => {
      translationMap.set(txt, translated[idx] || txt);
    });
    await new Promise(r => setTimeout(r, 800));
  }
  
  // 5. Build Slugs map
  const langSlugMap = {};
  baseFiles.forEach(slug => {
    const engTitle = slugTitlesMap.get(slug);
    const translatedTitle = translationMap.get(engTitle) || engTitle;
    langSlugMap[slug] = slugify(translatedTitle) + '.html';
  });
  
  // 6. Build window.MenuTranslations dictionary
  const menuTranslations = { slugs: langSlugMap };
  englishUIKeys.forEach(k => {
    menuTranslations[k] = translationMap.get(k) || k;
  });
  const jsInjection = `window.MenuTranslations = ${JSON.stringify(menuTranslations)};`;
  const jsScriptBlock = `<script>\n  ${jsInjection}\n</script>\n</body>`;
  
  // 7. Output files
  for (const file of baseFiles) {
    const { $, nodes } = fileParsedItems[file];
    $('html').attr('lang', lang);
    nodes.forEach(item => {
      const trans = translationMap.get(item.trim);
      if (trans) {
        if (item.isMeta) {
          item.node.attr('content', trans);
        } else {
          item.node.data = item.original.replace(item.trim, trans);
        }
      }
    });
    
    $('link[href^="css/"]').attr('href', (i, val) => '../' + val);
    $('script[src^="js/"]').attr('src', (i, val) => '../' + val);
    
    $('script').each((i, el) => {
      let code = $(el).html();
      if (code && code.includes('SiteComponents.renderBreadcrumb')) {
        code = code.replace(/{label:\s*'Home'/g, `{label: window.MenuTranslations['Home'] || '${menuTranslations['Home']}'`);
        $(el).html(code);
      }
    });
    
    let outputHtml = $.html();
    
    baseFiles.forEach(slug => {
      const tSlug = langSlugMap[slug];
      outputHtml = outputHtml.split(`href="${slug}"`).join(`href="${tSlug}"`);
      outputHtml = outputHtml.split(`href="./${slug}"`).join(`href="${tSlug}"`);
    });
    
    outputHtml = outputHtml.replace(/window\.MenuTranslations\s*=\s*\{.*?\}\s*;/gs, '');
    outputHtml = outputHtml.replace(/window\.MenuTranslations\s*=\s*\{\}\s*;/g, '');
    outputHtml = outputHtml.replace('</body>', jsScriptBlock);
    
    const translatedFileName = langSlugMap[file];
    fs.writeFileSync(path.join(outDir, translatedFileName), outputHtml);
  }
  
  // 8. Fix existing index.html
  const indexPath = path.join(outDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf-8');
    baseFiles.forEach(slug => {
      const tSlug = langSlugMap[slug];
      indexHtml = indexHtml.split(`href="../${slug}"`).join(`href="${tSlug}"`);
      indexHtml = indexHtml.split(`href="../${slug}/"`).join(`href="${tSlug}"`);
    });
    indexHtml = indexHtml.replace(/window\.MenuTranslations\s*=\s*\{.*?\}\s*;/gs, '');
    indexHtml = indexHtml.replace(/window\.MenuTranslations\s*=\s*\{\}\s*;/g, '');
    indexHtml = indexHtml.replace('</body>', jsScriptBlock);
    fs.writeFileSync(indexPath, indexHtml);
  }
  
  console.log(`✅ Finished ${lang.toUpperCase()}! Generated ${baseFiles.length} translated calculators + updated index.html`);
}

async function runAll() {
  for (const lang of TARGET_LANGS) {
    await processLanguage(lang);
  }
  console.log('\n🎉 All languages fully processed!');
}

runAll().catch(console.error);
