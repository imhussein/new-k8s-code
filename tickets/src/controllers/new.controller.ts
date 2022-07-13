import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../nats-wrapper";
import { asyncHandler } from "../utils/asyncHandler";

export const newTicketController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;
    const ticket = Ticket.buildTicket({ price, title, userId: req.user.id });
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    res.status(StatusCodes.CREATED).json({
      message: "new ticket created",
      data: ticket,
    });
  }
);
