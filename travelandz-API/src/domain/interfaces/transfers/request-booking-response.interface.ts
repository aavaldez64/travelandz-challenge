import type {
  BookingStatus,
  CancellationPolicy,
  Category,
  Holder,
  InvoiceCompany,
  Link,
  ModificationsPolicies,
  Pax,
  PickupInformation,
  Price,
  Supplier,
  TransferDetail,
} from "./bookings.interface.interface";

export interface RequestBookingResponse {
  bookings: RequestedBooking[];
}
export interface RequestedBooking {
  reference: string;
  bookingFileId: null;
  creationDate: string;
  status: BookingStatus;
  modificationsPolicies: ModificationsPolicies;
  holder: Holder;
  transfers: Transfer[];
  clientReference: string;
  remark: string;
  invoiceCompany: InvoiceCompany;
  supplier: Supplier;
  totalAmount: number;
  totalNetAmount: number;
  pendingAmount: number;
  currency: string;
  links: Link[];
  paymentDataRequired: boolean;
}

interface Transfer {
  id: number;
  rateKey: string;
  status: string;
  transferType: RequestedTransferType;
  vehicle: Category;
  category: Category;
  pickupInformation: PickupInformation;
  paxes: Pax[];
  content: null;
  price: Price;
  cancellationPolicies: CancellationPolicy[];
  factsheetId: null;
  arrivalFlightNumber: null;
  departureFlightNumber: string;
  arrivalShipName: null;
  departureShipName: null;
  arrivalTrainInfo: null;
  departureTrainInfo: null;
  transferDetails: TransferDetail[];
  sourceMarketEmergencyNumber: string;
  links: any[];
}

type RequestedTransferType = "SHARED" | "PRIVATE";
