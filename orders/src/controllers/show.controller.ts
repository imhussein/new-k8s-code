import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request-error";
import { Order } from "../models/Order";

import { asyncHandler } from "../utils/asyncHandler";

export const showOrderConroller = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id).populate("ticket");
    if (!order) {
      throw new BadRequestError("orderId", "Order not found!");
    }
    if (order.userId !== req.user.id) {
      throw new BadRequestError("orderId", "not your order!");
    }
    res.status(StatusCodes.OK).json({
      message: "Show Order",
      success: true,
      data: null,
    });
  }
);
