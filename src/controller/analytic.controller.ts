import { IAnalyticsService, IURLService } from "@/service/interface";
import { HttpStatusCode } from "@/utils/constant";
import { generateShortURL } from "@/utils/helper";
import { Request, Response, NextFunction } from "express";

export default class AnalyticsController {
  private analyticsService: IAnalyticsService;
  private URLService: IURLService;
  constructor(analyticsService: IAnalyticsService, urlService: IURLService) {
    this.analyticsService = analyticsService;
    this.URLService = urlService;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { url = "" } = req.params;
      const { _id } = await this.URLService.get(generateShortURL(url));
      const response = await this.analyticsService.get(_id.toString());
      res.status(HttpStatusCode.Ok).json(response);
    } catch (error) {
      next(error);
    }
  }
}
