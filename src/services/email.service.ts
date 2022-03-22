import type { Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import nodemailer from 'nodemailer';
import { IEmailService } from '../interfaces/services.interfaces';

class EmailSender implements IEmailService {
  private readonly transport: Transporter;

  constructor(private readonly config: SMTPTransport.Options) {
    this.transport = nodemailer.createTransport(config);
  }

  async sendVerifyCode(email: string, code: string) {
    return this.transport
      .sendMail({
        subject: 'Virgool.io Clone App',
        from: this.config.auth.user,
        to: email,
        text: `
      Your verify code to login Virgool.io Clone :
      ${code}
      `,
      })
      .catch((e) => {
        console.log('Email Error: ', e);
      });
  }
}

export default EmailSender;
