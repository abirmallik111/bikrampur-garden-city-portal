import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

function smtpDevPlugin(): Plugin {
  return {
    name: 'smtp-dev-plugin',
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
            const smtpEmail = process.env.SMTP_EMAIL || process.env.GMAIL_USER;
            const smtpPass = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

            if (!smtpEmail || !smtpPass) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: 'SMTP_EMAIL and SMTP_PASSWORD are not configured in .env file.'
              }));
              return;
            }

            const body = JSON.parse(bodyStr || '{}');
            const { to, subject, html, html_body, body_html, text, plain_text, preview_text } = body;

            const finalHtml = html || html_body || body_html || (text || plain_text || preview_text ? `<p>${text || plain_text || preview_text}</p>` : '');
            const finalText = text || plain_text || preview_text;

            if (!to || !subject || !finalHtml) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Missing required parameters (to, subject, html)' }));
              return;
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

            console.log('[SMTP Dev Plugin] ✅ Email delivered successfully via Gmail SMTP:', info.messageId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, messageId: info.messageId }));
          } catch (err: any) {
            console.error('[SMTP Dev Plugin] Server Error:', err);
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
    plugins: [react(), tailwindcss(), smtpDevPlugin()],
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
