//api response for error
class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: any[];
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

//api response for success
class ApiSuccess {
  statusCode: number;
  message: string;
  success: boolean;
  data: any;
  constructor(statusCode: number, message = "Success", data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { ApiError, ApiSuccess };
