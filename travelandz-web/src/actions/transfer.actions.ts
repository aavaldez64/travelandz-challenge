"use server";

import { TRAVELANDZ_API } from "@/adapters/fetch-api/server";
import { TransfersAvailabilityProps } from "@/interfaces";
import { TransfersService } from "@/services";

export async function ActionGetHotelCodes(
  destinationCode: string,
  keyword: string = ""
) {
  const response = await TransfersService.getHotelCodes(
    TRAVELANDZ_API,
    destinationCode,
    keyword
  );
  console.log(response);
  return response;
}

export async function ActionGetTransfersAvailability(
  transfersAvailabilityProps: TransfersAvailabilityProps
) {
  const response = await TransfersService.getTransfersAvailability(
    TRAVELANDZ_API,
    transfersAvailabilityProps
  );
  return response.data;
}
