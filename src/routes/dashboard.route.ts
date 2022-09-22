import { DashboardController } from "@/controllers/dashboard.controller";
import { Routes } from "@/interfaces/routes.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";

class DashboardRoute implements Routes {
  public path = "/dashboards";
  public router = Router();
  public dashboardController = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.dashboardController.getInfo
    );
  }
}

export { DashboardRoute };
