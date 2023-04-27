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

const defaultCacheDateTimes = {
  chapters: {},
  movieQuotes: {},
  bookDetails: {},
  movieDetails: {},
  characterDetails: {},
  characterQuotes: {},
};

/**
  This class provides a public SDK for the Books, Characters, Quotes and Movies APIs.
  It is used to get data from these APIs and store them for caching purposes.
  @param {APIConfig} config - Configuration object for the APIs
*/
export default class PublicSDK {
  private config: APIConfig;
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
  private cacheDateTimes: CacheDateTimes = defaultCacheDateTimes;

  constructor(config?: APIConfig) {
    this.config = config = {};
    this.booksAPI = new BooksAPI(config);
    this.moviesAPI = new MoviesAPI(config);
    this.charactersAPI = new CharactersAPI(config);
    if (config && config.cacheDuration) {
      this.cacheDuration = config.cacheDuration;
    }
  }

  /**
    Set the API key for all three APIs
    @param {string} apiKey - The API key to be set
  */
  public setApiKey(apiKey: string) {
    this.booksAPI.setApiKey(apiKey);
    this.moviesAPI.setApiKey(apiKey);
    this.charactersAPI.setApiKey(apiKey);
    this.cacheDateTimes = defaultCacheDateTimes;
  }

  public get hasApiKey() {
    return !!this.config.apiKey;
  }

  /**
    Retrieves all movies from the moviesAPI and caches the result for a set duration
    If movies have already been fetched and the cache has not expired, return the cached result
    @returns {Promise<Movie[]>} A promise containing an array of Movie objects
  */
  public async getMovies(): Promise<Movie[]> {
    if (this.movies && dayjs().isBefore(this.cacheDateTimes.movies)) {
      return Promise.resolve(this.movies);
    }
    this.cacheDateTimes.movies = getNextCache(this.cacheDuration);
    this.movies = await this.moviesAPI.getAll();
    return this.movies;
  }

  /**
    Retrieves a single movie by ID from the moviesAPI and caches the result for a set duration
    If the movie has already been fetched and the cache has not expired, return the cached result
    @param {string} movieId - The ID of the movie to retrieve
    @returns {Promise<Movie>} A promise containing a single Movie object
  */
  public async getMovie(movieId: string): Promise<Movie> {
    if (this.movieDetails[movieId] && dayjs().isBefore(this.cacheDateTimes.movieDetails[movieId])) {
      return Promise.resolve(this.movieDetails[movieId]);
    }
    this.cacheDateTimes.movieDetails[movieId] = getNextCache(this.cacheDuration);
    this.movieDetails[movieId] = await this.moviesAPI.getById(movieId);
    return this.movieDetails[movieId];
  }

  /**
    Searches for a movie by name and retrieves it from the cache or the moviesAPI
    @param {string} name - The name of the movie to search for
    @returns {Promise<Movie | undefined>} A promise containing the Movie object if found, otherwise undefined
  */
  public async getMovieByName(name: string): Promise<Movie | undefined> {
    const search = name.toLowerCase();
    const movie = (await this.getMovies()).find(({ name }) => name.toLowerCase().includes(search));
    if (movie) {
      return this.getMovie(movie._id);
    }
    return undefined;
  }

  /**
    Retrieves all quotes associated with a particular movie from the moviesAPI and caches the result for a set duration
    If the quotes have already been fetched and the cache has not expired, return the cached result
    @param {MovieId} movieId - The ID of the movie to retrieve quotes for
    @returns {Promise<Quote[]>} A promise containing an array of Quote objects associated with the movie
  */
  public async getMovieQuotes(movieId: MovieId): Promise<Quote[]> {
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

  /**
    Retrieves all books from the booksAPI and caches the result for a set duration
    If books have already been fetched and the cache has not expired, return the cached result
    @returns {Promise<Book[]>} A promise containing an array of Book objects
  */
  public async getBooks(): Promise<Book[]> {
    if (this.books && dayjs().isBefore(this.cacheDateTimes.books)) {
      return Promise.resolve(this.books);
    }
    this.cacheDateTimes.books = getNextCache(this.cacheDuration);
    this.books = await this.booksAPI.getAll();
    return this.books;
  }

  /**
    Retrieves a single book by ID from the booksAPI and caches the result for a set duration
    If the book has already been fetched and the cache has not expired, return the cached result
    @param {string} bookId - The ID of the book to retrieve
    @returns {Promise<Book>} A promise containing a single Book object
  */
  public async getBook(bookId: string): Promise<Book> {
    if (this.bookDetails[bookId] && dayjs().isBefore(this.cacheDateTimes.bookDetails[bookId])) {
      return Promise.resolve(this.bookDetails[bookId]);
    }
    this.cacheDateTimes.bookDetails[bookId] = getNextCache(this.cacheDuration);
    this.bookDetails[bookId] = await this.booksAPI.getById(bookId);
    return this.bookDetails[bookId];
  }

  /**
    Searches for a book by name and retrieves it from the cache or the booksAPI
    @param {string} name - The name of the book to search for
    @returns {Promise<Book | undefined>} A promise containing the Book object if found, otherwise undefined
  */
  public async getBookByName(name: string): Promise<Book | undefined> {
    const search = name.toLowerCase();
    const book = (await this.getBooks()).find(({ name }) => name.toLowerCase().includes(search));
    if (book) {
      return this.getBook(book._id);
    }
    return undefined;
  }

  /**
    Retrieves all chapters associated with a particular book from the booksAPI and caches the result for a set duration
    If the chapters have already been fetched and the cache has not expired, return the cached result
    @param {string} bookId - The ID of the book to retrieve chapters for
    @returns {Promise<Chapter[]>} A promise containing an array of Chapter objects associated with the book
  */
  public async getChaptersByBook(bookId: string): Promise<Chapter[]> {
    if (this.chapters[bookId] && dayjs().isBefore(this.cacheDateTimes.chapters[bookId])) {
      return Promise.resolve(this.chapters[bookId]);
    }
    this.cacheDateTimes.chapters[bookId] = getNextCache(this.cacheDuration);
    this.chapters[bookId] = await this.booksAPI.getChapters(bookId);
    return this.chapters[bookId];
  }

  /**
    Retrieves all characters from the charactersAPI and caches the result for a set duration
    If characters have already been fetched and the cache has not expired, return the cached result
    If a search string is provided, filters the results to match the search string
    @param {string} search - Optional: A string to search for in the character names
    @returns {Promise<Character[]>} A promise containing an array of Character objects
  */
  public async getCharacters(search?: string): Promise<Character[]> {
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

  /**
    Retrieves character details for the given character ID.
    If the details are cached and still valid, returns them from the cache.
    Otherwise, retrieves the details from the server API, caches them, and returns them.
    @param characterId - the ID of the character to retrieve
    @returns a Promise that resolves with the character details object
  */
  public async getCharacter(characterId: string): Promise<Character> {
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

  /**
    Retrieves character details for the character with the given name.
    First retrieves all characters, then finds the character with the given name.
    If found, retrieves and returns the character details using its ID.
    @param name - the name of the character to retrieve
    @returns a Promise that resolves with the character details object, or undefined if the character is not found
  */
  public async getCharacterByName(name: string): Promise<Character> {
    const search = name.toLowerCase();
    const character = (await this.getCharacters()).find(({ name }) => name.toLowerCase().includes(search));
    if (character) {
      return this.getCharacter(character._id);
    }
    return undefined;
  }

  /**
    Retrieves quotes for the given character ID.
    If the quotes are cached and still valid, returns them from the cache.
    Otherwise, retrieves the quotes from the server API, retrieves the corresponding character and movie details,
    maps them together, caches them, and returns them.
    @param characterId - the ID of the character whose quotes to retrieve
    @returns a Promise that resolves with an array of quote objects with movie and character details included
  */
  public async getQuotesByCharacter(characterId: string): Promise<Quote[]> {
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
