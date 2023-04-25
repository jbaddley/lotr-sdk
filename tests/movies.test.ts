import API from "../src";
const api = new API();

const movieId = "5cd95395de30eff6ebccde5c";
test("get all lotr movies", async () => {
  const movies = await api.Movies.getAll();
  expect(movies.length).toBeGreaterThan(0);
});

test("get single lotr movie", async () => {
  const movie = await api.Movies.getById(movieId);
  expect(movie?.name).toContain("The Fellowship of the Ring");
});

test("get all quotes for a movie", async () => {
  const quotes = await api.Movies.getQuotes(movieId);
  expect(quotes?.length).toBeGreaterThan(0);
});
