import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Book } from '../../shared/types/book';
import { CartService } from '../../shared/services/cart.service';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnDestroy,OnInit{
  @Input() book: Book = {} as Book; //Parent to child is done using @Input

  @Output() bookEmitter = new EventEmitter<Book>(); //Child to parent is done using @Output
  quantity:number=0;
  quantitySubscription:Subscription;

  constructor(private cartService: CartService) {

    this.quantitySubscription=new Subscription();

  }
  ngOnDestroy(): void {

    if (this.quantitySubscription) {
      this.quantitySubscription.unsubscribe();
    }
  }
  bookTotal(book: Book) {
    return book.amount * this.cartService.getBookQuantity(book);
  }
  existInCart(book: Book) {
    return this.cartService.exist(book);
  }

  addToCart(): void {
    this.cartService.add(this.book);
    this.quantity=this.getBookQuantity(this.book);
    this.bookEmitter.emit(this.book);
  }
  removeFromCart(): void {
    this.cartService.remove(this.book);
    this.quantity=this.getBookQuantity(this.book);
    this.bookEmitter.emit(this.book);

  }

  getBookQuantity(book: Book): number {
    return this.cartService.getBookQuantity(book);
  }
  ngOnInit() {
    this.quantity=this.cartService.getBookQuantity(this.book);

    this.quantitySubscription = this.cartService.quantityEmitter.subscribe((quantity) => {
      this.quantity = this.cartService.getBookQuantity(this.book);
    });
  }

}
