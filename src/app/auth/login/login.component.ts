import { Component } from '@angular/core';
import { LoginForm } from '../../shared/types/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  faGoogle=faGoogle;

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

  ssoSubmit(){
    this.authService.ssoLogin();
  }

  redirectRegister(){
    this.authService.redirectRegister();
  }
}
