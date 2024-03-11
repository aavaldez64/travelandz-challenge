import { fetchApiAdapter } from "@/adapters/fetch-api/adapter";
import { parseQueryParams } from "@/utils";
import type {
  GetBookingsProps,
  RequestSimpleBookingProps,
  TransfersAvailabilityProps,
} from "@/interfaces";

export class TransfersService {
  static async getBookings(
    getBookingProps: GetBookingsProps,
    fetchApi: fetchApiAdapter
  ) {
    const params = parseQueryParams(getBookingProps);
    const response = await fetchApi.get("/transfers/booking" + params);
    console.log(response);
    return response.data;
  }

  async getBookingByRef(reference: string, fetchApi: fetchApiAdapter) {
    const response = await fetchApi.get("/transfers/booking/" + reference);
    return response;
  }

  async cancelBooking(reference: string, fetchApi: fetchApiAdapter) {
    const response = await fetchApi.delete("/transfers/booking/" + reference);
    return response;
  }

  async getTransfersAvailability(
    transfersAvailabilityProps: TransfersAvailabilityProps,
    fetchApi: fetchApiAdapter
  ) {
    const params = parseQueryParams(transfersAvailabilityProps);
    const response = await fetchApi.get(
      "/transfers/check-availability/simple" + params
    );
    console.log(response);
    return response.data;
  }

  async requestSimpleBooking(
    requestSimpleBookingProps: RequestSimpleBookingProps,
    fetchApi: fetchApiAdapter
  ) {
    const response = await fetchApi.post("/transfers/booking/request-simple", {
      data: requestSimpleBookingProps,
    });
    return response;
  }
}
