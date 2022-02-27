import type { AuthServicePayload } from '../../interfaces/services.interfaces';
import type EmailSender from '../../services/email/emailSender';
import type AuthDal from './auth.DAL';

import { AppError } from '../../exception/appError';

export class AuthService implements AuthServicePayload {
  constructor(private authDal: AuthDal, private emailService: EmailSender) {}
  async verify() {}
  async userExistence(type: string, email: string) {
    const { active } = await this.authDal.getActivateUser(email);
    if (type === 'login' && active !== true)
      throw new AppError('User exists', 422, 'User is Not Exists!');
    if (type === 'register' && active === true)
      throw new AppError('User exists', 422, 'User is Exists!');
  }
}

export default AuthService;
