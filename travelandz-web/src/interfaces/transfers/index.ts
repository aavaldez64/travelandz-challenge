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
  // @ Is required
  outBound: string; // new Date().toISOString()

  toType: string;
  toCode: string;
  inBound?: string; // new Date().toISOString()

  adults: number;
  children: number;
  infants: number;
}

export interface RequestSimpleBookingProps {
  language: string;
  rateKey: string;
  transferType: "FLIGHT" | "CRUISE" | "TRAIN";
  transferDirection: "ARRIVAL" | "DEPARTURE";
  welcomeMessage: string;
  remark: string;

  // transferCode?: string;
  // transferCompanyName?: string;
}
