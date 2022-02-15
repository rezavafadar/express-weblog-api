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

  async verifyEmail(email: string): Promise<any> {
    return this.authDal.transaction(async (prisma) => {
      const checkEmail = await this.authDal.checkVerifyEmail(email);

      const code = randomStringGenerator(4);
      const verifyData: CreateVerifyPayload = {
        email,
        confirm_code: code,
        time_expire: new Date(Date.now() + 2 * 60 * 1000),
      };
      console.log(checkEmail);

      if (checkEmail == null) {
        await this.authDal.saveVerifyEmail(verifyData, prisma);
      } else {
        if (checkEmail && checkEmail.verify === true)
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

  async registerUser(input: CreateUserPayload): Promise<void> {
    const checkUser = await this.authDal.checkUserUniques(
      input.username,
      input.email,
    );

    if (checkUser)
      throw new AppError(
        'registered unsuccessfull!',
        401,
        true,
        'Already taken',
      );

    await this.authDal.saveUser(input);
  }
}
