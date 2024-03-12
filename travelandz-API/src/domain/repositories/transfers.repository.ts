import type { GetBookingsDto } from "../dtos";
import type {
  BookingInterface,
  CreateBookingInterface,
  IATACodeInterface,
} from "../../data/mongodb";
import type { BookingsListWithPagination } from "../interfaces";

export abstract class TransfersRepositoryInterface {
  abstract getIataCodes(keyword?: string): Promise<IATACodeInterface[]>;

  abstract getBookingList(
    userId: string,
    getBookingsDto: GetBookingsDto,
  ): Promise<BookingsListWithPagination>;

  abstract createSimpleBooking(
    body: CreateBookingInterface,
  ): Promise<BookingInterface>;
  abstract cancelBooking(reference: string): Promise<BookingInterface>;
}
