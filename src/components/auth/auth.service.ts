import { authValidate } from './../validation/validator';
import { CreateUserPayload } from './../../interfaces/user.interface';
import  {UserService}  from './../user/user.service';
import { AppError } from '../error/AppError';


export class AuthService {
	constructor(private readonly userRepo:UserService){
	}

	async createUser(input: CreateUserPayload) {
		const userValidation = await authValidate(input);

		if (userValidation != null)
			throw new AppError('authentication',400,userValidation.message,true);

		await this.userRepo.checkUserUniques(input.username, input.email);
	}
}
