import { HttpException } from './HttpException';
import { Prisma } from '@prisma/client'

export class PrismaException  {

    constructor(error: Error, messageTitle: string ) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new HttpException(409, `'${messageTitle}' já está cadastrado`);
            }

        }
    }
}
