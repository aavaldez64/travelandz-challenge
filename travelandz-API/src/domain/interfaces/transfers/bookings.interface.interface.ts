export interface BookingResponse {
  bookings: Booking[];
}

export interface Booking {
  reference: string;
  bookingFileId: unknown | null;
  creationDate: string;
  status: Status;
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
type Status = "CONFIRMED" | "CANCELLED";

export interface Holder {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface InvoiceCompany {
  code: string;
}

export interface Link {
  rel: string;
  href: string;
  method: string;
}

export interface ModificationsPolicies {
  cancellation: boolean;
  modification: boolean;
}

export interface Supplier {
  name: string;
  vatNumber: string;
}

export interface Transfer {
  id: number;
  status: Status;
  transferType: string;
  vehicle: Category;
  category: Category;
  pickupInformation: PickupInformation;
  paxes: Pax[];
  content: unknown | null;
  price: Price;
  cancellationPolicies: CancellationPolicy[];
  factsheetId: unknown | null;
  arrivalFlightNumber: unknown | null;
  departureFlightNumber: string;
  arrivalShipName: unknown | null;
  departureShipName: unknown | null;
  arrivalTrainInfo: unknown | null;
  departureTrainInfo: unknown | null;
  transferDetails: TransferDetail[];
  sourceMarketEmergencyNumber: string;
  links: any[];
}

export interface CancellationPolicy {
  amount: number;
  from: string;
  currencyId: string;
  isForceMajeure: boolean;
}

export interface Category {
  code: string;
  name: string;
}

export interface Pax {
  type: string;
  age: number;
}

export interface PickupInformation {
  from: From;
  to: From;
  date: string;
  time: string;
  pickup: Pickup;
}

export interface From {
  code: string;
  description: string;
  type: string;
}

export interface Pickup {
  address: string;
  number: unknown | null;
  town: string;
  zip: string;
  description: string;
  altitude: unknown | null;
  latitude: number;
  longitude: number;
  checkPickup: CheckPickup;
  pickupId: unknown | null;
  stopName: unknown | null;
  image: unknown | null;
}

export interface CheckPickup {
  mustCheckPickupTime: boolean;
  url: unknown | null;
  hoursBeforeConsulting: unknown | null;
}

export interface Price {
  totalAmount: number;
  netAmount: number;
  currencyId: string;
}

export interface TransferDetail {
  type: string;
  direction: string;
  code: string;
  companyName: unknown | null;
}
