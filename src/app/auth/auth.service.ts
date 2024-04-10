import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from 'app/shared/types/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  login(form: LoginForm) {
    if (this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        this.isAuthenticated = true;
        this.router.navigate(['']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => (this.isLoading = false));
  }

  register(form: RegisterForm) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (form.password !== form.confirm_password) return;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      })
      .finally(() => (this.isLoading = false));
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Signed out');
        this.isAuthenticated = false;
        sessionStorage.clear();
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
