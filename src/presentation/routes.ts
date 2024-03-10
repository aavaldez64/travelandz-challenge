import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./users/routes";
import { TransfersRoutes } from "./transfers/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);
    router.use("/users", UserRoutes.routes);
    router.use("/transfers", TransfersRoutes.routes);

    return router;
  }
}
