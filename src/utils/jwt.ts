import * as jwt from 'jsonwebtoken';

export const signToken = (data: any) =>
  jwt.sign(data, process.env.JWT_SECRET || '');

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    return decoded;
  } catch (error) {
    console.log(error);

    return false;
  }
};
