import { Character, PagedResponse, Quote } from "../types/index";
import { BaseAPI } from "../base";
export declare class CharactersAPI extends BaseAPI {
    get valid(): boolean;
    getAll(): Promise<PagedResponse<Character[]>>;
    getPage(page: number): Promise<PagedResponse<Character[]>>;
    getById(characterId: string): Promise<Character>;
    getQuotes(characterId: string): Promise<Quote[]>;
}
