import type { CreateUserPayload, User } from '../../schema/user.schema';

import prisma from '../../database/prisma-client';
import redisClient from '../../database/redis-client';
import { IAuthRepo } from '../../interfaces/DB.repo.interfaces';

class AuthRepo implements IAuthRepo {
  getUserByEmail(email: string): Promise<User> {
    return prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        profile: true,
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

export default AuthRepo;
