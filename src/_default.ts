import { ErrorMiddleware } from "@/routes/middleware/error.middleware";
import URLRepo from "./repository/url.repo";
import { URLService } from "./service/url.service";
import { URLController } from "./controller/url.controller";

export const errorMiddleware = new ErrorMiddleware();

export const urlRepo = new URLRepo();
export const urlService = new URLService(urlRepo);
export const urlController = new URLController(urlService);
