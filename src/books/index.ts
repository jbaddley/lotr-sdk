import { Book, Chapter } from "../types/index";
import { BaseAPI } from "../base";

export class Books extends BaseAPI {
  async getAll(): Promise<Book[]> {
    const { docs } = await this.get<Book[]>("book");
    return docs;
  }

  async getById(bookId: string): Promise<Book> {
    const { docs = [] } = await this.get<Book>(`book/${bookId}`);
    return docs[0];
  }

  async getChapters(bookId: string) {
    const { docs } = await this.get<Chapter[]>(`book/${bookId}/chapter`);
    return docs;
  }
}
