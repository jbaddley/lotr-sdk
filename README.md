# Lord of the Rings SDK

A public SDK for the Books, Characters, Quotes, and Movies of the Lord of the Rings.

## Installation

You can install the package using `npm`:

```
npm install baddley-lotr-sdk
```

## Usage

Import the necessary classes and interfaces to start using the SDK:

```typescript
import PublicSDK, { APIConfig, Book, Chapter, Character, Movie, Quote } from "baddley-lotr-sdk";
```

Create an instance of the SDK with the desired configuration:

```typescript
const config: APIConfig = {
  apiKey: "your-api-key", // if left off, only the books methods will work
  baseUrl: "https://the-one-api.dev/v2/" // default, any change must adhere to this schema in order to work,
  cacheDuration: 10, // default in minutes
};
const sdk = new PublicSDK(config);
```

The `PublicSDK` class provides the following methods:

### Setting the api key after class instantiation

Sets the API key for all three APIs:

Used to set the api key after instantiation if needed.

```typescript
sdk.setApiKey("your-new-api-key");
```

## Examples

All examples given require the code example be in an async function as follows:

```typescript
async function getAllMovies() {
  const movies = await sdk.getMovies();
  // do something with movies
}
```

## Movies

### Retrieving all movies

Retrieves all movies from the moviesAPI and caches the result for a set duration. If movies have already been fetched and the cache has not expired, return the cached result.

```typescript
const movies = await sdk.getMovies();
```

### Retrieving a movie by id

Retrieves a single movie by ID from the moviesAPI and caches the result for a set duration. If the movie has already been fetched and the cache has not expired, return the cached result.

```typescript
const movieId = "your-movie-id";
const movie = await sdk.getMovie(movieId);
```

### Retrieving a movie by movie id

Searches for a movie by name and retrieves it from the cache or the moviesAPI.

```typescript
const movieName = "your-movie-name";
const movie = await sdk.getMovieByName(movieName);
```

### Retrieving quotes for a given movie

Retrieves all quotes associated with a particular movie from the moviesAPI and caches the result for a set duration. If the quotes have already been fetched and the cache has not expired, return the cached result.

```typescript
const movieId = "your-movie-id";
const quotes = await sdk.getMovieQuotes(movieId);
```

## Characters

### Retrieving all characters

Retrieves all characters from the charactersAPI and caches the result for a set duration. If characters have already been fetched and the cache has not expired, return the cached result.

```typescript
const characters = await sdk.getCharacters();
```

### Retrieving a character by character id

Retrieves a single character by ID from the charactersAPI and caches the result for a set duration. If the character has already been fetched and the cache has not expired, return the cached result.

```typescript
const characterId = "your-character-id";
const character = await sdk.getCharacter(characterId);
```

### Retrieving a character by name

Searches for a character by name and retrieves it from the cache or the charactersAPI.

```typescript
const characterName = "your-character-name";
const character = await sdk.getCharacterByName(characterName);
```

### Retrieving all characters

To retrieve all characters from the CharactersAPI and cache the result for a set duration, call the `getCharacters` method:

```typescript
const characters = await sdk.getCharacters();
```

If characters have already been fetched and the cache has not expired, this method returns the cached result.

You can also pass a search string to filter the results by character name:

```typescript
const characters = await sdk.getCharacters("Gandalf");
```

### Retrieving character details

To retrieve character details for a given character ID, call the `getCharacter` method:

```typescript
const characterId = "12345";
const character = await sdk.getCharacter(characterId);
```

If the details are cached and still valid, this method returns them from the cache. Otherwise, it retrieves the details from the server API, caches them, and returns them.

You can also retrieve character details for a character with a given name by calling the `getCharacterByName` method:

```typescript
const characterName = "Gandalf";
const character = await sdk.getCharacterByName(characterName);
```

### Retrieving character quotes

To retrieve quotes for a given character ID, call the `getQuotesByCharacter` method:

```typescript
const characterId = "12345";
const quotes = await sdk.getQuotesByCharacter(characterId);
```

If the quotes are cached and still valid, this method returns them from the cache. Otherwise, it retrieves the quotes from the server API, retrieves the corresponding character and movie details, maps them together, caches them, and returns them.

## Books

### Retrieving books

To retrieve all books from the BooksAPI and cache the result for a set duration, call the `getBooks` method:

```typescript
const books = await sdk.getBooks();
```

If books have already been fetched and the cache has not expired, this method returns the cached result.

You can also pass a search string to filter the results by book title:

```typescript
const books = await sdk.getBooks("The Lord of the Rings");
```

### Retrieving book details

To retrieve book details for a given book ID, call the `getBook` method:

```typescript
const bookId = "12345";
const book = await sdk.getBook(bookId);
```

If the details are cached and still valid, this method returns them from the cache. Otherwise, it retrieves the details from the server API, caches them, and returns them.

### Retrieving book chapters

To retrieve chapters for a given book ID, call the `getChapters` method.

```typescript
const bookId = "12345";
const chapters = await sdk.getChapters(bookId);
```

## Lord of the Rings SDK Playground

The Lord of the Rings SDK Playground is an online platform that allows users to explore the books, chapters, movies, characters, and quotes of J.R.R. Tolkien's masterpiece. This platform utilizes a Software Development Kit (SDK) that provides access to a vast collection of data related to the Lord of the Rings universe.

Users can visit the website at https://lotr-sdk-playground.vercel.app/ to access the playground. The interface is user-friendly and easy to navigate. Users can choose from various options on the home screen, such as Books, Movies, and Characters, to explore the Lord of the Rings universe.

You can test your api key and unlock additional features using the input at the top of the page.

## Design doc

The documentation on design considerations can be found at https://github.com/jbaddley/lotr-sdk/blob/main/design.md.

Thank you for your consideration. Looking forward to meeting with you.

Jason Baddley
