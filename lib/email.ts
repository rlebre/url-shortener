import Nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface ConfirmationEmailProps {
  toEmail: string;
  fullUrl: string;
  shortUrl: string;
  confirmationHash: string;
}

class EmailSender {
  private transporter;
  private template = `
        Dear user,<br/>
        <br/>

        We need to verify that you have requested a URL shortener for the following:<br/>
        <br/>

        URL to be shorten: <a href="[long-url]">[long-url]</a><br/>
        <br/>

        Shortened url: <a href="[short-url]">[short-url]</a><br/>
        <br/>

        To confirm, please click <a href="[confirmation-hash]">here</a>. Otherwise, please do not click in any of the links above!<br/>
        <br/>
        <br/>
        
        Best regards,<br/>
        <br/>
        URL Shortener Team<br/>
    `;

  constructor(template?: string) {
    template && (this.template = template);

    this.transporter = Nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +(process.env.MAIL_PORT || ''),
      secure: false,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendConfirmationEmail({
    toEmail,
    fullUrl,
    shortUrl,
    confirmationHash,
  }: ConfirmationEmailProps): Promise<SMTPTransport.SentMessageInfo> {
    const emailTemplate = this.template
      .replace(/\[long-url\]/g, fullUrl)
      .replace(/\[short-url\]/g, `${process.env.NEXT_PUBLIC}/l/${shortUrl}`)
      .replace(/\[confirmation-hash\]/g, `${process.env.NEXT_PUBLIC}/api/l/confirm/${confirmationHash}`);

    return this.transporter.sendMail({
      from: `Url Shortener <${process.env.MAIL_EMAIL}>`,
      to: toEmail,
      subject: 'URL Shortener request confirmation',
      html: emailTemplate,
    });
  }
}

export default EmailSender;
