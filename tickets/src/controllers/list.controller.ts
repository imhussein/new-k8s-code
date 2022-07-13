import { NextFunction, Request, Response } from "express";
import { Ticket } from "../models/Ticket";
import { asyncHandler } from "../utils/asyncHandler";

export const listTicketsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({});
    res.json({
      message: "tickets Loaded Successfully",
      data: {
        tickets,
      },
    });
  }
);
