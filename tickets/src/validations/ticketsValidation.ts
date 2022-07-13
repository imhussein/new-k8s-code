import { check } from "express-validator";
import { throwErrorMessage } from "../utils/throwErrorMessage";

export const ticketsValidaitons = {
  newTicketValidaiton: [
    check("title").custom((title: string) =>
      !title ? throwErrorMessage("Title is required") : true
    ),
    check("price").custom((price: number) =>
      !price ? throwErrorMessage("Price is required") : true
    ),
  ],
};
