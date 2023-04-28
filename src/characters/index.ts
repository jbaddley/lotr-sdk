import { Character, PagedResponse, Quote } from "../types/index";
import { BaseAPI } from "../base";

export class CharactersAPI extends BaseAPI {
  get valid() {
    return !!this.config.apiKey;
  }
  async getAll(): Promise<PagedResponse<Character[]>> {
    return this.get<Character[]>("character");
  }

  async getPage(page: number): Promise<PagedResponse<Character[]>> {
    return this.get<Character[]>(`character?page=${page}&limit=25`);
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
