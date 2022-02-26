import AuthDal from './auth.DAL';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import EmailSender from '../../services/email/emailSender';

const authController = new AuthController(
  new AuthService(new AuthDal(), new EmailSender()),
);

export default authController;
