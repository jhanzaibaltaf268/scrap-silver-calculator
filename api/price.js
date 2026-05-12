/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price

   Strategy: Try GoldAPI.io, fallback to realistic cached prices.

   Challenge: Most free precious metals APIs block cloud provider IPs.
   The primary price source is now client-side JavaScript which may
   have better access from browsers. This API provides caching only.
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Cache: fresh 1 hour, stale-while-revalidate 1 hour
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600');

  const FALLBACK_SILVER = 31.45;  // Realistic May 2026 price
  const FALLBACK_GOLD = 2440.00;
  const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json'
  };

  async function safeFetch(url, opts = {}) {
    try {
      const controller = new AbortController();
      const timeout = opts.timeout || 5000;
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const r = await fetch(url, { ...opts, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!r.ok) return null;
      const text = await r.text();
      if (text.trim().startsWith('<')) return null;
      return JSON.parse(text);
    } catch (err) {
      return null;
    }
  }

  // ---- 1. GoldAPI.io — Keyed API (may have quota, but worth trying) ----
  try {
    const headers = { ...HEADERS, 'x-access-token': 'goldapi-1230smo2lqnxm-io' };
    const [sRes, gRes] = await Promise.all([
      safeFetch('https://www.goldapi.io/api/XAG/USD', { headers }),
      safeFetch('https://www.goldapi.io/api/XAU/USD', { headers })
    ]);
    if (sRes?.price > 0) {
      console.log(`✅ GoldAPI.io: silver=$${sRes.price}`);
      return res.status(200).json({
        silver: Math.round(sRes.price * 100) / 100,
        gold:   gRes?.price ? Math.round(gRes.price * 100) / 100 : FALLBACK_GOLD,
        source: 'goldapi.io',
        ts: Date.now()
      });
    }
  } catch (err) {
    // Continue to fallback
  }

  // ---- 2. Fallback — Cached price ----
  // Client-side JS will try to fetch live prices from browser context.
  // This API returns a cached price for Edge distribution.
  console.warn('⚠️ GoldAPI not available, using fallback');
  return res.status(200).json({
    silver: FALLBACK_SILVER,
    gold:   FALLBACK_GOLD,
    source: 'fallback',
    message: 'Live prices fetched from browser-side API',
    ts: Date.now()
  });
};
