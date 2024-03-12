import type { FilterQuery } from "mongoose";
import {
  type IATACodeInterface,
  type BookingInterface,
  IATACodeModel,
  BookingModel,
  CreateBookingInterface,
} from "../../data/mongodb";
import { TransfersDatasourceInterface } from "../../domain/datasources";
import { CustomError } from "../../domain/errors";
import type { GetBookingsDto } from "../../domain/dtos";
import type { BookingsListWithPagination } from "../../domain/interfaces";

export class TransfersDatasource implements TransfersDatasourceInterface {
  getIataCodes = async (
    keyword?: string | undefined,
  ): Promise<IATACodeInterface[]> => {
    const query: FilterQuery<IATACodeInterface> = {};
    if (keyword) {
      query.cityAirport = new RegExp(keyword as string, "i");
    }
    const iataCodes = await IATACodeModel.find(query).select("-id");
    return iataCodes;
  };

  getBookingList = async (
    userId: string,
    getBookingsDto: GetBookingsDto,
  ): Promise<BookingsListWithPagination> => {
    const { language, fromDate, toDate, dateType, page, limit } =
      getBookingsDto;

    const findQuery: FilterQuery<BookingInterface> = { user: userId };
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
    return {
      data: userBookings,
      currentPage: page,
      totalPages: Math.ceil(totalBookings / limit),
    };
  };

  createSimpleBooking = async (
    body: CreateBookingInterface,
  ): Promise<BookingInterface> => {
    try {
      const booking = await BookingModel.create(body);
      await booking.save();
      return booking;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  };

  cancelBooking = async (reference: string): Promise<BookingInterface> => {
    const booking = await BookingModel.findOne({ reference: reference });
    if (booking) {
      booking.status = "CANCELLED";
      if (booking.transfers[0]) booking.transfers[0].status = "CANCELLED";
      await booking.save();
      // return data.bookings[0];
      return booking;
    }
    throw CustomError.internalServer("Internal server error");
  };
}
