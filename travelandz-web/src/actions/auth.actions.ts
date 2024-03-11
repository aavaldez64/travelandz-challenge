"use server";

import { TRAVELANDZ_API } from "@/adapters/fetch-api/server";
import { signIn, signOut } from "@/auth.config";
import { LoginUserProps, RegisterUserProps } from "@/interfaces";
import { AuthService } from "@/services";

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

export async function ActionRegister(registerUserProps: RegisterUserProps) {
  const response = await AuthService.register(
    registerUserProps,
    TRAVELANDZ_API
  );
  console.log(response);
  if (!response.ok) {
    throw new Error(response.data.message);
  }
  const credentials = {
    username: registerUserProps.username,
    password: registerUserProps.password,
  };
  return await ActionLogin(credentials);
}
