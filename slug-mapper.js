const fs = require('fs');
const path = require('path');

const frDict = {
  "silver-scrap-calculator.html": "calculateur-de-ferraille-d-argent.html",
  "gold-and-silver-calculator.html": "calculateur-or-et-argent.html",
  "silver-melt-value-calculator.html": "calculateur-de-valeur-de-fonte.html",
  "sterling-silver-calculator.html": "calculateur-d-argent-sterling.html",
  "junk-silver-calculator.html": "calculateur-d-argent-de-circulation.html",
  "silver-coin-value-calculator.html": "valeur-des-pieces-d-argent.html",
  "silver-bar-value-calculator.html": "valeur-des-lingots-d-argent.html",
  "silver-jewelry-value-calculator.html": "valeur-des-bijoux-en-argent.html",
  "silverware-value-calculator.html": "valeur-de-l-argenterie.html",
  "999-silver-calculator.html": "argent-fin-999.html",
  "958-silver-calculator.html": "argent-britannia-958.html",
  "925-silver-calculator.html": "argent-sterling-925.html",
  "900-silver-calculator.html": "argent-de-piece-900.html",
  "835-silver-calculator.html": "argent-835.html",
  "800-silver-calculator.html": "argent-800.html",
  "silver-purity-chart.html": "tableau-de-purete-de-l-argent.html",
  "silver-price-per-gram.html": "prix-de-l-argent-au-gramme.html",
  "silver-price-per-ounce.html": "prix-de-l-argent-a-l-once.html",
  "silver-price-all-currencies.html": "prix-dans-toutes-les-devises.html",
  "1-10oz-silver-value.html": "valeur-de-l-argent-1-10oz.html",
  "1oz-silver-value.html": "valeur-de-l-argent-1oz.html",
  "2oz-silver-value.html": "valeur-de-l-argent-2oz.html",
  "5oz-silver-value.html": "valeur-de-l-argent-5oz.html",
  "10oz-silver-value.html": "valeur-de-l-argent-10oz.html",
  "100oz-silver-value.html": "valeur-de-l-argent-100oz.html",
  "1kg-silver-value.html": "valeur-de-l-argent-1kg.html",
  "silver-profit-calculator.html": "calculateur-de-profit-d-argent.html",
  "silver-batch-calculator.html": "calculateur-par-lots.html",
  "sona-chandi-calculator.html": "calculateur-sona-chandi.html",
  "face-value-silver-calculator.html": "calculateur-de-valeur-nominale.html",
  "silver-weight-converter.html": "convertisseur-de-poids.html",
  "pennyweight-calculator.html": "calculateur-pennyweight-dwt.html",
  "tola-calculator.html": "calculateur-tola.html",
  "silver-sell-or-hold.html": "analyse-vendre-ou-garder.html",
  "identify-silver.html": "identificateur-d-argent.html",
  "how-to-use-silver-calculators.html": "comment-utiliser-nos-calculateurs.html",
  "what-is-silver-scrap.html": "qu-est-ce-que-la-ferraille-d-argent.html",
  "what-is-silver-melt-value.html": "qu-est-ce-que-la-valeur-de-fonte.html",
  "what-is-junk-silver.html": "qu-est-ce-que-l-argent-de-circulation.html",
  "what-is-troy-ounce.html": "qu-est-ce-qu-une-once-troy.html",
  "what-is-silver-bullion.html": "qu-est-ce-qu-un-lingot-d-argent.html",
  "how-silver-prices-work.html": "comment-fonctionnent-les-prix-de-l-argent.html",
  "silver-hallmarks-guide.html": "guide-des-poincons-d-argent.html",
  "what-does-925-mean.html": "que-signifie-925.html",
  "what-is-sterling-silver.html": "qu-est-ce-que-l-argent-sterling.html",
  "how-to-sell-silver.html": "comment-vendre-de-l-argent.html"
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
