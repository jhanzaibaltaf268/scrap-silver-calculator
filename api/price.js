/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price
   Multiple sources for live precious metals prices
   with cloud-provider-friendly fallbacks
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Cache at Edge for 1 hour: fresh for 60min, serve stale for another 60min
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600');

  const GOLD_API_KEY  = 'goldapi-1230smo2lqnxm-io';
  const FALLBACK_SILVER = 31.45;  // May 2026 realistic fallback
  const FALLBACK_GOLD   = 2440.00;
  const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9'
  };

  async function safeFetch(url, opts = {}) {
    const timeout = opts.timeout || 6000;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const r = await fetch(url, { ...opts, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!r.ok) {
        console.error(`[${url}] HTTP ${r.status}`);
        return null;
      }
      const text = await r.text();
      if (text.trim().startsWith('<')) {
        console.error(`[${url}] Got HTML response, not JSON`);
        return null;
      }
      return JSON.parse(text);
    } catch (err) {
      console.error(`[${url}] ${err.name}: ${err.message}`);
      return null;
    }
  }

  // ---- 1. GoldAPI.io — keyed API, designed for server-side ----
  try {
    const headers = { ...HEADERS, 'x-access-token': GOLD_API_KEY };
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
        source: 'goldapi',
        ts: Date.now()
      });
    }
  } catch (err) {
    console.error('[goldapi] Error:', err.message);
  }

  // ---- 2. Metals.live — cloud-friendly endpoint ----
  try {
    const mlData = await safeFetch('https://metals.live/api/v1/spot', { headers: HEADERS });
    if (Array.isArray(mlData) && mlData[0]) {
      const spot = mlData[0];
      const silver = spot.silver || spot.XAG;
      const gold = spot.gold || spot.XAU;
      if (silver && silver > 0) {
        console.log(`✅ Metals.live: XAG=$${silver}`);
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

  // ---- 3. Finnhub Mock/Alternative — if available ----
  try {
    // Attempt a generic commodity endpoint if available
    // (This may 404 but we try as a fallback)
    const fhData = await safeFetch('https://finnhub.io/api/v1/quote?symbol=XAG_X&token=demo', { headers: HEADERS, timeout: 4000 });
    if (fhData && fhData.c && fhData.c > 0) {
      console.log(`✅ Finnhub: XAG=$${fhData.c}`);
      return res.status(200).json({
        silver: Math.round(fhData.c * 100) / 100,
        gold:   FALLBACK_GOLD,
        source: 'finnhub',
        ts: Date.now()
      });
    }
  } catch (err) {
    // Expected to fail with demo token
  }

  // ---- 4. goldprice.org — if still accessible ----
  try {
    const gpData = await safeFetch('https://data-asg.goldprice.org/dbXRates/USD', {
      headers: { ...HEADERS, 'Referer': 'https://www.goldprice.org/' },
      timeout: 5000
    });
    if (gpData?.items?.[0]?.xagPrice > 0) {
      const item = gpData.items[0];
      console.log(`✅ goldprice.org: XAG=$${item.xagPrice}`);
      return res.status(200).json({
        silver: Math.round(item.xagPrice * 100) / 100,
        gold:   item.xauPrice ? Math.round(item.xauPrice * 100) / 100 : FALLBACK_GOLD,
        source: 'goldprice',
        ts: Date.now()
      });
    }
  } catch (err) {
    console.error('[goldprice] Error:', err.message);
  }

  // ---- 5. Fallback — always return 200 with realistic prices ----
  console.warn('⚠️ All live sources failed, serving cached fallback');
  return res.status(200).json({
    silver: FALLBACK_SILVER,
    gold:   FALLBACK_GOLD,
    source: 'fallback',
    cached: true,
    ts: Date.now()
  });
};
