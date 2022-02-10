import { CreateUserPayload } from "../../interfaces/user.interface";
import { ValidationError } from "yup";
import { userValidationSchema } from "./validation.schema";

export const authValidate = async (
  body: CreateUserPayload
): Promise<null | ValidationError> => {
  try {
    await userValidationSchema.validate(body);
    return null;
  } catch (error) {
    if (error instanceof ValidationError) return error;
  }
};
