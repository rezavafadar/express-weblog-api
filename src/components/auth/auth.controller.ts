import type { Request, Response } from 'express';

import { AppError } from '../common/appError';
import { AuthService } from './auth.service';
import authValidate from './auth.validation';

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

  register = async (req: Request, res: Response) => {
    const userValidation = await authValidate(req.body);

    if (userValidation !== null)
      throw new AppError('Validation', 400, true, userValidation.message);

    await this.authService.registerUser(req.body);

    res.status(201).json({
      message: 'successfull',
    });
  };
}

export default AuthController;
