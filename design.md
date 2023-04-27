# Building a Node.js SDK for Lord of the Rings

Lord of the Rings is a popular fictional universe with a vast amount of data and information. This data is usually available through Restful APIs, but interacting with them can be cumbersome and error-prone. To alleviate this, we can build a Node.js SDK that abstracts the logic behind a Restful endpoint.

The SDK will provide an easy-to-use interface for developers to interact with the Lord of the Rings data without worrying about the implementation details of the Restful endpoint. It will allow developers to quickly and easily access the data they need to build their applications.

## TypeScript Class

To build the SDK, I created a TypeScript class called `PublicSDK` that has several methods that correspond to the various endpoints of the Lord of the Rings API. It also abstracts some of the methods of the endpoint to make it easier to search and combine entities.

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

The class has several methods that correspond to the various endpoints of the Lord of the Rings API. For example, `getBooks` will return a list of all the books, `getBook` will return a specific book by its ID, and `getCharacters` will return a list of all characters in the Lord of the Rings universe.

## Benefits of using ChatGPT for documentation

Documentation is an essential aspect of software development, and it's crucial to have good documentation for any SDK. One way to create documentation is to use tools like ChatGPT to write boilerplate documentation.

ChatGPT can generate initial documentation based on the code and comments, which can save time and effort. Additionally, ChatGPT can help ensure consistency in the documentation, reducing errors and making it easier to read.

However, it's important to note that automated documentation should not replace thorough, human-written documentation. Instead, it should serve as a starting point that developers can build on and improve.

## Notes by the Author

I used ChatGPT to generate some of the documentation. In fact, above this section was all written by ChatGPT. I made some slight tweaks, but it is largely all AI driven. This saved me time and allowed me focus on doing more implementation. None of the code was written by AI.

As far as the code, I chose to use Node.js and TypeScript to create a single Public class that contained all the methods needed to interact with the data. I wrote some primitive in-memory cacheing so that I could minimize multiple calls to the api, especially when combining entities.

I used `jest` to write some simple unit tests to ensure the class worked.

If this was going to be an actual sdk, I would not include a default `apiKey` in the code. This was done to make it easier to use for this single instance. The main change would be making the APIConfig mandatory. Users of the SDK would need to supply their own `apiKey` in order to use all the features.

## The LOTR SDK Playground

In order to show the functionality of the SDK, I built a NextJS app using Vercel. This was done for speed of development. I used Semantic UI for simple styling and basic components. I also used React's context api to allow the app to use the same instance of the SDK everywhere in the playground, this maximizes the in-memory cache.

The playground is available at: https://lotr-sdk-playground.vercel.app/
