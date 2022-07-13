import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";
import { CustomErrorResponse } from "./Error";

export class NotAuthenticatedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }

  serializeErrors(): CustomErrorResponse {
    return {
      errors: [{ message: "Unauthorized" }],
      success: false,
      statusCode: this.statusCode,
    };
  }
}
