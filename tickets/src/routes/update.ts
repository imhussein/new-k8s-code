import express from "express";
import { updateTicketController } from "../controllers/update.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validate";
import { ticketsValidaitons } from "../validations/ticketsValidation";

const router = express.Router();

router.put(
  "/ticket/:id",
  authMiddleware,
  ticketsValidaitons.newTicketValidaiton,
  validateMiddleware,
  updateTicketController
);

export { router as updateTicketRouter };
