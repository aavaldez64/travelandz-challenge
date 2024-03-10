import { Router } from "express";
import { UsersController } from "./controller";
import { AuthDatasource, AuthRepository } from "../../infrastructure";
import { BcryptAdapter } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UsersDatasource } from "../../infrastructure/datasources/users.datasource.impl";
import { UsersRepository } from "../../infrastructure/repositories/users.repository.impl";
import { Roles } from "../../domain/entities";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new UsersDatasource(BcryptAdapter.hash);
    const usersRepository = new UsersRepository(database);

    const controller = new UsersController(usersRepository);

    router.get("/", AuthMiddleware.ValidateJWT(Roles.admin), controller.find);
    router.get(
      "/:id",
      AuthMiddleware.ValidateJWT(Roles.admin),
      controller.findOne,
    );
    router.patch(
      "/:id",
      AuthMiddleware.ValidateJWT(Roles.admin),
      controller.update,
    );
    router.delete(
      "/:id",
      AuthMiddleware.ValidateJWT(Roles.admin),
      controller.toggleActive,
    );

    return router;
  }
}
