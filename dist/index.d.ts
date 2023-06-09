import { APIConfig, Book, Chapter, Character, Movie, MovieId, PagedResponse, Quote } from "./types/index";
export * from "./types";
export default class PublicSDK {
    private config;
    private booksAPI;
    private moviesAPI;
    private charactersAPI;
    private cacheDuration;
    private books;
    private movies;
    private characters;
    private bookDetails;
    private movieDetails;
    private characterDetails;
    private chapters;
    private movieQuotes;
    private characterQuotes;
    private cacheDateTimes;
    constructor(config?: APIConfig);
    setApiKey(apiKey: string): void;
    get hasApiKey(): boolean;
    getMovies(): Promise<Movie[]>;
    getMovie(movieId: string): Promise<Movie>;
    getMovieByName(name: string): Promise<Movie | undefined>;
    getMovieQuotes(movieId: MovieId): Promise<Quote[]>;
    getBooks(): Promise<Book[]>;
    getBook(bookId: string): Promise<Book>;
    getBookByName(name: string): Promise<Book | undefined>;
    getChaptersByBook(bookId: string): Promise<Chapter[]>;
    getCharacters(search?: string): Promise<Character[]>;
    getCharactersByPage(page?: number): Promise<PagedResponse<Character[]>>;
    getCharacter(characterId: string): Promise<Character>;
    getCharacterByName(name: string): Promise<Character>;
    getQuotesByCharacter(characterId: string): Promise<Quote[]>;
}
