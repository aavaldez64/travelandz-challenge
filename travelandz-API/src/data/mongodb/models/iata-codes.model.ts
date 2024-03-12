import { Document, Schema, model } from "mongoose";

export interface IATACodeInterface extends Document {
  cityAirport: string;
  country: string;
  code: string;
}

const iataCodeSchema = new Schema(
  {
    cityAirport: {
      type: Schema.Types.String,
      required: true,
    },
    country: {
      type: Schema.Types.String,
      required: true,
    },
    code: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const IATACodeModel = model<IATACodeInterface>(
  "IataCode",
  iataCodeSchema,
);
