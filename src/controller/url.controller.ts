import { logger } from "@/_default";
import { IURLService } from "@/service/interface";
import { NextFunction, Request, Response } from "express";

export class URLController {
  urlService: IURLService;
  constructor(urlService: IURLService) {
    this.urlService = urlService;
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const userAgent = req.headers?.["user-agent"];
      console.log(userAgent);
      const { url, alias = "" } = req.body;
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userAgent = req.headers?.["user-agent"];
      
      const { url, alias = "" } = req.body;
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
