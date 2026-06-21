/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price

   Sources (in priority order):
   1. GoldAPI.io  — paid key
   2. Stooq.com   — free CSV, very reliable
   3. Yahoo Finance v8 — free, no key
   4. Yahoo Finance v7 — free fallback
   5. metals.live
   6. goldprice.org
   7. Hardcoded fallback
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=1800');

  const FALLBACK_SILVER    = 65.00;
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
      return { json: () => r.clone().json(), text: () => r.text(), ok: true };
    } catch (_) {
      clearTimeout(timer);
      return null;
    }
  }

  async function tryFetchJSON(url, options = {}, timeoutMs = 7000) {
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
    const [sData, gData] = await Promise.all([
      tryFetchJSON('https://www.goldapi.io/api/XAG/USD', {
        headers: { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' }
      }, 6000),
      tryFetchJSON('https://www.goldapi.io/api/XAU/USD', {
        headers: { 'x-access-token': GOLD_API_KEY, 'Content-Type': 'application/json' }
      }, 6000)
    ]);

    if (sData?.price > 1) {
      console.log(`✅ GoldAPI.io: Ag=$${sData.price}`);
      return res.status(200).json({
        silver:        Math.round(sData.price * 100) / 100,
        gold:          gData?.price ? Math.round(gData.price * 100) / 100 : FALLBACK_GOLD,
        platinum:      FALLBACK_PLATINUM,
        palladium:     FALLBACK_PALLADIUM,
        change:        sData.ch  ?? null,
        changePercent: sData.chp ?? null,
        prevClose:     sData.prev_close_price ?? null,
        source: 'goldapi',
        ts: Date.now()
      });
    }
  } catch (e) {
    console.error('[GoldAPI] ', e.message);
  }

  // ---- 2. Stooq.com (CSV — very reliable, no auth) ----
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
    const r = await fetch('https://stooq.com/q/l/?s=xagusd&f=sd2t2ohlcv&h&e=csv', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; price-checker/1.0)' },
      signal: ctrl.signal
    });
    clearTimeout(timer);

    if (r.ok) {
      const csv = await r.text();
      // CSV: Symbol,Date,Time,Open,High,Low,Close,Volume
      const lines = csv.trim().split('\n');
      if (lines.length >= 2) {
        const cols = lines[1].split(',');
        const close = parseFloat(cols[6]);
        const open  = parseFloat(cols[3]);
        if (close > 1 && close < 500) {
          console.log(`✅ Stooq: Ag=$${close}`);
          // Also try gold
          let goldPrice = FALLBACK_GOLD;
          try {
            const gCtrl = new AbortController();
            const gTimer = setTimeout(() => gCtrl.abort(), 5000);
            const gR = await fetch('https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv', {
              headers: { 'User-Agent': 'Mozilla/5.0' },
              signal: gCtrl.signal
            });
            clearTimeout(gTimer);
            if (gR.ok) {
              const gCsv = await gR.text();
              const gCols = gCsv.trim().split('\n')[1]?.split(',');
              const gClose = parseFloat(gCols?.[6]);
              if (gClose > 100) goldPrice = Math.round(gClose * 100) / 100;
            }
          } catch (_) {}

          const change = !isNaN(open) && open > 0 ? Math.round((close - open) * 100) / 100 : null;
          const changePct = !isNaN(open) && open > 0 ? Math.round(((close - open) / open * 100) * 100) / 100 : null;

          return res.status(200).json({
            silver:        Math.round(close * 100) / 100,
            gold:          goldPrice,
            platinum:      FALLBACK_PLATINUM,
            palladium:     FALLBACK_PALLADIUM,
            change,
            changePercent: changePct,
            prevClose:     !isNaN(open) && open > 0 ? Math.round(open * 100) / 100 : null,
            source: 'stooq',
            ts: Date.now()
          });
        }
      }
    }
  } catch (e) {
    console.error('[Stooq] ', e.message);
  }

  // ---- 3. Yahoo Finance v8 ----
  try {
    const yhData = await tryFetchJSON(
      'https://query1.finance.yahoo.com/v8/finance/chart/XAG=X?interval=1d&range=1d',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }
    );
    const meta = yhData?.chart?.result?.[0]?.meta;
    const silverPrice = meta?.regularMarketPrice ?? meta?.price;
    if (silverPrice > 1) {
      console.log(`✅ Yahoo v8: Ag=$${silverPrice}`);
      const prevClose = meta?.previousClose ?? meta?.chartPreviousClose ?? null;
      return res.status(200).json({
        silver:        Math.round(silverPrice * 100) / 100,
        gold:          FALLBACK_GOLD,
        platinum:      FALLBACK_PLATINUM,
        palladium:     FALLBACK_PALLADIUM,
        change:        prevClose ? Math.round((silverPrice - prevClose) * 100) / 100 : null,
        changePercent: prevClose ? Math.round(((silverPrice - prevClose) / prevClose * 100) * 100) / 100 : null,
        prevClose:     prevClose ? Math.round(prevClose * 100) / 100 : null,
        source: 'yahoo-v8',
        ts: Date.now()
      });
    }
  } catch (e) {
    console.error('[Yahoo v8] ', e.message);
  }

  // ---- 4. Yahoo Finance v7 ----
  try {
    const yhData = await tryFetchJSON(
      'https://query2.finance.yahoo.com/v7/finance/quote?symbols=XAG=X',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }
    );
    const quote = yhData?.quoteResponse?.result?.[0];
    const silverPrice = quote?.regularMarketPrice;
    if (silverPrice > 1) {
      console.log(`✅ Yahoo v7: Ag=$${silverPrice}`);
      const prevClose = quote?.regularMarketPreviousClose ?? null;
      return res.status(200).json({
        silver:        Math.round(silverPrice * 100) / 100,
        gold:          FALLBACK_GOLD,
        platinum:      FALLBACK_PLATINUM,
        palladium:     FALLBACK_PALLADIUM,
        change:        quote?.regularMarketChange ? Math.round(quote.regularMarketChange * 100) / 100 : null,
        changePercent: quote?.regularMarketChangePercent ? Math.round(quote.regularMarketChangePercent * 100) / 100 : null,
        prevClose:     prevClose ? Math.round(prevClose * 100) / 100 : null,
        source: 'yahoo-v7',
        ts: Date.now()
      });
    }
  } catch (e) {
    console.error('[Yahoo v7] ', e.message);
  }

  // ---- 5. metals.live ----
  for (const endpoint of ['https://metals.live/api/v1/spot', 'https://api.metals.live/v1/spot']) {
    try {
      const mlData = await tryFetchJSON(endpoint);
      if (mlData) {
        const spot   = Array.isArray(mlData) ? mlData[0] : mlData;
        const silver = spot?.silver ?? spot?.XAG ?? spot?.xag;
        const gold   = spot?.gold   ?? spot?.XAU ?? spot?.xau;
        if (silver > 1) {
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

  // ---- 6. goldprice.org ----
  try {
    const gpData = await tryFetchJSON(
      'https://data-asg.goldprice.org/dbXRates/USD',
      { headers: { 'Referer': 'https://www.goldprice.org/', 'User-Agent': 'Mozilla/5.0' } }
    );
    const item = gpData?.items?.[0];
    if (item?.xagPrice > 1) {
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

  // ---- 7. Hardcoded fallback ----
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
