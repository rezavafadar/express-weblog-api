import AuthRepo from './auth.repo';
import AuthController from './auth.controller';
import AuthService from './auth.service';

import JwtService from '../../services/jwt.service';
import jobs from '../../jobs';
import { JWT_SECRET } from '../../config';

const authController = new AuthController(
  new AuthService(new AuthRepo(), jobs),
  new JwtService(JWT_SECRET),
);

export default authController;
