import type { Request, Response } from 'express';
import type { AuthServicePayload } from '../../interfaces/services.interfaces';

import { Controller, Get, Post } from '../../decorators/routing.decorator';

@Controller('/auth')
class AuthController {
  constructor(private readonly authService: AuthServicePayload) {}

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
}

export default AuthController;
