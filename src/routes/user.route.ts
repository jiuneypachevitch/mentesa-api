import { Router } from "express";
import { UpdateUserDto } from "@dtos/user.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import UserController from "@controllers/user.controller";
import authMiddleware from "@/middlewares/auth.middleware";

class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(UpdateUserDto, "body", true),
      this.userController.updateUser
    );
  }
}

export { UserRoute };
