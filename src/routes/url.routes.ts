import { urlController } from "@/_default";
import { Router } from "express";

const urlRoutes = Router();

urlRoutes
  .route("/")
  .get(urlController.redirect.bind(urlController))
  .post(urlController.create.bind(urlController))
  .delete(urlController.delete.bind(urlController)) 

export default urlRoutes;
