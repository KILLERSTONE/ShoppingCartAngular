import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Book } from '../shared/types/book';
import { CartItems } from '../shared/types/cartItems';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService){}
  ngOnInit(): void {
    this.isVisible=true;
  }
  getCart(){
    return this.cartService.get();
  }
  total(){
    return this.cartService.total();
  }
  bookTotal(book:CartItems){
    return book.book.amount*book.quantity;
  }
  addBook(book:CartItems){
    this.cartService.add(book.book);
  }
  removeBook(book:CartItems){
    this.cartService.remove(book.book);
  }
  isVisible:boolean=false;
  toggleCart(){
    this.isVisible=!this.isVisible;
  }
}
