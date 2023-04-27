import { BaseAPI } from "../base";
import { Movie, Quote } from "../types/index";

export class MoviesAPI extends BaseAPI {
  get valid() {
    return true;
  }
  async getAll(): Promise<Movie[]> {
    const { docs } = await this.get<Movie[]>("movie");
    return docs;
  }

  async getById(movieId: string): Promise<Movie> {
    const { docs = [] } = await this.get<Movie>(`movie/${movieId}`);
    return docs[0];
  }

  async getQuotes(movieId: string) {
    const { docs } = await this.get<Quote[]>(`movie/${movieId}/quote`);

    return docs;
  }
}
