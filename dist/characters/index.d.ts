import { Character, Quote } from "../types/index";
import { BaseAPI } from "../base";
export declare class CharactersAPI extends BaseAPI {
    getAll(): Promise<Character[]>;
    getById(characterId: string): Promise<Character>;
    getQuotes(characterId: string): Promise<Quote[]>;
}
