import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { currentUserMiddleware } from "../middlewares/current-user-middleware";

const router = express.Router();

router.get("/me", authMiddleware, currentUserMiddleware);

export { router as currentUserRouter };
