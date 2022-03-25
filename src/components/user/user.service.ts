import { UserProfile } from './../../schema/user.schema';
import { IUserRepo } from './../../interfaces/DB.repo.interfaces';
import { ExceptionError } from './../../exception/exceptionError';
import { IUserService } from '../../interfaces/services.interfaces';
import { EditUserProfilePayload } from '../../schema/user.schema';
import userValidate from './user.validate';

class UserService implements IUserService {
  constructor(private readonly userRepo: IUserRepo) {}

  private async checkUsername(username: string): Promise<void> {
    const isUsernameExists = await this.userRepo.getUserByUsername(username);
    if (isUsernameExists)
      throw new ExceptionError('BadRequest', 401, 'Username is exists!');
  }

  async storeUser(
    body: EditUserProfilePayload,
    userId: number,
  ): Promise<UserProfile> {
    await userValidate.storeUserValidation(body);

    const user = await this.userRepo.getUserById(userId);
    if (!user || !user.active)
      throw new ExceptionError('Authentication', 401, 'User is not defined');

    if (body.role)
      throw new ExceptionError(
        'Sensitive Values!',
        400,
        'You have sensitive data in your data body',
      );

    if (body.username) await this.checkUsername(body.username);

    const modifiedUser = await this.userRepo.updateUserById(body, userId);

    return modifiedUser;
  }
}

export default UserService;
