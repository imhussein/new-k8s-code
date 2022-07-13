import express from "express";
import { listTicketsController } from "../controllers/list.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/all", authMiddleware, listTicketsController);

export { router as listTicketsRouter };
