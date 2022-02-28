import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import AuthDal from './auth.DAL';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import EmailSender from '../../services/email/emailSender';
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_USER,
} from '../../config/index';
import JwtService from '../../services/jwt/jwtservice';

const mailerOption: SMTPTransport.Options = {
  host: EMAIL_HOST,
  port: +EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};

const authController = new AuthController(
  new AuthService(new AuthDal(), new EmailSender(mailerOption)),
  new JwtService(),
);

export default authController;
