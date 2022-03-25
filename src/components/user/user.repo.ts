import { EditUserProfilePayload } from './../../schema/user.schema';
import { User, UserProfile } from '../../schema/user.schema';
import prisma from '../../database/prisma-client';
import { IUserRepo } from './../../interfaces/DB.repo.interfaces';

class UserRepo implements IUserRepo {
  getUserById(userId: number): Promise<User> {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
  }

  async updateUserById(
    data: EditUserProfilePayload,
    userId: number,
  ): Promise<UserProfile> {
    return prisma.user_profile.update({
      where: {
        user_id: userId,
      },
      data,
      include: {
        user: {
          select: {
            email: true,
            active: true,
          },
        },
      },
    });
  }

  getUserByUsername(username: string): Promise<UserProfile> {
    return prisma.user_profile.findUnique({
      where: {
        username,
      },
    });
  }
}

export default UserRepo;
