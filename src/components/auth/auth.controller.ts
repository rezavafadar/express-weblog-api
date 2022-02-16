import type { Request, Response } from 'express';

import { AppError } from '../common/appError';
import { AuthService } from './auth.service';
import authValidate from '../user/user.validation';

class AuthController {
  constructor(private readonly authService: AuthService) {}

  verify = async (req: Request, res: Response) => {
    const email = req.body.email;
    if (!email)
      throw new AppError(
        'Validation failed!',
        400,
        true,
        'Email is not defined!',
      );

    await this.authService.verifyEmail(email);

    res.status(201).json({
      message: 'verify successfull',
    });
  };

  verifyCode = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body.email || !body.code)
      throw new AppError(
        'Validation failed!',
        400,
        true,
        'Email or Code is not defined!',
      );

    await this.authService.verifyAccount(body.email, body.code);

    res.status(201).json({
      message: 'User registered!',
    });
  };
}

export default AuthController;
