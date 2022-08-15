import { Request, Response, NextFunction } from 'express';

export async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const response = {
    status: "Error",
    message: err.message,
    timestamp: new Date().toISOString(),
    URL: req.originalUrl
  };

  // Setup the error response
  res.status(500).json(response);
  
  return res.end();
}