import { Router } from 'express';

import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDal } from './auth.DAL';
import wrapper from '../common/wrapper';
import AuthEmail from './auth.email';
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } from '../../config';

const authEmail = new AuthEmail({
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

const authController = new AuthController(
  new AuthService(new AuthDal(), authEmail),
);

const authRouter = Router();

authRouter.post('/verify', wrapper(authController.verify));
authRouter.post('/register', wrapper(authController.register));

export default authRouter;
