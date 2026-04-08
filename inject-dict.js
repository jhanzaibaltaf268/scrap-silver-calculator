const fs = require('fs');
const path = require('path');

const esDictSlugs = {
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
  "how-to-sell-silver": "como-vender-plata"
};

const esDictLabels = {
      "Home": "Inicio",
      "Calculators": "Calculadoras",
      "Silver Scrap Calculator": "Calculadora de Plata de Desecho",
      "Gold & Silver Calculator": "Calculadora de Oro y Plata",
      "Silver Melt Value": "Valor de Fusión de la Plata",
      "Sterling Silver Calculator": "Calculadora de Plata Esterlina",
      "Junk Silver Calculator": "Calculadora de Plata Basura",
      "Silver Coin Value": "Valor de Moneda de Plata",
      "Silver Bar Value": "Valor de Lingote de Plata",
      "Silver Jewelry Value": "Valor de Joyería de Plata",
      "Silverware Value": "Valor de Cubiertos de Plata",
      "Purity": "Pureza",
      "999 Fine Silver": "Plata Fina 999",
      "958 Britannia Silver": "Plata Britannia 958",
      "925 Sterling Silver": "Plata Esterlina 925",
      "900 Coin Silver": "Plata de Moneda 900",
      "835 Silver": "Plata 835",
      "800 Silver": "Plata 800",
      "Silver Purity Chart": "Tabla de Pureza de la Plata",
      "Pricing": "Precios",
      "Silver Price Per Gram": "Precio de la Plata por Gramo",
      "Silver Price Per Ounce": "Precio de la Plata por Onza",
      "Price in All Currencies": "Precio en Todas las Monedas",
      "1/10oz Silver Value": "Valor de la Plata 1/10oz",
      "1oz Silver Value": "Valor de la Plata 1oz",
      "2oz Silver Value": "Valor de la Plata 2oz",
      "5oz Silver Value": "Valor de la Plata 5oz",
      "10oz Silver Value": "Valor de la Plata 10oz",
      "100oz Silver Value": "Valor de la Plata 100oz",
      "1kg Silver Value": "Valor de la Plata 1kg",
      "Tools": "Herramientas",
      "Silver Profit Calculator": "Calculadora de Ganancias de Plata",
      "Batch Calculator": "Calculadora por Lotes",
      "Sona Chandi Calculator": "Calculadora Sona Chandi",
      "Face Value Calculator": "Calculadora de Valor Nominal",
      "Weight Converter": "Conversor de Peso",
      "Pennyweight (DWT) Calc": "Calculadora Pennyweight (DWT)",
      "Tola Calculator": "Calculadora Tola",
      "Sell or Hold Analysis": "Análisis de Vender o Mantener",
      "Silver Identifier": "Identificador de Plata",
      "Guides": "Guías",
      "How to Use Our Calculators": "Cómo Usar Nuestras Calculadoras",
      "What Is Silver Scrap?": "¿Qué es la Plata de Desecho?",
      "What Is Melt Value?": "¿Qué es el Valor de Fusión?",
      "What Is Junk Silver?": "¿Qué es la Plata Basura?",
      "What Is a Troy Ounce?": "¿Qué es una Onza Troy?",
      "What Is Silver Bullion?": "¿Qué es un Lingote de Plata?",
      "How Silver Prices Work": "Cómo Funcionan los Precios de la Plata",
      "Silver Hallmarks Guide": "Guía de Sellos de Plata",
      "What Does 925 Mean?": "¿Qué Significa 925?",
      "What Is Sterling Silver?": "¿Qué es la Plata Esterlina?",
      "How to Sell Silver": "Cómo Vender Plata",
      "Scrap Silver": "Plata de Desecho",
      "Gold & Silver": "Oro y Plata",
      "Silver Profit": "Ganancia de Plata",
      "Melt Value": "Valor de Fusión",
      "Junk Silver": "Plata Basura",
      "Silver Coins": "Monedas de Plata",
      "Silver Dollar": "Dólar de Plata",
      "Silver Quarter": "Cuarto de Dólar de Plata",
      "Silver Dime": "Moneda de Diez Centavos de Plata",
      "Jewelry Value": "Valor de Joyería",
      "925 Sterling": "Esterlina 925",
      "Purity Chart": "Tabla de Pureza",
      "How to Use Calculators": "Cómo Usar las Calculadoras",
      "Sona Chandi Calc": "Calc. Sona Chandi",
      "Face Value Calc": "Calc. Valor Nominal",
      "Sell or Hold": "Vender o Mantener",
      "About": "Acerca de",
      "Privacy": "Privacidad",
      "Terms": "Términos",
      "All rights reserved.": "Todos los derechos reservados.",
      "Prices are for informational purposes only.": "Los precios son solo para fines informativos."
};

const finalSpanishDict = Object.assign({ slugs: esDictSlugs }, esDictLabels);
const injection = `window.MenuTranslations = ${JSON.stringify(finalSpanishDict)};`;

const esDir = path.join(__dirname, 'es');
const files = fs.readdirSync(esDir);

for (const file of files) {
  if (!file.endsWith('.html') || file === 'index' || file === 'calculadora-de-plata-de-desecho') {
    // wait, we ALSO want to update index and silver-scrap-calculator so their navigation works locally too 
  }
  
  const filePath = path.join(esDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // They either have: window.MenuTranslations = Object.assign({ slugs: {"silver-scrap-calculator"...} }, {});
  // or window.MenuTranslations = {"Home":"Inicio"...};
  // Regex to simply replace anything matching window.MenuTranslations = ... ; 
  // It's safer to target the entire script block containing it if we can.
  content = content.replace(/window\.MenuTranslations\s*=\s*(.*?);/s, injection);

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Successfully injected explicit dictionary into ' + files.length + ' pages.');
