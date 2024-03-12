import { Document, Schema, model } from "mongoose";
import type { UserInterface } from "./user.model";
import type {
  BookingStatus,
  InvoiceCompany,
  Supplier,
  Transfer,
} from "../../../domain/interfaces";

const StatusEnum: BookingStatus[] = ["CANCELLED", "CONFIRMED"];
export interface CreateBookingInterface {
  reference: string;
  date: string;
  status: BookingStatus;
  transfers: Transfer[];
  user: string | UserInterface;
  remark: string;
  invoiceCompany: InvoiceCompany;
  supplier: Supplier;
  totalAmount: number;
  totalNetAmount: number;
  pendingAmount: number;
  currency: string;
  paymentDataRequired: boolean;
}
export interface BookingInterface extends CreateBookingInterface, Document {}
const bookingSchema = new Schema(
  {
    reference: {
      type: Schema.Types.String,
      required: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
      enum: StatusEnum,
    },
    transfers: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    remark: {
      type: Schema.Types.String,
    },
    invoiceCompany: {
      code: {
        type: Schema.Types.String,
        required: true,
      },
    },
    supplier: {
      name: {
        type: Schema.Types.String,
        required: true,
      },
      vatNumber: {
        type: Schema.Types.String,
        required: true,
      },
    },
    totalAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    totalNetAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    pendingAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    currency: {
      type: Schema.Types.String,
      required: true,
    },
    paymentDataRequired: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BookingModel = model<BookingInterface>("Booking", bookingSchema);
