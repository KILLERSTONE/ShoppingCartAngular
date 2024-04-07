import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './book/book.service';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [BooksComponent, BookComponent],
  imports: [
    CommonModule,
    FormsModule,

  ],
  providers: [BookService],
  exports: [BooksComponent]
})
export class BooksModule { }
