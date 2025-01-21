import { Router } from "express";
import { RepairController } from "./controller";
import { RepairService } from "../services/repairs.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Role } from "../../data";

export class RepairRouter {
  static get routes(): Router {
    const router = Router();

    const repairService = new RepairService();
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
