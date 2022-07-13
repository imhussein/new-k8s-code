import express from "express";
import { loginController } from "../controllers/signin.controller";
import { validateMiddleware } from "../middlewares/validate";
import { authValidations } from "../validations/authValidations";

const router = express.Router();

router.post(
  "/login",
  authValidations.loginValidations,
  validateMiddleware,
  loginController
);

export { router as signInRouter };
