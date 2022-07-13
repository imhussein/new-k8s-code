export type CustomError = {
  message: string;
  field?: string;
};

export type CustomErrorResponse = {
  errors: CustomError[];
  statusCode: number;
  success: boolean;
};
