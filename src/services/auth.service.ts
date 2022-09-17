import { compare, hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import client from '@/prisma/client';
import { TokenData } from '@/interfaces/auth.interface';
import { GenerateToken } from '@/provider/generateToken';
import { GenerateRefreshToken } from '@/provider/generateRefreshToken';
import { LoginDto, ForgotPasswordDto, RefreshTokenDto } from '@/dtos/auth.dto';
import { CreateUserDto } from '@dtos/user.dto';
import { MailProvider } from '@/provider/mailTrap.provider';
import { User } from '@prisma/client';

interface ILogin {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  refId: number;
}

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
    userData: LoginDto
  ): Promise<{ tokenData: TokenData; cookie: string; loginData: ILogin }> {
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

    const loginData: ILogin = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
      name:
        findProfessional === null ? findPatient.name : findProfessional.name,
      refId: findProfessional === null ? findPatient.id : findProfessional.id,
    };

    const generateToken = new GenerateToken();
    const { token, cookie } = await generateToken.execute(findUser.id);

    const generateRefreshToken = new GenerateRefreshToken();
    const { id: refresh_token } = await generateRefreshToken.execute(
      findUser.id
    );

    return { tokenData: { token, refresh_token }, cookie, loginData };
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
      throw new HttpException(409, `Refresh Token inválido`);

    const generateToken = new GenerateToken();
    const { token } = await generateToken.execute(findRefreshToken.userId);

    return { token };
  }

  public async forgotPassword(
    userData: ForgotPasswordDto
  ): Promise<{ responseData: string }> {
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

    const generateToken = new GenerateToken();
    const { token } = await generateToken.execute(findUser.id);

    const url = `http://localhost:3000/auth/reset_password?token=${token}`;

    const findPatient = await client.patient.findUnique({
      where: { email: userData.email },
    });

    const findProfessional = findPatient
      ? null
      : await client.professional.findUnique({
          where: { email: userData.email },
        });

    const name = findPatient ? findPatient.name : findProfessional.name;

    const mailProvider = new MailProvider();
    await mailProvider.sendMail({
      to: {
        name: name,
        email: findUser.email,
      },
      from: {
        name: 'Equipe Mente SÃ',
        email: 'ale.canutto@gmail.com',
      },
      subject: 'Forget Password Email',
      body: `<div>
              <h3>Dear ${name},</h3>
              <p>You requested for a password reset, kindly use this <a href="${url}">link</a> to reset your password</p>
              <br>
              <p>Cheers!</p>
            </div>`,
    });

    return { responseData: `Email enviado com sucesso para ${findUser.email}` };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    const findUser: User = await this.user.findUnique({
      where: { id: userData.id },
    });

    if (!findUser) throw new HttpException(409, 'Usuário inexistente');

    return findUser;
  }
}

export { AuthService };
