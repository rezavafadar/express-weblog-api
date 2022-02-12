import { NextFunction, Request, Response } from 'express';
import { AppError } from '../components/common/appError';

export const globalErrorHandler = (
  error: AppError | any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!(error instanceof AppError)) {
    console.log(error);
    error = new AppError(
      'please try again!',
      500,
      true,
      'internal server error',
    );
  }

  return res.status(error.httpCode).json({
    message: error.name,
    error: error.message,
  });
};
