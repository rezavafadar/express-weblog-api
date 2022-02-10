import { CreateUserPayload } from './../../interfaces/user.interface';
import  yup, { ValidationError } from 'yup';

export class Validator{
    constructor(private readonly userSchema:yup.AnyObjectSchema){}

    async authValidate(body:CreateUserPayload): Promise<null | ValidationError> {
        try {
          await this.userSchema.validate(body);
          return null;
        } catch (error) {
          if (error instanceof ValidationError) return error;
        }
    }

}