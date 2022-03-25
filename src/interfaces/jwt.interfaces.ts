import { userRole } from '../schema/user.schema';

export interface SignUserPayload {
  role: userRole;
  id: number;
  ext: number;
}
