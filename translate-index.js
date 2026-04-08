const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const TARGET_LANGS = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru'];

async function translateBatch(texts, targetLang, retries = 3) {
  if (!texts || texts.length === 0) return [];
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const combined = texts.join('\n');
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: `q=${encodeURIComponent(combined)}`
      });
      const textResponse = await res.text();
      try {
        const json = JSON.parse(textResponse);
        if (json && json[0]) {
           const fullTranslation = json[0].map(item => item[0] || '').join('');
           const results = fullTranslation.split('\n').map(s => s.trim());
           while (results.length < texts.length) results.push(texts[results.length]);
           return results.slice(0, texts.length);
        }
      } catch (e) {
        if (textResponse.includes('<!DOCTYPE')) {
          console.warn(`Attempt ${attempt + 1}: Rate limited (HTML response). Retrying in 5 seconds...`);
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }
        throw e;
      }
    } catch (err) {
      console.error(`Attempt ${attempt + 1} failed for ${targetLang}:`, err.message);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  return texts; 
}

async function processIndex(lang) {
  console.log(`Processing index for ${lang.toUpperCase()}...`);
  const content = fs.readFileSync('index', 'utf-8');
  const $ = cheerio.load(content);
  
  $('html').attr('lang', lang);
  
  // Update hreflang references to point to absolute/correct paths if needed
  // For now just keep them as is in the base, but set active lang
  $('.lang-btn').removeClass('active');
  $(`.lang-btn[href^="${lang}/"]`).addClass('active');

  const textNodes = [];
  $('title, h1, h2, h3, h4, p, li, label, .result-label, th, td, .form-label, .category-card p, .category-card h3, .hero-subtitle, .result-detail, .section-badge, .section-subtitle, .trust-item').each((i, el) => {
    $(el).contents().each((j, child) => {
      if (child.type === 'text') {
        const text = child.data.trim();
        if (text && /[a-zA-Z]/.test(text) && text.length > 1) {
           textNodes.push({ node: child, original: child.data, trim: text });
        }
      }
    });
  });

  const metaDesc = $('meta[name="description"]');
  if (metaDesc.length && metaDesc.attr('content')) {
    textNodes.push({ node: metaDesc, isMeta: true, original: metaDesc.attr('content'), trim: metaDesc.attr('content').trim() });
  }

  const textsToTranslate = textNodes.map(n => n.trim);
  const translated = [];
  
  const chunkSize = 50;
  for (let i = 0; i < textsToTranslate.length; i += chunkSize) {
    const chunk = textsToTranslate.slice(i, i + chunkSize);
    const trans = await translateBatch(chunk, lang);
    translated.push(...trans);
    await new Promise(r => setTimeout(r, 1500));
  }

  textNodes.forEach((item, idx) => {
    const trans = translated[idx];
    if (trans) {
      if (item.isMeta) {
        item.node.attr('content', trans);
      } else {
        item.node.data = item.original.replace(item.trim, trans);
      }
    }
  });

  // Fix internal links to target subfolder
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#') && href !== 'index') {
       // All our base links are in the root. In a subfolder, we need to handle slug mapping.
       // However, for index in subfolders, the links to other calculators should point to the translated slugs.
       // This is complex. For now, let's at least point them to the root or find the translated slug if possible.
       // Actually, mass-translate.js handles the slug mapping for index.
       // So we just need TO TRANSLATE the text. The final link fixing can be done by running mass-translate again.
    }
  });

  // Fix relative assets
  $('link[href^="css/"]').attr('href', (i, val) => '../' + val);
  $('script[src^="js/"]').attr('src', (i, val) => '../' + val);

  const outPath = path.join(__dirname, lang, 'index');
  fs.writeFileSync(outPath, $.html());
  console.log(`✅ Saved ${lang}/index`);
}

async function run() {
  for (const lang of TARGET_LANGS) {
    await processIndex(lang);
  }
}

run().catch(console.error);
