/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price
   Fetches live silver + gold spot prices.
   Cached at Vercel Edge for 1 hour so all
   visitors share one API call, not one each.
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Cache at Vercel Edge CDN: fresh for 1 hour, serve stale for another hour
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=3600');

  const GOLD_API_KEY = 'goldapi-1230smo2lqnxm-io';
  const FALLBACK_SILVER = 31.25;  // Last-known good price (May 2026)
  const FALLBACK_GOLD = 2450.00;

  // ---- 1. goldprice.org (public endpoint, no key, highly reliable) ----
  try {
    const r = await fetch('https://data-asg.goldprice.org/dbXRates/USD', { signal: AbortSignal.timeout(6000) });
    if (r.ok) {
      const data = await r.json();
      const item = data?.items?.[0];
      if (item?.xagPrice > 0) {
        return res.status(200).json({
          silver: Math.round(item.xagPrice * 100) / 100,
          gold:   item.xauPrice ? Math.round(item.xauPrice * 100) / 100 : FALLBACK_GOLD,
          source: 'goldprice.org',
          ts: Date.now()
        });
      }
    }
  } catch (err) {
    console.error('[goldprice.org] Error:', err.message);
  }

  // ---- 2. metals.live (free, no key required) ----
  try {
    const r = await fetch('https://metals.live/api/v1/spot', { signal: AbortSignal.timeout(6000) });
    if (r.ok) {
      const data = await r.json();
      const spot = Array.isArray(data) ? data[0] : data;
      const silver = spot?.silver ?? spot?.XAG ?? spot?.xag ?? spot?.price?.silver;
      const gold   = spot?.gold   ?? spot?.XAU ?? spot?.xau ?? spot?.price?.gold;
      if (silver > 0) {
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

  // ---- 3. GoldAPI.io (auth key, use as fallback if others fail) ----
  try {
    const headers = { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' };
    const [sRes, gRes] = await Promise.all([
      fetch('https://www.goldapi.io/api/XAG/USD', { headers, signal: AbortSignal.timeout(6000) }),
      fetch('https://www.goldapi.io/api/XAU/USD', { headers, signal: AbortSignal.timeout(6000) })
    ]);
    if (sRes.ok && gRes.ok) {
      const [sData, gData] = await Promise.all([sRes.json(), gRes.json()]);
      if (sData.price > 0 && gData.price > 0) {
        return res.status(200).json({
          silver:        Math.round(sData.price * 100) / 100,
          gold:          Math.round(gData.price * 100) / 100,
          change:        sData.ch        != null ? Math.round(sData.ch  * 100) / 100 : null,
          changePercent: sData.chp       != null ? Math.round(sData.chp * 100) / 100 : null,
          prevClose:     sData.prev_close_price != null ? Math.round(sData.prev_close_price * 100) / 100 : null,
          source: 'goldapi.io',
          ts: Date.now()
        });
      }
    }
  } catch (err) {
    console.error('[goldapi.io] Error:', err.message);
  }

  // ---- 4. All live sources failed — return fallback ----
  return res.status(200).json({
    silver: FALLBACK_SILVER,
    gold: FALLBACK_GOLD,
    source: 'fallback',
    ts: Date.now(),
    note: 'Live sources unavailable, returning cached fallback. This is temporary.'
  });
};
