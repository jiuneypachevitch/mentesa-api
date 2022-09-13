import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { AuthService } from '@services/auth.service';

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
}

export { AuthController };
