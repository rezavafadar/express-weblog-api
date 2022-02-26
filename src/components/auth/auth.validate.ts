import { AppError } from '../../exception/appError';
import { CreateUser } from '../../schema/user.schema';
import * as yup from 'yup';

const validationSchema: yup.SchemaOf<CreateUser> = yup.object().shape({
  email: yup
    .string()
    .required('Email is required !')
    .email('Email is incorrect !'),
});

const verifyValidation = async (body: CreateUser) => {
  try {
    await validationSchema.validate(body);
  } catch (error) {
    throw new AppError('Validation Error', 401, error.errors[0]);
  }
};

export default verifyValidation;
