import { Request, Response } from "express";
import { fetchHotelBedsAPI } from "../../config";
import type {
  AvailabilityResponse,
  BookingResponse,
  RequestBookingBody,
} from "../../domain/interfaces";
import { CustomError } from "../../domain/errors";
import {
  CheckSimpleAvailableTransfersDto,
  GetBookingsDto,
  RequestBookingBodyDto,
} from "../../domain/dtos";
import { parseSimpleAvailabilityURL } from "./mappers/simple-availability.mapper";
import { UserInterface } from "../../data/mongodb";

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

  requestBooking = async (req: Request, res: Response) => {
    const [error, requestBookingBodyDto] = RequestBookingBodyDto.create(
      req.body,
    );
    if (error !== null) return res.status(400).send({ message: error });
    const {
      language,
      rateKey,
      transferType,
      transferDirection,
      transferCode,
      transferCompanyName,
      welcomeMessage,
      remark,
    } = requestBookingBodyDto;
    const user = req.user!;
    const holder = {
      name: user.name,
      surname: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    const body: RequestBookingBody = {
      language: language,
      holder: holder,
      transfers: [
        {
          rateKey: rateKey,
          transferDetails: [
            {
              type: transferType,
              direction: transferDirection,
              code: transferCode,
              companyName: transferCompanyName,
            },
          ],
        },
      ],

      clientReference: user.id,
      welcomeMessage: welcomeMessage,
      remark: remark,
    };
    const request = await fetchHotelBedsAPI.post("/bookings", body);
  };
  getBookingList = async (req: Request, res: Response) => {
    const [error, getBookingsDto] = GetBookingsDto.create(req.query);
    if (error !== null) return res.status(400).send({ message: error });

    const { language, fromDate, toDate, dateType, offset, limit } =
      getBookingsDto;
    const request = await fetchHotelBedsAPI.get(
      `/bookings/${language}?fromDate=${fromDate}&toDate=${toDate}&dateType=${dateType}&offset=${offset}&limit=${limit}`,
    );
    if (request.status === 200) {
      const data: BookingResponse = await request.json();
      return res.send({ data: data.bookings });
    }
    res.status(404).send({ data: [] });
  };
  getBookingDetails = async (req: Request, res: Response) => {
    const { id } = req.params;
    const request = await fetchHotelBedsAPI.get(`/bookings/es/reference/${id}`);
    if (request.status === 200) {
      const data: BookingResponse = await request.json();
      return res.send(data.bookings[0]);
    }
    res.status(404).send({ message: "Booking not found" });
  };
  cancelBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    const request = await fetchHotelBedsAPI.delete(
      `/bookings/en/reference/${id}`,
    );
    if (request.status === 200) {
      const data: BookingResponse = await request.json();
      return res.send(data.bookings[0]);
    }
    res.status(404).send({ message: "Booking not found" });
  };
}
