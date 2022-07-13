import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Order } from "../models/Order";
import { asyncHandler } from "../utils/asyncHandler";

export const indexOrderConroller = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
      userId: req.user.id,
    });
    res.status(StatusCodes.OK).json({
      message: "Orders Fetched Successfully",
      success: true,
      data: { orders },
    });
  }
);
