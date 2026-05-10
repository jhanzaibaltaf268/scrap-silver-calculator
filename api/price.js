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

  // ---- 1. GoldAPI.io (primary — has auth key, most accurate) ----
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
          silver: Math.round(sData.price * 100) / 100,
          gold:   Math.round(gData.price * 100) / 100,
          source: 'goldapi.io',
          ts: Date.now()
        });
      }
    }
  } catch (_) { /* fall through */ }

  // ---- 2. metals.live (free, no key required) ----
  try {
    const r = await fetch('https://metals.live/api/v1/spot', { signal: AbortSignal.timeout(6000) });
    if (r.ok) {
      const data = await r.json();
      const spot = Array.isArray(data) ? data[0] : data;
      const silver = spot?.silver ?? spot?.XAG ?? spot?.xag;
      const gold   = spot?.gold   ?? spot?.XAU ?? spot?.xau;
      if (silver > 0) {
        return res.status(200).json({
          silver: Math.round(silver * 100) / 100,
          gold:   gold ? Math.round(gold * 100) / 100 : null,
          source: 'metals.live',
          ts: Date.now()
        });
      }
    }
  } catch (_) { /* fall through */ }

  // ---- 3. goldprice.org (public endpoint, no key) ----
  try {
    const r = await fetch('https://data-asg.goldprice.org/dbXRates/USD', { signal: AbortSignal.timeout(6000) });
    if (r.ok) {
      const data = await r.json();
      const item = data?.items?.[0];
      if (item?.xagPrice > 0) {
        return res.status(200).json({
          silver: Math.round(item.xagPrice * 100) / 100,
          gold:   item.xauPrice ? Math.round(item.xauPrice * 100) / 100 : null,
          source: 'goldprice.org',
          ts: Date.now()
        });
      }
    }
  } catch (_) { /* fall through */ }

  // ---- 4. All sources failed ----
  return res.status(503).json({ error: 'All price sources unavailable. Please try again shortly.' });
};
