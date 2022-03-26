import type { Response } from 'express';

import { PORT } from './../../config/index';
import { UserIDinRequest } from './../../interfaces/express.interfaces';
import { IUserService } from './../../interfaces/services.interfaces';
import { Controller, Post } from '../../decorators/routing.decorator';
import { userProfileFiltering } from '../../mappers/body.mapper';
import UploadMiddlewares from '../../middlewares/upload.middlewares';
import AuthMiddlewares from '../../middlewares/auth.middlewares';

@Controller('/user')
class UserController {
  constructor(private readonly userService: IUserService) {}

  @Post('/store', [AuthMiddlewares.isLogin])
  async storeUser(req: UserIDinRequest, res: Response) {
    const filteredData = userProfileFiltering(req.body);

    const result = await this.userService.storeUser(filteredData, req.userId);

    res.status(200).json({ message: 'successful!', data: result });
  }

  @Post('/profile-img', [
    AuthMiddlewares.isLogin,
    UploadMiddlewares.uploadSingleImg('photo'),
  ])
  async changeProfile(req: UserIDinRequest, res: Response) {
    const result = await this.userService.changeProfileImg(
      req.userId,
      req.file?.buffer,
      req.file?.filename,
    );

    res.status(200).json({
      message: 'successful!',
      data: `http://${req.hostname}:${PORT}/${result}`,
    });
  }
}

export default UserController;
