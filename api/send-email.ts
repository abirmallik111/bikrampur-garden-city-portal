import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const smtpEmail = process.env.SMTP_EMAIL || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

  if (!smtpEmail || !smtpPass) {
    return res.status(400).json({
      success: false,
      error: 'SMTP_EMAIL and SMTP_PASSWORD are not configured in environment variables.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { to, subject, html, html_body, body_html, text, plain_text, preview_text } = body || {};

    const finalHtml = html || html_body || body_html || (text || plain_text || preview_text ? `<p>${text || plain_text || preview_text}</p>` : '');
    const finalText = text || plain_text || preview_text;

    if (!to || !subject || !finalHtml) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters (to, subject, html)'
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPass
      }
    });

    const info = await transporter.sendMail({
      from: `"Bikrampur Garden City" <${smtpEmail}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: subject,
      html: finalHtml,
      text: finalText
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Server error sending email via SMTP:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Server error sending email'
    });
  }
}
