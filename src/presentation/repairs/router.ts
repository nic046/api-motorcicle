import { Router } from "express";
import { RepairController } from "./controller";
import { RepairService } from "../services/repairs.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Role } from "../../data";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";

export class RepairRouter {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
          envs.MAILER_SERVICE,
          envs.MAILER_EMAIL,
          envs.MAILER_SECRET_KEY,
          envs.SEND_EMAIL
      )

    const userService = new UserService(emailService)
    const repairService = new RepairService(userService);
    const repairController = new RepairController(repairService);

    router.post("/", repairController.createRepair);

    router.use(AuthMiddleware.restricTo(Role.EMPLOYEE))

    router.get("/", repairController.getAllRepairs);
    router.get("/:id", repairController.getOneRepair);
    router.patch("/:id", repairController.editRepair);
    router.delete("/:id", repairController.deleteRepair);

    return router;
  }
}
