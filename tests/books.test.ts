import API from "../src";
const api = new API();

const bookId = "5cf5805fb53e011a64671582";
test("get all lotr books", async () => {
  const books = await api.Books.getAll();
  console.log({ books });
  expect(books.length).toBeGreaterThan(0);
});

test("get single lotr book", async () => {
  const book = await api.Books.getById(bookId);
  console.log({ book });
  expect(book?.name).toContain("Fellowship");
});

test("bad id should be undefined", async () => {
  const book = await api.Books.getById("BAD_ID");
  console.log({ book });
  expect(book?.name).toBeFalsy();
});

test("get all chapters for a book", async () => {
  const chapters = await api.Books.getChapters(bookId);
  console.log({ chapters });
  expect(chapters?.length).toBeGreaterThan(0);
});
