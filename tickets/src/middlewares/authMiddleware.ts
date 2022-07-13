import { NextFunction, Request, Response } from "express";
import { NotAuthenticatedError } from "../errors/not-authenticated-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/keys";

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

interface UserPayload {
  avatar: string;
  email: string;
  id: string;
  exp: number;
  iat: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.session?.token) {
    throw new NotAuthenticatedError();
  }
  try {
    const payload = jwt.verify(
      req.session.token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    req.user = payload;
    next();
  } catch (error) {
    throw new NotAuthenticatedError();
  }
};
