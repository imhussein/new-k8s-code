import express from "express";
import { showOrderConroller } from "../controllers/show.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/orders/:id", authMiddleware, showOrderConroller);

export { router as showOrderRouter };
