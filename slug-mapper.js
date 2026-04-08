const fs = require('fs');
const path = require('path');

const frDict = {
  "silver-scrap-calculator": "calculateur-de-ferraille-d-argent",
  "gold-and-silver-calculator": "calculateur-or-et-argent",
  "silver-melt-value-calculator": "calculateur-de-valeur-de-fonte",
  "sterling-silver-calculator": "calculateur-d-argent-sterling",
  "junk-silver-calculator": "calculateur-d-argent-de-circulation",
  "silver-coin-value-calculator": "valeur-des-pieces-d-argent",
  "silver-bar-value-calculator": "valeur-des-lingots-d-argent",
  "silver-jewelry-value-calculator": "valeur-des-bijoux-en-argent",
  "silverware-value-calculator": "valeur-de-l-argenterie",
  "999-silver-calculator": "argent-fin-999",
  "958-silver-calculator": "argent-britannia-958",
  "925-silver-calculator": "argent-sterling-925",
  "900-silver-calculator": "argent-de-piece-900",
  "835-silver-calculator": "argent-835",
  "800-silver-calculator": "argent-800",
  "silver-purity-chart": "tableau-de-purete-de-l-argent",
  "silver-price-per-gram": "prix-de-l-argent-au-gramme",
  "silver-price-per-ounce": "prix-de-l-argent-a-l-once",
  "silver-price-all-currencies": "prix-dans-toutes-les-devises",
  "1-10oz-silver-value": "valeur-de-l-argent-1-10oz",
  "1oz-silver-value": "valeur-de-l-argent-1oz",
  "2oz-silver-value": "valeur-de-l-argent-2oz",
  "5oz-silver-value": "valeur-de-l-argent-5oz",
  "10oz-silver-value": "valeur-de-l-argent-10oz",
  "100oz-silver-value": "valeur-de-l-argent-100oz",
  "1kg-silver-value": "valeur-de-l-argent-1kg",
  "silver-profit-calculator": "calculateur-de-profit-d-argent",
  "silver-batch-calculator": "calculateur-par-lots",
  "sona-chandi-calculator": "calculateur-sona-chandi",
  "face-value-silver-calculator": "calculateur-de-valeur-nominale",
  "silver-weight-converter": "convertisseur-de-poids",
  "pennyweight-calculator": "calculateur-pennyweight-dwt",
  "tola-calculator": "calculateur-tola",
  "silver-sell-or-hold": "analyse-vendre-ou-garder",
  "identify-silver": "identificateur-d-argent",
  "how-to-use-silver-calculators": "comment-utiliser-nos-calculateurs",
  "what-is-silver-scrap": "qu-est-ce-que-la-ferraille-d-argent",
  "what-is-silver-melt-value": "qu-est-ce-que-la-valeur-de-fonte",
  "what-is-junk-silver": "qu-est-ce-que-l-argent-de-circulation",
  "what-is-troy-ounce": "qu-est-ce-qu-une-once-troy",
  "what-is-silver-bullion": "qu-est-ce-qu-un-lingot-d-argent",
  "how-silver-prices-work": "comment-fonctionnent-les-prix-de-l-argent",
  "silver-hallmarks-guide": "guide-des-poincons-d-argent",
  "what-does-925-mean": "que-signifie-925",
  "what-is-sterling-silver": "qu-est-ce-que-l-argent-sterling",
  "how-to-sell-silver": "comment-vendre-de-l-argent"
};

const tDir = path.join(__dirname, 'fr');

// 1. Rename files in directory
if (fs.existsSync(tDir)) {
  const files = fs.readdirSync(tDir);
  for (const file of files) {
    if (frDict[file]) {
      const oldPath = path.join(tDir, file);
      const newPath = path.join(tDir, frDict[file]);
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} -> ${frDict[file]}`);
    }
  }

  // 2. Update intra-page links
  const updatedFiles = fs.readdirSync(tDir);
  for (const file of updatedFiles) {
    if (!file.endsWith('.html')) continue;
    const filePath = path.join(tDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace hrefs
    for (const [eng, loc] of Object.entries(frDict)) {
      const regex1 = new RegExp(`href="${eng}"`, 'g');
      content = content.replace(regex1, `href="${loc}"`);
      
      const regex2 = new RegExp(`href="\\.\\.\\/${eng}"`, 'g');
      content = content.replace(regex2, `href="../${loc}"`);
      
      const regex3 = new RegExp(`href='${eng}'`, 'g');
      content = content.replace(regex3, `href='${loc}'`);
      
      const regex4 = new RegExp(`href='\\.\\.\\/${eng}'`, 'g');
      content = content.replace(regex4, `href='../${loc}'`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
}
console.log('Finished updating files and internal links in /fr/ folder.');
