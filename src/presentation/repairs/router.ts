import { Router } from "express";
import { RepairController } from "./controller";

export class RepairRouter {
    static get routes() : Router {
        const router = Router();

        const repairController = new RepairController();
        router.get("/", repairController.getAllRepairs)
        router.post("/", repairController.createRepair)
        router.get("/:id", repairController.getOneRepair)
        router.patch("/:id", repairController.editRepair);
        router.delete("/:id", repairController.deleteRepair);

        return router
    }
}