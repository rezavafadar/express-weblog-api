import { AppError } from '../error/AppError';
import prisma from '../../../prisma/prisma-client';

export class UserService {
	async checkUserUniques(username: string = '', email: string = '') {
		const user = await prisma.user.findUnique({
			where: {
				email,
				username,
			},
			select: {
				id: true,
			},
		});

		if (user) throw new AppError('failed!',403,'Already taken',true);
	}
}