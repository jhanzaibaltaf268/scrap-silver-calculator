/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price

   Sources (in priority order):
   1. GoldAPI.io  — paid key, most reliable
   2. Yahoo Finance — free, no key needed
   3. metals.live — free, no key needed
   4. goldprice.org — free, no key needed
   5. Hardcoded fallback
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=1800');

  const FALLBACK_SILVER    = 33.50;
  const FALLBACK_GOLD      = 3300.00;
  const FALLBACK_PLATINUM  = 1050.00;
  const FALLBACK_PALLADIUM = 980.00;

  const GOLD_API_KEY = 'goldapi-1230smo2lqnxm-io';

  async function tryFetch(url, options = {}, timeoutMs = 7000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const r = await fetch(url, { ...options, signal: ctrl.signal });
      clearTimeout(timer);
      if (!r.ok) return null;
      return await r.json();
    } catch (_) {
      clearTimeout(timer);
      return null;
    }
  }

  // ---- 1. GoldAPI.io ----
  try {
    const [sData, gData, ptData, pdData] = await Promise.all([
      tryFetch('https://www.goldapi.io/api/XAG/USD', { headers: { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' } }),
      tryFetch('https://www.goldapi.io/api/XAU/USD', { headers: { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' } }),
      tryFetch('https://www.goldapi.io/api/XPT/USD', { headers: { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' } }),
      tryFetch('https://www.goldapi.io/api/XPD/USD', { headers: { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' } })
    ]);

    if (sData?.price > 0) {
      console.log(`✅ GoldAPI.io: Ag=$${sData.price}`);
      return res.status(200).json({
        silver:    Math.round(sData.price * 100) / 100,
        gold:      gData?.price     ? Math.round(gData.price * 100) / 100     : FALLBACK_GOLD,
        platinum:  ptData?.price    ? Math.round(ptData.price * 100) / 100    : FALLBACK_PLATINUM,
        palladium: pdData?.price    ? Math.round(pdData.price * 100) / 100    : FALLBACK_PALLADIUM,
        change:        sData.ch     ?? null,
        changePercent: sData.chp    ?? null,
        prevClose:     sData.prev_close_price ?? null,
        source: 'goldapi',
        ts: Date.now()
      });
    }
  } catch (e) {
    console.error('[GoldAPI] ', e.message);
  }

  // ---- 2. Yahoo Finance ----
  try {
    const yhData = await tryFetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/XAG=X?interval=1d&range=1d',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const meta = yhData?.chart?.result?.[0]?.meta;
    const silverPrice = meta?.regularMarketPrice ?? meta?.price;
    if (silverPrice > 0) {
      console.log(`✅ Yahoo Finance: Ag=$${silverPrice}`);
      const prevClose = meta?.previousClose ?? meta?.chartPreviousClose ?? null;
      return res.status(200).json({
        silver:    Math.round(silverPrice * 100) / 100,
        gold:      FALLBACK_GOLD,
        platinum:  FALLBACK_PLATINUM,
        palladium: FALLBACK_PALLADIUM,
        change:        prevClose ? Math.round((silverPrice - prevClose) * 100) / 100 : null,
        changePercent: prevClose ? Math.round(((silverPrice - prevClose) / prevClose * 100) * 100) / 100 : null,
        prevClose:     prevClose ? Math.round(prevClose * 100) / 100 : null,
        source: 'yahoo',
        ts: Date.now()
      });
    }
  } catch (e) {
    console.error('[Yahoo] ', e.message);
  }

  // ---- 3. metals.live ----
  for (const endpoint of [
    'https://metals.live/api/v1/spot',
    'https://api.metals.live/v1/spot'
  ]) {
    try {
      const mlData = await tryFetch(endpoint);
      if (mlData) {
        const spot   = Array.isArray(mlData) ? mlData[0] : mlData;
        const silver = spot?.silver ?? spot?.XAG ?? spot?.xag;
        const gold   = spot?.gold   ?? spot?.XAU ?? spot?.xau;
        if (silver > 0) {
          console.log(`✅ metals.live: Ag=$${silver}`);
          return res.status(200).json({
            silver:    Math.round(silver * 100) / 100,
            gold:      gold ? Math.round(gold * 100) / 100 : FALLBACK_GOLD,
            platinum:  FALLBACK_PLATINUM,
            palladium: FALLBACK_PALLADIUM,
            source: 'metals.live',
            ts: Date.now()
          });
        }
      }
    } catch (e) {
      console.error('[metals.live] ', e.message);
    }
  }

  // ---- 4. goldprice.org ----
  try {
    const gpData = await tryFetch(
      'https://data-asg.goldprice.org/dbXRates/USD',
      { headers: { 'Referer': 'https://www.goldprice.org/', 'User-Agent': 'Mozilla/5.0' } }
    );
    const item = gpData?.items?.[0];
    if (item?.xagPrice > 0) {
      console.log(`✅ goldprice.org: Ag=$${item.xagPrice}`);
      return res.status(200).json({
        silver:    Math.round(item.xagPrice * 100) / 100,
        gold:      item.xauPrice ? Math.round(item.xauPrice * 100) / 100 : FALLBACK_GOLD,
        platinum:  FALLBACK_PLATINUM,
        palladium: FALLBACK_PALLADIUM,
        source: 'goldprice.org',
        ts: Date.now()
      });
    }
  } catch (e) {
    console.error('[goldprice.org] ', e.message);
  }

  // ---- 5. Hardcoded fallback ----
  console.warn('⚠️ All price sources failed — using fallback');
  return res.status(200).json({
    silver:    FALLBACK_SILVER,
    gold:      FALLBACK_GOLD,
    platinum:  FALLBACK_PLATINUM,
    palladium: FALLBACK_PALLADIUM,
    source: 'fallback',
    ts: Date.now()
  });
};
