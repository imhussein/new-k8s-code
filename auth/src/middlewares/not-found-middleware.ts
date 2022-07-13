import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new NotFoundError(`requested url ${req.url} doesn't exists.`);
};
