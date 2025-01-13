import { Router } from "express";
import { UserRouter } from "./users/router";
import { RepairRouter } from "./repairs/router";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/users", UserRouter.routes)
        router.use("/api/repairs", RepairRouter.routes)

        return router;
    }
}