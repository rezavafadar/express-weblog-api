import type AuthDal from './auth.DAL';
import type AuthEmail from './auth.email';

export class AuthService {
  constructor(
    private readonly authDal: AuthDal,
    private readonly authEmail: AuthEmail,
  ) {}
}

export default AuthService;
