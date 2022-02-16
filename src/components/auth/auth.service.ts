import { CreateVerifyPayload } from './../../interfaces/auth.interfaces';
import { AppError } from './../common/appError';
import { CreateUserPayload } from './../../interfaces/user.interfaces';
import type { AuthDal } from './auth.DAL';
import type AuthEmail from './auth.email';
import { randomStringGenerator } from '../../utils/randomStr';

export class AuthService {
  constructor(
    private readonly authDal: AuthDal,
    private readonly authEmail: AuthEmail,
  ) {}

  async verifyEmail(email: string): Promise<void> {
    return this.authDal.transaction(async (prisma) => {
      const checkEmail = await this.authDal.checkVerifyEmail(email);

      const code = randomStringGenerator(4);
      const verifyData: CreateVerifyPayload = {
        email,
        confirm_code: code,
        time_expire: new Date(Date.now() + 2 * 60 * 1000),
      };

      if (checkEmail == null) {
        await this.authDal.saveVerifyEmail(verifyData, prisma);
      } else {
        if (checkEmail && checkEmail.is_verify === true)
          throw new AppError(
            'Verify failed!',
            403,
            true,
            'Email is already verify!',
          );

        if (Date.now() < +checkEmail.time_expire)
          throw new AppError(
            'Time expire error!',
            401,
            true,
            'Please act later!',
          );

        await this.authDal.editVerifyCode(verifyData, prisma);
      }
      await this.authEmail.verifyEmail(email, code);
    });
  }

  async verifyAccount(email: string, code: string) {
    const verify = await this.authDal.checkVerifyEmail(email);

    if (verify == null)
      throw new AppError(
        'not verify',
        401,
        true,
        'You did not verify your email !',
      );

    if (verify.is_verify === true)
      throw new AppError(
        'Verify failed!',
        403,
        true,
        'Email is already verify!',
      );

    if (Date.now() > +verify.time_expire)
      throw new AppError('Time expire error!', 403, true, 'Please act later!');

    if (code !== verify.confirm_code)
      throw new AppError(
        'Verify failed!',
        403,
        true,
        'Verify code is not match to org code',
      );

    verify.is_verify = true;
    await this.authDal.editVerifyCode(verify);
    const user: CreateUserPayload = {
      email,
      username: email.split('@')[0],
    };

    return this.authDal.saveUser(user);
  }
}
