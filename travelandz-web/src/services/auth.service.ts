import { fetchApiAdapter } from "@/adapters/fetch-api/adapter";
import {
  LoginUserProps,
  LoginUserResponse,
  RegisterUserProps,
} from "@/interfaces";

export class AuthService {
  static async login(
    loginUserProps: LoginUserProps,
    fetchApi: fetchApiAdapter
  ) {
    const response = await fetchApi.post<LoginUserResponse>("/auth/login", {
      data: loginUserProps,
    });
    return response;
  }
  static async register(
    registerUserProps: RegisterUserProps,
    fetchApi: fetchApiAdapter
  ) {
    const response = await fetchApi.post("/auth/register", {
      data: registerUserProps,
    });
    return response;
  }
}
