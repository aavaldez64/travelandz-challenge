import { Router } from "express";
import { UsersController } from "./controller";
import { UsersDatasource, UsersRepository } from "../../infrastructure/";
import { BcryptAdapter } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Roles } from "../../domain/entities";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UsersDatasource(BcryptAdapter.hash);
    const usersRepository = new UsersRepository(datasource);

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
