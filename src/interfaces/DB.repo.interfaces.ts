import { UserProfile } from './../schema/user.schema';
import {
  CreateUserPayload,
  User,
  EditUserProfilePayload,
} from '../schema/user.schema';

export interface IAuthRepo {
  getUserByEmail(email: string): Promise<User>;
  createUser(user: CreateUserPayload): Promise<User>;
  getCodeByEmail(email: string): Promise<string>;
  setCodeByEmail(email: string, code: string): Promise<string>;
  deleteCodeByEmail(email: string): Promise<number>;
  activateUser(id: number): Promise<User>;
}

export interface IUserRepo {
  getUserById: (userId: number) => Promise<User>;
  updateUserById: (
    data: EditUserProfilePayload,
    userId: number,
  ) => Promise<UserProfile>;
  updateUserAvatar: (avatar: string, userid: number) => Promise<string>;
  getUserByUsername: (username: string) => Promise<UserProfile>;
}
