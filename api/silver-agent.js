export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message' });

    // Use environment variable instead of hardcoded URL
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) return res.status(500).json({ error: 'Webhook not configured' });

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) return res.status(502).json({ error: 'Service error' });

    const data = await response.json();
    
    // Extract message correctly
    const reply = data.reply || data.message || data.output || '';

    return res.status(200).json({
      success: true,
      message: String(reply).trim()
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
