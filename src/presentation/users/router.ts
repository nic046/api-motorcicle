import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";

export class UserRouter {
    static get routes(): Router {
        const router = Router();

        const userService = new UserService()
        const userController = new UserController(userService);
        router.get("/", userController.getAllUser);
        router.post("/", userController.createUser);
        router.get("/:id", userController.getOneUser);
        router.patch("/:id", userController.editUser);
        router.delete("/:id", userController.deleteUser);

        return router
    }
}