import express from "express";
import { newOrderConroller } from "../controllers/new.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validate";
import { ordersValidation } from "../validations/ordersValidation";

const router = express.Router();

router.post(
  "/new",
  authMiddleware,
  ordersValidation.createOrderValidation,
  validateMiddleware,
  newOrderConroller
);

export { router as newOrderRouter };
