import { NextFunction, Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  getDashboardData = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const consumerUnit = await this.dashboardService.getDashboardData();
      res.json(consumerUnit);
    } catch (error) {
      next(error);
    }
  };
}
