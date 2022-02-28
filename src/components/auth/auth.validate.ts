import { ExceptionError } from '../../exception/exceptionError';
import { CreateUser } from '../../schema/user.schema';
import * as yup from 'yup';

const verifyValidation = async (email: string): Promise<void> => {
  const validationSchema = yup
    .string()
    .required('Email is required !')
    .email('Email is incorrect !');

  try {
    await validationSchema.validate(email);
  } catch (error) {
    throw new ExceptionError('Validation Error', 400, error.errors[0]);
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
    throw new ExceptionError('Validation Error', 400, error.errors[0]);
  }
};

interface VerifyCodePayload {
  email: string;
  code: string;
}

const verifyCodeValidation = async (body: VerifyCodePayload): Promise<void> => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required !')
      .email('Email is incorrect !'),
    code: yup
      .string()
      .required('Verify Code is required!')
      .min(5, 'Code is not valid!'),
  });

  try {
    await schema.validate(body);
  } catch (error) {
    throw new ExceptionError('Validation Error', 400, error.errors[0]);
  }
};

export default {
  existenceUserValidation,
  verifyValidation,
  verifyCodeValidation,
};
