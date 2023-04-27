import { BaseAPI } from "../base";
import { Movie, Quote } from "../types/index";
export declare class MoviesAPI extends BaseAPI {
    get valid(): boolean;
    getAll(): Promise<Movie[]>;
    getById(movieId: string): Promise<Movie>;
    getQuotes(movieId: string): Promise<Quote[]>;
}
