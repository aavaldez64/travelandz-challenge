export interface RequestBookingBody {
  language: string;
  holder: Holder;
  transfers: Transfer[];
  clientReference?: string;
  welcomeMessage: string;
  remark?: string; // max 2000 chars
}

interface Holder {
  name: string;
  surname: string;
  email: string;
  phone: string;
}
interface Transfer {
  rateKey: string;
  transferDetails: TransferDetails[];
}
interface TransferDetails {
  type: TransferType;
  direction: "ARRIVAL" | "DEPARTURE";
  code: string; // max 7 chars
  companyName?: string; //  Normally used in ship transports.
}
export type TransferType = "FLIGHT" | "CRUISE" | "TRAIN";
export type TransferDirection = "ARRIVAL" | "DEPARTURE";
