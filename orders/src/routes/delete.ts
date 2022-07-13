import express from "express";
import { deleteOrderConroller } from "../controllers/delete.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.delete("/orders/:id", authMiddleware, deleteOrderConroller);

export { router as deleteOrderRouter };
