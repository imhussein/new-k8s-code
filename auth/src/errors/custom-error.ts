import { CustomErrorResponse } from "./Error";

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): CustomErrorResponse;
}
