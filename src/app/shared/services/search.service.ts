import { Injectable } from '@angular/core';
import { BookService } from 'app/books/book/book.service';
import { Observable, map } from 'rxjs';
import { Book } from '../types/book';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  getAllBooks(): Observable<Book[]> {
    return new Observable<Book[]>((subscriber) => {
      const books = this.bookService.getBooks();
      subscriber.next(books);
      subscriber.complete();
    });
  }

  searchBooks(query: string): Observable<Book[]> {
    return this.getAllBooks().pipe(
      map((books) => {
        return books.filter(
          (book) =>
            book.name?.toLowerCase().includes(query.toLowerCase()) ||
            book.author?.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }

  getBooksWithQuantity(): Observable<Book[]> {
    return this.getAllBooks().pipe(
      map((books) => {
        const cartItems = this.cartService.get();

        return books.map((book) => {
          const quantity =
            cartItems.find((item) => item.book.id === book.id)?.quantity || 0;
          return { ...book, quan: quantity };
        });
      })
    );
  }

  addToCart(book: Book): void {
    this.cartService.add(book);
  }

  removeFromCart(book: Book): void {
    this.cartService.remove(book);
  }
}
