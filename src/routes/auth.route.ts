import { Router } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { AuthController } from '@/controllers/auth.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     tags:
     *       - Auth
     *     description: Create a new user
     *     operationId: authRegister,
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: User object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: Successfully created
     *       500:
     *         description: Internal Server Error
     * components:
     *   schemas:
     *     User:
     *       type: object
     *       required:
     *         - name
     *         - email
     *         - password
     *       properties:
     *         id:
     *           type: integer
     *           description: auto-generated id of a user
     *         email:
     *           type: string
     *           description: email of user
     *         role:
     *           type: string
     *           enum:
     *            - ADMIN
     *            - USER
     *         password:
     *           type: string
     *           description: password of user
     *       example:
     *         name: User Default
     *         email: user@email.com
     *         role: ADMIN
     *         password: 12345678
     */
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto, 'body'),
      this.authController.signUp
    );
  }
}

export { AuthRoute };
