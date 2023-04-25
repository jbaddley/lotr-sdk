import { Books } from "./books/index";
import { Characters } from "./characters/index";
import { Movies } from "./movies/index";
import { APIConfig } from "./types/index";
export default class LOTRAPI {
    Books: Books;
    Movies: Movies;
    Characters: Characters;
    constructor(config?: APIConfig);
}
