import { AppError } from '../common/appError';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import authValidate from './auth.validation';

class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    const userValidation = await authValidate(req.body);

    if (userValidation !== null)
      throw new AppError('Validation', 400, true, userValidation.message);

    await this.authService.registerUser(req.body);

    res.status(201).json({
      message: 'successfull',
    });
  }
}

export default AuthController;
