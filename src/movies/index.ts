import { Characters } from "../characters/index";
import { BaseAPI } from "../base";
import { Movie, Quote } from "../types/index";

export class Movies extends BaseAPI {
  async getAll(): Promise<Movie[]> {
    const { docs } = await this.get<Movie[]>("movie");
    return docs;
  }

  async getById(MovieId: string): Promise<Movie> {
    const { docs = [] } = await this.get<Movie>(`movie/${MovieId}`);
    return docs[0];
  }

  async getQuotes(MovieId: string) {
    const CharAPI = new Characters(this.config);
    const { docs } = await this.get<Quote[]>(`movie/${MovieId}/quote`);
    const characters = await CharAPI.getAll();

    return docs.map((quote) => ({
      ...quote,
      characterData: characters.find(({ _id }) => _id === quote.character),
    }));
  }
}
