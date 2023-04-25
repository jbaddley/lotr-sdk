import API from "../src";
const api = new API();

const characterId = "5cd99d4bde30eff6ebccfd0d";
test("get all lotr characters", async () => {
  const characters = await api.Characters.getAll();
  expect(characters.length).toBeGreaterThan(0);
});

test("get single lotr character", async () => {
  const character = await api.Characters.getById(characterId);
  expect(character?.name).toContain("Samwise Gamgee");
});

test("get all quotes for a character", async () => {
  const quotes = await api.Characters.getQuotes(characterId);
  expect(quotes?.length).toBeGreaterThan(0);
});
