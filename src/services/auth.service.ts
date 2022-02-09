import { userValidate } from './../validations/user.validation';
import { CreateUserPayload } from './../model/user.model';
import { AppError } from '../model/error.model';
import UserService from './user.service';

class AuthService {
	async createUser(input: CreateUserPayload) {
		const userValidation = await userValidate(input);

		if (userValidation != null)
			throw new AppError(403, 'User validation failed !');

		await UserService.checkUserUniques(input.username, input.email);
	}
}
