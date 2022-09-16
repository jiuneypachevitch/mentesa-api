import { HttpException } from './HttpException';
import { Prisma } from '@prisma/client'

export class PrismaException  {

    constructor(error: Error, messageTitle: string ) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2001': {
                    throw new HttpException(409, `O campo utilizado no filtro não existe.`);
                    break;
                }
                case 'P2002': {
                    throw new HttpException(409, `'${messageTitle}' já está cadastrado`);
                    break;
                }
                case 'P2003': {
                    throw new HttpException(409, `O campo utilizado como chave estrangeira não é valido`);
                    break;
                }
                case 'P2025': {
                    throw new HttpException(404, `${messageTitle} não encontrato`);
                    break;
                }
                default: {
                    throw new HttpException(500, `[${error.code}] ${error}`);
                }
            }
        }
    }
}
