export interface AvailabilityResponse {
  search: Search;
  services: Service[];
}

interface Search {
  language: string;
  departure: ComeBack;
  comeBack: ComeBack;
  occupancy: Occupancy;
  from: From;
  to: From;
}

interface ComeBack {
  date: string;
  time: string;
}

interface From {
  code: string;
  description: string;
  type: string;
}

interface Occupancy {
  adults: number;
  children: number;
  infants: number;
}

interface Service {
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

interface CancellationPolicy {
  amount: number;
  from: string;
  currencyId: string;
  isForceMajeure: null;
}

interface Category {
  code: string;
  name: string;
}

interface Content {
  vehicle: Category;
  category: Category;
  images: Image[];
  transferDetailInfo: TransferDetailInfo[];
  customerTransferTimeInfo: any[];
  supplierTransferTimeInfo: any[];
  transferRemarks: TransferRemark[];
}

interface Image {
  url: string;
  type: string;
}

interface TransferDetailInfo {
  id: string;
  name: string;
  description: string;
  type: string;
}

interface TransferRemark {
  type: string;
  description: string;
  mandatory: boolean;
}

interface Link {
  rel: string;
  href: string;
  method: string;
}

interface PickupInformation {
  from: From;
  to: From;
  date: string;
  time: string;
  pickup: Pickup;
}

interface Pickup {
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

interface CheckPickup {
  mustCheckPickupTime: boolean;
  url: null;
  hoursBeforeConsulting: null;
}

interface Price {
  totalAmount: number;
  netAmount: null;
  currencyId: string;
}
