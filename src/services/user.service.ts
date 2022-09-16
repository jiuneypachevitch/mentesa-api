import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { client } from '@/prisma/client';
import { UpdateUserDto } from '@/dtos/user.dto';

class UserService {
  public user = client.user;

  public async updateUser(
    userId: number,
    userData: UpdateUserDto
  ): Promise<User> {
    if (isEmpty(userData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    const findUser: User = await this.user.findUnique({
      where: { id: userId },
    });

    if (!findUser) throw new HttpException(409, 'Usuário inexistente');

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData = await this.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return updateUserData;
  }
}

export default UserService;
