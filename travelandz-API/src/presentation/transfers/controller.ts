import { Request, Response } from "express";
import { fetchHotelBedsAPI } from "../../config";
import type {
  AvailabilityResponse,
  BookingResponse,
  RequestBookingBody,
  RequestBookingResponse,
} from "../../domain/interfaces";
import { CustomError } from "../../domain/errors";
import {
  CheckSimpleAvailableTransfersDto,
  GetBookingsDto,
  RequestBookingBodyDto,
} from "../../domain/dtos";
import { parseSimpleAvailabilityURL } from "./mappers/simple-availability.mapper";
import {
  BookingInterface,
  BookingModel,
} from "../../data/mongodb/models/bookings.model";
import { FilterQuery } from "mongoose";

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
    const request = await fetchHotelBedsAPI.post("/bookings", body);
    if (request.status === 200) {
      const data: RequestBookingResponse = await request.json();
      try {
        const dataBooking = data.bookings[0];
        const booking = await BookingModel.create({
          ...dataBooking,
          date: dataBooking.transfers[0].pickupInformation.date,
          user: user.id,
        });
        await booking.save();
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

    const user = req.user!;
    const { language, fromDate, toDate, dateType, page, limit } =
      getBookingsDto;

    const findQuery: FilterQuery<BookingInterface> = { user: user.id };
    if (fromDate) {
      findQuery.date ??= {};
      findQuery.date.$gte = new Date(fromDate);
    }
    if (toDate) {
      findQuery.date ??= {};
      findQuery.date.$lte = new Date(toDate);
    }
    const totalBookings = await BookingModel.countDocuments(findQuery);
    const userBookings = await BookingModel.find(findQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["user", { path: "user", select: "-password" }]);
    return res.send({
      data: userBookings,
      currentPage: page,
      totalPages: Math.ceil(totalBookings / limit),
    });
    // const request = await fetchHotelBedsAPI.get(
    //   `/bookings/${language}?fromDate=${fromDate}&toDate=${toDate}&dateType=${dateType}&offset=${offset}&limit=${limit}`,
    // );
    // if (request.status === 200) {
    //   const data: BookingResponse = await request.json();
    //   return res.send({ data: data.bookings });
    // }
    // res.status(404).send({ data: [] });
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
      const booking = await BookingModel.findOne({ reference: id });
      try {
        if (booking) {
          booking.status = "CANCELLED";
          if (booking.transfers[0]) booking.transfers[0].status = "CANCELLED";
          await booking.save();
          // return res.send(data.bookings[0]);
          return res.send(booking);
        }
        throw CustomError.internalServer("Internal server error");
      } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
      }
    }
    res.status(404).send({ message: "Booking not found" });
  };
}
