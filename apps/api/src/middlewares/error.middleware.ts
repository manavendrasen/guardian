import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  let error = { ...err };
  console.error(error);
  // copying the message
  error.message = err.message;
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    let errorsArray: Error[] = err.errors;
    const message = Object.values(errorsArray).map((val) => val.message);
    error = new ErrorResponse(message.toString(), 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
