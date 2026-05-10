/* ============================================
   SILVER PRICE MODULE
   Primary: /api/price (Vercel serverless proxy)
   — all users share one server-side API call,
     Edge-cached for 1 hour.
   Fallback: direct client-side API calls.
   Last resort: hardcoded price (updated daily
   by the serverless function on first cold start).
   ============================================ */

const SilverPrice = (() => {
  const FALLBACK_PRICE   = 32.50;   // Updated automatically — do not edit by hand
  const FALLBACK_GOLD    = 3200.00; // Fallback gold price
  const CACHE_KEY        = 'silverSpotCache';
  const CACHE_DURATION   = 60 * 60 * 1000; // 1 hour (matches Edge cache)

  let currentPrice  = FALLBACK_PRICE;
  let currentGoldPrice = FALLBACK_GOLD;
  let customPrice   = null;
  let listeners     = [];
  let isInitialized = false;

  // Exchange rates — fallback values when live rates unavailable
  const CURRENCIES = {
    USD: { symbol: '$',  rate: 1,      name: 'US Dollar' },
    EUR: { symbol: '€',  rate: 0.92,   name: 'Euro' },
    GBP: { symbol: '£',  rate: 0.79,   name: 'British Pound' },
    CAD: { symbol: 'C$', rate: 1.36,   name: 'Canadian Dollar' },
    AUD: { symbol: 'A$', rate: 1.53,   name: 'Australian Dollar' },
    INR: { symbol: '₹',  rate: 83.50,  name: 'Indian Rupee' },
    PKR: { symbol: '₨',  rate: 278.50, name: 'Pakistani Rupee' },
    AED: { symbol: 'د.إ',rate: 3.67,   name: 'UAE Dirham' },
    SAR: { symbol: '﷼',  rate: 3.75,   name: 'Saudi Riyal' },
    CHF: { symbol: 'Fr', rate: 0.88,   name: 'Swiss Franc' },
    JPY: { symbol: '¥',  rate: 149.50, name: 'Japanese Yen' },
    CNY: { symbol: '¥',  rate: 7.24,   name: 'Chinese Yuan' }
  };

  let activeCurrency = 'USD';

  /* ---- Session cache ---- */
  function getCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.ts < CACHE_DURATION) return data;
    } catch (_) {}
    return null;
  }

  function setCache(silver, gold) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ silver, gold, ts: Date.now() }));
    } catch (_) {}
  }

  /* ---- Fetch helpers ---- */
  async function tryFetch(url, options = {}) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    try {
      const res = await fetch(url, { ...options, signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) return null;
      return await res.json();
    } catch (_) {
      clearTimeout(timer);
      return null;
    }
  }

  async function fetchPrice() {
    // ---- Source 1: Our own Vercel proxy (Edge-cached, shared quota) ----
    // Works on production. Skipped on local file:// or localhost dev.
    const isProduction = !window.location.protocol.startsWith('file') &&
                         !window.location.hostname.includes('localhost') &&
                         !window.location.hostname.includes('127.0.0.1');

    if (isProduction) {
      const data = await tryFetch('/api/price');
      if (data?.silver > 0) {
        console.log(`✅ Price via proxy: $${data.silver} (source: ${data.source})`);
        return { silver: data.silver, gold: data.gold };
      }
    }

    // ---- Source 2: GoldAPI.io direct (good for local dev) ----
    const GOLD_API_KEY = 'goldapi-1230smo2lqnxm-io';
    const headers = { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' };
    try {
      const [sRes, gRes] = await Promise.all([
        fetch('https://www.goldapi.io/api/XAG/USD', { headers }),
        fetch('https://www.goldapi.io/api/XAU/USD', { headers })
      ]);
      if (sRes.ok && gRes.ok) {
        const [sData, gData] = await Promise.all([sRes.json(), gRes.json()]);
        if (sData.price > 0) {
          console.log(`✅ Price via GoldAPI.io direct: $${sData.price}`);
          return { silver: sData.price, gold: gData.price };
        }
      }
    } catch (_) {}

    // ---- Source 3: goldprice.org (public, no key) ----
    const gpData = await tryFetch('https://data-asg.goldprice.org/dbXRates/USD');
    if (gpData?.items?.[0]?.xagPrice > 0) {
      const item = gpData.items[0];
      console.log(`✅ Price via goldprice.org: $${item.xagPrice}`);
      return { silver: item.xagPrice, gold: item.xauPrice };
    }

    // ---- Source 4: metals.live (free, no key) ----
    const mlData = await tryFetch('https://metals.live/api/v1/spot');
    if (mlData) {
      const spot = Array.isArray(mlData) ? mlData[0] : mlData;
      const silver = spot?.silver ?? spot?.XAG ?? spot?.xag;
      const gold   = spot?.gold   ?? spot?.XAU ?? spot?.xau;
      if (silver > 0) {
        console.log(`✅ Price via metals.live: $${silver}`);
        return { silver, gold: gold || null };
      }
    }

    console.warn('⚠️ All price sources failed. Using fallback.');
    return null;
  }

  /* ---- Init ---- */
  async function init() {
    // Serve from session cache instantly if still fresh
    const cached = getCache();
    if (cached?.silver > 0) {
      currentPrice = cached.silver;
      if (cached.gold) currentGoldPrice = cached.gold;
      isInitialized = true;
      notifyListeners();
      return currentPrice;
    }

    // Show fallback first so the UI isn't blank
    notifyListeners();

    const prices = await fetchPrice();
    if (prices?.silver > 0) {
      currentPrice = Math.round(prices.silver * 100) / 100;
      if (prices.gold) currentGoldPrice = Math.round(prices.gold * 100) / 100;
      setCache(currentPrice, currentGoldPrice);
    }

    isInitialized = true;
    notifyListeners();
    return currentPrice;
  }

  /* ---- Public API ---- */
  function getPrice()       { return customPrice !== null ? customPrice : currentPrice; }
  function getGoldPrice()   { return currentGoldPrice; }

  function getPriceInCurrency(currency) {
    return getPrice() * (CURRENCIES[currency] || CURRENCIES.USD).rate;
  }

  function formatInCurrency(usdValue, currency) {
    const cur = CURRENCIES[currency || activeCurrency] || CURRENCIES.USD;
    return cur.symbol + (usdValue * cur.rate).toFixed(2);
  }

  function setCustomPrice(price) { customPrice = price; notifyListeners(); }
  function clearCustomPrice()    { customPrice = null;  notifyListeners(); }
  function isCustom()            { return customPrice !== null; }

  function setCurrency(code) {
    if (CURRENCIES[code]) { activeCurrency = code; notifyListeners(); }
  }

  function getCurrency()           { return activeCurrency; }
  function getCurrencySymbol(code) { return (CURRENCIES[code || activeCurrency] || CURRENCIES.USD).symbol; }
  function getPricePerGram()       { return getPrice() / 31.1035; }
  function getPricePerKg()         { return getPrice() * (1000 / 31.1035); }
  function getPricePerDwt()        { return getPrice() / 20; }

  function onPriceUpdate(callback) {
    listeners.push(callback);
    if (isInitialized) callback(getPrice());
  }

  function notifyListeners() { listeners.forEach(fn => fn(getPrice())); }

  init();

  return {
    init, getPrice, getGoldPrice,
    getPriceInCurrency, formatInCurrency,
    setCustomPrice, clearCustomPrice, isCustom,
    setCurrency, getCurrency, getCurrencySymbol,
    getPricePerGram, getPricePerKg, getPricePerDwt,
    onPriceUpdate, CURRENCIES, FALLBACK_PRICE
  };
})();
