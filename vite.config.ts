import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

function resendDevPlugin(): Plugin {
  return {
    name: 'resend-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => { bodyStr += chunk; });
        req.on('end', async () => {
          try {
            const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
            if (!apiKey) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: 'RESEND_API_KEY is missing in your .env file or environment variables.'
              }));
              return;
            }

            const body = JSON.parse(bodyStr || '{}');
            const { to, subject, html, html_body, body_html, text, plain_text, preview_text, from } = body;

            const finalHtml = html || html_body || body_html || (text || plain_text || preview_text ? `<p>${text || plain_text || preview_text}</p>` : '');
            const finalText = text || plain_text || preview_text;

            if (!to || !subject || !finalHtml) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Missing required parameters (to, subject, html)' }));
              return;
            }

            const resend = new Resend(apiKey);
            const sender = (from && from.includes('resend.dev'))
              ? from
              : (process.env.RESEND_FROM_EMAIL || 'Bikrampur Garden City <onboarding@resend.dev>');

            const response = await resend.emails.send({
              from: sender,
              to: Array.isArray(to) ? to : [to],
              subject: subject,
              html: finalHtml,
              text: finalText
            });

            if (response.error) {
              console.error('[Resend Dev Plugin] Resend Error:', response.error);
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: response.error.message || response.error }));
              return;
            }

            console.log('[Resend Dev Plugin] ✅ Real email sent via Resend:', response.data);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, data: response.data }));
          } catch (err: any) {
            console.error('[Resend Dev Plugin] Server Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message || 'Server error' }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), resendDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
