const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const slugsPath = path.join(ROOT_DIR, 'master-slugs.json');
const slugs = fs.existsSync(slugsPath) ? JSON.parse(fs.readFileSync(slugsPath, 'utf8')) : {};
const filePath = path.join(ROOT_DIR, 'js', 'translations.js');

const MASTER_TRANSLATIONS = {
  "en": {
    "Home": "Home",
    "Calculators": "Calculators",
    "Purity": "Purity",
    "Tools": "Tools",
    "Guide": "Guide",
    "Simple Process": "Simple Process",
    "How It Works — 3 Simple Steps": "How It Works — 3 Simple Steps",
    "Weigh Your Silver": "Weigh Your Silver",
    "Use a scale to weigh your silver in grams, troy ounces, or any unit.": "Use a scale to weigh your silver in grams, troy ounces, or any unit.",
    "Select Purity": "Select Purity",
    "Choose the purity — 925 for sterling, 900 for coin silver, or 999 for fine silver.": "Choose the purity — 925 for sterling, 900 for coin silver, or 999 for fine silver.",
    "Get Instant Value": "Get Instant Value",
    "See the melt value based on live silver spot prices updated in real time.": "See the melt value based on live silver spot prices updated in real time.",
    "Learn": "Learn",
    "What Is a Scrap Silver Calculator?": "What Is a Scrap Silver Calculator?",
    "A scrap silver calculator determines the intrinsic melt value of a silver item — not its retail price or sentimental value. It answers: if you melted this item down to pure silver today, what would that metal be worth? Our engine utilizes real-time market data to provide the same valuation used by professional refineries.": "A scrap silver calculator determines the intrinsic melt value of a silver item — not its retail price or sentimental value. It answers: if you melted this item down to pure silver today, what would that metal be worth? Our engine utilizes real-time market data to provide the same valuation used by professional refineries.",
    "Understanding Silver Purity marks": "Understanding Silver Purity marks",
    "Look for \"925\" (Sterling), \"999\" (Fine Silver), or \"900\" (Coin Silver). These tell you the percentage of silver in the alloy. Items marked \"EPNS\" or \"Silver Plate\" contain only a microscopic layer of silver — these have negligible scrap value.": "Look for \"925\" (Sterling), \"999\" (Fine Silver), or \"900\" (Coin Silver). These tell you the percentage of silver in the alloy. Items marked \"EPNS\" or \"Silver Plate\" contain only a microscopic layer of silver — these have negligible scrap value.",
    "Frequently Asked Questions": "Frequently Asked Questions",
    "Everything you need to know about silver valuation.": "Everything you need to know about silver valuation.",
    "How do I calculate the value of scrap silver?": "How do I calculate the value of scrap silver?",
    "Multiply the item's weight in troy ounces by its purity (decimal) and the current spot price. Our calculator handles the unit conversions and market updates automatically.": "Multiply the item's weight in troy ounces by its purity (decimal) and the current spot price. Our calculator handles the unit conversions and market updates automatically.",
    "What is melt value vs spot price?": "What is melt value vs spot price?",
    "Spot price is the market price for pure 999 silver. Melt value is what your specific item is worth based on its purity. For example, 925 sterling is worth 92.5% of the spot price per ounce.": "Spot price is the market price for pure 999 silver. Melt value is what your specific item is worth based on its purity. For example, 925 sterling is worth 92.5% of the spot price per ounce.",
    "How much will a dealer pay me for scrap silver?": "How much will a dealer pay me for scrap silver?",
    "Most professional buyers pay 70–95% of melt value. Online silver refiners often offer the highest payouts, while local pawn shops may offer less due to higher overhead.": "Most professional buyers pay 70–95% of melt value. Online silver refiners often offer the highest payouts, while local pawn shops may offer less due to higher overhead.",
    "How can I tell if my silver is real?": "How can I tell if my silver is real?",
    "Look for hallmarks (925, STERLING, 900). You can also perform a magnet test (silver is not magnetic) or a \"ping\" test. For absolute certainty, an acid test or XRF analysis is required.": "Look for hallmarks (925, STERLING, 900). You can also perform a magnet test (silver is not magnetic) or a \"ping\" test. For absolute certainty, an acid test or XRF analysis is required.",
    "What is a troy ounce?": "What is a troy ounce?",
    "A troy ounce (31.1035 grams) is the standard unit of measurement for precious metals. It is approximately 10% heavier than a standard \"avoirdupois\" ounce (28.35 grams).": "A troy ounce (31.1035 grams) is the standard unit of measurement for precious metals. It is approximately 10% heavier than a standard \"avoirdupois\" ounce (28.35 grams)."
  },
  "es": {
    "Home": "Inicio",
    "Calculators": "Calculadoras",
    "Purity": "Pureza",
    "Tools": "Herramientas",
    "Guide": "Guía",
    "Simple Process": "Proceso Simple",
    "How It Works — 3 Simple Steps": "Cómo Funciona — 3 Sencillos Pasos",
    "Weigh Your Silver": "Pese su Plata",
    "Use a scale to weigh your silver in grams, troy ounces, or any unit.": "Use una báscula para pesar su plata en gramos, onzas troy o cualquier unidad.",
    "Select Purity": "Seleccionar Pureza",
    "Choose the purity — 925 for sterling, 900 for coin silver, or 999 for fine silver.": "Elija la pureza: 925 para ley, 900 para plata de moneda o 999 para plata fina.",
    "Get Instant Value": "Obtenga Valor al Instante",
    "See the melt value based on live silver spot prices updated in real time.": "Vea el valor de fusión basado en los precios spot de la plata en vivo actualizados en tiempo real.",
    "Learn": "Aprender",
    "What Is a Scrap Silver Calculator?": "¿Qué es una Calculadora de Plata de Desecho?",
    "A scrap silver calculator determines the intrinsic melt value of a silver item — not its retail price or sentimental value. It answers: if you melted this item down to pure silver today, what would that metal be worth? Our engine utilizes real-time market data to provide the same valuation used by professional refineries.": "Una calculadora de plata de desecho determina el valor intrínseco de fusión de un artículo de plata, no su precio minorista o valor sentimental. Responde: si fundieras este artículo hoy, ¿cuánto valdría ese metal? Nuestro motor utiliza datos de mercado en tiempo real para proporcionar la misma valoración utilizada por las refinerías profesionales.",
    "Understanding Silver Purity marks": "Entendiendo las marcas de pureza de la plata",
    "Look for \"925\" (Sterling), \"999\" (Fine Silver), or \"900\" (Coin Silver). These tell you the percentage of silver in the alloy. Items marked \"EPNS\" or \"Silver Plate\" contain only a microscopic layer of silver — these have negligible scrap value.": "Busque \"925\" (Sterling), \"999\" (Plata Fina) o \"900\" (Plata de Moneda). Estos indican el porcentaje de plata en la aleación. Los artículos marcados como \"EPNS\" o \"Plateado\" contienen solo una capa microscópica de plata; estos tienen un valor de desecho insignificante.",
    "Frequently Asked Questions": "Preguntas Frecuentes",
    "Everything you need to know about silver valuation.": "Todo lo que necesita saber sobre la valoración de la plata.",
    "How do I calculate the value of scrap silver?": "¿Cómo calculo el valor de la plata de desecho?",
    "Multiply the item's weight in troy ounces by its purity (decimal) and the current spot price. Our calculator handles the unit conversions and market updates automatically.": "Multiplique el peso del artículo en onzas troy por su pureza (decimal) y el precio spot actual. Nuestra calculadora gestiona las conversiones de unidades y las actualizaciones del mercado automáticamente.",
    "What is melt value vs spot price?": "¿Qué es el valor de fusión frente al precio spot?",
    "Spot price is the market price for pure 999 silver. Melt value is what your specific item is worth based on its purity. For example, 925 sterling is worth 92.5% of the spot price per ounce.": "El precio spot es el precio de mercado para la plata pura 999. El valor de fusión es lo que vale su artículo específico basado en su pureza. Por ejemplo, la plata de ley 925 vale el 92,5% del precio spot por onza.",
    "How much will a dealer pay me for scrap silver?": "¿Cuánto me pagará un comerciante por la plata de desecho?",
    "Most professional buyers pay 70–95% of melt value. Online silver refiners often offer the highest payouts, while local pawn shops may offer less due to higher overhead.": "La mayoría de los compradores profesionales pagan entre el 70% y el 95% del valor de fusión. Los refinadores de plata en línea suelen ofrecer los pagos más altos, mientras que las casas de empeño locales pueden ofrecer menos debido a los mayores costos operativos.",
    "How can I tell if my silver is real?": "¿Cómo puedo saber si mi plata es real?",
    "Look for hallmarks (925, STERLING, 900). También puede realizar una prueba de imán (la plata no es magnética) o una prueba de \"ping\". Para una certeza absoluta, se requiere una prueba de ácido o un análisis XRF.",
    "What is a troy ounce?": "¿Qué es una onza troy?",
    "A troy ounce (31.1035 grams) is the standard unit of measurement for precious metals. It is aproximadamente un 10% más pesada que una onza estándar \"avoirdupois\" (28.35 grams)."
  },
  "slugs": slugs
};

const finalContent = `window.MenuTranslations = ${JSON.stringify(MASTER_TRANSLATIONS, null, 2)};`;
fs.writeFileSync(filePath, finalContent);
console.log('translations.js updated with Masterpiece content and slugs.');
