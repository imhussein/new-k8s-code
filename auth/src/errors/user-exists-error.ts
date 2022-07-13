import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";
import { CustomErrorResponse } from "./Error";

export class UserExistsError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  constructor() {
    super();
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }

  serializeErrors(): CustomErrorResponse {
    return {
      errors: [
        {
          message: "Email already exist",
          field: "email",
        },
      ],
      success: false,
      statusCode: this.statusCode,
    };
  }
}
