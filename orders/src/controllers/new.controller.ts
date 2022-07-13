import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request-error";
import { OrderCreatedPublisher } from "../events/order-created-publisher";
import { OrderStatus } from "../events/order-status";
import { Order } from "../models/Order";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../nats-wrapper";
import { asyncHandler } from "../utils/asyncHandler";

export const newOrderConroller = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.body.ticketId);
    if (!ticket) {
      throw new BadRequestError("Ticket not found", "ticketId");
    }
    const isTicketReserved = await ticket.isTicketReserved();
    if (isTicketReserved) {
      throw new BadRequestError("ohh this ticket is reserved");
    }
    const expirationDate = new Date();
    expirationDate.setSeconds(
      expirationDate.getSeconds() +
        parseInt(process.env.EXPIRATION_DATE as string)
    );
    const order = Order.buildOrder({
      userId: req.user.id,
      status: OrderStatus.Created,
      expiresAt: expirationDate,
      ticket,
    });
    const savedOrder = await order.save();
    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId,
      status: order.status,
      version: order.version,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });
    res.status(StatusCodes.CREATED).json({
      message: "New Order",
      success: true,
      data: { savedOrder },
    });
  }
);
