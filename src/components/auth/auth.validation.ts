import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import type { CreateUserPayload } from '../../interfaces/user.interfaces';

export const authValidationSchema: SchemaOf<CreateUserPayload> = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Email is required!')
      .email('Email is incorrect!'),
    fullname: yup
      .string()
      .min(5, 'Fullname must be more than 5 characters !')
      .max(25, 'Fullname must be less than 25 character!'),
    username: yup
      .string()
      .required('Username is required !')
      .min(6, 'Username must be more then 6 characters')
      .max(12, 'Username must be less than 12 characters !'),
    role: yup.mixed<'admin' | 'user'>(),
    profile: yup.object().shape({
      age: yup
        .number()
        .min(8, 'Age must be more than 8 number!')
        .max(90, 'Age must be less than 90 number !'),

      avatar: yup.string(),
      bio: yup.string().max(100, 'Bio must be less than 100 characters !'),
      gender: yup.mixed<'female' | 'man' | 'other'>(),
      instagram_account: yup.string(),
      twitter_account: yup.string(),
    }),
  });

const authValidate = async (
  body: CreateUserPayload,
): Promise<null | yup.ValidationError> => {
  try {
    await authValidationSchema.validate(body);
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) return error;
  }
};
export default authValidate;
