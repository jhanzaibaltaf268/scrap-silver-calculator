/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price
   Sources (in order of reliability from Vercel):
   1. Yahoo Finance (XAG=X) — no key, server-friendly
   2. GoldAPI.io — keyed, server-designed
   3. goldprice.org — public, with browser UA
   4. Hardcoded fallback (always returns 200)
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Cache at Vercel Edge CDN: fresh for 1 hour, serve stale for another hour
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=3600');

  const GOLD_API_KEY  = 'goldapi-1230smo2lqnxm-io';
  const FALLBACK_SILVER = 31.25;
  const FALLBACK_GOLD   = 2450.00;
  const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

  async function safeFetch(url, opts = {}) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(7000), ...opts });
      if (!r.ok) {
        console.error(`[${url}] HTTP ${r.status}`);
        return null;
      }
      const text = await r.text();
      // Guard against HTML error pages returned as 200
      if (text.trim().startsWith('<')) {
        console.error(`[${url}] Returned HTML instead of JSON`);
        return null;
      }
      return JSON.parse(text);
    } catch (err) {
      console.error(`[${url}] Error: ${err.message}`);
      return null;
    }
  }

  // ---- 1. Yahoo Finance — no key, works reliably from Vercel/AWS ----
  try {
    const [sData, gData] = await Promise.all([
      safeFetch('https://query1.finance.yahoo.com/v8/finance/chart/XAG=X?interval=1d&range=1d', {
        headers: { 'User-Agent': BROWSER_UA, 'Accept': 'application/json' }
      }),
      safeFetch('https://query1.finance.yahoo.com/v8/finance/chart/XAU=X?interval=1d&range=1d', {
        headers: { 'User-Agent': BROWSER_UA, 'Accept': 'application/json' }
      })
    ]);
    const silver = sData?.chart?.result?.[0]?.meta?.regularMarketPrice;
    const gold   = gData?.chart?.result?.[0]?.meta?.regularMarketPrice;
    if (silver > 0) {
      console.log(`✅ Yahoo Finance: silver=$${silver}`);
      return res.status(200).json({
        silver: Math.round(silver * 100) / 100,
        gold:   gold ? Math.round(gold * 100) / 100 : FALLBACK_GOLD,
        source: 'yahoo-finance',
        ts: Date.now()
      });
    }
  } catch (err) {
    console.error('[yahoo-finance] Error:', err.message);
  }

  // ---- 2. GoldAPI.io — designed for server-side, keyed ----
  try {
    const headers = { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json', 'User-Agent': BROWSER_UA };
    const [sRes, gRes] = await Promise.all([
      safeFetch('https://www.goldapi.io/api/XAG/USD', { headers }),
      safeFetch('https://www.goldapi.io/api/XAU/USD', { headers })
    ]);
    if (sRes?.price > 0) {
      console.log(`✅ GoldAPI.io: silver=$${sRes.price}`);
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
    console.error('[goldapi.io] Error:', err.message);
  }

  // ---- 3. goldprice.org — public, last attempt ----
  const gpData = await safeFetch('https://data-asg.goldprice.org/dbXRates/USD', {
    headers: { 'User-Agent': BROWSER_UA, 'Referer': 'https://www.goldprice.org/' }
  });
  const item = gpData?.items?.[0];
  if (item?.xagPrice > 0) {
    console.log(`✅ goldprice.org: silver=$${item.xagPrice}`);
    return res.status(200).json({
      silver: Math.round(item.xagPrice * 100) / 100,
      gold:   item.xauPrice ? Math.round(item.xauPrice * 100) / 100 : FALLBACK_GOLD,
      source: 'goldprice.org',
      ts: Date.now()
    });
  }

  // ---- 4. All sources failed — always return 200 with fallback ----
  console.warn('⚠️ All price sources failed — serving fallback price');
  return res.status(200).json({
    silver: FALLBACK_SILVER,
    gold:   FALLBACK_GOLD,
    source: 'fallback',
    ts: Date.now()
  });
};
