import { Book, Chapter } from "../types/index";
import { BaseAPI } from "../base";
export declare class Books extends BaseAPI {
    getAll(): Promise<Book[]>;
    getById(bookId: string): Promise<Book>;
    getChapters(bookId: string): Promise<Chapter[]>;
}
