import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { UpdateUserDto } from '@/dtos/user.dto';
import UserService from '@/services/user.service';

class UserController {
  public userService = new UserService();

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: UpdateUserDto = req.body;
      const updatedUserData: User = await this.userService.updateUser(
        userId,
        userData
      );

      res.status(200).json({ data: updatedUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
