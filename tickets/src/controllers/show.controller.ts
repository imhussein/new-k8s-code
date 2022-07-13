import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request-error";
import { Ticket } from "../models/Ticket";
import { asyncHandler } from "../utils/asyncHandler";

export const showTicketController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
    });
    if (!ticket) {
      throw new BadRequestError("ticket not found", "tickert");
    }
    res.status(StatusCodes.OK).json({
      message: "show ticket",
      data: ticket,
    });
  }
);
