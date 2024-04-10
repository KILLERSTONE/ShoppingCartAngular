import { Injectable } from '@angular/core';
import { BookService } from 'app/books/book/book.service';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Book } from '../types/book';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private bookService:BookService) { }

  getAllBooks():Observable<Book[]>{
    return new Observable<Book[]>(
      subscriber=>{
        subscriber.next(this.bookService.getBooks());
        subscriber.complete();
      }
    );
  }
  searchBooks(query: string): Observable<Book[]> {
    return this.getAllBooks().pipe(
      map((books) => {
        return books.filter(
          (book) =>
            (book.name?.toLowerCase().includes(query.toLowerCase()) || false) ||
            (book.author?.toLowerCase().includes(query.toLowerCase()) || false)
        );
      })
    );
  }


}
