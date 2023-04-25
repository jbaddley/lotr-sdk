import { BaseAPI } from "../base";
import { Movie } from "../types/index";
export declare class Movies extends BaseAPI {
    getAll(): Promise<Movie[]>;
    getById(MovieId: string): Promise<Movie>;
    getQuotes(MovieId: string): Promise<{
        characterData: import("../types/index").Character;
        _id: string;
        dialog: string;
        movie: string;
        character: string;
        id: string;
    }[]>;
}
