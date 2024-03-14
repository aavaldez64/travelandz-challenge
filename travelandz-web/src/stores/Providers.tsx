"use client";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { ActionLogout, ActionVerifyToken } from "@/actions";

interface Props extends React.PropsWithChildren {}

export function Providers({ children }: Props) {
  useEffect(() => {
    (async () => {
      const response = await ActionVerifyToken();
      if (!response.authenticated) {
        await ActionLogout();
      }
    })();
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
}
