import { UserInterface } from "./data/mongodb";

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}
