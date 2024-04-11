import { Injectable } from '@angular/core';
import { BookService } from 'app/books/book/book.service';
import { Book } from 'app/shared/types/book';

@Injectable({
  providedIn: 'root',
})
export class CurdService {
  books: Book[] = [];

  constructor(private bookService: BookService) {
    this.getBooksFromLocalStorage();
  }

  private getBooksFromLocalStorage(): void {
    this.books = this.bookService.getBooks();
  }

  checkId(id: number): boolean {
    return this.books.some((book) => book.id === id);
  }

  getBookById(id: number): Book | null {
    return this.books.find((book) => book.id === id) || null;
  }

  addBook(book: Book): void {
    this.books.push(book);
    this.updateLocalStorage();
  }

  removeBook(book_id: number): void {
    this.books = this.books.filter((book) => book.id !== book_id);
    this.updateLocalStorage();
  }

  updateBook(book_id: number, newBook: Book): void {
    const oldBookIndex = this.books.findIndex((book) => book.id === book_id);
    if (oldBookIndex !== -1) {
      this.books[oldBookIndex] = { ...newBook };
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage(): void {
    this.bookService.setLocalBooks(this.books);
  }
}
