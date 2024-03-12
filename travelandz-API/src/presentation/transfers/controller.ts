import { Request, Response } from "express";
import { fetchHotelBedsAPI } from "../../config";
import { CustomError } from "../../domain/errors";
import { TransfersRepositoryInterface } from "../../domain/repositories";
import {
  CheckSimpleAvailableTransfersDto,
  GetBookingsDto,
  RequestBookingBodyDto,
} from "../../domain/dtos";
import { parseSimpleAvailabilityURL } from "./mappers/simple-availability.mapper";
import type {
  AvailabilityResponse,
  BookingResponse,
  HotelCode,
  RequestBookingBody,
  RequestBookingResponse,
} from "../../domain/interfaces";

export class TransfersController {
  constructor(
    private readonly transfersRepository: TransfersRepositoryInterface,
  ) {}

  getAirportCodes = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    if (keyword && typeof keyword !== "string") {
      return res.status(404).send({ message: "Bad request | keyword" });
    }
    const iataCodes = await this.transfersRepository.getIataCodes(keyword);
    res.send({ iataCodes });
  };

  getHotelCodes = async (req: Request, res: Response) => {
    const { destinationCode, keyword } = req.query;
    const request = await fetchHotelBedsAPI.get(
      `/transfer-cache-api/1.0/hotels?fields=name,code,description,countryCode,city&language=es&destinationCodes=${destinationCode}`,
    );
    try {
      const data: HotelCode[] = await request.json();
      if (!request.ok) {
        throw CustomError.internalServer(data);
      }
      if (keyword && typeof keyword === "string") {
        // console.log(keyword);
        const keywordRegExp = new RegExp(keyword, "i");

        const filteredData = data.filter(element =>
          keywordRegExp.test(element.name),
        );
        return res.send({ data: filteredData });
      }
      res.send({ data: data });
    } catch (error) {
      console.log(error);
      res.send({ data: [] });
    }
  };

  checkSimpleAvailability = async (req: Request, res: Response) => {
    const [error, checkSimpleAvailableTransfersDto] =
      CheckSimpleAvailableTransfersDto.create(req.query);
    if (error !== null) return res.status(400).send({ message: error });

    const fetchURL = parseSimpleAvailabilityURL(
      checkSimpleAvailableTransfersDto,
    );
    try {
      const request = await fetchHotelBedsAPI.get(fetchURL);
      if (request.status === 204) {
        return res.send({ data: [] });
      }
      const data = await request.json();
      if (request.status !== 200) {
        throw CustomError.badRequest(data.message ?? "Bad request");
      }
      // data as AvailabilityResponse;

      const transfersData = data as AvailabilityResponse;
      res.send({ data: transfersData.services });
    } catch (error) {
      console.log(error);
      res.status(500).send({ data: "Internal server error" });
    }
  };

  requestSimpleBooking = async (req: Request, res: Response) => {
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
    // @ts-ignore
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
      clientReference: user.username.slice(0, 20),
      welcomeMessage: welcomeMessage,
      remark: remark,
    };
    const request = await fetchHotelBedsAPI.post(
      "transfer-api/1.0/bookings",
      body,
    );
    if (request.status === 200) {
      const data: RequestBookingResponse = await request.json();
      try {
        const dataBooking = data.bookings[0];
        const booking = await this.transfersRepository.createSimpleBooking({
          ...dataBooking,
          date: dataBooking.transfers[0].pickupInformation.date,
          user: user.id,
        });
        return res.send(booking);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
    const data = await request.json();
    // console.log(data);
    res.status(400).send({ message: "Bad Request", data });
  };

  getBookingList = async (req: Request, res: Response) => {
    const [error, getBookingsDto] = GetBookingsDto.create(req.query);
    if (error !== null) return res.status(400).send({ message: error });

    // @ts-ignore
    const user = req.user!;
    const { data, currentPage, totalPages } =
      await this.transfersRepository.getBookingList(user.id, getBookingsDto);
    return res.send({
      data: data,
      currentPage: currentPage,
      totalPages: totalPages,
    });
    // const request = await fetchHotelBedsAPI.get(
    //   `transfer-api/1.0/bookings/${language}?fromDate=${fromDate}&toDate=${toDate}&dateType=${dateType}&offset=${offset}&limit=${limit}`,
    // );
    // if (request.status === 200) {
    //   const data: BookingResponse = await request.json();
    //   return res.send({ data: data.bookings });
    // }
    // res.status(404).send({ data: [] });
  };

  getBookingDetails = async (req: Request, res: Response) => {
    const { id } = req.params;
    const request = await fetchHotelBedsAPI.get(
      `transfer-api/1.0/bookings/es/reference/${id}`,
    );
    if (request.status === 200) {
      const data: BookingResponse = await request.json();
      return res.send(data.bookings[0]);
    }
    res.status(404).send({ message: "Booking not found" });
  };
  cancelBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    const request = await fetchHotelBedsAPI.delete(
      `transfer-api/1.0/bookings/en/reference/${id}`,
    );
    if (request.status === 200) {
      try {
        // const data: BookingResponse = await request.json();
        const booking = await this.transfersRepository.cancelBooking(id);
        return res.send(booking);
      } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
      }
    }
    res.status(404).send({ message: "Booking not found" });
  };
}
