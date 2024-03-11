import { cookies } from "next/headers";
import { fetchApiAdapter } from "./adapter";

export const TRAVELANDZ_API = new fetchApiAdapter(
  process.env.NEXT_PUBLIC_TRAVELANDZ_API_URL!,
  cookies
);
