import { User, EditUserProfilePayload } from './../schema/user.schema';
import { SignUserPayload } from './jwt.interfaces';

export interface AuthServiceInteractor {
  userExistence: (type: string, email: string) => Promise<void>;
  verify: (email: string) => Promise<User>;
  verifyCode: (email: string, code: string) => Promise<User>;
}

export interface UserServiceInteractor {
  storeUser: (body: EditUserProfilePayload, userId: number) => Promise<void>;
}

export interface JwtServiceInteractor {
  signUserToken(payload: SignUserPayload): string;
}

export interface EmailServiceInteractor {
  sendVerifyCode(email: string, code: string): Promise<any>;
}
