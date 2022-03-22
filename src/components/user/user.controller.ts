import { IUserService } from './../../interfaces/services.interfaces';
import { Controller, Post } from '../../decorators/routing.decorator';
import { storeUserFiltering } from '../../mappers/body.mapper';

@Controller('/user')
class UserController {
  constructor(private readonly userService: IUserService) {}

  @Post('/store')
  async storeUser(req: Request, res: Response) {
    const filteredData = storeUserFiltering(req.body);

    await this.userService.storeUser(filteredData, 123);
  }
}

export default UserController;
