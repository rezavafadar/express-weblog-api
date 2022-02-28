import type { Request, Response } from 'express';
import type { AuthServicePayload } from '../../interfaces/services.interfaces';

import { Controller, Get, Post } from '../../decorators/routing.decorator';
import JwtService from '../../services/jwt/jwtservice';

@Controller('/auth')
class AuthController {
  constructor(
    private readonly authService: AuthServicePayload,
    private readonly jwtService: JwtService,
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

    const token = this.jwtService.signUserToken(result.id);

    res.status(200).json({ message: 'Successfull!', data: result, token });
  }
}

export default AuthController;
