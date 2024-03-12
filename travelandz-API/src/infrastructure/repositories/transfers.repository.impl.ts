import { TransfersDatasourceInterface } from "../../domain/datasources";
import { TransfersRepositoryInterface } from "../../domain/repositories";
import type { GetBookingsDto } from "../../domain/dtos";
import type {
  IATACodeInterface,
  BookingInterface,
  CreateBookingInterface,
} from "../../data/mongodb";
import type { BookingsListWithPagination } from "../../domain/interfaces";

export class TransfersRepository implements TransfersRepositoryInterface {
  constructor(private readonly datasource: TransfersDatasourceInterface) {}

  getIataCodes(keyword?: string): Promise<IATACodeInterface[]> {
    return this.datasource.getIataCodes(keyword);
  }

  getBookingList(
    userId: string,
    getBookingsDto: GetBookingsDto,
  ): Promise<BookingsListWithPagination> {
    return this.datasource.getBookingList(userId, getBookingsDto);
  }

  createSimpleBooking(body: CreateBookingInterface): Promise<BookingInterface> {
    return this.datasource.createSimpleBooking(body);
  }
  cancelBooking(reference: string): Promise<BookingInterface> {
    return this.datasource.cancelBooking(reference);
  }
}
