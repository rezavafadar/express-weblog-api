import { NextFunction, Request, Response } from 'express';
import { ExceptionError } from '../exception/exceptionError';

class ErrorHandlerMiddlewares {
  static globalErrorHandler(
    error: ExceptionError | any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (!(error instanceof ExceptionError)) {
      console.log(error);
      error = new ExceptionError(
        'please try again!',
        500,
        'internal server error',
      );
    }

    return res.status(error.httpCode).json({
      message: error.name,
      error: error.message,
    });
  }
}
export default ErrorHandlerMiddlewares;
