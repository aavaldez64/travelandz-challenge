export interface AvailabilityResponse {
  search: Search;
  services: Service[];
}

export interface Search {
  language: string;
  departure: ComeBack;
  comeBack: ComeBack;
  occupancy: Occupancy;
  from: From;
  to: From;
}

export interface ComeBack {
  date: string;
  time: string;
}

export interface From {
  code: string;
  description: string;
  type: string;
}

export interface Occupancy {
  adults: number;
  children: number;
  infants: number;
}

export interface Service {
  id: number;
  direction: string;
  transferType: string;
  vehicle: Category;
  category: Category;
  pickupInformation: PickupInformation;
  minPaxCapacity: number;
  maxPaxCapacity: number;
  content: Content;
  price: Price;
  rateKey: string;
  cancellationPolicies: CancellationPolicy[];
  links: Link[];
  factsheetId: number;
}

export interface CancellationPolicy {
  amount: number;
  from: string;
  currencyId: string;
  isForceMajeure: null;
}

export interface Category {
  code: string;
  name: string;
}

export interface Content {
  vehicle: Category;
  category: Category;
  images: Image[];
  transferDetailInfo: TransferDetailInfo[];
  customerTransferTimeInfo: any[];
  supplierTransferTimeInfo: any[];
  transferRemarks: TransferRemark[];
}

export interface Image {
  url: string;
  type: string;
}

export interface TransferDetailInfo {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface TransferRemark {
  type: string;
  description: string;
  mandatory: boolean;
}

export interface Link {
  rel: string;
  href: string;
  method: string;
}

export interface PickupInformation {
  from: From;
  to: From;
  date: string;
  time: string;
  pickup: Pickup;
}

export interface Pickup {
  address: null;
  number: null;
  town: null;
  zip: null;
  description: string;
  altitude: null;
  latitude: number | null;
  longitude: number | null;
  checkPickup: CheckPickup;
  pickupId: any | null;
  stopName: any | null;
  image: any | null;
}

export interface CheckPickup {
  mustCheckPickupTime: boolean;
  url: null;
  hoursBeforeConsulting: null;
}

export interface Price {
  totalAmount: number;
  netAmount: null;
  currencyId: string;
}
