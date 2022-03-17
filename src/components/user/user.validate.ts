import * as yup from 'yup';

import { userGender, userRole } from './../../schema/user.schema';
import { EditUserProfilePayload } from '../../schema/user.schema';
import { ExceptionError } from '../../exception/exceptionError';

const storeUserValidation = async (body: EditUserProfilePayload) => {
  const dateNow = new Date();

  const minimumDate = new Date();
  minimumDate.setFullYear(dateNow.getFullYear() - 15);

  const maximumDate = new Date();
  maximumDate.setFullYear(dateNow.getFullYear() - 80);

  const schema: yup.SchemaOf<EditUserProfilePayload> = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username should be greater than 5 characters!')
      .max(16, 'Username is should be less than 16 characters!'),
    age: yup
      .date()
      .min(maximumDate, 'Date of birth should be less than 80!')
      .max(minimumDate, 'Date of birth should be greater than 15!'),
    bio: yup.string().max(70, 'Bio should be less than 70 characters!'),
    fullname: yup
      .string()
      .min(6, 'Fullname sould be greater than 6 characters!')
      .max(16, 'Fullname should be less than 16 characters!'),
    gender: yup
      .mixed<userGender>()
      .oneOf(
        ['female', 'man', 'other'],
        'Gender should be female or man or other !',
      ),
    role: yup
      .mixed<userRole>()
      .oneOf(['admin', 'user'], 'User role should be admin or user!'),
    instagram_account: yup
      .string()
      .matches(
        /^https:\/\/www.instagram.com\//g,
        'Instagram account url is incorrecct!',
      ),
    twitter_account: yup
      .string()
      .matches(
        /^http:\/\/twitter.com\//g,
        'Twitter account url is incorrecct!',
      ),
  });

  try {
    await schema.validate(body);
    console.log('success');
  } catch (error) {
    throw new ExceptionError('Validation Error', 400, error.errors[0]);
  }
};

export default {
  storeUserValidation,
};
