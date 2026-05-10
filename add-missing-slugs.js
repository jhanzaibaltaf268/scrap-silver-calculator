const fs = require('fs');

// Read translations.js
let content = fs.readFileSync('js/translations.js', 'utf8');

// Define the missing slugs based on the Explore agent findings
const missingEntries = {
  "silver-bar-value-calculator": {
    "tr": "gümüş-çubuk-değeri-hesaplama"
  },
  "silver-jewelry-value-calculator": {
    "tr": "gümüş-mücevher-değeri-hesaplama",
    "it": "calcolatore-del-valore-dei-gioielli-in-argento"
  },
  "silverware-value-calculator": {
    "tr": "gümüş-eşya-değeri-hesaplama",
    "it": "calcolatore-del-valore-della-posateria-d-argento",
    "zh": "银器价值计算器"
  },
  "silver-coin-value-calculator": {
    "it": "calcolatore-del-valore-della-moneta-d-argento"
  },
  "identify-silver": {
    "tr": "gümüşü-tanımla",
    "zh": "识别白银"
  },
  "how-to-sell-silver": {
    "ar": "كيفية-بيع-الفضة",
    "de": "wie-verkauft-man-silber",
    "es": "cómo-vender-plata",
    "fr": "comment-vendre-de-l-argent",
    "hi": "चांदी-बेचने-का-तरीका",
    "it": "come-vendere-l-argento",
    "pt": "como-vender-prata",
    "tr": "gümüş-nasıl-satılır",
    "ur": "چاندی-بیچنے-کا-طریقہ",
    "zh": "如何出售白银"
  },
  "what-is-sterling-silver": {
    "ar": "ما-هي-الفضة-الإسترليني",
    "de": "was-ist-sterlingsilber",
    "hi": "स्टर्लिंग-चाँदी-क्या-है",
    "it": "che-cos-è-l-argento-sterling",
    "pt": "o-que-é-prata-esterlina",
    "tr": "gümüş-nedir",
    "ur": "سٹرلنگ-چاندی-کیا-ہے",
    "zh": "什么是纯银"
  },
  "silver-sell-or-hold": {
    "ar": "بيع-الفضة-أو-الاحتفاظ-بها",
    "de": "silber-verkaufen-oder-halten",
    "hi": "चांदी-बेचें-या-रखें",
    "it": "vendere-o-mantenere-l-argento",
    "zh": "卖出或持有白银"
  }
};

let updated = 0;

// For each missing entry
for (const [page, languages] of Object.entries(missingEntries)) {
  // Find the page entry in translations.js
  const pageRegex = new RegExp(`"${page}":\s*\{([^}]*)\}`);
  const match = content.match(pageRegex);
  
  if (match) {
    const pageContent = match[1];
    let newPageContent = pageContent;
    
    // For each missing language
    for (const [lang, slug] of Object.entries(languages)) {
      // Check if this language already exists
      if (!pageContent.includes(`"${lang}"`)) {
        // Add the slug
        newPageContent = newPageContent.replace(/\}(\s*,?\s*$)/m, `,\n    "${lang}": "${slug}"\n  `);
        updated++;
      }
    }
    
    // Replace in content
    content = content.replace(pageRegex, `"${page}": {${newPageContent}}`);
  }
}

// Write back
fs.writeFileSync('js/translations.js', content, 'utf8');
console.log(`Updated ${updated} slug entries in translations.js`);
