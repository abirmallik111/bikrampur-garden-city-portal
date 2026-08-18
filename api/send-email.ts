import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Handle CORS & Method check
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'RESEND_API_KEY variable is missing in environment.'
    });
  }

  const resend = new Resend(apiKey);

  try {
    const { to, subject, html, text, from } = req.body || {};

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html'
      });
    }

    const sender = from || process.env.RESEND_FROM_EMAIL || 'Bikrampur Garden City <onboarding@resend.dev>';

    const response = await resend.emails.send({
      from: sender,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: html || `<p>${text}</p>`,
      text: text
    });

    if (response.error) {
      return res.status(400).json({ success: false, error: response.error });
    }

    return res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Server error sending email'
    });
  }
}
