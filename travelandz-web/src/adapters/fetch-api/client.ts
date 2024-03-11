"use client";
import { fetchApiAdapter } from "./adapter";

const clientCookies = () => {
  const cookiesStore = document.cookie.split("; ");
  return {
    get: (cookieName: string) => {
      const findCookie = cookiesStore.find(
        (item) => item.split("=")[0] === cookieName
      );
      if (!findCookie) return undefined;
      const cookieRaw = findCookie.split("=");
      return { name: cookieRaw[0], value: decodeURIComponent(cookieRaw[1]) };
    },
  };
};
export const TRAVELANDZ_API_CLIENT = new fetchApiAdapter(
  process.env.NEXT_PUBLIC_TRAVELANDZ_API_URL!,
  clientCookies
);
