import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard, authGuard } from './auth/auth.guard';
import { SearchComponent } from './shared/search/search.component';

const routes: Routes = [
  {
    path:'',component:BooksComponent
  },
  {
    path:'cart',component:CartComponent, canActivate:[AuthGuard]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'search',component:SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
