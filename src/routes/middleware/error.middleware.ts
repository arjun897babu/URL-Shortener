import { HttpStatusCode } from "@/utils/constant";
import CustomError from "@/utils/custom.error";
import { Request, Response, NextFunction } from "express";

export class ErrorMiddleware {
  errorMiddleWare(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        status: false,
        message: err.message,
      });
    }
    return res.status(HttpStatusCode.InternalServerError).json({
      status: false,
      message: err.message,
    });
  }

  wildcardMiddleware(req: Request, res: Response, next: NextFunction) {
    return res.status(HttpStatusCode.NotFound).json({
      status: false,
      message: "Requested URL is not found on the server",
    });
  }
}
