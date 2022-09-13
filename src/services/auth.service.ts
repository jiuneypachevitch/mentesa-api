import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '@dtos/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class AuthService {
  public user = new PrismaClient().user;

  public signup = async (userData: CreateUserDto) => {
    if (isEmpty(userData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    const findUser = await this.user.findUnique({
      where: { email: userData.email },
    });

    if (findUser)
      throw new HttpException(
        409,
        `O email ${userData.email} já está cadastrado`
      );

    const hashedPassword = await hash(userData.password, 8);
    const createUserData = this.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: 'ADMIN',
        Professional: {
          create: {
            name: userData.name,
          },
        },
      },
    });

    return createUserData;
  };
}

export { AuthService };
