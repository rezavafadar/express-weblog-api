import { ExceptionError } from '../../exception/exceptionError';
import { CreateUser } from '../../schema/user.schema';
import * as yup from 'yup';

const verifyValidation = async (body: CreateUser): Promise<void> => {
  const validationSchema: yup.SchemaOf<CreateUser> = yup.object().shape({
    email: yup
      .string()
      .required('Email is required !')
      .email('Email is incorrect !'),
  });

  try {
    await validationSchema.validate(body);
  } catch (error) {
    throw new ExceptionError('Validation Error', 401, error.errors[0]);
  }
};

interface exsistenceUserValid {
  type: 'login' | 'register';
  email: string;
}

const existenceUserValidation = async (
  body: exsistenceUserValid,
): Promise<void> => {
  const validationSchema: yup.SchemaOf<exsistenceUserValid> = yup
    .object()
    .shape({
      email: yup
        .string()
        .required('Email is required !')
        .email('Email is incorrect !'),
      type: yup
        .mixed<'login' | 'register'>()
        .oneOf(['login', 'register'], 'Type value is not valid!')
        .required('Type is required!'),
    });

  try {
    await validationSchema.validate(body);
  } catch (error) {
    throw new ExceptionError('Validation Error', 401, error.errors[0]);
  }
};

export default {
  existenceUserValidation,
  verifyValidation,
};
