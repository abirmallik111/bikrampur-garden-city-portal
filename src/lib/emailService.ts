export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Sends real email via SMTP endpoint (supports Vercel Serverless and Localhost Vite server).
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      console.warn('⚠️ SMTP Email Error:', result.error);
      return { success: false, error: typeof result.error === 'string' ? result.error : JSON.stringify(result.error) };
    }

    console.log('✅ Real email delivered via SMTP:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (err: any) {
    console.error('❌ Error sending email via SMTP:', err);
    return { success: false, error: err?.message || 'Network error sending email' };
  }
}
