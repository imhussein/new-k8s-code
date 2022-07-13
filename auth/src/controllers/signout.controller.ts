import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";

export const logOutController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.session = null;
    res.status(StatusCodes.OK).json({
      success: true,
      message: "User LoggedOut Successfully",
      data: null,
    });
  }
);
