import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { FormsModule } from '@angular/forms';
import { BookComponent } from './books/book/book.component';
import { BooksModule } from './books/books.module';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BookService } from './books/book/book.service';
import { CartService } from './shared/services/cart.service';
import { AuthModule } from './auth/auth.module';
import { SearchComponent } from './shared/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule
  ],
  providers: [BookService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
