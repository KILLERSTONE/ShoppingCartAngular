import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Book } from '../../shared/types/book';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent  {
  @Input() book: Book = {} as Book; //Parent to child is done using @Input

  @Output() bookEmitter = new EventEmitter<Book>(); //Child to parent is done using @Output
  quantity:number=0;


  constructor(private cartService: CartService) {}
  bookTotal(book: Book) {
    return book.amount * this.cartService.getBookQuantity(book);
  }
  existInCart(book: Book) {
    return this.cartService.exist(book);
  }

  addToCart(): void {
    this.cartService.add(this.book);
    this.quantity++;
  }
  removeFromCart(): void {
    this.cartService.remove(this.book);
    this.quantity--;
  }

  getBookQuantity(book: Book): number {
    return this.cartService.getBookQuantity(book);
  }
  ngOnInit() {
    this.quantity = this.getBookQuantity(this.book);
  }

}
