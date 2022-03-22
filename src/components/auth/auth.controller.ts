import type { Request, Response } from 'express';

import type {
  IAuthService,
  IJwtService,
} from '../../interfaces/services.interfaces';

import { Controller, Get, Post } from '../../decorators/routing.decorator';

@Controller('/auth')
class AuthController {
  constructor(
    private readonly authService: IAuthService,
    private readonly jwtService: IJwtService,
  ) {}

  @Get('/exists-user')
  async checkExistenceUser(req: Request, res: Response) {
    const body = req.body;

    await this.authService.userExistence(body.type, body.email);

    res.status(200).json({ message: 'Successful!' });
  }

  @Post('/verify')
  async verify(req: Request, res: Response) {
    const body = req.body;

    const result = await this.authService.verify(body.email);

    res.status(200).json({
      message: 'Successful!',
      data: {
        user_email: result.email,
      },
    });
  }

  @Post('/verify/code')
  async verifyCode(req: Request, res: Response) {
    const body = req.body;

    const result = await this.authService.verifyCode(body.email, body.code);
    console.log(result);

    const token = this.jwtService.signUserToken({
      id: result.id,
      role: result.profile.role,
    });

    res.status(200).json({ message: 'Successfull!', data: result, token });
  }
}

export default AuthController;
