import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';
import { Book } from '../types/book';
import { tap, catchError } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy {
  private searchResultSubscription: Subscription | undefined;

  constructor(private searchService: SearchService) {}

  ngOnDestroy(): void {
    if (this.searchResultSubscription) {
      this.searchResultSubscription.unsubscribe();
    }
  }

  searchQuery: string | undefined;
  searchResult: Book[] = [];

  isLoading: boolean = false;
  noResult: boolean = false;

  searchBooks(): void {
    if (!this.searchQuery) {
      this.noResult = false;
      this.searchResult=[];
      return;
    }

    this.isLoading = true;

    this.searchResultSubscription = this.searchService
      .searchBooks(this.searchQuery)
      .pipe(
        tap((result) => {
          this.isLoading = false;
          this.noResult = result.length === 0;
          this.searchResult = result; // Assign search result to searchResult property
          console.log(this.searchResult);
        }),
        catchError(() => {
          this.isLoading = false;
          this.noResult = true;
          return [];
        })
      )
      .subscribe();
  }

  addToCart(book: Book): void {
    this.searchService.addToCart(book);
  }

  removeFromCart(book: Book): void {
    this.searchService.removeFromCart(book);
  }
}
