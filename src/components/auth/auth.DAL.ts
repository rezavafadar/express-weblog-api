import type { CreateUserPayload } from '../../schema/user.schema';

import prisma from '../../database/prisma-client';
import redisClient from '../../database/redis-client';

class AuthDal {
  getActivateUser(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async createUser(email: string) {
    const user: CreateUserPayload = {
      email,
      username: email.split('@')[0] + '_U',
    };
    return prisma.user.create({
      data: user,
    });
  }

  getCodeByEmail(email: string) {
    return redisClient.get(email);
  }

  setCodeByEmail(email: string, code: string) {
    return redisClient.setEx(email, 300, code);
  }
}

export default AuthDal;
