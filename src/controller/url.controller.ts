import { logger } from "@/_default";
import { IURLService } from "@/service/interface";
import { HttpStatusCode } from "@/utils/constant";
import CustomError from "@/utils/custom.error";
import { NextFunction, Request, Response } from "express";

export class URLController {
  URLService: IURLService;
  constructor(urlService: IURLService) {
    this.URLService = urlService;
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const userAgent = req.headers?.["user-agent"];
      const { url = "" } = req.params;
      const { origin } = await this.URLService.get(url);
      res.redirect(origin);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userAgent = req.headers?.["user-agent"];

      const { url: origin, alias = "" } = req.body;

      await this.checkOriginExists(origin);

      await this.URLService.create({
        origin,
        userAgent,
        alias,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { url = "" } = req.params;
      if (!url)
        throw new CustomError("URL is missing", HttpStatusCode.BadRequest);

      const response = await this.URLService.delete(url);

      res.status(HttpStatusCode.Ok).json(response);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { url: shortKey } = req.params;
      const { url = "" } = req.body;
    } catch (error) {
      next(error);
    }
  }
  private async checkOriginExists(origin: string) {
    await fetch(origin, { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          const status = response.status;
          throw new CustomError(
            `URL check failed with status:(${response.statusText})`,
            status
          );
        }
      })
      .catch((error) => {
        console.error(`Error accessing URL ${origin}:`, error.message);
        throw new CustomError(
          "The provided URL is not accessible .",
          HttpStatusCode.NotFound
        );
      });
  }
}
