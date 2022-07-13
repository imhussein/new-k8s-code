import { check } from "express-validator";
import { throwErrorMessage } from "../utils/throwErrorMessage";
import mongoose from "mongoose";

export const ordersValidation = {
  createOrderValidation: [
    check("ticketId").custom((ticketId: string) =>
      !ticketId
        ? throwErrorMessage("ticketId required")
        : !mongoose.isValidObjectId(ticketId)
        ? throwErrorMessage("ticket id is not a valid id")
        : true
    ),
  ],
};
