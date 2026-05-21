const N8N_WEBHOOK = 'https://scrapsilvercalculator.app.n8n.cloud/webhook/silver-agent';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, sessionId } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message is required' });

  try {
    const n8nRes = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId: sessionId || 'anon' }),
    });

    if (!n8nRes.ok) {
      console.error('n8n error status:', n8nRes.status);
      return res.status(200).json({ reply: 'Sorry, the assistant is unavailable right now. Please try again.' });
    }

    const raw = await n8nRes.text();
    console.log('n8n raw response:', raw);

    let data;
    try { data = JSON.parse(raw); } catch { data = {}; }

    // n8n AI Agent outputs to data.output
    // Respond to Webhook node may place it in data.reply or data.response
    // Handle both array and object shapes n8n can return
    const payload = Array.isArray(data) ? data[0] : data;

    const reply =
      payload?.output ||
      payload?.reply ||
      payload?.response ||
      payload?.text ||
      payload?.answer ||
      payload?.generations?.[0]?.[0]?.text ||
      payload?.content?.[0]?.text ||
      null;

    if (reply) {
      return res.status(200).json({ reply });
    }

    // Detect "Respond Immediately" misconfiguration — n8n echoes input back
    if (payload?.message === message) {
      console.error('n8n is echoing input. Set webhook Response Mode to "Last Node" or "Respond to Webhook".');
      return res.status(200).json({
        reply: 'The assistant is being configured. Please check back shortly.',
      });
    }

    console.error('Could not extract reply. n8n response:', JSON.stringify(data));
    return res.status(200).json({ reply: 'I received your message but could not generate a response. Please try again.' });

  } catch (err) {
    console.error('silver-agent error:', err.message);
    return res.status(200).json({ reply: 'Sorry, I had a connection issue. Please try again!' });
  }
}
