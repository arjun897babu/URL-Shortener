import { errorMiddleware } from "@/_default";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { ErrorMiddleware } from "@/routes/middleware/error.middleware";
import urlRoutes from "@/routes/url.routes";
import { URLShortenerEnv } from "./env";
import ConnectDB from "./db";

export default class Server {
  private server: Express;
  private errMiddleware: ErrorMiddleware;
  private db: ConnectDB;

  constructor(db: ConnectDB) {
    this.db = db;
    this.errMiddleware = errorMiddleware;
    this.server = express();
    this.server.use(morgan("dev"));

    this.server.use(
      cors({
        origin: [URLShortenerEnv.origin],
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
    this.server.use("/", urlRoutes);
  }

  startServer() {
    this.db.connect();
    this.server.listen(URLShortenerEnv.port, () => {
      console.log(`Server is running on port : `, URLShortenerEnv.origin);
    });
  }
}
