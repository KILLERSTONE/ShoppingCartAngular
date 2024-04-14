import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Book } from '../shared/types/book';
import { BookService } from './book/book.service';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  @Input() books: Book[] = [];
  @Input() filteredBooks: Book[] = []; // Receive filtered books from parent component
  @Output() booksEmitter = new EventEmitter<Book[]>();

  constructor(private bookService: BookService, private cartService: CartService) {}

  ngOnInit() {
    this.isVisible = true;
    this.loadBooks();
  }

  ngOnDestroy() {
    this.bookService.setLocalBooks(this.books);
  }

  isVisible: boolean = false;
  inputText: string = '';

  loadBooks() {
    // Load all books from the book service
    this.books = this.bookService.getBooks();
    // Initially, set filtered books to be the same as all books
    if (!this.filteredBooks.length) {
      this.filteredBooks = this.books;
    }
  }

  toggleBooks() {
    this.isVisible = !this.isVisible;
  }

  handleBookEvent(book: Book) {
    console.log("Book is emitted", book);
  }

  emitBooks() {
    this.booksEmitter.emit(this.books);
  }

  handleFilteredBooks(filteredBooks:Book[]){
    this.filteredBooks=filteredBooks;

    console.log("Filtered Books",this.filteredBooks);
  }
}
