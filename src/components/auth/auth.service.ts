import type { AuthServicePayload } from '../../interfaces/services.interfaces';
import type EmailSender from '../../services/email/emailSender';
import type AuthDal from './auth.DAL';

import authValidators from './auth.validate';
import { ExceptionError } from '../../exception/exceptionError';
import { randomCodeGenerator } from '../../utils/randomCode';

export class AuthService implements AuthServicePayload {
  constructor(private authDal: AuthDal, private emailService: EmailSender) {}

  async userExistence(type: 'login' | 'register', email: string) {
    await authValidators.existenceUserValidation({ type, email });

    const { active } = await this.authDal.getUserByEmail(email);
    if (type === 'login' && active !== true)
      throw new ExceptionError('User exists', 422, 'User is Not Exists!');
    if (type === 'register' && active === true)
      throw new ExceptionError('User exists', 422, 'User is Exists!');
  }

  async verify(email: string) {
    await authValidators.verifyValidation(email);

    let user = await this.authDal.getUserByEmail(email);

    const isCodeExists = await this.authDal.getCodeByEmail(user.email);

    if (isCodeExists)
      throw new ExceptionError(
        'Code Exists!',
        401,
        'Your code is not expire! Please try again later.',
      );

    const code = randomCodeGenerator(5);

    await this.authDal.setCodeByEmail(email, code);

    if (!user) user = await this.authDal.createUser(email);

    this.emailService.sendVerifyCode(user.email, code);

    return user;
  }

  async verifyCode(email: string, code: string) {
    await authValidators.verifyCodeValidation({ email, code });

    const user = await this.authDal.getUserByEmail(email);

    if (!user)
      throw new ExceptionError('Authentication!', 401, 'User is not Exists!');

    const userCode = await this.authDal.getCodeByEmail(email);

    if (!userCode)
      throw new ExceptionError(
        'Unauthorized!',
        401,
        'Code is not define or expired!',
      );

    if (userCode !== code)
      throw new ExceptionError(
        'Unauthorized!',
        401,
        'Verify code is incorrect!',
      );

    await this.authDal.deleteCodeByEmail(email);

    return this.authDal.activateUser(user.id);
  }
}

export default AuthService;
