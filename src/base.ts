import { APIConfig } from "./types/index";

type SupportedMethods = "GET" | "POST" | "PUT" | "DELETE";
type APIResponse<T> = { docs: T };

export abstract class BaseAPI {
  private apiKey: string;
  private baseUrl: string = "https://the-one-api.dev/v2/";

  constructor(config?: APIConfig) {
    if (config) {
      if (config.apiKey) {
        this.apiKey = config.apiKey;
      }
      if (config.baseUrl) {
        this.baseUrl = config.baseUrl;
      }
    }
  }

  get config() {
    return {
      apiKey: this.apiKey,
      baseUrl: this.baseUrl,
    };
  }

  public setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  get headers() {
    if (this.apiKey) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      };
    }
    return {
      "Content-Type": "application/json",
    };
  }

  private invoke<T>(path: string, method: SupportedMethods, options?: RequestInit): Promise<APIResponse<T>> {
    return fetch(`${this.baseUrl}${path}`, { ...options, method, headers: this.headers }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    });
  }

  protected get<T>(path: string, options?: RequestInit) {
    return this.invoke<T>(path, "GET", options);
  }

  protected post<T, J>(path: string, payload?: J, options?: RequestInit) {
    return this.invoke<T>(path, "POST", { ...options, body: JSON.stringify(payload) });
  }

  protected put<T, J>(path: string, payload?: J, options?: RequestInit) {
    return this.invoke<T>(path, "PUT", { ...options, body: JSON.stringify(payload) });
  }

  protected delete(path: string, options?: RequestInit) {
    return this.invoke(path, "DELETE", options);
  }
}
