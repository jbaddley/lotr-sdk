import { Books } from "./books/index";
import { Characters } from "./characters/index";
import { Movies } from "./movies/index";
import { APIConfig } from "./types/index";

export default class LOTRAPI {
  public Books: Books;
  public Movies: Movies;
  public Characters: Characters;
  constructor(config?: APIConfig) {
    this.Books = new Books(config);
    this.Movies = new Movies(config);
    this.Characters = new Characters(config);
  }
}
