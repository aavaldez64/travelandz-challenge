export interface GetBookingsProps {
  language?: string;
  fromDate: string;
  toDate: string;
  // dateType?: string;
  page?: number;
  // limit?: number;
}

export interface TransfersAvailabilityProps {
  language?: string;

  fromType: string;
  fromCode: string;
  toType: string;
  toCode: string;

  outBound: string; // new Date().toISOString()
  inBound?: string; // new Date().toISOString()

  adults: number;
  children: number;
  infants: number;
}
export interface TransferAvailability {}

export type TransferType = "FLIGHT" | "CRUISE" | "TRAIN";
export type TransferDirection = "ARRIVAL" | "DEPARTURE";

export interface RequestSimpleBookingProps {
  language: string;
  rateKey: string;
  transferType: TransferType;
  transferDirection: TransferDirection;
  welcomeMessage: string;
  remark: string;

  // transferCode?: string;
  // transferCompanyName?: string;
}

export interface AirportCodesResponse {
  iataCodes: IATACode[];
}
export interface IATACode {
  cityAirport: string;
  country: string;
  code: string;
}
export interface HotelCodesResponse {
  data: HotelCode[];
}
export interface HotelCode {
  code: string;
  name: string;
  description: string;
  countryCode: string;
  city: string;
}

export * from "./transfers-availability.interface";
export * from "./booking-data.interface";
export * from "./booking-list.interface";
