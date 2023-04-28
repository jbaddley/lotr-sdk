export type BookId = string;
export type CharacterId = string;
export type MovieId = string;
export interface CacheDateTimes {
  movies?: string;
  books?: string;
  bookDetails?: Record<BookId, string>;
  movieDetails?: Record<MovieId, string>;
  characterDetails?: Record<CharacterId, string>;
  chapters?: Record<BookId, string>;
  characters?: Record<string, string>;
  movieQuotes?: Record<MovieId, string>;
  characterQuotes?: Record<CharacterId, string>;
}

export interface APIConfig {
  apiKey?: string;
  baseUrl?: string;
  cacheDuration?: number;
}
export interface Book {
  _id: string;
  name: string;
}
export interface Chapter {
  _id: string;
  chapterName: string;
}

export interface PagedResponse<T> {
  docs: T;
  limit: number;
  offset: number;
  page: number;
  pages: number;
  total: number;
}
export interface Character {
  _id: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  name: string;
  wikiUrl: string;
}
export interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface Quote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
  characterData?: Character;
  movieData?: Movie;
}
