import { Resend } from 'resend';

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

  const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'RESEND_API_KEY environment variable is missing on Vercel.'
    });
  }

  const resend = new Resend(apiKey);

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { to, subject, html, text, from } = body || {};

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: to, subject, and html are required.'
      });
    }

    // Force sender to onboarding@resend.dev unless custom verified domain is explicitly configured
    const sender = (from && from.includes('resend.dev')) 
      ? from 
      : (process.env.RESEND_FROM_EMAIL || 'Bikrampur Garden City <onboarding@resend.dev>');

    const response = await resend.emails.send({
      from: sender,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: html || `<p>${text}</p>`,
      text: text
    });

    if (response.error) {
      console.error('Resend API response error:', response.error);
      return res.status(400).json({ success: false, error: response.error.message || response.error });
    }

    return res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Server error in /api/send-email:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Server error sending email'
    });
  }
}
