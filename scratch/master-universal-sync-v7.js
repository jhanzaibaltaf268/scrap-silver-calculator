const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';

// --- UNIVERSAL LABELS MATRIX ---
const LABELS = {
  ar: { 
    Home: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", 
    Calculators: "\u0627\u0644\u062d\u0627\u0633\u0628\u0627\u062a", 
    Purity: "\u0627\u0644\u0646\u0642\u0627\u0621", 
    Pricing: "\u0627\u0644\u0623\u0633\u0631\u0627\u0631", 
    Tools: "\u0627\u0644\u0623\u062f\u0648\u0627\u062a", 
    Guides: "\u0627\u0644\u0623\u062f\u0644\u0629" 
  },
  de: { Home: "Startseite", Calculators: "Rechner", Purity: "Reinheit", Pricing: "Preise", Tools: "Werkzeuge", Guides: "Ratgeber" },
  es: { Home: "Inicio", Calculators: "Calculadoras", Purity: "Pureza", Pricing: "Precios", Tools: "Herramientas", Guides: "Gu\u00edas" },
  fr: { Home: "Accueil", Calculators: "Calculateurs", Purity: "Puret\u00e9", Pricing: "Prix", Tools: "Outils", Guides: "Guides" },
  hi: { 
    Home: "\u0939\u094b\u092e", 
    Calculators: "\u0915\u0942\u0932\u0915\u0941\u0932\u0947\u091f\u093e\u0930", 
    Purity: "\u0936\u0941\u0926\u094d\u0927\u0924\u093e", 
    Pricing: "\u092e\u0942\u0932\u094d\u092f \u0928\u093f\u0930\u094d\u0927\u093e\u0930\u0923", 
    Tools: "\u0909\u092a\u0915\u0930\u0923", 
    Guides: "\u0917\u093e\u0907\u0921" 
  },
  it: { Home: "Home", Calculators: "Calcolatori", Purity: "Purezza", Pricing: "Prezzi", Tools: "Strumenti", Guides: "Guide" },
  pt: { Home: "In\u00edcio", Calculators: "Calculadoras", Purity: "Pureza", Pricing: "Pre\u00e7os", Tools: "Ferramentas", Guides: "Guias" },
  ru: { 
    Home: "\u0413\u043b\u0430\u0432\u043d\u0430\u044f", 
    Calculators: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440\u044b", 
    Purity: "\u0427\u0438\u0441\u0442\u043e\u0442\u0430", 
    Pricing: "\u0426\u0435\u043d\u044b", 
    Tools: "\u0418\u043d\u0441\u0442\u0440\u0443\u043e\u043c\u0435\u043d\u0442\u044b", 
    Guides: "\u0420\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u0430" 
  },
  tr: { Home: "Ana Sayfa", Calculators: "Hesap makineleri", Purity: "Safl\u0131k", Pricing: "Fiyatland\u0131rma", Tools: "Ara\u00e7lar", Guides: "K\u0131lavuzlar" },
  ur: { 
    Home: "\u06c1\u0648\u0645", 
    Calculators: "\u06a9\u06cc\u0644\u06a9\u0648\u0644\u06cc\u067e\u0631", 
    Purity: "\u067e\u0627\u06a9\u06cc\u0632\u06af\u06cc", 
    Pricing: "\u0642\u06cc\u0645\u062a\u06cc\u06ba", 
    Tools: "\u0627\u0648\u0632\u0627\u0631", 
    Guides: "\u0631\u06c1\u0646\u0645\u0627" 
  },
  zh: { Home: "\u9996\u9875", Calculators: "\u8ba1\u7b97\u5668", Purity: "\u7eaf\u5ea6", Pricing: "\u5b9a\u4ef7", Tools: "\u5de5\u5177", Guides: "\u6307\u5357" }
};

// Common Labels like "Silver Scrap Calculator" etc. can be added here if needed, 
// but Home/Calculators/Purity/Pricing/Tools/Guides are the most critical for Nav.

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/[^\x00-\x7F]/g, c => "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4));
}

const LANGS = Object.keys(LABELS);

LANGS.forEach(lang => {
  const dirPath = path.join(rootDir, lang);
  if (!fs.existsSync(dirPath)) return;

  const slugs = {};
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  // 1. LEARN SLUGS
  files.forEach(file => {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const match = content.match(/hreflang="en" href="https:\/\/scrapsilvercalculater\.com\/([^/"]+)\/?"/);
    if (match) {
      const enSlug = match[1];
      const translatedSlug = file.replace('.html', '');
      if (enSlug !== translatedSlug) {
        slugs[enSlug] = translatedSlug;
      }
    }
  });

  // 2. APPLY SYNC
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // A. Remove existing Translation scripts
    content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\};\s*<\/script>/gs, '');
    
    // B. Inject new ones in head
    const dict = Object.assign({ slugs }, LABELS[lang]);
    const injection = `<script>window.MenuTranslations = ${safeStringify(dict)};</script>`;
    content = content.replace('<head>', `<head>\n  ${injection}`);

    // C. Fix Double Labels in lang-switcher
    // Look for patterns like ">EN EN<" or ">EN  EN<"
    const codes = ["EN", "ES", "FR", "DE", "PT", "HI", "UR", "AR", "TR", "IT", "ZH", "RU"];
    codes.forEach(code => {
      const doubled = new RegExp(`>\\s*${code}\\s+${code}\\s*<`, 'g');
      content = content.replace(doubled, `>${code}<`);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Synced ${lang} folder (${files.length} files)`);
});

// 3. FIX ROOT FOLDER
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
rootFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const codes = ["EN", "ES", "FR", "DE", "PT", "HI", "UR", "AR", "TR", "IT", "ZH", "RU"];
  codes.forEach(code => {
    const doubled = new RegExp(`>\\s*${code}\\s+${code}\\s*<`, 'g');
    content = content.replace(doubled, `>${code}<`);
  });
  fs.writeFileSync(filePath, content, 'utf8');
});
console.log(`Synced root folder`);
