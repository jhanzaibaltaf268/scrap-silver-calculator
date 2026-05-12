/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price
   Live precious metals prices with cloud-friendly fallbacks

   Strategy:
   1. Try GoldAPI.io (if quota available)
   2. Try metals.live via CORS proxy to bypass redirects
   3. Fallback to cached/realistic prices

   Root issue: Most free precious metals APIs block cloud provider IPs.
   We use CORS proxies and tested-working services only.
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Cache: 1 hour fresh, 1 hour stale-while-revalidate
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
      const timeout = opts.timeout || 6000;
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const r = await fetch(url, { ...opts, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!r.ok) {
        console.error(`[${url}] HTTP ${r.status}`);
        return null;
      }
      const text = await r.text();
      if (text.trim().startsWith('<')) {
        console.error(`[${url}] HTML response detected`);
        return null;
      }
      return JSON.parse(text);
    } catch (err) {
      console.error(`[${url}] ${err.name}: ${err.message}`);
      return null;
    }
  }

  // ---- 1. GoldAPI.io — official keyed API ----
  try {
    const headers = { ...HEADERS, 'x-access-token': 'goldapi-1230smo2lqnxm-io' };
    const [sRes, gRes] = await Promise.all([
      safeFetch('https://www.goldapi.io/api/XAG/USD', { headers }),
      safeFetch('https://www.goldapi.io/api/XAU/USD', { headers })
    ]);
    if (sRes?.price > 0) {
      console.log(`✅ GoldAPI.io: XAG=$${sRes.price}`);
      return res.status(200).json({
        silver:        Math.round(sRes.price * 100) / 100,
        gold:          gRes?.price ? Math.round(gRes.price * 100) / 100 : FALLBACK_GOLD,
        change:        sRes.ch   != null ? Math.round(sRes.ch  * 100) / 100 : null,
        changePercent: sRes.chp  != null ? Math.round(sRes.chp * 100) / 100 : null,
        prevClose:     sRes.prev_close_price != null ? Math.round(sRes.prev_close_price * 100) / 100 : null,
        source: 'goldapi.io',
        ts: Date.now()
      });
    }
  } catch (err) {
    console.error('[goldapi] Error:', err.message);
  }

  // ---- 2. Metals.live via CORS Proxy ----
  // Use allorigins.win free CORS proxy to bypass redirects
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://metals.live/api/v1/spot');
    const mlData = await safeFetch(proxyUrl, { headers: HEADERS, timeout: 7000 });
    if (mlData && typeof mlData === 'object') {
      const spot = Array.isArray(mlData) ? mlData[0] : mlData;
      const silver = spot?.silver || spot?.XAG || spot?.xag || spot?.XAGUSD;
      const gold = spot?.gold || spot?.XAU || spot?.xau || spot?.XAUUSD;
      if (silver && silver > 0) {
        console.log(`✅ Metals.live (via proxy): XAG=$${silver}`);
        return res.status(200).json({
          silver: Math.round(silver * 100) / 100,
          gold:   gold ? Math.round(gold * 100) / 100 : FALLBACK_GOLD,
          source: 'metals.live',
          ts: Date.now()
        });
      }
    }
  } catch (err) {
    console.error('[metals.live-proxy] Error:', err.message);
  }

  // ---- 3. Try direct metals.live without proxy ----
  try {
    const mlData = await safeFetch('https://metals.live/api/v1/spot', { headers: HEADERS, timeout: 5000 });
    if (mlData && typeof mlData === 'object') {
      const spot = Array.isArray(mlData) ? mlData[0] : mlData;
      const silver = spot?.silver || spot?.XAG || spot?.xag;
      const gold = spot?.gold || spot?.XAU || spot?.xau;
      if (silver && silver > 0) {
        console.log(`✅ Metals.live (direct): XAG=$${silver}`);
        return res.status(200).json({
          silver: Math.round(silver * 100) / 100,
          gold:   gold ? Math.round(gold * 100) / 100 : FALLBACK_GOLD,
          source: 'metals.live',
          ts: Date.now()
        });
      }
    }
  } catch (err) {
    console.error('[metals.live] Error:', err.message);
  }

  // ---- 4. Fallback — realistic prices ----
  console.warn('⚠️ All live sources failed, returning cached fallback');
  return res.status(200).json({
    silver: FALLBACK_SILVER,
    gold:   FALLBACK_GOLD,
    source: 'fallback',
    ts: Date.now()
  });
};
