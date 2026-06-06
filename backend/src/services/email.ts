import { Resend } from 'resend';
import { config } from '../config';

interface EmailProvider {
  sendMagicLink(to: string, url: string): Promise<void>;
}

class ResendProvider implements EmailProvider {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async sendMagicLink(to: string, url: string): Promise<void> {
    await this.client.emails.send({
      from: config.email.from,
      to,
      subject: 'AGRON System Access',
      html: `
        <div style="font-family: monospace; color: #333;">
          <h2>AGRON | Secure Gateway</h2>
          <p>An access request was initiated for this identity.</p>
          <p>Click the link below to verify your session. This link expires in 15 minutes.</p>
          <a href="${url}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold;">AUTHENTICATE</a>
          <p style="margin-top: 24px; font-size: 12px; color: #666;">
            IP: Requesting access via Email Protocol.<br/>
            If you did not request this, ignore this transmission.
          </p>
        </div>
      `,
    });
  }
}

class ConsoleProvider implements EmailProvider {
  async sendMagicLink(to: string, url: string): Promise<void> {
    console.log('--- [DEV] EMAIL SIMULATION ---');
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: AGRON System Access`);
    console.log(`LINK: ${url}`);
    console.log('------------------------------');
  }
}

// Factory
export const emailService = config.email.apiKey 
  ? new ResendProvider(config.email.apiKey) 
  : new ConsoleProvider();