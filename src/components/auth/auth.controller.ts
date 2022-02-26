import type { Request, Response } from 'express';

import { Controller, Post } from '../../decorators/routing.decorator';
import type { AuthServicePayload } from '../../interfaces/services.interfaces';

@Controller('/auth')
class AuthController {
  constructor(private readonly authService: AuthServicePayload) {}

  @Post('/verify')
  async verify(req: Request, res: Response) {
    console.log(req.body);
    res.status(400).json({ msg: 'ok' });
  }
}

export default AuthController;
