import prisma from '../../database/prisma-client';

class AuthDal {
  getActivateUser(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        active: true,
      },
    });
  }
}

export default AuthDal;
