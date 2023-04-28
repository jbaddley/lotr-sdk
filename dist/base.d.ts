import { APIConfig, PagedResponse } from "./types/index";
export declare abstract class BaseAPI {
    private apiKey;
    private baseUrl;
    constructor(config?: APIConfig);
    get config(): {
        apiKey: string;
        baseUrl: string;
    };
    setApiKey(apiKey: string): void;
    get headers(): {
        "Content-Type": string;
        Authorization: string;
    } | {
        "Content-Type": string;
        Authorization?: undefined;
    };
    private invoke;
    protected get<T>(path: string, options?: RequestInit): Promise<PagedResponse<T>>;
    protected post<T, J>(path: string, payload?: J, options?: RequestInit): Promise<PagedResponse<T>>;
    protected put<T, J>(path: string, payload?: J, options?: RequestInit): Promise<PagedResponse<T>>;
    protected delete(path: string, options?: RequestInit): Promise<PagedResponse<unknown>>;
}
