export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

/**
 * Sends a real email via the Vercel API endpoint connected to Resend.
 */
export async function sendRealEmailViaResend(options: SendEmailOptions): Promise<{ success: boolean; data?: any; error?: string }> {
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
      console.warn('Resend API warning:', result.error);
      return { success: false, error: result.error || 'Failed to send email' };
    }

    console.log('Real email sent via Resend:', result.data);
    return { success: true, data: result.data };
  } catch (err: any) {
    console.error('Error sending email via Resend:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}
