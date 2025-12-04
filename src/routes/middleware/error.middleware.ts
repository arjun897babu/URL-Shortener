import { Request, Response, NextFunction } from "express";

export class ErrorMiddleware {

    errorMiddleWare(err: Error, req: Request, res: Response, next: NextFunction) {

    }

    wildcardMiddleware(req: Request, res: Response, next: NextFunction) {
        
    }
}