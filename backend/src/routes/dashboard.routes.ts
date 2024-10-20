import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import { DashboardController } from "../controllers/dashboard.controller";
import { DashboardService } from "../services/dashboard.service";

const dashboardRouter = Router();

const prisma = new PrismaClient();
const dashboardService = new DashboardService(prisma);
const dashboardController = new DashboardController(dashboardService);

dashboardRouter.get(
  "/",
  dashboardController.getDashboardData.bind(dashboardController)
);

export default dashboardRouter;
