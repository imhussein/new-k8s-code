import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";

export const currentUserMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(StatusCodes.OK)
      .json({ data: req.user, message: "current user", success: true });
  }
);
