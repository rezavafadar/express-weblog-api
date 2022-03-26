import { Request } from 'express';

export interface UserIDinRequest extends Request {
  userId: number;
}
