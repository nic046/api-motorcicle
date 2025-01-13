import { Router } from "express";
import { RepairController } from "./controller";
import { RepairService } from "../services/repairs.service";

export class RepairRouter {
  static get routes(): Router {
    const router = Router();

    const repairService = new RepairService();
    const repairController = new RepairController(repairService);

    router.get("/", repairController.getAllRepairs);
    router.post("/", repairController.createRepair);
    router.get("/:id", repairController.getOneRepair);
    router.patch("/:id", repairController.editRepair);
    router.delete("/:id", repairController.deleteRepair);

    return router;
  }
}
