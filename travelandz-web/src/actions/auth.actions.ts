"use server";

import { signIn, signOut } from "@/auth.config";
import { LoginUserProps } from "@/interfaces";

export async function ActionLogin(credentials: LoginUserProps) {
  return signIn("credentials", {
    ...credentials,
    redirect: true,
    redirectTo: "/dashboard",
  });
}

export async function ActionLogout() {
  return signOut({ redirect: true, redirectTo: "/" });
}
