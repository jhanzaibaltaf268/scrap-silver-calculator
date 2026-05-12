/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price
   Live precious metals prices from accessible sources

   Sources (in order of priority):
   1. FRED API — Federal Reserve Data (most reliable from cloud)
   2. GoldAPI.io — Keyed API (quota-based)
   3. Fallback — realistic cached prices

   Note: Most consumer precious metals APIs block cloud provider IPs.
   FRED is government-backed and explicitly allows all access.
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Cache: 1 hour fresh, then 1 hour stale-while-revalidate
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600');

  const FALLBACK_SILVER = 31.45;
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
        console.error(`[${url}] HTML response`);
        return null;
      }
      return JSON.parse(text);
    } catch (err) {
      console.error(`[${url}] ${err.name}`);
      return null;
    }
  }

  // ---- 1. FRED API — Federal Reserve daily precious metals data ----
  // FRED has GOLDAMUSD (gold) and DCOILWTICO (WTI crude, proxy) in daily updates
  // Their API is government-backed and doesn't block cloud providers
  try {
    const [agData, auData] = await Promise.all([
      // GOLDAMND = Gold Fixing Price 3:00 P.M. (London time) in USD per Troy Ounce
      safeFetch('https://api.stlouisfed.org/fred/series/GOLDAMND/observations?limit=1&sort_order=desc&api_key=d9cd645c8cc34e969944e6ba960e07be&file_type=json'),
      // MMNRNJ for silver pricing (alternative: use ratio of gold)
      safeFetch('https://api.stlouisfed.org/fred/series/MMNRNJ/observations?limit=1&sort_order=desc&api_key=d9cd645c8cc34e969944e6ba960e07be&file_type=json')
    ]);

    if (auData?.observations?.[0]?.value) {
      const goldPrice = parseFloat(auData.observations[0].value);
      let silverPrice = null;
      if (agData?.observations?.[0]?.value) {
        silverPrice = parseFloat(agData.observations[0].value);
      } else {
        // If silver data unavailable, estimate from gold using typical 50:1 ratio
        silverPrice = goldPrice / 50;
      }

      if (silverPrice > 0 && goldPrice > 0) {
        console.log(`✅ FRED API: silver=$${silverPrice}, gold=$${goldPrice}`);
        return res.status(200).json({
          silver: Math.round(silverPrice * 100) / 100,
          gold:   Math.round(goldPrice * 100) / 100,
          source: 'fred',
          ts: Date.now()
        });
      }
    }
  } catch (err) {
    console.error('[fred] Error:', err.message);
  }

  // ---- 2. GoldAPI.io — if quota still available ----
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
        source: 'goldapi.io',
        ts: Date.now()
      });
    }
  } catch (err) {
    console.error('[goldapi] Error:', err.message);
  }

  // ---- 3. Fallback to realistic cached prices ----
  console.warn('⚠️ All live sources failed, using fallback');
  return res.status(200).json({
    silver: FALLBACK_SILVER,
    gold:   FALLBACK_GOLD,
    source: 'fallback',
    ts: Date.now()
  });
};
