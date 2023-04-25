import { Character, Quote } from "../types/index";
import { BaseAPI } from "../base";

export class Characters extends BaseAPI {
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
    const characters = await this.getAll();

    return docs.map((quote) => ({
      ...quote,
      characterData: characters.find(({ _id }) => _id === quote.character),
    }));
  }
}
