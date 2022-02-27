import type { AuthServicePayload } from '../../interfaces/services.interfaces';
import type EmailSender from '../../services/email/emailSender';
import type AuthDal from './auth.DAL';

import { ExceptionError } from '../../exception/exceptionError';

export class AuthService implements AuthServicePayload {
  constructor(private authDal: AuthDal, private emailService: EmailSender) {}

  async verify(email: string) {
    const user = await this.authDal.getActivateUser(email)

    if(user && user.active ) throw new ()
  }

  async userExistence(type: string, email: string) {
    const { active } = await this.authDal.getActivateUser(email);
    if (type === 'login' && active !== true)
      throw new ExceptionError('User exists', 422, 'User is Not Exists!');
    if (type === 'register' && active === true)
      throw new ExceptionError('User exists', 422, 'User is Exists!');
  }
}

export default AuthService;
