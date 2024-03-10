import { Router } from "express";
import { TransfersController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Roles } from "../../domain/entities";

export class TransfersRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TransfersController();

    router.get(
      "/check-availability/simple",
      controller.checkSimpleAvailability,
    );
    router.post("/booking/request", controller.requestBooking);
    router.get("/booking/", controller.getBookingList);
    router.get("/booking/:id", controller.getBookingDetails);
    router.delete("/booking/:id", controller.cancelBooking);
    return router;
  }
}
