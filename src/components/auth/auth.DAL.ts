import type { CreateUserPayload, User } from '../../schema/user.schema';

import prisma from '../../database/prisma-client';
import redisClient from '../../database/redis-client';
import { AuthRepoInteractor } from '../../interfaces/DBRepo.interfaces';

class AuthDal implements AuthRepoInteractor {
  getUserByEmail(email: string): Promise<User> {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async createUser(user: CreateUserPayload): Promise<User> {
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

  deleteCodeByEmail(email: string) {
    return redisClient.del(email);
  }

  activateUser(id: number): Promise<User> {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
  }
}

export default AuthDal;
