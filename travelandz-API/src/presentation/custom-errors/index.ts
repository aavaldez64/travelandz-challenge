import type { Response } from "express";
import { CustomError } from "../../domain/errors";

export const ResponseError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.log(error);
  res.status(500).json({ message: "Internal Server Error" });
};
