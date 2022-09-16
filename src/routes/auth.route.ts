import { Router } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { AuthController } from '@/controllers/auth.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { LoginDto, ForgotPasswordDto, RefreshTokenDto } from '@/dtos/auth.dto';
import authMiddleware from '@/middlewares/auth.middleware';

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
      validationMiddleware(LoginDto, 'body'),
      this.authController.logIn
    );
    this.router.post(
      `${this.path}/refresh-token`,
      validationMiddleware(RefreshTokenDto, 'body'),
      this.authController.refreshToken
    );
    this.router.post(
      `${this.path}/forgot-password`,
      validationMiddleware(ForgotPasswordDto, 'body'),
      this.authController.forgotPassword
    );
    this.router.post(
      `${this.path}/logout`,
      authMiddleware,
      this.authController.logOut
    );
  }
}

export { AuthRoute };
