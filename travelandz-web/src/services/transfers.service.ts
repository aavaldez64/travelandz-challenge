import { fetchApiAdapter } from "@/adapters/fetch-api/adapter";
import { parseQueryParams } from "@/utils";
import type {
  AirportCodesResponse,
  BookingData,
  BookingListResponse,
  GetBookingsProps,
  HotelCodesResponse,
  RequestSimpleBookingProps,
  TransferAvailabilityDetails,
  TransfersAvailabilityProps,
} from "@/interfaces";

export class TransfersService {
  static async getAirportCodes(
    fetchApi: fetchApiAdapter,
    keyword: string = ""
  ): Promise<AirportCodesResponse> {
    const response = await fetchApi.get(
      `/transfers/airport-codes?keyword=${keyword}`
    );
    return response.data;
  }
  static async getHotelCodes(
    fetchApi: fetchApiAdapter,
    destinationCode: string,
    keyword: string = ""
  ): Promise<HotelCodesResponse> {
    const response = await fetchApi.get(
      `/transfers/hotel-codes?destinationCode=${destinationCode}&keyword=${keyword}`
    );
    return response.data;
  }
  static async getBookings(
    fetchApi: fetchApiAdapter,
    getBookingProps: GetBookingsProps
  ) {
    const params = parseQueryParams(getBookingProps);
    const response = await fetchApi.get<BookingListResponse>(
      "/transfers/booking" + params
    );
    return response.data as BookingListResponse;
  }

  static async getBookingByRef(fetchApi: fetchApiAdapter, reference: string) {
    const response = await fetchApi.get("/transfers/booking/" + reference);
    return response;
  }

  static async cancelBooking(fetchApi: fetchApiAdapter, reference: string) {
    const response = await fetchApi.delete("/transfers/booking/" + reference);
    return response;
  }

  static async getTransfersAvailability(
    fetchApi: fetchApiAdapter,
    transfersAvailabilityProps: TransfersAvailabilityProps
  ) {
    const params = parseQueryParams(transfersAvailabilityProps);
    const response = await fetchApi.get<{
      data: TransferAvailabilityDetails[];
    }>("/transfers/check-availability/simple" + params);
    return response;
  }

  static async requestSimpleBooking(
    fetchApi: fetchApiAdapter,
    requestSimpleBookingProps: RequestSimpleBookingProps
  ) {
    const response = await fetchApi.post<BookingData>(
      "/transfers/booking/request-simple",
      {
        data: requestSimpleBookingProps,
      }
    );
    return response;
  }
}
