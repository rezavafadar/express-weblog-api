import AuthDal from './auth.DAL';
import AuthController from './auth.controller';
import AuthEmail from './auth.email';
import AuthService from './auth.service';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from '../../config';

const authEmail = new AuthEmail({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

const authController = new AuthController(
  new AuthService(new AuthDal(), authEmail),
);

export default authController;
