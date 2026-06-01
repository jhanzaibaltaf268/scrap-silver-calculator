import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const zohoEmail    = process.env.ZOHO_EMAIL;
  const zohoPassword = process.env.ZOHO_APP_PASSWORD;

  if (!zohoEmail || !zohoPassword) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: { user: zohoEmail, pass: zohoPassword }
    });

    await transporter.sendMail({
      from: `"Scrap Silver Calculator" <${zohoEmail}>`,
      to: zohoEmail,
      subject: `New subscriber: ${email}`,
      text: `New email subscriber\n\nEmail: ${email}\nDate: ${new Date().toUTCString()}\nSource: scrapsilvercalculater.com`,
      html: `<p><strong>New email subscriber</strong></p>
             <p>Email: <a href="mailto:${email}">${email}</a></p>
             <p>Date: ${new Date().toUTCString()}</p>
             <p>Source: scrapsilvercalculater.com</p>`
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err.message);
    return res.status(500).json({ error: 'Failed to send — try again later' });
  }
}
