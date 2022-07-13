import express from "express";
import { signUpController } from "../controllers/signup.controller";
import { validateMiddleware } from "../middlewares/validate";
import { authValidations } from "../validations/authValidations";

const router = express.Router();

router.post(
  "/register",
  authValidations.registerValidations,
  validateMiddleware,
  signUpController
);

export { router as signUpRouter };
