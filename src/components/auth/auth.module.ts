import AuthRepo from './auth.repo';
import AuthController from './auth.controller';
import AuthService from './auth.service';

import JwtService from '../../services/jwt.service';
import jobs from '../../jobs';

const authController = new AuthController(
  new AuthService(new AuthRepo(), jobs),
  new JwtService(),
);

export default authController;
