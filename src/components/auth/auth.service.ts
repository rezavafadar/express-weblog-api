import type { CreateUserPayload } from './../../schema/user.schema';
import type {
  IAuthService,
  IEmailService,
} from '../../interfaces/services.interfaces';
import type { IAuthRepo } from '../../interfaces/DB.repo.interfaces';

import authValidators from './auth.validate';
import { ExceptionError } from '../../exception/exceptionError';

export class AuthService implements IAuthService {
  constructor(
    private authRepo: IAuthRepo,
    private emailService: IEmailService,
  ) {}

  private randomCodeGenerator(num: number = 5) {
    const litters = '1326458790';
    let code: string = '';

    for (let i = 1; i <= num; i++) {
      const random = Math.floor(Math.random() * 10);
      code += litters[random];
    }

    return code;
  }

  async userExistence(type: 'login' | 'register', email: string) {
    await authValidators.existenceUserValidation({ type, email });

    const user = await this.authRepo.getUserByEmail(email);
    if (type === 'login' && (!user || !user.active))
      throw new ExceptionError('User exists', 422, 'User is Not Exists!');
    if (type === 'register' && user && user.active)
      throw new ExceptionError('User exists', 422, 'User is Exists!');
  }

  async verify(email: string) {
    await authValidators.verifyValidation(email);

    let user = await this.authRepo.getUserByEmail(email);

    if (user) {
      const isCodeExists = await this.authRepo.getCodeByEmail(user.email);

      if (isCodeExists)
        throw new ExceptionError(
          'Code Exists!',
          401,
          'Your code is not expire! Please try again later.',
        );
    }

    const code = this.randomCodeGenerator();

    await this.authRepo.setCodeByEmail(email, code);

    const newUser: CreateUserPayload = {
      email,
      profile: {
        create: {
          username: email.split('@')[0].slice(0, 5) + '_U',
        },
      },
    };
    if (!user) user = await this.authRepo.createUser(newUser);

    this.emailService.sendVerifyCode(user.email, code);

    return user;
  }

  async verifyCode(email: string, code: string) {
    await authValidators.verifyCodeValidation({ email, code });

    const user = await this.authRepo.getUserByEmail(email);

    if (!user)
      throw new ExceptionError('Authentication!', 401, 'User is not Exists!');

    const userCode = await this.authRepo.getCodeByEmail(email);

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

    await this.authRepo.deleteCodeByEmail(email);

    await this.authRepo.activateUser(user.id);

    return this.authRepo.getUserByEmail(email);
  }
}

export default AuthService;
