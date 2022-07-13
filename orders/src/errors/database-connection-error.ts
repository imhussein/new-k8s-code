import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error";
import { CustomErrorResponse } from "./Error";

export class DatabaseConnectionError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  reason = "Error connecting to database";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): CustomErrorResponse {
    return {
      errors: [
        {
          message: this.reason,
        },
      ],
      statusCode: this.statusCode,
      success: false,
    };
  }
}
