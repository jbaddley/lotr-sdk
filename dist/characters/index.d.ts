import { Character } from "../types/index";
import { BaseAPI } from "../base";
export declare class Characters extends BaseAPI {
    getAll(): Promise<Character[]>;
    getById(characterId: string): Promise<Character>;
    getQuotes(characterId: string): Promise<{
        characterData: Character;
        _id: string;
        dialog: string;
        movie: string;
        character: string;
        id: string;
    }[]>;
}
