import { PrismaClient } from '@prisma/client';

import { CreateVerifyPayload } from './../../interfaces/auth.interfaces';
import { CreateUserPayload } from './../../interfaces/user.interfaces';
import prisma from '../../database/prisma-client';

export class AuthDal {
  async transaction(callback: (prisma: any) => Promise<any>) {
    return await prisma.$transaction(callback);
  }
  async editVerifyCode(data: CreateVerifyPayload, transaction?: PrismaClient) {
    const client = transaction ? transaction : prisma;
    return client.verify.update({
      data: {
        confirm_code: data.confirm_code,
        time_expire: data.time_expire,
        is_verify: data.verify || false,
      },
      where: {
        email: data.email,
      },
    });
  }

  async saveVerifyEmail(data: CreateVerifyPayload, transaction?: PrismaClient) {
    const client = transaction ? transaction : prisma;
    return client.verify.create({
      data,
    });
  }

  async checkVerifyEmail(email: string) {
    return prisma.verify.findFirst({
      where: {
        email,
      },
    });
  }

  async saveUser(input: CreateUserPayload) {
    const data = { ...input, profile: { create: input.profile } };
    return prisma.user.create({
      data,
    });
  }
}
