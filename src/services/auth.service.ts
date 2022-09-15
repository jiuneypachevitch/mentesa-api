import { compare, hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { client } from '@/prisma/client';
import { LoginData, TokenData } from '@/interfaces/auth.interface';
import { User } from '@prisma/client';
import { GenerateToken } from '@/provider/generateToken';
import { GenerateRefreshToken } from '@/provider/generateRefreshToken';
import { LoginUserDto, RefreshTokenDto } from '@/dtos/auth.dto';

class AuthService {
  public user = client.user;

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
    const createUserData = await this.user.create({
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

  public async login(
    userData: LoginUserDto
  ): Promise<{ tokenData: TokenData; loginData: LoginData }> {
    if (isEmpty(userData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    const findUser: User = await this.user.findUnique({
      where: { email: userData.email },
    });

    if (!findUser)
      throw new HttpException(
        409,
        `O email ${userData.email} não foi encontrado`
      );

    const isPasswordMatching = await compare(
      userData.password,
      findUser.password
    );

    if (!isPasswordMatching) throw new HttpException(409, 'Senha inválida');

    const findPatient = await client.patient.findUnique({
      where: { email: userData.email },
    });

    const findProfessional = findPatient
      ? null
      : await client.professional.findUnique({
          where: { email: userData.email },
        });

    const loginData = {
      id: findUser.id,
      name: findPatient ? findPatient.name : findProfessional.name,
      email: findUser.email,
    };

    const generateToken = new GenerateToken();
    const generateRefreshToken = new GenerateRefreshToken();
    const { token } = await generateToken.execute(findUser.id);
    const { id } = await generateRefreshToken.execute(findUser.id);

    return { tokenData: { token, refresh_token: id }, loginData };
  }

  public async refreshToken(
    refreshTokenData: RefreshTokenDto
  ): Promise<{ token: string }> {
    if (isEmpty(refreshTokenData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    const findRefreshToken = await client.refreshToken.findFirst({
      where: {
        id: refreshTokenData.refresh_token,
      },
    });

    if (!findRefreshToken)
      throw new HttpException(409, `RefreshToken inválido`);

    const generateToken = new GenerateToken();
    const { token } = await generateToken.execute(findRefreshToken.userId);

    return { token };
  }
}

export { AuthService };
