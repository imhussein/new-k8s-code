import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/custom-error";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.serializeErrors());
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: error.message }],
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};
