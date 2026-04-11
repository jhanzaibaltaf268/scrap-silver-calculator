const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';

// Helper to escape non-ASCII characters
function safeStringify(obj) {
    const str = JSON.stringify(obj);
    return str.replace(/[^\x00-\x7F]/g, c => {
        return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
    });
}

// --- EXHAUSTIVE DICTIONARIES ---

const ES_SLUGS = {
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
  "925-sterling-silver-price-per-gram": "precio-de-la-plata-925-por-gramo",
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

const ES_LABELS = {
  "Home": "Inicio",
  "Calculators": "Calculadoras",
  "Silver Scrap Calculator": "Calculadora de Plata de Desecho",
  "Gold & Silver Calculator": "Calculadora de Oro y Plata",
  "Silver Melt Value": "Valor de Fusi\u00f3n de la Plata",
  "Sterling Silver Calculator": "Calculadora de Plata Esterlina",
  "Junk Silver Calculator": "Calculadora de Plata Basura",
  "Silver Coin Value": "Valor de Moneda de Plata",
  "Silver Bar Value": "Valor de Lingote de Plata",
  "Silver Jewelry Value": "Valor de Joyer\u00eda de Plata",
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
  "Silver Spot Price Today": "Precio Spot de la Plata Hoy",
  "Silver Price Per Gram": "Precio de la Plata por Gramo",
  "925 Sterling Price / Gram": "Precio de la Plata 925 / Gramo",
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
  "Sell or Hold Analysis": "An\u00e1lisis de Vender o Mantener",
  "Silver Identifier": "Identificador de Plata",
  "Guides": "Gu\u00edas",
  "How to Use Our Calculators": "C\u00f3mo Usar Nuestras Calculadoras",
  "Silver Purity": "Pureza de la Plata",
  "Tools & Guides": "Herramientas y Gu\u00edas",
  "Change Language": "Cambiar Idioma",
  "Scrap Silver Calculator": "Calculadora de Plata de Desecho",
  "All rights reserved.": "Todos los derechos reservados.",
  "Prices are for informational purposes only.": "Los precios son solo para fines informativos.",
  "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculadoras de plata gratuitas usando precios spot en vivo. Calcule el valor al instante.",
  "copied": "Copiado",
  "Gold & Silver": "Oro y Plata",
  "Silver Profit": "Ganancia de Plata",
  "Melt Value": "Valor de Fusi\u00f3n",
  "Junk Silver": "Plata Basura",
  "Silver Coins": "Monedas de Plata",
  "Silver Dollar": "D\u00f3lar de Plata",
  "Silver Quarter": "Cuarto de D\u00f3lar de Plata",
  "Silver Dime": "Diez Centavos de Plata",
  "925 Sterling": "Esterlina 925",
  "Purity Chart": "Tabla de Pureza",
  "How to Use Calculators": "C\u00f3mo Usar las Calculadoras",
  "Sona Chandi Calc": "Calc. Sona Chandi",
  "Face Value Calc": "Calc. Valor Nominal",
  "Sell or Hold": "Vender o Mantener"
};

const FR_LABELS = {
  "Home": "Accueil",
  "Calculators": "Calculateurs",
  "Silver Scrap Calculator": "Calculateur d'Argent de R\u00e9cup\u00e9ration",
  "Gold & Silver Calculator": "Calculateur d'Or et d'Argent",
  "Silver Melt Value": "Valeur de Fonte de l'Argent",
  "Sterling Silver Calculator": "Calculateur d'Argent Sterling",
  "Junk Silver Calculator": "Calculateur d'Argent de Circulation",
  "Silver Coin Value": "Valeur des Pi\u00e8ces en Argent",
  "Silver Bar Value": "Valeur des Lingots d'Argent",
  "Silver Jewelry Value": "Valeur des Bijoux en Argent",
  "Silverware Value": "Valeur de l'Argenterie",
  "Purity": "Puret\u00e9",
  "999 Fine Silver": "Argent Fin 999",
  "958 Britannia Silver": "Argent Britannia 958",
  "925 Sterling Silver": "Argent Sterling 925",
  "900 Coin Silver": "Argent de Pi\u00e8ce 900",
  "835 Silver": "Argent 835",
  "800 Silver": "Argent 800",
  "Silver Purity Chart": "Tableau de Puret\u00e9 de l'Argent",
  "Pricing": "Prix",
  "Silver Spot Price Today": "Prix de l'Argent Aujourd'hui",
  "Silver Price Per Gram": "Prix de l'Argent au Gramme",
  "925 Sterling Price / Gram": "Prix de l'Argent 925 / Gramme",
  "Silver Price Per Ounce": "Prix de l'Argent par Once",
  "Price in All Currencies": "Prix dans Toutes les Devises",
  "1/10oz Silver Value": "Valeur de l'Argent 1/10oz",
  "1oz Silver Value": "Valeur de l'Argent 1oz",
  "2oz Silver Value": "Valeur de l'Argent 2oz",
  "5oz Silver Value": "Valeur de l'Argent 5oz",
  "10oz Silver Value": "Valeur de l'Argent 10oz",
  "100oz Silver Value": "Valeur de l'Argent 100oz",
  "1kg Silver Value": "Valeur de l'Argent 1kg",
  "Tools": "Outils",
  "Silver Profit Calculator": "Calculateur de Profit en Argent",
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
  "Silver Purity": "Puret\u00e9 de l'Argent",
  "Tools & Guides": "Outils et Guides",
  "Change Language": "Changer de Langue",
  "Scrap Silver Calculator": "Calculateur d'Argent de R\u00e9cup\u00e9ration",
  "All rights reserved.": "Tous droits r\u00e9serv\u00e9s.",
  "Prices are for informational purposes only.": "Les prix sont \u00e0 titre indicatif uniquement.",
  "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculateurs d'argent gratuits utilisant les prix en direct.",
  "copied": "Copi\u00e9",
  "Gold & Silver": "Or et Argent",
  "Silver Profit": "Profit d'Argent",
  "Melt Value": "Valeur de Fonte",
  "Junk Silver": "Argent Courant",
  "Silver Coins": "Pi\u00e8ces d'Argent",
  "Silver Dollar": "Dollar d'Argent",
  "Silver Quarter": "Quart de Dollar",
  "Silver Dime": "Pi\u00e8ce de 10 Cents",
  "925 Sterling": "Sterling 925",
  "Purity Chart": "Tableau de Puret\u00e9",
  "How to Use Calculators": "Utiliser les Calculateurs",
  "Sona Chandi Calc": "Calc. Sona Chandi",
  "Face Value Calc": "Calc. Valeur Nominale",
  "Sell or Hold": "Vendre ou Garder"
};

const L_DICTS = {
  es: Object.assign({ slugs: ES_SLUGS }, ES_LABELS),
  fr: Object.assign({ slugs: {} }, FR_LABELS) // Slugs for FR can be added similarly
};

const LANGS = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

LANGS.forEach(lang => {
    const langDir = path.join(rootDir, lang);
    if (!fs.existsSync(langDir)) return;

    const dict = L_DICTS[lang] || { slugs: {} };
    if (!dict["Home"]) dict["Home"] = "Home";
    if (!dict["Calculators"]) dict["Calculators"] = "Calculators";
    
    const files = fs.readdirSync(langDir);
    let count = 0;

    files.forEach(file => {
        if (!file.endsWith('.html')) return;
        const filePath = path.join(langDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // 1. CLEANUP OLD SCRIPTS
        content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\};\s*<\/script>/gs, '');
        content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\}\s*<\/script>/gs, '');

        // 2. INJECT NEW SCRIPT AT THE TOP OF HEAD (Race condition fix)
        const safeDictJSON = safeStringify(dict);
        const jsInjection = `<script>window.MenuTranslations = ${safeDictJSON};</script>`;
        
        // Find <meta charset or <head> to inject right after
        if (content.includes('<meta charset="UTF-8">')) {
            content = content.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">\n  ${jsInjection}`);
        } else if (content.includes('<head>')) {
            content = content.replace('<head>', `<head>\n  ${jsInjection}`);
        }

        // 3. TOP BAR CLEANUP (Duplicate Labels)
        const UI_LANGS = ['EN', 'ES', 'FR', 'DE', 'PT', 'HI', 'UR', 'AR', 'TR', 'IT', 'ZH', 'RU'];
        UI_LANGS.forEach(code => {
            const regex = new RegExp(`>\\s*${code}\\s+${code}\\s*<`, 'g');
            content = content.replace(regex, `>${code}<`);
        });

        // 4. LINK CORRECTION (Clean URLs)
        const linkRegex = /href="\/([^"\/]+)\/"/g;
        content = content.replace(linkRegex, (match, slug) => {
            if (UI_LANGS.includes(slug.toUpperCase()) || LANGS.includes(slug)) return match;
            let targetSlug = slug;
            if (dict.slugs && dict.slugs[slug]) {
                targetSlug = dict.slugs[slug];
            }
            return `href="/${lang}/${targetSlug}/"`;
        });

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    });
    console.log(`Sync V5 (Exhaustive) completed for /${lang}/ (${count} files).`);
});

console.log('ALL FIXES APPLIED (EXHAUSTIVE SYNC V5).');
