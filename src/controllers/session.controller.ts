import { NextFunction, Request, Response } from 'express';
import { CreateSessionDto, UpdateSessionDto } from '@dtos/session.dto';
import { SessionService } from '@services/session.service';
import { HttpException } from '@exceptions/HttpException';

class SessionController {
    public sessionService = new SessionService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionData: CreateSessionDto = req.body;
      const session = await this.sessionService.create(sessionData, req.professional.id);

      res.status(201).json({
        data: {
          ...session,
        },
        message: 'created',
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionData: UpdateSessionDto = req.body;
      const { id } = req.params;
      const session = await this.sessionService.update(sessionData, +id, req.professional.id);

      res.status(200).json(
        { data: { ...session }, message: 'updated' }
      );
    } catch (error) {
      next(error);
    }
  };

  public listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionList = await this.sessionService.listAll(req.professional.id);

      res.status(200).json({
        data: {
          ...sessionList,
        },
        message: 'listed',
      });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const session = await this.sessionService.getOne(+id, req.professional.id);
      
      res.status(200).json(session ? { data: { ...session }, message: 'listed'} : { message: 'Recurso não encontrado'});
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const session = await this.sessionService.delete(+id, req.professional.id);

      res.status(200).json(session ? { data: { ...session }, message: 'deleted' } : { message: 'Recurso não encontrado' });
    } catch (error) {
      next(error);
    }
  };
}

export { SessionController };
