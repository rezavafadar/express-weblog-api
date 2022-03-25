import { IJwtService } from '../interfaces/services.interfaces';
import { SignUserPayload } from '../interfaces/jwt.interfaces';
import jwt from 'jsonwebtoken';
import { ExceptionError } from '../exception/exceptionError';

class JwtService implements IJwtService {
  private secretKey: string;
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  signUserToken(payload: SignUserPayload) {
    return jwt.sign(payload, this.secretKey);
  }

  verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return payload;
    } catch (error) {
      console.log(error);
      throw new ExceptionError('Bad Request!', 400, 'Token is invalid!');
    }
  }

  verifyLoginToken(token: string) {
    const verifyToken: any = this.verifyToken(token);
    if (!verifyToken.id)
      new ExceptionError('Bad Request!', 400, 'Token is invalid!');
    return verifyToken;
  }
}

export default JwtService;
