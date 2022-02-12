import { AppError } from './../common/appError';
import { CreateUserPayload } from './../../interfaces/user.interfaces';
import { AuthDal } from './auth.DAL';
import AuthEmail from './auth.email';

export class AuthService {
  constructor(
    private readonly authDal: AuthDal,
    private readonly authEmail: AuthEmail,
  ) {}

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

    await this.authDal.storeUser(input);

    await this.authEmail.verifyEmail(input.email, '1234');
  }
}
