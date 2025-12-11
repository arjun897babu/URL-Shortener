import { analyticsController, urlController } from "@/_default";
import { Router } from "express";

const urlRoutes = Router();

urlRoutes
  .route("/:url/stats")
  .get(analyticsController.get.bind(analyticsController));
urlRoutes
  .route("/:url")
  .get(urlController.redirect.bind(urlController))
  .delete(urlController.delete.bind(urlController));
urlRoutes.route("/").post(urlController.create.bind(urlController));
export default urlRoutes;
