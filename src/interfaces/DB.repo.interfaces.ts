import { CreateUserPayload, User } from '../schema/user.schema';

export interface IAuthRepo {
  getUserByEmail(email: string): Promise<User>;
  createUser(user: CreateUserPayload): Promise<User>;
  getCodeByEmail(email: string): Promise<string>;
  setCodeByEmail(email: string, code: string): Promise<string>;
  deleteCodeByEmail(email: string): Promise<number>;
  activateUser(id: number): Promise<User>;
}
