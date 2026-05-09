const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const langFolders = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

// Base English files to map
const baseFiles = [
  "1-10oz-silver-value", "100oz-silver-value", "10oz-silver-value", "1kg-silver-value", "1oz-silver-value",
  "2oz-silver-value", "5oz-silver-value", "800-silver-calculator", "835-silver-calculator", "900-silver-calculator",
  "925-silver-calculator", "925-sterling-silver-price-per-gram", "958-silver-calculator", "999-silver-calculator",
  "canadian-silver-coin-calculator", "face-value-silver-calculator", "gold-and-silver-calculator", "how-silver-prices-work",
  "how-to-sell-silver", "how-to-use-silver-calculators", "identify-silver", "junk-silver-calculator", "pennyweight-calculator",
  "silver-bar-value-calculator", "silver-batch-calculator", "silver-bracelet-value", "silver-chain-value", "silver-coin-value-calculator",
  "silver-cup-value", "silver-dime-calculator", "silver-dollar-calculator", "silver-fork-value", "silver-hallmarks-guide",
  "silver-jewelry-value-calculator", "silver-knife-value", "silver-melt-value-calculator", "silver-necklace-value",
  "silver-ring-value", "silver-scrap-calculator", "silver-sell-or-hold", "silver-spoon-value", "silver-tray-value",
  "silver-weight-converter", "silverware-value-calculator", "sona-chandi-calculator", "sterling-silver-calculator",
  "tola-calculator", "what-does-925-mean", "what-is-junk-silver", "what-is-silver-bullion", "what-is-silver-melt-value",
  "what-is-silver-scrap", "what-is-sterling-silver", "what-is-troy-ounce", "silver-price-all-currencies", "silver-price-per-gram",
  "silver-price-per-ounce", "silver-profit-calculator", "silver-purity-chart", "silver-quarter-calculator", "silver-plate-value", "silver-necklace-value"
];

const masterMap = {};

langFolders.forEach(lang => {
  const dir = path.join(rootDir, lang);
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  masterMap[lang] = {};
  
  // We need a way to match the localized file to the English base.
  // We can do this by reading the file and looking for markers or by comparing against the old-gen data.
  // For now, let's just try to extract from old-gen.js if possible, or use a heuristic.
});

// For speed, I'll use the data I can see in old-gen.js (I'll extract it using a script)
fs.writeFileSync('slug-extractor.js', `
const fs = require('fs');
const content = fs.readFileSync('old-gen.js', 'utf8');
const langSlugs = {};
const langFolders = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

langFolders.forEach(lang => {
    // Look for something like "fr: {" or "fr:{"
    const regex = new RegExp(lang + ':\\\\s*{([^}]+)}', 'g');
    const match = regex.exec(content);
    if (match) {
        const inner = match[1];
        const slugs = {};
        const slugRegex = /"([^"]+)":\\\\s*"([^"]+)"/g;
        let slugMatch;
        while ((slugMatch = slugRegex.exec(inner)) !== null) {
            slugs[slugMatch[1]] = slugMatch[2];
        }
        langSlugs[lang] = slugs;
    }
});

console.log(JSON.stringify(langSlugs, null, 2));
`);
