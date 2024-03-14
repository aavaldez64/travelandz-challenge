export interface BookingListResponse {
  data: BookingListItem[];
  currentPage: number;
  totalPages: number;
}

export interface BookingListItem {
  invoiceCompany: any[];
  supplier: any[];
  _id: string;
  reference: string;
  date: string;
  status: "CONFIRMED" | "CANCELLED";
  transfers: any[];
  user: any;
  remark: string;
  totalAmount: number;
  totalNetAmount: number;
  pendingAmount: number;
  currency: string;
  paymentDataRequired: boolean;
  createdAt: string;
  updatedAt: string;
}
