import { ValidationError } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";
import { CustomErrorResponse } from "./Error";

export class RequestValidationError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): CustomErrorResponse {
    return {
      errors: this.errors.map(({ msg: message, param: field }) => ({
        message,
        field,
      })),
      statusCode: this.statusCode,
      success: false,
    };
  }
}
