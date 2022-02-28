import { User } from './../schema/user.schema';
export interface AuthServicePayload {
  userExistence: (type: string, email: string) => Promise<void>;
  verify: (email: string) => Promise<User>;
  verifyCode: (email: string, code: string) => Promise<User>;
}
