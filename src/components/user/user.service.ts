import { ExceptionError } from './../../exception/exceptionError';
import { UserServiceInteractor } from '../../interfaces/services.interfaces';
import { EditUserProfilePayload } from '../../schema/user.schema';
import userValidate from './user.validate';

class UserService implements UserServiceInteractor {
  async storeUser(body: EditUserProfilePayload, userId: number) {
    await userValidate.storeUserValidation(body);

    if (body.role)
      throw new ExceptionError(
        'Unauthorized content',
        401,
        'You use Unauthorized content to requesr body!',
      );
  }
}

export default UserService;
