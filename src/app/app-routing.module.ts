  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { CartComponent } from './cart/cart.component';
  import { BooksComponent } from './books/books.component';
  import { LoginComponent } from './auth/login/login.component';
  import { RegisterComponent } from './auth/register/register.component';
  import { AuthGuard, authGuard } from './auth/auth.guard';
  import { SearchComponent } from './shared/search/search.component';
import { SellerGuard } from './seller/seller.guard';
import { SellerModule } from './seller/seller.module';
import { MypipeComponent } from './mypipe/mypipe.component';

  const routes: Routes = [
    {
      path:'',component:BooksComponent
    },
    // {
    //   path:'books',component:BooksComponent
    // },
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
    },
    {
      path: 'seller',
      loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)
      ,canActivate: [SellerGuard]
    },
    {
      path:'testpipe',component:MypipeComponent

    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
