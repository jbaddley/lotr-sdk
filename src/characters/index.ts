import { Character, Quote } from "../types/index";
import { BaseAPI } from "../base";

export class CharactersAPI extends BaseAPI {
  async getAll(): Promise<Character[]> {
    const { docs } = await this.get<Character[]>("character");
    return docs;
  }

  async getById(characterId: string): Promise<Character> {
    const { docs = [] } = await this.get<Character>(`character/${characterId}`);
    return docs[0];
  }

  async getQuotes(characterId: string) {
    const { docs } = await this.get<Quote[]>(`character/${characterId}/quote`);

    return docs;
  }
}
