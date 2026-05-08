/* ============================================
   SILVER PRICE MODULE
   Fetches live silver spot price with fallback
   Multi-currency support & custom price override
   ============================================ */

const SilverPrice = (() => {
  const FALLBACK_PRICE = 82.53; // Verified live price April 17, 2026 // USD per troy oz
  const CACHE_KEY = 'silverSpotPrice';
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  let currentPrice = FALLBACK_PRICE;
  let currentGoldPrice = 2500.00; // Fallback gold price
  let customPrice = null; // User override
  let lastFetched = 0;
  let listeners = [];
  let isInitialized = false;

  // Exchange rates (fallback, updated when possible)
  const CURRENCIES = {
    USD: { symbol: '$', rate: 1, name: 'US Dollar' },
    EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
    GBP: { symbol: '£', rate: 0.79, name: 'British Pound' },
    CAD: { symbol: 'C$', rate: 1.36, name: 'Canadian Dollar' },
    AUD: { symbol: 'A$', rate: 1.53, name: 'Australian Dollar' },
    INR: { symbol: '₹', rate: 83.50, name: 'Indian Rupee' },
    PKR: { symbol: '₨', rate: 278.50, name: 'Pakistani Rupee' },
    AED: { symbol: 'د.إ', rate: 3.67, name: 'UAE Dirham' },
    SAR: { symbol: '﷼', rate: 3.75, name: 'Saudi Riyal' },
    CHF: { symbol: 'Fr', rate: 0.88, name: 'Swiss Franc' },
    JPY: { symbol: '¥', rate: 149.50, name: 'Japanese Yen' },
    CNY: { symbol: '¥', rate: 7.24, name: 'Chinese Yuan' }
  };

  let activeCurrency = 'USD';

  function getCache() {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_DURATION) {
          return { silver: data.price, gold: data.goldPrice };
        }
      }
    } catch (e) { /* ignore */ }
    return null;
  }

  function setCache(silverPrice, goldPrice) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        price: silverPrice,
        goldPrice: goldPrice,
        timestamp: Date.now()
      }));
    } catch (e) { /* ignore */ }
  }

  async function fetchPrice() {
    const GOLD_API_KEY = 'goldapi-1230smo2lqnxm-io';
    
    // Primary: GoldAPI.io (Professional)
    try {
      const headers = { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' };
      const [silverRes, goldRes] = await Promise.all([
        fetch('https://www.goldapi.io/api/XAG/USD', { headers }),
        fetch('https://www.goldapi.io/api/XAU/USD', { headers })
      ]);
      
      if (silverRes.ok && goldRes.ok) {
        const sData = await silverRes.json();
        const gData = await goldRes.json();
        if (sData.price && gData.price) {
          console.log('✅ GoldAPI.io: Prices loaded successfully.');
          return { silver: sData.price, gold: gData.price };
        }
      }
    } catch (e) { console.error('GoldAPI failed, trying fallbacks...'); }

    // Fallbacks
    const apis = [
      {
        url: 'https://data-asg.goldprice.org/dbXRates/USD',
        parse: (data) => {
          if (data.items && data.items[0]) {
            return {
              silver: data.items[0].xagPrice,
              gold: data.items[0].xauPrice
            };
          }
          return null;
        }
      },
      {
        url: 'https://api.metalpriceapi.com/v1/latest?api_key=demo&base=USD&currencies=XAG,XAU',
        parse: (data) => {
          if (data.rates && data.rates.USDXAG) {
            return {
              silver: (1 / data.rates.USDXAG),
              gold: data.rates.USDXAU ? (1 / data.rates.USDXAU) : null
            };
          }
          return null;
        }
      }
    ];

    for (const api of apis) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(api.url, { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          const prices = api.parse(data);
          if (prices && prices.silver > 0) return prices;
        }
      } catch (e) { /* try next */ }
    }
    return null;
  }

  async function init() {
    const cached = getCache();
    if (cached) {
      currentPrice = cached.silver || FALLBACK_PRICE;
      if (cached.gold) currentGoldPrice = cached.gold;
      isInitialized = true;
      notifyListeners();
      return currentPrice;
    }

    notifyListeners(); // Notify fallback first
    const livePrices = await fetchPrice();
    if (livePrices) {
      currentPrice = Math.round(livePrices.silver * 100) / 100;
      if (livePrices.gold) currentGoldPrice = Math.round(livePrices.gold * 100) / 100;
      setCache(currentPrice, currentGoldPrice);
    }
    isInitialized = true;
    notifyListeners();
    return currentPrice;
  }

  function getPrice() {
    return customPrice !== null ? customPrice : currentPrice;
  }

  function getGoldPrice() {
    return currentGoldPrice;
  }

  function getPriceInCurrency(currency) {
    const base = getPrice();
    const cur = CURRENCIES[currency] || CURRENCIES.USD;
    return base * cur.rate;
  }

  function formatInCurrency(usdValue, currency) {
    const cur = CURRENCIES[currency || activeCurrency] || CURRENCIES.USD;
    const converted = usdValue * cur.rate;
    return cur.symbol + converted.toFixed(2);
  }

  function setCustomPrice(price) {
    customPrice = price;
    notifyListeners();
  }

  function clearCustomPrice() {
    customPrice = null;
    notifyListeners();
  }

  function isCustom() {
    return customPrice !== null;
  }

  function setCurrency(code) {
    if (CURRENCIES[code]) {
      activeCurrency = code;
      notifyListeners();
    }
  }

  function getCurrency() {
    return activeCurrency;
  }

  function getCurrencySymbol(code) {
    return (CURRENCIES[code || activeCurrency] || CURRENCIES.USD).symbol;
  }

  function getPricePerGram() {
    return getPrice() / 31.1035;
  }

  function getPricePerKg() {
    return getPrice() * (1000 / 31.1035);
  }

  function getPricePerDwt() {
    return getPrice() / 20;
  }

  function onPriceUpdate(callback) {
    listeners.push(callback);
    if (isInitialized) {
      callback(getPrice());
    }
  }

  function notifyListeners() {
    listeners.forEach(fn => fn(getPrice()));
  }

  // Auto-init when module loads
  init();

  return {
    init,
    getPrice,
    getGoldPrice,
    getPriceInCurrency,
    formatInCurrency,
    setCustomPrice,
    clearCustomPrice,
    isCustom,
    setCurrency,
    getCurrency,
    getCurrencySymbol,
    getPricePerGram,
    getPricePerKg,
    getPricePerDwt,
    onPriceUpdate,
    CURRENCIES,
    FALLBACK_PRICE
  };
})();
