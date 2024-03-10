import { Document, Schema, model } from "mongoose";
import { Roles } from "../../../domain/entities";

export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  role: Roles;
  isActive: boolean;
}

const userSchema = new Schema(
  {
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
