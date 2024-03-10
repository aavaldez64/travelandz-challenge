import { Router } from "express";
import { TransfersController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Roles } from "../../domain/entities";

export class TransfersRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TransfersController();

    router.get(
      "/check-simple-availability",
      AuthMiddleware.ValidateJWT(Roles.user, Roles.admin),
      controller.checkSimpleAvailability,
    );
    return router;
  }
}
