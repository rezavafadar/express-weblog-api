import { User } from './../schema/user.schema';
export interface AuthServicePayload {
  verify: (email: string) => Promise<User>;
  userExistence: (type: string, email: string) => Promise<void>;
}
