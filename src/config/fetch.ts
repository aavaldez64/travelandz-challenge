import { envs } from "./envs";

class FetchAPIAdapter {
  private readonly API_KEYS = {
    ["Api-Key"]: envs.HOTEL_BEDS_API_KEY,
    ["X-Signature"]: envs.HOTEL_BEDS_X_SIGNATURE,
  };
  constructor(private readonly API_URL: string) {}
  get(url: string, options?: RequestInit) {
    return fetch(this.getURL(url), {
      method: "GET",
      headers: {
        ...this.API_KEYS,
      },
      ...options,
    });
  }
  post(url: string, body: any = {}, options?: RequestInit) {
    return fetch(this.getURL(url), {
      method: "POST",
      headers: {
        ...this.API_KEYS,
        "Content-Type": "application/json",
      },
      ...options,
      body: JSON.stringify(body),
    });
  }
  put(url: string, body: any, options?: RequestInit) {
    return fetch(this.getURL(url), {
      method: "PUT",
      headers: {
        ...this.API_KEYS,
        "Content-Type": "application/json",
      },
      ...options,
      body: JSON.stringify(body),
    });
  }
  patch(url: string, body: any, options?: RequestInit) {
    return fetch(this.getURL(url), {
      method: "PATCH",
      headers: {
        ...this.API_KEYS,
        "Content-Type": "application/json",
      },
      ...options,
      body: JSON.stringify(body),
    });
  }
  delete(url: string, options?: RequestInit) {
    return fetch(this.getURL(url), {
      method: "DELETE",
      headers: {
        ...this.API_KEYS,
      },
      ...options,
    });
  }

  private getURL = (url: string) => {
    return `${this.API_URL}${url}`;
  };
}

export const fetchHotelBedsAPI = new FetchAPIAdapter(envs.HOTEL_BEDS_API_URL);
