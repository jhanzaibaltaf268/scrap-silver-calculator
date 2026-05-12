/* ============================================
   VERCEL SERVERLESS FUNCTION — /api/price

   SOLUTION: Scrape Trading Economics for live silver prices
   Source: https://tradingeconomics.com/commodity/silver

   No API required, just parse the HTML page for current price
   ============================================ */

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Cache: 6 hours fresh, 6 hours stale-while-revalidate (prices change daily)
  res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=21600');

  const FALLBACK_SILVER = 83.68;  // May 12, 2026 last known price from Trading Economics
  const FALLBACK_GOLD = 2440.00;
  const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };

  // ---- 1. Scrape Trading Economics for live silver price ----
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res_data = await fetch('https://tradingeconomics.com/commodity/silver', {
      headers: HEADERS,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res_data.ok) {
      throw new Error(`HTTP ${res_data.status}`);
    }

    const html = await res_data.text();

    // Parse for price pattern: "Silver fell to 83.68 USD/t.oz"
    // or "Silver rose to X USD/t.oz" or similar patterns
    const priceMatch = html.match(/Silver\s+(?:fell|rose|dropped|traded|closed)\s+(?:to|at)\s+([\d.]+)\s+USD\/t\.oz/i);

    if (priceMatch && priceMatch[1]) {
      const silverPrice = parseFloat(priceMatch[1]);
      if (silverPrice > 0 && silverPrice < 500) {  // Sanity check
        console.log(`✅ Trading Economics: Silver = $${silverPrice}`);
        return res.status(200).json({
          silver: Math.round(silverPrice * 100) / 100,
          gold:   FALLBACK_GOLD,
          source: 'tradingeconomics.com',
          ts: Date.now()
        });
      }
    }

    // Alternative: Try to parse from the JSON-LD data
    const jsonMatch = html.match(/"last":([\d.]+)/);
    if (jsonMatch && jsonMatch[1]) {
      const silverPrice = parseFloat(jsonMatch[1]);
      if (silverPrice > 0 && silverPrice < 500) {
        console.log(`✅ Trading Economics (JSON): Silver = $${silverPrice}`);
        return res.status(200).json({
          silver: Math.round(silverPrice * 100) / 100,
          gold:   FALLBACK_GOLD,
          source: 'tradingeconomics.com',
          ts: Date.now()
        });
      }
    }

    console.warn('⚠️ Could not parse price from Trading Economics');
  } catch (err) {
    console.error(`[Trading Economics] Error: ${err.message}`);
  }

  // ---- 2. Fallback to last known price ----
  console.warn('⚠️ Using fallback price');
  return res.status(200).json({
    silver: FALLBACK_SILVER,
    gold:   FALLBACK_GOLD,
    source: 'fallback',
    ts: Date.now()
  });
};
