import { COOKIE_NAMES } from "@/constants";

interface FetchProps {
  data?: any;
  next?: NextFetchRequestConfig;
  options?: RequestInit | undefined;
}
type FetchPropsWithoutBody = Omit<FetchProps, "data">;
type NextFetchResponse<T> = {
  ok: boolean;
  status: number;
  data: T;
};
type CookieStore = () => {
  get: (cookieName: string) => { name: string; value: string } | undefined;
};
export class fetchApiAdapter {
  constructor(
    private readonly baseURL: string,
    private readonly cookiesStore: CookieStore
  ) {
    this.baseURL = baseURL;
  }
  public get = async <T = any>(
    url: string,
    { next = {}, options = {} }: FetchPropsWithoutBody = {}
  ): Promise<NextFetchResponse<T>> => {
    const auth_token = this.getToken();
    try {
      const response = await fetch(this.baseURL + url, {
        method: "GET",
        headers: {
          authorization: auth_token,
        },
        next,
        ...options,
      });
      return this.processResponse(response);
    } catch (error: any) {
      return this.sendResponseError(error);
    }
  };
  public post = async <T = any>(
    url: string,
    { data = {}, next = {}, options = {} }: FetchProps
  ): Promise<NextFetchResponse<T>> => {
    const auth_token = this.getToken();
    try {
      const response = await fetch(this.baseURL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: auth_token,
        },
        body: JSON.stringify(data),
        next,
        ...options,
      });
      return this.processResponse(response);
    } catch (error: any) {
      return this.sendResponseError(error);
    }
  };
  public patch = async <T = any>(
    url: string,
    { data = {}, next = {}, options = {} }: FetchProps
  ): Promise<NextFetchResponse<T>> => {
    const auth_token = this.getToken();
    try {
      const response = await fetch(this.baseURL + url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: auth_token,
        },
        body: JSON.stringify(data),
        next,
        ...options,
      });
      return this.processResponse(response);
    } catch (error: any) {
      return this.sendResponseError(error);
    }
  };
  public put = async <T = any>(
    url: string,
    { data = {}, next = {}, options = {} }: FetchProps
  ): Promise<NextFetchResponse<T>> => {
    const auth_token = this.getToken();
    try {
      const response = await fetch(this.baseURL + url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: auth_token,
        },
        body: JSON.stringify(data),
        next,
        ...options,
      });
      return this.processResponse(response);
    } catch (error: any) {
      return this.sendResponseError(error);
    }
  };
  public delete = async <T = any>(
    url: string,
    { next = {}, options = {} }: FetchPropsWithoutBody = {}
  ): Promise<NextFetchResponse<T>> => {
    const auth_token = this.getToken();
    try {
      const response = await fetch(this.baseURL + url, {
        method: "DELETE",
        headers: {
          authorization: auth_token,
        },
        next,
        ...options,
      });
      return this.processResponse(response);
    } catch (error: any) {
      return this.sendResponseError(error);
    }
  };

  private getToken = (): string => {
    const auth_token = this.cookiesStore().get(COOKIE_NAMES.JWT)?.value;
    if (!auth_token) return "";
    // console.log("auth_token", auth_token);
    return `Bearer ${auth_token}`;
  };
  private processResponse = async <T>(
    response: Response
  ): Promise<NextFetchResponse<T>> => {
    let responseData = {};
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      responseData = await response.json();
    }
    return {
      ok: response.ok,
      status: response.status,
      data: responseData as T,
    };
  };
  private sendResponseError = (error: any): NextFetchResponse<any> => {
    return {
      ok: false,
      status: error?.response?.status || 500,
      data: error?.response?.message || "Internal Server Error",
    };
  };
}
