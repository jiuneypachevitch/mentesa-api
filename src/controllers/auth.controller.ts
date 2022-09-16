import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { AuthService } from '@services/auth.service';
import { ForgotPasswordDto, LoginDto, RefreshTokenDto } from '@/dtos/auth.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@prisma/client';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.authService.signup(userData);

      res.status(201).json({
        data: {
          user,
        },
        message: 'signup',
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { tokenData, cookie, loginData } = await this.authService.login(
        userData
      );

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({
        accessToken: tokenData,
        login: loginData,
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshTokenData: RefreshTokenDto = req.body;
      const { token } = await this.authService.refreshToken(refreshTokenData);

      res.status(200).json({
        token,
        message: 'refresh_token',
      });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: ForgotPasswordDto = req.body;
      const { responseData } = await this.authService.forgotPassword(userData);

      res.status(200).json({
        responseData,
        message: 'forgot_password',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export { AuthController };
