import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CartService } from 'app/shared/services/cart.service';
import { LoginForm, RegisterForm } from 'app/shared/types/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutEvent: Subject<void> = new Subject<void>();

  constructor(private router: Router,private cartService:CartService) {
    const sessionAuth = sessionStorage.getItem('Authenticated');
    this.isAuthenticated = sessionAuth === 'true';
  }

  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  isSeller: boolean = false;
  private SELLER = "admin@ilink.com";

  login(form: LoginForm) {
    if (this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
        this.isAuthenticated = true;
        this.setSessionToken(true);
        if (form.email === this.SELLER) {
          this.isSeller = true;
          this.router.navigate(['/seller']);
        } else {
          this.router.navigate(['']);
        }
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

  setSessionToken(isAuthenticated: boolean) {
    sessionStorage.setItem('Authenticated', isAuthenticated ? 'true' : 'false');
  }

  setUserToken(user:any){
    sessionStorage.setItem('User',JSON.parse(user));
  }
  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Signed out');
        this.isAuthenticated = false;
        this.isSeller = false;
        this.setSessionToken(false);
        this.cartService.clear();
        sessionStorage.clear();
        this.router.navigate(['login']);
        this.logoutEvent.next();

      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  ssoLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          const user = result.user;
          console.log(token, user);
          this.isAuthenticated = true;
          this.setSessionToken(true);
          this.router.navigate(['']);
        } else {
          console.error('Credential is null');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }

  redirectRegister() {
    this.router.navigate(['/register']);
  }
}
