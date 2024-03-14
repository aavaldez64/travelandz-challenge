import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasource, AuthRepository } from "../../infrastructure";
import { BcryptAdapter } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasource(
      BcryptAdapter.hash,
      BcryptAdapter.compare,
    );
    const authRepository = new AuthRepository(datasource);

    const controller = new AuthController(authRepository);

    router.post("/register", controller.registerUser);

    router.post("/login", controller.loginUser);

    router.get(
      "/verify-token",
      AuthMiddleware.ValidateJWT(),
      controller.verifyToken,
    );

    return router;
  }
}
