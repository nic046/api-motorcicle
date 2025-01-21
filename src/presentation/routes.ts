import { Router } from "express";
import { UserRouter } from "./users/router";
import { RepairRouter } from "./repairs/router";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", UserRouter.routes);

    router.use(AuthMiddleware.protect)

    router.use("/api/repairs", RepairRouter.routes);

    return router;
  }
}
