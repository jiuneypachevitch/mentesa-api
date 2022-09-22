import { NextFunction, Response } from 'express';
import { CreateSessionDto, UpdateSessionDto } from '@dtos/session.dto';
import { SessionService } from '@services/session.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class SessionController {
  public sessionService = new SessionService();

  public create = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sessionData: CreateSessionDto = req.body;
      const session = await this.sessionService.create(
        sessionData,
        req.professional.id
      );

      res.status(201).json({
        data: {
          session,
        },
        message: 'created',
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const sessionData: UpdateSessionDto = req.body;
      const { id } = req.params;
      const session = await this.sessionService.update(
        sessionData,
        +id,
        req.professional.id
      );

      res.status(200).json({
        data: {
          session,
        },
        message: 'updated',
      });
    } catch (error) {
      next(error);
    }
  };

  public listAll = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const session = await this.sessionService.listAll(req.professional.id);

      res.status(200).json({
        data: {
          session,
        },
        message: 'listed',
      });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const session = await this.sessionService.getOne(
        +id,
        req.professional.id
      );

      res
        .status(200)
        .json(
          session
            ? { data: { session }, message: 'listed' }
            : { message: 'Sessão não encontrada' }
        );
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const session = await this.sessionService.delete(
        +id,
        req.professional.id
      );

      res
        .status(200)
        .json(
          session
            ? { data: { session }, message: 'deleted' }
            : { message: 'Sessão não encontrada' }
        );
    } catch (error) {
      next(error);
    }
  };
}

export { SessionController };
