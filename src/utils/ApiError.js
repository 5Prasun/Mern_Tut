class ApiError extends Error {
  constructor(
    statusCode,
    message = "An error occurred",
    error=[],
    statck=""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.success = false
    this.data = null;


    if(statck) {
      this.stack = statck;
    }else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}