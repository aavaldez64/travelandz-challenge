import { Request, Response } from "express";
import { fetchHotelBedsAPI } from "../../config";
import type { AvailabilityResponse } from "../interfaces";
import { CustomError } from "../../domain/errors";
import { CheckSimpleAvailableTransfersDto } from "../../domain/dtos";
import { parseSimpleAvailabilityURL } from "./mappers/simple-availability.mapper";

export class TransfersController {
  constructor() {}

  checkSimpleAvailability = async (req: Request, res: Response) => {
    const [error, checkSimpleAvailableTransfersDto] =
      CheckSimpleAvailableTransfersDto.create(req.query);
    if (error !== null) return res.status(400).send({ message: error });

    const fetchURL = parseSimpleAvailabilityURL(
      checkSimpleAvailableTransfersDto,
    );
    const request = await fetchHotelBedsAPI.get(fetchURL);
    if (request.status === 204) {
      return res.send({ data: [] });
    }
    const data = await request.json();
    if (request.status !== 200) {
      console.log(data);
      throw CustomError.badRequest(data.message ?? "Bad request");
    }
    // data as AvailabilityResponse;

    const transfersData = data as AvailabilityResponse;
    res.send({ data: transfersData.services });
  };
}
