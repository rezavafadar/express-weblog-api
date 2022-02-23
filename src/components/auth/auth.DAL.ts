import { VerifyAccountType } from './../../interfaces/auth.interfaces';
import { CreateUserPayload } from './../../interfaces/user.interfaces';
import prisma from '../../database/prisma-client';
import { User } from '@prisma/client';

class AuthDal {
  protected readonly email: string;
  protected readonly id: number;
  protected readonly username: string;
  protected readonly type: VerifyAccountType;

  // constructor(email: string, id?: number, username?: string) {
  //   this.email = email;
  //   this.id = id;
  //   this.username = username;
  // }

  async transaction(callback: (prisma: any) => Promise<any>) {
    return await prisma.$transaction(callback);
  }

  async saveUser(): Promise<User> {
    const user: CreateUserPayload = {
      email: this.email,
      username: this.email.split('@')[0],
    };
    return prisma.user.create({
      data: user,
    });
  }
}

export default AuthDal;
