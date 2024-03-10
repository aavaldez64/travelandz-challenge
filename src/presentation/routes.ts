import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./users/routes";
import { TransfersRoutes } from "./transfers/routes";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { Roles } from "../domain/entities";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);
    router.use("/users", UserRoutes.routes);
    router.use(
      "/transfers",
      AuthMiddleware.ValidateJWT(Roles.user, Roles.admin),
      TransfersRoutes.routes,
    );

    return router;
  }
}
