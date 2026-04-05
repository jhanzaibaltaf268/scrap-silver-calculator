const fs = require('fs');
const path = require('path');

const esDict = {
  // Existing translations manually mapped here for links updating
  "silver-scrap-calculator.html": "calculadora-de-plata-de-desecho.html",
  "gold-and-silver-calculator.html": "calculadora-de-oro-y-plata.html",
  "silver-melt-value-calculator.html": "calculadora-de-valor-de-fusion-de-la-plata.html",
  "sterling-silver-calculator.html": "calculadora-de-plata-esterlina.html",
  "junk-silver-calculator.html": "calculadora-de-plata-basura.html",
  "silver-coin-value-calculator.html": "valor-de-moneda-de-plata.html",
  "silver-bar-value-calculator.html": "valor-de-lingote-de-plata.html",
  "silver-jewelry-value-calculator.html": "valor-de-joyeria-de-plata.html",
  "silverware-value-calculator.html": "valor-de-cubiertos-de-plata.html",
  "999-silver-calculator.html": "plata-fina-999.html",
  "958-silver-calculator.html": "plata-britannia-958.html",
  "925-silver-calculator.html": "plata-esterlina-925.html",
  "900-silver-calculator.html": "plata-de-moneda-900.html",
  "835-silver-calculator.html": "plata-835.html",
  "800-silver-calculator.html": "plata-800.html",
  "silver-purity-chart.html": "tabla-de-pureza-de-la-plata.html",
  "silver-price-per-gram.html": "precio-de-la-plata-por-gramo.html",
  "silver-price-per-ounce.html": "precio-de-la-plata-por-onza.html",
  "silver-price-all-currencies.html": "precio-en-todas-las-monedas.html",
  "1-10oz-silver-value.html": "valor-de-la-plata-1-10oz.html",
  "1oz-silver-value.html": "valor-de-la-plata-1oz.html",
  "2oz-silver-value.html": "valor-de-la-plata-2oz.html",
  "5oz-silver-value.html": "valor-de-la-plata-5oz.html",
  "10oz-silver-value.html": "valor-de-la-plata-10oz.html",
  "100oz-silver-value.html": "valor-de-la-plata-100oz.html",
  "1kg-silver-value.html": "valor-de-la-plata-1kg.html",
  "silver-profit-calculator.html": "calculadora-de-ganancias-de-plata.html",
  "silver-batch-calculator.html": "calculadora-por-lotes.html",
  "sona-chandi-calculator.html": "calculadora-sona-chandi.html",
  "face-value-silver-calculator.html": "calculadora-de-valor-nominal.html",
  "silver-weight-converter.html": "conversor-de-peso.html",
  "pennyweight-calculator.html": "calculadora-pennyweight-dwt.html",
  "tola-calculator.html": "calculadora-tola.html",
  "silver-sell-or-hold.html": "analisis-de-vender-o-mantener.html",
  "identify-silver.html": "identificador-de-plata.html",
  "how-to-use-silver-calculators.html": "como-usar-nuestras-calculadoras.html",
  "what-is-silver-scrap.html": "que-es-la-plata-de-desecho.html",
  "what-is-silver-melt-value.html": "que-es-el-valor-de-fusion.html",
  "what-is-junk-silver.html": "que-es-la-plata-basura.html",
  "what-is-troy-ounce.html": "que-es-una-onza-troy.html",
  "what-is-silver-bullion.html": "que-es-un-lingote-de-plata.html",
  "how-silver-prices-work.html": "como-funcionan-los-precios-de-la-plata.html",
  "silver-hallmarks-guide.html": "guia-de-sellos-de-plata.html",
  "what-does-925-mean.html": "que-significa-925.html",
  "what-is-sterling-silver.html": "que-es-la-plata-esterlina.html",
  "how-to-sell-silver.html": "como-vender-plata.html",
  
  // Missing new files to map
  "silver-bracelet-value.html": "valor-de-pulsera-de-plata.html",
  "silver-chain-value.html": "valor-de-cadena-de-plata.html",
  "silver-cup-value.html": "valor-de-copa-de-plata.html",
  "silver-dime-calculator.html": "calculadora-de-diez-centavos-de-plata.html",
  "silver-dollar-calculator.html": "calculadora-de-dolar-de-plata.html",
  "silver-fork-value.html": "valor-de-tenedor-de-plata.html",
  "silver-knife-value.html": "valor-de-cuchillo-de-plata.html",
  "silver-necklace-value.html": "valor-de-collar-de-plata.html",
  "silver-plate-value.html": "valor-de-plato-de-plata.html",
  "silver-quarter-calculator.html": "calculadora-de-cuarto-de-dolar-de-plata.html",
  "silver-ring-value.html": "valor-de-anillo-de-plata.html",
  "silver-spoon-value.html": "valor-de-cuchara-de-plata.html",
  "silver-tray-value.html": "valor-de-bandeja-de-plata.html",
  "canadian-silver-coin-calculator.html": "calculadora-de-monedas-de-plata-canadienses.html"
};

const tDir = path.join(__dirname, 'es');

// 1. Rename files in directory and delete duplicates if they exist (e.g. if silver-scrap-calculator.html AND calculadora-de-plata-de-desecho.html both exist)
if (fs.existsSync(tDir)) {
  const files = fs.readdirSync(tDir);
  for (const file of files) {
    if (esDict[file]) {
      const oldPath = path.join(tDir, file);
      const newPath = path.join(tDir, esDict[file]);
      
      // If the target Spanish file already exists, we might have a duplicate
      // Just delete the English one if the Spanish one already exists
      if (fs.existsSync(newPath) && file !== esDict[file]) {
         fs.unlinkSync(oldPath);
         console.log(`Deleted duplicate: ${file}`);
      } else {
         fs.renameSync(oldPath, newPath);
         console.log(`Renamed: ${file} -> ${esDict[file]}`);
      }
    }
  }

  // 2. Update intra-page links
  const updatedFiles = fs.readdirSync(tDir);
  for (const file of updatedFiles) {
    if (!file.endsWith('.html')) continue;
    const filePath = path.join(tDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace hrefs
    // The previous es/index.html had links like: href="../silver-scrap-calculator.html"
    // They point to the parent. We should change them to point to the current localized file: href="calculadora-de-plata-de-desecho.html"
    // Wait, if it points to `../silver-scrap-calculator.html` from `es/index.html` it's linking to the English version. 
    // We want the Spanish page to link to the Spanish page, so `href="calculadora-de-plata-de-desecho.html"` or if it's within a subdirectory it would be correct.
    for (const [eng, loc] of Object.entries(esDict)) {
      // If it contains href="../english-name.html" we change it to point to the localized name WITHOUT the ../
      // because inside /es folder, the localized files are at the same level.
      const regex1 = new RegExp(`href="\\.\\.\\/${eng}"`, 'g');
      content = content.replace(regex1, `href="${loc}"`);
      
      // Also catch straight href="english-name.html"
      const regex2 = new RegExp(`href="${eng}"`, 'g');
      content = content.replace(regex2, `href="${loc}"`);
      
      // Also catch single quotes
      const regex3 = new RegExp(`href='\\.\\.\\/${eng}'`, 'g');
      content = content.replace(regex3, `href='${loc}'`);
      
      // Straight single quotes
      const regex4 = new RegExp(`href='${eng}'`, 'g');
      content = content.replace(regex4, `href='${loc}'`);
    }

    // Replace canonical links if they point to english slugs inside /es
    for (const [eng, loc] of Object.entries(esDict)) {
        const regex5 = new RegExp(`href="https:\\/\\/silvercalc\\.com\\/es\\/${eng}"`, 'g');
        content = content.replace(regex5, `href="https://silvercalc.com/es/${loc}"`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
}
console.log('Finished updating files and internal links in /es/ folder.');
