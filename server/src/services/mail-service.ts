import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import dotenv from 'dotenv-safe';

dotenv.config();

class MailService {
  private readonly transporter: Mail<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendActivationMail(to: string, link: string): Promise<void> {
    const res = await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: '',
      html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
    });
    console.log(res);
  }
}

export default new MailService();
