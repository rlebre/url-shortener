import Nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface ConfirmationEmailProps {
  toEmail: string;
  longLink: string;
  shortLink: string;
  confirmationHash: string;
}

class EmailSender {
  private transporter;
  private template = `
        Dear user,<br/>
        <br/>

        We need to verify that you have requested a URL shortener for the following:<br/>
        <br/>

        URL to be shorten: <a href="[long-link]">[long-link]</a><br/>
        <br/>

        Shortened link: <a href="[short-link]">[short-link]</a><br/>
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
    longLink,
    shortLink,
    confirmationHash,
  }: ConfirmationEmailProps): Promise<SMTPTransport.SentMessageInfo> {
    const emailTemplate = this.template
      .replace(/\[long-link\]/g, longLink)
      .replace(/\[short-link\]/g, `${process.env.NEXT_PUBLIC}/l/${shortLink}`)
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
