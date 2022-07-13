import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";
import { CustomErrorResponse } from "./Error";

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  constructor(private error: string) {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors(): CustomErrorResponse {
    return {
      errors: [{ message: this.error }],
      statusCode: this.statusCode,
      success: false,
    };
  }
}
