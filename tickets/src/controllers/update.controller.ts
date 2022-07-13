import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request-error";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../nats-wrapper";
import { asyncHandler } from "../utils/asyncHandler";

export const updateTicketController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
    });
    if (!ticket) {
      throw new BadRequestError("ticket not found", "tickert");
    }
    if (ticket.userId !== req.user.id) {
      throw new BadRequestError(
        "ticket doesn't belong to you Please",
        "ticketid"
      );
    }
    const { title, price } = req.body;
    ticket.title = title;
    ticket.price = price;
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    res.status(StatusCodes.OK).json({
      message: "update ticket",
      data: ticket,
    });
  }
);
