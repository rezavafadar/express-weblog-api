import { EmailConfig } from './../../interfaces/email.interfaces';
import nodemailer, { Transporter } from 'nodemailer';

class AuthEmail {
  private transport: Transporter;
  constructor(config: EmailConfig) {
    this.transport = nodemailer.createTransport(config);
  }

  verifyEmail(email: string, code: string) {
    return this.transport.sendMail({
      from: 'Virgol App',
      to: email,
      subject: 'Verfiy Email Code',
      text: code,
    });
  }
}

export default AuthEmail;
