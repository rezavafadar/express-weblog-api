import type { Transporter, SendMailOptions } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import nodemailer from 'nodemailer';
import { IEmailService } from '../interfaces/services.interfaces';

class EmailSender implements IEmailService {
  private readonly transport: Transporter;

  constructor(private readonly config: SMTPTransport.Options) {
    this.transport = nodemailer.createTransport(config);
  }

  async sendMail(options: SendMailOptions) {
    return this.transport
      .sendMail({ from: this.config.auth.user, ...options })
      .catch((e) => {
        console.log("email can't send!");
        console.log(e);
      });
  }
}

export default EmailSender;
