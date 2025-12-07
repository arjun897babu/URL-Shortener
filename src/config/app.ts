import { errorMiddleware, logger } from "@/_default";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { ErrorMiddleware } from "@/routes/middleware/error.middleware";
import urlRoutes from "@/routes/url.routes";

export default class Server {
  private server: Express;
  private errMiddleware: ErrorMiddleware;

  constructor() {
    this.errMiddleware = errorMiddleware;

    this.server = express();

    this.server.use(morgan("dev"));

    this.server.use(
      cors({
        origin: [""],
        methods: ["GET", "POST", "DELETE", "PATCH"],
      })
    );

    this.server.use(express.json());

    this.routeHandler();
    this.errorHandler();

    this.server.use(express.urlencoded({ extended: true }));
  }

  private errorHandler() {
    this.server.use(this.errMiddleware.errorMiddleWare);
    this.server.use(this.errMiddleware.wildcardMiddleware);
  }

  private routeHandler() {
    this.server.use("/url", urlRoutes);
  }

  startServer() {
    this.server.listen(5000, () => {
      logger.success("server running");
    });
  }
}
