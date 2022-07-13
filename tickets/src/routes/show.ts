import express from "express";
import { showTicketController } from "../controllers/show.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/ticket/:id", authMiddleware, showTicketController);

export { router as showTicketRouter };
