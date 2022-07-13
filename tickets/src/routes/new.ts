import express from "express";
import { newTicketController } from "../controllers/new.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validate";
import { ticketsValidaitons } from "../validations/ticketsValidation";

const router = express.Router();

router.post(
  "/new",
  authMiddleware,
  ticketsValidaitons.newTicketValidaiton,
  validateMiddleware,
  newTicketController
);

export { router as newTicketRouter };
