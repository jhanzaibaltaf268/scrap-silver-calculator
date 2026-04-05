const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const TARGET_LANG = 'fr';
const OUT_DIR = path.join(__dirname, TARGET_LANG);

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Bulk translation using Google Translate free endpoint
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
       // Split by newline
       const results = fullTranslation.split('\n').map(s => s.trim());
       // Sometimes Google loses a newline, so we just pad it if needed
       while (results.length < texts.length) results.push(texts[results.length]);
       return results;
    }
  } catch (err) {
    console.error('Translation error:', err.message);
  }
  return texts; // fallback to original
}

async function processFile(filename) {
  console.log(`Processing ${filename}...`);
  const content = fs.readFileSync(filename, 'utf-8');
  const $ = cheerio.load(content);
  
  $('html').attr('lang', TARGET_LANG);

  // Extract translation text from common tags
  const textElements = $('title, h1, h2, h3, h4, p, li, label, .result-label, th, td, caption, option, .form-label, .category-card');
  
  const elementsToTranslate = [];
  
  textElements.each((i, el) => {
    $(el).contents().each((j, child) => {
      // Only translate raw text nodes
      if (child.type === 'text') {
        const text = child.data.trim();
        if (text && /[a-zA-Z]/.test(text) && text.length > 1) {
           elementsToTranslate.push({ node: child, original: child.data, trim: text });
        }
      }
    });
  });

  // Meta description
  const metaDesc = $('meta[name="description"]');
  let metaTrim = '';
  if (metaDesc.length && metaDesc.attr('content')) {
    metaTrim = metaDesc.attr('content').trim();
    elementsToTranslate.push({ node: metaDesc, original: metaDesc.attr('content'), trim: metaTrim, isMeta: true });
  }

  // Chunk into 100 lines at a time
  const chunkSize = 100;
  for (let i = 0; i < elementsToTranslate.length; i += chunkSize) {
    const chunk = elementsToTranslate.slice(i, i + chunkSize);
    const texts = chunk.map(item => item.trim);
    
    const translatedTexts = await translateBatch(texts, TARGET_LANG);
    
    chunk.forEach((item, index) => {
      let trans = translatedTexts[index];
      if (trans) {
        if (item.isMeta) {
          item.node.attr('content', trans);
        } else {
          item.node.data = item.original.replace(item.trim, trans);
        }
      }
    });
    
    // Rate limit buffer
    await new Promise(r => setTimeout(r, 500));
  }

  // Fix breadcrumb translations inside inline scripts
  $('script').each((i, el) => {
    let code = $(el).html();
    if (code && code.includes('SiteComponents.renderBreadcrumb')) {
      // Very basic regex to replace the hardcoded "Home" label
      code = code.replace(/{label:\s*'Home'/g, `{label: window.MenuTranslations['Home'] || 'Accueil'`);
      $(el).html(code);
    }
  });

  // Generate MenuTranslations object for the footer/header
  // Inject the script just before </body>
  const langScript = `\n<script>\n  window.MenuTranslations = ${JSON.stringify(require('./js/generate-languages').fr || {})}; \n</script>\n`;
  $('body').append(langScript);

  fs.writeFileSync(path.join(OUT_DIR, filename), $.html());
  console.log(`✔ Saved ${TARGET_LANG}/${filename}`);
}

async function run() {
  const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'silver-scrap-calculator.html' && f !== 'graber.html');
  console.log(`Found ${files.length} files to process.`);
  for (const file of files) {
    await processFile(file);
  }
  console.log('All files translated directly to French!');
}

run().catch(console.error);
