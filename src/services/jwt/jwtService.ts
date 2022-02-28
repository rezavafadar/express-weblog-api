import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

class JwtService {
  signUserToken(userID: number) {
    return jwt.sign({ userID }, JWT_SECRET);
  }
}

export default JwtService;
