import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { AuthService } from '@services/auth.service';
import { RefreshTokenDto } from '@/dtos/auth.dto';

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
      const { tokenData, loginData } = await this.authService.login(userData);

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
}

export { AuthController };
