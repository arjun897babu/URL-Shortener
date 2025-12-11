import { ErrorMiddleware } from "@/routes/middleware/error.middleware";
import URLRepo from "./repository/url.repo";
import { URLService } from "./service/url.service";
import { URLController } from "./controller/url.controller";
import AnalyticsRepo from "./repository/analyitcs.repo";
import AnalyticsService from "./service/analytics.service";
import AnalyticsController from "./controller/analytic.controller";

export const errorMiddleware = new ErrorMiddleware();

export const urlRepo = new URLRepo();
export const urlService = new URLService(urlRepo);
export const analyticRepo = new AnalyticsRepo();
export const analyticsService = new AnalyticsService(analyticRepo);
export const urlController = new URLController(urlService, analyticsService);
export const analyticsController = new AnalyticsController(
  analyticsService,
  urlService
);
