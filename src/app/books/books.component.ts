import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../shared/types/book';
import { BookService } from './book/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[] = [];


  constructor(private bookService: BookService) {
    console.log({ Constructor: 'on construction' });
  }

  ngOnInit() {
    this.isVisible = true;
    this.books = this.bookService.getBooks();
    console.log({ oninit: 'on init' });
  }


  ngOnDestroy() {
    console.log({ ondestroy: 'on destroy' });
    this.bookService.setLocalBooks(this.books);
  }
  isVisible: boolean = false;

  inputText: string = '';

    toggleBooks() {
    this.isVisible = !this.isVisible;
  }
}
