import { UserIDinRequest } from './../interfaces/express.interfaces';
import { ExceptionError } from './../exception/exceptionError';
import { NextFunction, Response } from 'express';
import JwtService from '../services/jwt.service';
import { JWT_SECRET } from '../config';

class AuthMiddlewares {
  static isLogin(req: UserIDinRequest, res: Response, next: NextFunction) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    )
      throw new ExceptionError('Authentication', 401, 'You are not login');

    const token: string = req.headers.authorization.split(' ')[1];

    const verifyToken: any = new JwtService(JWT_SECRET).verifyLoginToken(token);

    if (Date.now() > verifyToken.ext)
      throw new ExceptionError('Authentication', 401, 'Token is expired');

    req.userId = verifyToken.id;
    next();
  }
}

export default AuthMiddlewares;
