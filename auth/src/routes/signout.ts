import express from "express";
import { logOutController } from "../controllers/signout.controller";

const router = express.Router();

router.post("/logout", logOutController);

export { router as signOutRouter };
