import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Book } from '../shared/types/book';
import { BookService } from './book/book.service';
import { CartService } from 'app/shared/services/cart.service';
import { SearchService } from 'app/shared/services/search.service';
import { Subscription, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  @Input() books: Book[] = [];
  @Output() booksEmitter = new EventEmitter<Book[]>();
  private searchResultSubscription: Subscription | undefined;

  constructor(private bookService: BookService, private cartService: CartService,private searchService: SearchService) {}

  ngOnInit() {
    this.loadBooks();
  }

  ngOnDestroy() {
    this.bookService.setLocalBooks(this.books);
    if (this.searchResultSubscription) {
      this.searchResultSubscription.unsubscribe();
    }
  }

  isVisible: boolean = false;
  authorName: string = '';
  bookTitle: string = '';
  filteredBooks: Book[] = [];


  loadBooks() {
    this.books = this.bookService.getBooks();
  }

  toggleBooks() {
    this.isVisible = !this.isVisible;
  }

  handleBookEvent(book: Book) {
    console.log("Book is emitted", book);
  }
  searchBooks(): void {
    
    this.searchResultSubscription = this.searchService
      .searchBooks(this.bookTitle , this.authorName) 
      .pipe(
        tap((result) => {
          if (!this.bookTitle && !this.authorName) {
          } else {
          }
          this.filteredBooks = result;
        }),
        catchError(() => {
          return [];
        })
      )
      .subscribe();
  }

  emitBooks() {
    this.booksEmitter.emit(this.books);
  }
}
