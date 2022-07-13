import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";
import { CustomErrorResponse } from "./Error";

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(private error: string, private field?: string) {
    super();
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): CustomErrorResponse {
    return {
      errors: [{ message: this.error, field: this.field }],
      statusCode: this.statusCode,
      success: false,
    };
  }
}
