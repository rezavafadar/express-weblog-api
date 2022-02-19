import type { Request, Response } from 'express';

import { AppError } from '../common/appError';
import { AuthService } from './auth.service';
import { signToken } from '../../utils/jwt';

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

    await this.authService.verifyAccount(email);

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

    const user = await this.authService.registerUser(body.email, body.code);

    const token = signToken({ id: user.id });

    res.status(201).json({
      message: 'User registered!',
      token,
    });
  };
}

export default AuthController;
