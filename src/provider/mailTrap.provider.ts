import { MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USERNAME } from '@/config';
import { IMailProvider, IMessage } from '@/interfaces/mail.interface';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

class MailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'fafc41b4d145e2',
        pass: 'a1f9c6922e3280',
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}

export { MailProvider };
