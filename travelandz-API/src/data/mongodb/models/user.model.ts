import { Document, Schema, model } from "mongoose";
import { Roles } from "../../../domain/entities";

export interface UserInterface extends Document {
  name: string;
  lastName: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
  isActive: boolean;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "LastName is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: Roles.user,
      enum: [Roles.user, Roles.admin],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = model<UserInterface>("User", userSchema);