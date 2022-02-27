import type { Request, Response } from 'express';
import type { AuthServicePayload } from '../../interfaces/services.interfaces';

import { Controller, Get, Post } from '../../decorators/routing.decorator';
import authValidators from './auth.validate';

@Controller('/auth')
class AuthController {
  constructor(private readonly authService: AuthServicePayload) {}

  @Get('/exists-user')
  async checkExistenceUser(req: Request, res: Response) {
    const body = req.body;

    await authValidators.existenceUserValidation(body);

    await this.authService.userExistence(body.type, body.email);

    res.status(200).json({ message: 'Successful!' });
  }

  @Post('/verify')
  async verify(req: Request, res: Response) {
    const body = req.body;

    await authValidators.verifyValidation(body);
  }
}

export default AuthController;
