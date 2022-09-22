import { NextFunction, Request, Response } from 'express';
import { Professional } from '@prisma/client';
import { ProfessionalService } from '@/services/professional.service';
import { UpdateProfessionalDto } from '@/dtos/professional.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';

class ProfessionalController {
  public professionalService = new ProfessionalService();

  public getProfessionalById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const professionalId = Number(req.params.id);
      const findOneProfessionalData: Professional =
        await this.professionalService.findProfessionalById(professionalId);

      res
        .status(200)
        .json({ data: findOneProfessionalData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateProfessional = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const professionalId = Number(req.params.id);
      const professionalData: UpdateProfessionalDto = req.body;
      const updateProfessionalData: Professional =
        await this.professionalService.updateProfessional(
          professionalId,
          professionalData
        );

      res
        .status(200)
        .json({ data: updateProfessionalData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getProfessionalProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const professional =
        await this.professionalService.getProfessionalProfile(
          req.professional.id
        );

      res
        .status(200)
        .json({ data: { professional }, message: 'profile' });
    } catch (error) {
      next(error);
    }
  };

  public setProfessionalProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const professional =
        await this.professionalService.setProfessionalProfile(
          req.professional.id,
          req.body
        );

      res
        .status(200)
        .json({ data: { professional }, message: 'profile' });
    } catch (error) {
      next(error);
    }
  };
}

export { ProfessionalController };
