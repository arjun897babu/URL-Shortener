import { URLShortenerEnv } from "@/config/env";
import { IAddAnalytics } from "@/repository/interface";
import { IAnalyticsService, IURLService } from "@/service/interface";
import { HttpStatusCode } from "@/utils/constant";
import CustomError from "@/utils/custom.error";
import { generateShortURL } from "@/utils/helper";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { UAParser } from "ua-parser-js";

export class URLController {
  private URLService: IURLService;
  private analyticsService: IAnalyticsService;

  constructor(urlService: IURLService, analyticsService: IAnalyticsService) {
    this.URLService = urlService;
    this.analyticsService = analyticsService;
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const { url = "" } = req.params; 
      const { origin, _id } = await this.URLService.get(generateShortURL(url)); 
      const parser = new UAParser(req.headers["user-agent"] || "");
      const { browser, ua, os } = parser.getResult();

      const analyticData: IAddAnalytics = {
        urlId: _id,
        userAgent: ua,
      };

      if (browser?.name) {
        analyticData.browser = browser.name;
      }
      if (os?.name) {
        analyticData.os = os.name;
      }
      if (req?.ip) {
        analyticData.ip = req.ip;
      }

      await this.analyticsService.add(analyticData);

      return res.redirect(origin);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { url: origin, alias = "" } = req.body;
      console.log("req.body :", req.body);

      await this.checkOriginExists(origin);
      const response = await this.URLService.create({
        origin,
        alias,
      });
      res.status(HttpStatusCode.Created).json(response);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { url = "" } = req.params;

      const response = await this.URLService.delete(generateShortURL(url));

      res.status(HttpStatusCode.Ok).json(response);
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
