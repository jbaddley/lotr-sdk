import PublicSDK from "../src";

const api = new PublicSDK({
  apiKey: process.env.API_KEY,
});

const bookId = "5cf5805fb53e011a64671582";
test("get all lotr books", async () => {
  const books = await api.getBooks();
  const cachedBooks = await api.getBooks();
  expect(books.length).toBeGreaterThan(0);
  // checks the referenece to make sure it is the cached version
  expect(books === cachedBooks).toBe(true);
  // does a deep compare
  expect(books).toStrictEqual(cachedBooks);
});

test("get single lotr book", async () => {
  const book = await api.getBook(bookId);
  const cachedBook = await api.getBook(bookId);
  expect(book === cachedBook).toBe(true);
  expect(book?.name).toContain("Fellowship");
});

test("bad id should be undefined", async () => {
  const book = await api.getBook("BAD_ID");
  expect(book?.name).toBeFalsy();
});

test("get book by partial name", async () => {
  const book = await api.getBookByName("fellowship");
  expect(book?.name).toEqual("The Fellowship Of The Ring");
});

test("get all chapters for a book", async () => {
  const chapters = await api.getChaptersByBook(bookId);
  const cachedChapters = await api.getChaptersByBook(bookId);
  expect(chapters === cachedChapters).toBe(true);
  expect(chapters?.length).toBeGreaterThan(0);
});
