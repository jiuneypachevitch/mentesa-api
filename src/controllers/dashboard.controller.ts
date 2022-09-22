import { RequestWithUser } from "@/interfaces/auth.interface";
import { DashboardService } from "@/services/dashboard.service";
import { NextFunction, Response } from "express";

class DashboardController {
  public dashService = new DashboardService();

  public getInfo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req);

    try {
      const isAdmin = req.professional ? true : false;

      const id = isAdmin ? req.professional.id : req.patient.id;

      const dashboard = await this.dashService.findDashboardInfo(+id, isAdmin);

      res
        .status(200)
        .json(
          dashboard
            ? { data: { dashboard }, message: "dashboard" }
            : { message: "Recurso não encontrado" }
        );
    } catch (error) {
      next(error);
    }
  };
}

export { DashboardController };
