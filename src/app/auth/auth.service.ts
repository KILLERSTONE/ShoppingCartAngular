import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from 'app/shared/types/auth';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutEvent: Subject<void> = new Subject<void>();

  constructor(private router: Router) {}
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  isSeller:Boolean=false;
  private SELLER="admin@ilink.com";

  login(form: LoginForm) {
    if (this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log(userCredential);
        this.isAuthenticated = true;

        if(form.email===this.SELLER){
          this.isSeller=true;
          this.router.navigate(['/seller']);
        }
        this.router.navigate(['']);

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
        const user = userCredential.user;

        console.log(userCredential);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => (this.isLoading = false));
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Signed out');
        this.isAuthenticated = false;
        this.isSeller=false;
        sessionStorage.removeItem('cart');
        this.router.navigate(['login']);
        this.logoutEvent.next();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

}
