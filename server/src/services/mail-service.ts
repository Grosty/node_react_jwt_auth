import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import config from '@src/config';

class MailService {
  private readonly transporter: Mail<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    } as SMTPTransport.Options);
  }

  async sendActivationMail(to: string, link: string): Promise<void> {
    const res = await this.transporter.sendMail({
      from: config.smtp.user,
      to,
      subject: `Активация аккаунта на ${config.app.api_uri}`,
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
