import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { SearchService } from '../services/search.service';
import { BookComponent } from 'app/books/book/book.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService:AuthService,private searchService:SearchService){}

  isAuthenticated(){
    return this.authService.isAuthenticated;
  }

  isSeller(){
    return this.authService.isSeller;
  }
  logOut(){
    this.authService.logout();
  }
}
