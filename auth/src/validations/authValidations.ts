import { check } from "express-validator";
import { throwErrorMessage } from "../utils/throwErrorMessage";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

export const authValidations = {
  registerValidations: [
    check("email").custom((email: string): Error | boolean =>
      !email
        ? throwErrorMessage("Email is required.")
        : !isEmail(email)
        ? throwErrorMessage("Email is invalid.")
        : true
    ),
    check("password").custom((password: string): Error | boolean =>
      !password
        ? throwErrorMessage("Password is required.")
        : !isLength(password, { min: 5, max: 30 })
        ? throwErrorMessage("Password must be between 5 and 30.")
        : true
    ),
  ],
  loginValidations: [
    check("email").custom((email: string): Error | boolean =>
      !email ? throwErrorMessage("Email is required.") : true
    ),
    check("password").custom((password: string): Error | boolean =>
      !password ? throwErrorMessage("Password is required.") : true
    ),
  ],
};
