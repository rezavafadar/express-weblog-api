import { IUploadImgOptions } from './uploader.interfaces';
import { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { FormatEnum } from 'sharp';
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
  changeProfileImg: (
    userId: number,
    fileBuffer: Buffer,
    filename: string,
  ) => Promise<string>;
}

export interface IJwtService {
  signUserToken(payload: SignUserPayload): string;
}

export interface IEmailService {
  sendMail(options: SendMailOptions): Promise<SentMessageInfo>;
}

export interface IUploadService {
  uploadImg(
    dataBuffer: Buffer,
    filename: string,
    option: { format: keyof FormatEnum; options?: IUploadImgOptions },
  ): Promise<string>;
}
