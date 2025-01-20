import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Role } from "../../data";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
  )

    const userService = new UserService(emailService);
    const userController = new UserController(userService);

    router.post("/", userController.register);
    router.post("/login", userController.login);
    router.get("/validate-email/:token", userController.validateAccount)
    router.get("/information/:id", userController.getOneUser);

    router.use(AuthMiddleware.protect);

    const restric = AuthMiddleware.restricTo(Role.EMPLOYEE);

    router.get("/", restric, userController.getAllUser);
    router.patch("/:id", restric, userController.editUser);
    router.delete("/:id", restric, userController.deleteUser);

    return router;
  }
}
