"use server";

import { TRAVELANDZ_API } from "@/adapters/fetch-api/server";
import { TransfersService } from "@/services";
import type {
  RequestSimpleBookingProps,
  TransfersAvailabilityProps,
} from "@/interfaces";
import { revalidatePath } from "next/cache";

export async function ActionGetHotelCodes(
  destinationCode: string,
  keyword: string = ""
) {
  const response = await TransfersService.getHotelCodes(
    TRAVELANDZ_API,
    destinationCode,
    keyword
  );
  return response;
}

export async function ActionGetTransfersAvailability(
  transfersAvailabilityProps: TransfersAvailabilityProps
) {
  const response = await TransfersService.getTransfersAvailability(
    TRAVELANDZ_API,
    transfersAvailabilityProps
  );
  if (!response.ok) {
    return { data: [] };
  }
  return response.data;
}

export async function ActionBookTransfer(
  requestSimpleBookingProps: RequestSimpleBookingProps
) {
  const response = await TransfersService.requestSimpleBooking(
    TRAVELANDZ_API,
    requestSimpleBookingProps
  );
  return response;
}
export async function ActionCancelBook(reference: string) {
  const response = await TransfersService.cancelBooking(
    TRAVELANDZ_API,
    reference
  );
  if (response.ok) {
    revalidatePath("/bookings");
  }
  return response;
}
