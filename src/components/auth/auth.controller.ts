import type { Request, Response } from 'express';

import { AppError } from '../../utils/appError';
import { AuthService } from './auth.service';
import Controller from '../../decorators/routing/controller.decorator';
import { Get } from '../../decorators/routing/handlers.decorator';

@Controller('/auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/test')
  test() {}
}

export default AuthController;
