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
import { SellerModule } from './seller/seller.module';
import { MyPipePipe } from './mypipe/my-pipe.pipe';
import { MypipeComponent } from './mypipe/mypipe.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    SearchComponent,
    MyPipePipe,
    MypipeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    SellerModule,
    BooksModule,
    FontAwesomeModule
  ],
  providers: [BookService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
