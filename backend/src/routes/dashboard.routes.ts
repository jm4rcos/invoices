import { Router } from "express";

import { DashboardController } from "../controllers/dashboard.controller";
import { DashboardService } from "../services/dashboard.service";

const dashboardRouter = Router();

const dashboardService = new DashboardService();
const dashboardController = new DashboardController(dashboardService);

dashboardRouter.get(
  "/",
  dashboardController.getDashboardData.bind(dashboardController)
);

export default dashboardRouter;
