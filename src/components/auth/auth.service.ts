import EmailSender from '../../services/email/emailSender';
import type { AuthServicePayload } from '../../interfaces/services.interfaces';
import AuthDal from './auth.DAL';

export class AuthService implements AuthServicePayload {
  constructor(private authDal: AuthDal, private emailService: EmailSender) {}
  verify() {}
}

export default AuthService;
