import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasource, AuthRepository } from "../../infrastructure";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new AuthDatasource();
    const authRepository = new AuthRepository(database);

    const controller = new AuthController(authRepository);

    router.post("/register", controller.registerUser);

    router.post("/login", controller.loginUser);

    return router;
  }
}
