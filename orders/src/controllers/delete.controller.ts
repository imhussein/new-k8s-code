import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request-error";
import { OrderCancelledPublisher } from "../events/order-cancelled-publisher";
import { OrderStatus } from "../events/order-status";
import { Order } from "../models/Order";
import { natsWrapper } from "../nats-wrapper";
import { asyncHandler } from "../utils/asyncHandler";

export const deleteOrderConroller = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id).populate("ticket");
    if (!order) {
      throw new BadRequestError("orderId", "Order not found!");
    }
    if (order.userId !== req.user.id) {
      throw new BadRequestError("orderId", "not your order!");
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
      },
    });
    res.status(StatusCodes.OK).json({
      message: "Delete Order",
      success: true,
      data: { updateOrder: order },
    });
  }
);
