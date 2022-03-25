import { IUserService } from './../../interfaces/services.interfaces';
import { Controller, Post } from '../../decorators/routing.decorator';
import { userProfileFiltering } from '../../mappers/body.mapper';
import isLogin from '../../middlewares/auth.middlewares';
import { Request, Response } from 'express';

@Controller('/user')
class UserController {
  constructor(private readonly userService: IUserService) {}

  @Post('/store', [isLogin])
  async storeUser(req: Request, res: Response) {
    const filteredData = userProfileFiltering(req.body);

    const result = await this.userService.storeUser(
      filteredData,
      req.body.userId,
    );

    res.status(200).json({ data: result });
  }
}

export default UserController;
