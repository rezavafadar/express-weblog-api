import { User } from '@prisma/client';
export interface CreateVerifyPayload {
  id?: number;
  email: string;
  confirm_code: string;
  time_expire: Date;
  verify?: boolean;
}

export type VerifyAccountType = 'login' | 'register' | 'modify';
