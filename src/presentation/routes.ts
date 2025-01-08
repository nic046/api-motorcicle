import { Router } from "express";
import { UserRouter } from "./users/router";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/users", UserRouter.routes)
        router.use("/api/repairs", UserRouter.routes)

        return router;
    }
}