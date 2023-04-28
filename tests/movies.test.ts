import PublicSDK from "../src";

const api = new PublicSDK({
  apiKey: process.env.API_KEY,
});

const movieId = "5cd95395de30eff6ebccde5c";
test("get all lotr movies", async () => {
  const movies = await api.getMovies();
  const cachedMovies = await api.getMovies();
  expect(movies === cachedMovies).toBe(true);
  expect(movies.length).toBeGreaterThan(0);
});

test("get single lotr movie", async () => {
  const movie = await api.getMovie(movieId);
  const cachedMovie = await api.getMovie(movieId);
  expect(movie === cachedMovie).toBe(true);
  expect(movie?.name).toContain("The Fellowship of the Ring");
});

test("get movie by partial name", async () => {
  const movie = await api.getMovieByName("towers");
  expect(movie?.name).toContain("Towers");
});

test("get all quotes for a movie", async () => {
  const quotes = await api.getMovieQuotes(movieId);
  const cachedQuotes = await api.getMovieQuotes(movieId);
  expect(quotes === cachedQuotes).toBe(true);
  expect(quotes?.length).toBeGreaterThan(0);
});
