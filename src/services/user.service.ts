import prisma from '../../prisma/prisma-client';
import { AppError } from '../model/error.model';

export class UserServices {
	static async checkUserUniques(username: string = '', email: string = '') {
		const user = await prisma.user.findUnique({
			where: {
				email,
				username,
			},
			select: {
				id: true,
			},
		});

		if (user) throw new AppError(403, 'has already been taken');
	}
}
