import { BookingInterface } from "../../../data/mongodb";

export interface BookingsListWithPagination {
  data: BookingInterface[];
  currentPage: number;
  totalPages: number;
}
