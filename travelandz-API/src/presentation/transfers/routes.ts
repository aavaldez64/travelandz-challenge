import { Router } from "express";
import { TransfersController } from "./controller";
import { TransfersDatasource, TransfersRepository } from "../../infrastructure";

export class TransfersRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TransfersDatasource();
    const transfersRepository = new TransfersRepository(datasource);

    const controller = new TransfersController(transfersRepository);

    router.get("/airport-codes", controller.getAirportCodes);
    router.get("/hotel-codes", controller.getHotelCodes);
    router.get(
      "/check-availability/simple",
      controller.checkSimpleAvailability,
    );
    router.post("/booking/request-simple", controller.requestSimpleBooking);
    router.get("/booking/", controller.getBookingList);
    router.get("/booking/:id", controller.getBookingDetails);
    router.delete("/booking/:id", controller.cancelBooking);
    return router;
  }
}
