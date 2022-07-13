import express from "express";
import { indexOrderConroller } from "../controllers/index.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/orders", authMiddleware, indexOrderConroller);

export { router as indexOrderRouter };
