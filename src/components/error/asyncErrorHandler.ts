import { AppError } from "./AppError";
import { NextFunction, Request, Response } from "express";

const asyncErrorHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => {
      if (err instanceof AppError) return next(err);
      console.log(err);

      next(
        new AppError("please try again!", 500, true, "internal server error")
      );
    });
  };

export default asyncErrorHandler;
