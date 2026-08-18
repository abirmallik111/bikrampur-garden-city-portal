export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

/**
 * Sends a real email via Resend (handles both Vercel Serverless and Localhost Vite server).
 */
export async function sendRealEmailViaResend(options: SendEmailOptions): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...options,
        from: 'Bikrampur Garden City <onboarding@resend.dev>'
      })
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      console.warn('⚠️ Resend Email Error:', result.error);
      return { success: false, error: typeof result.error === 'string' ? result.error : JSON.stringify(result.error) };
    }

    console.log('✅ Real email delivered via Resend:', result.data);
    return { success: true, data: result.data };
  } catch (err: any) {
    console.error('❌ Error sending email via Resend:', err);
    return { success: false, error: err?.message || 'Network error sending email' };
  }
}
