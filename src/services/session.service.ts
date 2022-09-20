import { hash } from 'bcrypt';
import { CreateSessionDto, UpdateSessionDto }from '@dtos/session.dto';
import { HttpException } from '@exceptions/HttpException';
import { PrismaException } from '@exceptions/PrismaException';
import { isEmpty } from '@utils/util';
import client from '@/prisma/client';
import { Session } from '@prisma/client';

class SessionService {
  private session = client.session;  

  public create = async (sessionData: CreateSessionDto, professionalId: number): Promise<Resource> => {
    if (isEmpty(sessionData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    try {
        const createSessionData = await this.session.create({
            data: {
                subject: sessionData.subject,
                duration: sessionData.duration,
                scheduleId: sessionData.scheduleId,
                resourceId: sessionData.resourceId,
                professionalId
            },
        });
        return createSessionData;
    } catch (error) {
        throw new PrismaException(error, 'Sessão');
    }
  };

  public update = async (sessionData: UpdateSessionDto, id: number, professionalId: number): Promise<number> => {
    if (isEmpty(sessionData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    
    try {
        const updateSessionData = await this.session.update({
            where: {
                id_professionalId: {
                    id,
                    professionalId
                }
            },
            data: {
                ...sessionData,
            },
        });
        return updateSessionData;
    } catch (error) {
       throw new PrismaException(error, 'Sessão');
    }
  };

  public listAll = async (professionalId: number): Promise<Session>[] => {
    try {
        const listSessionData = await this.session.findMany({
            where: {
                professionalId
            }
        });
        return listSessionData;
    } catch (error) {
        throw new PrismaException(error, 'Sessão');
    }
  };

  public getOne = async (id: number, professionalId: number): Promise<Session> => {
    try {
        const sessionData = await this.session.findUnique({
            where: {
                id_professionalId: {
                    id ,
                    professionalId,
                },
            }
        });

        return sessionData;
    } catch (error) {
        throw new PrismaException(error, 'Sessão');
    }
  };

  public delete = async (id: number, professionalId: number): Promise<Session> => {
    try {
        const sessionData = await this.session.delete({
            where: {
                id_professionalId: {
                    id,
                    professionalId,
                },
            }
        });
        return sessionData;
    } catch (error) {
        throw new PrismaException(error, 'Sessão');
    }
  };
}

export { SessionService };
