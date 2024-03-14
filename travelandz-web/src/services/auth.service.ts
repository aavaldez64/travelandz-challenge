import { fetchApiAdapter } from "@/adapters/fetch-api/adapter";
import type {
  LoginUserProps,
  LoginUserResponse,
  RegisterUserProps,
  RegisterUserResponse,
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
    const response = await fetchApi.post<RegisterUserResponse>(
      "/auth/register",
      {
        data: registerUserProps,
      }
    );
    return response;
  }
  static async verifyToken(fetchApi: fetchApiAdapter) {
    const response = await fetchApi.get("/auth/verify-token");
    return response;
  }
}
