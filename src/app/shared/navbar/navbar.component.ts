import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService:AuthService){}
  isAuthenticated(){
    return this.authService.isAuthenticated;
  }

  logOut(){
    return this.authService.logout();
  }
}
