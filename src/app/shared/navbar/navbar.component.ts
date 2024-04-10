import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { SearchService } from '../services/search.service';

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

  logOut(){
    return this.authService.logout();
  }
}
