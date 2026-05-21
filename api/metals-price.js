export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.metals.live/v1/spot/silver');
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ silver: 28.50, error: 'Using fallback price' });
  }
}
