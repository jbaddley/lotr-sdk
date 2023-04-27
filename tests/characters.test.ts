import PublicSDK from "../src";
require("dotenv").config();

process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
process.env.NODE_ENV; // "development"

const api = new PublicSDK({
  apiKey: process.env.API_KEY,
});

const characterId = "5cd99d4bde30eff6ebccfd0d";
test("get all lotr characters", async () => {
  const characters = await api.getCharacters();
  const cachedCharacters = await api.getCharacters();
  expect(characters === cachedCharacters).toBe(true);
  expect(characters.length).toBeGreaterThan(0);
});

test("get single lotr character", async () => {
  const character = await api.getCharacter(characterId);
  const cachedCharacter = await api.getCharacter(characterId);
  expect(character === cachedCharacter).toBe(true);
  expect(character?.name).toContain("Samwise Gamgee");
});

test("get a character by partial name", async () => {
  const character = await api.getCharacterByName("Gamgee");
  expect(character?.name).toContain("Gamgee");
});

test("get all quotes for a character", async () => {
  const quotes = await api.getQuotesByCharacter(characterId);
  const cachedQuotes = await api.getQuotesByCharacter(characterId);
  expect(quotes === cachedQuotes).toBe(true);
  expect(quotes?.length).toBeGreaterThan(0);
});
