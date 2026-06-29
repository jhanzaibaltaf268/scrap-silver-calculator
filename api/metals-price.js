export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const FALLBACK = { silver: 58.00, gold: 2395.00, platinum: 945.00, palladium: 925.00 };

  // Try multiple endpoints with proper error handling
  const endpoints = [
    'https://api.metals.live/v1/spot',
    'https://metals.live/api/v1/spot'
  ];

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const data = await response.json();
      if (!data) continue;

      const spot = Array.isArray(data) ? data[0] : data;
      const silver = spot?.silver ?? spot?.XAG ?? spot?.xag;
      const gold = spot?.gold ?? spot?.XAU ?? spot?.xau;

      if (silver && silver > 1) {
        console.log(`✅ metals.live: Ag=$${silver}`);
        return res.status(200).json({
          silver: Math.round(silver * 100) / 100,
          gold: gold ? Math.round(gold * 100) / 100 : FALLBACK.gold,
          platinum: spot?.platinum ?? FALLBACK.platinum,
          palladium: spot?.palladium ?? FALLBACK.palladium,
          source: 'metals.live',
          ts: Date.now()
        });
      }
    } catch (error) {
      console.error(`[metals.live ${endpoint}]`, error.message);
      continue;
    }
  }

  console.warn('⚠️ metals.live unavailable — using fallback');
  return res.status(200).json({ ...FALLBACK, source: 'fallback', ts: Date.now() });
}
