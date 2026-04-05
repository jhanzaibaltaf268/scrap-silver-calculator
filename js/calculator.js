/* ============================================
   SILVER CALCULATOR ENGINE
   Pure Functions for all silver value calculations
   ============================================ */

const SilverCalc = (() => {
  /* ---- Unit Conversions ---- */
  const GRAMS_PER_TROY_OZ = 31.1035;
  const GRAMS_PER_AVOIRDUPOIS_OZ = 28.3495;
  const DWT_PER_TROY_OZ = 20;
  const GRAMS_PER_DWT = GRAMS_PER_TROY_OZ / DWT_PER_TROY_OZ; // 1.555g
  const GRAMS_PER_TOLA = 11.6638;
  const GRAMS_PER_KG = 1000;

  /* ---- Purity Presets ---- */
  const PURITY = {
    '999': 0.999,
    '980': 0.980,
    '970': 0.970,
    '960': 0.960,
    '958': 0.958,
    '950': 0.950,
    '925': 0.925,
    '900': 0.900,
    '875': 0.875,
    '835': 0.835,
    '800': 0.800,
    '750': 0.750,
    '500': 0.500
  };

  /* ---- Purity Names ---- */
  const PURITY_NAMES = {
    '999': 'Fine Silver (99.9%)',
    '958': 'Britannia Silver (95.8%)',
    '950': '950 Silver (95.0%)',
    '925': 'Sterling Silver (92.5%)',
    '900': 'Coin Silver (90.0%)',
    '835': 'European Silver (83.5%)',
    '800': 'European Silver (80.0%)',
  };

  /* ---- Junk Silver Coins ---- */
  const JUNK_COINS = {
    'us-dime-pre1965': {
      name: 'US Dime (pre-1965)',
      silverOz: 0.0723,
      purity: 0.900,
      weightG: 2.5
    },
    'us-quarter-pre1965': {
      name: 'US Quarter (pre-1965)',
      silverOz: 0.1808,
      purity: 0.900,
      weightG: 6.25
    },
    'us-half-pre1965': {
      name: 'US Half Dollar (pre-1965)',
      silverOz: 0.3617,
      purity: 0.900,
      weightG: 12.5
    },
    'us-half-1965-1970': {
      name: 'US Half Dollar (1965-1970)',
      silverOz: 0.1479,
      purity: 0.400,
      weightG: 11.5
    },
    'us-dollar-morgan': {
      name: 'Morgan Dollar',
      silverOz: 0.7734,
      purity: 0.900,
      weightG: 26.73
    },
    'us-dollar-peace': {
      name: 'Peace Dollar',
      silverOz: 0.7734,
      purity: 0.900,
      weightG: 26.73
    },
    'us-war-nickel': {
      name: 'War Nickel (1942-1945)',
      silverOz: 0.0563,
      purity: 0.350,
      weightG: 5.0
    },
    'canadian-quarter-pre1967': {
      name: 'Canadian Quarter (pre-1967)',
      silverOz: 0.1500,
      purity: 0.800,
      weightG: 5.83
    },
    'canadian-dime-pre1967': {
      name: 'Canadian Dime (pre-1967)',
      silverOz: 0.0600,
      purity: 0.800,
      weightG: 2.33
    },
    '1oz-silver-eagle': {
      name: 'American Silver Eagle (1 oz)',
      silverOz: 1.0,
      purity: 0.999,
      weightG: 31.1035
    },
    '1oz-maple-leaf': {
      name: 'Canadian Maple Leaf (1 oz)',
      silverOz: 1.0,
      purity: 0.9999,
      weightG: 31.1035
    }
  };

  /* ---- Typical Jewelry Weights (grams) ---- */
  const JEWELRY_WEIGHTS = {
    'ring': { min: 3, max: 12, typical: 6 },
    'chain': { min: 10, max: 60, typical: 25 },
    'necklace': { min: 15, max: 80, typical: 30 },
    'bracelet': { min: 10, max: 50, typical: 20 },
  };

  /* ---- Typical Silverware Weights (grams) ---- */
  const SILVERWARE_WEIGHTS = {
    'spoon': { min: 20, max: 80, typical: 40 },
    'fork': { min: 25, max: 70, typical: 40 },
    'knife': { min: 30, max: 100, typical: 55 },
    'tray': { min: 200, max: 2000, typical: 500 },
    'cup': { min: 50, max: 300, typical: 150 },
    'plate': { min: 100, max: 500, typical: 250 },
  };

  /* ---- Silver Bar Sizes (troy oz) ---- */
  const BAR_SIZES = [1, 5, 10, 50, 100];

  /* ---- Core Calculation Functions ---- */

  /**
   * Convert weight to grams based on unit
   */
  function toGrams(weight, unit) {
    switch (unit) {
      case 'g': return weight;
      case 'oz':
      case 'troy-oz': return weight * GRAMS_PER_TROY_OZ;
      case 'dwt': return weight * GRAMS_PER_DWT;
      case 'kg': return weight * GRAMS_PER_KG;
      case 'tola': return weight * GRAMS_PER_TOLA;
      default: return weight;
    }
  }

  /**
   * Calculate melt value of silver
   * @param {number} weightGrams - Weight in grams
   * @param {number} purity - Purity as decimal (e.g. 0.925)
   * @param {number} spotPricePerOz - Spot price per troy ounce
   * @returns {object} { value, silverContent, weightOz }
   */
  function meltValue(weightGrams, purity, spotPricePerOz) {
    const silverGrams = weightGrams * purity;
    const silverOz = silverGrams / GRAMS_PER_TROY_OZ;
    const value = silverOz * spotPricePerOz;
    return {
      value: Math.round(value * 100) / 100,
      silverContentGrams: Math.round(silverGrams * 1000) / 1000,
      silverContentOz: Math.round(silverOz * 10000) / 10000,
      weightOz: Math.round((weightGrams / GRAMS_PER_TROY_OZ) * 10000) / 10000
    };
  }

  /**
   * Calculate scrap value with dealer discount
   * @param {number} weightGrams
   * @param {number} purity
   * @param {number} spotPricePerOz
   * @param {number} dealerDiscount - Discount percentage (e.g. 0.15 for 15%)
   * @returns {object}
   */
  function scrapValue(weightGrams, purity, spotPricePerOz, dealerDiscount = 0) {
    const melt = meltValue(weightGrams, purity, spotPricePerOz);
    const discount = melt.value * dealerDiscount;
    return {
      ...melt,
      discount: Math.round(discount * 100) / 100,
      scrapValue: Math.round((melt.value - discount) * 100) / 100
    };
  }

  /**
   * Calculate junk silver coin value
   * @param {string} coinType - Key from JUNK_COINS
   * @param {number} quantity
   * @param {number} spotPricePerOz
   * @returns {object}
   */
  function coinValue(coinType, quantity, spotPricePerOz) {
    const coin = JUNK_COINS[coinType];
    if (!coin) return null;
    const totalSilverOz = coin.silverOz * quantity;
    const value = totalSilverOz * spotPricePerOz;
    return {
      coin: coin.name,
      quantity,
      silverOzEach: coin.silverOz,
      totalSilverOz: Math.round(totalSilverOz * 10000) / 10000,
      value: Math.round(value * 100) / 100,
      valueEach: Math.round((coin.silverOz * spotPricePerOz) * 100) / 100
    };
  }

  /**
   * Calculate silver bar value
   * @param {number} sizeOz - Bar size in troy ounces
   * @param {number} quantity
   * @param {number} spotPricePerOz
   * @returns {object}
   */
  function barValue(sizeOz, quantity, spotPricePerOz) {
    const totalOz = sizeOz * quantity;
    const value = totalOz * spotPricePerOz;
    return {
      sizeOz,
      quantity,
      totalOz,
      value: Math.round(value * 100) / 100,
      valueEach: Math.round((sizeOz * spotPricePerOz) * 100) / 100
    };
  }

  /**
   * Format currency value
   */
  function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(value);
  }

  /**
   * Format weight
   */
  function formatWeight(grams, unit = 'g') {
    switch (unit) {
      case 'g': return `${grams.toFixed(2)}g`;
      case 'oz': return `${(grams / GRAMS_PER_TROY_OZ).toFixed(4)} oz`;
      case 'kg': return `${(grams / 1000).toFixed(4)} kg`;
      case 'dwt': return `${(grams / GRAMS_PER_DWT).toFixed(2)} dwt`;
      default: return `${grams.toFixed(2)}g`;
    }
  }

  return {
    // Constants
    GRAMS_PER_TROY_OZ,
    GRAMS_PER_DWT,
    GRAMS_PER_TOLA,
    PURITY,
    PURITY_NAMES,
    JUNK_COINS,
    JEWELRY_WEIGHTS,
    SILVERWARE_WEIGHTS,
    BAR_SIZES,

    // Functions
    toGrams,
    meltValue,
    scrapValue,
    coinValue,
    barValue,
    formatCurrency,
    formatWeight
  };
})();
