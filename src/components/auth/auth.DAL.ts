import { CreateUserPayload } from './../../interfaces/user.interfaces';
import prisma from '../../database/prisma-client';

export class AuthDal {
  async checkUserUniques(username: string = '', email: string = '') {
    const isUsername = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    const isEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (isEmail || isUsername) return true;
  }

  async storeUser(input: CreateUserPayload) {
    const data = { ...input, profile: { create: input.profile } };
    return prisma.user.create({
      data,
    });
  }
}
