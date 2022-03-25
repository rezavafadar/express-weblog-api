import { SendMailOptions, SentMessageInfo } from 'nodemailer';
import {
  User,
  EditUserProfilePayload,
  UserProfile,
} from './../schema/user.schema';
import { SignUserPayload } from './jwt.interfaces';

export interface IAuthService {
  userExistence: (type: string, email: string) => Promise<boolean>;
  verify: (email: string) => Promise<User>;
  verifyCode: (email: string, code: string) => Promise<User>;
}

export interface IUserService {
  storeUser: (
    body: EditUserProfilePayload,
    userId: number,
  ) => Promise<UserProfile>;
}

export interface IJwtService {
  signUserToken(payload: SignUserPayload): string;
}

export interface IEmailService {
  sendMail(options: SendMailOptions): Promise<SentMessageInfo>;
}
