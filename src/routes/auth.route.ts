import { Router } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { AuthController } from '@/controllers/auth.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { LoginUserDto, RefreshTokenDto } from '@/dtos/auth.dto';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto, 'body'),
      this.authController.signUp
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginUserDto, 'body'),
      this.authController.logIn
    );
    this.router.post(
      `${this.path}/refresh-token`,
      validationMiddleware(RefreshTokenDto, 'body'),
      this.authController.refreshToken
    );
  }
}

export { AuthRoute };
