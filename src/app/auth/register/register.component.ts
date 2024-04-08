import { Component } from '@angular/core';
import { RegisterForm } from '../../shared/types/auth';
import { ParseSourceFile } from '@angular/compiler';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    confirm_password: '',
  };

  constructor(private authService: AuthService){

  }
  submit() {
    this.authService.register(this.form);
  }

  isLoading():boolean{
    return this.authService.isLoading;
  }
}
