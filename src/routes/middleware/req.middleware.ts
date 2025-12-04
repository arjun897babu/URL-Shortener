import { Request, Response, NextFunction } from "express";

export class ReqMiddleware {

    reqMiddleware(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error)
        }
    }


}