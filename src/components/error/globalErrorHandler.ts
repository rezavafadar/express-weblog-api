import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.httpCode).json({
    message: error.name,
    error: error.message,
  });
};
