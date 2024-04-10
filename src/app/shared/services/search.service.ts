import { Injectable } from '@angular/core';
import { BookService } from 'app/books/book/book.service';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Book, BookWithQuantity } from '../types/book';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  getAllBooks(): Observable<BookWithQuantity[]> {
    return new Observable<BookWithQuantity[]>((subscriber) => {
      const books = this.bookService.getBooks();
      const booksWithQuantity = books.map((book) => {
        const quantity = this.cartService.getBookQuantity(book);
        return { ...book, quantity: quantity } as BookWithQuantity;
      });

      subscriber.next(booksWithQuantity);
      subscriber.complete();
    });
  }
  searchBooks(query: string): Observable<BookWithQuantity[]> {
    return this.getAllBooks().pipe(
      map((books) => {
        return books.filter(
          (book) =>
            book.name?.toLowerCase().includes(query.toLowerCase()) ||
            false ||
            book.author?.toLowerCase().includes(query.toLowerCase()) ||
            false
        );
      })
    );
  }

  getBooksWithQuantity(): Observable<BookWithQuantity[]> {
    return this.getAllBooks().pipe(
      map(books => {
        const cartItems = this.cartService.get();

        return books.map(book => {
          const quantity = cartItems.find(item => item.book.id === book.id)?.quantity || 0;
          return { ...book, quan: quantity };
        });
      })
    );
  }

  addToCart(bookw: BookWithQuantity): void {
    const book:Book={
      id: bookw.id,
      name: bookw.name,
      author: bookw.author,
      amount: bookw.amount,
      src: bookw.src
    }
    this.cartService.add(book);
    bookw.quantity++;

  }
  removeFromCart(bookw: BookWithQuantity): void {
    const book:Book={
      id: bookw.id,
      name: bookw.name,
      author: bookw.author,
      amount: bookw.amount,
      src: bookw.src
    }
    this.cartService.remove(book);
    bookw.quantity--;
  }
}
