import { SignUserPayload } from './../../interfaces/jwt.interfaces';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

class JwtService {
  signUserToken(payload: SignUserPayload) {
    return jwt.sign(payload, JWT_SECRET);
  }
}

export default JwtService;
