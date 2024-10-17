import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  res.status(500).json({
    message: "An unexpected error occurred",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
}

export default errorMiddleware;
