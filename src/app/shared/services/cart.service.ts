import { Injectable } from '@angular/core';
import { Book } from '../types/book';
import { CartItems } from '../types/cartItems';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItems[] = [];
  updatedCart: Subject<void> = new Subject<void>();
  quantityEmitter:EventEmitter<number>=new EventEmitter<number>();

  constructor(){
    this.getCart();
  }
  add(book:Book):void{
    const index=this.cart.findIndex(item=>item.book.id===book.id);
    if(index!==-1){
      this.cart[index].quantity++;
    }else{
      this.cart.push({book,quantity:1});
    }

    this.quantityEmitter.emit(this.getBookQuantity(book));
    this.setCart();

  }
  exist(book:Book):boolean{
    const index=this.cart.findIndex(item=>item.book.id===book.id);
    if(index!==-1)return true;
    return false;
  }


  remove(book: Book): void {
    const index = this.cart.findIndex(item => item.book.id === book.id);

    if (index !== -1) {
      this.cart[index].quantity--;

      if (this.cart[index].quantity === 0) {
        this.cart.splice(index, 1);
      }

      this.quantityEmitter.emit(this.getBookQuantity(book));
      this.setCart();
    }
  }

  get() {
    return this.cart;
  }

  clear(){
    this.cart=[];
    sessionStorage.removeItem('cart');
  }

  getBookQuantity(book: Book): number {
    const item = this.cart.find(item => item.book.id === book.id);
    return item ? item.quantity : 0;
  }


  total():number{
    return this.cart.reduce((acc, item) => acc + item.book.amount * item.quantity, 0);
  }

  getCart():void{
    const exisitingCart=sessionStorage.getItem('cart');

    if(exisitingCart)this.cart=JSON.parse(exisitingCart);
  }

  setCart():void{
    sessionStorage.setItem('cart',JSON.stringify(this.cart));
    this.updatedCart.next();

  }


}
