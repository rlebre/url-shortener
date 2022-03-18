import sgMail from '@sendgrid/mail';

export interface ConfirmationEmailProps {
  toEmail: string;
  fullUrl: string;
  shortUrl: string;
  confirmationHash: string;
}

class EmailSender {
  private template = `
        Dear user,<br/>
        <br/>

        We need to verify that you have requested a URL shortener for the following:<br/>
        <br/>

        URL to be shortened: <a href="[long-url]">[long-url]</a><br/>
        <br/>

        Shortened URL: <a href="[short-url]">[short-url]</a><br/>
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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  sendConfirmationEmail({ toEmail, fullUrl, shortUrl, confirmationHash }: ConfirmationEmailProps) {
    const emailTemplate = this.template
      .replace(/\[long-url\]/g, fullUrl)
      .replace(/\[short-url\]/g, `${process.env.NEXT_PUBLIC}/l/${shortUrl}`)
      .replace(/\[confirmation-hash\]/g, `${process.env.NEXT_PUBLIC}/api/l/confirm/${confirmationHash}`);

    return sgMail.send({
      from: `Url Shortener <${process.env.MAIL_EMAIL}>`,
      to: toEmail,
      subject: 'URL Shortener request confirmation',
      html: emailTemplate,
    });
  }
}

export default EmailSender;
