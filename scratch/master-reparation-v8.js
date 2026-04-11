const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';

// --- CLEAN CONTENT MATRIX ---
const CLEAN_BODY = {
  hi: {
    howItWorks: "यह कैसे काम करता है — 3 सरल चरण",
    understandValue: "चांदी का मूल्य समझना",
    calcFormula: "पिघल मूल्य की गणना कैसे की जाती है",
    steps: [
      { t: "अपनी चांदी तौलें", p: "एक तराजू का उपयोग करके अपनी चांदी को तौलें।" },
      { t: "शुद्धता चुनें", p: "शुद्धता चुनें: .999, .925, .900 या कस्टम।" },
      { t: "मूल्य प्राप्त करें", p: "लाइव स्पॉट मूल्य का उपयोग करके मूल्य की गणना होती है।" }
    ]
  },
  ur: {
    howItWorks: "\u06cc\u06c1 \u06a9\u06cc\u0633\u06d2 \u06a9\u0627\u0645 \u06a9\u0631\u062a\u0627 \u06c1\u06d2 \u2014 3 \u0622\u0633\u0627\u0646 \u0645\u0631\u0627\u062d\u0644",
    understandValue: "\u0686\u0627\u0646\u062f\u06cc \u06a9\u06cc \u0642\u06cc\u0645\u062a \u0633\u0645\u062c\u06be\u0646\u0627",
    calcFormula: "\u067e\u06af\u06be\u0644 \u0642\u06cc\u0645\u062a \u06a9\u06cc\u0633\u06d2 \u0645\u0639\u0644\u0648\u0645 \u06a9\u0631\u06cc\u06ba",
    steps: [
      { t: "اپنی چاندی تولیں", p: "\u062a\u0631\u0627\u0632\u0648 \u0633\u06d2 \u0627\u067e\u0646\u06cc \u0686\u0627\u0646\u062f\u06cc \u062a\u0648\u0644\u06cc\u06ba\u06d2\u06d4" },
      { t: "خالصیت منتخب کریں", p: "\u062e\u0627\u0644\u0635\u06cc\u062a \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba: .999\u060c .925\u060c .900 \u06cc\u0627 \u06a9\u0633\u067e\u0645\u06d2\u06d4" },
      { t: "فوری قیمت حاصل کریں", p: "\u0644\u0627\u0626\u06cc\u0648 \u0633\u067e\u0627\u0672 \u0642\u06cc\u0645\u062a \u0633\u06d2 \u062d\u0633\u0627\u0628 \u06c1\u0648\u062a\u0627 \u06c1\u06d2\u06d4" }
    ]
  },
  ar: {
    howItWorks: "\u0643\u064a\u0641 \u064a\u0639\u0645\u0644 \u2014 3 \u062e\u0637\u0648\u0627\u062a \u0628\u0633\u064a\u0637\u0629",
    understandValue: "\u0641\u0647\u0645 \u0642\u064a\u0645\u0629 \u0627\u0644\u0641\u0636\u0629",
    calcFormula: "\u0643\u064a\u0641 \u064a\u062a\u0645 \u062d\u0633\u0627\u0628 \u0642\u064a\u0645\u0629 \u0627\u0644\u0627\u0646\u0635\u0647\u0627\u0631",
    steps: [
      { t: "زن فضتك", p: "\u0627\u0633\u062a\u062e\u062f\u0645 \u0645\u064a\u0632\u0627\u0646\u0627\u064b \u0644\u0648\u0632\u0646 \u0642\u063f\u0639\u0629 \u0627\u0644\u0641\u0636\u0629." },
      { t: "اختر النقاء", p: "\u0627\u062e\u062a\u0631 \u0627\u0644\u0646\u0642\u0627\u0621: .999 \u0623\u0648 .925 \u0623\u0648 .900 \u0623\u0648 \u0645\u062e\u0635\u0635." },
      { t: "احصل على القيمة", p: "\u064a\u062a\u0645 \u0627\u0644\u062d\u0633\u0627\u0628 \u0628\u0627\u0644\u0633\u0631\u0639 \u0627\u0644\u0641\u0648\u0631\u064a \u0627\u0644\u0645\u0628\u0627\u0634\u0631." }
    ]
  }
};

const LABELS = {
  ar: { Home: "الرئيسية", Calculators: "الحاسبات", Purity: "النقاء", Pricing: "الأسعار", Tools: "الأدوات", Guides: "الأدلة" },
  de: { Home: "Startseite", Calculators: "Rechner", Purity: "Reinheit", Pricing: "Preise", Tools: "Werkzeuge", Guides: "Ratgeber" },
  es: { Home: "Inicio", Calculators: "Calculadoras", Purity: "Pureza", Pricing: "Precios", Tools: "Herramientas", Guides: "Gu\u00edas" },
  fr: { Home: "Accueil", Calculators: "Calculateurs", Purity: "Puret\u00e9", Pricing: "Prix", Tools: "Outils", Guides: "Guides" },
  hi: { Home: "\u0939\u094b\u092e", Calculators: "\u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091f\u0930", Purity: "\u0936\u0941\u0926\u094d\u0927\u0924\u093e", Pricing: "\u092e\u0942\u0932\u094d\u092f \u0928\u093f\u0930\u094d\u0927\u093e\u0930\u0923", Tools: "\u0909\u092a\u0915\u0930\u0923", Guides: "\u0917\u093e\u0907\u0921" },
  it: { Home: "Home", Calculators: "Calcolatori", Purity: "Purezza", Pricing: "Prezzi", Tools: "Strumenti", Guides: "Guide" },
  pt: { Home: "In\u00edcio", Calculators: "Calculadoras", Purity: "Pureza", Pricing: "Pre\u00e7os", Tools: "Ferramentas", Guides: "Guias" },
  ru: { Home: "\u0413\u043b\u0430\u0432\u043d\u0430\u044f", Calculators: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440\u044b", Purity: "\u0427\u0438\u0441\u0442\u043e\u0442\u0430", Pricing: "\u0426\u0435\u043d\u044b", Tools: "\u0418\u043d\u0441\u0442\u0440\u0443\u043e\u043c\u0435\u043d\u0442\u044b", Guides: "\u0420\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u0430" },
  tr: { Home: "Ana Sayfa", Calculators: "Hesap makineleri", Purity: "Safl\u0131k", Pricing: "Fiyatland\u0131rma", Tools: "Ara\u00e7lar", Guides: "K\u0131lavuzlar" },
  ur: { Home: "\u06c1\u0648\u0645", Calculators: "\u06a9\u06cc\u0644\u06a9\u0648\u0644\u06cc\u067e\u0631", Purity: "\u067e\u0627\u06a9\u06cc\u0632\u06af\u06cc", Pricing: "\u0642\u06cc\u0645\u062a\u06cc\u06ba", Tools: "\u0627\u0648\u0632\u0627\u0631", Guides: "\u0631\u06c1\u0646\u0645\u0627" },
  zh: { Home: "\u9996\u9875", Calculators: "\u8ba1\u7b97\u5668", Purity: "\u7eaf\u5ea6", Pricing: "\u5b9a\u4ef7", Tools: "\u5de5\u5177", Guides: "\u6307\u5357" }
};

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/[^\x00-\x7F]/g, c => "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4));
}

const ALL_LANGS = Object.keys(LABELS);

ALL_LANGS.forEach(lang => {
  const dirPath = path.join(rootDir, lang);
  if (!fs.existsSync(dirPath)) return;

  const slugs = {};
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. LEARN SLUGS (Persistence)
    const match = content.match(/hreflang="en" href="https:\/\/scrapsilvercalculater\.com\/([^/"]+)\/?"/);
    if (match) slugs[match[1]] = file.replace('.html', '');

    // 2. SURGERY: REPAIR MOJIBAKE BODY (HI, UR, AR)
    if (CLEAN_BODY[lang]) {
      const b = CLEAN_BODY[lang];
      // Fix "How it works" title
      content = content.replace(/<h2 class="section-title">.*?<\/h2>/, `<h2 class="section-title">${b.howItWorks}</h2>`);
      // Fix "Understanding..." title
      content = content.replace(/<h2>.*?<\/h2>/, `<h2>${b.understandValue}</h2>`);
      // Fix 3 Steps
      let stepIdx = 0;
      content = content.replace(/<div class="step-card">.*?<\/div>/gs, (m) => {
        if (stepIdx < 3) {
          const s = b.steps[stepIdx++];
          return `<div class="step-card"><div class="step-number">${stepIdx}</div><h4>${s.t}</h4><p>${s.p}</p></div>`;
        }
        return m;
      });
      // Fix "How melt value calculated" H3
      content = content.replace(/<h3>.*?<\/h3>/, `<h3>${b.calcFormula}</h3>`);
    }

    // 3. CLEAN UP HEADER/DICTIONARY
    content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\};\s*<\/script>/gs, '');
    const dict = Object.assign({ slugs }, LABELS[lang]);
    const injection = `<script>window.MenuTranslations = ${safeStringify(dict)};</script>`;
    content = content.replace('<head>', `<head>\n  ${injection}`);

    // 4. FIX DOUBLE LABELS
    const codes = ["EN", "ES", "FR", "DE", "PT", "HI", "UR", "AR", "TR", "IT", "ZH", "RU"];
    codes.forEach(code => {
      const doubled = new RegExp(`>\\s*${code}\\s+${code}\\s*<`, 'g');
      content = content.replace(doubled, `>${code}<`);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Repaired and Synced ${lang} folder (${files.length} files)`);
});

// ROOT FIX
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
