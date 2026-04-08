const fs = require('fs');
const path = require('path');

const esDict = {
  // Existing translations manually mapped here for links updating
  "silver-scrap-calculator": "calculadora-de-plata-de-desecho",
  "gold-and-silver-calculator": "calculadora-de-oro-y-plata",
  "silver-melt-value-calculator": "calculadora-de-valor-de-fusion-de-la-plata",
  "sterling-silver-calculator": "calculadora-de-plata-esterlina",
  "junk-silver-calculator": "calculadora-de-plata-basura",
  "silver-coin-value-calculator": "valor-de-moneda-de-plata",
  "silver-bar-value-calculator": "valor-de-lingote-de-plata",
  "silver-jewelry-value-calculator": "valor-de-joyeria-de-plata",
  "silverware-value-calculator": "valor-de-cubiertos-de-plata",
  "999-silver-calculator": "plata-fina-999",
  "958-silver-calculator": "plata-britannia-958",
  "925-silver-calculator": "plata-esterlina-925",
  "900-silver-calculator": "plata-de-moneda-900",
  "835-silver-calculator": "plata-835",
  "800-silver-calculator": "plata-800",
  "silver-purity-chart": "tabla-de-pureza-de-la-plata",
  "silver-price-per-gram": "precio-de-la-plata-por-gramo",
  "silver-price-per-ounce": "precio-de-la-plata-por-onza",
  "silver-price-all-currencies": "precio-en-todas-las-monedas",
  "1-10oz-silver-value": "valor-de-la-plata-1-10oz",
  "1oz-silver-value": "valor-de-la-plata-1oz",
  "2oz-silver-value": "valor-de-la-plata-2oz",
  "5oz-silver-value": "valor-de-la-plata-5oz",
  "10oz-silver-value": "valor-de-la-plata-10oz",
  "100oz-silver-value": "valor-de-la-plata-100oz",
  "1kg-silver-value": "valor-de-la-plata-1kg",
  "silver-profit-calculator": "calculadora-de-ganancias-de-plata",
  "silver-batch-calculator": "calculadora-por-lotes",
  "sona-chandi-calculator": "calculadora-sona-chandi",
  "face-value-silver-calculator": "calculadora-de-valor-nominal",
  "silver-weight-converter": "conversor-de-peso",
  "pennyweight-calculator": "calculadora-pennyweight-dwt",
  "tola-calculator": "calculadora-tola",
  "silver-sell-or-hold": "analisis-de-vender-o-mantener",
  "identify-silver": "identificador-de-plata",
  "how-to-use-silver-calculators": "como-usar-nuestras-calculadoras",
  "what-is-silver-scrap": "que-es-la-plata-de-desecho",
  "what-is-silver-melt-value": "que-es-el-valor-de-fusion",
  "what-is-junk-silver": "que-es-la-plata-basura",
  "what-is-troy-ounce": "que-es-una-onza-troy",
  "what-is-silver-bullion": "que-es-un-lingote-de-plata",
  "how-silver-prices-work": "como-funcionan-los-precios-de-la-plata",
  "silver-hallmarks-guide": "guia-de-sellos-de-plata",
  "what-does-925-mean": "que-significa-925",
  "what-is-sterling-silver": "que-es-la-plata-esterlina",
  "how-to-sell-silver": "como-vender-plata",
  
  // Missing new files to map
  "silver-bracelet-value": "valor-de-pulsera-de-plata",
  "silver-chain-value": "valor-de-cadena-de-plata",
  "silver-cup-value": "valor-de-copa-de-plata",
  "silver-dime-calculator": "calculadora-de-diez-centavos-de-plata",
  "silver-dollar-calculator": "calculadora-de-dolar-de-plata",
  "silver-fork-value": "valor-de-tenedor-de-plata",
  "silver-knife-value": "valor-de-cuchillo-de-plata",
  "silver-necklace-value": "valor-de-collar-de-plata",
  "silver-plate-value": "valor-de-plato-de-plata",
  "silver-quarter-calculator": "calculadora-de-cuarto-de-dolar-de-plata",
  "silver-ring-value": "valor-de-anillo-de-plata",
  "silver-spoon-value": "valor-de-cuchara-de-plata",
  "silver-tray-value": "valor-de-bandeja-de-plata",
  "canadian-silver-coin-calculator": "calculadora-de-monedas-de-plata-canadienses"
};

const tDir = path.join(__dirname, 'es');

// 1. Rename files in directory and delete duplicates if they exist (e.g. if silver-scrap-calculator AND calculadora-de-plata-de-desecho both exist)
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
    // The previous es/index had links like: href="../silver-scrap-calculator/"
    // They point to the parent. We should change them to point to the current localized file: href="calculadora-de-plata-de-desecho/"
    // Wait, if it points to `../silver-scrap-calculator` from `es/index` it's linking to the English version. 
    // We want the Spanish page to link to the Spanish page, so `href="calculadora-de-plata-de-desecho/"` or if it's within a subdirectory it would be correct.
    for (const [eng, loc] of Object.entries(esDict)) {
      // If it contains href="../english-name/" we change it to point to the localized name WITHOUT the ../
      // because inside /es folder, the localized files are at the same level.
      const regex1 = new RegExp(`href="\\.\\.\\/${eng}"`, 'g');
      content = content.replace(regex1, `href="${loc}"`);
      
      // Also catch straight href="english-name/"
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
