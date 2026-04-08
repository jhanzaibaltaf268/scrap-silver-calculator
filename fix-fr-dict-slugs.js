const fs = require('fs');
const path = require('path');

const frDictSlugs = {
  // Existing files
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
  "how-to-sell-silver": "comment-vendre-de-l-argent",
  
  // NEW 14 mapping generated for French
  "silver-bracelet-value": "valeur-d-un-bracelet-en-argent",
  "silver-chain-value": "valeur-d-une-chaine-en-argent",
  "silver-cup-value": "valeur-d-une-coupe-en-argent",
  "silver-dime-calculator": "calculateur-piece-de-dix-cents-en-argent",
  "silver-dollar-calculator": "calculateur-dollar-en-argent",
  "silver-fork-value": "valeur-d-une-fourchette-en-argent",
  "silver-knife-value": "valeur-d-un-couteau-en-argent",
  "silver-necklace-value": "valeur-d-un-collier-en-argent",
  "silver-plate-value": "valeur-d-une-assiette-en-argent",
  "silver-quarter-calculator": "calculateur-quart-de-dollar-en-argent",
  "silver-ring-value": "valeur-d-une-bague-en-argent",
  "silver-spoon-value": "valeur-d-une-cuillere-en-argent",
  "silver-tray-value": "valeur-d-un-plateau-en-argent",
  "canadian-silver-coin-calculator": "calculateur-piece-en-argent-canadienne"
};

const frDictLabels = {
  "Home": "Accueil",
  "Calculators": "Calculateurs",
  "Silver Scrap Calculator": "Calculateur de Ferraille d'Argent",
  "Gold & Silver Calculator": "Calculateur Or et Argent",
  "Silver Melt Value": "Valeur de Fonte de l'Argent",
  "Sterling Silver Calculator": "Calculateur d'Argent Sterling",
  "Junk Silver Calculator": "Calculateur d'Argent de Circulation",
  "Silver Coin Value": "Valeur des Pièces d'Argent",
  "Silver Bar Value": "Valeur des Lingots d'Argent",
  "Silver Jewelry Value": "Valeur des Bijoux en Argent",
  "Silverware Value": "Valeur de l'Argenterie",
  "Purity": "Pureté",
  "999 Fine Silver": "Argent Fin 999",
  "958 Britannia Silver": "Argent Britannia 958",
  "925 Sterling Silver": "Argent Sterling 925",
  "900 Coin Silver": "Argent de Pièce 900",
  "835 Silver": "Argent 835",
  "800 Silver": "Argent 800",
  "Silver Purity Chart": "Tableau de Pureté de l'Argent",
  "Pricing": "Prix",
  "Silver Price Per Gram": "Prix de l'Argent au Gramme",
  "Silver Price Per Ounce": "Prix de l'Argent à l'Once",
  "Price in All Currencies": "Prix dans Toutes les Devises",
  "1/10oz Silver Value": "Valeur de l'Argent 1/10oz",
  "1oz Silver Value": "Valeur de l'Argent 1oz",
  "2oz Silver Value": "Valeur de l'Argent 2oz",
  "5oz Silver Value": "Valeur de l'Argent 5oz",
  "10oz Silver Value": "Valeur de l'Argent 10oz",
  "100oz Silver Value": "Valeur de l'Argent 100oz",
  "1kg Silver Value": "Valeur de l'Argent 1kg",
  "Tools": "Outils",
  "Silver Profit Calculator": "Calculateur de Profit d'Argent",
  "Batch Calculator": "Calculateur par Lots",
  "Sona Chandi Calculator": "Calculateur Sona Chandi",
  "Face Value Calculator": "Calculateur de Valeur Nominale",
  "Weight Converter": "Convertisseur de Poids",
  "Pennyweight (DWT) Calc": "Calculateur Pennyweight (DWT)",
  "Tola Calculator": "Calculateur Tola",
  "Sell or Hold Analysis": "Analyse Vendre ou Garder",
  "Silver Identifier": "Identificateur d'Argent",
  "Guides": "Guides",
  "How to Use Our Calculators": "Comment Utiliser nos Calculateurs",
  "What Is Silver Scrap?": "Qu'est-ce que la Ferraille d'Argent ?",
  "What Is Melt Value?": "Qu'est-ce que la Valeur de Fonte ?",
  "What Is Junk Silver?": "Qu'est-ce que l'Argent de Circulation ?",
  "What Is a Troy Ounce?": "Qu'est-ce qu'une Once Troy ?",
  "What Is Silver Bullion?": "Qu'est-ce qu'un Lingot d'Argent ?",
  "How Silver Prices Work": "Comment Fonctionnent les Prix de l'Argent",
  "Silver Hallmarks Guide": "Guide des Poinçons d'Argent",
  "What Does 925 Mean?": "Que Signifie 925 ?",
  "What Is Sterling Silver?": "Qu'est-ce que l'Argent Sterling ?",
  "How to Sell Silver": "Comment Vendre de l'Argent",
  "Scrap Silver": "Ferraille d'Argent",
  "Gold & Silver": "Or et Argent",
  "Silver Profit": "Profit d'Argent",
  "Melt Value": "Valeur de Fonte",
  "Junk Silver": "Argent de Circulation",
  "Silver Coins": "Pièces d'Argent",
  "Silver Dollar": "Dollar en Argent",
  "Silver Quarter": "Quart de Dollar en Argent",
  "Silver Dime": "Pièce de Dix Cents en Argent",
  "Jewelry Value": "Valeur des Bijoux",
  "925 Sterling": "Sterling 925",
  "Purity Chart": "Tableau de Pureté",
  "How to Use Calculators": "Comment Utiliser les Calculateurs",
  "Sona Chandi Calc": "Calc. Sona Chandi",
  "Face Value Calc": "Calc. Valeur Nominale",
  "Sell or Hold": "Vendre ou Garder",
  "About": "À Propos",
  "Privacy": "Confidentialité",
  "Terms": "Conditions",
  "All rights reserved.": "Tous droits réservés.",
  "Prices are for informational purposes only.": "Les prix sont à titre informatif.",
  "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculateurs gratuits utilisant les prix en direct. Calculez la valeur de votre ferraille d'argent instantanément."
};

const fullDict = Object.assign({ slugs: frDictSlugs }, frDictLabels);
const jsInjection = `window.MenuTranslations = ${JSON.stringify(fullDict)};`;

const frDir = path.join(__dirname, 'fr');

// 1. Rename files in directory and delete duplicates if they exist
if (fs.existsSync(frDir)) {
  const files = fs.readdirSync(frDir);
  for (const file of files) {
    if (frDictSlugs[file]) {
      const oldPath = path.join(frDir, file);
      const newPath = path.join(frDir, frDictSlugs[file]);
      
      if (fs.existsSync(newPath) && file !== frDictSlugs[file]) {
         fs.unlinkSync(oldPath);
         console.log(`Deleted duplicate: ${file}`);
      } else {
         fs.renameSync(oldPath, newPath);
         console.log(`Renamed: ${file} -> ${frDictSlugs[file]}`);
      }
    }
  }

  // 2. Update intra-page links and window.MenuTranslations
  const updatedFiles = fs.readdirSync(frDir);
  let updatedCount = 0;
  for (const file of updatedFiles) {
    if (!file.endsWith('.html')) continue;
    const filePath = path.join(frDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace hrefs
    for (const [eng, loc] of Object.entries(frDictSlugs)) {
      const regex1 = new RegExp(`href="\\.\\.\\/${eng}"`, 'g');
      content = content.replace(regex1, `href="${loc}"`);
      const regex2 = new RegExp(`href="${eng}"`, 'g');
      content = content.replace(regex2, `href="${loc}"`);
      const regex5 = new RegExp(`href="https:\\/\\/silvercalc\\.com\\/fr\\/${eng}"`, 'g');
      content = content.replace(regex5, `href="https://silvercalc.com/fr/${loc}"`);
    }

    // Replace MenuTranslations
    content = content.replace(/<script>\s*window\.MenuTranslations\s*=.*?<\/script>/s, '<script>\n    ' + jsInjection + '\n  </script>');
    if(content.indexOf('window.MenuTranslations') === -1) {
    	// fallback if it was inside an existing script tag without newline
    	content = content.replace(/window\.MenuTranslations\s*=\s*(.*?);/s, jsInjection);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
  console.log('Finished updating files, links, and injected MenuTranslations slugs in /fr/ (' + updatedCount + ' files).');
}
