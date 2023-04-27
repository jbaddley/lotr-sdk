# Lord of the Rings SDK

An SDK that provides an interface for users to get information about The Lord of the Rings books, movies, quotes, and characters. All calls are asynchronous.

## Installation

To install the package, run the following command:

```bash
npm install baddley-lotr-sdk
```

## Usage

The package provides the following classes for the interface:

```typescript
class PublicSDK {
  constructor(config?: APIConfig);

  async getBooks(): Promise<Book[]>;
  async getBook(bookId: string): Promise<Book>;
  async getBookByName(partialName: string): Promise<Book>;
  async getChaptersByBook(bookId: string): Promise<Chapter[]>;
  async getCharacters(search?: string): Promise<Character[]>;
  async getCharacterByName(partialName: string): Promise<Character>;
  async getCharacter(characterId: string): Promise<Character>;
  async getQuotesByCharacter(characterId: string): Promise<Quote[]>;
  async getMovies(): Promise<Movie[]>;
  async getMovie(movieId: string): Promise<Movie>;
  async getMovieByName(partialName: string): Promise<Movie>;
  async getMovieQuotes(movieId: string): Promise<Quote[]>;
}
```

Here is an example of how to use the SDK:

```javascript
import PublicSDK from "baddley-lotr-sdk";

const sdk = new PublicSDK();

sdk.getBooks().then((books) => {
  console.log(books);
});

sdk.getCharacters().then((characters) => {
  console.log(characters);
});

sdk.getCharacters("gandolf").then((characters) => {
  console.log(characters);
});

sdk.getMovies().then((movies) => {
  console.log(movies);
});

sdk.getBook("[bookId]").then((book) => {
  console.log(book);
});

sdk.getBookByName("fellowship").then((book) => {
  console.log(book);
});

sdk.getCharacter("[characterId]").then((character) => {
  console.log(character);
});

sdk.getCharacterByName("Samwise").then((character) => {
  console.log(character);
});

sdk.getMovie("[bookId]").then((movie) => {
  console.log(movie);
});

sdk.getMovieByName("Towers").then((movie) => {
  console.log(movie);
});

sdk.getChaptersByBook("[bookId]").then((chapters) => {
  console.log(chapters);
});

sdk.getQuotesByCharacter("[characterId]").then((quotes) => {
  console.log(quotes);
});

sdk.getMovieQuotes("[movieId]").then((quotes) => {
  console.log(quotes);
});
```

## Using with Typescript

```typescript
import PublicSDK, { Book, Movie, Character, Quote } from "baddley-lotr-sdk";

const sdk = new PublicSDK();

sdk.getBooks().then((books: Book[]) => {
  console.log(books);
});

sdk.getCharacters().then((characters: Character[]) => {
  console.log(characters);
});

sdk.getMovies().then((movies: Movie[]) => {
  console.log(movies);
});

sdk.getQuotesByCharacter("[characterId]").then((quotes: Quote[]) => {
  console.log(quotes);
});

sdk.getMovieQuotes("[movieId]").then((quotes: Quote[]) => {
  console.log(quotes);
});
```

## Lord of the Rings SDK Playground

The Lord of the Rings SDK Playground is an online platform that allows users to explore the books, chapters, movies, characters, and quotes of J.R.R. Tolkien's masterpiece. This platform utilizes a Software Development Kit (SDK) that provides access to a vast collection of data related to the Lord of the Rings universe.

Users can visit the website at https://lotr-sdk-playground.vercel.app/ to access the playground. The interface is user-friendly and easy to navigate. Users can choose from various options on the home screen, such as Books, Movies, and Characters, to explore the Lord of the Rings universe.

For example, by selecting the "Books" option, users can access information about all the books in the Lord of the Rings series. Selecting a book shows the chapters titles of the selected book.
