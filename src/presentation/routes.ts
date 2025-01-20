import { Router } from "express";
import { UserRouter } from "./users/router";
import { RepairRouter } from "./repairs/router";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { Role } from "../data";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", UserRouter.routes);

    router.use(AuthMiddleware.protect)

    const restric = AuthMiddleware.restricTo(Role.EMPLOYEE);

    router.use("/api/repairs",restric, RepairRouter.routes);

    return router;
  }
}
