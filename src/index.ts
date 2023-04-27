import { BooksAPI } from "./books/index";
import { CharactersAPI } from "./characters/index";
import { MoviesAPI } from "./movies/index";
import {
  APIConfig,
  Book,
  BookId,
  CacheDateTimes,
  Chapter,
  Character,
  CharacterId,
  Movie,
  MovieId,
  Quote,
} from "./types/index";
import dayjs from "dayjs";
export * from "./types";

function getNextCache(cacheDuration: number) {
  return dayjs().add(cacheDuration, "minute").toISOString();
}

export default class PublicSDK {
  private booksAPI: BooksAPI;
  private moviesAPI: MoviesAPI;
  private charactersAPI: CharactersAPI;
  private cacheDuration = 10;
  private books: Book[];
  private movies: Movie[];
  private characters: Character[];
  private bookDetails: Record<BookId, Book> = {};
  private movieDetails: Record<MovieId, Movie> = {};
  private characterDetails: Record<CharacterId, Character> = {};
  private chapters: Record<BookId, Chapter[]> = {};
  private movieQuotes: Record<MovieId, Quote[]> = {};
  private characterQuotes: Record<CharacterId, Quote[]> = {};
  private cacheDateTimes: CacheDateTimes = {
    chapters: {},
    movieQuotes: {},
    bookDetails: {},
    movieDetails: {},
    characterDetails: {},
    characterQuotes: {},
  };

  constructor(config?: APIConfig) {
    this.booksAPI = new BooksAPI(config);
    this.moviesAPI = new MoviesAPI(config);
    this.charactersAPI = new CharactersAPI(config);
    if (config && config.cacheDuration) {
      this.cacheDuration = config.cacheDuration;
    }
  }

  public async getMovies() {
    if (this.movies && dayjs().isBefore(this.cacheDateTimes.movies)) {
      return Promise.resolve(this.movies);
    }
    this.cacheDateTimes.movies = getNextCache(this.cacheDuration);
    this.movies = await this.moviesAPI.getAll();
    return this.movies;
  }

  public async getMovie(movieId: string) {
    if (this.movieDetails[movieId] && dayjs().isBefore(this.cacheDateTimes.movieDetails[movieId])) {
      return Promise.resolve(this.movieDetails[movieId]);
    }
    this.cacheDateTimes.movieDetails[movieId] = getNextCache(this.cacheDuration);
    this.movieDetails[movieId] = await this.moviesAPI.getById(movieId);
    return this.movieDetails[movieId];
  }

  public async getMovieByName(name: string) {
    const search = name.toLowerCase();
    const movie = (await this.getMovies()).find(({ name }) => name.toLowerCase().includes(search));
    if (movie) {
      return this.getMovie(movie._id);
    }
    return undefined;
  }

  public async getMovieQuotes(movieId: MovieId) {
    if (this.movieQuotes[movieId] && dayjs().isBefore(this.cacheDateTimes.movieQuotes[movieId])) {
      return Promise.resolve(this.movieQuotes[movieId]);
    }
    this.cacheDateTimes.movieQuotes[movieId] = getNextCache(this.cacheDuration);
    const quotes = await this.moviesAPI.getQuotes(movieId);
    const characters = await this.getCharacters();
    const movies = await this.getMovies();

    this.movieQuotes[movieId] = quotes.map((q) => ({
      ...q,
      movieData: movies.find(({ _id }) => _id === q.movie),
      characterData: characters.find(({ _id }) => _id === q.character),
    }));
    return this.movieQuotes[movieId];
  }

  public async getBooks() {
    if (this.books && dayjs().isBefore(this.cacheDateTimes.books)) {
      return Promise.resolve(this.books);
    }
    this.cacheDateTimes.books = getNextCache(this.cacheDuration);
    this.books = await this.booksAPI.getAll();
    return this.books;
  }

  public async getBook(bookId: string) {
    if (this.bookDetails[bookId] && dayjs().isBefore(this.cacheDateTimes.bookDetails[bookId])) {
      return Promise.resolve(this.bookDetails[bookId]);
    }
    this.cacheDateTimes.bookDetails[bookId] = getNextCache(this.cacheDuration);
    this.bookDetails[bookId] = await this.booksAPI.getById(bookId);
    return this.bookDetails[bookId];
  }

  public async getBookByName(name: string) {
    const search = name.toLowerCase();
    const book = (await this.getBooks()).find(({ name }) => name.toLowerCase().includes(search));
    if (book) {
      return this.getBook(book._id);
    }
    return undefined;
  }

  public async getChaptersByBook(bookId: string) {
    if (this.chapters[bookId] && dayjs().isBefore(this.cacheDateTimes.chapters[bookId])) {
      return Promise.resolve(this.chapters[bookId]);
    }
    this.cacheDateTimes.chapters[bookId] = getNextCache(this.cacheDuration);
    this.chapters[bookId] = await this.booksAPI.getChapters(bookId);
    return this.chapters[bookId];
  }

  public async getCharacters(search?: string) {
    if (!this.characters || !dayjs().isBefore(this.cacheDateTimes.characters)) {
      this.cacheDateTimes.characters = getNextCache(this.cacheDuration);
      this.characters = await this.charactersAPI.getAll();
    }
    if (search) {
      const s = search.toLowerCase();
      return this.characters.filter(({ name }) => {
        return name.toLowerCase().includes(s);
      });
    }
    return this.characters;
  }

  public async getCharacter(characterId: string) {
    if (
      this.characterDetails[characterId] &&
      dayjs().isBefore(this.cacheDateTimes.characterDetails[characterId])
    ) {
      return Promise.resolve(this.characterDetails[characterId]);
    }
    this.cacheDateTimes.characterDetails[characterId] = getNextCache(this.cacheDuration);
    this.characterDetails[characterId] = await this.charactersAPI.getById(characterId);
    return this.characterDetails[characterId];
  }

  public async getCharacterByName(name: string) {
    const search = name.toLowerCase();
    const character = (await this.getCharacters()).find(({ name }) => name.toLowerCase().includes(search));
    if (character) {
      return this.getCharacter(character._id);
    }
    return undefined;
  }

  public async getQuotesByCharacter(characterId: string) {
    if (
      this.characterQuotes[characterId] &&
      dayjs().isBefore(this.cacheDateTimes.characterQuotes[characterId])
    ) {
      return Promise.resolve(this.characterQuotes[characterId]);
    }
    this.cacheDateTimes.characterQuotes[characterId] = getNextCache(this.cacheDuration);
    const quotes = await this.charactersAPI.getQuotes(characterId);
    const characters = await this.getCharacters();
    const movies = await this.getMovies();
    this.characterQuotes[characterId] = quotes.map((q) => ({
      ...q,
      movieData: movies.find(({ _id }) => _id === q.movie),
      characterData: characters.find(({ _id }) => _id === q.character),
    }));
    return this.characterQuotes[characterId];
  }
}
