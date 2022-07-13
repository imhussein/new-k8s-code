import express, { NextFunction, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Ticket } from "../models/Ticket";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get(
  "/tickets",
  authMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      data: {
        tickets: await Ticket.find({}),
      },
    });
  })
);

export { router as listTickets };
