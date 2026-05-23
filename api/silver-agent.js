export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message' });

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) return res.status(500).json({ error: 'Webhook not configured' });

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    // Read as text first so we never crash on non-JSON
    const rawText = await response.text();

    if (!response.ok) {
      return res.status(502).json({ error: 'n8n error', raw: rawText.slice(0, 500) });
    }

    // Try JSON parse; fall back to raw text as the reply
    let reply = '';
    try {
      const data = JSON.parse(rawText);
      // n8n can return array or object
      const item = Array.isArray(data) ? data[0] : data;
      reply = item.output || item.reply || item.message || item.text || item.response || '';
      // If still empty, stringify the whole thing so we can see what came back
      if (!reply) reply = JSON.stringify(item);
    } catch (_) {
      reply = rawText;
    }

    return res.status(200).json({ success: true, message: String(reply).trim() });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
