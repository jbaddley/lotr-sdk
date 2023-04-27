import { APIConfig } from "./types/index";
type APIResponse<T> = {
    docs: T;
};
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
    protected get<T>(path: string, options?: RequestInit): Promise<APIResponse<T>>;
    protected post<T, J>(path: string, payload?: J, options?: RequestInit): Promise<APIResponse<T>>;
    protected put<T, J>(path: string, payload?: J, options?: RequestInit): Promise<APIResponse<T>>;
    protected delete(path: string, options?: RequestInit): Promise<APIResponse<unknown>>;
}
export {};
