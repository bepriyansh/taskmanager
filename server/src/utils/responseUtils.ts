import { Request, Response, NextFunction } from 'express';

interface IResponse {
  status: number;
  message: string;
  data?: any;
  success: boolean;
}

// Utility to send success responses
export const sendResponse = (
  res: Response,
  status: number = 200,
  message: string = "Request successful",
  data?: any,
): void => {
  const response: IResponse = {
    status,
    message,
    data,
    success: true,
  };
  res.status(status).json(response);
};



class CustomError extends Error {
  status: number;
  data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = this.constructor.name;
  }
}

// Utility to create error object (to be passed to next function)
export const createError = (
  status: number = 500,
  message: string = "Something went wrong",
  data?: any
): CustomError => {
  return new CustomError(status, message, data);
};

// Error-handling middleware
export const errorHandler = (
  err: CustomError, // Use the CustomError type here
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Internal Server Error";
  const errData = err.data;

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    data: errData || null,
    stack: err.stack,
    // stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
