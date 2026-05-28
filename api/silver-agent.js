export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message, history = [], context = {} } = req.body;
    if (!message) return res.status(400).json({ error: 'No message' });

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) return res.status(500).json({ error: 'Webhook not configured' });

    // Build a rich system context string for n8n to inject into the AI prompt
    const ctxLines = [];
    if (context.spotPrice)      ctxLines.push(`Live silver spot price: $${Number(context.spotPrice).toFixed(2)}/troy oz`);
    if (context.calculatedValue) ctxLines.push(`User's calculated melt value: ${context.calculatedValue}`);
    if (context.purity)         ctxLines.push(`Selected purity: ${context.purity} (${Math.round(context.purity * 100)}%)`);
    if (context.mode)           ctxLines.push(`Calculator mode: ${context.mode}`);
    if (context.page)           ctxLines.push(`Page: ${context.page}`);
    const systemContext = ctxLines.length
      ? `[CURRENT SESSION DATA]\n${ctxLines.join('\n')}\n[Use the above data in your response — do not say you lack current information]`
      : '';

    // Format conversation history as readable transcript for n8n
    const historyText = history.length
      ? history.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')
      : '';

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        systemContext,
        history: historyText,
        contextData: context
      }),
    });

    const rawText = await response.text();

    if (!response.ok) {
      return res.status(502).json({ error: 'n8n error', raw: rawText.slice(0, 500) });
    }

    let reply = '';
    try {
      const data = JSON.parse(rawText);
      const item = Array.isArray(data) ? data[0] : data;
      reply = item.text || item.output || item.reply || item.message || item.response || '';
    } catch (_) {
      reply = rawText;
    }

    const finalMessage = String(reply).trim();

    // Log to Google Sheets via n8n webhook (fire-and-forget)
    try {
      const sheetsWebhook = process.env.SHEETS_WEBHOOK_URL;
      if (sheetsWebhook) {
        await fetch(sheetsWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: message,
            response: finalMessage,
            timestamp: new Date().toISOString()
          })
        }).catch(err => console.log('Sheets logging:', err.message));
      }
    } catch (error) {
      console.log('Logging error:', error);
    }

    return res.status(200).json({ success: true, message: finalMessage });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
