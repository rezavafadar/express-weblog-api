import { CreateUserPayload } from './../model/user.model';
import yup, { SchemaOf } from 'yup';
import { ValidationError } from 'yup';

const userSchema: SchemaOf<CreateUserPayload> = yup.object().shape({
	email: yup
		.string()
		.required('Email is required!')
		.email('Email is incorrect!'),
	fullname: yup
		.string()
		.required('Fullname is required!')
		.min(5, 'Fullname must be more than 5 characters !')
		.max(25, 'Fullname must be less than 25 character!'),
	age: yup
		.number()
		.min(8, 'Age must be more than 8 number!')
		.max(90, 'Age must be less than 90 number !'),
	username: yup
		.string()
		.required('Username is required !')
		.min(6, 'Username must be more then 6 characters')
		.max(12, 'Username must be less than 12 characters !'),
	avatar: yup.string(),
	bio: yup.string().max(100, 'Bio must be less than 100 characters !'),
	gender: yup.mixed<'female' | 'man' | 'other'>(),
	role: yup.mixed<'admin' | 'user'>(),
	instagram_account: yup.string(),
	twitter_account: yup.string(),
});

export const userValidate = async (
	body: CreateUserPayload
): Promise<null | ValidationError> => {
	try {
		await userSchema.validate(body, { abortEarly: false });
		return null;
	} catch (error) {
		if (error instanceof ValidationError) return error;
	}
};
