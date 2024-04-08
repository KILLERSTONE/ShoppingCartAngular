import { Component } from '@angular/core';
import { LoginForm } from '../../shared/types/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form:LoginForm={
    email:'',
    password:''
  };


  constructor(private authService:AuthService){}
  submit(){
    this.authService.login(this.form);
  }

  isLoading():boolean{
    return this.authService.isLoading;
  }
}
